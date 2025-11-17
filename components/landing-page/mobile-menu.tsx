"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import BinsoLogo from "@/components/binso-logo"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onSearchOpen?: () => void
  onContactOpen?: () => void
}

export default function MobileMenu({ isOpen, onClose, onSearchOpen, onContactOpen }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false)
  const [servicesExpanded, setServicesExpanded] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted && resolvedTheme === "dark"

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleSectionClick = (sectionId: string) => {
    onClose()

    if (pathname !== "/") {
      router.push(`/#${sectionId}`)
      return
    }

    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }, 100)
  }

  const handleContactClick = () => {
    console.log("[v0] Mobile Menu: Contact clicked")
    onClose()
    if (onContactOpen) {
      console.log("[v0] Mobile Menu: Calling onContactOpen")
      setTimeout(() => {
        onContactOpen()
      }, 300)
    } else {
      console.log("[v0] Mobile Menu: onContactOpen is undefined")
    }
  }

  if (!isOpen) return null

  const logoSrc = isDarkMode ? "/logo-light.png" : "/logo-dark.png"

  const services = [
    { label: "KI-Chatbot Integration", href: "/dienstleistungen/ki-chatbots-kundenservice" },
    { label: "WhatsApp Business Automation", href: "/dienstleistungen/whatsapp-social-media-automation" },
    { label: "Prozessautomatisierung", href: "/dienstleistungen/prozessautomatisierung" },
    { label: "Web & App Entwicklung", href: "/dienstleistungen/web-app-entwicklung" },
    { label: "CMS & Content Management", href: "/dienstleistungen/custom-crm-software" },
    { label: "API & System-Integration", href: "/dienstleistungen/ecommerce-online-shops" },
  ]

  const menuItems = [
    { label: "Dienstleistungen", sectionId: "dienstleistungen", hasSubmenu: true },
    { label: "Projekte", sectionId: "projekte" },
    { label: "Portfolio", href: "/portfolio", isLink: true },
    { label: "Über uns", sectionId: "team" },
    { label: "Offene Stellen", sectionId: "karriere" },
    { label: "Kontakt", action: "contact" },
  ]

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-white dark:bg-[#0A0A0A] md:hidden transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7A7FEE]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative h-full flex flex-col">
        <div className="py-3 px-2">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center z-10" onClick={onClose}>
              <BinsoLogo className="h-10 w-auto" />
            </Link>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="relative rounded-md bg-transparent hover:bg-gray-200/50 dark:hover:bg-gray-800/20 transition-colors z-10 flex items-center justify-center"
                style={{ width: '32px', height: '32px' }}
                aria-label="Close menu"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="absolute w-5 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full transform rotate-45 transition-all duration-300" />
                  <span className="absolute w-5 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full transform -rotate-45 transition-all duration-300" />
                </div>
              </button>
            </div>
          </div>
        </div>

        <nav className="flex-1 flex flex-col px-8 pb-20 pt-8 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li
                key={item.label}
                className="transform transition-all duration-500 ease-out"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={() => setServicesExpanded(!servicesExpanded)}
                      className="inline-block py-4 text-3xl font-light tracking-tight text-gray-800 dark:text-gray-100 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors relative group"
                    >
                      {item.label}
                      <span className="absolute bottom-1 left-0 w-0 h-[3px] bg-[#7A7FEE] transition-all duration-300 ease-out group-hover:w-full" />
                    </button>
                    
                    {servicesExpanded && (
                      <ul className="mt-2 ml-4 space-y-2">
                        {services.map((service, serviceIndex) => (
                          <li
                            key={service.href}
                            className="transform transition-all duration-300 ease-out"
                            style={{
                              opacity: servicesExpanded ? 1 : 0,
                              transform: servicesExpanded ? 'translateY(0)' : 'translateY(10px)',
                              transitionDelay: `${serviceIndex * 30}ms`,
                            }}
                          >
                            <Link
                              href={service.href}
                              className={`inline-block py-2 text-xl font-light tracking-tight transition-colors relative group ${
                                pathname === service.href
                                  ? "text-[#7A7FEE]"
                                  : "text-gray-600 dark:text-gray-400 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE]"
                              }`}
                              onClick={onClose}
                            >
                              {service.label}
                              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7A7FEE] transition-all duration-300 ease-out group-hover:w-full" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : item.isLink ? (
                  <Link
                    href={item.href!}
                    className={`inline-block py-4 text-3xl font-light tracking-tight transition-colors relative group ${
                      pathname === item.href
                        ? "text-[#7A7FEE]"
                        : "text-gray-800 dark:text-gray-100 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE]"
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                    <span className="absolute bottom-1 left-0 w-0 h-[3px] bg-[#7A7FEE] transition-all duration-300 ease-out group-hover:w-full" />
                  </Link>
                ) : item.action === "contact" ? (
                  <button
                    onClick={handleContactClick}
                    className="inline-block py-4 text-3xl font-light tracking-tight text-gray-800 dark:text-gray-100 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-1 left-0 w-0 h-[3px] bg-[#7A7FEE] transition-all duration-300 ease-out group-hover:w-full" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleSectionClick(item.sectionId!)}
                    className="inline-block py-4 text-3xl font-light tracking-tight text-gray-800 dark:text-gray-100 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-1 left-0 w-0 h-[3px] bg-[#7A7FEE] transition-all duration-300 ease-out group-hover:w-full" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-8 pb-safe">
          {/* Additional content can be added here if needed */}
        </div>
      </div>
    </div>
  )
}

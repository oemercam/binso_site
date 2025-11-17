"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { Menu, Search } from 'lucide-react'
import { useTheme } from "next-themes"
import MobileMenu from "./mobile-menu"
import SearchDialog from "./search-dialog"
import ContactDrawer from "./contact-drawer"
import ContactSlideIn from "./contact-slide-in"
import ContactBottomSheet from "./contact-bottom-sheet"
import { Button } from "@/components/ui/button"
import BinsoLogo from "@/components/binso-logo"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()

  // Ensure component is mounted before rendering theme-dependent elements
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      
      // Update header background when scrolled
      if (currentScrollPos > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      if (window.innerWidth < 768) {
        // Immer sichtbar wenn ganz oben
        if (currentScrollPos < 10) {
          setVisible(true)
          setPrevScrollPos(currentScrollPos)
          return
        }

        // Mindestens 5px scrollen bevor wir reagieren (verhindert Flackern)
        const scrollDiff = prevScrollPos - currentScrollPos
        
        if (Math.abs(scrollDiff) > 5) {
          // Nach oben scrollen = anzeigen
          // Nach unten scrollen = verstecken
          setVisible(scrollDiff > 0)
          setPrevScrollPos(currentScrollPos)
        }
      } else {
        // Auf Desktop immer sichtbar
        setVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScrollPos])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    const handleOpenContact = () => {
      setContactOpen(true)
    }

    window.addEventListener("openContactDrawer", handleOpenContact)

    return () => {
      window.removeEventListener("openContactDrawer", handleOpenContact)
    }
  }, [])

  // Handle logo click with theme preservation
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()

    window.location.href = "/"
  }

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault()

    // Wenn wir nicht auf der Startseite sind, erst zur Startseite navigieren
    if (pathname !== "/") {
      router.push(`/#${sectionId}`)
      return
    }

    // Sonst direkt zum Bereich scrollen
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Höhe des Headers
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  // Determine which logo to show based on theme
  const logoSrc = mounted && resolvedTheme === "dark" ? "/logo-light.png" : "/logo-dark.png"

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled ? "bg-white/90 dark:bg-[#111111]/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
        } ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center" onClick={handleLogoClick}>
              {/* Use a div with the same dimensions during SSR to prevent layout shift */}
              {mounted ? (
                <BinsoLogo className="h-10 w-auto md:h-12" />
              ) : (
                <div className="h-10 w-[150px] md:h-12 md:w-[200px]" />
              )}
            </Link>

            <div className="flex items-center space-x-2 md:space-x-4">
              <nav className="hidden md:block">
                <ul className="flex items-center space-x-6">
                  <li>
                    <a
                      href="#dienstleistungen"
                      onClick={(e) => handleSectionClick(e, "dienstleistungen")}
                      className="text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
                    >
                      Dienstleistungen
                    </a>
                  </li>
                  <li>
                    <a
                      href="#projekte"
                      onClick={(e) => handleSectionClick(e, "projekte")}
                      className="text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
                    >
                      Projekte
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/portfolio"
                      className={`transition-colors ${
                        pathname === "/portfolio"
                          ? "text-[#7A7FEE] dark:text-[#7A7FEE]"
                          : "text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE]"
                      }`}
                    >
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#team"
                      onClick={(e) => handleSectionClick(e, "team")}
                      className="text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
                    >
                      Über uns
                    </a>
                  </li>
                  <li>
                    <a
                      href="#karriere"
                      onClick={(e) => handleSectionClick(e, "karriere")}
                      className="text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
                    >
                      Offene Stellen
                    </a>
                  </li>
                </ul>
              </nav>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="hidden md:inline-flex text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Suche"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                onClick={() => setContactOpen(true)}
                className="hidden md:inline-flex bg-[#7A7FEE] hover:bg-[#6366F1] text-white"
              >
                Kontakt
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="relative rounded-md bg-transparent hover:bg-gray-200/50 dark:hover:bg-gray-800/20 md:hidden flex items-center justify-center"
                style={{ width: '32px', height: '32px' }}
                aria-label="Toggle menu"
              >
                <div className="w-5 h-8 flex flex-col justify-center gap-1">
                  <span className="w-full h-0.5 bg-black dark:bg-white rounded-full transition-all duration-300 ease-in-out" />
                  <span className="w-full h-0.5 bg-black dark:bg-white rounded-full transition-all duration-300 ease-in-out" />
                  <span className="w-full h-0.5 bg-black dark:bg-white rounded-full transition-all duration-300 ease-in-out" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {mounted && (
        <>
          {isMobile ? (
            <ContactBottomSheet 
              isOpen={contactOpen} 
              onClose={() => setContactOpen(false)} 
            />
          ) : (
            <ContactDrawer 
              isOpen={contactOpen} 
              onClose={() => setContactOpen(false)} 
            />
          )}
        </>
      )}

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onSearchOpen={() => setSearchOpen(true)}
        onContactOpen={() => setContactOpen(true)}
      />

      {/* Such-Dialog */}
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

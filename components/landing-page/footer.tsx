"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Linkedin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react'
import ThemeToggle from "./theme-toggle"
import LanguageSelector from "./language-selector"
import BinsoLogo from "@/components/binso-logo"

export default function Footer() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const copyrightText = `© ${new Date().getFullYear()} Binso GmbH. Alle Rechte vorbehalten.`

  return (
    <footer className="w-full py-12 md:py-16 border-t border-gray-200 dark:border-gray-800">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center">
            <BinsoLogo className="h-12 w-auto" />
          </Link>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              binso –{' '}
              <a 
                href="https://binso.ch" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#7A7FEE] hover:text-[#6366F1] underline transition-colors"
              >
                Ihr IT-Partner
              </a>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl">
              IT-Dienstleistungen für Privat und Geschäfte – Von Azure bis Website-Entwicklung
            </p>
          </div>

          {/* Theme Toggle & Language Selector */}
          <div className="flex items-center justify-center gap-3">
            <ThemeToggle />
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />
            <LanguageSelector />
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/impressum"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
            >
              Datenschutz
            </Link>
            <Link
              href="/agb"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
            >
              AGB
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  )
}

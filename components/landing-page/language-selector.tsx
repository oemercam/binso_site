"use client"

import { useState, useEffect } from "react"
import { Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languages = [
  { code: "de-CH", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
  { code: "en-US", name: "English" },
]

export default function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState("de-CH")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") || "de-CH"
    setCurrentLanguage(savedLanguage)
  }, [])

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    localStorage.setItem("language", langCode)
    // Here you would implement the actual language change logic
    // For now, it just stores the preference
  }

  if (!mounted) {
    return <div className="p-2 rounded-full" />
  }

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-2 rounded-full transition-colors bg-transparent hover:bg-gray-200/50 dark:hover:bg-gray-800/20 flex items-center gap-1"
          aria-label="Sprache auswählen"
        >
          <Globe className="h-5 w-5 text-gray-800 dark:text-white" />
          <span className="text-sm text-gray-800 dark:text-white">{currentLang.code.split('-')[0].toUpperCase()}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`cursor-pointer ${
              currentLanguage === lang.code ? "bg-[#7A7FEE]/10 text-[#7A7FEE]" : ""
            }`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

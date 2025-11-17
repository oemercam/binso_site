"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { X, Settings } from 'lucide-react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always enabled
    analytics: false,
    marketing: false,
    functional: false,
  })

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem("cookies-accepted")
    if (!hasAcceptedCookies) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAllCookies = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    localStorage.setItem("cookies-accepted", "true")
    localStorage.setItem("cookie-preferences", JSON.stringify(allAccepted))
    setShowBanner(false)
  }

  const declineAllCookies = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    localStorage.setItem("cookies-accepted", "declined")
    localStorage.setItem("cookie-preferences", JSON.stringify(onlyNecessary))
    setShowBanner(false)
  }

  const savePreferences = () => {
    localStorage.setItem("cookies-accepted", "custom")
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences))
    setShowBanner(false)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return // Cannot disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white dark:bg-[#272829] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
          {!showSettings ? (
            <>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Cookie-Einstellungen</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Durch die Nutzung
                    unserer Website stimmen Sie der Verwendung von Cookies gemäss unserer{" "}
                    <Link href="/datenschutz" className="text-[#7A7FEE] hover:underline">
                      Datenschutzerklärung
                    </Link>{" "}
                    zu.
                  </p>
                </div>
                <button
                  onClick={() => setShowBanner(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Schliessen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(true)}
                  className="flex items-center justify-center gap-2 bg-transparent"
                >
                  <Settings className="w-4 h-4" />
                  Einstellungen
                </Button>
                <div className="flex-1" />
                <Button variant="outline" onClick={declineAllCookies} className="bg-transparent">
                  Nur notwendige
                </Button>
                <Button onClick={acceptAllCookies} className="bg-[#7A7FEE] hover:bg-[#6A6FDE] text-white">
                  Alle akzeptieren
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Cookie-Einstellungen anpassen</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Wählen Sie, welche Cookie-Kategorien Sie akzeptieren möchten.
                  </p>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Zurück"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 md:space-y-4 mb-4 md:mb-6">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-3 md:p-4 bg-gray-50 dark:bg-[#1F2021] rounded-lg md:rounded-xl">
                  <div className="flex-1 pr-3 md:pr-4">
                    <h4 className="font-medium text-sm md:text-base mb-0.5 md:mb-1">Notwendige Cookies</h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 md:line-clamp-none">
                      Erforderlich für Grundfunktionen der Website.
                    </p>
                  </div>
                  <Switch checked={preferences.necessary} disabled className="mt-0.5 md:mt-1" />
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-3 md:p-4 bg-gray-50 dark:bg-[#1F2021] rounded-lg md:rounded-xl">
                  <div className="flex-1 pr-3 md:pr-4">
                    <h4 className="font-medium text-sm md:text-base mb-0.5 md:mb-1">Analytische Cookies</h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 md:line-clamp-none">
                      Helfen uns die Website-Nutzung zu verstehen.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={() => togglePreference("analytics")}
                    className="mt-0.5 md:mt-1"
                  />
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-3 md:p-4 bg-gray-50 dark:bg-[#1F2021] rounded-lg md:rounded-xl">
                  <div className="flex-1 pr-3 md:pr-4">
                    <h4 className="font-medium text-sm md:text-base mb-0.5 md:mb-1">Marketing Cookies</h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 md:line-clamp-none">
                      Zeigen relevante Werbung basierend auf Ihrem Verhalten.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.marketing}
                    onCheckedChange={() => togglePreference("marketing")}
                    className="mt-0.5 md:mt-1"
                  />
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start justify-between p-3 md:p-4 bg-gray-50 dark:bg-[#1F2021] rounded-lg md:rounded-xl">
                  <div className="flex-1 pr-3 md:pr-4">
                    <h4 className="font-medium text-sm md:text-base mb-0.5 md:mb-1">Funktionale Cookies</h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 md:line-clamp-none">
                      Ermöglichen erweiterte Funktionen wie Videos und Chats.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.functional}
                    onCheckedChange={() => togglePreference("functional")}
                    className="mt-0.5 md:mt-1"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 md:gap-3">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={declineAllCookies} 
                    className="flex-1 bg-transparent text-sm md:text-base py-2 md:py-2.5"
                  >
                    Nur notwendige
                  </Button>
                  <Button 
                    onClick={savePreferences} 
                    className="flex-1 bg-[#7A7FEE] hover:bg-[#6A6FDE] text-white text-sm md:text-base py-2 md:py-2.5"
                  >
                    Auswahl speichern
                  </Button>
                </div>
                <Button 
                  onClick={acceptAllCookies} 
                  className="w-full bg-[#7A7FEE] hover:bg-[#6A6FDE] text-white text-sm md:text-base py-2 md:py-2.5"
                >
                  Alle akzeptieren
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

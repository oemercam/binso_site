"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from "@/lib/supabase/client"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    console.log("[v0] Logout ausgelöst")
    const supabase = createClient()
    await supabase.auth.signOut()
    
    document.cookie = "sb-access-token=; Max-Age=0; path=/;"
    document.cookie = "sb-refresh-token=; Max-Age=0; path=/;"
    
    router.push("/admin/login")
  }

  const navItems = [
    { name: "Übersicht", href: "/admin/dashboard" },
    { name: "Portfolio", href: "/admin/dashboard/portfolio" },
    { name: "Dienstleistungen", href: "/admin/dashboard/services" },
    { name: "Kontakte", href: "/admin/dashboard/contacts" },
    { name: "FAQs", href: "/admin/dashboard/faqs" },
    { name: "Team", href: "/admin/dashboard/team" },
    { name: "Testimonials", href: "/admin/dashboard/testimonials" },
    { name: "Blog", href: "/admin/dashboard/blog" },
    { name: "Media", href: "/admin/dashboard/media" }, // Media hinzugefügt
    { name: "Einstellungen", href: "/admin/dashboard/settings" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Binso Admin</h1>
          </div>

          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                  pathname === item.href ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 absolute bottom-0 w-64 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Abmelden
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

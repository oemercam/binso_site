"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { AlertTriangle } from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    portfolio: 0,
    services: 0,
    contacts: 0,
    faqs: 0,
  })
  const [loading, setLoading] = useState(true)
  const [hasRLSError, setHasRLSError] = useState(false)

  useEffect(() => {
    console.log("[v0] Dashboard wird geladen")
    async function fetchStats() {
      const supabase = createClient()

      try {
        const [portfolio, services, contacts, faqs] = await Promise.all([
          supabase.from("portfolio_projects").select("*", { count: "exact", head: true }),
          supabase.from("services").select("*", { count: "exact", head: true }),
          supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
          supabase.from("faqs").select("*", { count: "exact", head: true }),
        ])

        if (portfolio.error?.message?.includes("infinite recursion")) {
          setHasRLSError(true)
        }

        console.log("[v0] Statistiken geladen:", {
          portfolio: portfolio.count,
          services: services.count,
          contacts: contacts.count,
          faqs: faqs.count,
        })

        setStats({
          portfolio: portfolio.count || 0,
          services: services.count || 0,
          contacts: contacts.count || 0,
          faqs: faqs.count || 0,
        })
      } catch (error) {
        console.error("[v0] Fehler beim Laden der Statistiken:", error)
        if (error instanceof Error && error.message.includes("infinite recursion")) {
          setHasRLSError(true)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-600">Lade Dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {hasRLSError && (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-red-900 mb-2">
                🚨 Kritisches Datenbank-Problem: Infinite Recursion
              </h2>
              <p className="text-red-800 mb-4">
                Das Admin-Dashboard kann derzeit keine Daten laden. Die Row Level Security (RLS) 
                Policies auf der <code className="bg-red-100 px-1 py-0.5 rounded">admin_users</code> Tabelle 
                verursachen eine Endlosschleife.
              </p>
              
              <div className="bg-white border border-red-300 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-red-900 mb-2">So beheben Sie das Problem:</h3>
                <ol className="list-decimal list-inside space-y-2 text-red-900">
                  <li>Öffnen Sie Ihr <a href={`https://supabase.com/dashboard/project/${process.env.NEXT_PUBLIC_SUPABASE_URL?.split('.')[0].replace('https://', '')}/editor`} target="_blank" rel="noopener noreferrer" className="underline font-semibold">Supabase Dashboard → SQL Editor</a></li>
                  <li>Kopieren Sie den folgenden SQL-Befehl und führen Sie ihn aus:</li>
                </ol>
                
                <div className="mt-3 bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`-- RLS auf admin_users deaktivieren
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Alle Policies löschen
DROP POLICY IF EXISTS "Admin users select policy" ON admin_users;
DROP POLICY IF EXISTS "Admin users insert policy" ON admin_users;
DROP POLICY IF EXISTS "Admin users update policy" ON admin_users;
DROP POLICY IF EXISTS "Admin users delete policy" ON admin_users;`}</pre>
                </div>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;\nDROP POLICY IF EXISTS "Admin users select policy" ON admin_users;\nDROP POLICY IF EXISTS "Admin users insert policy" ON admin_users;\nDROP POLICY IF EXISTS "Admin users update policy" ON admin_users;\nDROP POLICY IF EXISTS "Admin users delete policy" ON admin_users;`)
                  }}
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
                >
                  SQL-Code kopieren
                </button>
              </div>
              
              <p className="text-red-800 text-sm">
                Nach der Ausführung laden Sie diese Seite neu. Das Dashboard sollte dann normal funktionieren.
              </p>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Willkommen im binso Admin Dashboard. Hier können Sie alle Inhalte Ihrer Webseite verwalten.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/dashboard/portfolio">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Portfolio Projekte</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.portfolio}</p>
          </div>
        </Link>

        <Link href="/admin/dashboard/services">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Dienstleistungen</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.services}</p>
          </div>
        </Link>

        <Link href="/admin/dashboard/contacts">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Kontaktanfragen</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.contacts}</p>
          </div>
        </Link>

        <Link href="/admin/dashboard/faqs">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">FAQ Einträge</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stats.faqs}</p>
          </div>
        </Link>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Erste Schritte</h2>
        <ul className="space-y-2 text-blue-800">
          <li>• Fügen Sie Portfolio-Projekte hinzu, um Ihre Arbeit zu präsentieren</li>
          <li>• Verwalten Sie Ihre Dienstleistungen und Preise</li>
          <li>• Beantworten Sie Kontaktanfragen von Interessenten</li>
          <li>• Aktualisieren Sie die FAQ-Einträge für häufige Kundenfragen</li>
        </ul>
      </div>
    </div>
  )
}

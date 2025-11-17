"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Copy, ExternalLink, CheckCircle2 } from 'lucide-react'
import { useState } from "react"

export default function RLSFixRequiredPage() {
  const [copied, setCopied] = useState(false)

  const sqlScript = `-- RLS Infinite Recursion Fix
-- Dieses Script behebt das Problem, dass der Admin keine Daten sehen kann

-- 1. Lösche alle RLS-Policies von admin_users
DROP POLICY IF EXISTS "admin_users_select_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_users_insert_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_users_update_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_users_delete_policy" ON admin_users;

-- 2. Deaktiviere RLS auf admin_users
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- 3. Bestätige, dass es funktioniert
SELECT 'RLS erfolgreich deaktiviert auf admin_users' AS status;`

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container max-w-4xl py-8">
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <div>
              <CardTitle className="text-2xl text-red-900">
                RLS Infinite Recursion Problem
              </CardTitle>
              <CardDescription className="text-red-700">
                Die Datenbank-Sicherheitsregeln verursachen eine Endlosschleife
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h3 className="font-semibold text-gray-900 mb-2">Was ist das Problem?</h3>
            <p className="text-gray-700 text-sm">
              Die <code className="bg-gray-100 px-2 py-1 rounded">admin_users</code> Tabelle hat
              Row Level Security (RLS) Policies aktiviert, die eine Endlosschleife verursachen.
              Andere Tabellen prüfen, ob Sie in <code className="bg-gray-100 px-2 py-1 rounded">admin_users</code> existieren,
              während <code className="bg-gray-100 px-2 py-1 rounded">admin_users</code> selbst prüft, ob Sie berechtigt sind.
              Dies führt zu einer "infinite recursion".
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-amber-200">
            <h3 className="font-semibold text-gray-900 mb-3">So beheben Sie das Problem:</h3>
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="font-semibold min-w-[24px]">1.</span>
                <span>
                  Öffnen Sie das{" "}
                  <a
                    href="https://supabase.com/dashboard/project/dzxvzrtqdalbbtqdtdaz/sql/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    Supabase SQL Editor
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold min-w-[24px]">2.</span>
                <span>Kopieren Sie das untenstehende SQL-Script</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold min-w-[24px]">3.</span>
                <span>Fügen Sie es in den SQL Editor ein und klicken Sie auf "Run"</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold min-w-[24px]">4.</span>
                <span>Laden Sie diese Seite neu (F5)</span>
              </li>
            </ol>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg relative">
            <Button
              onClick={handleCopy}
              size="sm"
              variant="secondary"
              className="absolute top-3 right-3"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Kopiert!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  SQL kopieren
                </>
              )}
            </Button>
            <pre className="text-sm text-gray-100 overflow-x-auto pr-32">
              <code>{sqlScript}</code>
            </pre>
          </div>

          <div className="flex gap-3">
            <Button asChild className="flex-1">
              <a
                href="https://supabase.com/dashboard/project/dzxvzrtqdalbbtqdtdaz/sql/new"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Supabase SQL Editor öffnen
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="flex-1"
            >
              Seite neu laden
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

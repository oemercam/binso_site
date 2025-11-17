'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, XCircle, Loader2, Shield } from 'lucide-react'

export default function SetupDataPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ table: string; success: boolean; message: string }[]>([])
  const [schemaLoading, setSchemaLoading] = useState(false)
  const [schemaResult, setSchemaResult] = useState<{ success: boolean; message: string } | null>(null)
  const [demoPermissionsLoading, setDemoPermissionsLoading] = useState(false)
  const [demoPermissionsResult, setDemoPermissionsResult] = useState<{
    success: boolean
    message: string
    requiresManualFix?: boolean
    instructions?: string[]
    sqlCommand?: string
  } | null>(null)
  const [rlsLoading, setRlsLoading] = useState(false)
  const [rlsResult, setRlsResult] = useState<{ 
    success: boolean
    message: string
    requiresManualFix?: boolean
    instructions?: string[]
    sqlCommand?: string
  } | null>(null)
  const [faqCategoryLoading, setFaqCategoryLoading] = useState(false)
  const [faqCategoryResult, setFaqCategoryResult] = useState<{ success: boolean; message: string } | null>(null)

  const setupSchema = async () => {
    setSchemaLoading(true)
    setSchemaResult(null)

    try {
      const response = await fetch('/api/admin/setup-schema', {
        method: 'POST',
      })

      const data = await response.json()

      if (data.success) {
        setSchemaResult({ success: true, message: data.message })
      } else {
        setSchemaResult({ success: false, message: data.error })
      }
    } catch (error) {
      setSchemaResult({ success: false, message: 'Netzwerkfehler beim Schema-Setup' })
    } finally {
      setSchemaLoading(false)
    }
  }

  const fixDemoPermissions = async () => {
    setDemoPermissionsLoading(true)
    setDemoPermissionsResult(null)

    try {
      const response = await fetch('/api/admin/fix-demo-permissions', {
        method: 'POST',
      })

      const data = await response.json()

      setDemoPermissionsResult({
        success: data.success,
        message: data.message,
        requiresManualFix: !data.success,
        instructions: data.instructions,
        sqlCommand: data.sql
      })
    } catch (error: any) {
      setDemoPermissionsResult({ 
        success: false, 
        message: error.message || 'Netzwerkfehler beim Demo-Admin Fix' 
      })
    } finally {
      setDemoPermissionsLoading(false)
    }
  }

  const fixRls = async () => {
    setRlsLoading(true)
    setRlsResult(null)

    try {
      const response = await fetch('/api/admin/fix-rls', {
        method: 'POST',
      })

      const data = await response.json()

      setRlsResult({
        success: data.success,
        message: data.message,
        requiresManualFix: data.requiresManualFix,
        instructions: data.instructions,
        sqlCommand: data.sqlCommand
      })
    } catch (error: any) {
      setRlsResult({ 
        success: false, 
        message: error.message || 'Netzwerkfehler beim RLS-Fix' 
      })
    } finally {
      setRlsLoading(false)
    }
  }

  const fixFaqCategories = async () => {
    setFaqCategoryLoading(true)
    setFaqCategoryResult(null)

    try {
      const response = await fetch('/api/admin/fix-faq-categories', {
        method: 'POST',
      })

      const data = await response.json()

      if (data.success) {
        setFaqCategoryResult({ success: true, message: data.message })
      } else {
        setFaqCategoryResult({ success: false, message: data.error })
      }
    } catch (error) {
      setFaqCategoryResult({ success: false, message: 'Netzwerkfehler beim FAQ-Kategorie-Fix' })
    } finally {
      setFaqCategoryLoading(false)
    }
  }

  const seedDemoData = async () => {
    setLoading(true)
    setResults([])

    try {
      const response = await fetch('/api/admin/seed-data', {
        method: 'POST',
      })

      const data = await response.json()

      if (data.success) {
        setResults(data.results)
      } else {
        setResults([{ table: 'Error', success: false, message: data.error }])
      }
    } catch (error) {
      setResults([{ table: 'Error', success: false, message: 'Netzwerkfehler beim Seeding' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>1. Datenbank-Schema Setup</CardTitle>
          <CardDescription>
            Fügt fehlende Spalten zur site_settings Tabelle hinzu (Hero und Footer Felder)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              Führen Sie dies zuerst aus, um die Datenbank für Hero- und Footer-Einstellungen vorzubereiten.
            </AlertDescription>
          </Alert>

          <Button onClick={setupSchema} disabled={schemaLoading} className="w-full">
            {schemaLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {schemaLoading ? 'Schema wird eingerichtet...' : 'Datenbank-Schema einrichten'}
          </Button>

          {schemaResult && (
            <div className="flex items-center gap-2 p-3 border rounded">
              {schemaResult.success ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <p className={schemaResult.success ? 'text-green-700' : 'text-red-700'}>
                {schemaResult.message}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            2. Demo-Admin Berechtigungen (KRITISCH!)
          </CardTitle>
          <CardDescription>
            Behebt das "infinite recursion" Problem durch Deaktivierung von RLS auf admin_users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              EXTREM WICHTIG: Dies behebt das Problem, dass der Demo-Admin keine Daten sehen kann!
            </AlertDescription>
          </Alert>

          <Button onClick={fixDemoPermissions} disabled={demoPermissionsLoading} variant="destructive" className="w-full">
            {demoPermissionsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {demoPermissionsLoading ? 'Berechtigungen werden geprüft...' : 'Demo-Admin Berechtigungen JETZT beheben'}
          </Button>

          {demoPermissionsResult && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 border rounded">
                {demoPermissionsResult.success ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <p className={demoPermissionsResult.success ? 'text-green-700' : 'text-red-700'}>
                  {demoPermissionsResult.message}
                </p>
              </div>

              {demoPermissionsResult.requiresManualFix && demoPermissionsResult.instructions && (
                <Alert className="border-red-500 bg-red-50">
                  <AlertDescription>
                    <div className="space-y-3">
                      <p className="font-semibold text-red-900">Manuelle Behebung im Supabase Dashboard erforderlich:</p>
                      <ol className="space-y-2 text-sm text-red-800 list-decimal list-inside">
                        {demoPermissionsResult.instructions.filter(i => i.trim()).map((instruction, i) => (
                          <li key={i}>{instruction}</li>
                        ))}
                      </ol>
                      {demoPermissionsResult.sqlCommand && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold mb-2 text-red-900">SQL-Script (KOMPLETT kopieren & ausführen):</p>
                          <pre className="p-3 bg-slate-900 text-slate-100 border border-red-200 rounded text-sm overflow-x-auto font-mono whitespace-pre">
                            {demoPermissionsResult.sqlCommand}
                          </pre>
                          <div className="flex gap-2 mt-2">
                            <Button
                              onClick={() => {
                                navigator.clipboard.writeText(demoPermissionsResult.sqlCommand!)
                                alert('SQL-Script in Zwischenablage kopiert!')
                              }}
                              variant="outline"
                              size="sm"
                            >
                              SQL-Script kopieren
                            </Button>
                            <Button
                              onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                              variant="outline"
                              size="sm"
                            >
                              Supabase Dashboard öffnen
                            </Button>
                          </div>
                        </div>
                      )}
                      <Alert className="mt-4 border-green-500 bg-green-50">
                        <AlertDescription className="text-green-900 text-sm">
                          ✅ Nach dem Ausführen: Laden Sie die Admin-Seite neu. Der Demo-Admin sollte dann alle Bereiche sehen können!
                        </AlertDescription>
                      </Alert>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto border-orange-200">
        <CardHeader>
          <CardTitle>3. RLS Infinite Recursion Fix (Alternative)</CardTitle>
          <CardDescription>
            Alternative Methode zum Beheben des "infinite recursion" Problems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertDescription className="text-orange-800">
              WICHTIG: Dies muss ausgeführt werden, damit der Demo-Admin-User alle Einträge sehen kann!
            </AlertDescription>
          </Alert>

          <Button onClick={fixRls} disabled={rlsLoading} variant="destructive" className="w-full">
            {rlsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {rlsLoading ? 'RLS wird geprüft...' : 'RLS Problem JETZT beheben'}
          </Button>

          {rlsResult && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 border rounded">
                {rlsResult.success ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <p className={rlsResult.success ? 'text-green-700' : 'text-red-700'}>
                  {rlsResult.message}
                </p>
              </div>

              {rlsResult.requiresManualFix && rlsResult.instructions && (
                <Alert className="border-orange-500 bg-orange-50">
                  <AlertDescription>
                    <div className="space-y-3">
                      <p className="font-semibold text-orange-900">Manuelle Behebung erforderlich:</p>
                      <ol className="space-y-2 text-sm text-orange-800 list-decimal list-inside">
                        {rlsResult.instructions.filter(i => i.trim()).map((instruction, i) => (
                          <li key={i}>{instruction}</li>
                        ))}
                      </ol>
                      {rlsResult.sqlCommand && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold mb-2 text-orange-900">SQL-Befehl (kopieren Sie diesen):</p>
                          <pre className="p-3 bg-slate-900 text-slate-100 border border-orange-200 rounded text-sm overflow-x-auto font-mono">
                            {rlsResult.sqlCommand}
                          </pre>
                          <div className="flex gap-2 mt-2">
                            <Button
                              onClick={() => {
                                navigator.clipboard.writeText(rlsResult.sqlCommand!)
                                alert('SQL-Befehl in Zwischenablage kopiert!')
                              }}
                              variant="outline"
                              size="sm"
                            >
                              SQL-Befehl kopieren
                            </Button>
                            <Button
                              onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                              variant="outline"
                              size="sm"
                            >
                              Supabase Dashboard öffnen
                            </Button>
                          </div>
                        </div>
                      )}
                      <Alert className="mt-4 border-red-500 bg-red-50">
                        <AlertDescription className="text-red-900 text-sm">
                          Nach dem Ausführen des SQL-Befehls im Supabase Dashboard, laden Sie bitte diese Seite neu und testen Sie den Admin-Zugriff.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto border-blue-200">
        <CardHeader>
          <CardTitle>4. FAQ-Kategorien korrigieren</CardTitle>
          <CardDescription>
            Aktualisiert die FAQ-Kategorien von alten zu neuen Werten (ki-chatbots, automatisierung, etc.)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription className="text-blue-800">
              Dies behebt das Problem, dass FAQs mit falschen Kategorien nicht auf der Website angezeigt werden.
            </AlertDescription>
          </Alert>

          <Button onClick={fixFaqCategories} disabled={faqCategoryLoading} className="w-full">
            {faqCategoryLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {faqCategoryLoading ? 'Kategorien werden korrigiert...' : 'FAQ-Kategorien korrigieren'}
          </Button>

          {faqCategoryResult && (
            <div className="flex items-center gap-2 p-3 border rounded">
              {faqCategoryResult.success ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <p className={faqCategoryResult.success ? 'text-green-700' : 'text-red-700'}>
                {faqCategoryResult.message}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>5. Demo-Daten einfügen</CardTitle>
          <CardDescription>
            Füllen Sie die Datenbank mit Demo-Daten für Portfolio, Services, Team, Testimonials, FAQs und Blog.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              Dieser Vorgang fügt Demo-Daten in die Datenbank ein. Existierende Daten werden aktualisiert.
            </AlertDescription>
          </Alert>

          <Button onClick={seedDemoData} disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Demo-Daten werden eingefügt...' : 'Demo-Daten jetzt einfügen'}
          </Button>

          {results.length > 0 && (
            <div className="space-y-2 mt-6">
              <h3 className="font-semibold">Ergebnisse:</h3>
              {results.map((result, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  {result.success ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium">{result.table}</p>
                    <p className="text-sm text-muted-foreground">{result.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

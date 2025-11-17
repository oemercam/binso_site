"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save } from 'lucide-react'


type SiteSettings = {
  id: string
  company_name: string
  company_slogan: string
  company_email: string
  company_phone: string
  company_address: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  meta_author: string
  social_facebook: string
  social_instagram: string
  social_twitter: string
  social_linkedin: string
  social_youtube: string
  primary_color: string
  header_visible: boolean
  footer_visible: boolean
  chatbot_enabled: boolean
  maintenance_mode: boolean
  maintenance_message: string
  contact_form_email: string
  google_analytics_id: string
  google_tag_manager_id: string
  facebook_pixel_id: string
  hero_title: string
  hero_title_highlight: string
  hero_subtitle: string
  hero_cta_primary_text: string
  hero_cta_primary_link: string
  hero_cta_secondary_text: string
  hero_cta_secondary_link: string
  footer_tagline: string
  footer_copyright: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const supabase = createClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  const normalizeSettings = (data: any): SiteSettings => {
    return {
      ...data,
      company_name: data.company_name || "",
      company_slogan: data.company_slogan || "",
      company_email: data.company_email || "",
      company_phone: data.company_phone || "",
      company_address: data.company_address || "",
      meta_title: data.meta_title || "",
      meta_description: data.meta_description || "",
      meta_keywords: data.meta_keywords || "",
      meta_author: data.meta_author || "",
      social_facebook: data.social_facebook || "",
      social_instagram: data.social_instagram || "",
      social_twitter: data.social_twitter || "",
      social_linkedin: data.social_linkedin || "",
      social_youtube: data.social_youtube || "",
      primary_color: data.primary_color || "#6366f1",
      header_visible: data.header_visible ?? true,
      footer_visible: data.footer_visible ?? true,
      chatbot_enabled: data.chatbot_enabled ?? true,
      maintenance_mode: data.maintenance_mode ?? false,
      maintenance_message: data.maintenance_message || "",
      contact_form_email: data.contact_form_email || "",
      google_analytics_id: data.google_analytics_id || "",
      google_tag_manager_id: data.google_tag_manager_id || "",
      facebook_pixel_id: data.facebook_pixel_id || "",
      hero_title: data.hero_title || "Digitale Lösungen mit",
      hero_title_highlight: data.hero_title_highlight || "KI & Automatisierung",
      hero_subtitle: data.hero_subtitle || "Wir entwickeln intelligente Chatbots, automatisieren Ihre Geschäftsprozesse und bauen moderne Web- und Mobile-Apps – damit Sie mehr Zeit für Ihr Kerngeschäft haben.",
      hero_cta_primary_text: data.hero_cta_primary_text || "Jetzt Kontakt aufnehmen",
      hero_cta_primary_link: data.hero_cta_primary_link || "/kontakt",
      hero_cta_secondary_text: data.hero_cta_secondary_text || "Mehr erfahren",
      hero_cta_secondary_link: data.hero_cta_secondary_link || "/ueber-uns",
      footer_tagline: data.footer_tagline || "Ihr KI-gestützter Entwicklungspartner für hochwertige, skalierbare Plattformen.",
      footer_copyright: data.footer_copyright || "© {year} Binso GmbH. Alle Rechte vorbehalten.",
    }
  }

  const fetchSettings = async () => {
    const { data, error } = await supabase.from("site_settings").select("*").limit(1).single()

    if (!error && data) {
      setSettings(normalizeSettings(data))
    } else if (error && error.code === 'PGRST116') {
      const defaultSettings = {
        company_name: "binso",
        company_slogan: "Digitale Lösungen mit KI & Automatisierung",
        company_email: "info@binso.ch",
        company_phone: "+41 XX XXX XX XX",
        company_address: "",
        meta_title: "binso - IT Dienstleistungen",
        meta_description: "Wir bieten IT-Dienstleistungen für Privat und Geschäfte: Azure M365, Cyber Security, Consulting, Support, Cloud, Modern Workplace, KI & Automation, Website-Entwicklung und IT-Outsourcing.",
        meta_keywords: "IT Dienstleistungen, Azure M365, Cyber Security, Cloud, IT Support",
        meta_author: "binso",
        social_facebook: "",
        social_instagram: "",
        social_twitter: "",
        social_linkedin: "",
        social_youtube: "",
        primary_color: "#6366f1",
        header_visible: true,
        footer_visible: true,
        chatbot_enabled: true,
        maintenance_mode: false,
        maintenance_message: "",
        contact_form_email: "info@binso.ch",
        google_analytics_id: "",
        google_tag_manager_id: "",
        facebook_pixel_id: "",
        hero_title: "Digitale Lösungen mit",
        hero_title_highlight: "KI & Automatisierung",
        hero_subtitle: "Wir entwickeln intelligente Chatbots, automatisieren Ihre Geschäftsprozesse und bauen moderne Web- und Mobile-Apps – damit Sie mehr Zeit für Ihr Kerngeschäft haben.",
        hero_cta_primary_text: "Jetzt Kontakt aufnehmen",
        hero_cta_primary_link: "/kontakt",
        hero_cta_secondary_text: "Mehr erfahren",
        hero_cta_secondary_link: "/ueber-uns",
        footer_tagline: "Ihr KI-gestützter Entwicklungspartner für hochwertige, skalierbare Plattformen.",
        footer_copyright: "© {year} Binso GmbH. Alle Rechte vorbehalten.",
      }
      setSettings(defaultSettings as SiteSettings)
    }
    setLoading(false)
  }

  const handleSave = async () => {
    if (!settings) return
    
    setSaving(true)
    setError("")
    setSuccess(false)

    try {
      if (settings.id) {
        const { error: updateError } = await supabase
          .from("site_settings")
          .update({ ...settings, updated_at: new Date().toISOString() })
          .eq("id", settings.id)

        if (updateError) throw updateError
      } else {
        const { data, error: insertError } = await supabase
          .from("site_settings")
          .insert([settings])
          .select()
          .single()

        if (insertError) throw insertError
        if (data) setSettings(data)
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || "Ein Fehler ist aufgetreten")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Laden...</p>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Einstellungen konnten nicht geladen werden</p>
      </div>
    )
  }

  const TabButton = ({ value, label }: { value: string; label: string }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 font-medium rounded-md transition-colors ${
        activeTab === value
          ? "bg-primary text-primary-foreground"
          : "bg-muted hover:bg-muted/80"
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Einstellungen</h1>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Wird gespeichert..." : "Speichern"}
        </Button>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">Einstellungen erfolgreich gespeichert!</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        <TabButton value="general" label="Allgemein" />
        <TabButton value="hero" label="Hero-Section" />
        <TabButton value="seo" label="SEO" />
        <TabButton value="social" label="Social Media" />
        <TabButton value="features" label="Features" />
        <TabButton value="tracking" label="Tracking" />
      </div>

      <div className="space-y-6">
        {activeTab === "general" && (
          <Card>
            <CardHeader>
              <CardTitle>Unternehmensinfo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company_name">Firmenname</Label>
                  <Input
                    id="company_name"
                    value={settings.company_name}
                    onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary_color">Primärfarbe</Label>
                  <Input
                    id="primary_color"
                    type="color"
                    value={settings.primary_color}
                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_slogan">Slogan</Label>
                <Input
                  id="company_slogan"
                  value={settings.company_slogan}
                  onChange={(e) => setSettings({ ...settings, company_slogan: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company_email">E-Mail</Label>
                  <Input
                    id="company_email"
                    type="email"
                    value={settings.company_email}
                    onChange={(e) => setSettings({ ...settings, company_email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company_phone">Telefon</Label>
                  <Input
                    id="company_phone"
                    value={settings.company_phone}
                    onChange={(e) => setSettings({ ...settings, company_phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_address">Adresse</Label>
                <Textarea
                  id="company_address"
                  value={settings.company_address}
                  onChange={(e) => setSettings({ ...settings, company_address: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_form_email">Kontaktformular E-Mail</Label>
                <Input
                  id="contact_form_email"
                  type="email"
                  value={settings.contact_form_email}
                  onChange={(e) => setSettings({ ...settings, contact_form_email: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "hero" && (
          <Card>
            <CardHeader>
              <CardTitle>Hero-Section & Footer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero_title">Haupttitel (erste Zeile)</Label>
                <Input
                  id="hero_title"
                  value={settings.hero_title}
                  onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                  placeholder="Digitale Lösungen mit"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero_title_highlight">Titel Highlight (zweite Zeile)</Label>
                <Input
                  id="hero_title_highlight"
                  value={settings.hero_title_highlight}
                  onChange={(e) => setSettings({ ...settings, hero_title_highlight: e.target.value })}
                  placeholder="KI & Automatisierung"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero_subtitle">Untertitel</Label>
                <Textarea
                  id="hero_subtitle"
                  value={settings.hero_subtitle}
                  onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                  rows={3}
                  placeholder="Beschreibung Ihres Angebots..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero_cta_primary_text">Primärer Button Text</Label>
                  <Input
                    id="hero_cta_primary_text"
                    value={settings.hero_cta_primary_text}
                    onChange={(e) => setSettings({ ...settings, hero_cta_primary_text: e.target.value })}
                    placeholder="Jetzt Kontakt aufnehmen"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero_cta_primary_link">Primärer Button Link</Label>
                  <Input
                    id="hero_cta_primary_link"
                    value={settings.hero_cta_primary_link}
                    onChange={(e) => setSettings({ ...settings, hero_cta_primary_link: e.target.value })}
                    placeholder="/kontakt"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero_cta_secondary_text">Sekundärer Button Text</Label>
                  <Input
                    id="hero_cta_secondary_text"
                    value={settings.hero_cta_secondary_text}
                    onChange={(e) => setSettings({ ...settings, hero_cta_secondary_text: e.target.value })}
                    placeholder="Mehr erfahren"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero_cta_secondary_link">Sekundärer Button Link</Label>
                  <Input
                    id="hero_cta_secondary_link"
                    value={settings.hero_cta_secondary_link}
                    onChange={(e) => setSettings({ ...settings, hero_cta_secondary_link: e.target.value })}
                    placeholder="/ueber-uns"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="footer_tagline">Footer Tagline</Label>
                <Input
                  id="footer_tagline"
                  value={settings.footer_tagline}
                  onChange={(e) => setSettings({ ...settings, footer_tagline: e.target.value })}
                  placeholder="Ihr KI-gestützter Entwicklungspartner..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="footer_copyright">Footer Copyright</Label>
                <Input
                  id="footer_copyright"
                  value={settings.footer_copyright}
                  onChange={(e) => setSettings({ ...settings, footer_copyright: e.target.value })}
                  placeholder="© {year} Binso GmbH. Alle Rechte vorbehalten."
                />
                <p className="text-sm text-muted-foreground">
                  Verwenden Sie {'{year}'} für das aktuelle Jahr
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "seo" && (
          <Card>
            <CardHeader>
              <CardTitle>SEO Einstellungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta_title">Meta Titel</Label>
                <Input
                  id="meta_title"
                  value={settings.meta_title}
                  onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Beschreibung</Label>
                <Textarea
                  id="meta_description"
                  value={settings.meta_description}
                  onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_keywords">Meta Keywords</Label>
                <Input
                  id="meta_keywords"
                  value={settings.meta_keywords}
                  onChange={(e) => setSettings({ ...settings, meta_keywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_author">Meta Autor</Label>
                <Input
                  id="meta_author"
                  value={settings.meta_author}
                  onChange={(e) => setSettings({ ...settings, meta_author: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "social" && (
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="social_facebook">Facebook</Label>
                <Input
                  id="social_facebook"
                  type="url"
                  value={settings.social_facebook}
                  onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_instagram">Instagram</Label>
                <Input
                  id="social_instagram"
                  type="url"
                  value={settings.social_instagram}
                  onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_twitter">Twitter/X</Label>
                <Input
                  id="social_twitter"
                  type="url"
                  value={settings.social_twitter}
                  onChange={(e) => setSettings({ ...settings, social_twitter: e.target.value })}
                  placeholder="https://twitter.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_linkedin">LinkedIn</Label>
                <Input
                  id="social_linkedin"
                  type="url"
                  value={settings.social_linkedin}
                  onChange={(e) => setSettings({ ...settings, social_linkedin: e.target.value })}
                  placeholder="https://linkedin.com/company/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_youtube">YouTube</Label>
                <Input
                  id="social_youtube"
                  type="url"
                  value={settings.social_youtube}
                  onChange={(e) => setSettings({ ...settings, social_youtube: e.target.value })}
                  placeholder="https://youtube.com/..."
                />
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "features" && (
          <Card>
            <CardHeader>
              <CardTitle>Features & Sichtbarkeit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="header_visible">Header anzeigen</Label>
                  <p className="text-sm text-gray-600">Header-Navigation auf der Website anzeigen</p>
                </div>
                <Switch
                  id="header_visible"
                  checked={settings.header_visible}
                  onCheckedChange={(checked) => setSettings({ ...settings, header_visible: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="footer_visible">Footer anzeigen</Label>
                  <p className="text-sm text-gray-600">Footer auf der Website anzeigen</p>
                </div>
                <Switch
                  id="footer_visible"
                  checked={settings.footer_visible}
                  onCheckedChange={(checked) => setSettings({ ...settings, footer_visible: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="chatbot_enabled">Chatbot aktiviert</Label>
                  <p className="text-sm text-gray-600">KI-Chatbot auf der Website anzeigen</p>
                </div>
                <Switch
                  id="chatbot_enabled"
                  checked={settings.chatbot_enabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, chatbot_enabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg border-red-200">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance_mode" className="text-red-600">Wartungsmodus</Label>
                  <p className="text-sm text-gray-600">Website für Besucher sperren</p>
                </div>
                <Switch
                  id="maintenance_mode"
                  checked={settings.maintenance_mode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenance_mode: checked })}
                />
              </div>

              {settings.maintenance_mode && (
                <div className="space-y-2">
                  <Label htmlFor="maintenance_message">Wartungsmeldung</Label>
                  <Textarea
                    id="maintenance_message"
                    value={settings.maintenance_message}
                    onChange={(e) => setSettings({ ...settings, maintenance_message: e.target.value })}
                    placeholder="Nachricht die während dem Wartungsmodus angezeigt wird"
                    rows={3}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "tracking" && (
          <Card>
            <CardHeader>
              <CardTitle>Tracking & Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                <Input
                  id="google_analytics_id"
                  value={settings.google_analytics_id}
                  onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google_tag_manager_id">Google Tag Manager ID</Label>
                <Input
                  id="google_tag_manager_id"
                  value={settings.google_tag_manager_id}
                  onChange={(e) => setSettings({ ...settings, google_tag_manager_id: e.target.value })}
                  placeholder="GTM-XXXXXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook_pixel_id">Facebook Pixel ID</Label>
                <Input
                  id="facebook_pixel_id"
                  value={settings.facebook_pixel_id}
                  onChange={(e) => setSettings({ ...settings, facebook_pixel_id: e.target.value })}
                  placeholder="XXXXXXXXXXXXXXXX"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Wird gespeichert..." : "Speichern"}
        </Button>
      </div>
    </div>
  )
}

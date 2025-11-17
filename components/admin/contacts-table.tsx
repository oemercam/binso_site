"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Contact = {
  id: string
  vorname: string
  nachname: string
  email: string
  telefon: string
  firma: string
  nachricht: string
  status: string
  created_at: string
}

export function ContactsTable({ contacts }: { contacts: Contact[] }) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoading(true)
    await supabase.from("contact_submissions").update({ status: newStatus }).eq("id", id)
    router.refresh()
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Kontaktanfrage wirklich löschen?")) return
    setLoading(true)
    await supabase.from("contact_submissions").delete().eq("id", id)
    router.refresh()
    setLoading(false)
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      neu: { label: "Neu", className: "bg-blue-100 text-blue-800" },
      in_bearbeitung: { label: "In Bearbeitung", className: "bg-yellow-100 text-yellow-800" },
      abgeschlossen: { label: "Abgeschlossen", className: "bg-green-100 text-green-800" },
    }
    const config = statusMap[status] || statusMap.neu
    return <Badge className={config.className}>{config.label}</Badge>
  }

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-600">Noch keine Kontaktanfragen vorhanden.</p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>E-Mail</TableHead>
              <TableHead>Firma</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">
                  {contact.vorname} {contact.nachname}
                </TableCell>
                <TableCell className="text-sm">{contact.email}</TableCell>
                <TableCell>{contact.firma || "-"}</TableCell>
                <TableCell>
                  <Select
                    value={contact.status}
                    onValueChange={(value) => handleStatusChange(contact.id, value)}
                    disabled={loading}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="neu">Neu</SelectItem>
                      <SelectItem value="in_bearbeitung">In Bearbeitung</SelectItem>
                      <SelectItem value="abgeschlossen">Abgeschlossen</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {new Date(contact.created_at).toLocaleDateString("de-CH", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedContact(contact)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(contact.id)} disabled={loading}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Kontaktanfrage Details</DialogTitle>
            <DialogDescription>
              Eingegangen am {selectedContact && new Date(selectedContact.created_at).toLocaleString("de-CH")}
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Name</p>
                  <p className="text-base">
                    {selectedContact.vorname} {selectedContact.nachname}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">E-Mail</p>
                  <p className="text-base">{selectedContact.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Telefon</p>
                  <p className="text-base">{selectedContact.telefon || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Firma</p>
                  <p className="text-base">{selectedContact.firma || "-"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Nachricht</p>
                <p className="text-base bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{selectedContact.nachricht}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

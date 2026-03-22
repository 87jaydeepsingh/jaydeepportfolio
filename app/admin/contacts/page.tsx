"use client"

import { useEffect, useState } from "react"
import { Mail, Clock, User, Trash2, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Contact } from "@/lib/types"

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contacts")
      const data = await response.json()
      setContacts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching contacts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      })
      fetchContacts()
    } catch (error) {
      console.error("Error marking as read:", error)
    }
  }

  const deleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return
    
    try {
      await fetch(`/api/contacts/${id}`, { method: "DELETE" })
      fetchContacts()
      if (selectedContact?._id === id) {
        setSelectedContact(null)
      }
    } catch (error) {
      console.error("Error deleting contact:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage messages from your contact form.
        </p>
      </div>

      {contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16">
          <Mail className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No messages yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Contact messages will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contact List */}
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => {
                  setSelectedContact(contact)
                  if (!contact.read) {
                    markAsRead(contact._id)
                  }
                }}
                className={`cursor-pointer rounded-xl border p-4 transition-all hover:border-primary/30 hover:shadow-md ${
                  selectedContact?._id === contact._id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                } ${!contact.read ? "border-l-4 border-l-primary" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                    </div>
                  </div>
                  {!contact.read && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      New
                    </span>
                  )}
                </div>
                <p className="mt-3 font-medium">{contact.subject}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {contact.message}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {new Date(contact.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Detail */}
          {selectedContact ? (
            <div className="sticky top-8 h-fit rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedContact.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedContact.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => markAsRead(selectedContact._id)}
                    className="rounded-xl"
                  >
                    {selectedContact.read ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => deleteContact(selectedContact._id)}
                    className="rounded-xl text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-muted-foreground">Subject</p>
                <p className="mt-1 font-medium">{selectedContact.subject}</p>
              </div>

              <div className="mt-6">
                <p className="text-sm text-muted-foreground">Message</p>
                <p className="mt-2 whitespace-pre-wrap leading-relaxed">
                  {selectedContact.message}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {new Date(selectedContact.createdAt).toLocaleString()}
              </div>

              <div className="mt-6">
                <Button
                  onClick={() => window.open(`mailto:${selectedContact.email}`)}
                  className="w-full rounded-xl"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Reply via Email
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border">
              <p className="text-muted-foreground">Select a message to view details</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

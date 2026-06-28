"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Trash2, Mail, Calendar, User, Phone, MessageSquare } from "lucide-react"

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  created_at: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    const { data, error } = await createClient().from('messages').select('*').order('created_at', { ascending: false })
    if (data) setMessages(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await createClient().from('messages').delete().eq('id', id)
      fetchMessages()
    }
  }

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin w-8 h-8 border-t-2 border-primary rounded-full"></div></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground mt-1">View messages sent from your contact form.</p>
        </div>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
          {messages.length} Total
        </div>
      </div>

      <div className="grid gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-card border border-border/50 rounded-xl p-6 relative group">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <User className="w-4 h-4" />
                    {msg.name}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${msg.email}`} className="hover:text-primary transition-colors">{msg.email}</a>
                  </div>
                  {msg.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4" />
                      <a href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">{msg.phone}</a>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(msg.created_at).toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg border border-border/30 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                  {msg.message}
                </div>
                
                <div className="flex gap-3 pt-2">
                  <a href={`mailto:${msg.email}?subject=Reply from Portfolio`} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                    <Mail className="w-4 h-4" />
                    Reply via Email
                  </a>
                  {msg.phone && (
                    <a href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#25D366] text-white hover:bg-[#20bd5a] h-9 px-4 py-2">
                      <MessageSquare className="w-4 h-4" />
                      Reply via WA
                    </a>
                  )}
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                onClick={() => handleDelete(msg.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center p-12 border border-dashed border-border/50 rounded-xl text-muted-foreground">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  )
}

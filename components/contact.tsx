"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Mail, Github, Linkedin, Phone, Send, Loader2, CheckCircle } from "lucide-react"

interface Profile {
  email: string
  phone: string
  github_url: string
  linkedin_url: string
}

export default function Contact() {
  const [profile, setProfile] = useState<Profile | null>(null)
  
  // Form State
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await supabase.from('profile').select('*').limit(1).single()
      if (data) setProfile(data)
    }
    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const { error } = await supabase.from('messages').insert([
        { name, email, message }
      ])
      
      if (error) throw error

      // Attempt to send email notification (fails silently if email env vars are not set)
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        })
      } catch (emailErr) {
        console.error("Email sending failed, but message was saved to database:", emailErr)
      }
      
      setSubmitStatus("success")
      setName("")
      setEmail("")
      setMessage("")
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } catch (err) {
      console.error("Error sending message:", err)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!profile) return null

  return (
    <section id="contact" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Get In Touch</h2>
        <div className="w-20 h-1 bg-primary rounded-full"></div>
      </div>

      <div className="rounded-2xl bg-primary/5 p-8 border border-primary/10">
        <h3 className="text-2xl font-bold mb-2">Let's build something together.</h3>
        <p className="text-muted-foreground mb-8">
          Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground/80 uppercase tracking-wider">Find me online</h4>
            <div className="flex gap-4">
              {profile.email && (
                <a href={`mailto:${profile.email}`} aria-label="Email" className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                  <Mail className="w-5 h-5" />
                </a>
              )}
              {profile.phone && (
                <a href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`} aria-label="Phone" className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/80 transition-colors border border-border/50">
                  <Phone className="w-5 h-5" />
                </a>
              )}
              {profile.github_url && (
                <a href={profile.github_url} target="_blank" aria-label="GitHub" rel="noreferrer" className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/80 transition-colors border border-border/50">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {profile.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" aria-label="LinkedIn" rel="noreferrer" className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/80 transition-colors border border-border/50">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground/80 uppercase tracking-wider">Send me a message</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <textarea 
                placeholder="Your Message" 
                required
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              />
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground font-medium rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : submitStatus === "success" ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Message Sent
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
              
              {submitStatus === "error" && (
                <p className="text-sm text-destructive mt-2 text-center">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

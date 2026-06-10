"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save, User } from "lucide-react"

interface Profile {
  id: string
  name: string
  role: string
  bio: string
  resume_url: string
  email: string
  github_url: string
  linkedin_url: string
}

export default function AdminProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    const { data, error } = await supabase.from('profile').select('*').limit(1).single()
    if (data) {
      setProfile(data)
    }
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!profile) return
    
    setSaving(true)
    const { error } = await supabase
      .from('profile')
      .update({
        name: profile.name,
        role: profile.role,
        bio: profile.bio,
        resume_url: profile.resume_url,
        email: profile.email,
        github_url: profile.github_url,
        linkedin_url: profile.linkedin_url
      })
      .eq('id', profile.id)
      
    setSaving(false)
    if (!error) {
      alert("Profile updated successfully!")
    } else {
      alert("Error updating profile")
    }
  }

  if (loading) {
    return <div className="text-muted-foreground animate-pulse">Loading profile data...</div>
  }

  if (!profile) {
    return <div className="text-destructive">No profile found in database. Please run the init SQL.</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your public information and social links.</p>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold">General Information</h2>
            <p className="text-sm text-muted-foreground">This info will be displayed on the homepage.</p>
          </div>
        </div>
        
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={profile.name} 
                onChange={e => setProfile({...profile, name: e.target.value})} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role / Headline</Label>
              <Input 
                id="role" 
                value={profile.role} 
                onChange={e => setProfile({...profile, role: e.target.value})} 
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biography</Label>
            <Textarea 
              id="bio" 
              value={profile.bio} 
              onChange={e => setProfile({...profile, bio: e.target.value})} 
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume_url">Resume Link (PDF URL or Path)</Label>
            <Input 
              id="resume_url" 
              value={profile.resume_url} 
              onChange={e => setProfile({...profile, resume_url: e.target.value})} 
            />
          </div>

          <hr className="border-border/50" />
          
          <h3 className="font-semibold text-lg">Contact & Social Links</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email"
                value={profile.email} 
                onChange={e => setProfile({...profile, email: e.target.value})} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input 
                id="github_url" 
                value={profile.github_url} 
                onChange={e => setProfile({...profile, github_url: e.target.value})} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input 
                id="linkedin_url" 
                value={profile.linkedin_url} 
                onChange={e => setProfile({...profile, linkedin_url: e.target.value})} 
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

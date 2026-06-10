"use client"

import { useEffect, useState, useRef } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save, User, Upload, Loader2 } from "lucide-react"

interface Profile {
  id: string
  name: string
  role: string
  bio: string
  full_bio: string
  avatar_url: string
  resume_url: string
  email: string
  phone: string
  github_url: string
  linkedin_url: string
  instagram_url: string
}

export default function AdminProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const resumeInputRef = useRef<HTMLInputElement>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)
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
        full_bio: profile.full_bio,
        avatar_url: profile.avatar_url,
        resume_url: profile.resume_url,
        email: profile.email,
        phone: profile.phone,
        github_url: profile.github_url,
        linkedin_url: profile.linkedin_url,
        instagram_url: profile.instagram_url
      })
      .eq('id', profile.id)
      
    setSaving(false)
    if (!error) {
      alert("Profile updated successfully!")
    } else {
      alert("Error updating profile")
    }
  }

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !profile) return

    setUploadingResume(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `resumes/${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await createClient().storage
        .from('portfolio')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = createClient().storage
        .from('portfolio')
        .getPublicUrl(filePath)

      if (data?.publicUrl) {
        setProfile({ ...profile, resume_url: data.publicUrl })
        alert("Resume uploaded! Don't forget to click 'Save Changes'.")
      }
    } catch (error: any) {
      console.error("Error uploading resume:", error)
      alert("Failed to upload resume: " + error.message)
    } finally {
      setUploadingResume(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !profile) return

    setUploadingAvatar(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `avatars/${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await createClient().storage
        .from('portfolio')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = createClient().storage
        .from('portfolio')
        .getPublicUrl(filePath)

      if (data?.publicUrl) {
        setProfile({ ...profile, avatar_url: data.publicUrl })
      }
    } catch (error: any) {
      console.error("Error uploading avatar:", error)
      alert("Failed to upload avatar: " + error.message)
    } finally {
      setUploadingAvatar(false)
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
            <div className="space-y-2 md:col-span-2">
              <Label>Avatar Image (Profile Picture)</Label>
              <div className="flex gap-4 items-end">
                {profile.avatar_url && (
                  <div className="w-16 h-16 rounded-full border border-border/50 relative overflow-hidden bg-muted flex-shrink-0 flex items-center justify-center">
                    <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 flex gap-2">
                  <Input 
                    value={profile.avatar_url || ''} 
                    onChange={e => setProfile({...profile, avatar_url: e.target.value})} 
                    placeholder="https://... or upload image" 
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={avatarInputRef}
                    onChange={handleAvatarUpload}
                  />
                  <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={uploadingAvatar}
                  >
                    {uploadingAvatar ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>

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
            <Label htmlFor="bio">Short Tagline (Sidebar)</Label>
            <Textarea 
              id="bio" 
              value={profile.bio} 
              onChange={e => setProfile({...profile, bio: e.target.value})} 
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_bio">Full Biography (About Section)</Label>
            <Textarea 
              id="full_bio" 
              value={profile.full_bio || ''} 
              onChange={e => setProfile({...profile, full_bio: e.target.value})} 
              rows={6}
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="resume_url">Resume Link (PDF URL or Path)</Label>
            <div className="flex gap-2">
              <Input 
                id="resume_url" 
                value={profile.resume_url} 
                onChange={e => setProfile({...profile, resume_url: e.target.value})} 
              />
              <input 
                type="file" 
                accept=".pdf,.doc,.docx"
                id="resume-upload"
                className="hidden"
                onChange={handleResumeUpload}
              />
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => document.getElementById('resume-upload')?.click()}
                disabled={uploadingResume}
              >
                {uploadingResume ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <hr className="border-border/50" />
          
          <h3 className="font-semibold text-lg">Contact & Social Links</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email"
                value={profile.email || ''} 
                onChange={e => setProfile({...profile, email: e.target.value})} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number / WhatsApp</Label>
              <Input 
                id="phone" 
                type="text"
                placeholder="+62812..."
                value={profile.phone || ''} 
                onChange={e => setProfile({...profile, phone: e.target.value})} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input 
                id="github_url" 
                value={profile.github_url || ''} 
                onChange={e => setProfile({...profile, github_url: e.target.value})} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input 
                id="linkedin_url" 
                value={profile.linkedin_url || ''} 
                onChange={e => setProfile({...profile, linkedin_url: e.target.value})} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input 
                id="instagram_url" 
                value={profile.instagram_url || ''} 
                onChange={e => setProfile({...profile, instagram_url: e.target.value})} 
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

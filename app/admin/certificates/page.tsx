"use client"

import { useEffect, useState, useRef } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, X, Save, Upload, Loader2, Image as ImageIcon, FileText } from "lucide-react"
import Image from "next/image"

interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  link: string
  image: string
}

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentCert, setCurrentCert] = useState<Partial<Certificate>>({})
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingPdf, setUploadingPdf] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const pdfInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchCertificates()
  }, [])

  async function fetchCertificates() {
    setLoading(true)
    const { data, error } = await createClient().from('certificates').select('*').order('created_at', { ascending: false })
    if (data) setCertificates(data)
    setLoading(false)
  }

  const handleAddNew = () => {
    setCurrentCert({
      title: "",
      issuer: "",
      date: "",
      link: "",
      image: ""
    })
    setIsEditing(true)
  }

  const handleEdit = (cert: Certificate) => {
    setCurrentCert(cert)
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      await createClient().from('certificates').delete().eq('id', id)
      fetchCertificates()
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentCert.id) {
      await createClient().from('certificates').update(currentCert).eq('id', currentCert.id)
    } else {
      await createClient().from('certificates').insert([currentCert])
    }
    
    setIsEditing(false)
    fetchCertificates()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `certificates/${fileName}`

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
        setCurrentCert({ ...currentCert, image: data.publicUrl })
      }
    } catch (error: any) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image: " + error.message)
    } finally {
      setUploadingImage(false)
    }
  }

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingPdf(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `pdfs/${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `certificates/${fileName}`

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
        setCurrentCert({ ...currentCert, link: data.publicUrl })
      }
    } catch (error: any) {
      console.error("Error uploading pdf:", error)
      alert("Failed to upload PDF: " + error.message)
    } finally {
      setUploadingPdf(false)
    }
  }

  if (loading && !isEditing) {
    return <div className="flex justify-center p-12"><div className="animate-spin w-8 h-8 border-t-2 border-primary rounded-full"></div></div>
  }

  if (isEditing) {
    return (
      <div className="bg-card border border-border/50 rounded-xl p-6 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{currentCert.id ? 'Edit Certificate' : 'Add New Certificate'}</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Certificate Title</Label>
              <Input value={currentCert.title || ''} onChange={e => setCurrentCert({...currentCert, title: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Issuer (e.g., Coursera, AWS)</Label>
              <Input value={currentCert.issuer || ''} onChange={e => setCurrentCert({...currentCert, issuer: e.target.value})} required />
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date / Year</Label>
              <Input value={currentCert.date || ''} onChange={e => setCurrentCert({...currentCert, date: e.target.value})} placeholder="e.g., Jan 2024 or 2024" required />
            </div>
            <div className="space-y-2">
              <Label>Credential URL (or Upload PDF)</Label>
              <div className="flex gap-2">
                <Input value={currentCert.link || ''} onChange={e => setCurrentCert({...currentCert, link: e.target.value})} placeholder="https://... or upload PDF" />
                
                <input 
                  type="file" 
                  accept="application/pdf" 
                  className="hidden" 
                  ref={pdfInputRef}
                  onChange={handlePdfUpload}
                />
                
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => pdfInputRef.current?.click()}
                  disabled={uploadingPdf}
                  title="Upload PDF File"
                >
                  {uploadingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Certificate Image (Thumbnail)</Label>
            <div className="flex gap-4 items-end">
              {currentCert.image && (
                <div className="w-24 h-16 rounded border border-border/50 relative overflow-hidden bg-muted flex-shrink-0 flex items-center justify-center">
                  {currentCert.image.includes('.pdf') ? (
                    <FileText className="w-8 h-8 text-primary" />
                  ) : (
                    <Image src={currentCert.image} alt="Preview" fill className="object-cover" />
                  )}
                </div>
              )}
              <div className="flex-1 flex gap-2">
                <Input value={currentCert.image || ''} onChange={e => setCurrentCert({...currentCert, image: e.target.value})} placeholder="Image URL or upload..." />
                
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
                
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                >
                  {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Certificate</Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
          <p className="text-muted-foreground mt-1">Manage your certifications and achievements.</p>
        </div>
        <Button onClick={handleAddNew}><Plus className="w-4 h-4 mr-2" /> Add Certificate</Button>
      </div>

      <div className="grid gap-4">
        {certificates.map(cert => (
          <div key={cert.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card border border-border/50 rounded-xl gap-4">
            <div className="flex items-center gap-4">
              {cert.image ? (
                <div className="w-16 h-12 rounded relative overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                  {cert.image.includes('.pdf') ? (
                    <FileText className="w-6 h-6 text-primary" />
                  ) : (
                    <Image src={cert.image} alt={cert.title} fill className="object-cover" />
                  )}
                </div>
              ) : (
                <div className="w-16 h-12 rounded bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <ImageIcon className="w-5 h-5" />
                </div>
              )}
              <div>
                <h3 className="font-semibold">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.date}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(cert)}><Pencil className="w-4 h-4 mr-2" /> Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(cert.id)}><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
            </div>
          </div>
        ))}
        {certificates.length === 0 && (
          <div className="text-center p-12 border border-dashed border-border/50 rounded-xl text-muted-foreground">
            No certificates found. Click "Add Certificate" to create one.
          </div>
        )}
      </div>
    </div>
  )
}

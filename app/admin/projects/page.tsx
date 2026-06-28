"use client"

import { useEffect, useState, useRef } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, X, Save, Minus, Upload, Loader2, Image as ImageIcon, ArrowUp, ArrowDown } from "lucide-react"
import Image from "next/image"

interface Project {
  id: string
  title: string
  description: string
  image: string | string[]
  technologies: string[]
  github: string
  demo: string
  badge: string
  display_order?: number
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({})

  // Dynamic Array States
  const [technologies, setTechnologies] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [uploadingImage, setUploadingImage] = useState<Record<number, boolean>>({})

  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({})

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    setLoading(true)
    const { data, error } = await createClient().from('projects').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: false })
    if (data) setProjects(data)
    setLoading(false)
  }

  const handleAddNew = () => {
    setCurrentProject({
      title: "",
      description: "",
      github: "",
      demo: "",
      badge: ""
    })
    setTechnologies([""])
    setImages([""])
    setUploadingImage({})
    setIsEditing(true)
  }

  const handleEdit = (project: Project) => {
    setCurrentProject(project)
    
    // Parse technologies
    let techArray = project.technologies || []
    if (typeof techArray === 'string') techArray = (techArray as string).split(',').map(t => t.trim())
    setTechnologies(techArray.length > 0 ? techArray : [""])

    // Parse images (handle old string format vs JSON array)
    let imgArray: string[] = []
    if (Array.isArray(project.image)) {
      imgArray = project.image
    } else if (typeof project.image === 'string') {
      try {
        imgArray = JSON.parse(project.image)
        if (!Array.isArray(imgArray)) imgArray = [project.image]
      } catch {
        imgArray = [project.image] // Standard URL
      }
    }
    setImages(imgArray.length > 0 ? imgArray : [""])
    setUploadingImage({})

    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await createClient().from('projects').delete().eq('id', id)
      fetchProjects()
    }
  }

  const handleMoveUp = async (index: number) => {
    if (index === 0) return
    const newOrder = [...projects]
    const temp = newOrder[index]
    newOrder[index] = newOrder[index - 1]
    newOrder[index - 1] = temp
    setProjects(newOrder)

    const updates = newOrder.map((item, i) => 
      createClient().from('projects').update({ display_order: i }).eq('id', item.id)
    )
    await Promise.all(updates)
  }

  const handleMoveDown = async (index: number) => {
    if (index === projects.length - 1) return
    const newOrder = [...projects]
    const temp = newOrder[index]
    newOrder[index] = newOrder[index + 1]
    newOrder[index + 1] = temp
    setProjects(newOrder)

    const updates = newOrder.map((item, i) => 
      createClient().from('projects').update({ display_order: i }).eq('id', item.id)
    )
    await Promise.all(updates)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clean arrays
    const cleanTech = technologies.filter(t => t.trim() !== "")
    const cleanImages = images.filter(i => i.trim() !== "")

    const payload = {
      ...currentProject,
      technologies: cleanTech,
      // Store images as JSON string if database column is text
      image: JSON.stringify(cleanImages)
    }

    if (currentProject.id) {
      await createClient().from('projects').update(payload).eq('id', currentProject.id)
    } else {
      await createClient().from('projects').insert([payload])
    }
    
    setIsEditing(false)
    fetchProjects()
  }

  // Array Handlers
  const handleArrayChange = (setter: any, array: string[], index: number, value: string) => {
    const newArray = [...array]
    newArray[index] = value
    setter(newArray)
  }

  const handleArrayAdd = (setter: any, array: string[]) => {
    setter([...array, ""])
  }

  const handleArrayRemove = (setter: any, array: string[], index: number) => {
    setter(array.filter((_, i) => i !== index))
  }

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(prev => ({ ...prev, [index]: true }))

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `projects/${fileName}`

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
        handleArrayChange(setImages, images, index, data.publicUrl)
      }
    } catch (error: any) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image: " + error.message)
    } finally {
      setUploadingImage(prev => ({ ...prev, [index]: false }))
    }
  }

  if (loading && !isEditing) {
    return <div className="flex justify-center p-12"><div className="animate-spin w-8 h-8 border-t-2 border-primary rounded-full"></div></div>
  }

  if (isEditing) {
    return (
      <div className="bg-card border border-border/50 rounded-xl p-6 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{currentProject.id ? 'Edit Project' : 'Add New Project'}</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={currentProject.title || ''} onChange={e => setCurrentProject({...currentProject, title: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Badge (e.g., NEW, FEATURED)</Label>
              <Input value={currentProject.badge || ''} onChange={e => setCurrentProject({...currentProject, badge: e.target.value})} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={currentProject.description || ''} onChange={e => setCurrentProject({...currentProject, description: e.target.value})} required rows={4} />
          </div>

          {/* Dynamic Images with Upload */}
          <div className="space-y-3 bg-muted/20 p-4 rounded-lg border border-border/50">
            <div className="flex justify-between items-center">
              <Label>Images</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => handleArrayAdd(setImages, images)}>
                <Plus className="w-4 h-4 mr-1" /> Add Image Slot
              </Button>
            </div>
            {images.map((img, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-3 bg-background/50 rounded-md border border-border/50">
                {/* Image Preview */}
                <div className="w-20 h-14 bg-muted rounded border border-border/50 overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                  {img && img.startsWith('http') ? (
                    <Image src={img} alt="Preview" fill className="object-cover" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-muted-foreground opacity-50" />
                  )}
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div className="flex gap-2 w-full">
                    <Input 
                      value={img} 
                      onChange={e => handleArrayChange(setImages, images, index, e.target.value)} 
                      placeholder="Paste URL or click Upload"
                      required 
                    />
                    
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={el => { fileInputRefs.current[index] = el }}
                      onChange={(e) => handleImageUpload(e, index)}
                    />
                    
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={() => fileInputRefs.current[index]?.click()}
                      disabled={uploadingImage[index]}
                    >
                      {uploadingImage[index] ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                    </Button>

                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => handleArrayRemove(setImages, images, index)} 
                      disabled={images.length === 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Technologies */}
          <div className="space-y-3 bg-muted/20 p-4 rounded-lg border border-border/50">
            <div className="flex justify-between items-center">
              <Label>Technologies</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => handleArrayAdd(setTechnologies, technologies)}>
                <Plus className="w-4 h-4 mr-1" /> Add Tech
              </Button>
            </div>
            {technologies.map((tech, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  value={tech} 
                  onChange={e => handleArrayChange(setTechnologies, technologies, index, e.target.value)} 
                  placeholder="React, Next.js, etc."
                  required 
                />
                <Button type="button" variant="destructive" size="icon" onClick={() => handleArrayRemove(setTechnologies, technologies, index)} disabled={technologies.length === 1}>
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>GitHub URL (use # if none)</Label>
              <Input value={currentProject.github || ''} onChange={e => setCurrentProject({...currentProject, github: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Demo URL (use # if none)</Label>
              <Input value={currentProject.demo || ''} onChange={e => setCurrentProject({...currentProject, demo: e.target.value})} required />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Project</Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects.</p>
        </div>
        <Button onClick={handleAddNew}><Plus className="w-4 h-4 mr-2" /> Add Project</Button>
      </div>

      <div className="grid gap-4">
        {projects.map((project, index) => (
          <div key={project.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card border border-border/50 rounded-xl gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleMoveUp(index)} disabled={index === 0}>
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleMoveDown(index)} disabled={index === projects.length - 1}>
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{project.title}</h3>
                  {project.badge && <span className="text-[10px] uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full">{project.badge}</span>}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{project.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(project)}><Pencil className="w-4 h-4 mr-2" /> Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-center p-12 border border-dashed border-border/50 rounded-xl text-muted-foreground">
            No projects found. Click "Add Project" to create one.
          </div>
        )}
      </div>
    </div>
  )
}

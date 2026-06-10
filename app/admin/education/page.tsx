"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, X, Save, Minus } from "lucide-react"

interface Education {
  id: string
  institution: string
  degree: string
  period: string
  location: string
  status: string
  coursework: string[]
  achievements: string[]
}

export default function AdminEducation() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentEducation, setCurrentEducation] = useState<Partial<Education>>({})

  // Dynamic Array States
  const [coursework, setCoursework] = useState<string[]>([])
  const [achievements, setAchievements] = useState<string[]>([])

  useEffect(() => {
    fetchEducation()
  }, [])

  async function fetchEducation() {
    setLoading(true)
    const { data, error } = await createClient().from('education').select('*').order('created_at', { ascending: true })
    if (data) setEducation(data)
    setLoading(false)
  }

  const handleAddNew = () => {
    setCurrentEducation({
      institution: "",
      degree: "",
      period: "",
      location: "",
      status: "",
    })
    setCoursework([""])
    setAchievements([""])
    setIsEditing(true)
  }

  const handleEdit = (edu: Education) => {
    setCurrentEducation(edu)
    
    // Parse coursework
    let courseArray = edu.coursework || []
    if (typeof courseArray === 'string') courseArray = (courseArray as string).split(',').map(s => s.trim())
    setCoursework(courseArray.length > 0 ? courseArray : [""])

    // Parse achievements
    let achievementsArray = edu.achievements || []
    if (typeof achievementsArray === 'string') achievementsArray = (achievementsArray as string).split('|').map(a => a.trim())
    setAchievements(achievementsArray.length > 0 ? achievementsArray : [""])

    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this education entry?")) {
      await createClient().from('education').delete().eq('id', id)
      fetchEducation()
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clean arrays
    const cleanCoursework = coursework.filter(s => s.trim() !== "")
    const cleanAchievements = achievements.filter(a => a.trim() !== "")

    const payload = {
      ...currentEducation,
      coursework: cleanCoursework,
      achievements: cleanAchievements
    }

    if (currentEducation.id) {
      await createClient().from('education').update(payload).eq('id', currentEducation.id)
    } else {
      await createClient().from('education').insert([payload])
    }
    
    setIsEditing(false)
    fetchEducation()
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

  if (loading && !isEditing) {
    return <div className="flex justify-center p-12"><div className="animate-spin w-8 h-8 border-t-2 border-primary rounded-full"></div></div>
  }

  if (isEditing) {
    return (
      <div className="bg-card border border-border/50 rounded-xl p-6 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{currentEducation.id ? 'Edit Education' : 'Add New Education'}</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Institution / University</Label>
              <Input value={currentEducation.institution || ''} onChange={e => setCurrentEducation({...currentEducation, institution: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Degree / Program</Label>
              <Input value={currentEducation.degree || ''} onChange={e => setCurrentEducation({...currentEducation, degree: e.target.value})} required />
            </div>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Period (e.g. 2020 - 2024)</Label>
              <Input value={currentEducation.period || ''} onChange={e => setCurrentEducation({...currentEducation, period: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={currentEducation.location || ''} onChange={e => setCurrentEducation({...currentEducation, location: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Status (e.g. Graduated)</Label>
              <Input value={currentEducation.status || ''} onChange={e => setCurrentEducation({...currentEducation, status: e.target.value})} />
            </div>
          </div>

          {/* Dynamic Coursework */}
          <div className="space-y-3 bg-muted/20 p-4 rounded-lg border border-border/50">
            <div className="flex justify-between items-center">
              <Label>Coursework</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => handleArrayAdd(setCoursework, coursework)}>
                <Plus className="w-4 h-4 mr-1" /> Add Course
              </Button>
            </div>
            {coursework.map((course, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  value={course} 
                  onChange={e => handleArrayChange(setCoursework, coursework, index, e.target.value)} 
                  placeholder="Data Structures, Algorithms, etc."
                />
                <Button type="button" variant="destructive" size="icon" onClick={() => handleArrayRemove(setCoursework, coursework, index)} disabled={coursework.length === 1}>
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Dynamic Achievements */}
          <div className="space-y-3 bg-muted/20 p-4 rounded-lg border border-border/50">
            <div className="flex justify-between items-center">
              <Label>Achievements</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => handleArrayAdd(setAchievements, achievements)}>
                <Plus className="w-4 h-4 mr-1" /> Add Achievement
              </Button>
            </div>
            {achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  value={achievement} 
                  onChange={e => handleArrayChange(setAchievements, achievements, index, e.target.value)} 
                  placeholder="GPA 3.8/4.0, Dean's List..."
                />
                <Button type="button" variant="destructive" size="icon" onClick={() => handleArrayRemove(setAchievements, achievements, index)} disabled={achievements.length === 1}>
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Education</Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Education</h1>
          <p className="text-muted-foreground mt-1">Manage your academic background.</p>
        </div>
        <Button onClick={handleAddNew}><Plus className="w-4 h-4 mr-2" /> Add Education</Button>
      </div>

      <div className="grid gap-4">
        {education.map(edu => (
          <div key={edu.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card border border-border/50 rounded-xl gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{edu.institution}</h3>
                {edu.status && <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">{edu.status}</span>}
              </div>
              <p className="text-sm font-medium mt-1">{edu.degree}</p>
              <p className="text-sm text-muted-foreground">{edu.period}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(edu)}><Pencil className="w-4 h-4 mr-2" /> Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(edu.id)}><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
            </div>
          </div>
        ))}
        {education.length === 0 && (
          <div className="text-center p-12 border border-dashed border-border/50 rounded-xl text-muted-foreground">
            No education history found. Click "Add Education" to create one.
          </div>
        )}
      </div>
    </div>
  )
}

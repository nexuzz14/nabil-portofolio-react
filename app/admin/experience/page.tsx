"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, X, Save, Minus, ArrowUp, ArrowDown } from "lucide-react"

interface Experience {
  id: string
  title: string
  company: string
  period: string
  location: string
  status: string
  skills: string[]
  achievements: string[]
  display_order?: number
}

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentExperience, setCurrentExperience] = useState<Partial<Experience>>({})

  // Dynamic Array States
  const [skills, setSkills] = useState<string[]>([])
  const [achievements, setAchievements] = useState<string[]>([])

  useEffect(() => {
    fetchExperiences()
  }, [])

  async function fetchExperiences() {
    setLoading(true)
    const { data, error } = await createClient().from('experiences').select('*').order('created_at', { ascending: true })
    if (data) setExperiences(data)
    setLoading(false)
  }

  const handleAddNew = () => {
    setCurrentExperience({
      title: "",
      company: "",
      period: "",
      location: "",
      status: "",
    })
    setSkills([""])
    setAchievements([""])
    setIsEditing(true)
  }

  const handleEdit = (exp: Experience) => {
    setCurrentExperience(exp)
    
    // Parse skills
    let skillsArray = exp.skills || []
    if (typeof skillsArray === 'string') skillsArray = (skillsArray as string).split(',').map(s => s.trim())
    setSkills(skillsArray.length > 0 ? skillsArray : [""])

    // Parse achievements
    let achievementsArray = exp.achievements || []
    if (typeof achievementsArray === 'string') achievementsArray = (achievementsArray as string).split('|').map(a => a.trim())
    setAchievements(achievementsArray.length > 0 ? achievementsArray : [""])

    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      await createClient().from('experiences').delete().eq('id', id)
      fetchExperiences()
    }
  }

  const handleMoveUp = async (index: number) => {
    if (index === 0) return
    const newOrder = [...experiences]
    const temp = newOrder[index]
    newOrder[index] = newOrder[index - 1]
    newOrder[index - 1] = temp
    setExperiences(newOrder)

    const updates = newOrder.map((item, i) => 
      createClient().from('experiences').update({ display_order: i }).eq('id', item.id)
    )
    await Promise.all(updates)
  }

  const handleMoveDown = async (index: number) => {
    if (index === experiences.length - 1) return
    const newOrder = [...experiences]
    const temp = newOrder[index]
    newOrder[index] = newOrder[index + 1]
    newOrder[index + 1] = temp
    setExperiences(newOrder)

    const updates = newOrder.map((item, i) => 
      createClient().from('experiences').update({ display_order: i }).eq('id', item.id)
    )
    await Promise.all(updates)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clean arrays
    const cleanSkills = skills.filter(s => s.trim() !== "")
    const cleanAchievements = achievements.filter(a => a.trim() !== "")

    const payload = {
      ...currentExperience,
      skills: cleanSkills,
      achievements: cleanAchievements
    }

    if (currentExperience.id) {
      await createClient().from('experiences').update(payload).eq('id', currentExperience.id)
    } else {
      await createClient().from('experiences').insert([payload])
    }
    
    setIsEditing(false)
    fetchExperiences()
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
          <h2 className="text-xl font-semibold">{currentExperience.id ? 'Edit Experience' : 'Add New Experience'}</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input value={currentExperience.title || ''} onChange={e => setCurrentExperience({...currentExperience, title: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input value={currentExperience.company || ''} onChange={e => setCurrentExperience({...currentExperience, company: e.target.value})} required />
            </div>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Period (e.g. Jan 2020 - Present)</Label>
              <Input value={currentExperience.period || ''} onChange={e => setCurrentExperience({...currentExperience, period: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={currentExperience.location || ''} onChange={e => setCurrentExperience({...currentExperience, location: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Status (e.g. Full-time)</Label>
              <Input value={currentExperience.status || ''} onChange={e => setCurrentExperience({...currentExperience, status: e.target.value})} />
            </div>
          </div>

          {/* Dynamic Skills */}
          <div className="space-y-3 bg-muted/20 p-4 rounded-lg border border-border/50">
            <div className="flex justify-between items-center">
              <Label>Skills Used</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => handleArrayAdd(setSkills, skills)}>
                <Plus className="w-4 h-4 mr-1" /> Add Skill
              </Button>
            </div>
            {skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  value={skill} 
                  onChange={e => handleArrayChange(setSkills, skills, index, e.target.value)} 
                  placeholder="React, Node.js, etc."
                />
                <Button type="button" variant="destructive" size="icon" onClick={() => handleArrayRemove(setSkills, skills, index)} disabled={skills.length === 1}>
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Dynamic Achievements */}
          <div className="space-y-3 bg-muted/20 p-4 rounded-lg border border-border/50">
            <div className="flex justify-between items-center">
              <Label>Achievements / Responsibilities</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => handleArrayAdd(setAchievements, achievements)}>
                <Plus className="w-4 h-4 mr-1" /> Add Item
              </Button>
            </div>
            {achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  value={achievement} 
                  onChange={e => handleArrayChange(setAchievements, achievements, index, e.target.value)} 
                  placeholder="Led a team of 5 developers..."
                />
                <Button type="button" variant="destructive" size="icon" onClick={() => handleArrayRemove(setAchievements, achievements, index)} disabled={achievements.length === 1}>
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Experience</Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground mt-1">Manage your work history.</p>
        </div>
        <Button onClick={handleAddNew}><Plus className="w-4 h-4 mr-2" /> Add Experience</Button>
      </div>

      <div className="grid gap-4">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card border border-border/50 rounded-xl gap-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleMoveUp(index)} disabled={index === 0}>
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleMoveDown(index)} disabled={index === experiences.length - 1}>
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{exp.title}</h3>
                  <span className="text-sm text-muted-foreground">at {exp.company}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(exp)}><Pencil className="w-4 h-4 mr-2" /> Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(exp.id)}><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
            </div>
          </div>
        ))}
        {experiences.length === 0 && (
          <div className="text-center p-12 border border-dashed border-border/50 rounded-xl text-muted-foreground">
            No experiences found. Click "Add Experience" to create one.
          </div>
        )}
      </div>
    </div>
  )
}

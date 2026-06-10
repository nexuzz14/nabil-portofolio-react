"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, X, Save } from "lucide-react"

interface Skill {
  id: string
  name: string
  category: string
}

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentSkill, setCurrentSkill] = useState<Partial<Skill>>({})

  useEffect(() => {
    fetchSkills()
  }, [])

  async function fetchSkills() {
    setLoading(true)
    const { data, error } = await createClient().from('skills').select('*').order('category', { ascending: true })
    if (data) setSkills(data)
    setLoading(false)
  }

  const handleAddNew = () => {
    setCurrentSkill({
      name: "",
      category: ""
    })
    setIsEditing(true)
  }

  const handleEdit = (skill: Skill) => {
    setCurrentSkill(skill)
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      await createClient().from('skills').delete().eq('id', id)
      fetchSkills()
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentSkill.id) {
      await createClient().from('skills').update(currentSkill).eq('id', currentSkill.id)
    } else {
      await createClient().from('skills').insert([currentSkill])
    }
    
    setIsEditing(false)
    fetchSkills()
  }

  if (loading && !isEditing) {
    return <div className="flex justify-center p-12"><div className="animate-spin w-8 h-8 border-t-2 border-primary rounded-full"></div></div>
  }

  if (isEditing) {
    return (
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{currentSkill.id ? 'Edit Skill' : 'Add New Skill'}</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSave} className="space-y-4 max-w-xl">
          <div className="space-y-2">
            <Label>Skill Name</Label>
            <Input value={currentSkill.name || ''} onChange={e => setCurrentSkill({...currentSkill, name: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label>Category (e.g. Frontend, Backend, Database)</Label>
            <Input value={currentSkill.category || ''} onChange={e => setCurrentSkill({...currentSkill, category: e.target.value})} required />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Skill</Button>
          </div>
        </form>
      </div>
    )
  }

  // Group skills by category for display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
          <p className="text-muted-foreground mt-1">Manage your technical skills.</p>
        </div>
        <Button onClick={handleAddNew}><Plus className="w-4 h-4 mr-2" /> Add Skill</Button>
      </div>

      <div className="grid gap-6">
        {Object.entries(groupedSkills).map(([category, catSkills]) => (
          <div key={category} className="space-y-3">
            <h2 className="text-lg font-semibold border-b border-border/50 pb-2">{category}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {catSkills.map(skill => (
                <div key={skill.id} className="flex items-center justify-between p-3 bg-card border border-border/50 rounded-lg group">
                  <span className="font-medium">{skill.name}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(skill)}><Pencil className="w-3 h-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(skill.id)}><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="text-center p-12 border border-dashed border-border/50 rounded-xl text-muted-foreground">
            No skills found. Click "Add Skill" to create one.
          </div>
        )}
      </div>
    </div>
  )
}


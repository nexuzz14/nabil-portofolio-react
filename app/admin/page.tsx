"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Code2, FolderGit2, GraduationCap } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    projects: 0,
    experience: 0,
    skills: 0,
    education: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [projectsReq, experienceReq, skillsReq, educationReq] = await Promise.all([
          createClient().from('projects').select('*', { count: 'exact', head: true }),
          createClient().from('experiences').select('*', { count: 'exact', head: true }),
          createClient().from('skills').select('*', { count: 'exact', head: true }),
          createClient().from('education').select('*', { count: 'exact', head: true })
        ])

        setCounts({
          projects: projectsReq.count || 0,
          experience: experienceReq.count || 0,
          skills: skillsReq.count || 0,
          education: educationReq.count || 0
        })
      } catch (error) {
        console.error("Error fetching counts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

  const stats = [
    { label: "Projects", count: counts.projects, icon: FolderGit2, href: "/admin/projects", color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Experience", count: counts.experience, icon: Briefcase, href: "/admin/experience", color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Skills", count: counts.skills, icon: Code2, href: "/admin/skills", color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Education", count: counts.education, icon: GraduationCap, href: "/admin/education", color: "text-orange-500", bg: "bg-orange-500/10" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">Welcome back. Here is a summary of your portfolio data.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:bg-muted/50 transition-colors border-border/50 bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total {stat.label}
                </CardTitle>
                <div className={`p-2 rounded-md ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.count}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


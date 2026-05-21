"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin } from "lucide-react"

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const experience = [
    {
      id: 1,
      company: "CV DBKLIK Indonesia",
      role: "IT Developer Intern",
      period: "March 2026 – Present",
      location: "Remote",
      status: "Present",
      skills: ["Laravel", "Shopee/TikTok API", "RBAC", "Cron Sync", "HMAC-SHA256", "Dashboard Analytics"],
      achievements: [
        "Built multi-marketplace Laravel portal (Shopee, TikTok Shop, Tokopedia) with dashboard analytics, SLA tracking, AMS affiliate module, and TikTok & Shopee API v2 integration.",
        "Delivered CRUD modules (Promo, Support Brand, Campaign Marketplace) with RBAC, Excel/CSV import-export, live search, and filter — submitted via PR to develop/staging environments."
      ],
    },
    {
      id: 2,
      company: "PT Tiga Lintang Suminar",
      role: "Web Developer & QA Intern",
      period: "December 2024 – April 2025",
      location: "Hybrid",
      status: "Completed",
      skills: ["Laravel", "Midtrans API", "RajaOngkir API", "Tailwind CSS", "Manual Testing", "UAT"],
      achievements: [
        "Integrated Midtrans payment gateway, RajaOngkir API, and backend logic for an inventory system using Laravel.",
        "Performed manual testing, User Acceptance Testing (UAT), and wrote technical documentation.",
        "Developed responsive UI for event planner & travel sites using HTML, Tailwind CSS, and JavaScript."
      ],
    }
  ]

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My work history and professional journey in web development and software engineering.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

            <div className="space-y-8">
              {experience.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />

                  <Card className="md:ml-16 hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Briefcase className="h-5 w-5 text-primary" />
                            <h3 className="text-xl font-semibold">{item.role}</h3>
                          </div>
                          <h4 className="text-lg text-primary font-medium mb-2">{item.company}</h4>

                          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{item.period}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{item.location}</span>
                            </div>
                          </div>
                        </div>

                        <Badge variant={item.status === "Present" ? "default" : "secondary"} className="self-start">
                          {item.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium mb-3">Key Technologies:</h5>
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs bg-muted/50">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-3">Responsibilities & Achievements:</h5>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {item.achievements.map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span className="leading-relaxed">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Database, Wrench, Globe, Server, Smartphone, GitBranch, Palette } from "lucide-react"

export default function Skills() {
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

  const skillCategories = [
    {
      title: "Languages & Frameworks",
      icon: Code,
      skills: [
        { name: "Laravel", icon: Code },
        { name: "PHP", icon: Code },
        { name: "Python", icon: Code },
        { name: "HTML5", icon: Globe },
        { name: "Tailwind CSS", icon: Palette },
        { name: "SQL", icon: Database },
      ],
    },
    {
      title: "Tools & Technologies",
      icon: Wrench,
      skills: [
        { name: "Git", icon: GitBranch },
        { name: "PostMan", icon: Database },
        { name: "MySQL", icon: Database },
        { name: "Docker", icon: Server },
        { name: "AWS", icon: Server },
        { name: "Figma", icon: Palette },
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`py-20 bg-muted/30 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of the technologies and tools I work with to bring ideas to life.
            </p>
          </div>

          {/* This is the div you need to modify */}
          <div className="grid md:grid-cols-2 gap-8 justify-center"> {/* CHANGE THIS LINE */}
            {skillCategories.map((category, categoryIndex) => (
              <Card
                key={category.title}
                className={`transition-all duration-700 hover:shadow-lg ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${categoryIndex * 200}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skill.name}
                        className={`flex flex-col items-center p-3 rounded-lg bg-background hover:bg-muted/50 transition-all duration-300 hover:scale-105 ${
                          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                        }`}
                        style={{
                          transitionDelay: `${categoryIndex * 200 + skillIndex * 100}ms`,
                        }}
                      >
                        <skill.icon className="h-8 w-8 text-primary mb-2" />
                        <span className="text-sm font-medium text-center">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
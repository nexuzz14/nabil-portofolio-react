"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react"

export default function Education() {
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

  const education = [
    {
      id: 1,
      institution: "Vocational High School 2 Magelang",
      degree: "Computer Science",
      period: "2022 - 2025",
      location: "Magelang, IND",
      gpa: "86,55/100",
      status: "Graduated",
      coursework: [
        "Data Structures & Algorithms",
        "Web Development",
        "Database Systems",
        "Software Engineering",
        "Mobile App Development",
        "2D & 3D Design",
      ],
      achievements: [
        "Make a game 2D using Unity Engine",
        "Make a mobile app for education bullying",
      ],
    },
    {
      "id": 2,
      "institution": "HACKTIV8",
      "degree": "AI for IT Development",
      "period": "2025",
      "location": "Online",
      "status": "Completed",
      "coursework": [
        "Generative AI & LLM Fundamentals",
        "Developing with the Gemini API",
        "Effective Prompt Engineering",
        "API Integration for AI Services",
        "Introduction to Machine Learning Concepts",
        "Implementing AI Models in Web Applications",
        "Natural Language Processing (NLP) Basics"
      ],
      "achievements": [
        "Successfully built and integrated a conversational chatbot using the Gemini API.",
        "Applied advanced prompt engineering techniques to control and optimize AI model outputs.",
        "Completed a final capstone project applying AI principles to solve a real-world problem.",
        "Demonstrated proficiency in connecting front-end applications with AI backend services."
      ]
    },
    /* {
      id: 3,
      institution: "Coursera - Meta",
      degree: "Meta Front-End Developer Professional Certificate",
      period: "2023",
      location: "Online",
      status: "Completed",
      coursework: [
        "Introduction to Front-End Development",
        "Programming with JavaScript",
        "Version Control",
        "HTML and CSS in depth",
        "React Basics",
        "Advanced React",
      ],
      achievements: [
        "Capstone project: E-commerce website",
        "Peer review excellence award",
        "Portfolio project featured",
      ],
    }, */
  ]

  return (
    <section
      id="education"
      ref={sectionRef}
      className={`py-20 bg-muted/30 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Certifications</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My academic journey and continuous learning path in computer science and web development.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

            <div className="space-y-8">
              {education.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />

                  <Card className="md:ml-16 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            <h3 className="text-xl font-semibold">{item.institution}</h3>
                          </div>
                          <h4 className="text-lg text-primary font-medium mb-2">{item.degree}</h4>

                          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{item.period}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{item.location}</span>
                            </div>
                            {item.gpa && (
                              <div className="flex items-center gap-1">
                                <Award className="h-4 w-4" />
                                <span>GPA: {item.gpa}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <Badge variant={item.status === "Graduated" ? "default" : "secondary"} className="self-start">
                          {item.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium mb-3">Relevant Coursework:</h5>
                          <div className="flex flex-wrap gap-2">
                            {item.coursework.map((course) => (
                              <Badge key={course} variant="outline" className="text-xs">
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-3">Key Achievements:</h5>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {item.achievements.map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="flex items-start gap-2">
                                <span className="text-primary mt-1.5">•</span>
                                <span>{achievement}</span>
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

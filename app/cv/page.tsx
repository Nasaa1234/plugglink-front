"use client"

import { Header } from "@/components/Header"
import { useAuth } from "@/context/AuthContext"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import {
  Mail,
  Briefcase,
  GraduationCap,
  Code,
  Heart,
  Globe,
  Download,
} from "lucide-react"
import { Separator } from "@/components/ui/Separator"
import { useEffect, useState } from "react"

const CVPage = () => {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // prevent server/client mismatch
  if (!user) return null

  const handleDownload = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mb-6 flex justify-end print:hidden">
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download CV
          </Button>
        </div>

        <Card className="print:shadow-none">
          <CardContent className="p-8 md:p-12">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              {user.role && (
                <p className="text-xl text-muted-foreground mb-4">
                  {user.role}
                </p>
              )}
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Professional Summary */}
            {user.bio && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Professional Summary
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {user.bio}
                </p>
              </div>
            )}

            {/* Skills */}
            {user.skills && user.skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {user.experience && user.experience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {user.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <h3 className="text-lg font-semibold">{exp.position}</h3>
                      <p className="text-muted-foreground font-medium">
                        {exp.company}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </p>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {user.education && user.education.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </h2>
                <div className="space-y-6">
                  {user.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <h3 className="text-lg font-semibold">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-muted-foreground font-medium">
                        {edu.school}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {edu.startYear} - {edu.endYear || "Present"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {user.languages && user.languages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Hobbies & Interests */}
            {user.hobbies && user.hobbies.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Interests & Hobbies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user.hobbies.map((hobby, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <style>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default CVPage

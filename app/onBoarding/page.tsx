"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { toast } from "@/hooks/useToast"
import { HOBBIES_OPTIONS, LANGUAGES_OPTIONS } from "@/data/onBoardingOptions"
import { useRouter } from "next/navigation"
type EducationEntry = {
  school: string
  degree: string
  field: string
  startYear: number
  endYear?: number
}

type ExperienceEntry = {
  company: string
  position: string
  startDate: string
  endDate?: string
  description: string
}

export const Onboarding = () => {
  const { user, updateProfile } = useAuth()
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const router = useRouter()

  // Step 1: Education
  const [education, setEducation] = useState<EducationEntry[]>([
    {
      school: "",
      degree: "",
      field: "",
      startYear: new Date().getFullYear(),
      endYear: undefined,
    },
  ])

  // Step 2: Experience
  const [experience, setExperience] = useState<ExperienceEntry[]>([
    { company: "", position: "", startDate: "", endDate: "", description: "" },
  ])

  // Step 3: Hobbies
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])

  // Step 4: Languages
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  const progress = (step / totalSteps) * 100

  const handleEducationChange = (
    index: number,
    field: keyof EducationEntry,
    value: string | number
  ) => {
    const updated = [...education]
    updated[index] = { ...updated[index], [field]: value }
    setEducation(updated)
  }

  const addEducation = () => {
    setEducation([
      ...education,
      {
        school: "",
        degree: "",
        field: "",
        startYear: new Date().getFullYear(),
      },
    ])
  }

  const removeEducation = (index: number) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index))
    }
  }

  const handleExperienceChange = (
    index: number,
    field: keyof ExperienceEntry,
    value: string
  ) => {
    const updated = [...experience]
    updated[index] = { ...updated[index], [field]: value }
    setExperience(updated)
  }

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const removeExperience = (index: number) => {
    if (experience.length > 1) {
      setExperience(experience.filter((_, i) => i !== index))
    }
  }

  const toggleHobby = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    )
  }

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    )
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSkip = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    // Filter out empty entries
    const validEducation = education.filter((edu) => edu.school && edu.degree)
    const validExperience = experience.filter(
      (exp) => exp.company && exp.position
    )

    updateProfile({
      education: validEducation.length > 0 ? validEducation : undefined,
      experience: validExperience.length > 0 ? validExperience : undefined,
      hobbies: selectedHobbies.length > 0 ? selectedHobbies : undefined,
      languages: selectedLanguages.length > 0 ? selectedLanguages : undefined,
    })

    toast({
      title: "Profile completed!",
      description: "Welcome to ConnectPro. Let's start connecting!",
    })

    router.push("/feed")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <div className="space-y-2">
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <p className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </p>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Education */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add your educational background
                </p>
              </div>

              {education.map((edu, index) => (
                <Card key={index} className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <Label>School/University</Label>
                      <Input
                        value={edu.school}
                        onChange={(e) =>
                          handleEducationChange(index, "school", e.target.value)
                        }
                        placeholder="e.g., Stanford University"
                      />
                    </div>
                    <div>
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationChange(index, "degree", e.target.value)
                        }
                        placeholder="e.g., Bachelor's"
                      />
                    </div>
                    <div>
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) =>
                          handleEducationChange(index, "field", e.target.value)
                        }
                        placeholder="e.g., Computer Science"
                      />
                    </div>
                    <div>
                      <Label>Start Year</Label>
                      <Input
                        type="number"
                        value={edu.startYear}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "startYear",
                            parseInt(e.target.value)
                          )
                        }
                        placeholder="2020"
                      />
                    </div>
                    <div>
                      <Label>End Year (optional)</Label>
                      <Input
                        type="number"
                        value={edu.endYear || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "endYear",
                            e.target.value
                          )
                        }
                        placeholder="2024"
                      />
                    </div>
                  </div>
                  {education.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(index)}
                      className="text-destructive"
                    >
                      Remove
                    </Button>
                  )}
                </Card>
              ))}

              <Button
                variant="outline"
                onClick={addEducation}
                className="w-full"
              >
                Add Another Education
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add your professional experience
                </p>
              </div>

              {experience.map((exp, index) => (
                <Card key={index} className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Google"
                      />
                    </div>
                    <div>
                      <Label>Position</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "position",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Software Engineer"
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label>End Date (optional)</Label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Describe your responsibilities and achievements..."
                        rows={3}
                      />
                    </div>
                  </div>
                  {experience.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(index)}
                      className="text-destructive"
                    >
                      Remove
                    </Button>
                  )}
                </Card>
              ))}

              <Button
                variant="outline"
                onClick={addExperience}
                className="w-full"
              >
                Add Another Experience
              </Button>
            </div>
          )}

          {/* Step 3: Hobbies */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Hobbies & Interests
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select your hobbies and interests (select multiple)
                </p>
              </div>

              <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto p-2 border rounded-lg">
                {HOBBIES_OPTIONS.map((hobby) => (
                  <Badge
                    key={hobby}
                    variant={
                      selectedHobbies.includes(hobby) ? "default" : "outline"
                    }
                    className="cursor-pointer px-4 py-2 text-sm"
                    onClick={() => toggleHobby(hobby)}
                  >
                    {hobby}
                  </Badge>
                ))}
              </div>

              {selectedHobbies.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedHobbies.length} hobbies
                </p>
              )}
            </div>
          )}

          {/* Step 4: Languages */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Languages</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select languages you speak (select multiple)
                </p>
              </div>

              <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto p-2 border rounded-lg">
                {LANGUAGES_OPTIONS.map((language) => (
                  <Badge
                    key={language}
                    variant={
                      selectedLanguages.includes(language)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer px-4 py-2 text-sm"
                    onClick={() => toggleLanguage(language)}
                  >
                    {language}
                  </Badge>
                ))}
              </div>

              {selectedLanguages.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedLanguages.length} languages
                </p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <div>
              {step > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleSkip}>
                Skip
              </Button>
              {step < totalSteps ? (
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleComplete}>Complete Profile</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Onboarding

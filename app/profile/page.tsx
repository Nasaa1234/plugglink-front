"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import {
  Mail,
  Briefcase,
  GraduationCap,
  Plus,
  X,
  Heart,
  Languages,
} from "lucide-react"
import { useToast } from "@/hooks/useToast"
import { PRESET_AVATARS, getDefaultAvatar } from "@/data/avatars"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    role: user?.role || "",
    avatar: user?.avatar || "",
    skills: user?.skills || [],
    hobbies: user?.hobbies || [],
    languages: user?.languages || [],
  })
  const [newSkill, setNewSkill] = useState("")
  const [newHobby, setNewHobby] = useState("")
  const [newLanguage, setNewLanguage] = useState("")
  const [showAvatarDialog, setShowAvatarDialog] = useState(false)

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
    })
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    })
  }

  const addHobby = () => {
    if (newHobby.trim() && !formData.hobbies.includes(newHobby.trim())) {
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, newHobby.trim()],
      })
      setNewHobby("")
    }
  }

  const removeHobby = (hobby: string) => {
    setFormData({
      ...formData,
      hobbies: formData.hobbies.filter((h) => h !== hobby),
    })
  }

  const addLanguage = () => {
    if (
      newLanguage.trim() &&
      !formData.languages.includes(newLanguage.trim())
    ) {
      setFormData({
        ...formData,
        languages: [...formData.languages, newLanguage.trim()],
      })
      setNewLanguage("")
    }
  }

  const removeLanguage = (language: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((l) => l !== language),
    })
  }

  const selectAvatar = (avatar: string) => {
    setFormData({ ...formData, avatar })
    setShowAvatarDialog(false)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <div className="container mx-auto py-6 px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Profile</CardTitle>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <Dialog
                open={showAvatarDialog}
                onOpenChange={setShowAvatarDialog}
              >
                <DialogTrigger asChild>
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                    {(isEditing ? formData.avatar : user?.avatar) ? (
                      <img
                        src={isEditing ? formData.avatar : user?.avatar}
                        alt="Avatar"
                        className="h-20 w-20 rounded-full"
                      />
                    ) : (
                      <span className="text-primary text-2xl font-semibold">
                        {getDefaultAvatar(user?.name || "")}
                      </span>
                    )}
                  </div>
                </DialogTrigger>
                {isEditing && (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Choose Avatar</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-5 gap-4 py-4">
                      {PRESET_AVATARS.map((avatar, index) => (
                        <div
                          key={index}
                          className="h-16 w-16 rounded-full cursor-pointer hover:ring-2 ring-primary transition-all"
                          onClick={() => selectAvatar(avatar)}
                        >
                          <img
                            src={avatar}
                            alt={`Avatar ${index + 1}`}
                            className="h-16 w-16 rounded-full"
                          />
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                )}
              </Dialog>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">{user?.name}</h2>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{user?.email}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Role
              </Label>
              {isEditing ? (
                <Input
                  id="role"
                  placeholder="e.g., Software Engineer"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                />
              ) : (
                <p className="text-muted-foreground">
                  {user?.role || "Not specified"}
                </p>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows={4}
                />
              ) : (
                <p className="text-muted-foreground">
                  {user?.bio || "No bio yet"}
                </p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Skills
              </Label>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSkill())
                    }
                  />
                  <Button type="button" size="icon" onClick={addSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {(isEditing ? formData.skills : user?.skills || []).map(
                  (skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  )
                )}
                {!isEditing && (!user?.skills || user.skills.length === 0) && (
                  <p className="text-sm text-muted-foreground">
                    No skills added yet
                  </p>
                )}
              </div>
            </div>

            {/* Hobbies */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Hobbies
              </Label>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a hobby"
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addHobby())
                    }
                  />
                  <Button type="button" size="icon" onClick={addHobby}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {(isEditing ? formData.hobbies : user?.hobbies || []).map(
                  (hobby) => (
                    <Badge key={hobby} variant="outline" className="gap-1">
                      {hobby}
                      {isEditing && (
                        <button
                          onClick={() => removeHobby(hobby)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  )
                )}
                {!isEditing &&
                  (!user?.hobbies || user.hobbies.length === 0) && (
                    <p className="text-sm text-muted-foreground">
                      No hobbies added yet
                    </p>
                  )}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Languages className="h-4 w-4" />
                Languages
              </Label>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a language"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addLanguage())
                    }
                  />
                  <Button type="button" size="icon" onClick={addLanguage}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {(isEditing ? formData.languages : user?.languages || []).map(
                  (language) => (
                    <Badge key={language} variant="outline" className="gap-1">
                      {language}
                      {isEditing && (
                        <button
                          onClick={() => removeLanguage(language)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  )
                )}
                {!isEditing &&
                  (!user?.languages || user.languages.length === 0) && (
                    <p className="text-sm text-muted-foreground">
                      No languages added yet
                    </p>
                  )}
              </div>
            </div>

            {/* CV Generation Placeholder */}
            {!isEditing && (
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full" disabled>
                  Generate CV (Coming Soon)
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Profile

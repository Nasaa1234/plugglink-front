"use client"

import React, { createContext, useContext, useState } from "react"

export interface User {
  id: string
  email: string
  name: string
  bio?: string
  avatar?: string
  role?: string
  skills?: string[]
  education?: Array<{
    school: string
    degree: string
    field: string
    startYear: number
    endYear?: number
  }>
  experience?: Array<{
    company: string
    position: string
    startDate: string
    endDate?: string
    description: string
  }>
  following?: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  isFollowing: (userId: string) => boolean
  toggleFollow: (userId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users data
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
    bio: "Software Engineer passionate about building great products",
    role: "Software Engineer",
    skills: ["React", "TypeScript", "Node.js"],
    following: [],
  },
]

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Lazy initialization to avoid setState in useEffect
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("currentUser")
      return savedUser ? JSON.parse(savedUser) : null
    }
    return null
  })

  const login = async (email: string, password: string) => {
    const existingUser = MOCK_USERS.find((u) => u.email === email)
    const loggedInUser = existingUser || MOCK_USERS[0]
    setUser(loggedInUser)
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser))
  }

  const signup = async (email: string, password: string, name: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      bio: "",
      following: [],
    }
    setUser(newUser)
    localStorage.setItem("currentUser", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
  }

  const isFollowing = (userId: string) =>
    user?.following?.includes(userId) || false

  const toggleFollow = (userId: string) => {
    if (!user) return
    const following = user.following || []
    const newFollowing = following.includes(userId)
      ? following.filter((id) => id !== userId)
      : [...following, userId]

    updateProfile({ following: newFollowing })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        isFollowing,
        toggleFollow,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface Notification {
  id: string
  userId: string
  type: "request_accepted" | "request_rejected"
  message: string
  postId: string
  postTitle: string
  read: boolean
  createdAt: Date
}

export interface User {
  id: string
  email: string
  name: string
  bio?: string
  avatar?: string
  role?: string
  skills?: string[]
  hobbies?: string[]
  languages?: string[]
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
  notifications: Notification[]
  addNotification: (
    notification: Omit<Notification, "id" | "createdAt">
  ) => void
  markNotificationAsRead: (notificationId: string) => void
  markAllNotificationsAsRead: () => void
  unreadCount: number
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
  const [user, setUser] = useState<User | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("currentUser")
      if (savedUser) setUser(JSON.parse(savedUser))

      const savedNotifications = localStorage.getItem("notifications")
      if (savedNotifications) setNotifications(JSON.parse(savedNotifications))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }, [notifications])

  const login = async (email: string, password: string) => {
    // Mock login - find user or use demo user
    const existingUser = MOCK_USERS.find((u) => u.email === email)
    const loggedInUser = existingUser || MOCK_USERS[0]
    setUser(loggedInUser)
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser))
  }

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup - create new user
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
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    }
  }

  const isFollowing = (userId: string) => {
    return user?.following?.includes(userId) || false
  }

  const toggleFollow = (userId: string) => {
    if (!user) return

    const following = user.following || []
    const newFollowing = following.includes(userId)
      ? following.filter((id) => id !== userId)
      : [...following, userId]

    updateProfile({ following: newFollowing })
  }

  const addNotification = (
    notification: Omit<Notification, "id" | "createdAt">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((notif) => !notif.read).length

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
        notifications,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

"use client"

import { useAuth } from "@/context/AuthContext"
import { redirect } from "next/navigation"
import { ReactNode, useEffect } from "react"

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      redirect("/login")
    }
  }, [user])

  return <>{children}</>
}

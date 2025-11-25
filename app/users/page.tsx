"use client"

import { useQuery } from "@apollo/client/react"
import { GET_ALL_USERS } from "../graphql"
import { Header } from "@/components/Header"
import { UserCard } from "@/components/UserCard"

interface User {
  id: string
  name: string
  bio?: string
  skills?: string[]
}

interface GetAllUsersData {
  getAllUsers: User[]
}

export default function UsersPage() {
  const { data, loading, error } = useQuery<GetAllUsersData>(GET_ALL_USERS)

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <div className="container mx-auto py-6 px-4 text-center">
          <p>Loading users...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <div className="container mx-auto py-6 px-4 text-center">
          <p>Error loading users. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">All Users</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.getAllUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}

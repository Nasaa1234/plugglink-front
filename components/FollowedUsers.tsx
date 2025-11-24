"use client"

import { useAuth } from "@/context/AuthContext"
import { MOCK_USERS } from "@/data/mockData"
import { getDefaultAvatar } from "@/data/avatars"
import { User } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export const FollowedUsers = () => {
  const { user } = useAuth()
  const router = useRouter()

  const followedUsers = MOCK_USERS.filter((u) =>
    user?.following?.includes(u.id)
  )

  if (followedUsers.length === 0) {
    return null
  }

  return (
    <div className="bg-card rounded-lg p-4 border">
      <h3 className="font-semibold mb-3">Following</h3>
      <div className="space-y-2">
        {followedUsers.map((followedUser) => (
          <div
            key={followedUser.id}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
            onClick={() => router.push(`/user/${followedUser.id}`)}
          >
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              {followedUser.avatar ? (
                <Image
                  src={followedUser.avatar}
                  alt={followedUser.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <span className="text-primary text-xs font-semibold">
                  {getDefaultAvatar(followedUser.name)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {followedUser.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {followedUser.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

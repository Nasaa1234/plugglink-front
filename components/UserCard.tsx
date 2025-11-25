"use client"

import { useMutation } from "@apollo/client/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { useAuth } from "@/context/AuthContext"
import { FOLLOW_USER, UNFOLLOW_USER } from "@/app/graphql/mutations"
import { GET_ALL_USERS, GET_ME } from "@/app/graphql/queries"
import { useRouter } from "next/navigation"

interface UserCardProps {
  user: {
    id: string
    name: string
    bio?: string
    skills?: string[]
  }
}

export const UserCard = ({ user: userProp }: UserCardProps) => {
  const { user: currentUser, isFollowing } = useAuth()
  const router = useRouter()
  const [followUser] = useMutation(FOLLOW_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }, { query: GET_ME }],
  })
  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }, { query: GET_ME }],
  })

  const handleFollow = async () => {
    if (!currentUser) return
    await followUser({ variables: { userId: userProp.id } })
  }

  const handleUnfollow = async () => {
    if (!currentUser) return
    await unfollowUser({ variables: { userId: userProp.id } })
  }

  const following = isFollowing(userProp.id)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle
            className="cursor-pointer hover:underline"
            onClick={() => router.push(`/user/${userProp.id}`)}
          >
            {userProp.name}
          </CardTitle>
          {currentUser && currentUser.id !== userProp.id && (
            <Button
              variant={following ? "outline" : "default"}
              onClick={following ? handleUnfollow : handleFollow}
            >
              {following ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{userProp.bio || "No bio"}</p>
        <div className="flex flex-wrap gap-2">
          {userProp.skills?.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { PostCard } from "@/components/PostCard"
import { MOCK_USERS, MOCK_POSTS } from "@/data/mockData"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { User, Briefcase } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

interface UserProfileProps {
  userId: string
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const router = useRouter()
  const { user: currentUser, isFollowing, toggleFollow } = useAuth()
  const [posts, setPosts] = useState(MOCK_POSTS)

  const profileUser = useMemo(
    () => MOCK_USERS.find((u) => u.id === userId),
    [userId]
  )

  console.log(userId)
  const userPosts = useMemo(
    () => posts.filter((post) => post.authorId === userId),
    [posts, userId]
  )

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <div className="container mx-auto py-6 px-4 max-w-4xl">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">User not found</p>
              <Button onClick={() => router.push("/feed")} className="mt-4">
                Back to Feed
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const isOwnProfile = currentUser?.id === userId
  const following = isFollowing(userId)

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container mx-auto py-6 px-4 max-w-4xl">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{profileUser.name}</h1>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <Briefcase className="h-4 w-4" />
                    {profileUser.role}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {profileUser.followers} followers
                  </p>
                </div>
              </div>

              {!isOwnProfile && currentUser && (
                <Button
                  variant={following ? "outline" : "default"}
                  onClick={() => toggleFollow(userId)}
                >
                  {following ? "Unfollow" : "Follow"}
                </Button>
              )}

              {isOwnProfile && (
                <Button
                  variant="outline"
                  onClick={() => router.push("/profile")}
                >
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-muted-foreground">{profileUser.bio}</p>
              </div>

              {profileUser.skills && profileUser.skills.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileUser.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Posts by {profileUser.name}</h2>
          {userPosts.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No posts yet
              </CardContent>
            </Card>
          ) : (
            userPosts.map((post) => (
              <PostCard key={post.id} post={post} onUpdate={setPosts} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile

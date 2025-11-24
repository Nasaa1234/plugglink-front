"use client"

import { useState, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { PostCard } from "@/components/PostCard"
import { MOCK_POSTS, MOCK_USERS } from "@/data/mockData"
import { Card, CardContent } from "@/components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { User } from "lucide-react"
import { Button } from "@/components/ui/Button"

const Search = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const router = useRouter()
  const [posts, setPosts] = useState(MOCK_POSTS)

  const filteredPosts = useMemo(
    () =>
      posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.description.toLowerCase().includes(query.toLowerCase()) ||
          post.roles.some((role) =>
            role.toLowerCase().includes(query.toLowerCase())
          )
      ),
    [posts, query]
  )

  const filteredUsers = useMemo(
    () =>
      MOCK_USERS.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.role.toLowerCase().includes(query.toLowerCase()) ||
          user.bio.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  )

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <div className="container mx-auto py-6 px-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">
          Search results for "{query}"
        </h1>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">
              Posts ({filteredPosts.length})
            </TabsTrigger>
            <TabsTrigger value="users">
              Users ({filteredUsers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4 mt-6">
            {filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No posts found
                </CardContent>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} onUpdate={setPosts} />
              ))
            )}
          </TabsContent>

          <TabsContent value="users" className="space-y-4 mt-6">
            {filteredUsers.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No users found
                </CardContent>
              </Card>
            ) : (
              filteredUsers.map((user) => (
                <Card
                  key={user.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => router.push(`/user/${user.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {user.role}
                        </p>
                        <p className="text-sm mt-2">{user.bio}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span>{user.followers} followers</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/user/${user.id}`)
                        }}
                      >
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Search

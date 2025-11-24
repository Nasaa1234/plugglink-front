"use client"
import { useState } from "react"
import { Header } from "@/components/Header"
import { PostCard } from "@/components/PostCard"
import { MOCK_POSTS, ROLES } from "@/data/mockData"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

const Feed = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    )
  }
  const [posts, setPosts] = useState(MOCK_POSTS)

  const filteredPosts =
    selectedRoles.length === 0
      ? posts
      : posts.filter((post) =>
          post.roles.some((role) => selectedRoles.includes(role))
        )

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <div className="container mx-auto py-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="font-semibold mb-3">Filter by Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map((role) => (
                    <Badge
                      key={role}
                      variant={
                        selectedRoles.includes(role) ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => toggleRole(role)}
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
                {selectedRoles.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => setSelectedRoles([])}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-4">
            <div className="bg-card rounded-lg p-4 border">
              <h2 className="text-xl font-bold mb-1">Your Feed</h2>
              <p className="text-sm text-muted-foreground">
                Discover opportunities and connect with professionals
              </p>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="bg-card rounded-lg p-8 border text-center">
                <p className="text-muted-foreground">
                  No posts match your filters
                </p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} onUpdate={setPosts} />
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Feed

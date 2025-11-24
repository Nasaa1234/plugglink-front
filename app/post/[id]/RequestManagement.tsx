"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { MOCK_POSTS, Post } from "@/data/mockData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { User, ArrowLeft, Check, X } from "lucide-react"
import { useToast } from "@/hooks/useToast"

interface RequestManagementProps {
  postId: string
}

export default function RequestManagement({ postId }: RequestManagementProps) {
  const { toast } = useToast()
  console.log(postId)
  const router = useRouter()
  const [post, setPost] = useState<Post | undefined>(
    MOCK_POSTS.find((p) => p.id === postId)
  )

  if (!post) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <div className="container mx-auto py-6 px-4 max-w-4xl">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Post not found</p>
              <Button onClick={() => router.push("/feed")} className="mt-4">
                Back to Feed
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const handleUpdateRequest = (
    requestUserId: string,
    status: "accepted" | "rejected"
  ) => {
    const updatedRequests = post.requests.map((req) =>
      req.userId === requestUserId ? { ...req, status } : req
    )
    setPost({ ...post, requests: updatedRequests })

    toast({
      title: status === "accepted" ? "Request accepted" : "Request rejected",
      description: `You have ${status} the request.`,
    })
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <div className="container mx-auto py-6 px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => router.push(`/post/${postId}`)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Post
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Manage Requests</CardTitle>
            <p className="text-sm text-muted-foreground">{post.title}</p>
          </CardHeader>

          <CardContent className="space-y-4">
            {post.requests.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No requests yet
              </p>
            ) : (
              post.requests.map((request) => (
                <Card key={request.userId}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{request.userName}</p>
                          <p className="text-sm text-muted-foreground">
                            {request.userRole}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {request.status === "pending" ? (
                          <>
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() =>
                                handleUpdateRequest(request.userId, "accepted")
                              }
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleUpdateRequest(request.userId, "rejected")
                              }
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Badge
                            variant={
                              request.status === "accepted"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {request.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

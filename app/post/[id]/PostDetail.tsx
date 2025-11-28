"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { MOCK_POSTS } from "@/data/mockData"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { User, Heart, MessageCircle, Briefcase, ArrowLeft } from "lucide-react"
import { CommentSection } from "@/components/CommentSection"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/useToast"
import { Post, Comment } from "@/data/mockData"

const PostDetail = ({ postId }: { postId: string }) => {
  const router = useRouter()

  const { user } = useAuth()
  const { toast } = useToast()

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

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return "just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  const handleAddComment = (text: string) => {
    if (!user) return

    const newComment: Comment = {
      id: `c${Date.now()}`,
      userId: user.id,
      userName: user.name,
      text,
      createdAt: new Date().toISOString(),
    }

    setPost({
      ...post,
      comments: [...post.comments, newComment],
    })

    toast({
      title: "Comment added",
      description: "Your comment has been posted.",
    })
  }

  const handleRequest = () => {
    if (!user) return

    const alreadyRequested = post.requests.some((r) => r.userId === user.id)

    if (alreadyRequested) {
      toast({
        title: "Already requested",
        description: "You have already requested to work on this post.",
        variant: "destructive",
      })
      return
    }

    const newRequest = {
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    }

    setPost({
      ...post,
      requests: [...post.requests, newRequest],
    })

    toast({
      title: "Request sent",
      description: "Your request to work on this has been sent to the author.",
    })
  }

  const handleLike = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to like posts.",
        variant: "destructive",
      })
      return
    }

    const isLiked = post.likedBy.includes(user.id)
    setPost({
      ...post,
      likes: isLiked ? post.likes - 1 : post.likes + 1,
      likedBy: isLiked
        ? post.likedBy.filter((id) => id !== user.id)
        : [...post.likedBy, user.id],
    })
  }

  const isAuthor = user?.id === post.authorId
  const hasRequested = user && post.requests.some((r) => r.userId === user.id)
  const isLiked = user && post.likedBy.includes(user.id)
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <div className="container mx-auto py-6 px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => router.push("/feed")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Feed
        </Button>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => router.push(`/user/${post.authorId}`)}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold hover:underline">
                    {post.authorName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {post.authorRole}
                  </p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {timeAgo(post.createdAt)}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <h1 className="font-bold text-2xl mb-3">{post.title}</h1>
              <p className="text-muted-foreground leading-relaxed">
                {post.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.roles.map((role) => (
                <Badge key={role} variant="secondary">
                  {role}
                </Badge>
              ))}
            </div>

            {!isAuthor && user && (
              <Button
                variant={hasRequested ? "outline" : "default"}
                size="lg"
                onClick={handleRequest}
                className="w-full"
              >
                <Briefcase className="h-5 w-5 mr-2" />
                {hasRequested ? "Request Sent" : "Apply to Work on This"}
              </Button>
            )}

            {isAuthor && post.requests.length > 0 && (
              <Button
                variant="outline"
                onClick={() => router.push(`/request/${post.id}`)}
                className="w-full"
              >
                View Requests ({post.requests.length})
              </Button>
            )}

            <div className="flex items-center gap-4 pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={handleLike}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments.length}</span>
              </Button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Comments</h3>
              <CommentSection
                comments={post.comments}
                onAddComment={handleAddComment}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PostDetail

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, MessageCircle, User, Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Post, Comment } from "@/data/mockData"
import { CommentSection } from "./CommentSection"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/useToast"
import { Skeleton } from "./ui/Skeleton"

interface PostCardProps {
  post: Post
  onUpdate?: (posts: Post[]) => void
}

export const PostCard = ({ post, onUpdate }: PostCardProps) => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const [localPost, setLocalPost] = useState(post)
  useEffect(() => {
    setMounted(true)
  }, [])
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return "just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }
  if (!mounted) return <Skeleton />
  const handleAddComment = (text: string) => {
    if (!user) return

    const newComment: Comment = {
      id: `c${Date.now()}`,
      userId: user.id,
      userName: user.name,
      text,
      createdAt: new Date().toISOString(),
    }

    const updatedPost = {
      ...localPost,
      comments: [...localPost.comments, newComment],
    }

    setLocalPost(updatedPost)
    toast({
      title: "Comment added",
      description: "Your comment has been posted.",
    })
  }

  const handleRequest = () => {
    if (!user) return

    const alreadyRequested = localPost.requests.some(
      (r) => r.userId === user.id
    )

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

    const updatedPost = {
      ...localPost,
      requests: [...localPost.requests, newRequest],
    }

    setLocalPost(updatedPost)
    toast({
      title: "Request sent",
      description: "Your request to work on this has been sent to the author.",
    })
  }

  const userRoleMatchesPost = user?.role && localPost.roles.includes(user.role)
  const isAuthor = user?.id === localPost.authorId
  const hasRequested =
    user && localPost.requests.some((r) => r.userId === user.id)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push(`/user/${localPost.authorId}`)}
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold hover:underline">
                {localPost.authorName}
              </p>
              <p className="text-sm text-muted-foreground">
                {localPost.authorRole}
              </p>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">
            {timeAgo(localPost.createdAt)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg mb-2">{localPost.title}</h3>
          <p className="text-muted-foreground">{localPost.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {localPost.roles.map((role) => (
            <Badge key={role} variant="secondary">
              {role}
            </Badge>
          ))}
        </div>

        {!isAuthor && user && userRoleMatchesPost && (
          <Button
            variant={hasRequested ? "outline" : "default"}
            size="sm"
            onClick={handleRequest}
            className="w-full"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            {hasRequested ? "Request Sent" : "Request to Work on This"}
          </Button>
        )}

        <div className="flex items-center gap-4 pt-2 border-t">
          <Button variant="ghost" size="sm" className="gap-2">
            <Heart className="h-4 w-4" />
            <span>{localPost.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>{localPost.comments.length}</span>
          </Button>
        </div>

        <CommentSection
          comments={localPost.comments}
          onAddComment={handleAddComment}
        />
      </CardContent>
    </Card>
  )
}

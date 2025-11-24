import { useState } from "react"
import { Comment } from "@/data/mockData"
import { Button } from "@/components/Button"
import { Textarea } from "@/components/Textarea"
import { User } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

interface CommentSectionProps {
  comments: Comment[]
  onAddComment: (text: string) => void
}

export const CommentSection = ({
  comments,
  onAddComment,
}: CommentSectionProps) => {
  const { user } = useAuth()
  const [newComment, setNewComment] = useState("")
  const [showComments, setShowComments] = useState(false)

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim())
      setNewComment("")
    }
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

  return (
    <div className="space-y-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? "Hide" : "Show"} {comments.length}{" "}
        {comments.length === 1 ? "comment" : "comments"}
      </Button>

      {showComments && (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {comment.userName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))}

          {user && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={2}
                />
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={!newComment.trim()}
                >
                  Comment
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

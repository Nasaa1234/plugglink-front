"use client"

import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useAuth } from "@/context/AuthContext"
import { getDefaultAvatar } from "@/data/avatars"
import { PenSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const CreatePostCard = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [initial, setInitial] = useState<string | null>(null)

  // Run only on client
  useEffect(() => {
    if (!user?.avatar) {
      setInitial(getDefaultAvatar(user?.name || ""))
    }
  }, [user])

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full"
              />
            ) : (
              initial && (
                <span className="text-primary font-semibold">{initial}</span>
              )
            )}
          </div>
          <Button
            variant="outline"
            className="flex-1 justify-start text-muted-foreground"
            onClick={() => router.push("/create-post")}
          >
            <PenSquare className="h-4 w-4 mr-2" />
            Share an opportunity or idea...
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

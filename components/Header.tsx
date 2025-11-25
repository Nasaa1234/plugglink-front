"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, User, LogOut, Menu, X } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu"
import Image from "next/image"
import { NotificationDropdown } from "./NotificationDropDown"

export const Header = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }
  useEffect(() => setMounted(true), [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }
  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Logo" width={96} height={32} />
          </Link>

          {user && (
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center"
            >
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search posts, people, roles..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          )}
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="default"
                onClick={() => router.push("/create-post")}
              >
                Create Post
              </Button>
              <NotificationDropdown />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-popover">
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button onClick={() => router.push("/signup")}>Sign Up</Button>
          </div>
        )}
      </div>

      {mobileMenuOpen && user && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <Button
            variant="default"
            className="w-full"
            onClick={() => router.push("/create-post")}
          >
            Create Post
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/profile")}
          >
            Profile
          </Button>
          <Button variant="ghost" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </header>
  )
}

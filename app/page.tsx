"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/Button"
import { ArrowRight, Users, Briefcase, TrendingUp } from "lucide-react"
import Image from "next/image"

const IndexPage = () => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // if (user) {
    //   router.replace("/feed") // replace avoids keeping this page in history
    // }
  }, [user, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Logo" width={96} height={32} />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button onClick={() => router.push("/signup")}>Get Started</Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Connect. Collaborate. Create.
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The professional networking platform that connects students and
          professionals through meaningful career-focused interactions.
        </p>
        <Button
          size="lg"
          onClick={() => router.push("/signup")}
          className="gap-2"
        >
          Join PluggLink <ArrowRight className="h-4 w-4" />
        </Button>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg border text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Build Your Network</h3>
            <p className="text-muted-foreground">
              Connect with students and professionals in your field
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Discover Opportunities
            </h3>
            <p className="text-muted-foreground">
              Find internships, jobs, and collaboration opportunities
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Showcase Your Skills</h3>
            <p className="text-muted-foreground">
              Build your professional profile and generate your CV
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default IndexPage

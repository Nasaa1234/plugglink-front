"use client"
import { useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import {
  Users,
  Briefcase,
  TrendingUp,
  Sparkles,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel"
import { useRouter } from "next/navigation"

const Index = () => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/feed")
    }
  }, [user])

  const testimonials = [
    {
      quote:
        "ConnectPro helped me land my dream internship. The platform made networking so much easier!",
      author: "Sarah Johnson",
      role: "Software Engineering Intern",
    },
    {
      quote:
        "I've found amazing talent for my startup through ConnectPro. Highly recommended!",
      author: "Michael Chen",
      role: "Tech Startup Founder",
    },
    {
      quote:
        "The auto-generated CV feature saved me hours of work. Simply brilliant!",
      author: "Emma Davis",
      role: "Marketing Professional",
    },
  ]

  const features = [
    {
      icon: Target,
      title: "Smart Matching",
      description:
        "Our algorithm connects you with opportunities that match your skills and interests",
    },
    {
      icon: Zap,
      title: "Instant Applications",
      description:
        "Apply to opportunities with one click using your professional profile",
    },
    {
      icon: Sparkles,
      title: "Auto-Generated CV",
      description:
        "Your profile automatically becomes a beautiful, professional CV",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            ConnectPro
          </h1>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button onClick={() => router.push("/signup")} className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container py-20 md:py-32 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm font-semibold text-primary">
              Welcome to the Future of Networking
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Connect, Collaborate,
            <br />
            <span className="text-primary">Grow Together</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students and professionals building meaningful
            connections. Discover opportunities, showcase your skills, and
            accelerate your career growth on the platform designed for modern
            networking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push("/signup")}
              className="gap-2"
            >
              Start Your Journey
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/about")}
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 pt-16 border-t">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                10K+
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                5K+
              </div>
              <div className="text-sm text-muted-foreground">
                Opportunities Posted
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                95%
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose ConnectPro?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build your professional network and advance
              your career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <Users className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  Build Your Network
                </h3>
                <p className="text-muted-foreground">
                  Connect with like-minded professionals and expand your circle
                  through shared interests and values
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <Briefcase className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  Discover Opportunities
                </h3>
                <p className="text-muted-foreground">
                  Find and apply to exciting projects, internships, and career
                  opportunities tailored to your skills
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <TrendingUp className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  Showcase Your Skills
                </h3>
                <p className="text-muted-foreground">
                  Build your professional profile with an auto-generated CV that
                  highlights your best qualities
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="bg-muted/30 py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Features
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Advanced tools designed to make your networking experience
                seamless
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="container py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied professionals and students
            </p>
          </div>

          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="border-2">
                    <CardContent className="p-8 md:p-12 text-center">
                      <div className="flex justify-center mb-6">
                        <CheckCircle className="h-12 w-12 text-primary" />
                      </div>
                      <p className="text-lg md:text-xl mb-6 italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* CTA Section */}
        <section className="container py-16 text-center">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border-2">
            <CardContent className="p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Join ConnectPro today and unlock a world of professional
                opportunities. Build your network, showcase your skills, and
                accelerate your career growth.
              </p>
              <Button
                size="lg"
                onClick={() => router.push("/signup")}
                className="gap-2"
              >
                Create Your Free Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t py-8 mt-16">
        <div className="container text-center text-muted-foreground">
          <p>&copy; 2024 ConnectPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Index

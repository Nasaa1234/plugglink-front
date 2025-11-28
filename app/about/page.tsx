import { Header } from "@/components/Header"
import { Card, CardContent } from "@/components/ui/Card"

import {
  Users,
  Briefcase,
  TrendingUp,
  Target,
  Heart,
  Zap,
  Award,
  Globe,
  Rocket,
} from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel"

const About = () => {
  const teamMembers = [
    {
      name: "Innovation",
      description:
        "We constantly push boundaries to create better networking experiences",
      icon: Rocket,
    },
    {
      name: "Community",
      description: "Building a supportive ecosystem where everyone can thrive",
      icon: Users,
    },
    {
      name: "Excellence",
      description:
        "Committed to delivering the highest quality platform and support",
      icon: Award,
    },
  ]

  const successStories = [
    {
      stat: "50K+",
      label: "Successful Connections Made",
      description: "Professionals and students connected through our platform",
    },
    {
      stat: "10K+",
      label: "Opportunities Filled",
      description: "Projects, internships, and jobs matched successfully",
    },
    {
      stat: "150+",
      label: "Countries Worldwide",
      description: "Global community spanning across continents",
    },
  ]
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="space-y-8">
          {/* Hero Section */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-2">
            <CardContent className="p-8 md:p-12">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  About ConnectPro
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
                  ConnectPro is a professional networking platform designed to
                  bridge the gap between students and professionals. We believe
                  in meaningful connections that drive career growth and
                  learning opportunities.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our mission is to create a world where every talented
                  individual has access to opportunities that match their skills
                  and aspirations, regardless of their background or location.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Simple Networking</h3>
                    <p className="text-sm text-muted-foreground">
                      Make professional connections effortlessly through shared
                      interests and opportunities
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Effective Posting</h3>
                    <p className="text-sm text-muted-foreground">
                      Share opportunities, ideas, and experiences that matter to
                      your network
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Smart Discovery</h3>
                    <p className="text-sm text-muted-foreground">
                      Find relevant content based on your interests and
                      professional role
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Build Identity</h3>
                    <p className="text-sm text-muted-foreground">
                      Showcase your skills and experience with automatically
                      generated CVs
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why ConnectPro */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Why ConnectPro?</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">For Students</h3>
                      <p className="text-muted-foreground">
                        Discover internships, connect with industry
                        professionals, and build your career foundation with
                        access to real opportunities and mentorship.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">For Professionals</h3>
                      <p className="text-muted-foreground">
                        Find talented individuals, share opportunities, and
                        expand your professional network with people who match
                        your vision and values.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">For Everyone</h3>
                      <p className="text-muted-foreground">
                        A platform that values meaningful connections over
                        vanity metrics, fostering authentic relationships and
                        real career growth.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Our Impact</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Global Reach</h3>
                      <p className="text-muted-foreground">
                        Operating in over 150 countries, connecting
                        professionals across continents and creating truly
                        global networking opportunities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Quality First</h3>
                      <p className="text-muted-foreground">
                        95% success rate in matching professionals with
                        opportunities, ensuring quality connections that lead to
                        real results.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Rocket className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Fast Growing</h3>
                      <p className="text-muted-foreground">
                        10,000+ active users and growing daily, building a
                        vibrant community of professionals helping each other
                        succeed.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Success Stories Carousel */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Our Success in Numbers
              </h2>
              <Carousel className="max-w-4xl mx-auto">
                <CarouselContent>
                  {successStories.map((story, index) => (
                    <CarouselItem key={index}>
                      <div className="text-center py-8">
                        <div className="text-5xl md:text-6xl font-bold text-primary mb-4">
                          {story.stat}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          {story.label}
                        </h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          {story.description}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>

          {/* Core Values Carousel */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Our Core Values
              </h2>
              <Carousel className="max-w-4xl mx-auto">
                <CarouselContent>
                  {teamMembers.map((member, index) => (
                    <CarouselItem key={index}>
                      <div className="flex flex-col items-center text-center py-8">
                        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                          <member.icon className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">
                          {member.name}
                        </h3>
                        <p className="text-lg text-muted-foreground max-w-md">
                          {member.description}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default About

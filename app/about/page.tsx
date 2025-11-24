import { Header } from "@/components/Header"
import { Card, CardContent } from "@/components/ui/Card"
import { Users, Briefcase, TrendingUp, Target, Heart, Zap } from "lucide-react"

const About = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <div className="container mx-auto py-6 px-4 max-w-4xl">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-8">
              <h1 className="text-4xl font-bold mb-4">About PluggLink</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                PluggLink is a professional networking platform designed to
                bridge the gap between students and professionals. We believe in
                meaningful connections that drive career growth and learning
                opportunities.
              </p>
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

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Why ConnectPro?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">For Students</h3>
                    <p className="text-muted-foreground">
                      Discover internships, connect with industry professionals,
                      and build your career foundation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Briefcase className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">For Professionals</h3>
                    <p className="text-muted-foreground">
                      Find talented individuals, share opportunities, and expand
                      your professional network
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <TrendingUp className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">For Everyone</h3>
                    <p className="text-muted-foreground">
                      A platform that values meaningful connections over vanity
                      metrics
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default About

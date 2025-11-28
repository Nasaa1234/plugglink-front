// "use client"

// import { useState, ChangeEvent } from "react"
// import { SIGNUP, LOGIN } from "../graphql/mutations"
// import { useMutation } from "@apollo/client/react"

// interface FormState {
//   name: string
//   email: string
//   password: string
// }

// interface User {
//   id: string
//   name: string
//   email: string
// }

// interface AuthPayload {
//   token: string
//   user: User
// }

// interface AuthResponse {
//   signup?: AuthPayload
//   login?: AuthPayload
// }

// export default function AuthForm() {
//   const [form, setForm] = useState<FormState>({
//     name: "",
//     email: "",
//     password: "",
//   })

//   const [signup] = useMutation<AuthResponse>(SIGNUP)
//   const [login] = useMutation<AuthResponse>(LOGIN)

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
//     setForm({ ...form, [e.target.name]: e.target.value })

//   const handleSignup = async () => {
//     try {
//       const { data } = await signup({ variables: form })
//       if (data?.signup) {
//         localStorage.setItem("token", data.signup.token)
//         alert(`Signed up successfully! Welcome ${data.signup.user.name}`)
//       }
//     } catch (err: any) {
//       console.error(err)
//       alert(err.message || "Signup failed")
//     }
//   }

//   const handleLogin = async () => {
//     try {
//       const { data } = await login({
//         variables: { email: form.email, password: form.password },
//       })
//       if (data?.login) {
//         localStorage.setItem("token", data.login.token)
//         alert(`Logged in successfully! Welcome ${data.login.user.name}`)
//       }
//     } catch (err: any) {
//       console.error(err)
//       alert(err.message || "Login failed")
//     }
//   }

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "8px",
//         width: "300px",
//       }}
//     >
//       <input
//         name="name"
//         placeholder="Name"
//         onChange={handleChange}
//         value={form.name}
//       />
//       <input
//         name="email"
//         placeholder="Email"
//         onChange={handleChange}
//         value={form.email}
//       />
//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         onChange={handleChange}
//         value={form.password}
//       />
//       <button onClick={handleSignup}>Signup</button>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Chrome } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { useToast } from "@/hooks/useToast"
import { Separator } from "@/components/ui/Separator"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      })
      router.push("/")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to login. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }
  const handleGoogleLogin = () => {
    toast({
      title: "Coming Soon",
      description: "Google authentication will be available soon.",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="outline"
            className="w-full mb-4"
            onClick={handleGoogleLogin}
          >
            <Chrome className="h-4 w-4 mr-2" />
            Continue with Google
          </Button>

          <div className="relative mb-4">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              or
            </span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card"
import { useToast } from "@/hooks/useToast"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function VerifyPhone() {
  const [countryCode, setCountryCode] = useState("+976") // default
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const isValidPhone = (num: string) => {
    const regex = /^\d{7,8}$/ // 7-8 digits after country code
    return regex.test(num)
  }

  const sendOtp = () => {
    if (!phone) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your phone number.",
      })
      return
    }

    if (!isValidPhone(phone)) {
      toast({
        variant: "destructive",
        title: "Invalid Phone",
        description: "Enter 7-8 digits for Mongolian number",
      })
      return
    }

    // TODO: send OTP request to backend
    toast({
      title: "OTP Sent",
      description: `Check your SMS for ${countryCode}${phone}`,
    })

    setOtpSent(true)
  }

  const verifyOtp = () => {
    if (!otp) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Enter your OTP code.",
      })
      return
    }

    // TODO: verify OTP with backend
    toast({
      title: "Phone Verified!",
      description: "Your phone number is successfully verified.",
    })

    router.push("/onBoarding")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Phone Verification</CardTitle>
          <CardDescription>Enter your phone number</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <div className="flex gap-2">
              <select
                className="border rounded px-3 py-2 bg-background"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+976">+976</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
              </select>
              <Input
                type="tel"
                placeholder="99112233"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button onClick={sendOtp}>Verify</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter your phone number after the country code
            </p>
          </div>

          <AnimatePresence>
            {otpSent && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-2"
              >
                <Label>Enter OTP</Label>
                <Input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button className="w-full" onClick={verifyOtp}>
                  Confirm OTP
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

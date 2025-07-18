"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useFormStatus } from "react-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Facebook, PhoneIcon as Whatsapp, Check, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { signUpAction } from "@/actions/signup"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      className="w-full h-11 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
      disabled={pending}
    >
      {pending ? "Creating account..." : "Create account"}
    </Button>
  )
}

export default function SignUp() {
  /* local state only for password validation & toggling visibility */
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    dateOfBirth: "",
    walletAddress: "",
    referralCode: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSelect = (name: string, value: string) => setForm((p) => ({ ...p, [name]: value }))

  const pwdReqs = [
    { text: "At least 8 characters", met: form.password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(form.password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(form.password) },
    { text: "Contains number", met: /\d/.test(form.password) },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* logo */}
        <div className="flex flex-col items-center space-y-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">PulseCloud</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Professional Mining</div>
            </div>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 text-center">Create your account to start mining</p>
        </div>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Get started</CardTitle>
            <CardDescription>Create your account to access professional mining features</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* ---------- FORM ---------- */}
            <form action={signUpAction} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="United States"
                  value={form.country}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="walletAddress">Wallet Address</Label>
                <Input
                  id="walletAddress"
                  name="walletAddress"
                  placeholder="0x..."
                  value={form.walletAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                <Input
                  id="referralCode"
                  name="referralCode"
                  placeholder="Enter referral code"
                  value={form.referralCode}
                  onChange={handleChange}
                />
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    className="pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>

                {/* live pwd checklist */}
                {form.password && (
                  <div className="space-y-1 mt-2">
                    {pwdReqs.map((req) => (
                      <div key={req.text} className="flex items-center space-x-2 text-xs">
                        <Check className={`h-3 w-3 ${req.met ? "text-green-500" : "text-gray-300"}`} />
                        <span className={req.met ? "text-green-600" : "text-gray-500"}>{req.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* TERMS */}
              <div className="flex items-center space-x-2">
                <input id="terms" type="checkbox" className="rounded border-gray-300" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* submit */}
              <SubmitButton />
            </form>

            {/* -------------- OAuth divider -------------- */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* ---------- OAuth buttons ---------- */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full h-11 bg-transparent">
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button variant="outline" className="w-full h-11 bg-transparent">
                <Whatsapp className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </div>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

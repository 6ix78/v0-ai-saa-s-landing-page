"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Facebook, PhoneIcon as Whatsapp, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard on successful login
      router.push("/dashboard")
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Logo */}
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
          <p className="text-gray-600 dark:text-gray-400 text-center">Sign in to your account</p>
        </div>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Enter your email below to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-11 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-11 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full h-11 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              >
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              >
                <Whatsapp className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </div>

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { adminLogin, resetAdminPassword } from "@/actions/admin-auth"

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const searchParams = useSearchParams()
  const message = searchParams.get("message")

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
              <div className="text-sm text-gray-500 dark:text-gray-400">Admin Panel</div>
            </div>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 text-center">Sign in to manage your mining operations</p>
        </div>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              {isResettingPassword ? "Reset Password" : "Admin Login"}
            </CardTitle>
            <CardDescription>
              {isResettingPassword ? "Enter your email to receive a reset link." : "Enter your admin credentials."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {message && (
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-3 rounded-md text-sm text-center">
                {message}
              </div>
            )}

            {isResettingPassword ? (
              <form action={resetAdminPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="designwith6ix@gmail.com"
                    className="h-11 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
                >
                  Send Reset Link
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="w-full text-primary"
                  onClick={() => setIsResettingPassword(false)}
                >
                  Back to Login
                </Button>
              </form>
            ) : (
              <form action={adminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    className="h-11 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
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
                >
                  Login
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="w-full text-primary"
                  onClick={() => setIsResettingPassword(true)}
                >
                  Forgot password?
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

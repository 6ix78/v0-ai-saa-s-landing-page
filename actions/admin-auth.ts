"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createServerActionClient } from "@/lib/supabase"
import { ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_RESET_EMAIL } from "@/lib/constants"

export async function adminLogin(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // In a real application, you would use Supabase Auth for admin users
    // For this example, we'll simulate a successful login by setting a cookie
    cookies().set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })
    redirect("/admin/dashboard")
  } else {
    redirect("/admin/login?message=Invalid credentials")
  }
}

export async function resetAdminPassword(formData: FormData) {
  const email = formData.get("email") as string

  if (email !== ADMIN_RESET_EMAIL) {
    redirect("/admin/login?message=Unauthorized email for password reset.")
  }

  const supabase = createServerActionClient()

  // Supabase's resetPasswordForEmail sends an OTP to the email
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/update-password`, // This should be a page where user can set new password
  })

  if (error) {
    console.error("Password reset error:", error.message)
    redirect(`/admin/login?message=Error sending reset email: ${error.message}`)
  }

  redirect("/admin/login?message=Password reset OTP sent to your email.")
}

export async function adminLogout() {
  cookies().delete("admin_session")
  redirect("/admin/login")
}

export async function checkAdminSession() {
  const session = cookies().get("admin_session")?.value
  return session === "true"
}

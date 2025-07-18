"use server"

import { createClient } from "@/lib/supabase" // Assuming this path to your Supabase client

export async function signUpAction(formData: FormData) {
  const supabase = createClient()

  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const country = formData.get("country") as string
  const dateOfBirth = formData.get("dateOfBirth") as string
  const walletAddress = formData.get("walletAddress") as string
  const referralCode = formData.get("referralCode") as string | null
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match.",
    }
  }

  // Basic validation (you might want more robust validation)
  if (!email || !password || !firstName || !lastName || !country || !dateOfBirth || !walletAddress) {
    return {
      success: false,
      message: "All required fields must be filled.",
    }
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          country: country,
          date_of_birth: dateOfBirth, // Store as string or convert to date object if your DB supports
          wallet_address: walletAddress,
          referral_code: referralCode,
        },
      },
    })

    if (error) {
      return {
        success: false,
        message: error.message,
      }
    }

    if (data.user) {
      // User successfully signed up, but might need email confirmation
      return {
        success: true,
        message: "Account created successfully! Please check your email to verify your account.",
      }
    } else {
      return {
        success: false,
        message: "Something went wrong during signup.",
      }
    }
  } catch (err: any) {
    console.error("Signup error:", err)
    return {
      success: false,
      message: `An unexpected error occurred: ${err.message}`,
    }
  }
}

import type { Metadata } from "next"
import PrivacyPolicyTemplate from "@/components/privacy-policy-template"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | PulseCloud",
  description: "Learn about how PulseCloud collects, uses, and protects your personal data.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <PrivacyPolicyTemplate />
      </main>

      <Footer />
    </div>
  )
}

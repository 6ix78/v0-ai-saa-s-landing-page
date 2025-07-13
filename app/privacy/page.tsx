import type { Metadata } from "next"
import PrivacyPolicyTemplate from "@/components/privacy-policy-template"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | PulseCloud",
  description: "Our commitment to protecting your privacy and securing your data in cryptocurrency mining.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PrivacyPolicyTemplate />
      </main>
      <Footer />
    </div>
  )
}

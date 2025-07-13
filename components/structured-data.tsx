import Script from "next/script"

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PulseCloud",
    url: "https://www.pulsecloud.com",
    logo: "https://www.pulsecloud.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-123-456-7890",
      contactType: "customer service",
      email: "info@pulsecloud.com",
    },
    sameAs: [
      "https://twitter.com/pulsecloud",
      "https://linkedin.com/company/pulsecloud",
      "https://facebook.com/pulsecloud",
    ],
  }

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

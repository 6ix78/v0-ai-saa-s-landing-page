import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/"], // Example: disallow specific paths
    },
    sitemap: "https://pulsecloud.com/sitemap.xml", // Replace with your actual domain
  }
}

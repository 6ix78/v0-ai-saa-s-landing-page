import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | PulseCloud",
  description: "Stay updated with the latest news, insights, and guides on cryptocurrency mining from PulseCloud.",
}

const blogPosts = [
  {
    slug: "ethereum-mining-guide",
    title: "The Ultimate Guide to Ethereum Mining in 2025",
    description: "Everything you need to know to start mining Ethereum effectively.",
    image: "/placeholder.svg?height=200&width=300",
    date: "July 10, 2025",
    author: "PulseCloud Team",
  },
  {
    slug: "optimizing-hashrate",
    title: "5 Tips for Optimizing Your Mining Hashrate",
    description: "Boost your mining efficiency and increase your daily earnings.",
    image: "/placeholder.svg?height=200&width=300",
    date: "July 5, 2025",
    author: "Mining Expert",
  },
  {
    slug: "future-of-mining",
    title: "The Future of Cloud Mining: What to Expect",
    description: "An in-depth look at upcoming trends and technologies in cloud mining.",
    image: "/placeholder.svg?height=200&width=300",
    date: "June 28, 2025",
    author: "Industry Analyst",
  },
  {
    slug: "choosing-a-pool",
    title: "How to Choose the Best Mining Pool for Your Needs",
    description: "Factors to consider when selecting a mining pool for maximum profitability.",
    image: "/placeholder.svg?height=200&width=300",
    date: "June 20, 2025",
    author: "Community Contributor",
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Blog</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Stay informed with the latest news, insights, and guides on cryptocurrency mining and blockchain technology.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <Link href={`/blog/${post.slug}`}>
              <div className="relative w-full h-48">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground flex justify-between items-center">
                <span>{post.date}</span>
                <span>By {post.author}</span>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

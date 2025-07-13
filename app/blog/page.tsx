import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  const blogPosts = [
    {
      slug: "understanding-cloud-mining",
      title: "Understanding Cloud Mining: A Beginner's Guide",
      description: "Dive into the basics of cloud mining and how it can benefit you.",
      image: "/placeholder.svg?height=200&width=300",
      date: "July 10, 2025",
      author: "PulseCloud Team",
    },
    {
      slug: "maximizing-eth-profits",
      title: "Tips for Maximizing Your Ethereum Mining Profits",
      description: "Learn advanced strategies to get the most out of your mining operations.",
      image: "/placeholder.svg?height=200&width=300",
      date: "July 5, 2025",
      author: "Crypto Expert",
    },
    {
      slug: "future-of-blockchain",
      title: "The Future of Blockchain Technology and Mining",
      description: "Explore upcoming trends and innovations in the blockchain space.",
      image: "/placeholder.svg?height=200&width=300",
      date: "June 28, 2025",
      author: "Tech Analyst",
    },
    {
      slug: "security-in-cloud-mining",
      title: "Ensuring Security in Cloud Mining: Best Practices",
      description: "Understand the security measures in place to protect your investments.",
      image: "/placeholder.svg?height=200&width=300",
      date: "June 20, 2025",
      author: "Security Specialist",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Blog</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Stay updated with the latest news, insights, and guides on cryptocurrency mining and blockchain.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col overflow-hidden">
                <Link href={`/blog/${post.slug}`} className="block" prefetch={false}>
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-bold">
                    <Link href={`/blog/${post.slug}`} prefetch={false}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{post.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground pt-0">
                  <p>
                    {post.date} by {post.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

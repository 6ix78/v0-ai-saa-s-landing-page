import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CommentsSection from "@/components/comments-section"
import Image from "next/image"
import Link from "next/link"

// This is a placeholder for fetching blog post data.
// In a real application, you would fetch this from a database or CMS.
async function getBlogPost(slug: string) {
  const posts = {
    "understanding-cloud-mining": {
      title: "Understanding Cloud Mining: A Beginner's Guide",
      author: "PulseCloud Team",
      date: "July 10, 2025",
      image: "/placeholder.svg?height=400&width=800",
      content: `
        <p>Cloud mining allows individuals to mine cryptocurrencies like Ethereum without directly owning or managing mining hardware. Instead, you rent computing power from a cloud mining provider like PulseCloud.</p>
        <p>This eliminates the need for expensive equipment, high electricity bills, and technical expertise. It's an ideal solution for those who want to participate in crypto mining but prefer a hands-off approach.</p>
        <h3>How it Works</h3>
        <p>When you sign up for a cloud mining contract, you essentially purchase a certain amount of hash rate. This hash rate is then used by the provider's data centers to mine cryptocurrencies. Your share of the mining rewards is proportional to the hash rate you've purchased.</p>
        <p>PulseCloud handles all the complexities: hardware maintenance, electricity costs, cooling, and network management. You simply choose a package, and we do the rest, providing you with daily payouts directly to your wallet.</p>
        <h4>Benefits of Cloud Mining</h4>
        <ul>
          <li><strong>Accessibility:</strong> No need for technical knowledge or expensive hardware.</li>
          <li><strong>Cost-Effective:</strong> Avoid high electricity bills and maintenance costs.</li>
          <li><strong>Convenience:</strong> Mine from anywhere, anytime, without managing physical rigs.</li>
          <li><strong>Diversification:</strong> Add crypto mining to your investment portfolio easily.</li>
        </ul>
        <p>Ready to start your cloud mining journey? Explore our <a href="/pricing" class="text-primary hover:underline">mining packages</a> today!</p>
      `,
    },
    "maximizing-eth-profits": {
      title: "Tips for Maximizing Your Ethereum Mining Profits",
      author: "Crypto Expert",
      date: "July 5, 2025",
      image: "/placeholder.svg?height=400&width=800",
      content: `
        <p>To maximize your Ethereum mining profits, consider these key strategies:</p>
        <h3>1. Choose the Right Pool</h3>
        <p>Joining a reliable and efficient mining pool is crucial. Look for pools with low fees, consistent uptime, and a transparent payout system. PulseCloud's mining pool offers competitive advantages designed to boost your earnings.</p>
        <h3>2. Monitor Network Difficulty</h3>
        <p>Ethereum's network difficulty fluctuates. Staying informed about these changes can help you adjust your strategies. While cloud mining abstracts much of this, understanding market dynamics is always beneficial.</p>
        <h3>3. Reinvest Earnings Wisely</h3>
        <p>Consider reinvesting a portion of your daily payouts back into your mining contracts to increase your hash rate. This compounding effect can significantly boost long-term profitability.</p>
        <h3>4. Stay Updated on ETH Price</h3>
        <p>The price of Ethereum directly impacts your fiat earnings. Keep an eye on market trends and consider when to convert your ETH to fiat or other cryptocurrencies.</p>
        <h3>5. Utilize Calculators</h3>
        <p>Use mining calculators to estimate potential profits based on your hash rate, electricity costs (if applicable), and current market conditions. Our <a href="/calculator" class="text-primary hover:underline">mining calculator</a> can help you with this.</p>
        <p>By implementing these tips, you can optimize your cloud mining operations and achieve higher returns with PulseCloud.</p>
      `,
    },
    "future-of-blockchain": {
      title: "The Future of Blockchain Technology and Mining",
      author: "Tech Analyst",
      date: "June 28, 2025",
      image: "/placeholder.svg?height=400&width=800",
      content: `
        <p>Blockchain technology continues to evolve rapidly, promising a decentralized future beyond just cryptocurrencies. While Ethereum has transitioned to Proof-of-Stake (PoS), the principles of decentralized networks and the demand for computational power remain strong.</p>
        <h3>Beyond Proof-of-Work</h3>
        <p>The shift from Proof-of-Work (PoW) to PoS for Ethereum (The Merge) has changed the landscape for ETH miners. However, other PoW cryptocurrencies still exist, and the underlying technology for distributed computing continues to be vital.</p>
        <h3>Emerging Trends</h3>
        <ul>
          <li><strong>Decentralized Finance (DeFi):</strong> Blockchain powers innovative financial services, creating new opportunities.</li>
          <li><strong>NFTs and Metaverse:</strong> Digital ownership and virtual worlds are expanding, relying on blockchain infrastructure.</li>
          <li><strong>Enterprise Blockchain:</strong> Businesses are adopting blockchain for supply chain, data management, and more.</li>
          <li><strong>Sustainable Mining:</strong> Focus on renewable energy sources and efficient mining practices is growing.</li>
        </ul>
        <p>PulseCloud is committed to adapting to these changes, exploring new mining opportunities, and providing solutions that align with the future of blockchain technology.</p>
      `,
    },
    "security-in-cloud-mining": {
      title: "Ensuring Security in Cloud Mining: Best Practices",
      author: "Security Specialist",
      date: "June 20, 2025",
      image: "/placeholder.svg?height=400&width=800",
      content: `
        <p>Security is paramount in the world of cryptocurrency. At PulseCloud, we implement robust measures to protect your investments and data in our cloud mining operations.</p>
        <h3>Our Security Measures</h3>
        <ul>
          <li><strong>State-of-the-Art Data Centers:</strong> Our facilities are equipped with physical security, surveillance, and environmental controls.</li>
          <li><strong>Advanced Encryption:</strong> All data transmission and storage are secured with industry-leading encryption protocols.</li>
          <li><strong>Regular Audits:</strong> We conduct frequent security audits and penetration testing to identify and mitigate vulnerabilities.</li>
          <li><strong>Multi-Factor Authentication (MFA):</strong> We encourage and support MFA for all user accounts to prevent unauthorized access.</li>
          <li><strong>Cold Storage for Funds:</strong> A significant portion of mined cryptocurrencies is held in secure cold storage to minimize online exposure.</li>
        </ul>
        <h3>User Best Practices</h3>
        <p>While we handle the infrastructure security, users also play a vital role:</p>
        <ul>
          <li><strong>Strong Passwords:</strong> Use unique, complex passwords for your PulseCloud account.</li>
          <li><strong>Enable MFA:</strong> Always enable multi-factor authentication for an extra layer of security.</li>
          <li><strong>Secure Wallets:</strong> Ensure your personal cryptocurrency wallets are secure and backed up.</li>
          <li><strong>Beware of Phishing:</strong> Always verify the legitimacy of emails and websites before entering credentials.</li>
        </ul>
        <p>By partnering with PulseCloud and following these best practices, you can enjoy a secure and worry-free cloud mining experience.</p>
      `,
    },
  }
  return posts[slug as keyof typeof posts] || null
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 py-12 md:py-20">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground">The blog post you are looking for does not exist.</p>
            <Link href="/blog" className="text-primary hover:underline mt-4 inline-block">
              Go back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-20">
        <article className="container px-4 md:px-6 prose prose-gray max-w-none dark:prose-invert">
          <header className="mb-8 text-center">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="w-full max-h-96 object-cover rounded-lg mb-6"
            />
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-muted-foreground text-sm">
              By {post.author} on {post.date}
            </p>
          </header>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
        <CommentsSection postSlug={params.slug} />
      </main>
      <Footer />
    </div>
  )
}

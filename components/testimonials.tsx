import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "I've been mining with EthMiner Pro for 6 months and the returns have been consistently above expectations. The platform is reliable and payouts are always on time.",
      name: "Sarah Chen",
      title: "Crypto Investor",
      avatar: "SC",
    },
    {
      quote:
        "The free mining pool got me started, and now I'm running multiple professional packages. The ROI has been incredible and the support team is always helpful.",
      name: "Michael Johnson",
      title: "Mining Enthusiast",
      avatar: "MJ",
    },
    {
      quote:
        "As someone new to crypto mining, EthMiner Pro made it easy to get started. The dashboard is intuitive and I love the daily payout feature.",
      name: "David Rodriguez",
      title: "New Miner",
      avatar: "DR",
    },
  ]

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trusted by Miners Worldwide</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              See what our mining community has to say about their experience with our platform.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardContent className="pt-6 flex-grow">
                <div className="mb-4 text-4xl">"</div>
                <p className="italic text-muted-foreground">{testimonial.quote}</p>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

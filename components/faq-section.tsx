"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQSection() {
  const faqs = [
    {
      question: "What is cloud mining?",
      answer:
        "Cloud mining allows you to mine cryptocurrencies without owning or maintaining physical hardware. You rent computing power from a provider like PulseCloud, and we handle all the technical aspects, including equipment, electricity, and maintenance.",
    },
    {
      question: "How often do I receive payouts?",
      answer:
        "We offer daily payouts directly to your specified cryptocurrency wallet. Your earnings are calculated based on your purchased hash rate and the pool's performance.",
    },
    {
      question: "Is cloud mining profitable?",
      answer:
        "Profitability depends on various factors, including cryptocurrency prices, network difficulty, and your chosen mining package. Our platform is designed to maximize your returns, and you can use our calculator to estimate potential profits.",
    },
    {
      question: "What cryptocurrencies can I mine?",
      answer:
        "Currently, PulseCloud primarily focuses on Ethereum (ETH) cloud mining due to its popularity and profitability. We are always evaluating other promising cryptocurrencies to add to our offerings.",
    },
    {
      question: "What security measures are in place?",
      answer:
        "We employ enterprise-grade security measures, including secure data centers, advanced encryption, regular security audits, and support for multi-factor authentication (MFA) to protect your investments and data.",
    },
  ]

  return (
    <section className="py-20" id="faq" aria-labelledby="faq-heading">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">FAQ</div>
            <h2 id="faq-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Find answers to common questions about PulseCloud and cloud mining.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

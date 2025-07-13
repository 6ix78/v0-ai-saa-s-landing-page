"use client"
import FeatureCard from "./feature-card"
import { useCases } from "./use-case-icons"

export default function UseCases() {
  return (
    <section className="py-20 bg-muted/50 dark:bg-muted/10" id="use-cases" aria-labelledby="use-cases-heading">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              Use Cases
            </div>
            <h2 id="use-cases-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Who Benefits from PulseCloud?
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our platform is designed to serve a wide range of users, from individual enthusiasts to large enterprises.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <FeatureCard key={index} {...useCase} />
          ))}
        </div>
      </div>
    </section>
  )
}

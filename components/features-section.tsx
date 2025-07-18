import FeatureCard from "@/components/feature-card"
import { featureIcons } from "@/components/feature-icons"

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900" id="features" aria-labelledby="features-heading">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="features-heading" className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for Serious Miners
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our platform is built with advanced tools and capabilities to maximize your mining efficiency and
            profitability.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureIcons.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { FeaturesSection }

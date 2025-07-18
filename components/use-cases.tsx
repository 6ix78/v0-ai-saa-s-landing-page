"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCases as useCaseIcons } from "@/components/use-case-icons" // Corrected import

function UseCases() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Unlock Your Mining Potential</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            PulseCloud offers versatile solutions tailored to various mining needs, from individual enthusiasts to
            large-scale operations.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCaseIcons.map((useCase, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4 dark:bg-blue-900 dark:text-blue-300">
                  <useCase.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl font-bold">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{useCase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export { UseCases }
export default UseCases

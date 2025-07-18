import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type React from "react"

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ElementType
  title: string
  description: string
}

export default function FeatureCard({ icon: Icon, title, description, className, ...props }: FeatureCardProps) {
  return (
    <Card className={cn("flex flex-col items-center text-center p-6", className)} {...props}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
          <Icon className="h-8 w-8" />
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

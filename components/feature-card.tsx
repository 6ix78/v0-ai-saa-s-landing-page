import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FrostedGlassIcon from "./frosted-glass-icon"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <Card className="flex flex-col items-center text-center p-6 bg-white/80 dark:bg-black/20 backdrop-blur-md border border-primary/10 shadow-lg">
      <FrostedGlassIcon icon={icon} className="mb-4" />
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

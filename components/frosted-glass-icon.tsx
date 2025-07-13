import { cn } from "@/lib/utils"
import type React from "react"

interface FrostedGlassIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ElementType
}

export default function FrostedGlassIcon({ icon: Icon, className, ...props }: FrostedGlassIconProps) {
  return (
    <div className={cn("frost-glass flex h-16 w-16 items-center justify-center rounded-2xl", className)} {...props}>
      <Icon className="h-8 w-8 text-primary" />
    </div>
  )
}

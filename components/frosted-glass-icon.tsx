import { cn } from "@/lib/utils"
import type React from "react"

interface FrostedGlassIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ElementType
}

export function FrostedGlassIcon({ icon: Icon, className, ...props }: FrostedGlassIconProps) {
  return (
    <div
      className={cn(
        "relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white border-opacity-20 bg-white bg-opacity-10 shadow-lg backdrop-blur-[10px]",
        className,
      )}
      {...props}
    >
      <Icon className="h-6 w-6 text-white" />
    </div>
  )
}

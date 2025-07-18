import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TestimonialProps {
  quote: string
  name: string
  title: string
  avatarSrc?: string
}

export function Testimonial({ quote, name, title, avatarSrc }: TestimonialProps) {
  return (
    <Card className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 shadow-md">
      <CardContent className="flex flex-col items-center">
        <Avatar className="h-20 w-20 mb-4">
          <AvatarImage src={avatarSrc || "/placeholder-user.jpg"} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">"{quote}"</p>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      </CardContent>
    </Card>
  )
}

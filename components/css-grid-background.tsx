interface GridBackgroundProps {
  className?: string
}

export function GridBackground({ className }: GridBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-gray-950 dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] ${className}`}
    />
  )
}

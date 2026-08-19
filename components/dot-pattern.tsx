import { cn } from "@/lib/utils"

interface DotPatternProps {
  glow?: boolean
  className?: string
}

export function DotPattern({ glow = false, className }: DotPatternProps) {
  return (
    <div
      className={cn("absolute inset-0 h-full w-full", glow && "animate-pulse", className)}
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }}
    />
  )
}

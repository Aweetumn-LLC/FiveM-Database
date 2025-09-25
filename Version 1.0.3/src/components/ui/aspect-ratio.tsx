
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

const AspectRatio = ({ 
  className, 
  ratio = 16 / 9,
  ...props 
}: React.ComponentProps<typeof AspectRatioPrimitive.Root> & { 
  ratio?: number 
}) => {
  const isMobile = useIsMobile()
  
  // Use a slightly different aspect ratio on mobile if needed
  const effectiveRatio = isMobile ? (ratio > 1 ? Math.min(ratio, 4/3) : ratio) : ratio
  
  return (
    <AspectRatioPrimitive.Root
      className={cn(
        "overflow-hidden rounded-lg", 
        isMobile ? "max-w-full" : "",
        className
      )}
      ratio={effectiveRatio}
      {...props}
    />
  )
}

export { AspectRatio }


import React from "react"

// Adjusted breakpoint for better mobile detection
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      setIsMobile(width < MOBILE_BREAKPOINT)
    }
    
    // Check immediately
    checkMobile()
    
    // Add event listener for resize
    window.addEventListener("resize", checkMobile)
    
    // Also check on orientation change for mobile devices
    window.addEventListener("orientationchange", () => {
      // Small delay to ensure orientation change is complete
      setTimeout(checkMobile, 100)
    })
    
    // Clean up
    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("orientationchange", checkMobile)
    }
  }, [])

  return isMobile
}

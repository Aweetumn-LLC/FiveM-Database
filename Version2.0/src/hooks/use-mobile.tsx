
import React from "react"

// Increased breakpoint to catch more devices in "mobile" mode
const MOBILE_BREAKPOINT = 768 

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Initial check
    const checkMobile = () => {
      const width = window.innerWidth
      const userAgent = navigator.userAgent.toLowerCase()
      
      // More comprehensive checks for mobile devices
      const isMobileWidth = width < MOBILE_BREAKPOINT
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet|phone/.test(userAgent)
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      // Set as mobile if any condition is true
      setIsMobile(isMobileWidth || isMobileDevice || isTouchDevice)
    }
    
    // Check immediately
    checkMobile()
    
    // Add event listener for resize
    window.addEventListener("resize", checkMobile)
    
    // Also check on orientation change for mobile devices
    window.addEventListener("orientationchange", checkMobile)
    
    // Clean up
    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("orientationchange", checkMobile)
    }
  }, [])

  return isMobile
}

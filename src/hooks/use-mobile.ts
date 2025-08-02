import { useEffect, useState } from "react";





const MOBILE_BREAKPOINT = 768;

export function useMobile(breakpoint: number = MOBILE_BREAKPOINT) {
    const [isMobile, setIsMobile] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const checkMobile = () => {
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
        }

        checkMobile()
        setIsLoading(false)

        window.addEventListener("resize", checkMobile)

        return() => window.removeEventListener("resize", checkMobile)

    }, [breakpoint])

    return {isMobile, isLoading}
}
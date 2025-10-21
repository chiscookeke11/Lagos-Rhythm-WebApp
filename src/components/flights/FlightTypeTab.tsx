"use client"

import { motion, spring } from "framer-motion";
import React, { ReactNode, SetStateAction, useRef, useState } from "react"

interface CursorProps {
    position: PositionProps
}

interface PositionProps {
    left: number,
    width: number,
    opacity: number,
}



interface CursorProps {
    position: PositionProps;
}


interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    setPosition: React.Dispatch<SetStateAction<PositionProps>>
}


interface FlightTypeTabProps {
    flightType: string
    setFlightType: React.Dispatch<SetStateAction<"One-Way" | "Round-Trip">>
}


const Tab = ({ children, setPosition, ...rest }: TabProps) => {
    const ref = useRef<HTMLButtonElement>(null)

    return (
        <button
            ref={ref}
            onMouseEnter={(e) => {
                if (!ref.current) return
                const { width } = ref.current.getBoundingClientRect()

                setPosition({
                    width,
                    opacity: 1,
                    left: ref.current.offsetLeft,
                })
            }}
            {...rest}
            className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
        >{children} </button>
    )
}




const Cursor = ({ position }: CursorProps) => {
    return (
        <motion.div
            animate={position}
            className="absolute z-0 h-7 rounded-full bg-[#EF8F57] md:h-12" />
    )
}








export default function FlightTypeTab({ flightType, setFlightType }: FlightTypeTabProps) {
    const [position, setPosition] = useState<PositionProps>({
        left: 0,
        width: 0,
        opacity: 0
    })
    return (
        <div className="relative w-full max-w-3xl flex items-center justify-between gap-10 py-5 px-7 bg-white rounded-[120px] shadow-inner " >

            <Tab setPosition={setPosition} onClick={() => setFlightType("One-Way")} >One-Way</Tab>
            <Tab setPosition={setPosition} onClick={() => setFlightType("Round-Trip")}>Round-Trip</Tab>

            <Cursor position={position} />
        </div>
    )
}
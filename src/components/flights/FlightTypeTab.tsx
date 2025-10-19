"use client"

import { motion, spring } from "framer-motion";
import React, { ReactNode, SetStateAction, useRef, useState } from "react"

interface CursorProps{
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


interface TabProps {
    children: ReactNode;
    setPosition: React.Dispatch<SetStateAction<PositionProps>>
}


const Tab = ({ children, setPosition }: TabProps) => {
    const ref = useRef < HTMLButtonElement > (null)

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








export default function FlightTypeTab() {
    const [position, setPosition] = useState<PositionProps>({
        left: 0,
        width: 0,
        opacity: 0
    })
    return (
        <div className="relative w-full max-w-3xl flex items-center justify-between gap-10 py-5 px-7 shadow-inner bg-white rounded-[120px] shadow-inner " >

            <Tab setPosition={setPosition} >One-way</Tab>
            <Tab setPosition={setPosition} >Round Trip</Tab>
            <Tab setPosition={setPosition} >Multi-city</Tab>

            <Cursor position={position} />
        </div>
    )
}
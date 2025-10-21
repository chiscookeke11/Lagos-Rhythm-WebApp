"use client"

import FlightTypeTab from "./FlightTypeTab";
import React, { SetStateAction } from "react";
import OneWayTripComponent from "./OneWayTrip";
import RoundTrip from "./RoundTrip";





interface StepOneProps {
    flightType: string
    setFlightType: React.Dispatch<SetStateAction<"One-Way" | "Round-Trip">>
}


export default function StepOne({ flightType, setFlightType }: StepOneProps) {





    return (
        <div className=" w-full bg-transparent h-full flex flex-col items-center justify-center gap-20 font-signika " >

            <FlightTypeTab
                flightType={flightType}
                setFlightType={setFlightType}
            />






            {flightType === "One-Way" ?
                (
                    <OneWayTripComponent />
                ) :
                (
                    <RoundTrip />
                )
            }



        </div>
    )
}
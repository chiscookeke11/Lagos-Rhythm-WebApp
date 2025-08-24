"use client"
import React, { useState } from "react"
import moment from "moment-timezone"
import { X } from "lucide-react"

// Some sample countries & their timezones
const countries = [
  { name: "Nigeria", tz: "Africa/Lagos" }, // WAT
  { name: "South Africa", tz: "Africa/Johannesburg" },
  { name: "Egypt", tz: "Africa/Cairo" },
  { name: "Kenya", tz: "Africa/Nairobi" },
  { name: "Ghana", tz: "Africa/Accra" },

  { name: "United States (New York)", tz: "America/New_York" },
  { name: "United States (Chicago)", tz: "America/Chicago" },
  { name: "United States (Denver)", tz: "America/Denver" },
  { name: "United States (Los Angeles)", tz: "America/Los_Angeles" },
  { name: "Canada (Toronto)", tz: "America/Toronto" },
  { name: "Canada (Vancouver)", tz: "America/Vancouver" },
  { name: "Brazil (São Paulo)", tz: "America/Sao_Paulo" },
  { name: "Argentina (Buenos Aires)", tz: "America/Argentina/Buenos_Aires" },

  { name: "United Kingdom", tz: "Europe/London" },
  { name: "France", tz: "Europe/Paris" },
  { name: "Germany", tz: "Europe/Berlin" },
  { name: "Spain", tz: "Europe/Madrid" },
  { name: "Italy", tz: "Europe/Rome" },
  { name: "Netherlands", tz: "Europe/Amsterdam" },
  { name: "Sweden", tz: "Europe/Stockholm" },
  { name: "Russia (Moscow)", tz: "Europe/Moscow" },
  { name: "Turkey", tz: "Europe/Istanbul" },

  { name: "India", tz: "Asia/Kolkata" },
  { name: "China (Beijing)", tz: "Asia/Shanghai" },
  { name: "Japan", tz: "Asia/Tokyo" },
  { name: "South Korea", tz: "Asia/Seoul" },
  { name: "Singapore", tz: "Asia/Singapore" },
  { name: "United Arab Emirates (Dubai)", tz: "Asia/Dubai" },
  { name: "Saudi Arabia (Riyadh)", tz: "Asia/Riyadh" },
  { name: "Israel", tz: "Asia/Jerusalem" },
  { name: "Pakistan", tz: "Asia/Karachi" },
  { name: "Indonesia (Jakarta)", tz: "Asia/Jakarta" },
  { name: "Philippines (Manila)", tz: "Asia/Manila" },

  { name: "Australia (Sydney)", tz: "Australia/Sydney" },
  { name: "Australia (Melbourne)", tz: "Australia/Melbourne" },
  { name: "Australia (Perth)", tz: "Australia/Perth" },
  { name: "New Zealand (Auckland)", tz: "Pacific/Auckland" },
]


interface TimeConverterProps {
  baseTime: string // e.g. "15:00" for 3:00 PM
}

const TimeConverter: React.FC<TimeConverterProps> = ({ baseTime }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0].tz)
  const [showTimeConverter, setShowTimeConverter] = useState(false)

  // Convert base time (WAT) to user’s selected timezone
  const convertedTime = moment
    .tz(baseTime, "HH:mm", "Africa/Lagos")
    .tz(selectedCountry)
    .format("h:mm A")

  return (
   <>
   {showTimeConverter ?
    (
         <div className="p-4 max-w-md mx-auto border rounded-lg shadow fixed bottom-[10%] bg-white right-[1%] z-10 font-signika flex flex-col gap-1 ">
            <button onClick={() => setShowTimeConverter(false)} className="ml-auto cursor-pointer text-red-500 " ><X/></button>
      <h2 className="text-lg font-semibold mb-2 text-[#EF8F57] ">Time Converter</h2>

      {/* Dropdown */}
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      >
        {countries.map((c) => (
          <option key={c.tz} value={c.tz}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Results */}
      <div className="text-sm">
        <p>
          <span className="font-semibold text-[#EF8F57]">Base Time (WAT):</span>{" "}
          {moment.tz(baseTime, "HH:mm", "Africa/Lagos").format("h:mm A")}
        </p>
        <p>
          <span className="font-semibold text-[#EF8F57]">Converted Time:</span> {convertedTime}
        </p>
      </div>

      {!baseTime ? <p className="text-sm text-red-500 mx-auto mt-2 " >Please select a time</p> : null}
    </div>
    )
:
(
    <div className="  fixed bottom-[10%] right-[1%] z-10 font-signika " >
        <button
  onClick={() => setShowTimeConverter(true)}
  className="relative w-20 h-20 rounded-full flex items-center justify-center  shadow-md cursor-pointer overflow-hidden bg-white"
>
  {/* SVG circular text */}
  <svg
    viewBox="0 0 100 100"
    className="absolute w-full h-full"
  >
    <defs>
      <path
        id="circlePath"
        d="M 50, 50
           m -35, 0
           a 35,35 0 1,1 70,0
           a 35,35 0 1,1 -70,0"
      />
    </defs>
    <text fill="black" fontSize="14" fontWeight="bold">
      <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
        Time Converter • Time Converter •
      </textPath>
    </text>
  </svg>

  {/* Center icon/text */}
  <span className="z-10 text-sm font-semibold text-black">
    ⏱️
  </span>
</button>


    </div>
)
}
   </>
  )
}

export default TimeConverter

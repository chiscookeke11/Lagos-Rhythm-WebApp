"use client"


import RoundTrip from "@/components/flights/StepOne";
import { useState } from "react";




export default function Page() {

    const [flightType, setFlightType] = useState<"One-Way" | "Round-Trip">("One-Way")




    return (
        <div className=" bg-[#05073C] px-[3%] py-32 w-full min-h-screen text-[#05073C] " >




            <RoundTrip
                flightType={flightType}
                setFlightType={setFlightType}
            />








        </div>
    )
}



// "use client";
// import React, { useState } from "react";
// import { useAirportSearch } from "@/hooks/useAirportSearch";

// const AirportSearch = () => {
//   const [query, setQuery] = useState("");
//   const { airports, loading } = useAirportSearch(query);

//   return (
//     <div className="p-4 h-screen w-full flex items-center justify-center text-black ">
//       <input
//         type="text"
//         placeholder="Search city or airport"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="w-full border p-2 rounded-md"
//       />

//       {loading && <p className="text-sm mt-2">Loading...</p>}

//       <ul className="mt-3 space-y-2">
//         {airports.map((airport) => (
//           <li key={airport.id} className="border-b pb-1">
//             <strong>{airport.name}</strong> — {airport.city_name} ({airport.iata_code})
//             <br />
//             <span className="text-sm text-gray-500">
//               {airport.timezone} · {airport.country_name}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AirportSearch;

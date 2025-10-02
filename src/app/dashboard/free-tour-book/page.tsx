"use client"

import { fireDB } from "@/app/config/firebaseClient"
import Loader from "@/components/common/Loader"
import { FreeTourBookingDataType } from "@/Types/FreeTourBookingDataType"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function Page() {
  const [freeTourBookingData, setFreeTourBookingData] = useState<FreeTourBookingDataType[] | null>(null)

  useEffect(() => {
    const fetchFreeBookings = async () => {
      try {
        const q = query(
          collection(fireDB, "booked_Free_Rhythm"),
          orderBy("subscribedAt", "desc")
        )
        const querySnapshot = await getDocs(q)

        const items: FreeTourBookingDataType[] = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            fullName: data.fullName,
            agree_to_TC: data.agree_to_TC,
            country: data.country,
            email: data.email,
            joiningAs: data.joiningAs,
            otherJoin: data.otherJoin,
            reasonForJoin: data.reasonForJoin,
            referral: data.referral,
            subscribedAt: data.subscribedAt?.toDate().toDateString() || "",
          }
        })
        setFreeTourBookingData(items)
      } catch (err) {
        console.error("Error fetching data:", err)
      }
    }

    fetchFreeBookings()
  }, [])

  return (
    <div className="w-full h-fit py-8 px-6 flex flex-col gap-10 items-center   ">
                  <h2 className="text-[#EF8F57] hover:text-[#EF8F57]/80  font-semibold text-3xl font-lato tracking-wide  " >Free Tour booking</h2>
      {freeTourBookingData && freeTourBookingData.length > 0 ? (
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm ">
          <thead className="bg-gray-100">
            <tr>
              {Object.keys(freeTourBookingData[0]).map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b "
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {freeTourBookingData.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {Object.values(row).map((value, i) => (
                  <td
                    key={i}
                    className="px-4 py-2 text-sm text-gray-600 border-b"
                  >
                    {String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
       <div className="w-full h-screen flex items-center justify-center" >
         <Loader color="bg-[#EF8F57]"/>

       </div>
      )}
    </div>
  )
}

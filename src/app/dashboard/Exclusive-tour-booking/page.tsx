"use client"

import { fireDB } from "@/app/config/firebaseClient"
import Loader from "@/components/common/Loader"
import { ExclusiveTourBookingDataType } from "@/Types/ExclusiveTourBookingDataType"
import { Tourist } from "@/Types/UserDataType"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function Page() {
    const [exclusiveTourBookingData, setExclusiveTourBookingData] = useState<ExclusiveTourBookingDataType[] | null>(null)

    useEffect(() => {
        const fetchFreeBookings = async () => {
            try {
                const q = query(
                    collection(fireDB, "exclusive_Tour_form"),
                    orderBy("subscribedAt", "desc")
                )
                const querySnapshot = await getDocs(q)

                const items: ExclusiveTourBookingDataType[] = querySnapshot.docs.map((doc) => {
                    const data = doc.data()
                    console.log(data)
                    return {
                        id: doc.id,
                        tourDate: data.tourDate,
                        discountCode: data.discountCode,
                        OtherReason: data.OtherReason,
                        paidPrice: data.paidPrice,
                        populationSize: data.populationSize,
                        referralSource: data.referralSource,
                        subscriptionType: data.subscriptionType,
                        termsAgreement: data.termsAgreement,
                        time: data.time,
                        tourTheme: data.tourTheme,
                        tourist: data.tourist || [],
                        country: data.country,
                        joiningAs: data.joiningAs,
                        otherJoin: data.otherJoin,
                        reasonForJoin: data.reasonForJoin,
                        subscribedAt: data.subscribedAt?.toDate().toDateString() || "",
                        isCompleted: data.isCompleted
                    }
                })
                setExclusiveTourBookingData(items)
            } catch (err) {
                console.error("Error fetching data:", err)
            }
        }

        fetchFreeBookings()
    }, [])

    return (
        <div className="w-full h-fit py-8 px-6 flex flex-col items-center gap-10 ">
            <h2 className="text-[#EF8F57] hover:text-[#EF8F57]/80  font-semibold text-3xl font-lato tracking-wide  " >Exclusive Tour bookings</h2>
            {exclusiveTourBookingData && exclusiveTourBookingData.length > 0 ? (
                <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            {Object.keys(exclusiveTourBookingData[0]).map((key) => (
                                <th
                                    key={key}
                                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
                                >
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {exclusiveTourBookingData.map((row, idx) => (
                            <tr
                                key={idx}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                {Object.entries(row).map(([key, value], i) => (
                                    <td
                                        key={i}
                                        className="px-4 py-2 text-sm text-gray-600 border-b"
                                    >
                                        {/* Date formatting */}
                                        {key === "tourDate" && Array.isArray(value)
                                            ? value
                                                .map((d: string) =>
                                                    new Date(d).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })
                                                )
                                                .join(", ")
                                            : key === "tourist" && Array.isArray(value)
                                            ? (
                                                <ul className="list-disc pl-4">
                                                    {value.map((t: Tourist, idx: number) => (
                                                        <li key={idx}>
                                                            {t.fullName} ({t.email})
                                                        </li>
                                                    ))}
                                                </ul>
                                            )
                                            : String(value)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader color="bg-[#EF8F57]" />
                </div>
            )}
        </div>
    )
}

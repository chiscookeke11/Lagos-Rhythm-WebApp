"use client"

import { fireDB } from "@/app/config/firebaseClient"
import Loader from "@/components/common/Loader"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"


interface FeedbackData {
    name: string
    email: string
    tourJoined: string
    experienceDescription: string
    experienceRating: string
    publicTestimonial: string
    testimonialText?: string
    consentStoreFeedback: boolean
    consentPublishTestimonial?: boolean
    suggestions?: string
    timestamp: Date | null,
    id: string
}

export default function Page() {
    const [feedbackData, setFeedbackData] = useState<FeedbackData[] | null>(null)

    useEffect(() => {

        const fetchCustomerFeedback = async () => {

            try {
                const q = query(
                    collection(fireDB, "Feedback"),
                    orderBy("timestamp", "desc")
                )
                const querySnapshot = await getDocs(q)

                const items: FeedbackData[] = querySnapshot.docs.map((doc) => {
                    const data = doc.data()
                    return {
                        id: doc.id,
                        name: data.name,
                        email: data.email,
                        tourJoined: data.joinReason,
                        experienceDescription: data.experience,
                        experienceRating: data.experience_rating,
                        publicTestimonial: data.publishTestimonial,
                        testimonialText: data.testimonial_Text,
                        consentStoreFeedback: data.store_data,
                        consentPublishTestimonial: data.publishTestimonial,
                        suggestions: data.suggestions,
                        timestamp: data.timestamp ? data.timestamp.toDate() : null,
                    }

                })
                console.log("The feedbacks:", items)
                setFeedbackData(items)

            } catch (error) {
                console.error("Failed to fetch Feedbacks:", error)
            }
        }

        fetchCustomerFeedback()
    }, [])



    return (
        <div className="w-full h-fit py-8 px-6 flex flex-col gap-10 items-center   ">
            <h2 className="text-[#EF8F57] hover:text-[#EF8F57]/80  font-semibold text-3xl font-lato tracking-wide  " >Feedback</h2>

            {
                feedbackData && feedbackData.length < 1 ?
                    (
                       <p className="text-[#EF8F57] hover:text-[#EF8F57]/80  font-semibold text-xl font-merienda tracking-wide ">No Feedback found</p>
                    )
                    : !feedbackData ? (
                        <div className="h-[60vh] w-full flex items-center justify-center  " >
                            <Loader color="#EF8F57" />
                        </div>
                    )
                        :
                        (
                            <div className="w-full grid grid-cols-3 place-items-center justify-items-center gap-10 " >

                                {
                                    feedbackData.map((feedback) => (
                                        <div key={feedback.id} className=" bg-[#EF8F57] px-5 py-4 rounded-lg border w-full h-full cursor-pointer " >
                                            <h2>{feedback.name}</h2>
                                            <h3>{feedback.email}</h3>
                                            <h4> {feedback.timestamp ? feedback.timestamp.toDateString() : "No date"}</h4>
                                              <p>{feedback.tourJoined} </p>
                                              <p><span className="font-medium text-lg" >Rating:</span> {feedback.experienceRating} </p>

                                        </div>
                                    ))
                                }

                            </div>
                        )
            }


        </div>
    )
}
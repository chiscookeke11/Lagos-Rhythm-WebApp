"use client"


import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useAppContext } from "@/app/context/AppContext";
import { useUser } from "@clerk/nextjs";
import { Bookmark, CircleCheckBig, HandCoins, MessageCircle, RectangleEllipsis, TicketPlus, Users } from "lucide-react";
import { FaBlog } from "react-icons/fa";
import { fetchBlogsCount, fetchBookedExclusiveRhythmCount, fetchBookedFreeRhythmCount, fetchFeedbackCount, fetchSubscribersCount } from "@/lib/utils";







export default function Summary() {
    const [feedbackCount, setFeedbackCount] = useState(0)
    const { users, setUsers } = useAppContext()
    const { user } = useUser()
    const [subscribersCount, setSubscribersCount] = useState(0)
    const [blogsCount, setBlogsCount] = useState(0)
    const [freeRhythmCount, setFreeRhythmCount] = useState(0)
    const [exsRhythmCount, setExsRhythmCount] = useState(0)

    const summaryData = [
        {
            value: 100,
            title: "Total Sales",
            icon: <HandCoins />,
            precentage: "6"
        },
        {
            value: users?.length,
            title: "Customers",
            icon: <Users />,
            precentage: "6"
        },
        {
            value: blogsCount,
            title: "Blogs",
            icon: <FaBlog />,
            precentage: "6"
        },
        {
            value: freeRhythmCount + exsRhythmCount,
            title: "Booked Tours",
            icon: <TicketPlus />,
            precentage: "6"
        },
        {
            value: subscribersCount,
            title: " Subscribers",
            icon: <Bookmark />,
            precentage: "6"
        },
        {
            value: feedbackCount,
            title: " Feedback",
            icon: <MessageCircle />,
            precentage: "6"
        },
        {
            value: 100,
            title: " Pending Tours",
            icon: <RectangleEllipsis />,
            precentage: "6"
        },
        {
            value: 100,
            title: " Completed Tours",
            icon: <CircleCheckBig />,
            precentage: "6"
        },

    ]



    useEffect(() => {

        if (!user) return;

        else {
            const fetchUsers = async () => {
                try {
                    const res = await fetch("/api/get-users")

                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`)
                    }

                    const data = await res.json()
                    console.log("the users are:", data)


                    setUsers(data.data || data)
                } catch (err) {
                    console.error("Error fetching users:", err)
                }
            }
            fetchUsers()
        }


    }, [user])




    useEffect(() => {
        async function getCount() {
            const count = await fetchFeedbackCount();
            setFeedbackCount(count);
        }

        async function getSubscribers() {
            const subCount = await fetchSubscribersCount();
            setSubscribersCount(subCount)
        }

          async function getBlogs() {
            const blogsCount = await fetchBlogsCount();
            setBlogsCount(blogsCount)
        }


           async function getFreeRhythmBookings() {
            const freeBookingCount = await  fetchBookedFreeRhythmCount();
            setFreeRhythmCount(freeBookingCount)
        }


         async function getExclusiveBookings() {
            const exsBookingCount = await  fetchBookedExclusiveRhythmCount();
            setExsRhythmCount(exsBookingCount)
        }




        getCount();
        getSubscribers()
        getBlogs()
        getFreeRhythmBookings()
        getExclusiveBookings()
    }, []);






    return (
        <section className=" w-full max-w-4xl h-fit col-span-4  bg-white rounded-[20px] shadow-sm py-4 px-7 space-y-6 " >


            <div className="w-full flex items-center justify-between gap-10" >

                <div>
                    <h4 className="text-[#05004E] font-semibold text-xl  " >Overview</h4>
                    <h6 className=" font-normal text-[#737791] text-base " >Activity Summery</h6>
                </div>


                <Button className="flex items-center justify-center gap-4 bg-[#EF8F57] cursor-pointer hover:bg-[#EF8F57]/90 py-3 px-6 h-fit text-base font-medium font-lato " > Export</Button>
            </div>



            <div className="w-full  grid grid-cols-4 grid-rows-2 justify-between gap-6 " >


                {summaryData.map((data, index) => (
                    <div key={index} className=" w-full h-[200px] bg-[#FDF4F1] rounded-2xl flex flex-col items-start justify-center gap-2 p-4   " >
                        <span className="w-10 h-10 rounded-full bg-[#EF8F57] flex items-center justify-center text-white" >  {data.icon} </span>
                        <h3 className=" text-2xl text-[#151D48] font-semibold mt-4 " > {data.value}</h3>
                        <h4 className="text-[#425166] font-medium text-base " >{data.title} </h4>
                        <p className="text-[#4079ED] font-medium text-xs ">+{data.precentage}% from yesterday</p>
                    </div>
                ))}








            </div>
        </section>
    )
}
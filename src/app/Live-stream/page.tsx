"use client"

import { SendHorizontal, Smile, Sparkle, Timer } from "lucide-react"
import Marquee from "react-fast-marquee"
import EmojiPicker from "emoji-picker-react"
import type React from "react"
import { useEffect, useState } from "react"
import { mock_tour_data } from "@/data/mockTourData"
import type { Message } from "@/Types/messageType"
import { socket } from "@/lib/socket"
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { fireDB } from "../config/firebaseClient"
import { useAppContext } from "../context/AppContext"
import Image from "next/image"
import Link from "next/link"

export default function Page() {
  const [message, setMessage] = useState("")
  const [countdown, setCountdown] = useState<number>(0)
  const [showEmojis, setShowEmojis] = useState(false)
  const TOUR_START = new Date(mock_tour_data.date).getTime();
const TOUR_END = TOUR_START + 2 * 60 * 60 * 1000; // assuming 2-hour tour
const now = Date.now();

const hasTourEnded = now > TOUR_END;
  // const isAllowed = Date.now() < TOUR_START; // true if now is BEFORE the tour starts
  const [sentMessages, setSentMessages] = useState<Message[]>([])
  const { userData } = useAppContext()
  const [userCount, setUserCount] = useState(0)

  const tourTime = new Date(mock_tour_data.date)

  // Countdown timer
  useEffect(() => {
    const endTime = new Date(tourTime.getTime() + 1 * 60 * 60 * 1000) // 2 hours after start

    const interval = setInterval(() => {
      const now = new Date()
      const remaining = endTime.getTime() - now.getTime()
      setCountdown(remaining > 0 ? remaining : 0)
    }, 1000)

    return () => clearInterval(interval)
  }, [tourTime])

  // Socket connection for user count
  useEffect(() => {
    socket.connect()
    socket.on("update-user-count", (count: number) => {
      setUserCount(count)
    })

    return () => {
      socket.off("update-user-count")
      socket.disconnect()
    }
  }, [])

  // Firebase listener for messages
  useEffect(() => {


    const q = query(collection(fireDB, "messages"), orderBy("createdAt", "asc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          messenger: data.messenger,
          message: data.message,
          messangerPic: data.messangerPic || "",
          createdAt: data.createdAt?.toDate?.() || new Date(),
        }
      })
      setSentMessages(msgs)
    })

    return () => unsubscribe()
  }, [])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }


  const writeToDB = async (messenger: string, message: string, messangerPic: string) => {
    await addDoc(collection(fireDB, "messages"), {
      messenger,
      message,
      messangerPic,
      createdAt: new Date(),
    })
  }

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!message.trim()) return

    const msg: Message = {
      messenger: userData?.fullName ?? "User",
      message: message.trim(),
      messangerPic: userData?.imageUrl ?? "/profile/profile-placeholder.png",
    }

    socket.emit("send-message", msg)
    writeToDB(msg.messenger, msg.message, msg.messangerPic)
    setMessage("")
    setShowEmojis(false)
  }


  if (hasTourEnded) {
  return (
    <div className="h-screen flex items-center justify-center w-full bg-[#05073C] font-playfair">
      <p className="font-medium text-2xl text-center">
        Thank you for joining. We hope to see you again <br />
      </p>
    </div>
  )
}

  // if (isAllowed) {
  //   return (
  //     <div className="h-screen flex items-center justify-center w-full bg-[#05073C] font-playfair">
  //       <p className="font-medium text-2xl text-center">Thank you for joining <br />
  //         12:30pm </p>
  //     </div>
  //   )
  // }

  return (
    <div className="w-full min-h-screen flex flex-col items-start bg-[#05073C] relative bg-no-repeat bg-center bg-cover font-merienda">
      <Link href={"/"} className="block md:hidden mx-auto my-4 "  ><Image src={"/logos/logo.png"} height={100} width={100} alt="logo" className=" w-[50px] " /></Link>
      {/* Header */}
      <header className="w-full bg-[#05073C] py-6 px-[4%] flex items-center justify-center md:justify-evenly gap-12 flex-wrap">

        <Link href={"/"} className="hidden md:block " ><Image src={"/logos/logo.png"} height={100} width={100} alt="logo" className=" w-[50px] " /></Link>


        <span className="flex items-center gap-2 text-xs md:text-sm">
          {countdown > 0 && (
            <>
              <span className="w-3 h-3 bg-red-700 rounded-sm block" />
              Live Now
            </>
          )}
        </span>

        <h1 className="text-xl md:text-2xl text-center">{mock_tour_data.tourTitle}</h1>

        <div className="w-fit flex items-center gap-3">
          <div className="flex w-fit items-center shrink-0">
            {["🐯", "🦊", "🐼"].slice(0, userCount).map((emoji, i) => (
              <div
                key={i}
                className="h-3 w-3 md:h-7 md:w-7 rounded-full bg-gray-300 border border-purple-950 flex items-center justify-center ml-[-10px]"
              >
                {userCount > 0 ? emoji : null}
              </div>
            ))}
          </div>
          <p className="text-xs md:text-sm"> {userCount} Watching</p>
        </div>

        <div className="w-fit flex items-center gap-2">
          <Timer size={20} />
          <p className="text-xs md:text-sm">{countdown > 0 ? formatTime(countdown) : "Tour ended"}</p>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="w-full h-[50vh] md:h-[87vh] flex items-center justify-center bg-no-repeat bg-center bg-cover relative overflow-hidden  "
        style={{ backgroundImage: "url('/live/Live-bg.png')" }}
      >
        <div className="w-full h-full absolute inset-0 bg-black/40 z-20" />

        <div className="z-40  w-full h-full flex items-center justify-center p-5">
          <video
            src={mock_tour_data.videoUrl}
            autoPlay
            controls
            loop={false}
            playsInline
            className="w-full max-w-5xl h-full object-cover object-center"
          />
        </div>

        {/* Chat Section for desktop view */}
        <section className="w-full max-w-sm h-fit hidden md:flex flex-col items-start gap-3 bg-blue-950 py-4 z-50  ">
          <h2 className="ml-10 text-base lg:text-lg">Story Pot</h2>
          <hr className="w-full border-[0.5px] border-gray-600 my-2" />

          <div className="w-full lg:w-[80%] h-[400px] flex flex-col items-start justify-start gap-7 border border-gray-500 py-5 px-4 border-l-2 border-l-yellow-500 rounded-lg mx-auto overflow-y-auto">
            {/* <div className="w-fit  flex items-center justify-start gap-4">
              <div className="h-8 w-8 rounded-full flex-shrink-0 bg-gray-400 border border-purple-950 flex items-center justify-center overflow-hidden">
                <Image
                  src={"/profile/profile-placeholder.png"}
                  alt={userData?.fullName ? `${userData.fullName}'s profile image` : "User profile image"}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col flex-1 items-start gap-1 w-full">
                <div className="flex items-center gap-4">
                  <h4 className="text-xs md:text-sm">{mock_tour_data.hostName}</h4>
                  <span className="text-sm md:text-base font-medium text-[#EB662B] ">Host</span>
                </div>
                <p className="text-white text-[10px] md:text-xs">The message the host sends on the call</p>
              </div>
            </div> */}

            {sentMessages?.map((data, index) => (
              <div key={index} className="w-fit  flex items-center justify-start gap-4">
                <div className="h-8 w-8 rounded-full flex-shrink-0 bg-gray-400 border border-purple-950 flex items-center justify-center overflow-hidden">
                  <Image
                    src={data.messangerPic ?? "/profile/profile-placeholder.png"}
                    alt={userData?.fullName ? `${userData.fullName}'s profile image` : "User profile image"}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col flex-1 items-start gap-1 w-full">
                  <div className="flex items-center gap-4">
                    <h4 className="text-xs md:text-sm">{data.messenger}</h4>
                  </div>
                  <p className="text-white text-[10px] md:text-xs">{data.message} </p>
                </div>
              </div>
            ))}
          </div>

          {/* Textarea */}
          <form
            onSubmit={sendMessage}
            className="w-[95%] lg:w-[80%] mx-auto bg-white/20 backdrop-blur-2xl py-2 px-4 rounded-xl border border-gray-500 mt-3 flex items-center gap-10"
          >
            <input
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your thoughts on this tour..."
              className="w-full h-full text-xs md:text-sm outline-none border-none"
            />

            <div className="w-fit flex gap-3 items-center">
              <button
                onClick={() => setShowEmojis((prev) => !prev)}
                type="button"
                className="h-8 w-8 bg-white text-[#EB662B] rounded-sm flex items-center justify-center p-2 cursor-pointer"
              >
                <Smile size={15} />
              </button>

              <button className="h-8 w-8 bg-white text-[#EB662B] rounded-sm flex items-center justify-center p-2 cursor-pointer">
                <SendHorizontal size={15} />
              </button>
            </div>
          </form>

          {/* Emoji Picker */}
          <div className="mx-auto w-[95%] lg:w-[80%] flex items-center gap-3 px-[4%] mt-5">
            <EmojiPicker
              width={"100%"}
              height={showEmojis ? 350 : 0}
              onEmojiClick={(emojiData) => setMessage((prev) => prev + emojiData.emoji)}
            />
          </div>
        </section>
      </section>

      {/* Stats Marquee */}
      <div className="pt-6 bg-[#05073C] w-full flex flex-col gap-3 items-center justify-center">
        <div className="w-full bg-black/40 backdrop-blur-xs py-2">
          <Marquee>
            {mock_tour_data.tags.map((text, index) => (
              <span key={index} className="block">
                <h3 className="font-lato text-sm md:text-base font-semibold text-[#ffffff] mx-10 flex items-center gap-2">
                  <Sparkle color="#FFD700" size={15} /> {text} <Sparkle color="#FFD700" size={15} />
                </h3>
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Chat Section for mobile  */}
      <section className="w-full h-full flex md:hidden flex-col items-start gap-3 bg-blue-950 py-4 z-50  ">
        <h2 className="ml-10 text-base lg:text-lg">Talking Drum</h2>
        <hr className="w-full border-[0.5px] border-gray-600 my-2" />

        <div className="w-full lg:w-[80%] h-[400px] flex flex-col items-start justify-start gap-7 border border-gray-500 py-5 px-4 border-l-2 border-l-yellow-500 rounded-lg mx-auto overflow-y-auto">
          <div className="w-fit  flex items-center justify-start gap-4">
            <div className="h-8 w-8 rounded-full flex-shrink-0 bg-gray-400 border border-purple-950 flex items-center justify-center overflow-hidden">
              <Image
                src={"/profile/profile-placeholder.png"}
                alt={userData?.fullName ? `${userData.fullName}'s profile image` : "User profile image"}
                width={500}
                height={500}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col flex-1 items-start gap-1 w-full">
              <div className="flex items-center gap-4">
                <h4 className="text-xs md:text-sm">{mock_tour_data.hostName}</h4>
                <span className="text-sm md:text-base font-medium text-[#EB662B] ">Host</span>
              </div>
              <p className="text-white text-[10px] md:text-xs">The message the host sends on the call</p>
            </div>
          </div>

          {sentMessages?.map((data, index) => (
            <div key={index} className="w-fit  flex items-center justify-start gap-4">
              <div className="h-8 w-8 rounded-full flex-shrink-0 bg-gray-400 border border-purple-950 flex items-center justify-center overflow-hidden">
                <Image
                  src={data.messangerPic ?? "/profile/profile-placeholder.png"}
                  alt={userData?.fullName ? `${userData.fullName}'s profile image` : "User profile image"}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col flex-1 items-start gap-1 w-full">
                <div className="flex items-center gap-4">
                  <h4 className="text-xs md:text-sm">{data.messenger}</h4>
                </div>
                <p className="text-white text-[10px] md:text-xs">{data.message} </p>
              </div>
            </div>
          ))}
        </div>

        {/* Textarea */}
        <form
          onSubmit={sendMessage}
          className="w-[95%] lg:w-[80%] mx-auto bg-white/20 backdrop-blur-2xl py-2 px-4 rounded-xl border border-gray-500 mt-3 flex items-center gap-10"
        >
          <input
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your thoughts on this tour..."
            className="w-full h-full text-xs md:text-sm outline-none border-none"
          />

          <div className="w-fit flex gap-3 items-center">
            <button
              onClick={() => setShowEmojis((prev) => !prev)}
              type="button"
              className="h-8 w-8 bg-white text-[#EB662B] rounded-sm flex items-center justify-center p-2 cursor-pointer"
            >
              <Smile size={15} />
            </button>

            <button className="h-8 w-8 bg-white text-[#EB662B] rounded-sm flex items-center justify-center p-2 cursor-pointer">
              <SendHorizontal size={15} />
            </button>
          </div>
        </form>

        {/* Emoji Picker */}
        <div className="mx-auto w-[95%] lg:w-[80%] flex items-center gap-3 px-[4%] mt-5">
          <EmojiPicker
            width={"100%"}
            height={showEmojis ? 350 : 0}
            onEmojiClick={(emojiData) => setMessage((prev) => prev + emojiData.emoji)}
          />
        </div>
      </section>
    </div>
  )
}

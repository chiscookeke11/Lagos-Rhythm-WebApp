"use client"

import React, { useEffect, useRef, useState } from "react"
import Button from "./common/Button"
import HTMLFlipBook from "react-pageflip"
import Image from "next/image"

// Define proper types for the component props
interface PageCoverProps {
  children?: React.ReactNode
}

// Define types for flip book events
interface FlipEvent {
  data: number
}

interface OrientationEvent {
  data: string
}

interface StateEvent {
  data: string
}

// Define the page data structure
interface PageData {
  image: string
  text: string
}

const PageCover = React.forwardRef<HTMLDivElement, PageCoverProps>((props, ref) => {
  return (
    <div
      className="page page-cover relative w-full max-w-md mx-auto aspect-[3/4] flex flex-col shadow-2xl overflow-hidden border-4 border-gray-800"
      style={{
        backgroundColor: "#05073C",
      }}
      ref={ref}
      data-density="hard"
    >
      <div className="absolute inset-0 bg-[#05073C]/80 flex items-center justify-center flex-col gap-1">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #EB662B 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #EB662B 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 text-center">
          <h1 className="space-y-2 mb-6 font-merriweather ">
            <div className="text-2xl font-light text-white tracking-wide">INTERESTING</div>
            <div className="text-4xl font-black text-[#EB662B] tracking-tight">THINGS</div>
            <div className="text-2xl font-light text-white tracking-wide">TO DO IN</div>
            <div className="text-5xl font-black text-white tracking-tight">LAGOS</div>
          </h1>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#EB662B] to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 p-6 text-center font-lato ">
          <div className="text-white/90 text-base font-semibold mb-1">LAGOS RHYTHM EXPLORER</div>
          <div className="text-[#EB662B] text-xs tracking-widest">TRAVEL SERIES</div>
        </div>

        <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-[#EB662B]"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-[#EB662B]"></div>
      </div>
    </div>
  )
})

PageCover.displayName = "PageCover"

export default function PopularThings() {
  // Use proper type for the ref - HTMLFlipBook doesn't export its type, so we use React.ElementRef
  const flipBookRef = useRef<React.ElementRef<typeof HTMLFlipBook>>(null)
  const [, setCurrentPage] = useState(0)

  useEffect(() => {
    if (flipBookRef.current && flipBookRef.current.pageFlip) {
      const pageFlip = flipBookRef.current.pageFlip()
      if (pageFlip) {

        pageFlip.getPageCount()
      }
    }
  }, [])



  const onFlip = (e: FlipEvent) => {
    setCurrentPage(e.data)
  }

  const onChangeOrientation = (e: OrientationEvent) => {
    // Handle orientation change if needed
    console.log("Orientation changed:", e.data)
  }

  const onChangeState = (e: StateEvent) => {
    // Handle state change if needed
    console.log("State changed:", e.data)
  }

  const pagesData: PageData[] = [
    {
      image: "/interestigThingsImg/historic site .jpg",
      text: "Historic Site Walk",
    },
    {
      image: "/interestigThingsImg/Beach market stroll.jpg",
      text: "Beach Market Stroll",
    },
    {
      image: "/interestigThingsImg/bridge walk.jpg",
      text: "Sunset Bridge Walk",
    },
    {
      image: "/interestigThingsImg/canopy walk.jpg",
      text: "Canopy Walk",
    },
    {
      image: "/interestigThingsImg/water taxi.jpg",
      text: "Water Taxi Ride",
    },
    {
      image: "/interestigThingsImg/railway museum.jpg",
      text: "Railway Museum Visit",
    },
  ]



  return (
    <section className="w-full bg-[#FDF4F1] py-14 md:py-[5%] px-[5%] flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 ">
      <div className="w-full max-w-[440px] flex flex-col items-start gap-3 md:gap-5">
        <h2 className="font-bold text-[#05073C] text-2xl md:text-3xl  font-playfair ">Interesting things to do</h2>
        <p className="text-lg font-normal text-[#05073C] font-lato ">
          Lagos is more than a city - it&apos;s a living experience.
        </p>
        <Button ariaLabel="See All" label="See All" type="button" variant="primary" className="w-full !bg-[#EF8F57] text-white !py-4 shadow-xl " />
      </div>

      <div className="w-full max-w-2xl h-full gap-4 py-2">
        <HTMLFlipBook
          width={300}
          height={400}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="image-slider"
          startPage={0}
          style={{ overflow: "hidden" }}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          onFlip={onFlip}
          onChangeOrientation={onChangeOrientation}
          onChangeState={onChangeState}
          ref={flipBookRef}
        >
          {/* Front page cover */}
          <PageCover />

          {/* Book content */}
          {pagesData.map((pageData, index) => (
            <div key={index} className="page bg-white relative shadow-xl">
              <div className="absolute top-0 left-0 h-full w-full flex flex-col gap-7 items-center justify-center p-3 pl-4">
                <div className="h-4/6 w-full relative">
                  <Image
                    src={pageData.image || "/placeholder.svg"}
                    alt={`${pageData.text} Image`}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="text-base  text-[#05073C] font-playfair font-medium">{pageData.text}</h3>
              </div>
            </div>
          ))}

          {/* Back cover page */}
          <div className="page bg-[#05073C] relative">
            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-xs text-gray-300 font-merriweather">
              Thanks for exploring Lagos with us!
            </div>
            <div className="absolute top-[2px] left-[2px] w-16 h-16 border-l-4 border-t-4 border-[#EB662B]"></div>
            <div className="absolute bottom-[2px] right-[2px] w-16 h-16 border-r-4 border-b-4 border-[#EB662B]"></div>
          </div>
        </HTMLFlipBook>
      </div>
    </section>
  )
}

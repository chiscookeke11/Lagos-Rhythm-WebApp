
"use client";
import Button from "./common/Button";


interface HeroSectionProps{
    setVideoLoaded: (videoLoaded: boolean) => void
}

export default function HeroSection({ setVideoLoaded }: HeroSectionProps) {
  return (
    <section className="w-full h-screen relative">
      <video
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute top-0 left-0 h-full w-full object-cover z-0"
        autoPlay
        loop
        muted
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="w-full h-full absolute bg-black/50 z-10 flex items-center justify-center px-4 py-3">
        <div className="max-w-sm md:max-w-5xl w-full h-full flex items-center justify-center flex-col gap-4 lg:gap-5 text-center">
          <h1 className="font-semibold text-white text-4xl lg:text-[70px] lg:leading-[100%] font-playfair">
            Experience Lagos in its natural form
          </h1>
          <p className="font-normal text-base text-white font-lato">
            Live the vibe, please the mind!
          </p>
          <Button type="button" label="Join the waitlist" />
        </div>
      </div>
    </section>
  );
}

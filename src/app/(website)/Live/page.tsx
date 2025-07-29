"use client"


import AnimatedBg from '@/components/ui/AnimatedBg';
// components/YouTubeEmbed.jsx
import React from 'react';
import YouTube from 'react-youtube';

const YouTubeEmbed = () => {
  const options = {
    height: '360',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#05073C] relative ">

        <div className='z-10 absolute top-0 left-0 w-full h-full flex items-center justify-center p-5 ' >
<YouTube videoId="m16bxaeFsk8" opts={options}   />
        </div>

      <AnimatedBg/>
    </div>
  );
};

export default YouTubeEmbed;

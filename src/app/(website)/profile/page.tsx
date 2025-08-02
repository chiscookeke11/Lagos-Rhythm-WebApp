"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import md5 from "md5";

export default function Page() {
  const { user } = useUser();

  function getGravatarUrl(email: string) {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
  }

  const email = user?.primaryEmailAddress?.emailAddress;
  const gravatarUrl = email ? getGravatarUrl(email) : "/about/image.jpg";

  return (
    <div className="bg-[#FDF4F1]">
      <div className="bg-[#05073C] w-full h-[90vh] rounded-b-[64px] flex items-center justify-center py-4 px-7 flex-col gap-7">
        <div className="z-10 h-[250px] w-[253px] lg:h-[330px] lg:w-[333px] transform relative before:absolute before:right-[-10px] before:top-[-10px] before:border-r-4 before:border-t-4 before:border-[#EF8F57] before:h-full before:w-full after:absolute after:h-full after:w-full after:top-[10px] after:left-[-10px] after:bottom-[-10px] after:border-l-4 after:border-b-4 after:border-l-[#EF8F57] after:border-b-[#EF8F57]">
          <Image
            src={gravatarUrl}
            alt="User profile image"
            width={500}
            height={500}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="space-y-1 text-center">
          <h1 className="font-merriweather font-semibold text-2xl">
            Okeke Chinedu Emmanuel
          </h1>
          <h1 className="font-lato font-semibold text-lg">
            {email || "No email"}
          </h1>
        </div>
      </div>

      <div className="h-[50vh]">hrfdfjdkfjdkfj</div>
    </div>
  );
}

"use client";

import { fireDB } from "@/app/config/firebaseClient";
import { useAppContext } from "@/app/context/AppContext";
import Button from "@/components/common/Button";
import { CustomSelect } from "@/components/common/CustomSelect";
import Input from "@/components/common/Input";
import Loader from "@/components/common/Loader";
import { countryOptions } from "@/data/countryList";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";


export default function Page() {


  const { userData, setUserData, email } = useAppContext()
  const [loading, setLoading] = useState(false)






  // handle select change function
  const handleSelectChange = (name: string, value: string) => {
    const updated = { ...userData, [name]: value };
    setUserData(updated);
  };



  // handle input change function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...userData, [name]: value };
    setUserData(updated);
  };




  // form submit function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!userData?.fullName || !userData?.country) {
      toast.error("Please fill in required fields before submitting")
      return;
    }

    setLoading(true)

    try {


      if (!email) {
        console.log("No email available")
        return
      }
      await setDoc(doc(fireDB, "user_profile", email), {
        fullName: userData.fullName,
        country: userData.country,
        createdAt: new Date()
      })

      setUserData({
        fullName: "",
        country: ""
      })
      toast.success("Profile created successfully")
    }
    catch (error) {
      console.error("Failed to upload blog", error)
    }
    finally {
      setLoading(false)
    }
  }


  console.log("I just ran", userData)









  return (
    <div className="bg-[#FDF4F1]">
      <div className="bg-[#05073C] w-full h-[90vh] rounded-b-[32px] flex items-center justify-center py-4 px-7 flex-col gap-7">
        <div className="z-10 h-[250px] w-[253px] lg:h-[330px] lg:w-[333px] transform relative before:absolute before:right-[-10px] before:top-[-10px] before:border-r-4 before:border-t-4 before:border-[#EF8F57] before:h-full before:w-full after:absolute after:h-full after:w-full after:top-[10px] after:left-[-10px] after:bottom-[-10px] after:border-l-4 after:border-b-4 after:border-l-[#EF8F57] after:border-b-[#EF8F57]">
          <Image
            src={"https://res.cloudinary.com/dwedz2laa/image/upload/v1754328144/ogciojxtba5rqodgghpx.jpg"}
            alt="User profile image"
            width={500}
            height={500}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="space-y-1 text-center">
          <h1 className="font-merriweather font-semibold text-2xl">{userData?.fullName ?? "" }</h1>
          <h1 className="font-lato font-semibold text-lg">
            {email || "No email"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="h-[50vh]  mx-auto w-full max-w-3xl flex flex-col gap-6 items-start  justify-center text-[#05073C]  ">

        <Input
          value={userData?.fullName ?? ""}
          type="string"
          label="Full name"
          name="fullName"
          placeholder="John Ade"
          isRequired
          onChange={handleChange}
        />

        <CustomSelect
          name="country"
          onChange={handleSelectChange}
          options={countryOptions}
          label="Country"
          placeholder="Please select an option"
          isRequired
          value={userData?.country ?? ""}
        />




        <Button
          ariaLabel="Submit"
          label={loading ? (<Loader />) : "Submit"}
          disabled={loading}
          type="submit"
          variant="primary"
          className=" ml-auto !bg-[#EF8F57] " />

      </form>
    </div>
  );
}

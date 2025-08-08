"use client";

import { fireDB } from "@/app/config/firebaseClient";
import { useAppContext } from "@/app/context/AppContext";
import Button from "@/components/common/Button";
import { CustomSelect } from "@/components/common/CustomSelect";
import Input from "@/components/common/Input";
import Loader from "@/components/common/Loader";
import { countryOptions } from "@/data/countryList";
import { uploadImageToCloudinary } from "@/lib/utils";
import { ProfileDataType } from "@/Types/ProfileDataType";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";


export default function Page() {


  const { userData, setUserData, email } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)







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

    if (!email) {
      console.log("No email available")
      toast.error("Please sign up ")
      return
    }

    setLoading(true)

    if (file) {
      try {
        // uploading image to cloudinary first
        const imageUrl = await uploadImageToCloudinary(file, "profile_images")

        // then submitting the profile data to firebase
        await setDoc(doc(fireDB, "user_profile", email), {
          fullName: userData.fullName,
          country: userData.country,
          createdAt: new Date(),
          imageUrl: imageUrl
        })


        // fetching the updated profile data from firebase
        const docSnap = await getDoc(doc(fireDB, "user_profile", email))

        // settting the userdata in the context to the updated data
        if (docSnap.exists()) {
          const updatedProfileData = docSnap.data() as ProfileDataType;
          setUserData(updatedProfileData)
        }


        setFile(null)
        toast.success("Profile updated successfully")
      }
      catch (error) {
        console.log("Failed to update profile", error)
      }
      finally {
        setLoading(false)
      }
    }


  }














  return (
    <div className="bg-[#FDF4F1]">
      <div className="bg-[#05073C] w-full h-[90vh] rounded-b-[32px] flex items-center justify-center py-4 px-7 flex-col gap-7">
        <div className="z-10 h-[250px] w-[253px] lg:h-[330px] lg:w-[333px] transform relative before:absolute before:right-[-10px] before:top-[-10px] before:border-r-4 before:border-t-4 before:border-[#EF8F57] before:h-full before:w-full after:absolute after:h-full after:w-full after:top-[10px] after:left-[-10px] after:bottom-[-10px] after:border-l-4 after:border-b-4 after:border-l-[#EF8F57] after:border-b-[#EF8F57]">
          <Image
            src={userData?.imageUrl ?? "/profile/profile-placeholder.png"}
            alt="User profile image"
            width={500}
            height={500}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="space-y-1 text-center">
          <h1 className="font-merriweather font-semibold text-2xl">{userData?.fullName ?? ""}</h1>
          <h1 className="font-lato font-semibold text-lg">
            {email || "No email"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="  mx-auto w-full max-w-3xl flex flex-col gap-6 items-start  justify-center text-[#05073C] py-[4%]  ">






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

        <label htmlFor="image" className="w-full flex flex-col gap-1">
          <span className="text-lg font-semibold text-[#EF8F57]">Profile Image</span>
          <input
            type="file"
            placeholder="blog Image"
            id="image"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0])
              }
            }}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#EF8F57] file:text-white hover:file:bg-[#EF8F57]/90 file:cursor-pointer"
          />
        </label>




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

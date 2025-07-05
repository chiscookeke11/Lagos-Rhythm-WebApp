"use client";

import React, { useState } from "react";
import Button from "./common/Button";
import toast from "react-hot-toast";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "@/app/config/firebaseClient";



export default function NewsLetter() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false)




  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isvalid = formData.name.trim().length > 0 && formData.email.trim().length > 0;


    if (!isvalid) {
      toast.error("Please fill in the required fields")
      console.log(isvalid)
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid Email address");
      return;
    }







    setIsSubmitting(true)
    try {

      const subscribersRef = collection(fireDB, "subscribers");
      const q = query(subscribersRef, where("email", "==", formData.email));
      const querySnapshot = await getDocs(q);


      if (!querySnapshot.empty) {
        toast.error("You are already subscribed with this email");
        setIsSubmitting(false);
        return;
      }


      await addDoc(collection(fireDB, "subscribers"), {
        name: formData.name,
        email: formData.email,
        subscribedAt: new Date(),
      });

      setFormData({ name: "", email: "" });

      toast.success("Subscribed successfully ");
      setIsSubmitting(false)
    } catch (error) {

      toast.error("Subscription failed ");
      setIsSubmitting(false)
    }
  };

  return (
    <section className="w-full bg-[url('/newsletter.svg')] bg-no-repeat bg-center bg-cover flex flex-col items-start justify-center py-[10%] md:py-[7%] px-[10%] font-lato">
      <div className="flex flex-col items-start gap-3 md:gap-5 max-w-[550px]">
        <h2 className="text-white font-bold text-xl md:text-3xl max-w-[450px]">
          Subscribe To Our Community And Stay Up To Date
        </h2>
        <h4 className="text-white font-normal text-sm">
          Get exclusive insights, latest news, and special offers delivered straight to your inbox. Join thousands of subscribers who stay ahead of the curve.
        </h4>

        <form onSubmit={onSubmit} className="w-full rounded-xl p-2 gap-4 flex flex-col">
          <input
            onChange={handleChange}
            name="name"
            id="name"
            value={formData.name}
            type="text"
            placeholder="Name"
            className="w-full bg-[#FFFFFF1A] border-0 outline-0 py-3 px-4 rounded-lg text-[#FFFFFF] text-sm md:text-base"
          />

          <input
            onChange={handleChange}
            name="email"
            id="email"
            value={formData.email}
            type="email"
            placeholder="Your email"
            className="w-full bg-[#FFFFFF1A] border-0 outline-0 py-3 px-4 rounded-lg text-[#FFFFFF] text-sm md:text-base"
          />

          <Button type="submit" label={isSubmitting ? (
            <>
              <span className="inline-flex space-x-1 ml-1">
                <span className="w-2 h-2 bg-[#EF8F57] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-[#EF8F57] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-[#EF8F57] rounded-full animate-bounce"></span>
              </span>

            </>
          ) :
            "Subscribe"} variant="primary" className="!text-[#EF8F57] !font-bold  " />
        </form>
      </div>
    </section>
  );
}

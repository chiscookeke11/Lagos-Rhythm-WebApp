"use client";

import React, { useState } from "react";
import Button from "./common/Button";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
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
    const toastId = toast.loading("Submitting...");
    setIsSubmitting(true)

    try {
      const docRef = await addDoc(collection(fireDB, "subscribers"), {
        name: formData.name,
        email: formData.email,
        subscribedAt: new Date(),
      });

      setFormData({ name: "", email: "" });
      toast.success("Subscribed successfully ", { id: toastId });
      console.log("Subscribed with ID:", docRef.id);
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error adding document", error);
      toast.error("Subscription failed ", { id: toastId });
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </h4>

        <form onSubmit={onSubmit} className="w-full rounded-xl p-2 gap-4 flex flex-col">
          <input
            onChange={handleChange}
            name="name"
            id="name"
            value={formData.name}
            type="text"
            placeholder="Name"
            className="w-full bg-[#FFFFFF1A] border-0 py-3 px-4 rounded-lg text-[#FFFFFF] text-sm md:text-base"
          />

          <input
            onChange={handleChange}
            name="email"
            id="email"
            value={formData.email}
            type="email"
            placeholder="Your email"
            className="w-full bg-[#FFFFFF1A] border-0 py-3 px-4 rounded-lg text-[#FFFFFF] text-sm md:text-base"
          />

          <Button type="submit" label={isSubmitting ? " ..." : "Subscribe"} variant="primary" className="!text-[#000000]" />
        </form>
      </div>
    </section>
  );
}

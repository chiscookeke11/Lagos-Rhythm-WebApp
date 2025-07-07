"use client";

import React, { useMemo, useState } from "react";
import Button from "./common/Button";
import toast from "react-hot-toast";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "@/app/config/firebaseClient";
import { motion } from "framer-motion";



export default function NewsLetter() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false)
  const Motionbutton = useMemo(() => motion(Button), [])




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
      console.log(error)
      toast.error("Subscription failed ");
      setIsSubmitting(false)
    }
  };

  return (
    <section className="w-full bg-[url('/newsletter.svg')] bg-no-repeat bg-center bg-cover flex flex-col items-start justify-center py-[10%] md:py-[7%] px-[5%] md:px-[10%] font-lato">
      <div className="flex flex-col items-start gap-3  max-w-[550px]">
        <h2 className="text-white font-bold text-xl md:text-3xl max-w-[450px]">
          Subscribe To Our Community
        </h2>
        <h4 className="text-white font-normal text-sm">
          Join our community and step into the rhythm - virtually and beyond.
        </h4>

        <form onSubmit={onSubmit} className="w-full max-w-md rounded-xl p-2 gap-4 flex flex-col overflow-hidden ">
          <motion.label
            initial={{ x: -300 }}
            whileInView={{ x: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100, damping: 10, }}
            viewport={{ once: true, amount: 0.1 }}
            htmlFor="name" className="text-base font-semibold text-[#ffffff] " >
            Name <span className="text-red-600 text-base font-medium" >*</span>
            <input
              onChange={handleChange}
              name="name"
              id="name"
              value={formData.name}
              type="text"
              placeholder="Mike"
              className="w-full bg-[#FFFFFF1A] border-0 outline-0 py-3 px-4 rounded-lg text-[#FFFFFF]/80 text-sm md:text-base"
            />
          </motion.label>

          <motion.label
            initial={{ x: -300 }}
            whileInView={{ x: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 10, }}
            viewport={{ once: true, amount: 0.1 }}
            htmlFor="email" className="text-base font-semibold text-[#ffffff] ">
            Email <span className="text-red-600 text-base font-medium" >*</span>
            <input
              onChange={handleChange}
              name="email"
              id="email"
              value={formData.email}
              type="text"
              placeholder="JohnDoe@gmail.com"
              className="w-full bg-[#FFFFFF1A] border-0 outline-0 py-3 px-4 rounded-lg text-[#FFFFFF]/80 text-sm md:text-base"
            />
          </motion.label>

          <Motionbutton
            initial={{ x: -300 }}
            whileInView={{ x: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 50, damping: 2, }}
            viewport={{ once: true, amount: 0.1 }}
            type="submit" label={isSubmitting ? (
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

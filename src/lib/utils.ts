import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import emailjs from 'emailjs-com';
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "@/app/config/firebaseClient";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}







export const sendConfirmationEmail = (data: {
  name: string;
  email: string;
  service: string;
  date: string;
  tour_link: string
}) => {
  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    {
      name: data.name,
      email: data.email,
      service: data.service,
      date: data.date,
      tour_link: data.tour_link,
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  );
};




export const newsletterConfirmationMail = (data: { name: string, email: string }) => {
  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID!,
    {
      name: data.name,
      email: data.email
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  )
}





export async function fetchFeedbackCount() {
  const feedbackRef = collection(fireDB, "Feedback");

  const snapshot = await getDocs(feedbackRef);

  return snapshot.size;
}


export async function fetchSubscribersCount () {
  const subscribersRef = collection(fireDB, "subscribers");

  const snapshot = await getDocs(subscribersRef)

  return snapshot.size
}


export async function fetchBlogsCount () {
  const blogsRef = collection(fireDB, "blogs");

  const snapshot = await getDocs(blogsRef)

  return snapshot.size
}


export async function fetchBookedFreeRhythmCount () {
  const freeRhythmCountRef = collection(fireDB, "booked_Free_Rhythm");

  const snapshot = await getDocs(freeRhythmCountRef)

  return snapshot.size
}


export async function fetchBookedExclusiveRhythmCount () {
  const exclusiveRhythmCountRef = collection(fireDB, "exclusive_Tour_form");

  const snapshot = await getDocs(exclusiveRhythmCountRef)

  return snapshot.size
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import emailjs from 'emailjs-com';
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { fireDB } from "@/app/config/firebaseClient";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}






// booking confirmation email
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



// newsletter confirmation email
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




// writing feedback data to firestore
export async function fetchFeedbackCount() {
  const feedbackRef = collection(fireDB, "Feedback");

  const snapshot = await getDocs(feedbackRef);

  return snapshot.size;
}


//  fetching the subscribers length
export async function fetchSubscribersCount() {
  const subscribersRef = collection(fireDB, "subscribers");

  const snapshot = await getDocs(subscribersRef)

  return snapshot.size
}



// fetching the blogs length
export async function fetchBlogsCount() {
  const blogsRef = collection(fireDB, "blogs");

  const snapshot = await getDocs(blogsRef)

  return snapshot.size
}



// fetching the length of customers that booked for the free E-Rhythm
export async function fetchBookedFreeRhythmCount() {
  const freeRhythmCountRef = collection(fireDB, "booked_Free_Rhythm");

  const snapshot = await getDocs(freeRhythmCountRef)

  return snapshot.size
}



// fetching the length of customers that booked for the exclusive rhythm
export async function fetchBookedExclusiveRhythmCount() {
  const exclusiveRhythmCountRef = collection(fireDB, "exclusive_Tour_form");

  const snapshot = await getDocs(exclusiveRhythmCountRef)

  return snapshot.size
}

// function to delete an item
export const deleteItem = async (id: string, collectionName: string) => {
  try {
    await deleteDoc(doc(fireDB, collectionName, id))
    console.log("Item deleted successfully")
  }
  catch (error) {
    console.error(error)
  }
}




// function to upload an image to cloudinary
export async function uploadImageToCloudinary(file: File, presetName: string) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", presetName)



  const response = await fetch("https://api.cloudinary.com/v1_1/dwedz2laa/image/upload", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Image upload failed")
  }

  const data = await response.json()
  return data.secure_url
}



// function to add user to the database on successful signup
export const addUserToDb = async (user: string) => {
  try {
    await setDoc(doc(fireDB, "user_profile", user), {
      fullName: "",
      country: "",
      createdAt: new Date()
    })
    console.log("USer document created in firestore")
  }
  catch (firestoreError) {
    console.error("Error writing to firestore:", firestoreError)
  }

}
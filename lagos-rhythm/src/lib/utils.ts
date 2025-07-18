import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import emailjs from 'emailjs-com';

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

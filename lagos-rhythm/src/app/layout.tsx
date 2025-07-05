import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Lato, Merienda, Merriweather, Playfair_Display, Signika } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})


const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})


const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})


const merriWeather = Merriweather({
  variable: '--font-merriweather',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const merienda = Merienda({
  variable: "--font-merienda",
  subsets: ["latin"],
  weight: ['400', '700']
})

const signika = Signika({
  variable: "--font-signika",
  weight: ['400', '700'],
  subsets: ['latin']
})


export const metadata: Metadata = {
  title: "Lagos Rhythm",
  description: "Tour guide in Lagos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${playfair.variable} ${lato.variable} ${merriWeather.variable} ${merienda.variable} ${signika.variable} antialiased`}
      >
        <Navbar />
        {children}
          <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

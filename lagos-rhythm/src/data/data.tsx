import { BestLocationDataType } from "@/Types/BestLocationDataType";
import { PopularThingsDataType } from "@/Types/PopularThingsDataType";
import { StatsDataType } from "@/Types/StatsDataType";
import { TestimonialDataType } from "@/Types/TestimonialDataTypes";
import { WhyLagos } from "@/Types/WhyLagosType";
import { Combine, CreditCard, Headset, Heart, IdCard, Landmark, MonitorPlay, Sailboat, Sunset, TrainTrack, Trees, Volleyball } from "lucide-react";





export const BestLocationData: BestLocationDataType[] = [
    {
        label: "Food & Flavors",
        image: "/BestLocationsImages/LagosFood.jpg",
    },
    {
        label: "Nightlife & Vibes",
        image: "/BestLocationsImages/LagosNightlife.jpg",
    },
    {
        label: "Art & Culture",
        image: "/BestLocationsImages/ArtsAndCulture.jpg",
    },
    {
        label: "Nature & Escapes",
        image: "/BestLocationsImages/NatureAndLandscape.jpg",
    },
]



export const PopularThingsData: PopularThingsDataType[] = [
    {
        image: <Trees />,
        title: "Canopy walk",
        desc: "100+ Tours"
    },
    {
        image: <Sailboat />,
        title: "Water taxi ride",
        desc: "300+ Tours"
    },
    {
        image: <TrainTrack />,
        title: "Railway museum visit",
        desc: "50+ Tours"
    },
    {
        image: <Landmark />,
        title: "Historic site walk",
        desc: "80+ Tours"
    },
    {
        image: <Volleyball />,
        title: "Beach market stroll",
        desc: "200+ Tours"
    },
    {
        image: <Sunset />,
        title: "Sunset bridge walk",
        desc: "100+ Tours"
    },
]




export const WhyLagosData: WhyLagos[] = [
    {
        title: "Free Virtual Tours",
        desc: "Experience Lagos in real time from anywhere in the world, no cost attached. Our free virtual tours open up the city’s culture, landmarks, and people - live.",
        icon: <MonitorPlay size={30} />
    },
    {
        title: "Themed Packages ",
        desc: "Looking for adventure, relaxation, or inspiration? Our affordable themed packages let you explore Lagos your way - from one theme to another. ",
        icon: <Combine size={30} />
    },
    {
        title: "Corporate & Group Services",
        desc: "We create tailored experiences for corporate team bonding, educational groups, cultural institutions, and digital communities - all rooted in the rich, dynamic vibe of Lagos.",
        icon: <IdCard size={30} />
    },
    {
        title: "Easy Global Payments",
        desc: "Book with ease using multiple currencies or crypto. Pay in NGN, USD, GBP, EUR or crypto (Bitcoin, USDT and more). Fast, secure, and global.",
        icon: <CreditCard size={30} />
    },
    {
        title: "Dedicated Customer Support",
        desc: "From planning to post-tour, our support team is ready to help - wherever you are, whenever you need it.",
        icon: <Headset size={30} />
    },
    {
        title: "Built for the Culture",
        desc: "We’re community-driven and proudly local, with a global vision. ",
        icon: <Heart size={30} />
    },


]


export const testimonialsData: TestimonialDataType[] = [
    {
        caption: "",
        content: "I had a great experience in Nigeria. I enjoyed the night life, especially the street food, I tasted nwkobi for the first time and I've loved it ever since. The traffic in Lagos was crazy but hey that's usual in most west Africa countries. My stay was short but hopefully I'm planning to visit again this October and this time with the anticipation to do more sightseeing.",
        name: "Henrietta Jomo ",
        job: "Sales Executive ",
        image: "/TestimonialsImages/HenriettaJomo.jpg",
        country: "Sierra Leone"
    },
    {
        caption: "",
        content: "My experience with Lagosians has been absolutely remarkable. Through Lagos Rhythm's platform, I've gotten a fascinating glimpse into the vibrant culture and energy of this incredible city. I'm genuinely looking forward to visiting Lagos and experiencing the authentic rhythm of the city live.",
        name: "Conrad Pramboeck",
        job: "Managing Director",
        image: "/TestimonialsImages/conrad.jpg",
        country: "Austria"

    },
    {
        caption: "",
        content: "My first encounter with Lagosians was online, and I could already feel the energy. From the music to the street food, and from the chaotic traffic to the unexpected kindness in strangers, there’s something real and raw about Lagos that makes you want to experience it for yourself. I’m looking forward to soaking in the culture, walking the streets, and witnessing firsthand the fire that fuels Africa’s most iconic city.",
        name: "Jonathan Kamwana",
        job: "Entrepreneur ",
        image: "/TestimonialsImages/jonathan.HEIC",
        country: "Malawi"

    },
    {
        caption: "",
        content: "Visiting Lagos was like stepping into a pulse—the energy is magnetic, the creativity boundless, and the people? Truly the soul of the city. Lagosians are some of the most resilient, ambitious, and hospitable individuals I’ve ever met.  Lagos isn’t just a city—it’s a story still being written by the fearless and the bold. And I’m grateful to have witnessed a chapter.",
        name: "Laurel Grant",
        job: " Travel Advisor ",
        image: "/TestimonialsImages/grant.jpg",
        country: "Canada"

    },
]

export const statsData: StatsDataType[] = [
    {
        value: "4.9",
        content: "1000+ reviews on TripAdvisor. Certificate of Excellence",
    },
    {
        value: "16M",
        content: "Happy Customers",
    },
    {
        value: "Award winner",
        content: "G2’s 2021 Best Software Awards",
    },
]
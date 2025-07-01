import { BestLocationDataType } from "@/Types/BestLocationDataType";
import { PopularThingsDataType } from "@/Types/PopularThingsDataType";
import { StatsDataType } from "@/Types/StatsDataType";
import { WhyLagos } from "@/Types/WhyLagosType";
import {  Combine, CreditCard, Headset, Heart, IdCard, Landmark, MonitorPlay, Sailboat, Sunset, TrainTrack, Trees, Volleyball } from "lucide-react";





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
        icon: <CreditCard size={30}/>
    },
    {
        title: "Dedicated Customer Support",
        desc: "From planning to post-tour, our support team is ready to help - wherever you are, whenever you need it.",
        icon: <Headset size={30}/>
    },
    {
        title: "Built for the Culture",
        desc: "We’re community-driven and proudly local, with a global vision. ",
        icon: <Heart size={30}/>
    },


]


export const testimonialsData = [
    {
        caption: "Good tour",
        content: "djhfdjf",
        name: "fdffd",
        job: "dfdffd",
        image: "",
    },
    {
        caption: "greta ",
        content: "fdfdfdf",
        name: "fdfdf",
        job: "fdfdf",
        image: "",
    },
    {
        caption: "hohoho",
        content: "fdfdfd",
        name: "fdfdf",
        job: "fdggg",
        image: "",
    },
    {
        caption: "hohoho",
        content: "dffdf",
        name: "gfdffg",
        job: "gfgfgfg",
        image: "",
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
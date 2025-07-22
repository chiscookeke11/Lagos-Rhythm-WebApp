import { BestLocationDataType } from "@/Types/BestLocationDataType";
import { PopularThingsDataType } from "@/Types/PopularThingsDataType";
import { customSelectTypes } from "@/Types/CustomSelectTypes";
import { TestimonialDataType } from "@/Types/TestimonialDataTypes";
import { WhyLagos } from "@/Types/WhyLagosType";
import { Combine, CreditCard, Headset, Heart, IdCard, Landmark, MonitorPlay, Sailboat, Sunset, TrainTrack, Trees, Volleyball } from "lucide-react";
import Lottie from "lottie-react";
import live from "../app/animated-icons/live.json";
import interaction from "../app/animated-icons/interaction.json";
import destinations from "../app/animated-icons/destinations.json";
import Traveler from "../app/animated-icons/Traveler.json";
import lagos from "../app/animated-icons/lagos.json";
import african from "../app/animated-icons/african.json";
import students from "../app/animated-icons/students.json";




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
        icon: <MonitorPlay size={40} />
    },
    {
        title: "Themed Packages ",
        desc: "Looking for adventure, relaxation, or inspiration? Our affordable themed packages let you explore Lagos your way - from one theme to another. ",
        icon: <Combine size={40} />
    },
    {
        title: "Corporate & Group Services",
        desc: "We create tailored experiences for corporate team bonding, educational groups, cultural institutions, and digital communities - all rooted in the rich, dynamic vibe of Lagos.",
        icon: <IdCard size={40} />
    },
    {
        title: "Easy Global Payments",
        desc: "Book with ease using multiple currencies or crypto. Pay in NGN, USD, GBP, EUR or crypto (Bitcoin, USDT and more). Fast, secure, and global.",
        icon: <CreditCard size={40} />
    },
    {
        title: "Dedicated Customer Support",
        desc: "From planning to post-tour, our support team is ready to help - wherever you are, whenever you need it.",
        icon: <Headset size={40} />
    },
    {
        title: "Built for the Culture",
        desc: "We’re community-driven and proudly local, with a global vision. ",
        icon: <Heart size={40} />
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
        content: "Visiting Lagos was like stepping into a pulse - the energy is magnetic, the creativity boundless, and the people? Truly the soul of the city. Lagosians are some of the most resilient, ambitious, and hospitable individuals I’ve ever met.  Lagos isn’t just a city—it’s a story still being written by the fearless and the bold. And I’m grateful to have witnessed a chapter.",
        name: "Laurel Grant",
        job: " Travel Advisor ",
        image: "/TestimonialsImages/grant.jpg",
        country: "Canada"

    },

]

export const joinAsData: customSelectTypes[] = [
    {
        label: "Student",
        value: "Student",
    },
    {
        label: "Professional",
        value: "Professional",
    },
    {
        label: "Traveler",
        value: "Traveler",
    },
    {
        label: "Other",
        value: "Other",
    },
]

export const reasonForJoinOptions: customSelectTypes[] = [
    {
        label: "I’m reconnecting with African heritage or roots",
        value: "I’m reconnecting with African heritage or roots",
    },
    {
        label: "I’m exploring Nigerian or African culture for the first time",
        value: "I’m exploring Nigerian or African culture for the first time",
    },
    {
        label: "I’m preparing for travel to Lagos",
        value: "I’m preparing for travel to Lagos",
    },
    {
        label: "I’m participating as part of a school or academic program",
        value: "I’m participating as part of a school or academic program",
    },
    {
        label: "I’m joining as part of a DEI or cultural learning initiative",
        value: "I’m joining as part of a DEI or cultural learning initiative",
    },
    {
        label: "I’m joining for professional or research reasons",
        value: "I’m joining for professional or research reasons",
    },
    {
        label: "I’m curious about Lagos",
        value: "I’m curious about Lagos",
    },
    {
        label: "I just love cultural experiences and storytelling",
        value: "I just love cultural experiences and storytelling",
    },
    {
        label: "Others (Specify)",
        value: "others",
    },

]



export const referralSourceData: customSelectTypes[] = [
    {
        label: "Instagram",
        value: "Instagram"
    },
    {
        label: "WhatsApp",
        value: "WhatsApp"
    },
    {
        label: "Friend / Word of Mouth",
        value: "Friend / Word of Mouth"
    },
    {
        label: "Email",
        value: "Email"
    },
    {
        label: "School or Organization",
        value: "School or Organization"
    },
    {
        label: "Other",
        value: "Other"
    },
]


export const whatToExpectData = [
    {
        text: "30-minute livestreams ",
        icon: <Lottie animationData={live} loop={true} className="w-20 h-20" />,
    },
    {
        text: "Interactive sessions with local hosts ",
        icon: <Lottie animationData={interaction} loop={true} className="w-20 h-20" />,
    },
    {
        text: "Different destinations and stories every month ",
        icon: <Lottie animationData={destinations} loop={true} className="w-20 h-20" />,
    },
]


export const whoCanJoinData = [
    {
        text: "Curious travelers",
        icon: <Lottie animationData={Traveler} loop={true} className="w-20 h-20" />,
    },
    {
        text: "Students and educators",
        icon: <Lottie animationData={students} loop={true} className="w-20 h-20" />,
    },
    {
        text: "African diaspora reconnecting with culture",
        icon: <Lottie animationData={african} loop={true} className="w-20 h-20" />,
    },
    {
        text: "Anyone who wants to see Lagos through real eyes",
        icon: <Lottie animationData={lagos} loop={true} className="w-20 h-20" />,
    },
]



export const bookFormImages = [
    {
        label: "image one",
        img: "/booking-form/image-1.jpg"
    },
    {
        label: "image three",
        img: "/booking-form/image-2.jpg"
    },
    {
        label: "image two",
        img: "/booking-form/image-3.jpg"
    },
]


export const themesData = [
    {
        title: "Art",
        description: "Where expression becomes memory. Discover how Lagos art makes statements, starts conversations, and preserves truth.",
        path: ""
    },
    {
        title: "Culture",
        description: "The heartbeat of a people. Experience how values, language, food, and faith shape identity and belonging in Lagos.",
        path: ""
    },
    {
        title: "History",
        description: "Not just dates—decisions. Trace the moments that built a city known for resistance, reinvention, and pride.",
        path: ""
    },
    {
        title: "Entertainment",
        description: "Where energy becomes influence. Step into the world of music, film, and creativity that powers a continent.",
        path: ""
    },
    {
        title: "Vibe",
        description: "Because the soul of a city lives in its people. Join real-time hangouts with Lagosians sharing their world, unfiltered.",
        path: ""
    },
    {
        title: "Custom Tour",
        description: "Every audience is different. We’ll build something that speaks directly to yours - no template required",
        path: ""
    },
]


export const whatYouGetData = [
    {
        label: "30–60 min private HD livestream",
        image: "/"
    },
    {
        label: "Real-time local guide",
        image: "/"
    },
    {
        label: "Option to co-brand for your organization",
        image: "/"
    },
    {
        label: "Post-tour Q&A",
        image: "/"
    },
]


export const crewAmountData = [
    {
        label: "3 people",
        value: "3_persoms"
    },
    {
        label: "3 people",
        value: "3_persoms"
    },
    {
        label: "3 people",
        value: "3_persoms"
    },
    {
        label: "3 people",
        value: "3_persoms"
    },
]
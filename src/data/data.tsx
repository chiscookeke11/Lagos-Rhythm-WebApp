import { BestLocationDataType } from "@/Types/BestLocationDataType";
import { PopularThingsDataType } from "@/Types/PopularThingsDataType";
import { customSelectTypes } from "@/Types/CustomSelectTypes";
import { TestimonialDataType } from "@/Types/TestimonialDataTypes";
import { WhyLagos } from "@/Types/WhyLagosType";
import { Combine, CreditCard, Headset, Heart, IdCard, Images, Landmark, MonitorPlay, Newspaper, PenSquare, Sailboat, Sparkles, Sunset, TicketPercent, TrainTrack, Trees, UsersRound, Volleyball } from "lucide-react";
import Lottie from "lottie-react";
import live from "../app/animated-icons/live.json";
import interaction from "../app/animated-icons/interaction.json";
import destinations from "../app/animated-icons/destinations.json";
import Traveler from "../app/animated-icons/Traveler.json";
import lagos from "../app/animated-icons/lagos.json";
import african from "../app/animated-icons/african.json";
import students from "../app/animated-icons/students.json";
import { CrewAmountItem } from "@/Types/UserDataType";
import { PageData } from "@/Types/pageDataType";
import { FaBlog } from "react-icons/fa";







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



export const pagesData: PageData[] = [
    {
        image: "/interestigThingsImg/historic site .jpg",
        text: "Historic Site Walk",
    },
    {
        image: "/interestigThingsImg/Beach market stroll.jpg",
        text: "Beach Market Stroll",
    },
    {
        image: "/interestigThingsImg/bridge walk.jpg",
        text: "Sunset Bridge Walk",
    },
    {
        image: "/interestigThingsImg/canopy walk.jpg",
        text: "Canopy Walk",
    },
    {
        image: "/interestigThingsImg/water taxi.jpg",
        text: "Water Taxi Ride",
    },
    {
        image: "/interestigThingsImg/railway museum.jpg",
        text: "Railway Museum Visit",
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
        icon: <Lottie animationData={live} loop={true} className="w-28 h-28" />,
    },
    {
        text: "Interactive sessions with local hosts ",
        icon: <Lottie animationData={interaction} loop={true} className="w-28 h-28" />,
    },
    {
        text: "Different destinations and stories every month ",
        icon: <Lottie animationData={destinations} loop={true} className="w-28 h-28" />,
    },
]


export const whoCanJoinData = [
    {
        text: "Curious travelers",
        icon: <Lottie animationData={Traveler} loop={true} className="w-28 h-28" />,
    },
    {
        text: "Students and educators",
        icon: <Lottie animationData={students} loop={true} className="w-28 h-28" />,
    },
    {
        text: "African diaspora reconnecting with culture",
        icon: <Lottie animationData={african} loop={true} className="w-28 h-28" />,
    },
    {
        text: "Anyone who wants to see Lagos through real eyes",
        icon: <Lottie animationData={lagos} loop={true} className="w-28 h-28" />,
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
        path: "",
        image: "/exclusive_Rhythm/art-image.jpg"
    },
    {
        title: "Culture",
        description: "The heartbeat of a people. Experience how values, language, food, and faith shape identity and belonging in Lagos.",
        path: "",
        image: "/exclusive_Rhythm/culture-image.jpg"
    },
    {
        title: "History",
        description: "Not just dates—decisions. Trace the moments that built a city known for resistance, reinvention, and pride.",
        path: "",
        image: "/exclusive_Rhythm/history-image.jpg"
    },
    {
        title: "Entertainment",
        description: "Where energy becomes influence. Step into the world of music, film, and creativity that powers a continent.",
        path: "",
        image: "/exclusive_Rhythm/entertainment-image.jpg"
    },
    {
        title: "Vibe",
        description: "Because the soul of a city lives in its people. Join real-time hangouts with Lagosians sharing their world, unfiltered.",
        path: "",
        image: "/exclusive_Rhythm/vibes-image.jpg"
    },
    {
        title: "Custom Tour",
        description: "Every audience is different. We’ll build something that speaks directly to yours - no template required",
        path: "",
        image: "/exclusive_Rhythm/custom-image.jpg"
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


export const crewAmountData: CrewAmountItem[] = [
    {
        label: "1-3 (circle)",
        value: "circle",
        perTourFee: (country: string) => {
            if (country === "Nigeria") return 50000;
            else return 150
        },
        monthlySub: (country: string) => {
            if (country === "Nigeria") return 160000 ;
            else return 500
        },
        maxAmount: 3
    },
    {
        label: "4-10 (crew)",
        value: "crew",
        perTourFee: (country: string) => {
            if (country === "Nigeria") return 100000;
            else return 60
        },
        monthlySub: (country: string) => {
            if (country === "Nigeria") return 320000 ;
            else return 200
        },
        maxAmount: 10
    },
    {
        label: "11+ (community)",
        value: "community",
        perTourFee: (country: string) => {
            if (country === "Nigeria") return 150000;
            else return 300
        },
        monthlySub: (country: string) => {
            if (country === "Nigeria") return 500000;
            else return 1000
        },
        maxAmount: 100
    },
]


export const faq = [
    {
        question: "Is Lagos Rhythm a travel agency?",
        answer: "No. We are a tourism-tech platform focused on cultural experiences, combining virtual tours, in-person tours, and other travel services. ",
    },
    {
        question: "Do you serve locals and Africans only?",
        answer: "No. Lagos Rhythm serves everyone; locals, Africans, the diaspora, and international visitors. Our experiences are designed for anyone interested in exploring the culture, history, and lifestyle of Lagos.",
    },
    {
        question: " Do I need to create an account to use your services?",
        answer: "No, you can book tours or flights directly. ",
    },
    {
        question: "Are virtual tours live or pre-recorded?",
        answer: "Our virtual tours are live, with real-time interactions.",
    },
    {
        question: "Are your tours kid-friendly?",
        answer: "Yes, many of our tours are family-friendly. We also offer custom tours for school groups.",
    },
    {
        question: "Do you offer multilingual tours?",
        answer: "Our standard tours are in English, but we can arrange custom language support upon request.",
    },
    {
        question: "What should I bring for an in-person tour?",
        answer: "Bring light, breathable clothing, comfortable shoes, a hat, and sunscreen. Our team will provide a detailed packing list tailored to your specific tour ",
    },
    {
        question: "Which destinations do your flights cover?",
        answer: "We cover major routes between Nigeria and key cities in Africa, Europe, North America, the Middle East and Asia. Return trips are also available.",
    },
    {
        question: "Do you help with visa processing?",
        answer: "We don’t handle visa applications directly, but we assist our clients who require a visa to visit Lagos for our tours.",
    },
    {
        question: "When will local flights be available?",
        answer: "We plan to offer domestic Nigerian flights soon – updates will be posted on our site.",
    },
    {
        question: "What products do you sell?",
        answer: "We offer Lagos-inspired merchandise, cultural artifacts, handmade crafts, and souvenirs.",
    },
    {
        question: "Do you deliver internationally?",
        answer: "Yes, we ship to most countries. Delivery costs vary depending on your location.",
    },
    {
        question: "How do I book a tour or flight?",
        answer: "Booking is done directly on our website. Once payment is confirmed, you’ll receive a confirmation email.",
    },
    {
        question: "Can I cancel or reschedule my booking?",
        answer: "Yes, cancellations and reschedules are allowed up to 48 hours before your tour or flight.",
    },
    {
        question: "Do you offer corporate packages or team-building tours?",
        answer: "Yes, we have custom cultural and virtual experiences for corporate teams.",
    },
    {
        question: "Can schools or cultural organizations partner with you?",
        answer: "Absolutely. We welcome collaborations, cultural training sessions, and educational tours.",
    },
    {
        question: "Do I need special apps for virtual tours?",
        answer: "No. Any smartphone, tablet, or computer with internet access works.",
    }
]



export const sideNavLinks = [
    {
        label: "Blogs",
        route: "/dashboard/blog-control",
        icons: <FaBlog size={18} />,
    },
    {
        label: "Feedbacks",
        route: "/Feedbacks",
        icons: <PenSquare size={18} />,
    },
    {
        label: "Exclusive Tour Bookings",
        route: "/dashboard/exclusive-bookings",
        icons: <Sparkles size={18} />,
    },
    {
        label: "Free Tour Bookings",
        route: "",
        icons: <TicketPercent size={18} />,
    },
    {
        label: "Gallery",
        route: "/dashboard/gallery-control",
        icons: <Images size={18} />,
    },

    {
        label: "Newsletters",
        route: "",
        icons: <Newspaper size={18} />,
    },

    {
        label: "Users",
        route: "",
        icons: <UsersRound size={18} />,
    },

]


export const timeOptions = [
  { label: "3:00pm WAT", value: "15:00" },
  { label: "4:00pm WAT", value: "16:00" },
  { label: "5:00pm WAT", value: "17:00" },
]
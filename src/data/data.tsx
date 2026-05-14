import { BestLocationDataType } from "@/Types/BestLocationDataType";
import { PopularThingsDataType } from "@/Types/PopularThingsDataType";
import { customSelectTypes } from "@/Types/CustomSelectTypes";
import { TestimonialDataType } from "@/Types/TestimonialDataTypes";
import { WhyLagos } from "@/Types/WhyLagosType";
import { Combine, CreditCard, Headset, Heart, IdCard, Images, Landmark, MonitorPlay, Newspaper, PenSquare, Radio, Sailboat, Sparkles, Sunset, TicketPercent, TrainTrack, Trees, UsersRound, Volleyball, Beaker } from "lucide-react";
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
import { ThemeDataType } from "@/Types/ThemeDataType";
import { ThemeJourneyType } from "@/Types/ThemeJourneyType";
import { KnowledgeCard } from "@/Types/KnowledgeCardType";
import { Feature } from "@/Types/FeatureTypes";







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


export const themesData: ThemeDataType[] = [
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
            else return 60
        },
        monthlySub: (country: string) => {
            if (country === "Nigeria") return 160000;
            else return 200
        },
        maxAmount: 3
    },
    {
        label: "4-10 (crew)",
        value: "crew",
        perTourFee: (country: string) => {
            if (country === "Nigeria") return 100000;
            else return 150
        },
        monthlySub: (country: string) => {
            if (country === "Nigeria") return 320000;
            else return 500
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


export const customTourPrices: CrewAmountItem[] = [
    {
        label: "1 Person",
        value: "Individual",
        perTourFee: (country: string) => {
            if (country === "Nigeria") return 5000;
            else return 10
        },
        monthlySub: (country: string) => {
            if (country === "Nigeria") return 16000;
            else return 2000
        },
        maxAmount: 1
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
        label: "Street Rhythm Routes",
        route: "/dashboard/street-rhythm-routes",
        icons: <MonitorPlay size={18} />,
    },
    {
        label: "Test Lab",
        route: "/dashboard/test-lab",
        icons: <Beaker size={18} />,
    },
    {
        label: "Blogs",
        route: "/dashboard/blog-control",
        icons: <FaBlog size={18} />,
    },
    {
        label: "Feedbacks",
        route: "/dashboard/Feedbacks",
        icons: <PenSquare size={18} />,
    },
    {
        label: "Exclusive Tour Bookings",
        route: "/dashboard/Exclusive-tour-booking",
        icons: <Sparkles size={18} />,
    },
    {
        label: "Free Tour Bookings",
        route: "/dashboard/free-tour-book",
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
    {
        label: "Create Live stream",
        route: "/dashboard/Live-Stream-settings",
        icons: <Radio />,
    },

]


export const timeOptions = [
    { label: "8:00 AM WAT", value: "08:00" },
    { label: "8:30 AM WAT", value: "08:30" },
    { label: "9:00 AM WAT", value: "09:00" },
    { label: "9:30 AM WAT", value: "09:30" },
    { label: "10:00 AM WAT", value: "10:00" },
    { label: "10:30 AM WAT", value: "10:30" },
    { label: "11:00 AM WAT", value: "11:00" },
    { label: "11:30 AM WAT", value: "11:30" },
    { label: "12:00 PM WAT", value: "12:00" },
    { label: "12:30 PM WAT", value: "12:30" },
    { label: "1:00 PM WAT", value: "13:00" },
    { label: "1:30 PM WAT", value: "13:30" },
    { label: "2:00 PM WAT", value: "14:00" },
    { label: "2:30 PM WAT", value: "14:30" },
    { label: "3:00 PM WAT", value: "15:00" },
    { label: "3:30 PM WAT", value: "15:30" },
    { label: "4:00 PM WAT", value: "16:00" },
    { label: "4:30 PM WAT", value: "16:30" },
    { label: "5:00 PM WAT", value: "17:00" },
    { label: "5:30 PM WAT", value: "17:30" },
    { label: "6:00 PM WAT", value: "18:00" },
];


export const metadataKeywords = [
    // General Keywords
    "Lagos",
    "Lagos Rhythm",
    "Tour",
    "Virtual",
    "Culture",
    "Nightlife",
    "Food",
    "Art",
    "Nature",
    "Vibe",
    "Travel",
    "Blog",
    "Community",
    "Experience",
    "Escape",
    "Tour Packages",
    "Flavors",
    "Tourism",
    "Lagos Tourism",
    "Nigeria",
    "Nigerian Tourism",
    "Tourism technology",
    "Crypto payment tours",
    "Community-driven travel",
    "Travel support Lagos",
    "Global easy payments",
    "Built for the culture, proudly local, globally relevant.",
    "Explore Lagos’s food, culture, and nightlife.",
    "Discover Lagos’s art, food, nightlife, nature, and escapes.",
    "Live the vibe, please the mind.",
    "Easy global payments in NGN, USD, EUR, GBP, or crypto.",
    "Tailored group and corporate cultural experiences.",
    "Free virtual tours of Lagos culture and landmarks.",
    "Affordable themed packages for local and foreign travelers.",
    "Experience Lagos in its natural form.",
    "Join our community and step into Lagos’s rhythm.",

    // Homepage SEO
    "Lagos virtual tour",
    "Nigerian culture online",
    "Lagos tourism startup",
    "Explore Lagos online",
    "African virtual experiences",
    "Best virtual tour of Lagos",
    "Interactive African tours",
    "Cultural tourism Nigeria",
    "Lagos city tour live",
    "Lagos Rhythm online",

    // About Page SEO
    "About Lagos Rhythm",
    "Tourism tech startup Africa",
    "Lagos tourism innovation",
    "Virtual tourism company Nigeria",
    "African culture experience",
    "Meet Lagos Rhythm team",
    "How Lagos Rhythm works",
    "Virtual travel startup Africa",

    // Free E-Rhythm Page SEO
    "Free virtual tour Lagos",
    "Free African culture experience",
    "Virtual Lagos city walk",
    "Lagos Rhythm free experience",
    "Free online tourism Nigeria",
    "Virtual African heritage",
    "Virtual education tour Lagos",
    "Lagos online cultural tour",

    // Exclusive Page SEO
    "Exclusive Lagos virtual tour",
    "Premium African experience",
    "Private virtual tour Lagos",
    "Immersive Lagos city tour",
    "Paid virtual tourism Nigeria",
    "Corporate cultural experience Africa",
    "Exclusive Lagos Rhythm experience",

    // In-person Page SEO
    "In-person Lagos tour",
    "Visit Lagos Nigeria",
    "Guided Lagos city tour",
    "Lagos tourism package",
    "Heritage tour Lagos",
    "Best places to visit in Lagos",
    "Lagos travel experience",
    "Book Lagos tour online",

    // Flights Page SEO
    "Cheap flights from Lagos",
    "Book flight Nigeria",
    "Lagos travel booking",
    "Affordable flights from Africa",
    "Lagos Rhythm flights",
    "Nigeria ticket booking online",
    "African travel deals",
    "Flight booking Lagos Nigeria",
    "Book international flights from Africa",
    "Cheap flights to Lagos Nigeria",
    "Affordable flights from Lagos to London",
    "Best African flight booking site",
    "International flight deals from Nigeria",
    "Flights from Ghana to Europe",
    "Cheap flights from Kenya to Dubai",
    "Africa to UK flights online booking",
    "Lagos to Paris flights",
    "Book return tickets Africa to USA",
    "Book flights online Africa",
    "International flight booking portal",
    "Flights from West Africa to Europe",
    "Cheap flights Africa to Canada",
    "Compare international airfares online",
    "Book multi-city flights from Africa",
    "Lagos Rhythm flight booking",
    "African travel agency for flights",
    "Book flights via Duffel API",
    "Global flight deals from Africa",
    "Flights from Accra to Lagos",
    "Nairobi to London flights",
    "Johannesburg to Lagos flight deals",
    "Flights from Abuja to Toronto",
    "Dakar to Paris flights",
    "Flights from Lagos to Amsterdam",
    "Cheap flights from Africa to Asia",
    "Book Dubai to Lagos flights",

    // Store SEO
    "Lagos Rhythm store",
    "African travel merch",
    "Nigerian culture souvenirs",
    "Buy Lagos themed items",
    "African travel accessories",
    "Lagos Rhythm products",
    "Virtual tour gift cards",
    "Lagos cultural gifts",

    // Blog SEO
    "Lagos tourism blog",
    "African travel stories",
    "Nigerian culture articles",
    "Lagos Rhythm blog",
    "Virtual travel insights Africa",
    "Explore Lagos online blog",
    "African tourism innovation",
    "Culture and travel in Lagos"
];



export const inpersonExperience = [
    {
        title: "Personal Journeykeeper",
        description: "Assigned before arrival, your dedicated guide ensures comfort, coordination, and a seamless experience from start to finish.",
        image: "/in-person/journeykeeper.jpg"
    },
    {
        title: "Themed Journeys",
        description: "Each tour tells a living story of culture, history, and the people who make Lagos unforgettable.",
        image: "/in-person/themed-journeys.jpg"
    },
    {
        title: "Maximum Living",
        description: "From arrival to departure, we curate moments of taste, music, and connection that bring Lagos to life.",
        image: "/in-person/maximum-living.jpg"
    },
    {
        title: "Tour Safety and Wellbeing Cover",
        description: "Your safety and health are fully supported with secure logistics, medical access, and on-tour coordination.",
        image: "/in-person/tour-and-safety.jpg"
    },
    {
        title: "Rhythm Flex",
        description: "Short or long stay, solo or group, flexible options let you experience Lagos at your own pace.",
        image: "/in-person/rhythm-flex.jpg"
    }
];




export const themeJourneys: ThemeJourneyType[] = [
    {
        title: "Another Day, Another Lagos",
        description:
            "Every sunrise reveals a new side of the city, from calm to thrill, from laughter to awe.",
        minorPackages: [
            {
                id: 1,
                title: "Single",
                options: [
                    { duration: "3 Days", price: 800 },
                    { duration: "5 Days", price: 1200 },
                ],
            },
            {
                id: 2,
                title: "Double",
                options: [
                    { duration: "3 Days", price: 1000 },
                    { duration: "5 Days", price: 1500 },
                ],
            },
        ],
    },

    {
        title: "Love or Lost?",
        description:
            "Romance, reflection, or rediscovery, Lagos brings emotion to life in the most unexpected ways.",
        minorPackages: [
            {
                id: 1,
                title: "Single",
                options: [
                    { duration: "3 Days", price: 800 },
                    { duration: "5 Days", price: 1200 },
                ],
            },
            {
                id: 2,
                title: "Double",
                options: [
                    { duration: "3 Days", price: 1000 },
                    { duration: "5 Days", price: 1500 },
                ],
            },
        ],
    },

    {
        title: "Joy is Free",
        description:
            "When Lagos celebrates, it never holds back. This is pure energy, laughter, and life without limits.",
        minorPackages: [
            {
                id: 1,
                title: "Single",
                options: [
                    { duration: "3 Days", price: 800 },
                    { duration: "5 Days", price: 1200 },
                ],
            },
            {
                id: 2,
                title: "Double",
                options: [
                    { duration: "3 Days", price: 1000 },
                    { duration: "5 Days", price: 1500 },
                ],
            },
        ],
    },

    {
        title: "Lagos After Dark",
        description:
            "When the sun sets, the rhythm rises. Dive into the city’s nightlife, sounds, and stories that last till dawn.",
        minorPackages: [
            {
                id: 1,
                title: "Single",
                options: [
                    { duration: "3 Days", price: 800 },
                    { duration: "5 Days", price: 1200 },
                ],
            },
            {
                id: 2,
                title: "Double",
                options: [
                    { duration: "3 Days", price: 1000 },
                    { duration: "5 Days", price: 1500 },
                ],
            },
        ],
    },

    {
        title: "The Lagos Dream",
        description:
            "Ambition meets culture in the city that never stops dreaming. See why the world keeps watching.",
        minorPackages: [
            {
                id: 1,
                title: "Single",
                options: [
                    { duration: "3 Days", price: 800 },
                    { duration: "5 Days", price: 1200 },
                ],
            },
            {
                id: 2,
                title: "Double",
                options: [
                    { duration: "3 Days", price: 1000 },
                    { duration: "5 Days", price: 1500 },
                ],
            },
        ],
    },

    {
        title: "Work & Vibe",
        description:
            "Work by day, vibe by night. Lagos is where productivity meets inspiration, flavor, and fun.",
        majorPackages: [
            {
                id: 1,
                title: "Single",
                options: [
                    { duration: "2 Weeks", price: 3000 },
                    { duration: "1 Month", price: 5000 },
                ],
            },
            {
                id: 2,
                title: "Double",
                options: [
                    { duration: "2 Weeks", price: 4000 },
                    { duration: "1 Month", price: 6000 },
                ],
            },
        ],
    },

    {
        title: "Custom tour",
        description:
            "Create your own story. Pick your pace, passions, and path, and let Lagos unfold your rhythm",
    },
];




export const themePrices = [
    {
        id: 1,
        title: "Single",
        options: [
            { duration: "3 days", price: "$800" },
            { duration: "5 days", price: "$1200" },
        ],
    },
    {
        id: 2,
        title: " Double",
        options: [
            { duration: "3 days", price: "$1000" },
            { duration: "5 days", price: "$1500" },
        ],
    },
];





export const whatBringsYouToTourOptions = [
    {
        label: "Leisure",
        value: "Leisure",
    },

    {
        label: "Research",
        value: "Research",
    },
    {
        label: "Team bonding",
        value: "Team bonding",
    },
    {
        label: "Content creation",
        value: "Content creation",
    },
    {
        label: "Cultural exploration",
        value: "Cultural exploration",
    },
    {
        label: " Education",
        value: " Education",
    },
    {
        label: "Other",
        value: "Other",
    },

]



export const IamJoiningAsData = [
    {
        label: "Solo Traveler",
        value: "Solo Traveler",
    },
    {
        label: "Couple",
        value: "Couple",
    },
    {
        label: "Family",
        value: "Family",
    },
    {
        label: "Group",
        value: "Group",
    },
    {
        label: "Corporate Team",
        value: "Corporate Team",
    },
    {
        label: "School Tour",
        value: "School Tour",
    },

]




export const preferredFoodOptions = [
    {
        label: "Nigerian Cuisine",
        value: "Nigerian Cuisine"
    },
    {
        label: "Continental",
        value: "Continental"
    },
    {
        label: "Vegetarian",
        value: "Vegetarian"
    },
    {
        label: "Vegan",
        value: "Vegan"
    },
    {
        label: "No Preference",
        value: "No Preference"
    },
    {
        label: "Other (please specify)",
        value: "Other (please specify)"
    },
]



export const howDidYouHear = [
    {
        label: "Instagram",
        value: "Instagram"
    },
    {
        label: "TikTok",
        value: "TikTok"
    },
    {
        label: "Friend/Referral",
        value: "Friend/Referral"
    },
    {
        label: "Press Feature",
        value: "Press Feature"
    },
    {
        label: "Event",
        value: "Event"
    },
    {
        label: "Other",
        value: "Other"
    }
]


export const knowledgeCards: KnowledgeCard[] = [
  {
    icon: '🚌',
    title: 'Danfo Basics',
    description: 'Master the fundamentals of Lagos public transport:',
    tips: [
      'Always ask the conductor for the fare before entering',
      'You may bargain ₦100 to ₦200 depending on traffic and time',
      'Conductors announce stops verbally as the bus moves',
      'Say "Owa" or call the bus stop name when you want to alight',
      'If unsure, tell the conductor you don\'t know the place',
    ],
  },
  {
    icon: '📍',
    title: 'Finding Your Stop',
    description: 'Never miss your destination:',
    tips: [
      'Look for bus stop names on most bus stop sheds',
      'Listen carefully to the conductor\'s announcements',
      'Use landmarks mentioned in your route video',
      'If you miss your stop, alight at the next one and take a return bus',
      'Speak confidently and clearly to conductors and drivers',
    ],
  },
  {
    icon: '💡',
    title: 'First-Timer Confidence',
    description: 'Stay calm and navigate like a pro:',
    tips: [
      'Do not panic if you miss your stop—it happens to everyone',
      'Confusion is normal for first-time users',
      'Asking questions at busy bus stops is perfectly acceptable',
      'Most routes have predictable correction paths',
      'Watch your route video multiple times before traveling',
    ],
  },
  {
    icon: '⏰',
    title: 'Traffic & Timing',
    description: 'Plan around Lagos traffic patterns:',
    tips: [
      'Traffic varies by morning, evening, and rush hour',
      'Fares rise during rush hour (7-9 AM, 5-8 PM)',
      'Road conditions can change quickly',
      'Allow extra time for your first journey on any route',
      'Check your route video for time-specific notes',
    ],
  },
  {
    icon: '🌙',
    title: 'Night Travel Safety',
    description: 'Stay safe when traveling after dark:',
    tips: [
      'Prefer crowded buses at night',
      'Stay at well-lit bus stops',
      'Avoid isolated corners or unfamiliar areas',
      'Seek help in public spaces if needed',
      'Travel with others when possible',
    ],
  },
  {
    icon: '💰',
    title: 'Fare Negotiation',
    description: 'Get fair prices for your journey:',
    tips: [
      'Ask other passengers what they paid if unsure',
      'Rush hour fares are typically 30-50% higher',
      'Have small change ready (₦50, ₦100, ₦200 notes)',
      'Stand firm but polite during negotiation',
      'Route-specific fares are shown in your search results',
    ],
  },
]



export const steps = [
  {
    number: 1,
    title: 'Search Your Route',
    description: 'Enter your starting point and destination. We\'ll find all available routes.',
  },
  {
    number: 2,
    title: 'Watch the Journey',
    description: 'See real commuter videos showing every step—bus stops, landmarks, and transfer points.',
  },
  {
    number: 3,
    title: 'Get Route Details',
    description: 'View fares, safety info, bus calls, and first-timer tips specific to your route.',
  },
  {
    number: 4,
    title: 'Travel Confidently',
    description: 'Navigate like a local with offline access to your route video and all essential information.',
  },
]



export const features: Feature[] = [
  {
    icon: '🎥',
    title: 'Video-First Navigation',
    description: 'See your journey before you take it. Real footage from actual commuters shows exactly how to move from point A to point B.',
  },
  {
    icon: '🗺️',
    title: 'Informal Route Coverage',
    description: 'We document the routes Google Maps doesn\'t know—the danfo lines, bus calls, and local shortcuts that keep Lagos moving.',
  },
  {
    icon: '👥',
    title: 'Crowdsourced Intelligence',
    description: 'Built by the community, for the community. Every video is contributed, validated, and updated by real Lagosians.',
  },
  {
    icon: '📱',
    title: 'Works Offline',
    description: 'Download your route videos and access them anytime—no data required. Perfect for low-bandwidth areas.',
  },
  {
    icon: '🧭',
    title: 'Cultural Context',
    description: 'More than directions—we preserve the oral knowledge of Lagos transport: conductor calls, local landmarks, and unwritten rules.',
  },
  {
    icon: '🛡️',
    title: 'Safety-First Design',
    description: 'Every route includes safety ratings, night travel guidelines, and real-time community feedback on current conditions.',
  },
]
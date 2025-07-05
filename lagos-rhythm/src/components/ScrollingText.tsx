import { Sparkle } from "lucide-react";
import Marquee from "react-fast-marquee";




const lagosFacts = [
    " Did you know? Lagos was once the capital of Nigeria—and it's still the heartbeat of the nation.",
    " Did you know? Over 20 million people call Lagos home, making it one of the fastest-growing cities in the world.",
    "Did you know? Lagos means “lakes” in Portuguese—named by explorers in the 15th century.",
    "Did you know? Nollywood—the world’s second-largest film industry by output—was born on the streets of Lagos.",
    "Did you know? Lagos has more millionaires than any other city in West Africa.",
    " Did you know? Lagos is the epicenter of Afrobeats, where street sounds, studios, and nightlife fuel a global music movement.",
    " Did you know? Lagos is home to Eyo Festival, a cultural parade said to have inspired Brazil’s famous Carnival.",
    "Did you know? Lagos never truly sleeps—markets, street food, and music pulse through the city day and night.",
    "Did you know? Balogun and Idumota markets in Lagos are among West Africa’s busiest trading hubs.",
    "Did you know? Lagos is home to Nike Art Gallery, one of the largest contemporary art spaces in West Africa."
]

export default function ScrollingText() {
    return (
        <div className="w-full bg-white/10 backdrop-blur-xs absolute bottom-0 py-2" >
            <Marquee >
{
    lagosFacts.map((text, index) => (
       <span key={index} className=" block ">
      <h3 className="font-lato text-xl font-semibold text-[#ffffff] mx-10 flex items-center gap-2 "><Sparkle color="#FFD700" size={15}/>  {text}  <Sparkle color="#FFD700" size={15}/></h3>
    </span>

    ))
}
  </Marquee>
        </div>
    )
}
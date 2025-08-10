import BlogSection from "@/components/BlogsSection";
import NewsLetter from "@/components/NewsLetter";
import ReusableHero from "@/components/ReusableHero";



export default function Page() {
    return (
        <div className="w-full h-full "  >
            <ReusableHero pageTitle="Blog" subtitle="Interesting facts and concepts" image="/blogs/blog-hero.jpg" />


            <div className="w-full flex flex-col gap-8 items-start justify-center bg-[#FDF4F1] py-[4%] px-[4%] " >
                <h1 className="text-[#05073C] font-bold text-2xl md:text-3xl font-playfair " >Articles by <span className="text-[#EF8F57] ">Lagos Rhythm</span></h1>
                <BlogSection />
            </div>
            <NewsLetter />
        </div>
    )
}
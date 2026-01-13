import AuthModal from "@/components/AuthModal";




export default function Page() {
    return (
        <div className="w-full  min-h-screen flex items-center justify-center py-48 px-[4%] bg-no-repeat bg-center bg-cover bg-gray-500  " style={{backgroundImage: "url('/in-person/inperson-form-bg.jpg')"}} >
            <AuthModal  />

        </div>
    )
}
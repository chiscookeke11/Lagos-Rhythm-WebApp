import { X } from "lucide-react"
import React, { SetStateAction } from "react"





interface UpdateBlogModalProps {
setShowEditBlogModal: React.Dispatch<SetStateAction<boolean>>
}



export default function UpdateBlogModal({setShowEditBlogModal}: UpdateBlogModalProps) {





    const handleSubmit = () => {
        console.log("submiuted")

    }


    return (
        <div className="fixed h-screen w-full flex items-center justify-center top-0 left-0 bg-black/55 backdrop-blur-sm p-4 z-50">



            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl flex items-start justify-center flex-col gap-4 h-fit py-8 px-6 bg-[#FDF4F1] shadow-md rounded-md max-h-[90vh] overflow-y-auto"
            >
                <button onClick={() => setShowEditBlogModal(false)} className="text-red-600 ml-auto cursor-pointer " ><X size={32} /></button>
                <h2 className="mx-auto text-center font-merienda font-extrabold text-[#EF8F57] text-xl md:text-3xl">
                    Add blog details
                </h2>



            </form>


        </div>
    )
}
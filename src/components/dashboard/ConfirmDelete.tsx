import { SetStateAction } from "react";
import Button from "../common/Button";
import { deleteItem } from "@/lib/utils";
import toast from "react-hot-toast";




interface ConfirmDeleteProps {
    setConfirmDeleteModal?: React.Dispatch<SetStateAction<boolean>>
    onDelete?: (id: string) => void;
    selectedIndex: string
}




export default function ConfirmDelete({ setConfirmDeleteModal, onDelete, selectedIndex }: ConfirmDeleteProps) {


    const handleDelete = async (id: string) => {
        const toastId = toast.loading("Deleting ")



        try {
            await deleteItem(id, "blogs")
            toast.dismiss(toastId)
            toast.success("Blog deleted successfully")
            setConfirmDeleteModal?.(false)
            onDelete?.(id)
        }
        catch (err) {
            console.error(err)
            toast.dismiss(toastId)
            toast.error("Failed to delete. please try again")
        }
    }



    return (
        <div className="fixed h-screen w-full flex items-center justify-center top-0 left-0 bg-black/55 backdrop-blur-sm p-4 z-50">


            <div className="w-full max-w-md flex items-center justify-center flex-col gap-10 h-fit py-8 px-6 bg-[#FDF4F1] shadow-md rounded-md max-h-[90vh] overflow-y-auto" >

                <h1 className="mx-auto text-center font-merienda font-extrabold text-[#EF8F57] text-xl md:text-3xl">Are you sure you want to delete this blog ?</h1>

                <div className="w-fit flex items-center gap-6" >
                    <Button onClick={() => setConfirmDeleteModal?.(false)} label="No" ariaLabel="No" type="button" variant="primary" className=" !bg-[#ffffff] !text-[#EF8F57]  " />
                    <Button onClick={() => handleDelete(selectedIndex)} label="Yes" ariaLabel="Yes" type="button" variant="primary" className=" !bg-[#EF8F57] " />

                </div>

            </div>

        </div>
    )
}
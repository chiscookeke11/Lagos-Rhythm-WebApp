



interface LoaderProps {
    color?: string
}


export default function Loader({ color }: LoaderProps) {
    return (
        <>
            <span className="inline-flex space-x-1 ml-1">
                <span className={`w-2 h-2  rounded-full animate-bounce [animation-delay:-0.3s] ${color ? "bg-[#EF8F57]" : "bg-[#ffffff]"} `} ></span>
                <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:-0.15s] ${color ? "bg-[#EF8F57]" : "bg-[#ffffff]"} `} ></span>
                <span className={`w-2 h-2  rounded-full animate-bounce ${color ? "bg-[#EF8F57]" : "bg-[#ffffff]"} `} ></span>
            </span>
        </>
    )
}
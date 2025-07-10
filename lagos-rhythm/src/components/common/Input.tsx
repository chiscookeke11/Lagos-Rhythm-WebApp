


interface InputProps {
    type: string;
    placeholder?: string;
    label?: string;
    isRequired: boolean
}


export default function Input({type, placeholder, label, isRequired}: InputProps) {
    return (
        <label htmlFor={label} className="w-full flex flex-col items-start gap-1 " >
            <span className="text-[#000000] font-medium text-base font-lato flex items-start gap-1" > {label}
                {isRequired && (
                    <div className=" text-red-600" >*</div>
                )}
                 </span>
            <input type={type} placeholder={placeholder} className="w-full outline-0 border-0 bg-[#ffffff] rounded-lg px-5 py-3 " />
        </label>
    )
}
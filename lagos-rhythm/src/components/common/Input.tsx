


interface InputProps {
    type: string;
    placeholder?: string;
    label?: string;
    isRequired: boolean
    value: string
    name: string
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    error?: string
}


export default function Input({ type, placeholder, label, isRequired, value, name, onChange, error }: InputProps) {
    return (
        <label htmlFor={label} className="w-full flex flex-col items-start gap-1 " >
            <span className="text-[#000000] font-medium text-base font-lato flex items-start gap-1" > {label}
                {isRequired && (
                    <div className=" text-red-600" >*</div>
                )}
            </span>
            <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} className="w-full outline-0 border-0 bg-[#ffffff] rounded-lg px-5 py-3 " />
            {error && <p className="text-red-500 text-xs md:text-sm ml-auto ">{error}</p>}
        </label>
    )
}
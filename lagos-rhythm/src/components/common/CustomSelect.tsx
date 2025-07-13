import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { customSelectTypes } from "@/Types/CustomSelectTypes"



interface CustomSelectProps {
    label: string,
    isRequired: boolean
    options: customSelectTypes[]
    placeholder?: string
    name: string
  onChange: (name: string, value: string) => void;
}

export function CustomSelect({ label, isRequired, options, placeholder, onChange, name }: CustomSelectProps) {
    return (
        <div className="w-full flex  flex-col items-start gap-1  " >
            <span className="text-[#000000] font-medium text-base font-lato flex items-start gap-1" > {label}
                {isRequired && (
                    <div className=" text-red-600" >*</div>
                )}
            </span>
            <Select onValueChange={(value) => onChange(name, value)}  >
                <SelectTrigger className="w-full border-0 shadow-none bg-white focus:shadow-none cursor-pointer  py-6  ">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="cursor-pointer">
                    <SelectGroup>
                        <SelectLabel>{ }</SelectLabel>
                        {options.map((option, index) => (
                            <SelectItem key={index} value={option.value} className="cursor-pointer" >{option.label}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"


interface CustomCheckBoxProps {
    label: string;
    id: string;
    checked?: boolean
    onCheckedChange: (checked: boolean) => void
    error?: string
}

export function CustomCheckBox({ label, id, checked, onCheckedChange, error }: CustomCheckBoxProps) {
    return (
        <div className="flex flex-col gap-1">

            <div className="flex items-start gap-3">
                <Checkbox
                    name={id}
                    checked={checked}
                    id={id}
                    onCheckedChange={onCheckedChange}
                    className="border-[#EF8F57] data-[state=checked]:bg-[#EF8F57] data-[state=checked]:border-[#EF8F57] text-white cursor-pointer" />
                <div className="grid gap-2">
                    <Label htmlFor={id} className="cursor-pointer text-sm md:text-base text-[#000000] " > {label} </Label>
                </div>
            </div>
            {error && <p className="text-red-500 text-xs md:text-sm  ">{error}</p>}
        </div>
    )
}

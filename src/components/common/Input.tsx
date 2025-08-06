import * as React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  label?: string
  isRequired?: boolean
  error?: string
}

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { type = "text", placeholder, label, isRequired, error, ...props },
  ref,
) {
  return (
    <label className="w-full flex flex-col items-start gap-1">
      <span className="text-[#000000] font-medium text-base font-lato flex items-start gap-1">
        {label}
        {isRequired && <div className="text-red-600">*</div>}
      </span>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className="w-full outline-0 border-0 bg-[#ffffff] rounded-lg px-5 py-3"
        {...props}
      />
      {error && <p className="text-red-500 text-xs md:text-sm ml-auto">{error}</p>}
    </label>
  )
})

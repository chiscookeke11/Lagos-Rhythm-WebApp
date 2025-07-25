"use client"

import { Controller, useFieldArray, useForm } from "react-hook-form"
import { Minus, PlusIcon } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import "react-datepicker/dist/react-datepicker.css";
import { CustomCheckBox } from "@/components/common/CustomCheckbox"
import { CustomSelect } from "@/components/common/CustomSelect"
import Input from "@/components/common/Input"
import Button from "@/components/common/Button"
import { countryOptions } from "@/data/countryList"
import { bookFormImages, joinAsData, reasonForJoinOptions, referralSourceData } from "@/data/data"
import { useAppContext } from "../context/AppContext"
import type { exclusiveBookingDataType } from "@/Types/UserDataType"
import DatePicker from "react-datepicker"

export default function Page() {
  const { participantsCount, setParticipantsCount, populationAmount, selectedTheme } = useAppContext()
  const maxParticipantCount = populationAmount
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<exclusiveBookingDataType>({
    defaultValues: {
      tourists: Array.from({ length: participantsCount }, () => ({ fullName: "", email: "" })),
      country: "",
      reasonForJoin: [],
      OtherReason: "",
      joiningAs: "",
      otherJoin: "",
      tourDate: [],
      communicationConsent: false,
      termsAgreement: false,
    },
  })

  const formData = watch()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tourists",
  })

  useEffect(() => {
    const currentFieldsLength = fields.length
    if (participantsCount > currentFieldsLength) {
      for (let i = currentFieldsLength; i < participantsCount; i++) {
        append({ fullName: "", email: "" })
      }
    } else if (participantsCount < currentFieldsLength) {
      // FIX: Changed append to remove when participantsCount decreases
      for (let i = currentFieldsLength; i > participantsCount; i--) {
        remove(i - 1)
      }
    }
  }, [participantsCount, append, remove, fields.length])

  const increaseParticipantsCount = () => {
    if (participantsCount >= maxParticipantCount) return
    setParticipantsCount((prev) => prev + 1)
  }

  const decreaseParticipantsCount = () => {
    if (participantsCount < 2) return
    setParticipantsCount((prev) => prev - 1)
  }

  // FIX: Changed onSubmit signature to only accept data
  const onSubmit = async (data: exclusiveBookingDataType) => {
    setLoading(true)
    console.log("Form Data:", data)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("Form submitted successfully!")
    setLoading(false)
    // Here you would typically send `data` to your backend
  }


  console.log(formData)

  return (
    <div className="w-full flex flex-col h-full text-[#05073C] relative">
      <div className="h-[300px] w-full relative">
        <div className="w-full h-full absolute top-0 left-0 bg-[url('/placeholder.svg?height=300&width=1200')] bg-no-repeat bg-center bg-cover" />
        <div className="w-full h-full absolute top-0 left-0 bg-black/30" />
      </div>
      <div className="w-full h-fit flex items-center justify-center bg-[#FDF4F1] z-10">
        <div className="flex items-center w-fit flex-col gap-5 lg:gap-10 pb-10 px-4 mt-[-7%]">
          <div className="w-full flex items-center justify-center gap-4 px-[3%]">
            {bookFormImages.slice(0, 3).map((data, index) => (
              <div
                key={index}
                title={data.label}
                className="bg-[#ffffff] rounded-[20px] flex items-center justify-center w-[100px] h-[100px] md:h-[200px] md:w-[200px] lg:w-[294px] lg:h-[263px] overflow-hidden p-2 md:p-3"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={data.img || "/placeholder.svg"}
                    title={data.label}
                    alt="image"
                    fill
                    className="rounded-[10px]"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col items-center gap-2 justify-center my-5 lg:my-5 text-center">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-merienda">BOOK YOUR PACKAGE</h1>
            <p className="font-medium text-base md:text-lg font-lato">Experience Something New Every Moment</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-5xl py-3.5 lg:py-7 px-1 md:px-5 rounded-[20px] flex flex-col items-center gap-7 font-lato"
          >
            <div className="w-full flex flex-col gap-1 items-start py-3 px-4">
              <h2 className="mr-auto text-[#EF8F57] font-semibold text-lg">Selected Theme: {selectedTheme}</h2>
              <h2 className="mr-auto text-[#EF8F57] font-semibold text-lg">Max: {populationAmount}</h2>
            </div>
            <div className="w-full flex flex-col items-start gap-7">
              {fields.map((field, index) => (
                <div key={field.id} className="w-full flex flex-col md:flex-row items-center gap-6 justify-between">
                  <Input
                    {...register(`tourists.${index}.fullName`, { required: "Full name is required" })}
                    type="text"
                    placeholder={`User ${index + 1}`}
                    label={`User ${index + 1} Full Name`}
                    error={errors.tourists?.[index]?.fullName?.message}
                  />
                  <Input
                    {...register(`tourists.${index}.email`, {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder={`User ${index + 1} Email`}
                    label={`User ${index + 1} Email`}
                    error={errors.tourists?.[index]?.email?.message}
                  />
                </div>
              ))}
              <div className="w-fit flex items-center justify-center gap-3 ml-auto">
                <button
                  onClick={decreaseParticipantsCount}
                  type="button"
                  className="cursor-pointer border-2 border-[#EF8F57] rounded-full h-8 w-8 flex items-center justify-center"
                >
                  <Minus size={20} color="#EF8F57" />
                </button>
                <button
                  onClick={increaseParticipantsCount}
                  type="button"
                  className="cursor-pointer border-2 border-[#EF8F57] rounded-full h-8 w-8 flex items-center justify-center"
                >
                  <PlusIcon size={20} color="#EF8F57" />
                </button>
              </div>
            </div>

            <Controller
              control={control}
              name="country"
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <CustomSelect
                  name={field.name}
                  onChange={field.onChange}
                  options={countryOptions}
                  label="Country"
                  placeholder="Please select an option"
                  isRequired
                  value={field.value}
                  error={errors.country?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="reasonForJoin"
              rules={{
                validate: (value) => (value && value.length > 0) || "Please select at least one reason",
              }}
              render={({ field }) => (
                <div className="w-full flex flex-col items-start gap-5">
                  <h1 className="text-[#000000] font-medium text-base font-lato flex items-start gap-1">
                    What brings you to this tour <div className="text-red-600">*</div>
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-stretch">
                    {reasonForJoinOptions.map((option, index) => (
                      <CustomCheckBox
                        key={index}
                        checked={field.value.includes(option.value)}
                        onCheckedChange={(checked) => {
                          let newReasons = checked
                            ? [...field.value, option.value]
                            : field.value.filter((item) => item !== option.value)

                          if (option.value === "others") {
                            if (checked) {
                              newReasons = ["others"]
                            } else {
                              newReasons = field.value.filter((item) => item !== "others")
                              setValue("OtherReason", "")
                            }
                          } else {
                            if (checked && field.value.includes("others")) {
                              newReasons = [...field.value.filter((item) => item !== "others"), option.value]
                            }
                          }
                          field.onChange(newReasons)
                        }}
                        label={option.label}
                        id={`reasonForJoin-${option.value}`}
                      />
                    ))}
                  </div>
                  {errors.reasonForJoin && (
                    <p className="text-red-500 text-xs md:text-sm ml-auto">{errors.reasonForJoin.message}</p>
                  )}
                </div>
              )}
            />

            {formData.reasonForJoin.includes("others") && (
              <Input
                {...register("OtherReason", { required: "Please specify your reason" })}
                type="text"
                label="Please specify type"
                error={errors.OtherReason?.message}
              />
            )}

            <Controller
              control={control}
              name="joiningAs"
              rules={{ required: "Please specify what you are joining as" }}
              render={({ field }) => (
                <CustomSelect
                  name={field.name}
                  onChange={field.onChange}
                  placeholder="Please select an option"
                  label="I am joining as a:"
                  options={joinAsData}
                  value={field.value}
                  error={errors.joiningAs?.message}
                />
              )}
            />

            {formData.joiningAs === "Other" && (
              <Input
                {...register("otherJoin", { required: "Please specify your category" })}
                name="otherJoin"
                type="text"
                label="Please specify your category"
                placeholder="Researcher"
                error={errors.otherJoin?.message}
              />
            )}

            <Controller
              control={control}
              name="tourDate"
              rules={{ validate: (value) => (value && value.length > 0) || "Please select at least one tour date" }}
              render={({ field }) => {
                const currentDates: Date[] = Array.isArray(field.value)
                  ? field.value.map((d: Date | string) => (d instanceof Date ? d : new Date(d)))
                  : []

                return (
                  <div className="w-full">
                    <label className="text-[#000000] font-medium text-base font-lato flex items-start gap-1">
                      Next tour date <span className="text-red-600">*</span>
                    </label>
                    <DatePicker
                      selectedDates={currentDates}
                      onChange={(dates) => field.onChange(dates)}
                      minDate={new Date()}
                      maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                      placeholderText="Click to select multiple dates"
                      className="block w-full rounded-lg px-4 py-3 text-lg cursor-pointer bg-white"
                      wrapperClassName="w-full"
                    />
                    {currentDates.length > 0 && (
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center justify-between">
                          <p className="font-normal text-dark">Selected Dates:</p>
                          <button
                            type="button"
                            onClick={() => field.onChange([])}
                            className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                          >
                            Clear All
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentDates.map((date, index) => (
                            <div
                              key={index}
                              className="bg-orange-100 text-[#EF8F57] px-3 py-1 rounded-full text-xs flex items-center gap-2"
                            >
                              <span>{date.toDateString()}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  field.onChange(currentDates.filter((_, i) => i !== index))
                                }}
                                className="text-orange-500 hover:text-orange-700 font-bold cursor-pointer"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {errors.tourDate && (
                      <p className="text-red-500 text-xs md:text-sm ml-auto">{errors.tourDate.message}</p>
                    )}
                  </div>
                )
              }}
            />


            <Controller
              control={control}
              name="referralSource"
              rules={{ required: "Please select an option" }}
              render={({ field }) => (
                <CustomSelect
                  name={field.name}
                  onChange={field.onChange}
                  label="How did you hear about us?"
                  options={referralSourceData}
                  placeholder="Please select an option"
                  value={field.value}
                  error={errors.referralSource?.message}
                />
              )}
            />

            <div className="w-full flex items-start flex-col gap-3">
              <Controller
                control={control}
                name="communicationConsent"
                rules={{ required: "Communication consent is required" }}
                render={({ field }) => (
                  <CustomCheckBox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    label="I agree to receive communications from Lagos Rhythm"
                    id="communicationConsent"
                    error={errors.communicationConsent?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="termsAgreement"
                rules={{ required: "You must agree to the terms and conditions" }}
                render={({ field }) => (
                  <CustomCheckBox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    label="I agree with Lagos Rhythm&apos;s Privacy Policy and Terms and conditions"
                    id="termsAgreement"
                    error={errors.termsAgreement?.message}
                  />
                )}
              />
            </div>

            <Button
              label={
                loading ? (
                  <>
                    <span className="inline-flex space-x-1 ml-1">
                      <span className="w-2 h-2 bg-[#ffffff] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-[#ffffff] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-[#ffffff] rounded-full animate-bounce"></span>
                    </span>
                  </>
                ) : (
                  "Submit"
                )
              }
              type="submit"
              ariaLabel="Submit"
              variant="ghost"
              disabled={loading}
              className="!bg-[#EF8F57] w-full max-w-sm"
            />
          </form>
        </div>
      </div>
    </div>
  )
}

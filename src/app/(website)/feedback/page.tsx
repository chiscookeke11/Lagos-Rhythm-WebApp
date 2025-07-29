"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Button from "@/components/common/Button"
import { addDoc, collection } from "firebase/firestore"
import { fireDB } from "@/app/config/firebaseClient"
import toast from "react-hot-toast"
import { useForm, Controller } from "react-hook-form"


interface FormData {
    name: string
    email: string
    tourJoined: string
    experienceDescription: string
    experienceRating: string
    publicTestimonial: string
    testimonialText?: string
    consentStoreFeedback: boolean
    consentPublishTestimonial?: boolean
    suggestions?: string
}

export default function FeedbackPage() {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            email: "",
            tourJoined: "",
            experienceDescription: "",
            experienceRating: "",
            publicTestimonial: "No",
            testimonialText: "",
            consentStoreFeedback: false,
            consentPublishTestimonial: false,
            suggestions: "",
        },
    })

    const [submitted, setSubmitted] = useState(false)


    const publicTestimonialValue = watch("publicTestimonial")
    const apiKey = process.env.NEXT_PUBLIC_MAILBOX_API_KEY


    const onSubmit = async (data: FormData) => {
        // Manual email validation using external API
        try {
            const validationRes = await fetch(
                `https://apilayer.net/api/check?access_key=${apiKey}&email=${data.email}&smtp=1&format=1`,
            )
            const emailValidationData = await validationRes.json()

            if (!(emailValidationData.smtp_check && emailValidationData.format_valid && emailValidationData.mx_found)) {
                toast.error("Email address does not exist or is invalid.")
                return
            }
        } catch (error) {
            console.error("Email validation API error:", error)
            toast.error("Failed to validate email. Please try again.")
            return
        }

        try {
            await addDoc(collection(fireDB, "Feedback"), {
                name: data.name,
                email: data.email,
                experience: data.experienceDescription,
                experience_rating: data.experienceRating,
                joinReason: data.tourJoined,
                publishTestimonial: data.consentPublishTestimonial,
                store_data: data.consentStoreFeedback,
                suggestions: data.suggestions,
                testimonial_Text: data.testimonialText,
                timestamp: new Date(),
            })
            setSubmitted(true)
            console.log("Feedback submitted:", data)
            toast.success("Feedback submitted successfully!")
            reset()
        } catch (err) {
            console.error("failed", err)
            toast.error("Failed to submit feedback. Please try again.")
        }
    }

    if (submitted) {
        return (
            <main className=" px-4 py-12 md:px-6 lg:px-8 w-full flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-[#05073C]/95 text-[#FDF4F1] font-signika">
                <Card className="w-full p-8 text-center shadow-lg bg-[#05073C]/95 text-[#FDF4F1] border-0">
                    <CardTitle className=" text-xl md:text-3xl font-bold mb-4 font-merriweather">
                        Thank you for sharing your rhythm with us!
                    </CardTitle>
                    <CardContent className="text-base md:text-lg text-[#FDF4F1]">
                        <p className="mb-4">
                            Your feedback keeps us grounded and growing. We&apos;ll keep evolving -and we hope to see you again on
                            tour.
                        </p>
                        <p>We appreciate your valuable input!</p>
                    </CardContent>
                </Card>
            </main>
        )
    }

    return (
        <main className="w-full px-4 py-8 pt-28 md:px-6 lg:px-8 bg-[#05073C]/95 text-[#FDF4F1] font-signika">
            <Card className="shadow-lg bg-[#05073C]/95 text-[#FDF4F1] border-0">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl md:text-4xl font-bold mb-2 font-merriweather">
                        We&apos;d Love to Hear From You
                    </CardTitle>
                    <p className="text-base md:text-lg text-[#FDF4F1]">
                        If you joined a tour or just explored our site, your voice helps shape the rhythm. Share your experience,
                        your thoughts, or what you&apos;d love to see next.
                    </p>
                </CardHeader>
                <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Share Your Feedback</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-[#FDF4F1]">
                                Name
                            </Label>
                            <Input
                                id="name"
                                {...register("name", { required: "Name is required" })}
                                placeholder="Your Name"
                                className="bg-transparent text-[#FDF4F1] border-[#FDF4F1]/30 placeholder:text-[#FDF4F1]/60"
                            />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-[#FDF4F1]">
                                Email Address (Required – if you want to follow up)
                            </Label>
                            <Input
                                id="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email address format",
                                    },
                                })}
                                type="email"
                                placeholder="your@example.com"
                                className="bg-transparent text-[#FDF4F1] border-[#FDF4F1]/30 placeholder:text-[#FDF4F1]/60"
                            />
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tourJoined" className="text-[#FDF4F1]">
                                Did you join a Lagos Rhythm tour?
                            </Label>
                            <Controller
                                control={control}
                                name="tourJoined"
                                rules={{ required: "Please select whether you joined a tour." }}
                                render={({ field }) => (
                                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="Yes - Free E-Rhythm"
                                                id="tour-free"
                                                className="border-[#FDF4F1]/30 data-[state=checked]:bg-[#EF8F57] data-[state=checked]:text-[#05073C]"
                                            />
                                            <Label htmlFor="tour-free" className="text-[#FDF4F1]">
                                                Yes – Free E-Rhythm
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="Yes - Exclusive E-Rhythm"
                                                id="tour-exclusive"
                                                className="border-[#FDF4F1]/30 data-[state=checked]:bg-[#EF8F57] data-[state=checked]:text-[#05073C]"
                                            />
                                            <Label htmlFor="tour-exclusive" className="text-[#FDF4F1]">
                                                Yes – Exclusive E-Rhythm
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="Not yet"
                                                id="tour-not-yet"
                                                className="border-[#FDF4F1]/30 data-[state=checked]:bg-[#EF8F57] data-[state=checked]:text-[#05073C]"
                                            />
                                            <Label htmlFor="tour-not-yet" className="text-[#FDF4F1]">
                                                Not yet
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                )}
                            />
                            {errors.tourJoined && <p className="text-red-400 text-sm mt-1">{errors.tourJoined.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="experienceDescription" className="text-[#FDF4F1]">
                                How would you describe your experience?
                            </Label>
                            <Textarea
                                id="experienceDescription"
                                {...register("experienceDescription", { required: "Please describe your experience." })}
                                placeholder="Share your thoughts here..."
                                rows={4}
                                className="bg-transparent text-[#FDF4F1] border-[#FDF4F1]/30 placeholder:text-[#FDF4F1]/60"
                            />
                            {errors.experienceDescription && (
                                <p className="text-red-400 text-sm mt-1">{errors.experienceDescription.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="experienceRating" className="text-[#FDF4F1]">
                                On a scale of 1 to 5, how would you rate your experience?
                            </Label>
                            <Controller
                                control={control}
                                name="experienceRating"
                                rules={{ required: "Please rate your experience." }}
                                render={({ field }) => (
                                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="1 - Poor"
                                                id="rating-1"
                                                className="border-[#FDF4F1]/30 data-[state=checked]:bg-[#EF8F57] data-[state=checked]:text-[#05073C]"
                                            />
                                            <Label htmlFor="rating-1" className="text-[#FDF4F1]">
                                                1 – Poor
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="2 - Fair"
                                                id="rating-2"
                                                className="border-[#FDF4F1]/30 data-[state=checked]:bg-[#EF8F57] data-[state=checked]:text-[#05073C]"
                                            />
                                            <Label htmlFor="rating-2" className="text-[#FDF4F1]">
                                                2 – Fair
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="3 - Good"
                                                id="rating-3"
                                                className="border-[#FDF4F1]/30 data-[state=checked]:bg-[#EF8F57] data-[state=checked]:text-[#05073C]"
                                            />
                                            <Label htmlFor="rating-3" className="text-[#FDF4F1]">
                                                3 – Good
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="4 - Very Good"
                                                id="rating-4"
                                                className="border-[#FDF4F1]/30 data-[state=checked]:bg-[#EF8F57] data-[state=checked]:text-[#05073C]"
                                            />
                                            <Label htmlFor="rating-4" className="text-[#FDF4F1]">
                                                4 – Very Good
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="5 - Excellent"
                                                id="rating-5"
                                                className="border-[#FDF4F1]/30 data-[state=checked]:bg-[#EF8F57] data-[state=checked]:text-[#05073C]"
                                            />
                                            <Label htmlFor="rating-5" className="text-[#FDF4F1]">
                                                5 – Excellent
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                )}
                            />
                            {errors.experienceRating && (
                                <p className="text-red-400 text-sm mt-1">{errors.experienceRating.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="publicTestimonial" className="text-[#FDF4F1]">
                                Would you like to leave a public testimonial?
                            </Label>
                            <Controller
                                control={control}
                                name="publicTestimonial"
                                rules={{ required: "Please indicate if you'd like to leave a public testimonial." }}
                                render={({ field }) => (
                                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="Yes"
                                                id="testimonial-yes"
                                                className="border-[#FDF4F1]/30 data-[state=checked]:bg-[#EF8F57] data-[state=checked]:text-[#05073C]"
                                            />
                                            <Label htmlFor="testimonial-yes" className="text-[#FDF4F1]">
                                                Yes
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="No"
                                                id="testimonial-no"
                                                className="border-[#FDF4F1]/30 data-[state=checked]:bg-[#EF8F57] data-[state=checked]:text-[#05073C]"
                                            />
                                            <Label htmlFor="testimonial-no" className="text-[#FDF4F1]">
                                                No
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                )}
                            />
                            {errors.publicTestimonial && (
                                <p className="text-red-400 text-sm mt-1">{errors.publicTestimonial.message}</p>
                            )}
                        </div>

                        {publicTestimonialValue === "Yes" && (
                            <div className="grid gap-2">
                                <Label htmlFor="testimonialText" className="text-[#FDF4F1]">
                                    Your Testimonial
                                </Label>
                                <Textarea
                                    id="testimonialText"
                                    {...register("testimonialText", {
                                        validate: (value) =>
                                            publicTestimonialValue === "Yes" && (!value || value.trim() === "")
                                                ? "Testimonial text is required if you choose to leave a public testimonial."
                                                : true,
                                    })}
                                    placeholder="Write your testimonial here..."
                                    rows={3}
                                    className="bg-transparent text-[#FDF4F1] border-[#FDF4F1]/30 placeholder:text-[#FDF4F1]/60"
                                />
                                {errors.testimonialText && (
                                    <p className="text-red-400 text-sm mt-1">{errors.testimonialText.message}</p>
                                )}

                                <div className="flex items-center space-x-2 mt-2">
                                    <Controller
                                        control={control}
                                        name="consentPublishTestimonial"
                                        rules={{
                                            validate: (value) =>
                                                publicTestimonialValue === "Yes" && value !== true
                                                    ? "You must consent to publish your testimonial."
                                                    : true,
                                        }}
                                        render={({ field }) => (
                                            <Checkbox
                                                id="consentPublishTestimonial"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="border-[#FDF4F1]/30 data-[state=checked]:bg-[#EF8F57] data-[state=checked]:text-[#05073C]"
                                            />
                                        )}
                                    />
                                    <Label htmlFor="consentPublishTestimonial" className="text-[#FDF4F1]">
                                        I consent to my testimonial being published
                                    </Label>
                                </div>
                                {errors.consentPublishTestimonial && (
                                    <p className="text-red-400 text-sm mt-1">{errors.consentPublishTestimonial.message}</p>
                                )}
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="suggestions" className="text-[#FDF4F1]">
                                Suggestions or ideas? (Optional)
                            </Label>
                            <Textarea
                                id="suggestions"
                                {...register("suggestions")}
                                placeholder="Any other thoughts or ideas?"
                                rows={3}
                                className="bg-transparent text-[#FDF4F1] border-[#FDF4F1]/30 placeholder:text-[#FDF4F1]/60"
                            />
                            {errors.suggestions && <p className="text-red-400 text-sm mt-1">{errors.suggestions.message}</p>}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                                <Controller
                                    control={control}
                                    name="consentStoreFeedback"
                                    rules={{ required: "You must consent to store your feedback." }}
                                    render={({ field }) => (
                                        <Checkbox
                                            id="consentStoreFeedback"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="border-[#FDF4F1]/30 data-[state=checked]:bg-[#EF8F57] data-[state=checked]:text-[#05073C]"
                                        />
                                    )}
                                />
                                <Label htmlFor="consentStoreFeedback" className="text-[#FDF4F1]">
                                    I agree to Lagos Rhythm storing my feedback securely
                                </Label>
                            </div>
                            {errors.consentStoreFeedback && (
                                <p className="text-red-400 text-sm mt-1">{errors.consentStoreFeedback.message}</p>
                            )}
                        </div>

                        <Button
                            disabled={isSubmitting}
                            ariaLabel="Submit"
                            type="submit"
                            variant="primary"
                            label={isSubmitting ?
                                <>
                                    <span className="inline-flex space-x-1 ml-1">
                                        <span className="w-2 h-2 bg-[#ffffff] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-[#ffffff] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-[#ffffff] rounded-full animate-bounce"></span>
                                    </span>

                                </>
                                : "Submit"}
                            className="w-fit text-center !bg-[#EF8F57] "
                        />
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}

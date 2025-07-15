"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Button from "@/components/common/Button" // Using your custom Button component

export default function FeedbackPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        tourJoined: "",
        experienceDescription: "",
        experienceRating: "",
        publicTestimonial: "No",
        testimonialText: "",
        consentStoreFeedback: false,
        consentPublishTestimonial: false,
        suggestions: "", // Added suggestions field to state
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        // Safely check if 'checked' property exists and is a boolean (for checkboxes)
        const checked = (e.target as HTMLInputElement).checked
        const type = (e.target as HTMLInputElement).type

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleRadioChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real application, you would send formData to your backend here.
        console.log("Feedback submitted:", formData)
        setSubmitted(true)
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
                            Your feedback keeps us grounded and growing. We&apos;ll keep evolving—and we hope to see you again on tour.
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
                    <CardTitle className="text-2xl md:text-4xl font-bold mb-2 font-merriweather">We&apos;d Love to Hear From You</CardTitle>
                    <p className="text-base md:text-lg text-[#FDF4F1]">
                        If you joined a tour or just explored our site, your voice helps shape the rhythm. Share your experience,
                        your thoughts, or what you&apos;d love to see next.
                    </p>
                </CardHeader>
                <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Share Your Feedback</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-[#FDF4F1]">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="bg-transparent text-[#FDF4F1] border-[#FDF4F1]/30 placeholder:text-[#FDF4F1]/60"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-[#FDF4F1]">
                                Email Address (Required – if you want to follow up)
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@example.com"
                                required
                                className="bg-transparent text-[#FDF4F1] border-[#FDF4F1]/30 placeholder:text-[#FDF4F1]/60"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tourJoined" className="text-[#FDF4F1]">
                                Did you join a Lagos Rhythm tour?
                            </Label>
                            <RadioGroup
                                onValueChange={(value) => handleRadioChange("tourJoined", value)}
                                value={formData.tourJoined}
                                className="flex flex-col space-y-2"
                            >
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
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="experienceDescription" className="text-[#FDF4F1]">
                                How would you describe your experience?
                            </Label>
                            <Textarea
                                id="experienceDescription"
                                name="experienceDescription"
                                value={formData.experienceDescription}
                                onChange={handleChange}
                                placeholder="Share your thoughts here..."
                                rows={4}
                                className="bg-transparent text-[#FDF4F1] border-[#FDF4F1]/30 placeholder:text-[#FDF4F1]/60"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="experienceRating" className="text-[#FDF4F1]">
                                On a scale of 1 to 5, how would you rate your experience?
                            </Label>
                            <RadioGroup
                                onValueChange={(value) => handleRadioChange("experienceRating", value)}
                                value={formData.experienceRating}
                                className="flex flex-col space-y-2"
                            >
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
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="publicTestimonial" className="text-[#FDF4F1]">
                                Would you like to leave a public testimonial?
                            </Label>
                            <RadioGroup
                                onValueChange={(value) => {
                                    handleRadioChange("publicTestimonial", value)
                                    if (value === "No") {
                                        setFormData((prev) => ({ ...prev, testimonialText: "", consentPublishTestimonial: false }))
                                    }
                                }}
                                value={formData.publicTestimonial}
                                className="flex flex-col space-y-2"
                            >
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
                        </div>

                        {formData.publicTestimonial === "Yes" && (
                            <div className="grid gap-2">
                                <Label htmlFor="testimonialText" className="text-[#FDF4F1]">
                                    Your Testimonial
                                </Label>
                                <Textarea
                                    id="testimonialText"
                                    name="testimonialText"
                                    value={formData.testimonialText}
                                    onChange={handleChange}
                                    placeholder="Write your testimonial here..."
                                    rows={3}
                                    className="bg-transparent text-[#FDF4F1] border-[#FDF4F1]/30 placeholder:text-[#FDF4F1]/60"
                                />
                                <div className="flex items-center space-x-2 mt-2">
                                    <Checkbox
                                        id="consentPublishTestimonial"
                                        name="consentPublishTestimonial"
                                        checked={formData.consentPublishTestimonial}
                                        onCheckedChange={(checked) =>
                                            setFormData((prev) => ({ ...prev, consentPublishTestimonial: !!checked }))
                                        }
                                        className="border-[#FDF4F1]/30 data-[state=checked]:bg-[#EF8F57] data-[state=checked]:text-[#05073C]"
                                    />
                                    <Label htmlFor="consentPublishTestimonial" className="text-[#FDF4F1]">
                                        I consent to my testimonial being published
                                    </Label>
                                </div>
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="suggestions" className="text-[#FDF4F1]">
                                Suggestions or ideas? (Optional)
                            </Label>
                            <Textarea
                                id="suggestions"
                                name="suggestions"
                                value={formData.suggestions}
                                onChange={handleChange}
                                placeholder="Any other thoughts or ideas?"
                                rows={3}
                                className="bg-transparent text-[#FDF4F1] border-[#FDF4F1]/30 placeholder:text-[#FDF4F1]/60"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="consentStoreFeedback"
                                    name="consentStoreFeedback"
                                    checked={formData.consentStoreFeedback}
                                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, consentStoreFeedback: !!checked }))}
                                    required
                                    className="border-[#FDF4F1]/30 data-[state=checked]:bg-[#EF8F57] data-[state=checked]:text-[#05073C]"
                                />
                                <Label htmlFor="consentStoreFeedback" className="text-[#FDF4F1]">
                                    I agree to Lagos Rhythm storing my feedback securely
                                </Label>
                            </div>
                        </div>

                        <Button ariaLabel="Submit" type="submit" variant="primary" label="Submit" className="w-full text-center  !bg-[#EF8F57] " />
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}

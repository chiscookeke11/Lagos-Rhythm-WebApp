

export interface inpersonFormUserData {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    country: string;
    isAdult?:  "" | "yes" | "no";
    fitForTravel: "";
    arrivalDate: Date | null;
    reasonForTour: string;
    otherReasonForTour: string;
    joiningAs: string;
    preferredFood: string;
    otherPreferredFood: string;
    specialRequest: string;
    howDidYouHear: string;
    discountCode: string;
    otherMessage: string;
    paymentType: "Full Payment" | "Deposit (50%)" | "";
    price: number | null;
    duration: string;
}
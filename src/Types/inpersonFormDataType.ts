

export interface inpersonFormUserData {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    country: string;
    isAdult?:  "" | "yes" | "no";
    arrivalDate: Date | null;
    reasonForTour: string;
    joiningAs: string;
    preferredFood: string;
    specialRequest: string;
    howDidYouHere: string;
    discountCode: string;
    otherMessage: string;
    paymentType: "Full Payment" | "Deposit (50%)"
}
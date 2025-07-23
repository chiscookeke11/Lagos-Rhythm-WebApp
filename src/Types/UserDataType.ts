

export interface userDataType {
    fullName: string,
    email: string,
    country: string,
    reasonForJoin: string[],
    joiningAs: string,
    otherJoin?: string,
    tourDate: string[],
    referralSource: string,
    communicationConsent?: boolean,
    termsAgreement?: boolean
    OtherReason: string
}


export interface exclusiveBookingDataType {
    country: string;
    reasonForJoin: string[],
    joiningAs: string,
    otherJoin?: string,
    tourDate: string[],
    referralSource: string,
    communicationConsent?: boolean,
    termsAgreement?: boolean
    OtherReason: string
}

export type PopulationTypeInterface = string

export interface CrewAmountItem {
    label: string;
    value: string;
    perTourFee: number;
    monthlySub: number;
    maxAmount: number
}
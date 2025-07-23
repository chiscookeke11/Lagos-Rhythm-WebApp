

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

export type PopulationTypeInterface = "1-3 (circle)" | "4-10 (crew)" | "11+ (community)"

export interface CrewAmountItem {
    label: PopulationTypeInterface;
    value: string;
    perTourFee: number;
    monthlySub: number;
}
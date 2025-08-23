

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


export type Tourist = {
    fullName: string
    email: string
}

export interface exclusiveBookingDataType {
    tourists: Tourist[];
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
    perTourFee: (country: string) => number;
    monthlySub: (country: string) => number;
    maxAmount: number
}
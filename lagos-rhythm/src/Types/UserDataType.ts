

export interface userDataType{
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
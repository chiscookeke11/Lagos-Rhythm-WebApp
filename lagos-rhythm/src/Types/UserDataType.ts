

export interface userDataType{
    fullName: string,
        email: string,
        race: string,
        country: string,
        joiningAs: string,
        otherJoin?: string,
        tourDate: string[],
        referralSource: string,
        communicationConsent?: boolean,
        termsAgreement?: boolean
}
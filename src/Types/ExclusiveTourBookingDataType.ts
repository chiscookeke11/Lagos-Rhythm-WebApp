import { Tourist } from "./UserDataType";

export interface ExclusiveTourBookingDataType {
    tourist: Tourist[],
    country: string,
    reasonForJoin: string,
    OtherReason: string,
    joiningAs: string,
    otherJoin: string,
    tourDate: Date[],
    termsAgreement: string,
    referralSource: string,
    subscribedAt: Date,
    time: string,
    discountCode: string,
    subscriptionType: string,
    paidPrice: string,
    populationSize: string,
    tourTheme: string,
    isCompleted: boolean
}
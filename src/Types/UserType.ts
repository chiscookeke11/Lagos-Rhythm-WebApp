

export interface ClerkUser {
    id: string
    emailAddresses: Array<{
        emailAddress: string
        id: string
    }>
    firstName?: string
    lastName?: string
    imageUrl?: string
    createdAt: number
}
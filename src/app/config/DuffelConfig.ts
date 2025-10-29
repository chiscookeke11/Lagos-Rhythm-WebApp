import { Duffel } from '@duffel/api'

export const duffel = new Duffel({
  token: process.env.DUFFEL_API_KEY!,
})

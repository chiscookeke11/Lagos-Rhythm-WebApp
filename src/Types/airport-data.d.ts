declare module "airport-data" {
  interface Airport {
    name: string;
    city: string;
    country: string;
    iata: string;
    icao?: string;
  }

  const airports: Airport[];
  export default airports;
}

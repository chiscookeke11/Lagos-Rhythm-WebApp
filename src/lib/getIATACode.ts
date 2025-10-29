import airports from "airport-data";

export function getIATACode(city: string) {
  const airport = airports.find(
    (a) =>
      a.city?.toLowerCase() === city.toLowerCase() ||
      a.name?.toLowerCase().includes(city.toLowerCase())
  );
  return airport ? airport.iata : "Not found";
}

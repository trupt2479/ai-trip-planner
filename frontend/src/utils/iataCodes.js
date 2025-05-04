import airports from './airports.json';

// Returns the IATA code for a given city or airport name (case-insensitive).
export function getIATACode(query) {
  if (!query) return '';
  const q = query.trim().toLowerCase();

  // Try to find by city
  let found = Object.values(airports).find(
    airport =>
      airport.city && airport.city.toLowerCase() === q && airport.iata && airport.iata.length === 3
  );
  if (found) return found.iata;

  // Try to find by airport name
  found = Object.values(airports).find(
    airport =>
      airport.name && airport.name.toLowerCase().includes(q) && airport.iata && airport.iata.length === 3
  );
  if (found) return found.iata;

  // Try to find by IATA code directly
  found = Object.values(airports).find(
    airport =>
      airport.iata && airport.iata.toLowerCase() === q
  );
  if (found) return found.iata;

  return '';
}

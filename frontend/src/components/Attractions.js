import React, { useEffect, useState } from 'react';

function Attractions({ city }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Placeholder: Replace with Google Places API or OpenAI integration
    setSuggestions([
      `Top attraction 1 in ${city}`,
      `Top attraction 2 in ${city}`,
      `Top attraction 3 in ${city}`,
      `Top attraction 4 in ${city}`,
      `Top attraction 5 in ${city}`,
    ]);
  }, [city]);

  return (
    <ul>
      {suggestions.map((s, i) => <li key={i}>{s}</li>)}
    </ul>
  );
}

export default Attractions;

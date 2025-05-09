import React, { useEffect, useState } from 'react';
import { getIATACode } from '../utils/iataCodes';
import { formatDate } from '../utils/helpers';
import Attractions from './Attractions';
import Hotels from './Hotels';

function TravelResults({ form }) {
  const [distance, setDistance] = useState(null);
  const [fuelPrice, setFuelPrice] = useState(null);

  // Fetch round-trip driving distance
  useEffect(() => {
    if (form.mode === 'car' && form.start && form.end) {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(form.start)}&destination=${encodeURIComponent(form.end)}&key=${apiKey}`)
        .then(res => res.json())
        .then(data => {
          if (data.routes && data.routes[0]) {
            const oneWay = data.routes[0].legs[0].distance.value / 1000; // in km
            setDistance(oneWay * 2); // round trip
          }
        });
    }
  }, [form]);

  // Fetch live fuel price (example for India, Mumbai; expand as needed)
  useEffect(() => {
    if (form.mode === 'car') {
      fetch('https://api.api-ninjas.com/v1/fuelprice?city=mumbai', {
        headers: { 'X-Api-Key': 'YOUR_API_NINJAS_KEY' }
      })
        .then(res => res.json())
        .then(data => {
          if (data && data.petrol) setFuelPrice(data.petrol);
        })
        .catch(() => setFuelPrice(100)); // fallback
    }
  }, [form]);

  const originIATA = getIATACode(form.start);
  const destIATA = getIATACode(form.end);
  const depart = formatDate(form.departDate);
  const ret = form.returnDate ? formatDate(form.returnDate) : '';
  const skyscannerUrl = originIATA && destIATA
    ? `https://www.skyscanner.net/transport/flights/${originIATA}/${destIATA}/${depart}/${ret}/`
    : null;
  const trainUrl = `https://www.railyatri.in/train-between-stations/${form.start.toLowerCase()}-to-${form.end.toLowerCase()}?journey_date=${form.departDate}`;

  // Assume average mileage for car (e.g., 15 km/l)
  const avgMileage = 15;

  return (
    <div className="results-container">
      {form.mode === 'flight' && skyscannerUrl && (
        <div>
          <h3>Flight Options</h3>
          <a href={skyscannerUrl} target="_blank" rel="noopener noreferrer">
            See flights and fares on Skyscanner
          </a>
        </div>
      )}
      {form.mode === 'car' && (
        <div>
          <h3>Car Travel</h3>
          {distance && fuelPrice ? (
            <>
              <p>Total round-trip distance: {distance} km</p>
              <p>Live fuel price: ₹{fuelPrice} per liter</p>
              <p>
                Estimated Fuel Cost: ₹
                {((distance / avgMileage) * fuelPrice).toFixed(2)}
              </p>
            </>
          ) : (
            <p>Calculating distance and fuel price...</p>
          )}
        </div>
      )}
      {form.mode === 'train' && (
        <div>
          <h3>Train Options</h3>
          <a href={trainUrl} target="_blank" rel="noopener noreferrer">
            See trains on RailYatri
          </a>
        </div>
      )}
      <hr />
      <h3>Attractions at {form.end}</h3>
      <Attractions city={form.end} />
      <hr />
      <h3>Hotels in {form.end}</h3>
      <Hotels city={form.end} checkin={form.departDate} checkout={form.returnDate || form.departDate} />
    </div>
  );
}

export default TravelResults;

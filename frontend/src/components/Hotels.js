import React from 'react';

function Hotels({ city, checkin, checkout }) {
  const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city)}&checkin_year_month_monthday=${checkin}&checkout_year_month_monthday=${checkout}`;
  return (
    <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
      See hotels on Booking.com
    </a>
  );
}

export default Hotels;

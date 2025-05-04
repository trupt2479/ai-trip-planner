import React, { useState } from 'react';
import TravelForm from '../components/TravelForm';
import TravelResults from '../components/TravelResults';
import GoogleMapView from '../components/GoogleMapView';

function HomePage() {
  const [form, setForm] = useState(null);

  return (
    <div className="home-page">
      <h1>AI Trip Planner</h1>
      <TravelForm onSubmit={setForm} />
      <GoogleMapView />
      {form && <TravelResults form={form} />}
    </div>
  );
}

export default HomePage;

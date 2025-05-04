import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function GoogleMapView() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={['places']}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 23.5, lng: 80.5 }}
        zoom={5}
      />
    </LoadScript>
  );
}

export default GoogleMapView;

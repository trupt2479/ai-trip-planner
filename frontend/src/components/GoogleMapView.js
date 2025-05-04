import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function GoogleMapView() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDSserr3J9rJRlAPkHZK5s_7l9jbDuczvc"
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

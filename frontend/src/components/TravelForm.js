import React, { useRef, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

function TravelForm({ onSubmit }) {
  const [mode, setMode] = useState('flight');
  const departRef = useRef();
  const returnRef = useRef();
  const startRef = useRef();
  const endRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      mode,
      start: startRef.current.value,
      end: endRef.current.value,
      departDate: departRef.current.value,
      returnDate: returnRef.current ? returnRef.current.value : '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input type="radio" value="flight" checked={mode === 'flight'} onChange={() => setMode('flight')} />
          Flight
        </label>
        <label>
          <input type="radio" value="car" checked={mode === 'car'} onChange={() => setMode('car')} />
          Car
        </label>
        <label>
          <input type="radio" value="train" checked={mode === 'train'} onChange={() => setMode('train')} />
          Train
        </label>
      </div>
      <div>
        <Autocomplete>
          <input ref={startRef} required placeholder="Start location" type="text" />
        </Autocomplete>
        <Autocomplete>
          <input ref={endRef} required placeholder="Destination" type="text" />
        </Autocomplete>
      </div>
      <div>
        <label>
          Departure date:
          <input ref={departRef} required type="date" />
        </label>
        {mode === 'flight' && (
          <label>
            Return date:
            <input ref={returnRef} type="date" />
          </label>
        )}
      </div>
      <button type="submit">Plan Trip</button>
    </form>
  );
}

export default TravelForm;

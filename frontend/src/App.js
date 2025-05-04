import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';

function AboutPage() {
  return (
    <div className="about-page">
      <h2>About AI Trip Planner</h2>
      <p>
        This is an AI-powered trip planner that helps you plan your journey by flight, car, or train, and suggests attractions and hotels at your destination.
      </p>
    </div>
  );
}

function NotFoundPage() {
  return <div><h2>404 - Page Not Found</h2></div>;
}

function App() {
  return (
    <Router>
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

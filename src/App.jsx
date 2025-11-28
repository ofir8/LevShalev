import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ConfigProvider } from './context/ConfigContext';
import Home from './Home';
import AccessibilityStatement from './pages/AccessibilityStatement';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ThankYou from './pages/ThankYou';
import Admin from './pages/Admin';

function App() {
  return (
    <HelmetProvider>
      <ConfigProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accessibility" element={<AccessibilityStatement />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;

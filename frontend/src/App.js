import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/nav';
import Footer from './components/footer';
import Home from './pages/Home';
import Assistant from './pages/Assistant';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/assistant"    element={<Assistant />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about"        element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
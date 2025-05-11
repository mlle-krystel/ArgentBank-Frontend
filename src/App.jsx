import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import UserProfil from './pages/UserProfil.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfil />} />
        {/* Ajoutez d'autres routes ici */}
      </Routes>
    </Router>
  );
}

export default App;

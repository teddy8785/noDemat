import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/base/index.css';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './pages/Home';
import Calendrier from './pages/Calendrier';
import DetailsSorties from './pages/DetailsSorties';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendrier" element={<Calendrier />} />
        <Route path="/event/:eventId" element={<DetailsSorties />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

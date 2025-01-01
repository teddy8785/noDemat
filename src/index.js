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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendrier" element={<Calendrier />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

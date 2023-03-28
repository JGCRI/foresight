import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Home,
  Dashboard,
  Explore,
  World,
  Sector
} from "./components";
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sector" element={<Sector />} />    
      <Route path="/dashboard" element={<Dashboard />} />     
      <Route path="/explore" element={<Explore />} />      
      <Route path="/world" element={<World />} />
    </Routes>
  </Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
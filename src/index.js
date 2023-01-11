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
  Experiment
} from "./components";


ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/foresight" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />     
      <Route path="/explore" element={<Explore />} />      
      <Route path="/world" element={<World />} />  
      <Route path="/experiment" element={<Experiment />} />   
    </Routes>
  </Router>,

  document.getElementById("root")
);
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './components/Store';

import {
  Navigation,
  Home,
  Dashboard,
  Experiment,
  World,
  Energy,
  Water,
  Land,
  About,
  Team,
  Help,
  Footer
} from "./components";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/energy" element={<Energy />} />    
        <Route path="/water" element={<Water />} />    
        <Route path="/land" element={<Land />} />    
        <Route path="/dashboard" element={<Dashboard />} />     
        <Route path="/explore" element={<Experiment />} />      
        <Route path="/world" element={<World />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
    <Footer />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import { FaExclamation } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <FaExclamation className="icon" />
        <p className="message">This is a beta version using example data and not for citation.</p>
      </div>
    </footer>
  );
}

export default Footer;

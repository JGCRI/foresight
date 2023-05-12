import React from "react";
import { FaExclamation } from "react-icons/fa";

function Footer() {
  return (
    <footer style={{ backgroundColor: "black", color: "yellow", padding: "10px", textAlign: "center", position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 1000 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <FaExclamation style={{ marginRight: "5px" }} />
        <p style={{ margin: 0 }}>This is a beta version using example data and not for citation.</p>
      </div>
    </footer>
  );
}

export default Footer;

import React, { useState, useRef, useEffect } from "react";
import "./App.css";

import BottomSheet from "./components/BottomSheet";

export default function App() {
  return (
    <div className="App">
      <div>
        <h1
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#ffffff",
            padding: "1rem 2rem", // using rem units
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            fontSize: "clamp(18px, 4vw, 28px)", // responsive font size
            fontWeight: "bold",
            color: "#007bff",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "1px",
            zIndex: 1000,
            maxWidth: "90vw", // prevent overflowing
            wordWrap: "break-word", // break text if needed
          }}
          className="t-header"
        >
          React Bottom Sheet
        </h1>
      </div>

      <BottomSheet />
    </div>
  );
}

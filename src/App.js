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
            padding: "16px 32px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            fontSize: "28px",
            fontWeight: "bold",
            color: "#007bff",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "1px",
            zIndex: 1000,
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

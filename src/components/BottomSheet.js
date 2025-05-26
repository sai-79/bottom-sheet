import React, { useState, useRef, useEffect } from "react";

const SNAP_POINTS = {
  CLOSED: window.innerHeight - 100,
  HALF: window.innerHeight / 2,
  OPEN: 100,
};

const springConfig = {
  stiffness: 0.1,
  damping: 0.8,
};

function BottomSheet() {
  const sheetRef = useRef();
  const animationRef = useRef(null);
  const keys = Object.keys(SNAP_POINTS);
  const [position, setPosition] = useState(SNAP_POINTS.CLOSED);
  const [target, setTarget] = useState(SNAP_POINTS.CLOSED);
  const [velocity, setVelocity] = useState(0);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startPos = useRef(0);
  const positionRef = useRef(position);

  useEffect(() => {
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, [target]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (key === "O") {
        setTarget(SNAP_POINTS.OPEN);
      } else if (key === "H") {
        setTarget(SNAP_POINTS.HALF);
      } else if (key === "C") {
        setTarget(SNAP_POINTS.CLOSED);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const animate = () => {
    animationRef.current = requestAnimationFrame(() => {
      const displacement = target - positionRef.current;
      const springForce = displacement * springConfig.stiffness;
      const dampingForce = velocity * springConfig.damping;
      const acceleration = springForce - dampingForce;
      const newVelocity = velocity + acceleration;
      const newPosition = positionRef.current + newVelocity;

      if (Math.abs(newVelocity) < 0.5 && Math.abs(displacement) < 1) {
        setVelocity(0);
        setPosition(target);
        return;
      }
      positionRef.current = newPosition;
      setVelocity(newVelocity);
      setPosition(newPosition);
      animate();
    });
  };

  const onPointerDown = (e) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startPos.current = position;
    cancelAnimationFrame(animationRef.current);

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("touchmove", onPointerMove);
    window.addEventListener("touchend", onPointerUp);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const currentY = e.clientY;
    const delta = currentY - startY.current;
    const newPos = Math.min(
      Math.max(startPos.current + delta, SNAP_POINTS.OPEN),
      SNAP_POINTS.CLOSED
    );
    setPosition(newPos);
    setTarget(newPos);
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const distances = Object.values(SNAP_POINTS).map((p) => ({
      p,
      diff: Math.abs(p - positionRef.current),
    }));

    distances.sort((a, b) => a.diff - b.diff);

    setTarget(distances[0].p);

    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("touchmove", onPointerMove);
    window.removeEventListener("touchend", onPointerUp);
  };

  return (
    <div className="App">
      <div className="buttons">
        <button onClick={() => setTarget(SNAP_POINTS.OPEN)}>Open</button>
        <button onClick={() => setTarget(SNAP_POINTS.HALF)}>Half</button>
        <button onClick={() => setTarget(SNAP_POINTS.CLOSED)}>Close</button>
      </div>

      <div>
        {(target === SNAP_POINTS.CLOSED || target === SNAP_POINTS.HALF) && (
          <>
            <div className="manual">
              <h2>Welcome to Bottom Sheet UI</h2>
              <p>
                You can drag the bottom sheet from the bottom using the handle
                or use the buttons to open, half-expand, or close it.
              </p>
              <p>
                This sheet contains helpful content based on its position. Give
                it a try!
              </p>
            </div>
            <div style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
              Press <strong>O</strong> to Open, <strong>H</strong> for Half,{" "}
              <strong>C</strong> to Close
            </div>
          </>
        )}
      </div>

      <div
        ref={sheetRef}
        className="bottom-sheet"
        style={{ transform: `translateY(${position}px)` }}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        <div className="handle"></div>
        <div className="content">
          <h2>
            {target === SNAP_POINTS.HALF
              ? "Interactive Mode"
              : target === SNAP_POINTS.OPEN
              ? "Developer Insights"
              : "Welcome!"}
          </h2>

          {target === SNAP_POINTS.HALF && (
            <p>
              Easily control this sheet using drag gestures or buttons. Ideal
              for quickly accessing logic tools, calculators, or summaries.
            </p>
          )}

          {target === SNAP_POINTS.OPEN && (
            <ul>
              <li>🔍 Analyze code patterns and logic flows.</li>
              <li>📊 View key statistics or app analytics.</li>
              <li>🛠️ Add debugging or developer-friendly tools here.</li>
              <li>💡 Tip: Snap to any position based on drag distance.</li>
            </ul>
          )}

          {target === SNAP_POINTS.CLOSED && (
            <p style={{ textAlign: "center", opacity: 0.6 }}>
              Swipe up or press a button to reveal smart insights.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BottomSheet;

import React from "react";

// You can adjust the gradient colors and direction as needed
const BackgroundGradient: React.FC = () => (
  <div
    aria-hidden="true"
    style={{
      position: "fixed",
      inset: 0,
      zIndex: -1,
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(135deg, #f3f4f6 0%, #e0e7ff 100%)",
      pointerEvents: "none",
    }}
  />
);

export default BackgroundGradient;

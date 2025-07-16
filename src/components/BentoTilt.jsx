import React, { useRef, useState } from "react";

const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return null;

    const { top, left, width, height } =
      itemRef.current.getBoundingClientRect();

    // normalize the position of mouse inside the element between [0,1]
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    // relativeX - 0.5: Shifts the range from [0, 1] to [-0.5, 0.5] so that:
    // Center of the element = 0
    // Left edge = -0.5
    // Right edge = +0.5
    // * 5: Scales this value up. The number 5 is arbitrary — it defines how intense the tilt effect will be.
    const tiltX = (relativeX - 0.5) * 5;
    const tiltY = (relativeY - 0.5) * 5;

    const newTransform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.98,.98,.98)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };
  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export default BentoTilt;

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const LoopAnimation = () => {
  const ballRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    // Set the ball's initial position relative to the path
    gsap.set(ballRef.current, {
      xPercent: -30,
      yPercent: -30,
    });

    // Animate the ball along the path
    gsap.to(ballRef.current, {
      duration: 10,
      repeat: -1,
      ease: "none",
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        autoRotate: true, // Makes sure the ball rotates along the path
      },
    });
  }, []);

  return (
    <div className="flex justify-center">
      <svg viewBox="0 0 219.5 109.33" width="700">
        <path
          ref={pathRef}
          className="loading"
          d="M6.75,72l29.92,0C42.5,71.66,51,68.05,58.52,60.52c7.9-7.89,18.13-26.58,20.65-38.58S75,3.56,68.66,15.18s-7,32.1-6.6,43.73,4.7,14.83,9.85,12.26S79,65.48,83.21,58.64c0,0,0,7.64,2.42,10.36a6.1,6.1,0,0,0,6.16,2.25,13.6,13.6,0,0,0,6.78-6.31c2.23-4,5.63-12.71,2.27-19s-10.71-2.62-12.4,2-.65,9.35,3.37,11.4,13.64,3.45,17.42-1.35c0,0,1.17,13.82,9.1,13.82,5.85-.31,7.13-2.93,9.38-7.31s4.84-13.35-.21-19.46c-5.54-5.85-12.24-1.07-13.27,4.1a12.69,12.69,0,0,0,4.82,12.66c3.48,2.35,9.65,1.14,10.48.89s5.27,1.09,8.94-6.68,3.61-13,3.61-13,6.63,54.43,1.76,59.68-6.08-5.45-5.63-12.71S146.08,57,152,49.74s14.19-9.41,18.94-1.28-5.48,21.4-13,22-7.75-2.84-6.41-6.13,6.45-4.59,10.8-2.23,13.53,9.6,23.74,9.38l13.42,0"
          fill="none"
          stroke="#ef4444"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <circle
          ref={ballRef}
          className="ball"
          cx="26.76"
          cy="72.01"
          r="2.16"
          fill="#fffff9"
        />
      </svg>
    </div>
  );
};

export default LoopAnimation;

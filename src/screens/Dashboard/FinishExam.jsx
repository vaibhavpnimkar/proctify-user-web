import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactCanvasConfetti from "react-canvas-confetti";

const FinishExam = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  };

  const getAnimationSettings = (angle, originX) => {
    return {
      particleCount: 3,
      angle,
      spread: 55,
      origin: { x: originX },
      colors: ["#bb0000", "#ffffff"],
    };
  };

  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 16));
    }
  }, [nextTickAnimation, intervalId]);

  const pauseAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
  }, [intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    setTimeout(() => {
      clearInterval(intervalId);
      pauseAnimation();
    }, 3000);
    startAnimation();
  }, []);
  return (
    <main className="flex items-start select-none">
      <section className="w-full min-h-[100vh] mx-auto flex justify-center items-center">
        <div className="flex justify-center items-center flex-col">
          <p className="text-center my-8 font-semibold text-4xl">
            Exam Submitted 🎉
          </p>
          <p className="mb-4 text-center text-lg">
            Results Will Be Soon Declared. <br></br>You can access it from
            Result Page
          </p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md my-3 transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 mx-auto mt-4"
            onClick={() => navigate("/dashboard")}
          >
            Go To Dashboard
          </button>
        </div>
        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      </section>
    </main>
  );
};

export default FinishExam;

// const refAnimationInstance = useRef(null);
// const [intervalId, setIntervalId] = useState();

// const getInstance = useCallback((instance) => {
//   refAnimationInstance.current = instance;
// }, []);

// const makeShot = useCallback((particleRatio, opts) => {
//   refAnimationInstance.current &&
//     refAnimationInstance.current({
//       ...opts,
//       origin: { y: 0.7 },
//       particleCount: Math.floor(200 * particleRatio),
//     });
// }, []);

// const fire = useCallback(() => {
//   makeShot(0.25, {
//     spread: 26,
//     startVelocity: 55,
//   });

//   makeShot(0.2, {
//     spread: 60,
//   });

//   makeShot(0.35, {
//     spread: 100,
//     decay: 0.91,
//     scalar: 0.8,
//   });

//   makeShot(0.1, {
//     spread: 120,
//     startVelocity: 25,
//     decay: 0.92,
//     scalar: 1.2,
//   });

//   makeShot(0.1, {
//     spread: 120,
//     startVelocity: 45,
//   });
// }, [makeShot]);

// useEffect(() => {
//   return () => {
//     clearInterval(intervalId);
//   };
// }, [intervalId]);

// useEffect(() => {
//   fire();
// }, []);

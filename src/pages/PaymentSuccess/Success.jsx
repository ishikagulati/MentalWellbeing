import React, { useState, useEffect } from 'react';
import './Success.css';
import { Link } from 'react-router-dom';
import { useCallback, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
};

function getAnimationSettings(originXA, originXB) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2
    }
  };
}

const Success = () => {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const username = localStorage.getItem('name');

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);
  window.onload = () => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400));
    }
  }

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);


  return (
    <>
      <div className="successwrapper">
        <div className="success">
          <h1>Welcome to a Journey of Mental Wellness!</h1>
          <p>Dear {username}, <br /></p>
          <p>Congratulations on taking the first step towards prioritizing your mental health and well-being! We're thrilled to welcome you to our community of individuals committed to fostering positive mental health.</p>
          <p>Thank you for choosing us to be part of your mental health journey. Together, let's create a life filled with balance, resilience, and joy.</p>
          <p className="description">
            If you have any questions, please email
            <a className="mailToEmail" href="mailto:mindwell@gmail.com">
              mindwell@gmail.com
            </a>
          </p>
          <p>Wishing you peace and happiness,</p>
          <p>MindWell,</p>
          <p>Customer Support team</p>


          <Link to={'/'}>
            <div className='gotohomebtn'>
              <button type="button">
                Go to Home
              </button>
            </div>
          </Link>
        </div>
      </div>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  )
}

export default Success
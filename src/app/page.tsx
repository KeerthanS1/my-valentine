"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import Confetti from "react-confetti";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const funnyMessages = [
  "Maybe you meant to click on Yes? 💝",
  "Are you sure? The YES button looks so lonely! 🥺",
  "I think your finger slipped... Try YES! 💕",
  "NO? Really? But YES is right there! 💖",
  "The YES button is calling your name! 💗",
  "Oops! Wrong button! Try the bigger one! 💓",
  "Still NO? The YES button is getting bigger for you! 💞",
  "Come on now... Just click YES! 💘",
  "I believe you want to click YES! 🌹",
  "One more chance... Click YES! 💝",
];

export default function App() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [accepted, setAccepted] = useState(false);

  // 1. Initialize with 0 to avoid Server-Side Rendering (SSR) errors
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // 2. Set the size ONLY after the component mounts in the browser
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNoClick = () => {
    if (noClickCount < funnyMessages.length) {
      setNoClickCount((prev) => prev + 1);
    }
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  const yesButtonScale = 1 + noClickCount * 0.3;
  const currentMessage =
    noClickCount > 0
      ? funnyMessages[Math.min(noClickCount - 1, funnyMessages.length - 1)]
      : "No";

  const showNoButton = noClickCount < funnyMessages.length;

  return (
    <div className={inter.className}>
      <div className="valentine-container">
        {accepted && windowSize.width > 0 && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={true}
            numberOfPieces={500}
            colors={[
              "#ff1493",
              "#ff69b4",
              "#ffb6c1",
              "#ffc0cb",
              "#ff91af",
              "#ff80bf",
            ]}
          />
        )}

        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="question"
              className="question-section"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Heart className="heart-icon" />
              </motion.div>

              <h1 className="question-title">Will you be my Valentine?</h1>

              <div className="buttons-container">
                <motion.button
                  className="yes-button"
                  onClick={handleYesClick}
                  style={{ scale: yesButtonScale }} // Move scale to style or animate
                  whileHover={{ scale: yesButtonScale * 1.1 }}
                  whileTap={{ scale: yesButtonScale * 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Yes! 💕
                </motion.button>

                {showNoButton && (
                  <motion.button
                    className="no-button"
                    onClick={handleNoClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    {currentMessage}
                  </motion.button>
                )}
              </div>

              {noClickCount > 0 && (
                <motion.p
                  className="hint-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {showNoButton
                    ? "Hint: The YES button is getting bigger! 😉"
                    : "There's only one choice now... 💝"}
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="accepted"
              className="accepted-section"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <img src="./thank-you.gif" alt="Thank you" />

              <motion.div
                className="message-container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <h2 className="yay-title">Yay! 🎉💖</h2>
                <p className="cute-message">
                  Get ready to explore Mysore in our traditional outfits!
                  <br />
                  It will be a great day filled with love and memories! 💕
                </p>
                <motion.div
                  className="hearts-floating"
                  animate={{ y: [0, -20, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  💕 💖 💗 💝 💓
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BackgroundPhotoSlideshow
 * Full-viewport background that continuously cycles through the 4 shared platform photos
 * strictly behind all liquid glass cards. No separate sections, no text clutter — pure visual depth.
 */
export default function BackgroundPhotoSlideshow() {
  const slides = [
    '/slides/slide%201.png',
    '/slides/slide%202.png',
    '/slides/slide%203.png',
    '/slides/slide%204.png',
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  // Preload all 4 slide images to guarantee zero flicker on transition
  useEffect(() => {
    slides.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Automatically crossfade photos every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="background-slideshow-container" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIdx}
          className="background-slide-layer"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        >
          <img
            src={slides[currentIdx]}
            alt="Trishul platform showcase slide"
            className="background-slide-image"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Glass Diffusion & Gradient Overlay */}
      <div className="background-slideshow-overlay" />
    </div>
  );
}

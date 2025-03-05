'use client'

import React, { useEffect, useRef } from 'react'


const StarsBackground = () => {
    const starsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!starsRef.current) return;
    
        const numStars = Math.floor(Math.random() * 21) + 40;
        for (let i = 0; i < numStars; i++) {
          const star = document.createElement("div");
          star.className = "falling-star";
          star.style.left = `${Math.random() * 100}vw`;
          star.style.animationDuration = `${Math.random() * 2 + 2}s`;
          star.style.animationDelay = `${Math.random() * 2}s`;
    
          starsRef.current.appendChild(star);
        }
      }, []);
  return (
    <div ref={starsRef} className="stars-container fixed top-0 left-0 w-full h-full overflow-hidden"></div>
  )
}

export default StarsBackground
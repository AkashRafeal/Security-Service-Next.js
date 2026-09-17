'use client';

import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ScrollStack.css';

export const ScrollStackContext = createContext({
  goNext: () => {},
  goPrev: () => {},
  activeIndex: 0,
  totalCards: 0
});

export const useScrollStack = () => useContext(ScrollStackContext);

export const ScrollStackItem = ({ children, className = '', ...rest }) => (
  <div className={`h-full flex flex-col ${className}`.trim()} {...rest}>
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  autoPlay = true,
  autoPlayInterval = 5000,
  pauseOnHover = true,
  onCardChange
}) => {
  const childrenArray = React.Children.toArray(children);
  const totalCards = childrenArray.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  // Track which single card is currently animating away (only 1 card moves at a time!)
  const [exitingCard, setExitingCard] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const isTransitioningRef = useRef(false);

  // Reset card stack to initial card whenever requested (e.g. logo or Home clicked)
  useEffect(() => {
    const handleReset = () => {
      setActiveIndex(0);
      setExitingCard(null);
      isTransitioningRef.current = false;
      onCardChange?.(0);
    };
    window.addEventListener('reset-hero-card', handleReset);
    return () => window.removeEventListener('reset-hero-card', handleReset);
  }, [onCardChange]);

  const goNext = useCallback(() => {
    if (isTransitioningRef.current || totalCards <= 1) return;
    isTransitioningRef.current = true;
    setDirection('next');

    // 1. Mark current card as exiting so ONLY this card translates
    const current = activeIndex;
    const next = (current + 1) % totalCards;

    setExitingCard(current);
    setActiveIndex(next);
    onCardChange?.(next);

    // 2. Once the single card has completed its slide off-screen, reset exitingCard
    setTimeout(() => {
      setExitingCard(null);
      isTransitioningRef.current = false;
    }, 520);
  }, [activeIndex, totalCards, onCardChange]);

  const goPrev = useCallback(() => {
    if (isTransitioningRef.current || totalCards <= 1) return;
    isTransitioningRef.current = true;
    setDirection('prev');

    const current = activeIndex;
    const prev = (current - 1 + totalCards) % totalCards;

    setExitingCard(current);
    setActiveIndex(prev);
    onCardChange?.(prev);

    setTimeout(() => {
      setExitingCard(null);
      isTransitioningRef.current = false;
    }, 520);
  }, [activeIndex, totalCards, onCardChange]);

  // Auto-cycle through the cards every autoPlayInterval (5 seconds)
  useEffect(() => {
    if (!autoPlay || isHovered || totalCards <= 1) return;

    const timer = setInterval(() => {
      if (document.hidden) return;
      goNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isHovered, totalCards, goNext]);

  // Mouse wheel scroll to advance or reverse
  const handleWheel = (e) => {
    if (isTransitioningRef.current || totalCards <= 1) return;
    if (Math.abs(e.deltaY) < 18) return;

    if (e.deltaY > 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  // Touch swipe support on mobile
  const touchStartYRef = useRef(0);
  const handleTouchStart = (e) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) > 35) {
      if (deltaY > 0) goNext();
      else goPrev();
    }
  };

  // Offset calculation for the 4 background tabs relative to the active card
  const getOffset = (index) => {
    return (index - activeIndex + totalCards) % totalCards;
  };

  return (
    <ScrollStackContext.Provider value={{ goNext, goPrev, activeIndex, totalCards }}>
      <div
        className={`scroll-stack-container relative w-full h-full flex items-start justify-center pt-1 ${className}`.trim()}
        onMouseEnter={() => pauseOnHover && setIsHovered(true)}
        onMouseLeave={() => pauseOnHover && setIsHovered(false)}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Centered Deck Frame - extended wide panoramic rectangular showcase */}
        <div className="relative w-full max-w-[740px] sm:max-w-[820px] lg:max-w-[900px] xl:max-w-[980px] h-[375px] sm:h-[440px] lg:h-[455px]">
          {/* Deck Controls: Safe positioning on mobile with frosted button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous card"
            title="Previous Card"
            className="absolute left-2 sm:-left-7 lg:-left-9 top-1/2 -translate-y-1/2 z-[70] w-8 h-8 sm:w-10 sm:h-10 bg-white/90 sm:bg-transparent shadow-md sm:shadow-none rounded-full flex items-center justify-center text-slate-800 hover:text-amber-600 border border-slate-200/80 sm:border-transparent hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800 hover:text-amber-600 transition-colors" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next card"
            title="Next Card"
            className="absolute right-2 sm:-right-7 lg:-right-9 top-1/2 -translate-y-1/2 z-[70] w-8 h-8 sm:w-10 sm:h-10 bg-white/90 sm:bg-transparent shadow-md sm:shadow-none rounded-full flex items-center justify-center text-slate-800 hover:text-amber-600 border border-slate-200/80 sm:border-transparent hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-800 hover:text-amber-600 transition-colors" />
          </button>

          {/* Mobile indicator dots */}
          <div className="absolute -bottom-5 left-0 right-0 z-50 flex items-center justify-center gap-1.5 sm:hidden">
            {childrenArray.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`h-1.5 rounded-full transition-all ${dotIdx === activeIndex ? 'w-4 bg-amber-500' : 'w-1.5 bg-slate-300'}`}
              />
            ))}
          </div>

          {childrenArray.map((child, i) => {
            const isExiting = exitingCard === i;
            const offset = getOffset(i);
            const isFront = offset === 0;

            // Position tabs:
            // Front card: top = 24px, scale = 1.0
            // Background tabs: top = 18px, 12px, 6px, 0px with subtle scale
            const top = isExiting ? 24 : Math.max(0, (4 - offset) * 6);
            const scale = isExiting ? 1.0 : 1.0 - offset * 0.02;

            // zIndex: The exiting card sits at 60 while it slides away to reveal the front card (50)
            // Background tabs sit at 40, 30, 20, 10
            const zIndex = isExiting ? 60 : (isFront ? 50 : 40 - offset * 10);
            const opacity = (isFront || isExiting) ? 1 : 0.95 - offset * 0.05;

            return (
              <motion.div
                key={child.key || i}
                className="scroll-stack-card"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${top}px`,
                  transformOrigin: 'top center',
                  cursor: isFront ? 'default' : 'pointer'
                }}
                animate={{
                  // CRITICAL: ONLY the exiting card moves! Slides out left or right based on direction
                  x: isExiting ? (direction === 'prev' ? '-108%' : '108%') : 0,
                  opacity: isExiting ? 0 : opacity,
                  scale,
                  zIndex
                }}
                transition={{
                  x: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
                  opacity: { duration: 0.42, ease: 'easeOut' },
                  scale: { duration: 0.2 },
                  top: { duration: 0 }
                }}
                onClick={(e) => {
                  if (e.target.closest('a') || e.target.closest('button')) return;
                  if (!isFront && !isTransitioningRef.current) {
                    goNext();
                  }
                }}
              >
                {child}
              </motion.div>
            );
          })}
        </div>
      </div>
    </ScrollStackContext.Provider>
  );
};

export default ScrollStack;

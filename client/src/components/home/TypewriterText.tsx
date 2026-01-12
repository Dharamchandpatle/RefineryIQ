/**
 * Typewriter Text Component
 * Animated typing effect for hero section
 */

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TypewriterText = ({
  text,
  className = "",
  delay = 0,
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100 + delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-1 h-[1em] bg-current ml-1"
        />
      )}
    </span>
  );
};

export default TypewriterText;

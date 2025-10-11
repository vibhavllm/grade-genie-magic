import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: FlipWordsProps) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWord((current) => {
          const currentIndex = words.indexOf(current);
          return words[(currentIndex + 1) % words.length];
        });
        setIsAnimating(false);
      }, 300);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <span
      className={cn(
        "inline-block font-bold transition-all duration-300",
        isAnimating && "animate-flip-up opacity-0 -translate-y-4",
        !isAnimating && "opacity-100 translate-y-0",
        className
      )}
    >
      {currentWord}
    </span>
  );
};

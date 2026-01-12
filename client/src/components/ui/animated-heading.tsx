/**
 * Animated Heading Component
 * Heading with animated gradient border effect
 * Uses the borderMove animation from tailwind.config.ts
 */

import { cn } from "@/lib/utils";

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const AnimatedHeading = ({
  children,
  className,
  as: Component = "h2",
}: AnimatedHeadingProps) => {
  return (
    <Component
      className={cn(
        "relative inline-block font-orbitron font-bold",
        "bg-gradient-to-r from-[#F37021] via-[#003A8F] to-[#F37021]",
        "bg-clip-text text-transparent",
        "bg-200 animate-borderMove",
        className
      )}
    >
      {children}
    </Component>
  );
};

export default AnimatedHeading;

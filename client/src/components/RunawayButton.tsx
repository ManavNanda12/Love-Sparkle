import { motion, useAnimation } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface RunawayButtonProps {
  children: React.ReactNode;
  onCatch?: () => void; // Just in case they somehow click it!
}

export function RunawayButton({ children, onCatch }: RunawayButtonProps) {
  const controls = useAnimation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Function to move button to random spot
  const runAway = () => {
    if (!buttonRef.current) return;
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get button dimensions
    const rect = buttonRef.current.getBoundingClientRect();
    const buttonWidth = rect.width;
    const buttonHeight = rect.height;
    
    // Calculate safe area (avoiding going off screen)
    // We add a margin of 50px
    const maxX = viewportWidth - buttonWidth - 50;
    const maxY = viewportHeight - buttonHeight - 50;
    const minX = 50;
    const minY = 50;

    // Generate random new position
    // We try to make it far from current cursor if possible, but random is usually enough chaos
    const newX = Math.random() * (maxX - minX) + minX;
    const newY = Math.random() * (maxY - minY) + minY;

    // Convert to relative coordinates from the button's initial flow position?
    // Easier to use fixed positioning or absolute for the runaway effect.
    // However, Framer Motion's `animate` prop handles visual transforms smoothly.
    // But to truly "run away" across the whole screen, we need to break out of flow or use high transform values.
    
    // Let's use simpler logic: random offset from current position, bounded by screen.
    // Actually, setting position state directly is cleaner for "teleporting" look
    // But we want smooth animation.
    
    // Let's calculate a large delta.
    const xOffset = (Math.random() - 0.5) * 400; 
    const yOffset = (Math.random() - 0.5) * 400;

    controls.start({
      x: position.x + xOffset,
      y: position.y + yOffset,
      transition: { duration: 0.3, ease: "easeOut" }
    });
    
    setPosition(prev => ({ x: prev.x + xOffset, y: prev.y + yOffset }));
  };

  return (
    <motion.div
      animate={controls}
      onMouseEnter={runAway}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="inline-block"
      style={{ position: 'relative', zIndex: 50 }}
    >
      <Button 
        ref={buttonRef}
        variant="secondary" 
        size="lg"
        onClick={onCatch}
        className="px-8 py-6 text-xl font-bold bg-white text-gray-500 hover:text-gray-600 hover:bg-gray-100 shadow-md border-2 border-transparent transition-colors duration-200"
      >
        {isHovered ? "No..." : children}
      </Button>
    </motion.div>
  );
}

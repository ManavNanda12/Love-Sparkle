import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: string;
  delay: number;
  duration: number;
  scale: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Create a set of random hearts
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10,
      scale: 0.5 + Math.random() * 1,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-50px] text-primary/20 select-none"
          initial={{ y: 0, opacity: 0, x: 0 }}
          animate={{
            y: -1200, // Move up beyond screen height
            opacity: [0, 0.6, 0],
            x: Math.sin(heart.id) * 50, // Gentle sway
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          style={{
            left: heart.left,
            fontSize: `${heart.scale * 2}rem`,
          }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
}

import { useState } from "react";
import { useCreateResponse } from "@/hooks/use-responses";
import { Button } from "@/components/ui/button";
import { RunawayButton } from "@/components/RunawayButton";
import { FloatingHearts } from "@/components/FloatingHearts";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles } from "lucide-react";

const QUOTES = [
  "You are my today and all of my tomorrows.",
  "I have found the one whom my soul loves.",
  "In all the world, there is no heart for me like yours.",
  "Together is a beautiful place to be.",
  "You make my heart smile.",
];

export default function Proposal() {
  const [step, setStep] = useState<"ask" | "success">("ask");
  const [quote, setQuote] = useState("");
  const createResponse = useCreateResponse();
  const [isPending, setIsPending] = useState(false);

  const handleYes = async () => {
    setIsPending(true);
    
    // Trigger confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ff69b4', '#ffffff'],
        shapes: ['circle', 'square'], // Heart shape is not default, circles work well
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#ff69b4', '#ffffff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Specific heart burst
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff1a1a', '#ff9999'],
      shapes: ['star'], // closest approximation without custom shape
      scalar: 1.5,
    });

    try {
      await createResponse.mutateAsync({ answer: "yes" });
      setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
      setTimeout(() => setStep("success"), 500); // Small delay for effect
    } catch (error) {
      console.error("Failed to record response, but proceeding anyway!", error);
      setStep("success");
    } finally {
      setIsPending(false);
    }
  };

  const handleNoCaught = () => {
    alert("Wow, you're fast! But... try the other button? 😉");
  };

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-background via-white to-secondary overflow-hidden flex flex-col items-center justify-center p-4">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {step === "ask" ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="z-10 w-full max-w-2xl text-center"
          >
            {/* Cute Bear/Character Image - Static placeholder or simple SVG */}
            <motion.div 
              className="mb-8 inline-block"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              {/* Using a Lucide icon composed large, or a placeholder image */}
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-full shadow-xl border-4 border-white inline-flex items-center justify-center">
                 <Heart className="w-24 h-24 text-primary fill-primary/20" strokeWidth={1.5} />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-primary drop-shadow-sm mb-6 leading-tight">
              Will you go out <br className="hidden md:block"/> with me?
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-handwriting mb-12 max-w-lg mx-auto leading-relaxed">
              I've been meaning to ask you this for a while... <br/>
              Can we make some beautiful memories together?
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative h-32 md:h-auto">
              <Button
                size="lg"
                onClick={handleYes}
                disabled={isPending}
                className="px-10 py-8 text-2xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all rounded-2xl w-full md:w-auto min-w-[160px]"
              >
                {isPending ? <Sparkles className="animate-spin mr-2" /> : "Yes! 💖"}
              </Button>

              <div className="relative w-full md:w-auto flex justify-center h-16 md:h-auto items-center">
                <RunawayButton onCatch={handleNoCaught}>
                  No 😢
                </RunawayButton>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
            className="z-10 text-center max-w-3xl p-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                 <Heart className="w-48 h-48 text-primary fill-primary animate-pulse" />
                 <Sparkles className="absolute top-0 right-0 w-12 h-12 text-yellow-400 animate-spin-slow" />
                 <Sparkles className="absolute bottom-4 left-0 w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 font-display">
              Thank You!
            </h1>
            
            <p className="text-2xl md:text-3xl text-primary font-medium mb-8">
              You've made me the happiest person! 🥰
            </p>

            <motion.div 
              className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50 max-w-xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl font-handwriting text-gray-700 italic leading-loose">
                "{quote}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

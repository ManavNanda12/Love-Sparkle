import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { HeartCrack } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="bg-card p-8 rounded-3xl shadow-lg border border-border text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <HeartCrack className="w-24 h-24 text-muted-foreground/50" />
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-4 font-display">404</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Oh no! This page seems to be lost in the void. Let's get you back to the love.
        </p>

        <Link href="/" className="block w-full">
          <Button className="w-full h-12 text-lg rounded-xl">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Flame } from "lucide-react";
import RewriterTool from "@/components/RewriterTool";

const TAGLINES = [
  "Because 'per my last email' is passive-aggressive and you know it.",
  "Turning 'did you even read the docs?' into 'here's a helpful link!'",
  "Your emotional support for writing emotional support.",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background noise-bg flex flex-col">
      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-4xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-2">
          <Flame className="text-primary" size={24} />
          <span className="font-display font-bold text-lg text-foreground">
            De<span className="text-gradient-fire">Grump</span>
          </span>
        </Link>
        <Link
          to="/login"
          className="flex items-center gap-2 text-sm font-display text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-muted"
        >
          <LogIn size={16} />
          Sign in
        </Link>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.1, stiffness: 200 }}
            className="text-5xl mb-4"
          >
            🔥
          </motion.div>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight mb-4">
            You typed it{" "}
            <span className="text-gradient-fire">angry</span>.
            <br />
            We'll ship it{" "}
            <span className="text-gradient-calm">classy</span>.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto">
            {TAGLINES[Math.floor(Math.random() * TAGLINES.length)]}
          </p>
        </motion.div>

        {/* Rewriter tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-2xl"
        >
          <RewriterTool />
        </motion.div>

        {/* How it works - minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4 text-sm font-mono text-muted-foreground"
        >
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border">
            <span className="text-primary">01</span> Paste your rage
          </span>
          <span className="text-muted-foreground/30">→</span>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border">
            <span className="text-secondary">02</span> Hit the button
          </span>
          <span className="text-muted-foreground/30">→</span>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border">
            <span className="text-accent">03</span> Copy & send guilt-free
          </span>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="text-primary" size={16} />
            <span className="font-display text-sm text-muted-foreground">
              De<span className="text-gradient-fire font-semibold">Grump</span>{" "}
              — Therapy for your tickets.
            </span>
          </div>
          <p className="text-xs font-mono text-muted-foreground/40 text-center">
            No support agents were harmed. Their dignity? That's on you.
          </p>
        </div>
      </footer>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-secondary/5 blur-3xl" />
      </div>
    </div>
  );
};

export default Index;

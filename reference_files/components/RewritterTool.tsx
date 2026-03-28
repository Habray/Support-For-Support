import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Sparkles, Zap } from "lucide-react";

interface RewriterProps {
  showGreeting?: boolean;
  userName?: string;
}

const PLACEHOLDERS = [
  "\"Hey, I already told you this won't work. Read the docs maybe?\"",
  "\"This is the third time you've asked. I'm begging you.\"",
  "\"That's not a bug, that's a skill issue.\"",
  "\"I literally cannot make this any simpler for you.\"",
  "\"Sure, let me just drop everything for your 47th follow-up.\"",
];

const RewriterTool = ({ showGreeting, userName }: RewriterProps) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [placeholder] = useState(
    () => PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]
  );

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    setOutput("");

    const mockPolite = `Thank you so much for reaching out again! I completely understand how this might be confusing — it's a great question. I'd love to walk you through this step by step to make sure everything clicks. Here's what I'd recommend...\n\nPlease don't hesitate to ask if anything else comes up. I'm always happy to help! 😊`;

    for (let i = 0; i <= mockPolite.length; i++) {
      await new Promise((r) => setTimeout(r, 12));
      setOutput(mockPolite.slice(0, i));
    }
    setIsGenerating(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {showGreeting && userName && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground mb-6 text-lg"
        >
          Welcome back, <span className="text-gradient-fire font-semibold">{userName}</span>. 
          Ready to un-roast some customers? 🫡
        </motion.p>
      )}

      {/* Label */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          💢 Your draft (the spicy version)
        </span>
      </div>

      {/* Input area */}
      <div className="relative group">
        <div className="absolute -inset-[1px] bg-gradient-fire rounded-lg opacity-20 group-focus-within:opacity-50 transition-opacity blur-sm" />
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className="relative w-full bg-card border border-border rounded-lg p-4 text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Character hint */}
      <div className="flex justify-between items-center mt-1.5 px-1">
        <span className="text-xs font-mono text-muted-foreground/40">
          {input.length > 0 && input.length < 20 ? "That's it? Give us more to work with 😅" : ""}
          {input.length >= 200 ? "Wow, you really went off. We got you. 🫣" : ""}
        </span>
        <span className="text-xs font-mono text-muted-foreground/30">
          {input.length > 0 && `${input.length} chars of chaos`}
        </span>
      </div>

      {/* Generate button */}
      <motion.button
        onClick={handleGenerate}
        disabled={!input.trim() || isGenerating}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-3 w-full py-3.5 rounded-lg font-display font-semibold text-lg bg-gradient-fire text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-shadow hover:glow-primary"
      >
        {isGenerating ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Sparkles size={20} />
            </motion.div>
            Removing the sass...
          </>
        ) : (
          <>
            <Zap size={20} />
            Make It Nice™
          </>
        )}
      </motion.button>

      {/* Output area */}
      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            className="mt-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-accent uppercase tracking-widest">
                ✨ The HR-approved version
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-accent transition-colors px-2 py-1 rounded-md hover:bg-muted"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Yoinked! 📋" : "Copy"}
              </button>
            </div>
            <div className="relative">
              <div className="absolute -inset-[1px] bg-gradient-calm rounded-lg opacity-20 blur-sm" />
              <div className="relative bg-card border border-border rounded-lg p-4 font-mono text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {output}
                {isGenerating && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="inline-block w-2 h-4 bg-accent ml-0.5 align-middle"
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RewriterTool;

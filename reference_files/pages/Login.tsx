import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, Eye, EyeOff, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login — replace with real auth later
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background noise-bg flex flex-col items-center justify-center px-6">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <Flame className="text-primary" size={28} />
          <span className="font-display font-bold text-2xl text-foreground">
            De<span className="text-gradient-fire">Grump</span>
          </span>
        </Link>

        {/* Card */}
        <div className="relative">
          <div className="absolute -inset-[1px] bg-gradient-fire rounded-xl opacity-15 blur-sm" />
          <div className="relative bg-card border border-border rounded-xl p-6">
            <h2 className="font-display font-bold text-xl text-foreground mb-1">
              Welcome back, human.
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Sign in to save your polishing history & preferences.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="grumpy@support.com"
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 pr-10 text-sm text-foreground font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3 rounded-lg font-display font-semibold bg-gradient-fire text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-50 transition-shadow hover:glow-primary"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  />
                ) : (
                  <>
                    Let me in <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-5">
              Don't have an account?{" "}
              <span className="text-primary cursor-pointer hover:underline">
                Sign up
              </span>
            </p>
          </div>
        </div>

        <p className="text-center text-xs font-mono text-muted-foreground/40 mt-6">
          Your rudeness is safe with us. Probably.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

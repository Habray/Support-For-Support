"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Flame } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }

  return (
    <div className="noise-bg flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 size-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <Flame className="size-7 text-primary" />
          <span className="font-display text-2xl font-bold text-foreground">
            S<span className="text-gradient-fire">FS</span>
          </span>
        </Link>

        <div className="relative">
          <div className="absolute -inset-px rounded-xl bg-gradient-fire opacity-15 blur-sm" />
          <div className="relative rounded-xl border border-border bg-card p-6 ring-1 ring-foreground/5">
            <h1 className="font-display text-xl font-bold text-foreground">
              Welcome back, human.
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to save your polishing history and preferences.
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="font-mono text-xs tracking-wider text-muted-foreground uppercase"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-10 font-mono"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="font-mono text-xs tracking-wider text-muted-foreground uppercase"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-10 pr-10 font-mono"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "h-auto w-full gap-2 py-3 font-display font-semibold text-primary-foreground",
                  "border-0 bg-gradient-fire glow-primary hover:opacity-95"
                )}
              >
                {isLoading ? (
                  <span
                    className="size-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                    aria-hidden
                  />
                ) : (
                  <>
                    Let me in <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-5 text-center text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
              <span className="cursor-pointer text-primary hover:underline">
                Sign up
              </span>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-xs text-muted-foreground/50">
          Your rudeness is safe with us. Probably.
        </p>
      </div>
    </div>
  );
}

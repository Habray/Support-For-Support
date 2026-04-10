"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { REWRITE_EXAMPLES } from "@/lib/rewrite-placeholders";
import { cn } from "@/lib/utils";

const TYPE_MS = 38;
const PAUSE_BEFORE_LOAD_MS = 450;
const LOADING_MS = 1900;
/** After each polished reply, pause this long before the next draft types (infinite loop). */
const PAUSE_BETWEEN_EXAMPLES_MS = 5000;

type Phase = "typing" | "loading" | "result";

export function RageGraceDemo() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [typedLen, setTypedLen] = useState(0);
  const [activePolished, setActivePolished] = useState("");
  const [copied, setCopied] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const pairIndexRef = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const runLoop = useCallback(() => {
    clearTimers();
    setCopied(false);

    const idx = pairIndexRef.current;
    const pair = REWRITE_EXAMPLES[idx];
    const draft = pair.draft;
    const polished = pair.polished;

    if (reduceMotion) {
      setPhase("result");
      setTypedLen(draft.length);
      setActivePolished(polished);
      return;
    }

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    setPhase("typing");
    setTypedLen(0);

    let i = 0;
    const typeTick = () => {
      i += 1;
      setTypedLen(i);
      if (i < draft.length) {
        schedule(typeTick, TYPE_MS);
      } else {
        schedule(() => {
          setPhase("loading");
          schedule(() => {
            setActivePolished(polished);
            setPhase("result");
            schedule(() => {
              pairIndexRef.current =
                (idx + 1) % REWRITE_EXAMPLES.length;
              runLoop();
            }, PAUSE_BETWEEN_EXAMPLES_MS);
          }, LOADING_MS);
        }, PAUSE_BEFORE_LOAD_MS);
      }
    };
    schedule(typeTick, TYPE_MS);
  }, [clearTimers, reduceMotion]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const el = rootRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        runLoop();
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [runLoop, reduceMotion]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  /** Reduced motion: cycle all examples every 5s, no typing animation. */
  useEffect(() => {
    if (!reduceMotion) return;
    clearTimers();
    pairIndexRef.current = 0;
    const showAt = (i: number) => {
      const p = REWRITE_EXAMPLES[i];
      setPhase("result");
      setTypedLen(p.draft.length);
      setActivePolished(p.polished);
    };
    showAt(0);
    const id = setInterval(() => {
      pairIndexRef.current =
        (pairIndexRef.current + 1) % REWRITE_EXAMPLES.length;
      showAt(pairIndexRef.current);
    }, PAUSE_BETWEEN_EXAMPLES_MS);
    return () => clearInterval(id);
  }, [reduceMotion, clearTimers]);

  async function handleCopyDemo() {
    if (phase !== "result") return;
    if (!activePolished) return;
    await navigator.clipboard.writeText(activePolished);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const showOutput = phase === "result";
  const loading = phase === "loading";
  const idx = pairIndexRef.current;
  const currentDraft = REWRITE_EXAMPLES[idx].draft;
  const inputPreview = currentDraft.slice(0, typedLen);

  return (
    <div
      ref={rootRef}
      className="mx-auto w-full max-w-2xl text-left"
      aria-label="Product demonstration: typing a draft and generating a polite reply"
    >
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-border/80 bg-card/90 shadow-2xl ring-1 ring-foreground/5",
          "backdrop-blur-sm"
        )}
      >
        <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-red-500/70" />
            <span className="size-2.5 rounded-full bg-amber-500/70" />
            <span className="size-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="ml-2 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            SFS — quick demo
          </span>
        </div>

        <div className="space-y-0 p-4 sm:p-5">
          <p className="mb-2 font-mono text-xs tracking-widest text-red-400/90 uppercase">
            Your draft (the spicy version)
          </p>

          <div className="group relative">
            <div className="absolute -inset-px rounded-lg bg-linear-to-r from-orange-500/25 to-red-600/20 opacity-40 blur-sm" />
            <div
              className={cn(
                "relative min-h-[120px] rounded-lg border border-red-500/25 bg-card/90 px-4 py-3 font-mono text-sm leading-relaxed text-foreground",
                "whitespace-pre-wrap ring-0"
              )}
              aria-live="polite"
            >
              {inputPreview}
              {phase === "typing" && (
                <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-primary align-[-2px]" />
              )}
            </div>
          </div>

          <div className="mt-1.5 h-4 px-1 font-mono text-xs text-muted-foreground/50">
            {typedLen > 0 ? `${typedLen} chars of chaos` : ""}
          </div>

          <Button
            type="button"
            disabled={phase === "typing" || loading}
            className={cn(
              "mt-2 h-auto w-full gap-2 rounded-lg border-0 py-3 font-display text-base font-semibold text-white shadow-lg",
              "bg-gradient-cta glow-primary",
              "pointer-events-none opacity-100"
            )}
            aria-hidden
            tabIndex={-1}
          >
            {loading ? (
              <>
                <Sparkles className="size-5 shrink-0 animate-pulse" />
                Removing the sass…
              </>
            ) : (
              <>
                <Zap className="size-5 shrink-0" />
                Make It Nice™
              </>
            )}
          </Button>

          {showOutput && (
            <div className="mt-5 space-y-2 opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs tracking-widest text-accent uppercase">
                  The HR-approved version
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyDemo}
                  className="h-7 shrink-0 gap-1.5 font-mono text-xs text-muted-foreground hover:text-accent"
                >
                  {copied ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
              <div className="relative">
                <div className="absolute -inset-px rounded-lg bg-linear-to-br from-indigo-500/20 via-violet-500/15 to-purple-600/20 opacity-60 blur-sm" />
                <pre className="relative max-h-52 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-card/95 p-4 font-mono text-sm leading-relaxed text-foreground ring-1 ring-foreground/5 sm:max-h-60">
                  {activePolished}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-[11px] text-muted-foreground/60">
        Sample animation — try the real tool above on your own text.
      </p>
    </div>
  );
}

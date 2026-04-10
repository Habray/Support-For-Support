"use client";

import { useState } from "react";
import { Check, Copy, Sparkles, Zap } from "lucide-react";

import { OLLAMA_DEFAULT_MODEL, OLLAMA_DEFAULT_SEED } from "@/lib/ollama-defaults";
import { REWRITE_PLACEHOLDERS } from "@/lib/rewrite-placeholders";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ApiSuccess = {
  ok: true;
  message: string;
  model: string;
  seed: number;
};

type ApiError = { ok: false; error: string };

export function SfsRewriterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  // Fixed for SSR: Math.random() in useState initializer differs server vs client and breaks hydration.
  const placeholder = REWRITE_PLACEHOLDERS[0];

  async function runRewrite() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setOutput(null);
    try {
      const res = await fetch("/api/aiml-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: input,
          model: OLLAMA_DEFAULT_MODEL,
          seed: OLLAMA_DEFAULT_SEED,
        }),
      });
      const data = (await res.json()) as ApiSuccess | ApiError;
      if (!res.ok || !data.ok) {
        setError("error" in data ? data.error : res.statusText);
        return;
      }
      setOutput(data.message);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative z-10 w-full max-w-2xl">
      <p className="mb-2 font-mono text-xs tracking-widest text-red-400/90 uppercase">
        Your draft (the spicy version)
      </p>

      <div className="group relative">
        <div className="absolute -inset-px rounded-lg bg-linear-to-r from-orange-500/25 to-red-600/20 opacity-40 blur-sm transition-opacity group-focus-within:opacity-70" />
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className={cn(
            "relative min-h-[140px] resize-none border-red-500/25 bg-card/90 px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/45 focus-visible:border-red-500/40 focus-visible:ring-orange-500/25"
          )}
        />
      </div>

      <div className="mt-1.5 flex items-center justify-between px-1 font-mono text-xs text-muted-foreground/50">
        <span>
          {input.length > 0 && input.length < 20
            ? "That's it? Give us more to work with."
            : ""}
          {input.length >= 200 ? "Wow, you really went off. We got you." : ""}
        </span>
        <span>
          {input.length > 0 ? `${input.length} chars of chaos` : ""}
        </span>
      </div>

      <Button
        type="button"
        disabled={loading || !input.trim()}
        onClick={runRewrite}
        className={cn(
          "mt-3 h-auto w-full gap-2 rounded-lg border-0 py-3.5 font-display text-base font-semibold text-white shadow-lg",
          "bg-gradient-cta glow-primary hover:opacity-95",
          "focus-visible:ring-orange-400/40 disabled:cursor-not-allowed disabled:opacity-40"
        )}
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

      {error && (
        <div
          className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}

      {output !== null && (
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs tracking-widest text-accent uppercase">
              The HR-approved version
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={!output}
              className="h-7 gap-1.5 font-mono text-xs text-muted-foreground hover:text-accent"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -inset-px rounded-lg bg-linear-to-br from-indigo-500/20 via-violet-500/15 to-purple-600/20 opacity-60 blur-sm" />
            <pre className="relative max-h-72 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-card/95 p-4 font-mono text-sm leading-relaxed text-foreground ring-1 ring-foreground/5">
              {output === "" ? "(empty content)" : output}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { AIML_DEFAULT_MODEL, AIML_DEFAULT_SEED } from "@/lib/aiml-defaults";

type ApiSuccess = {
  ok: true;
  message: string;
  model: string;
  seed: number;
};

type ApiError = { ok: false; error: string };

const EXAMPLE_DRAFT =
  "I can't help you with that. It's against our policy.";

export default function Home() {
  const [userMessage, setUserMessage] = useState(EXAMPLE_DRAFT);
  const [loading, setLoading] = useState(false);
  const [assistant, setAssistant] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runTest() {
    setLoading(true);
    setError(null);
    setAssistant(null);
    try {
      const res = await fetch("/api/aiml-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage,
          model: AIML_DEFAULT_MODEL,
          seed: AIML_DEFAULT_SEED,
        }),
      });
      const data = (await res.json()) as ApiSuccess | ApiError;
      if (!res.ok || !data.ok) {
        setError("error" in data ? data.error : res.statusText);
        return;
      }
      setAssistant(data.message);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
      <main className="w-full max-w-lg space-y-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Support message rewriter
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Paste a draft reply. The model rewrites it to sound polite and
            empathetic for live chat, keeping the same meaning. Uses{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              AIMLAPI_KEY
            </code>{" "}
            on the server.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950/50">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Request defaults
          </p>
          <dl className="mt-2 space-y-2 text-sm">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
              <dt className="shrink-0 font-medium text-zinc-700 dark:text-zinc-300">
                Model
              </dt>
              <dd>
                <code className="break-all rounded bg-white px-2 py-1 text-xs text-zinc-900 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700">
                  {AIML_DEFAULT_MODEL}
                </code>
              </dd>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
              <dt className="shrink-0 font-medium text-zinc-700 dark:text-zinc-300">
                Seed
              </dt>
              <dd>
                <code className="rounded bg-white px-2 py-1 text-xs text-zinc-900 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700">
                  {AIML_DEFAULT_SEED}
                </code>
              </dd>
            </div>
          </dl>
        </div>

        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Original draft to rewrite
            </span>
            <textarea
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
              rows={5}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Paste the message you want softened for chat…"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={runTest}
          disabled={loading || !userMessage.trim()}
          className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {loading ? "Rewriting…" : "Rewrite message"}
        </button>

        {error && (
          <div
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200"
            role="alert"
          >
            {error}
          </div>
        )}

        {assistant !== null && (
          <div className="space-y-1.5">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Rewritten message
            </span>
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
              {assistant === "" ? "(empty content)" : assistant}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}

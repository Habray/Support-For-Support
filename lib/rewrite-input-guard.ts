/**
 * Cheap pre-filter before the model runs. Catches obvious off-task prompts;
 * the model still self-validates for edge cases.
 */
const MISUSE_PHRASES = [
  "write an essay",
  "write me a poem",
  "write a poem",
  "write me a story",
  "write a story",
  "tell me a story",
  "explain quantum",
  "quantum physics",
  "write code",
  "generate code",
  "ignore previous",
  "ignore all previous",
  "disregard the above",
  "new instructions:",
  "ignore the above",
];

export function isValidRewriteInput(text: string): boolean {
  const lower = text.toLowerCase();
  return !MISUSE_PHRASES.some((p) => lower.includes(p));
}

/** Exact refusal line the model must emit for non-rewrite input. */
export const INVALID_REWRITE_SENTINEL = "Invalid input";

export function isModelInvalidRewriteRefusal(text: string): boolean {
  const t = text.trim().replace(/\.$/, "");
  return t.toLowerCase() === INVALID_REWRITE_SENTINEL.toLowerCase();
}

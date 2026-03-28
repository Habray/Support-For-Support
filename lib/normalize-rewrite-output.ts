/** Strips common model artifacts (labels, wrapping quotes) from rewrite output. */
export function normalizeRewriteOutput(raw: string): string {
  let t = raw.trim();
  t = t.replace(
    /^\s*(?:\*\*)?\s*(?:Revised|Rewritten)\s+Message\s*(?:\*\*)?\s*:\s*/i,
    ""
  );
  t = t.trim();
  if (t.length >= 2) {
    if (t.startsWith('"') && t.endsWith('"')) {
      t = t.slice(1, -1).trim();
    } else if (t.startsWith("'") && t.endsWith("'")) {
      t = t.slice(1, -1).trim();
    }
  }
  return t;
}

import { Ollama } from "ollama";
import { NextResponse } from "next/server";
import { OLLAMA_DEFAULT_MODEL, OLLAMA_DEFAULT_SEED } from "@/lib/ollama-defaults";
import { normalizeRewriteOutput } from "@/lib/normalize-rewrite-output";
import {
  isModelInvalidRewriteRefusal,
  isValidRewriteInput,
} from "@/lib/rewrite-input-guard";
import { SUPPORT_REWRITE_SYSTEM_PROMPT } from "@/lib/support-rewrite-system-prompt";

const OLLAMA_HOST = "https://ollama.com";

export async function POST(request: Request) {
  const apiKey = process.env.OLLAMA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "OLLAMA_API_KEY is not set in .env" },
      { status: 500 }
    );
  }

  let body: { userMessage?: string; model?: string; seed?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const draft = (body.userMessage ?? "").trim();
  if (!draft) {
    return NextResponse.json(
      { ok: false, error: "Message to rewrite is required." },
      { status: 400 }
    );
  }

  if (!isValidRewriteInput(draft)) {
    return NextResponse.json(
      { ok: false, error: "Only rewriting support drafts is allowed." },
      { status: 400 }
    );
  }

  const model =
    (body.model ?? OLLAMA_DEFAULT_MODEL).trim() || OLLAMA_DEFAULT_MODEL;
  const seed =
    typeof body.seed === "number" && Number.isFinite(body.seed)
      ? body.seed
      : OLLAMA_DEFAULT_SEED;

  const messages = [
    { role: "system" as const, content: SUPPORT_REWRITE_SYSTEM_PROMPT },
    { role: "user" as const, content: draft },
  ];

  const ollama = new Ollama({
    host: OLLAMA_HOST,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  try {
    const stream = await ollama.chat({
      model,
      messages,
      stream: true,
      options: { seed },
    });

    let raw = "";
    for await (const chunk of stream) {
      raw += chunk.message?.content ?? "";
    }

    const message = normalizeRewriteOutput(raw);
    if (isModelInvalidRewriteRefusal(message)) {
      return NextResponse.json(
        { ok: false, error: "Only rewriting support drafts is allowed." },
        { status: 400 }
      );
    }
    return NextResponse.json({
      ok: true,
      message,
      model,
      seed,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error calling the API";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}

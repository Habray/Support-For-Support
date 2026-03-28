import OpenAI from "openai";
import { NextResponse } from "next/server";
import { AIML_DEFAULT_MODEL, AIML_DEFAULT_SEED } from "@/lib/aiml-defaults";
import { normalizeRewriteOutput } from "@/lib/normalize-rewrite-output";
import { SUPPORT_REWRITE_SYSTEM_PROMPT } from "@/lib/support-rewrite-system-prompt";

const BASE_URL = "https://ai.aimlapi.com";

export async function POST(request: Request) {
  const apiKey = process.env.AIMLAPI_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "AIMLAPI_KEY is not set in .env" },
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

  const model = (body.model ?? AIML_DEFAULT_MODEL).trim() || AIML_DEFAULT_MODEL;
  const seed =
    typeof body.seed === "number" && Number.isFinite(body.seed)
      ? body.seed
      : AIML_DEFAULT_SEED;

  const messages = [
    { role: "system" as const, content: SUPPORT_REWRITE_SYSTEM_PROMPT },
    { role: "user" as const, content: draft },
  ];

  const api = new OpenAI({
    baseURL: BASE_URL,
    apiKey,
  });

  try {
    const result = await api.chat.completions.create({
      model,
      messages,
      seed,
    });

    const raw = result.choices[0]?.message?.content ?? "";
    const message = normalizeRewriteOutput(raw);
    return NextResponse.json({
      ok: true,
      message,
      model,
      seed,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error calling the API";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 502 }
    );
  }
}

import { Agent, fetch as undiciFetch } from "undici";
import {
  certifications,
  education,
  experience,
  languages,
  links,
  profile,
  skillGroups,
} from "@/lib/content";

export const runtime = "nodejs";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://aleexsilva.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// WSL2 / corporate-network fix: Node v24's built-in fetch (undici) does not
// pick up the system CA store. We use undici explicitly with a custom agent
// that disables server-cert verification only for OpenRouter API calls.
// In production (Vercel / a real server with trusted certs) flip this off.
const openRouterAgent = new Agent({
  connect: { rejectUnauthorized: process.env.NODE_ENV === "production" },
});

// Primary model — as requested. Override with OPENROUTER_MODEL if desired.
const PRIMARY_MODEL =
  process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";

// Free fallbacks used ONLY when the primary is rate-limited/unavailable,
// so the Digital Twin keeps answering. Primary is always tried first.
const FALLBACK_MODELS = [
  "openai/gpt-oss-120b:free",
  "google/gemma-4-31b-it:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "openai/gpt-oss-20b:free",
];

const MODELS = [PRIMARY_MODEL, ...FALLBACK_MODELS];
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

type ChatMessage = { role: "user" | "assistant"; content: string };

/** Build a compact knowledge base for the system prompt from site content. */
function buildKnowledge(): string {
  const exp = experience
    .map(
      (e) =>
        `- ${e.title} at ${e.company} (${e.period}, ${e.location})${
          e.current ? " [current role]" : ""
        }\n  ${e.highlights.map((h) => `• ${h}`).join("\n  ")}`,
    )
    .join("\n");

  const edu = education
    .map((e) => `- ${e.degree} in ${e.field}, ${e.school} (${e.period})`)
    .join("\n");

  const skills = skillGroups
    .map((g) => `- ${g.category}: ${g.items.join(", ")}`)
    .join("\n");

  const langs = languages.map((l) => `${l.name} (${l.level})`).join(", ");

  return `PROFILE
Name: ${profile.name}
Role: ${profile.role} — ${profile.headline}
Location: ${profile.location}
Summary: ${profile.summary}

EXPERIENCE
${exp}

EDUCATION
${edu}

SKILLS
${skills}

CERTIFICATIONS
${certifications.map((c) => `- ${c}`).join("\n")}

LANGUAGES
${langs}

LINKS
- Portfolio: ${links.portfolio}
- LinkedIn: ${links.linkedin}
- Email: ${links.email}`;
}

const SYSTEM_PROMPT = `You are the "Digital Twin" of ${profile.name} — an AI version of Alex that speaks in the first person ("I", "my") as if you are Alex himself, answering questions about his professional background and career.

Use ONLY the information in the knowledge base below. Ground every answer in it.

Style:
- Warm, confident, and professional — like a sharp consultant talking about their own work.
- Concise: 1–3 short paragraphs or a tight bulleted list. Avoid filler.
- If asked something not covered (e.g. salary, personal/private matters, or facts not in the knowledge base), say you don't have that detail here and point them to connect via LinkedIn or email.
- Never invent employers, dates, metrics, or technologies that aren't listed.
- You may reasonably synthesize and summarize across roles, but stay truthful to the facts.

KNOWLEDGE BASE
${buildKnowledge()}`;

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Server is missing OPENROUTER_API_KEY." },
      { status: 500 },
    );
  }

  let messages: ChatMessage[] = [];
  try {
    const body = await request.json();
    if (Array.isArray(body?.messages)) {
      messages = body.messages
        .filter(
          (m: unknown): m is ChatMessage =>
            !!m &&
            typeof (m as ChatMessage).content === "string" &&
            ((m as ChatMessage).role === "user" ||
              (m as ChatMessage).role === "assistant"),
        )
        .slice(-12) // cap history
        .map((m: ChatMessage) => ({
          role: m.role,
          content: m.content.slice(0, 4000),
        }));
    }
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (messages.length === 0) {
    return Response.json({ error: "No message provided." }, { status: 400 });
  }

  function callOpenRouter(model: string): Promise<Response> {
    return undiciFetch(OPENROUTER_URL, {
      dispatcher: openRouterAgent,
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Alex Silva - Digital Twin",
      },
      body: JSON.stringify({
        model,
        stream: true,
        temperature: 0.6,
        max_tokens: 700,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    }) as unknown as Promise<Response>;
  }

  // Try the primary model first, then fall back through free models on
  // rate-limit / unavailability so the Twin keeps answering.
  let upstream: Response | null = null;
  let usedModel = "";
  let lastStatus = 0;

  for (const model of MODELS) {
    let res: Response;
    try {
      res = await callOpenRouter(model);
    } catch (err) {
      console.error(`[api/chat] fetch failed for ${model}:`, err);
      lastStatus = 0;
      continue;
    }

    if (res.ok && res.body) {
      upstream = res;
      usedModel = model;
      break;
    }

    lastStatus = res.status;
    const detail = await res.text().catch(() => "");
    console.error(`[api/chat] ${model} → ${res.status}:`, detail.slice(0, 200));
    // 429/5xx → try next model; other errors (e.g. 400/401) → stop.
    if (res.status !== 429 && res.status < 500) break;
  }

  if (!upstream || !upstream.body) {
    const friendly =
      lastStatus === 429
        ? "The AI models are busy right now (rate-limited upstream). Please try again in a few seconds."
        : lastStatus === 0
          ? "Could not reach the AI service."
          : `AI service error (${lastStatus}). Please try again.`;
    return Response.json({ error: friendly }, { status: 502 });
  }

  console.log(`[api/chat] answering with model: ${usedModel}`);

  // Transform OpenRouter's SSE stream into a plain-text token stream.
  const upstreamBody = upstream.body;
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstreamBody.getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const raw of lines) {
            const line = raw.trim();
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const delta = json?.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // ignore keep-alive / non-JSON comment lines
            }
          }
        }
      } catch {
        // upstream interrupted — close gracefully
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
      "X-Model": usedModel,
    },
  });
}

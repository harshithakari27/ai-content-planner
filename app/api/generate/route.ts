import { NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error("❌ GROQ KEY MISSING");
    return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
  }

  try {
    const { prompt } = await req.json();

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a viral content strategist. Generate creative, attention-grabbing video hooks that are concise and compelling.",
          },
          {
            role: "user",
            content: `Give me 3 viral video hooks for the niche: ${prompt}`,
          },
        ],
        temperature: 0.9,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ Groq API error:", response.status, errorData);

      if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit reached. Please wait a moment and try again." },
          { status: 429 }
        );
      }

      throw new Error(
        errorData?.error?.message || `Groq API returned ${response.status}`
      );
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "No response generated.";

    console.log("✅ Groq response received successfully");
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("❌ GROQ ERROR:", error.message);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "This endpoint accepts POST requests only. Send JSON with { prompt }." },
    { status: 405 }
  );
}
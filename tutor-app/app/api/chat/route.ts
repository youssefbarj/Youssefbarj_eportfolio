import { NextResponse } from "next/server"

const CEREBRAS_API_KEY = "csk-rjk5ewnyjttnwmxdnnjftc6k3k4pdppjnhf98fhcrte95hnt"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CEREBRAS_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3.1-8b",
        stream: true,
        max_tokens: 1024,
        temperature: 0.2,
        top_p: 1,
        messages: body.messages,
      }),
    })

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
  }
}


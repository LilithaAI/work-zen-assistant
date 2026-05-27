import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getModel } from "@/lib/ai-gateway.server";

const SYSTEM = `You are an AI Workplace Productivity Assistant. Help professionals with email drafting, meeting notes, task planning, and research. Be concise, structured, and use markdown. Always be honest about limitations.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages: UIMessage[] };
        if (!Array.isArray(messages)) return new Response("Bad request", { status: 400 });
        const result = streamText({
          model: getModel(),
          system: SYSTEM,
          messages: await convertToModelMessages(messages),
        });
        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});

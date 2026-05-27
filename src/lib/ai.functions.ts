import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { getModel } from "./ai-gateway.server";

async function run(system: string, prompt: string) {
  const { text } = await generateText({
    model: getModel(),
    system,
    prompt,
  });
  return { text };
}

const EmailInput = z.object({
  recipient: z.string().max(200),
  purpose: z.string().min(1).max(2000),
  tone: z.enum(["professional", "friendly", "formal", "concise", "persuasive"]),
  context: z.string().max(4000).optional().default(""),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => EmailInput.parse(d))
  .handler(({ data }) =>
    run(
      "You are an expert email writer. Output a complete email with a Subject line, greeting, body, and sign-off. Use markdown.",
      `Recipient: ${data.recipient}\nTone: ${data.tone}\nPurpose: ${data.purpose}\nAdditional context: ${data.context}`,
    ),
  );

const MeetingInput = z.object({
  notes: z.string().min(10).max(20000),
});

export const summarizeMeeting = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => MeetingInput.parse(d))
  .handler(({ data }) =>
    run(
      "You are a meeting notes summarizer. Produce a structured markdown summary with these sections: ## Summary, ## Key Decisions, ## Action Items (with owner if mentioned), ## Open Questions, ## Next Steps.",
      data.notes,
    ),
  );

const TaskInput = z.object({
  goal: z.string().min(3).max(2000),
  deadline: z.string().max(200).optional().default(""),
  constraints: z.string().max(2000).optional().default(""),
});

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => TaskInput.parse(d))
  .handler(({ data }) =>
    run(
      "You are an AI task planner. Break the goal into a prioritized, actionable plan in markdown. Include: ## Overview, ## Milestones, ## Tasks (numbered, with estimated effort), ## Risks, ## Suggested Schedule.",
      `Goal: ${data.goal}\nDeadline: ${data.deadline}\nConstraints: ${data.constraints}`,
    ),
  );

const ResearchInput = z.object({
  topic: z.string().min(3).max(1000),
  depth: z.enum(["overview", "detailed", "comprehensive"]),
});

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ResearchInput.parse(d))
  .handler(({ data }) =>
    run(
      "You are an AI research assistant. Produce a structured markdown briefing with: ## Executive Summary, ## Background, ## Key Points, ## Different Perspectives, ## Open Questions, ## Suggested Next Reads. Be honest about uncertainty and note that information may be outdated.",
      `Topic: ${data.topic}\nDepth: ${data.depth}`,
    ),
  );

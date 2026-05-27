import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, NotebookPen, ListChecks, Search, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { AiDisclaimer } from "@/components/ai-disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Workplace AI" },
      { name: "description", content: "Your AI-powered workplace productivity dashboard." },
    ],
  }),
  component: Dashboard,
});

const tools = [
  { to: "/email", icon: Mail, title: "Smart Email Generator", desc: "Draft polished emails in seconds with tone control." },
  { to: "/meetings", icon: NotebookPen, title: "Meeting Notes Summarizer", desc: "Turn raw notes into action items and decisions." },
  { to: "/tasks", icon: ListChecks, title: "AI Task Planner", desc: "Break goals into prioritized, scheduled tasks." },
  { to: "/research", icon: Search, title: "AI Research Assistant", desc: "Get structured briefings on any topic." },
  { to: "/chat", icon: MessageSquare, title: "AI Chatbot", desc: "Open-ended assistant for anything else." },
] as const;

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-6 md:p-10">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-8 md:p-10">
        <div className="absolute right-6 top-6 hidden h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary md:flex">
          <Sparkles className="h-7 w-7" />
        </div>
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Workplace AI</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Automate the busywork. Focus on the work that matters.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          Five AI-powered tools to help you write, summarize, plan, research, and think — all in one
          clean workspace.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <t.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </div>
            <div className="mt-auto flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition group-hover:opacity-100">
              Open <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </section>

      <AiDisclaimer />
    </div>
  );
}

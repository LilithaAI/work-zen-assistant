# AI Workplace Productivity Assistant

A modern, responsive SaaS-style web application that helps professionals automate everyday workplace tasks with AI. Draft emails, summarize meetings, plan work, run research briefings, and chat with an assistant — all from a single clean dashboard.

---

## ✨ Features

- **📧 Smart Email Generator** — Generate professional emails by specifying recipient, purpose, tone, and context.
- **📝 Meeting Notes Summarizer** — Turn raw meeting notes into structured summaries with decisions, action items, and next steps.
- **✅ AI Task Planner** — Break goals into prioritized milestones, tasks, risks, and a suggested schedule.
- **🔎 AI Research Assistant** — Produce structured research briefings at overview, detailed, or comprehensive depth.
- **💬 AI Chatbot** — Streaming conversational assistant with locally persisted chat history.

All AI outputs are **editable**, support **copy-to-clipboard**, and ship with a **Responsible AI disclaimer**.

---

## 🎨 Design

- Clean, modern, professional SaaS aesthetic ("Cloud White" theme)
- Sidebar navigation with collapsible icon mode
- Fully responsive layout (mobile → desktop)
- Semantic design tokens (OKLCH) defined in `src/styles.css`
- Markdown rendering with `@tailwindcss/typography`

---

## 🛠 Tech Stack

| Layer | Technology |
|------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) v1 (React 19, SSR + server functions) |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Icons | lucide-react |
| AI SDK | `ai`, `@ai-sdk/react`, `@ai-sdk/openai-compatible` |
| Validation | Zod |
| Markdown | `react-markdown` + `@tailwindcss/typography` |
| AI Provider | Lovable AI Gateway (Gemini 3 Flash) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ai-elements/        # Chat UI primitives (conversation, message, prompt-input)
│   ├── ui/                 # shadcn/ui components
│   ├── app-sidebar.tsx     # Sidebar navigation
│   ├── ai-disclaimer.tsx   # Responsible AI notice
│   ├── tool-page.tsx       # Shared tool layout
│   └── tool-output.tsx     # Editable markdown output + copy/regenerate
├── lib/
│   ├── ai-gateway.server.ts  # AI provider setup
│   └── ai.functions.ts       # Server functions: email, meetings, tasks, research
├── routes/
│   ├── __root.tsx          # App shell (sidebar + header)
│   ├── index.tsx           # Dashboard
│   ├── email.tsx           # Smart Email Generator
│   ├── meetings.tsx        # Meeting Summarizer
│   ├── tasks.tsx           # Task Planner
│   ├── research.tsx        # Research Assistant
│   ├── chat.tsx            # AI Chatbot
│   └── api/chat.ts         # Streaming chat endpoint
└── styles.css              # Design tokens & theme
```

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh) (or npm/pnpm)

### Install & run
```bash
bun install
bun run dev
```

Open the preview URL shown in the terminal.

### Build
```bash
bun run build
```

---

## 🔐 Environment

The AI features use the **Lovable AI Gateway**, which is automatically configured when running on Lovable. No manual API key setup is required in the preview.

Server-side variable used:
- `LOVABLE_API_KEY` — provisioned automatically by Lovable Cloud

---

## 🧭 Routes

| Route | Page |
|-------|------|
| `/` | Dashboard |
| `/email` | Smart Email Generator |
| `/meetings` | Meeting Notes Summarizer |
| `/tasks` | AI Task Planner |
| `/research` | AI Research Assistant |
| `/chat` | AI Chatbot |

---

## ⚠️ Responsible AI

Every tool surfaces a disclaimer reminding users that:
- AI-generated content may be inaccurate or incomplete
- Outputs should be reviewed and edited before professional use
- Confidential information should not be shared with the assistant

---

## 📦 Deployment

Deploy directly from Lovable via **Share → Publish**. The app runs on edge functions (Cloudflare Workers compatible).

---

## 📄 License

MIT — feel free to adapt for your own workplace.

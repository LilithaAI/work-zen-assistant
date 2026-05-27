import type { ReactNode } from "react";
import { AiDisclaimer } from "./ai-disclaimer";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  form: ReactNode;
  output: ReactNode;
};

export function ToolPage({ icon, title, description, form, output }: Props) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6 md:p-8">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </header>
      <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">{form}</div>
          <AiDisclaimer />
        </div>
        <div>{output}</div>
      </div>
    </div>
  );
}

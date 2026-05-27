import { Info } from "lucide-react";

export function AiDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-2 rounded-lg border border-border bg-muted/40 p-3 text-xs text-muted-foreground ${className}`}
    >
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <p>
        AI-generated content may be inaccurate or incomplete. Always review and edit outputs before
        using them in professional contexts. Do not share confidential information.
      </p>
    </div>
  );
}

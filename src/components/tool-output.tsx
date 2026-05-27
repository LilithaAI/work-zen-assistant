import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  value: string;
  loading?: boolean;
  onChange?: (v: string) => void;
  onRegenerate?: () => void;
};

export function ToolOutput({ value, loading, onChange, onRegenerate }: Props) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  const copy = async () => {
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!value && !loading) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-10 text-center text-sm text-muted-foreground">
        Your AI-generated output will appear here.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {loading ? "Generating…" : "AI output"}
        </div>
        <div className="flex items-center gap-1">
          {onRegenerate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRegenerate}
              disabled={loading}
              className="h-8"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Regenerate
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditing((e) => !e)}
            disabled={loading}
            className="h-8"
          >
            {editing ? "Preview" : "Edit"}
          </Button>
          <Button variant="ghost" size="sm" onClick={copy} disabled={loading} className="h-8">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
      <div className="p-5">
        {editing ? (
          <Textarea
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              onChange?.(e.target.value);
            }}
            className="min-h-[320px] font-mono text-sm"
          />
        ) : (
          <article className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground">
            <ReactMarkdown>{draft || "*Thinking…*"}</ReactMarkdown>
          </article>
        )}
      </div>
    </div>
  );
}

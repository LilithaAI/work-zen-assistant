import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NotebookPen } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { ToolPage } from "@/components/tool-page";
import { ToolOutput } from "@/components/tool-output";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { summarizeMeeting } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/meetings")({
  head: () => ({ meta: [{ title: "Meeting Summarizer — Workplace AI" }] }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const fn = useServerFn(summarizeMeeting);
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (notes.trim().length < 10) return toast.error("Paste at least a few lines of notes");
    setLoading(true);
    setOutput("");
    try {
      const r = await fn({ data: { notes } });
      setOutput(r.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to summarize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage
      icon={<NotebookPen className="h-5 w-5" />}
      title="Meeting Notes Summarizer"
      description="Turn raw notes or transcripts into clear summaries and action items."
      form={
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="notes">Meeting notes or transcript</Label>
            <Textarea
              id="notes"
              rows={14}
              placeholder="Paste your raw meeting notes here…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <Button onClick={run} disabled={loading} className="w-full">
            {loading ? "Summarizing…" : "Summarize meeting"}
          </Button>
        </div>
      }
      output={<ToolOutput value={output} loading={loading} onChange={setOutput} onRegenerate={run} />}
    />
  );
}

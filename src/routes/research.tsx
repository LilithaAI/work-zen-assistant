import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { ToolPage } from "@/components/tool-page";
import { ToolOutput } from "@/components/tool-output";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { researchTopic } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "Research Assistant — Workplace AI" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const fn = useServerFn(researchTopic);
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState<"overview" | "detailed" | "comprehensive">("detailed");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (topic.trim().length < 3) return toast.error("Enter a topic");
    setLoading(true);
    setOutput("");
    try {
      const r = await fn({ data: { topic, depth } });
      setOutput(r.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to research");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage
      icon={<Search className="h-5 w-5" />}
      title="AI Research Assistant"
      description="Get a structured briefing on any topic. Verify important facts independently."
      form={
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="topic">Topic *</Label>
            <Input id="topic" placeholder="e.g. Trends in B2B SaaS pricing 2025" value={topic} onChange={(e) => setTopic(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Depth</Label>
            <Select value={depth} onValueChange={(v) => setDepth(v as typeof depth)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
                <SelectItem value="comprehensive">Comprehensive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={run} disabled={loading} className="w-full">
            {loading ? "Researching…" : "Research topic"}
          </Button>
        </div>
      }
      output={<ToolOutput value={output} loading={loading} onChange={setOutput} onRegenerate={run} />}
    />
  );
}

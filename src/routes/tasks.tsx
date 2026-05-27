import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { ToolPage } from "@/components/tool-page";
import { ToolOutput } from "@/components/tool-output";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { planTasks } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "Task Planner — Workplace AI" }] }),
  component: TasksPage,
});

function TasksPage() {
  const fn = useServerFn(planTasks);
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [constraints, setConstraints] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (goal.trim().length < 3) return toast.error("Describe your goal");
    setLoading(true);
    setOutput("");
    try {
      const r = await fn({ data: { goal, deadline, constraints } });
      setOutput(r.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to plan tasks");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage
      icon={<ListChecks className="h-5 w-5" />}
      title="AI Task Planner"
      description="Break a goal into a prioritized, scheduled plan."
      form={
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="goal">Goal *</Label>
            <Textarea id="goal" rows={3} placeholder="e.g. Launch v2 marketing site" value={goal} onChange={(e) => setGoal(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dl">Deadline</Label>
            <Input id="dl" placeholder="e.g. End of Q3" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cs">Constraints</Label>
            <Textarea id="cs" rows={3} placeholder="Team size, budget, dependencies…" value={constraints} onChange={(e) => setConstraints(e.target.value)} />
          </div>
          <Button onClick={run} disabled={loading} className="w-full">
            {loading ? "Planning…" : "Generate plan"}
          </Button>
        </div>
      }
      output={<ToolOutput value={output} loading={loading} onChange={setOutput} onRegenerate={run} />}
    />
  );
}

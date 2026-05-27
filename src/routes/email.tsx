import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { ToolPage } from "@/components/tool-page";
import { ToolOutput } from "@/components/tool-output";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateEmail } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — Workplace AI" }] }),
  component: EmailPage,
});

function EmailPage() {
  const fn = useServerFn(generateEmail);
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState<"professional" | "friendly" | "formal" | "concise" | "persuasive">("professional");
  const [purpose, setPurpose] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!purpose.trim()) return toast.error("Please describe the email purpose");
    setLoading(true);
    setOutput("");
    try {
      const r = await fn({ data: { recipient, purpose, tone, context } });
      setOutput(r.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to generate email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage
      icon={<Mail className="h-5 w-5" />}
      title="Smart Email Generator"
      description="Draft professional emails with the right tone, in seconds."
      form={
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="recipient">Recipient</Label>
            <Input id="recipient" placeholder="e.g. Hiring Manager, Sarah from Sales" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as typeof tone)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="concise">Concise</SelectItem>
                <SelectItem value="persuasive">Persuasive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="purpose">Purpose *</Label>
            <Textarea id="purpose" rows={3} placeholder="What is this email about?" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ctx">Extra context (optional)</Label>
            <Textarea id="ctx" rows={3} placeholder="Key points, names, dates…" value={context} onChange={(e) => setContext(e.target.value)} />
          </div>
          <Button onClick={run} disabled={loading} className="w-full">
            {loading ? "Generating…" : "Generate email"}
          </Button>
        </div>
      }
      output={<ToolOutput value={output} loading={loading} onChange={setOutput} onRegenerate={run} />}
    />
  );
}

import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingState } from "@/components/LoadingState";
import { dummyTopicSummary } from "@/lib/dummyData";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

const Summaries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<typeof dummyTopicSummary | null>(null);
  const [topic, setTopic] = useState("");

  const handleGenerate = () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    setIsLoading(true);
    setSummary(null);

    setTimeout(() => {
      setSummary({ ...dummyTopicSummary, topic });
      setIsLoading(false);
      toast.success("Summary generated!");
    }, 2200);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
              Topic Summarization & Highlights
            </h1>
            <p className="text-muted-foreground">
              Generate concise summaries and quick revision checklists
            </p>
          </div>

          <Card className="p-6 shadow-card space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic">Enter Topic or Chapter</Label>
              <Input
                id="topic"
                placeholder="e.g., Newton's Laws of Motion"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <Button onClick={handleGenerate} variant="hero" className="w-full" size="lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Summary
            </Button>
          </Card>

          {isLoading && (
            <Card className="p-8 shadow-card">
              <LoadingState message="Extracting key concepts and creating summary..." />
            </Card>
          )}

          {summary && !isLoading && (
            <Card className="p-8 shadow-card space-y-6 glass-card">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{summary.topic}</h2>
                  <p className="text-muted-foreground">{summary.subject} • {summary.grade}</p>
                </div>
                <Button variant="outline">Download PDF</Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Key Concepts</h3>
                  <div className="space-y-4">
                    {summary.keyConcepts.map((concept, idx) => (
                      <div key={idx} className="border-l-4 border-primary pl-4 py-2">
                        <h4 className="font-semibold text-primary">{concept.law}</h4>
                        <p className="text-sm mt-1">{concept.description}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          <span className="font-medium">Example:</span> {concept.example}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-secondary/50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Important Formulas</h3>
                  <div className="space-y-2">
                    {summary.formulas.map((formula, idx) => (
                      <div key={idx} className="px-4 py-2 bg-card rounded font-mono text-sm">
                        {formula}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Quick Revision Checklist</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {summary.quickRevision.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2">
                        <span className="text-accent font-bold">✓</span>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Summaries;

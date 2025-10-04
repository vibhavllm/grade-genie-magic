import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingState } from "@/components/LoadingState";
import { dummyRubric } from "@/lib/dummyData";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

const Rubrics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rubric, setRubric] = useState<typeof dummyRubric | null>(null);
  const [formData, setFormData] = useState({
    questionTitle: "",
    totalMarks: ""
  });

  const handleGenerate = () => {
    if (!formData.questionTitle || !formData.totalMarks) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setRubric(null);

    setTimeout(() => {
      setRubric({
        ...dummyRubric,
        questionTitle: formData.questionTitle,
        totalMarks: parseInt(formData.totalMarks)
      });
      setIsLoading(false);
      toast.success("Rubric generated!");
    }, 2400);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Rubric Auto-generation
            </h1>
            <p className="text-muted-foreground">
              Create standardized scoring rubrics to ensure fair assessment
            </p>
          </div>

          <Card className="p-6 shadow-card space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question/Task Title</Label>
                <Textarea
                  id="question"
                  placeholder="e.g., Essay: Discuss the impact of climate change..."
                  value={formData.questionTitle}
                  onChange={(e) => setFormData({ ...formData, questionTitle: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="marks">Total Marks</Label>
                <Input
                  id="marks"
                  type="number"
                  placeholder="e.g., 15"
                  value={formData.totalMarks}
                  onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                />
              </div>
            </div>

            <Button onClick={handleGenerate} variant="hero" className="w-full" size="lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Rubric
            </Button>
          </Card>

          {isLoading && (
            <Card className="p-8 shadow-card">
              <LoadingState message="Creating detailed scoring criteria..." />
            </Card>
          )}

          {rubric && !isLoading && (
            <Card className="p-8 shadow-card space-y-6 glass-card">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Scoring Rubric</h2>
                  <p className="text-muted-foreground">{rubric.questionTitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Marks</p>
                  <p className="text-3xl font-bold text-primary">{rubric.totalMarks}</p>
                </div>
              </div>

              <div className="space-y-6">
                {rubric.criteria.map((criterion, idx) => (
                  <div key={idx} className="border rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{criterion.aspect}</h3>
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                        {criterion.maxMarks} marks
                      </span>
                    </div>

                    <div className="space-y-3">
                      {criterion.levels.map((level, lIdx) => (
                        <div key={lIdx} className="flex gap-4 p-3 bg-secondary/30 rounded-lg">
                          <div className="flex-shrink-0">
                            <span className="px-3 py-1 bg-accent/20 text-accent rounded font-semibold text-sm">
                              {level.range}
                            </span>
                          </div>
                          <p className="text-sm">{level.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {rubric.scoringNotes && (
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <h3 className="font-semibold mb-2">Scoring Notes</h3>
                  <p className="text-sm text-muted-foreground">{rubric.scoringNotes}</p>
                </div>
              )}

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">Export Rubric</Button>
                <Button variant="default" className="flex-1">Apply to Question Paper</Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Rubrics;

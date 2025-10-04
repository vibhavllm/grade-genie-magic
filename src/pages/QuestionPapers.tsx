import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingState } from "@/components/LoadingState";
import { dummyQuestionPaper } from "@/lib/dummyData";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

const QuestionPapers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [questionPaper, setQuestionPaper] = useState<typeof dummyQuestionPaper | null>(null);
  const [formData, setFormData] = useState({
    subject: "",
    grade: "",
    totalMarks: "",
    duration: ""
  });

  const handleGenerate = () => {
    if (!formData.subject || !formData.grade || !formData.totalMarks || !formData.duration) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setQuestionPaper(null);

    setTimeout(() => {
      setQuestionPaper({
        ...dummyQuestionPaper,
        title: `${formData.subject} - Final Exam`,
        grade: formData.grade,
        totalMarks: parseInt(formData.totalMarks),
        duration: formData.duration
      });
      setIsLoading(false);
      toast.success("Question paper generated successfully!");
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Model Question Paper Generator
            </h1>
            <p className="text-muted-foreground">
              Create balanced, blueprint-driven exam papers instantly
            </p>
          </div>

          <Card className="p-6 shadow-card space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Input
                  id="grade"
                  placeholder="e.g., Grade 10"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marks">Total Marks</Label>
                <Input
                  id="marks"
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.totalMarks}
                  onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 3 hours"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
            </div>

            <Button onClick={handleGenerate} variant="hero" className="w-full" size="lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Question Paper
            </Button>
          </Card>

          {isLoading && (
            <Card className="p-8 shadow-card">
              <LoadingState message="Crafting your balanced question paper..." />
            </Card>
          )}

          {questionPaper && !isLoading && (
            <Card className="p-8 shadow-card space-y-6 glass-card">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{questionPaper.title}</h2>
                <Button variant="outline">Export as PDF</Button>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Grade</p>
                  <p className="font-semibold">{questionPaper.grade}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Marks</p>
                  <p className="font-semibold">{questionPaper.totalMarks}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{questionPaper.duration}</p>
                </div>
              </div>

              {questionPaper.sections.map((section, idx) => (
                <div key={idx} className="space-y-4 border-l-4 border-primary pl-6">
                  <div>
                    <h3 className="text-xl font-bold text-primary">{section.name}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Marks: {section.marks}</span>
                      <span>Time: {section.timeAllocation}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {section.questions.map((question) => (
                      <div key={question.id} className="bg-card p-4 rounded-lg border">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium">Q{question.id}. {question.question}</p>
                          <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded">
                            {question.marks} marks
                          </span>
                        </div>
                        {question.options && (
                          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                            {question.options.map((opt, oIdx) => (
                              <p key={oIdx}>{opt}</p>
                            ))}
                          </div>
                        )}
                        {question.rubric && (
                          <div className="mt-3 p-3 bg-secondary/30 rounded text-xs">
                            <p className="font-semibold mb-1">Marking Rubric:</p>
                            {question.rubric.map((r, rIdx) => (
                              <p key={rIdx} className="text-muted-foreground">• {r}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-semibold mb-3">Bloom's Taxonomy Distribution</h4>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  {Object.entries(questionPaper.blueprint).map(([level, percentage]) => (
                    <div key={level} className="text-center">
                      <p className="text-muted-foreground capitalize">{level}</p>
                      <p className="text-xl font-bold text-primary">{percentage}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuestionPapers;

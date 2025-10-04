import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingState } from "@/components/LoadingState";
import { dummySubmissionAnalytics } from "@/lib/dummyData";
import { Sparkles, TrendingUp, Users, Clock, Star } from "lucide-react";
import { toast } from "sonner";

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analytics, setAnalytics] = useState<typeof dummySubmissionAnalytics | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState("");

  const handleGenerate = () => {
    if (!selectedAssignment) {
      toast.error("Please select an assignment");
      return;
    }

    setIsLoading(true);
    setAnalytics(null);

    setTimeout(() => {
      setAnalytics(dummySubmissionAnalytics);
      setIsLoading(false);
      toast.success("Analytics generated!");
    }, 2600);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-lime-500 to-cyan-500 bg-clip-text text-transparent">
              Submission Analytics
            </h1>
            <p className="text-muted-foreground">
              Track performance, identify gaps, and drive improvements
            </p>
          </div>

          <Card className="p-6 shadow-card space-y-6">
            <div className="space-y-2">
              <Label>Select Assignment</Label>
              <Select value={selectedAssignment} onValueChange={setSelectedAssignment}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an assignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="algebra">Algebraic Expressions Worksheet</SelectItem>
                  <SelectItem value="geometry">Geometry Problem Set</SelectItem>
                  <SelectItem value="calculus">Calculus Practice Test</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerate} variant="hero" className="w-full" size="lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Analytics
            </Button>
          </Card>

          {isLoading && (
            <Card className="p-8 shadow-card">
              <LoadingState message="Analyzing submission data and generating insights..." />
            </Card>
          )}

          {analytics && !isLoading && (
            <div className="space-y-6">
              <Card className="p-8 shadow-card glass-card">
                <h2 className="text-2xl font-bold mb-6">{analytics.assignmentTitle}</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <Card className="p-4 border-l-4 border-l-primary">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted</p>
                        <p className="text-2xl font-bold">{analytics.submitted}/{analytics.totalStudents}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 border-l-4 border-l-accent">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-8 w-8 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Score</p>
                        <p className="text-2xl font-bold">{analytics.averageScore}%</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 border-l-4 border-l-green-500">
                    <div className="flex items-center gap-3">
                      <Clock className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Time</p>
                        <p className="text-2xl font-bold">{analytics.timeAnalysis.averageTime}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 border-l-4 border-l-purple-500">
                    <div className="flex items-center gap-3">
                      <Star className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Completion</p>
                        <p className="text-2xl font-bold">{analytics.completionRate}%</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Question-wise Analysis</h3>
                    <div className="space-y-3">
                      {analytics.questionAnalysis.map((q: any) => (
                        <Card key={q.questionNumber} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">Question {q.questionNumber}</span>
                            <span className="text-sm">
                              <span className="font-bold">{q.averageScore}</span> / {q.maxScore}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary"
                                  style={{ width: `${q.successRate}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{q.successRate}%</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <span className="font-medium">Common mistakes:</span>{" "}
                              {q.commonMistakes.join(", ")}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Student Feedback</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {analytics.studentFeedback.map((feedback: any, idx: number) => (
                        <Card key={idx} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{feedback.student}</span>
                            <div className="flex gap-0.5">
                              {Array.from({ length: feedback.rating }).map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Card className="p-6 bg-primary/5 border-primary">
                    <h3 className="font-semibold text-lg mb-3">Recommended Actions</h3>
                    <ul className="space-y-2">
                      {analytics.remedialActions.map((action: string, idx: number) => (
                        <li key={idx} className="flex gap-2 text-sm">
                          <span className="text-primary font-bold">→</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">Export Report</Button>
                <Button variant="default" className="flex-1">Schedule Intervention</Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Analytics;

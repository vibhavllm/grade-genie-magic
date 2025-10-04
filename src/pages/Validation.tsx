import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LoadingState } from "@/components/LoadingState";
import { dummyValidationReport } from "@/lib/dummyData";
import { Upload, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const Validation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<typeof dummyValidationReport | null>(null);

  const handleValidate = () => {
    setIsLoading(true);
    setReport(null);

    setTimeout(() => {
      setReport(dummyValidationReport);
      setIsLoading(false);
      toast.success("Validation complete!");
    }, 3500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Blueprint Validation & Calibration
            </h1>
            <p className="text-muted-foreground">
              Validate topic coverage and difficulty distribution
            </p>
          </div>

          <Card className="p-6 shadow-card space-y-6">
            <div className="space-y-2">
              <Label>Upload Question Paper for Validation</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-smooth cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-medium mb-2">Drop your question paper here</p>
                <p className="text-sm text-muted-foreground">or click to browse</p>
                <p className="text-xs text-muted-foreground mt-2">PDF, DOC up to 20MB</p>
              </div>
            </div>

            <Button onClick={handleValidate} variant="hero" className="w-full" size="lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Validate & Analyze
            </Button>
          </Card>

          {isLoading && (
            <Card className="p-8 shadow-card">
              <LoadingState message="Running comprehensive validation checks..." />
            </Card>
          )}

          {report && !isLoading && (
            <div className="space-y-6">
              <Card className="p-8 shadow-card glass-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{report.paperTitle}</h2>
                    <p className="text-muted-foreground">{report.status}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Overall Score</p>
                    <p className={`text-5xl font-bold ${getScoreColor(report.overallScore)}`}>
                      {report.overallScore}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Syllabus Alignment</h3>
                      <span className={`text-2xl font-bold ${getScoreColor(report.syllabusAlignment.score)}`}>
                        {report.syllabusAlignment.score}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {report.syllabusAlignment.coverage.map((topic, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            {topic.included ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-600" />
                            )}
                            {topic.topic}
                          </span>
                          <span className="font-medium">{topic.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Difficulty Distribution</h3>
                      <span className={`text-2xl font-bold ${getScoreColor(report.difficultyDistribution.score)}`}>
                        {report.difficultyDistribution.score}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Easy</span>
                          <span className="font-medium">{report.difficultyDistribution.easy}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500"
                            style={{ width: `${report.difficultyDistribution.easy}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Medium</span>
                          <span className="font-medium">{report.difficultyDistribution.medium}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-500"
                            style={{ width: `${report.difficultyDistribution.medium}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Hard</span>
                          <span className="font-medium">{report.difficultyDistribution.hard}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-500"
                            style={{ width: `${report.difficultyDistribution.hard}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {report.difficultyDistribution.recommendation}
                    </p>
                  </Card>

                  <Card className="p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Duplicate Check</h3>
                      <span className={`text-2xl font-bold ${getScoreColor(report.duplicateCheck.score)}`}>
                        {report.duplicateCheck.score}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{report.duplicateCheck.message}</p>
                  </Card>

                  <Card className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Fairness Check</h3>
                      <span className={`text-2xl font-bold ${getScoreColor(report.fairnessCheck.score)}`}>
                        {report.fairnessCheck.score}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {report.fairnessCheck.issues.map((issue, idx) => (
                        <div key={idx} className="flex gap-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{issue}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">Download Report</Button>
                <Button variant="default" className="flex-1">Apply Recommendations</Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Validation;

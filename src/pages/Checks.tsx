import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingState } from "@/components/LoadingState";
import { sampleFiles } from "@/lib/sampleData";
import { Upload, Sparkles, Shield, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { toast } from "sonner";

const Checks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [inputText, setInputText] = useState("");

  const loadSample = () => {
    setInputText("Sample Question 1: Explain the process of photosynthesis in detail...\n\nSample Question 2: Describe the water cycle...\n\nSample Question 5: Explain the process of photosynthesis including the role of chlorophyll...");
    toast.success("Sample content loaded!");
  };

  const handleCheck = () => {
    if (!inputText.trim()) {
      toast.error("Please provide content to check");
      return;
    }

    setIsLoading(true);
    setResults(null);

    setTimeout(() => {
      setResults({
        plagiarismScore: 8,
        duplicatesFound: 2,
        biasFlags: 1,
        readabilityScore: 82,
        issues: [
          {
            type: "duplicate",
            severity: "medium",
            description: "Question 5 is 87% similar to question in test bank #342",
            location: "Question 5"
          },
          {
            type: "bias",
            severity: "low",
            description: "Gender-specific pronoun usage could be made more inclusive",
            location: "Question 12"
          },
          {
            type: "duplicate",
            severity: "low",
            description: "Partial similarity detected with previous year's paper (45%)",
            location: "Section B"
          }
        ],
        recommendations: [
          "Rephrase Question 5 to ensure uniqueness",
          "Consider using gender-neutral language in Question 12",
          "Review Section B for adequate variation from previous assessments"
        ]
      });
      setIsLoading(false);
      toast.success("Analysis complete!");
    }, 490);
  };

  return (
    <div className="space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-lime-500 bg-clip-text text-transparent">
              Plagiarism & Fairness Checks
            </h1>
            <p className="text-muted-foreground">
              Detect duplicates, bias, and ensure content integrity
            </p>
          </div>

          <Card className="p-6 shadow-card space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">Paste Question Paper Content</Label>
                  <Button variant="outline" size="sm" onClick={loadSample}>
                    <Zap className="h-3 w-3 mr-1" />
                    Load Sample
                  </Button>
                </div>
                <Textarea
                  id="content"
                  placeholder="Paste your questions or assessment content here..."
                  rows={8}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Or Upload Document</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-smooth">
                  <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Click to upload • PDF, DOC, TXT up to 15MB</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast.success(`Using sample file: ${sampleFiles.document}`)}
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Use Sample Document
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={handleCheck} variant="hero" className="w-full" size="lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Run Integrity Checks
            </Button>
          </Card>

          {isLoading && (
            <Card className="p-8 shadow-card">
              <LoadingState message="Scanning for plagiarism, duplicates, and bias..." />
            </Card>
          )}

          {results && !isLoading && (
            <div className="space-y-6">
              <Card className="p-8 shadow-card glass-card space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Integrity Report
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Originality</p>
                    <p className="text-3xl font-bold text-green-600">{100 - results.plagiarismScore}%</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Duplicates</p>
                    <p className="text-3xl font-bold text-yellow-600">{results.duplicatesFound}</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Bias Flags</p>
                    <p className="text-3xl font-bold text-orange-600">{results.biasFlags}</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Readability</p>
                    <p className="text-3xl font-bold text-primary">{results.readabilityScore}</p>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Detected Issues</h3>
                  {results.issues.map((issue: any, idx: number) => (
                    <Card key={idx} className="p-4 border-l-4 border-l-yellow-500">
                      <div className="flex gap-4">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{issue.location}</p>
                            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                              {issue.severity}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{issue.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="p-4 bg-secondary/50 rounded-lg space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="text-sm flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              <Button variant="outline" className="w-full">
                Download Detailed Report
              </Button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Checks;

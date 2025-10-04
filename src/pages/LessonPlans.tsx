import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingState } from "@/components/LoadingState";
import { dummyLessonPlan } from "@/lib/dummyData";
import { Upload, Sparkles } from "lucide-react";
import { toast } from "sonner";

const LessonPlans = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lessonPlan, setLessonPlan] = useState<typeof dummyLessonPlan | null>(null);
  const [formData, setFormData] = useState({
    topic: "",
    grade: "",
    duration: ""
  });

  const handleGenerate = () => {
    if (!formData.topic || !formData.grade || !formData.duration) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setLessonPlan(null);

    setTimeout(() => {
      setLessonPlan({
        ...dummyLessonPlan,
        title: formData.topic,
        grade: formData.grade,
        duration: formData.duration
      });
      setIsLoading(false);
      toast.success("Lesson plan generated successfully!");
    }, 2500);
  };

  const handleEdit = (field: string, value: string) => {
    if (lessonPlan) {
      setLessonPlan({ ...lessonPlan, [field]: value });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Syllabus-aligned Lesson Plans
            </h1>
            <p className="text-muted-foreground">
              Generate comprehensive lesson plans mapped to curriculum outcomes
            </p>
          </div>

          <Card className="p-6 shadow-card space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic / Chapter</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Photosynthesis"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level</Label>
                  <Input
                    id="grade"
                    placeholder="e.g., Grade 8"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 45 minutes"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="syllabus">Upload Syllabus (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-smooth cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOC up to 10MB</p>
                </div>
              </div>
            </div>

            <Button onClick={handleGenerate} variant="hero" className="w-full" size="lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Lesson Plan
            </Button>
          </Card>

          {isLoading && (
            <Card className="p-8 shadow-card">
              <LoadingState message="Creating your personalized lesson plan..." />
            </Card>
          )}

          {lessonPlan && !isLoading && (
            <Card className="p-8 shadow-card space-y-6 glass-card">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Generated Lesson Plan</h2>
                <Button variant="outline">Export as PDF</Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={lessonPlan.title}
                      onChange={(e) => handleEdit('title', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Grade</Label>
                    <Input
                      value={lessonPlan.grade}
                      onChange={(e) => handleEdit('grade', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <Input
                      value={lessonPlan.duration}
                      onChange={(e) => handleEdit('duration', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-semibold">Syllabus Outcomes</Label>
                  <ul className="mt-2 space-y-2">
                    {lessonPlan.syllabusOutcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary">✓</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Label className="text-lg font-semibold">Lesson Phases</Label>
                  <div className="mt-2 space-y-4">
                    {lessonPlan.sections.map((section, idx) => (
                      <div key={idx} className="border-l-4 border-primary pl-4 py-2">
                        <h4 className="font-semibold text-primary">{section.phase}</h4>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                          {section.activities.map((activity, actIdx) => (
                            <li key={actIdx}>• {activity}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-semibold">Resources Required</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lessonPlan.resources.map((resource, idx) => (
                      <span key={idx} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                        {resource}
                      </span>
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

export default LessonPlans;

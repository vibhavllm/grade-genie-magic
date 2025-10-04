import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingState } from "@/components/LoadingState";
import { dummyLessonPlan } from "@/lib/dummyData";
import { sampleData, sampleFiles } from "@/lib/sampleData";
import { Upload, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LessonPlans = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lessonPlan, setLessonPlan] = useState<typeof dummyLessonPlan | null>(null);
  const [formData, setFormData] = useState({
    topic: "",
    grade: "",
    duration: ""
  });

  const loadSample = (index: number) => {
    const sample = sampleData.lessonPlans[index];
    setFormData({
      topic: sample.topic,
      grade: sample.grade,
      duration: sample.duration
    });
    toast.success("Sample data loaded!");
  };

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
    <div className="space-y-8">
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
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-semibold">Quick Demo Data</Label>
              <div className="flex gap-2">
                {sampleData.lessonPlans.map((sample, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => loadSample(idx)}
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    {sample.subject}
                  </Button>
                ))}
              </div>
            </div>

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
                  <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade 8">Grade 8</SelectItem>
                      <SelectItem value="Grade 9">Grade 9</SelectItem>
                      <SelectItem value="Grade 10">Grade 10</SelectItem>
                      <SelectItem value="Grade 11">Grade 11</SelectItem>
                      <SelectItem value="Grade 12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="45 minutes">45 minutes</SelectItem>
                    <SelectItem value="60 minutes">60 minutes</SelectItem>
                    <SelectItem value="90 minutes">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="syllabus">Upload Syllabus (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-smooth">
                  <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast.success(`Using sample file: ${sampleFiles.syllabus}`)}
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Use Sample Syllabus
                  </Button>
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
    </div>
  );
};

export default LessonPlans;

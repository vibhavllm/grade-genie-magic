import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingState } from "@/components/LoadingState";
import { dummyAssignment } from "@/lib/dummyData";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

const Assignments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [assignment, setAssignment] = useState<typeof dummyAssignment | null>(null);
  const [formData, setFormData] = useState({
    studentName: "",
    topic: "",
    masteryLevel: ""
  });

  const handleGenerate = () => {
    if (!formData.studentName || !formData.topic || !formData.masteryLevel) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setAssignment(null);

    setTimeout(() => {
      setAssignment({
        ...dummyAssignment,
        studentName: formData.studentName,
        title: `Personalized Practice: ${formData.topic}`,
        masteryLevel: formData.masteryLevel
      });
      setIsLoading(false);
      toast.success("Adaptive assignment generated!");
    }, 2800);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              Adaptive Assignment Generation
            </h1>
            <p className="text-muted-foreground">
              Create personalized assignments targeting individual learning gaps
            </p>
          </div>

          <Card className="p-6 shadow-card space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Student Name</Label>
                  <Input
                    id="student"
                    placeholder="e.g., Alex Johnson"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic/Chapter</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Quadratic Equations"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Current Mastery Level</Label>
                <Select value={formData.masteryLevel} onValueChange={(value) => setFormData({ ...formData, masteryLevel: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleGenerate} variant="hero" className="w-full" size="lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Adaptive Assignment
            </Button>
          </Card>

          {isLoading && (
            <Card className="p-8 shadow-card">
              <LoadingState message="Analyzing student data and creating personalized questions..." />
            </Card>
          )}

          {assignment && !isLoading && (
            <Card className="p-8 shadow-card space-y-6 glass-card">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{assignment.title}</h2>
                  <p className="text-muted-foreground">For: {assignment.studentName}</p>
                </div>
                <Button variant="outline">Assign to Student</Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-secondary/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Mastery Level</p>
                  <p className="font-semibold">{assignment.masteryLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Questions</p>
                  <p className="font-semibold">{assignment.questions.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Est. Time</p>
                  <p className="font-semibold">{assignment.estimatedTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-semibold">{assignment.dueDate}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Focus Areas (Weak Topics)</h3>
                <div className="flex flex-wrap gap-2">
                  {assignment.weakTopics.map((topic, idx) => (
                    <span key={idx} className="px-3 py-1 bg-destructive/20 text-destructive rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Personalized Questions</h3>
                {assignment.questions.map((q) => (
                  <div key={q.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">Q{q.id}. {q.question}</p>
                      <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded">
                        {q.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Topic: {q.topic}</p>
                    <div className="p-3 bg-secondary/30 rounded text-sm">
                      <p className="font-semibold">💡 Hint:</p>
                      <p className="text-muted-foreground">{q.hint}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Assignments;

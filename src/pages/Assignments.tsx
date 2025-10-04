import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingState } from "@/components/LoadingState";
import { dummyAssignment } from "@/lib/dummyData";
import { sampleData } from "@/lib/sampleData";
import { Sparkles, Zap, Users, BookOpen, TrendingDown, Eye } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const Assignments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [assignment, setAssignment] = useState<any>(null);
  const [showExplore, setShowExplore] = useState(false);
  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    topic: "",
    totalStudents: ""
  });

  const loadSample = (index: number) => {
    const sample = sampleData.classes[index];
    setFormData({
      className: sample.className,
      subject: sample.subject,
      topic: sample.topic,
      totalStudents: sample.students.toString()
    });
    toast.success("Sample data loaded!");
  };

  const handleGenerate = () => {
    if (!formData.className || !formData.subject || !formData.topic) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setAssignment(null);
    setShowExplore(false);

    setTimeout(() => {
      const studentCount = parseInt(formData.totalStudents) || 30;
      setAssignment({
        className: formData.className,
        subject: formData.subject,
        topic: formData.topic,
        totalStudents: studentCount,
        generated: true,
        overview: {
          weakStudents: Math.floor(studentCount * 0.3),
          averageStudents: Math.floor(studentCount * 0.5),
          strongStudents: Math.floor(studentCount * 0.2),
          commonWeakTopics: ["Problem solving", "Application questions", "Complex calculations"]
        }
      });
      setIsLoading(false);
      toast.success("Class assignment generated!");
    }, 2800);
  };

  const mockStudents = [
    { name: "Alex Johnson", score: 65, weakTopics: ["Completing the square", "Word problems"], masteryLevel: "Intermediate" },
    { name: "Sarah Williams", score: 82, weakTopics: ["Complex equations"], masteryLevel: "Advanced" },
    { name: "Michael Chen", score: 58, weakTopics: ["Completing the square", "Factoring", "Word problems"], masteryLevel: "Beginner" },
    { name: "Emma Davis", score: 74, weakTopics: ["Word problems", "Application"], masteryLevel: "Intermediate" },
    { name: "James Wilson", score: 45, weakTopics: ["All topics"], masteryLevel: "Beginner" },
    { name: "Olivia Brown", score: 88, weakTopics: ["Complex word problems"], masteryLevel: "Advanced" },
  ];

  return (
    <div className="space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Adaptive Assignment Generation
          </h1>
          <p className="text-muted-foreground">
            Create personalized assignments for entire classes
          </p>
        </div>

        <Card className="p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between mb-4">
            <Label className="text-base font-semibold">Quick Demo Data</Label>
            <div className="flex gap-2">
              {sampleData.classes.map((sample, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => loadSample(idx)}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  {sample.className}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="class">Class Name</Label>
                <Input
                  id="class"
                  placeholder="e.g., Grade 10-A"
                  value={formData.className}
                  onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic/Chapter</Label>
                <Select value={formData.topic} onValueChange={(value) => setFormData({ ...formData, topic: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleData.topics.map((topic, idx) => (
                      <SelectItem key={idx} value={topic}>{topic}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="students">Total Students</Label>
                <Input
                  id="students"
                  type="number"
                  placeholder="e.g., 30"
                  value={formData.totalStudents}
                  onChange={(e) => setFormData({ ...formData, totalStudents: e.target.value })}
                />
              </div>
            </div>
          </div>

          <Button onClick={handleGenerate} variant="hero" className="w-full" size="lg">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Class Assignments
          </Button>
        </Card>

        {isLoading && (
          <Card className="p-8 shadow-card">
            <LoadingState message="Analyzing class performance and creating personalized assignments..." />
          </Card>
        )}

        {assignment && !isLoading && !showExplore && (
          <Card className="p-8 shadow-card space-y-6 glass-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{assignment.className} - {assignment.topic}</h2>
                <p className="text-muted-foreground">{assignment.subject}</p>
              </div>
              <Button variant="outline" onClick={() => setShowExplore(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Explore Class Data
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  {assignment.totalStudents}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Need Support</p>
                <p className="text-2xl font-bold text-yellow-600">{assignment.overview.weakStudents}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On Track</p>
                <p className="text-2xl font-bold text-green-600">{assignment.overview.averageStudents}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Advanced</p>
                <p className="text-2xl font-bold text-blue-600">{assignment.overview.strongStudents}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-destructive" />
                Common Weak Areas in Class
              </h3>
              <div className="flex flex-wrap gap-2">
                {assignment.overview.commonWeakTopics.map((topic: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-destructive/20 text-destructive rounded-full text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-primary/5 border-primary/20 border rounded-lg">
              <h3 className="font-semibold mb-3">✨ AI Generated Assignments</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Individual assignments have been created for each student based on their performance data and learning gaps.
              </p>
              <div className="flex gap-3">
                <Button variant="default">Download All Assignments</Button>
                <Button variant="outline">Send to Students</Button>
              </div>
            </div>
          </Card>
        )}

        {showExplore && assignment && (
          <Card className="p-8 shadow-card space-y-6 glass-card">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Class Performance Breakdown</h2>
              <Button variant="outline" onClick={() => setShowExplore(false)}>
                Back to Overview
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Individual Student Analysis</h3>
              {mockStudents.map((student, idx) => (
                <Card key={idx} className="p-4 border-l-4" style={{ 
                  borderLeftColor: student.score >= 75 ? 'hsl(142 76% 36%)' : student.score >= 60 ? 'hsl(48 96% 53%)' : 'hsl(0 84% 60%)'
                }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-semibold">{student.name}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          student.masteryLevel === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                          student.masteryLevel === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.masteryLevel}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Current Score</span>
                            <span className="font-medium">{student.score}%</span>
                          </div>
                          <Progress value={student.score} className="h-2" />
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Weak Topics: </span>
                          <span>{student.weakTopics.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4 mr-1" />
                      View Assignment
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="default" className="flex-1">Generate Report</Button>
              <Button variant="outline" className="flex-1">Schedule Intervention</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Assignments;

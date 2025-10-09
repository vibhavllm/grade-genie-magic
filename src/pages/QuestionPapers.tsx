import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingState } from "@/components/LoadingState";
import { RichTextEditor } from "@/components/RichTextEditor";
import { dummyQuestionPaper } from "@/lib/dummyData";
import { sampleData } from "@/lib/sampleData";
import { Sparkles, Zap, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface Chapter {
  name: string;
  weight: number;
}

const QuestionPapers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [questionPaper, setQuestionPaper] = useState<typeof dummyQuestionPaper | null>(null);
  const [editableContent, setEditableContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    grade: "",
    totalMarks: "",
    duration: "",
    books: "",
    syllabus: ""
  });
  const [chapters, setChapters] = useState<Chapter[]>([
    { name: "", weight: 0 }
  ]);

  const loadSample = (index: number) => {
    const sample = sampleData.questionPapers[index];
    setFormData({
      subject: sample.subject,
      grade: sample.grade,
      totalMarks: sample.totalMarks,
      duration: sample.duration,
      books: sample.books,
      syllabus: `${sample.books} - Full Syllabus`
    });
    setChapters(sample.chapters);
    toast.success("Sample data loaded!");
  };

  const addChapter = () => {
    setChapters([...chapters, { name: "", weight: 0 }]);
  };

  const removeChapter = (index: number) => {
    if (chapters.length > 1) {
      setChapters(chapters.filter((_, i) => i !== index));
    }
  };

  const updateChapter = (index: number, field: keyof Chapter, value: string | number) => {
    const updated = [...chapters];
    updated[index] = { ...updated[index], [field]: value };
    setChapters(updated);
  };

  const generateEditableContent = (qp: typeof dummyQuestionPaper) => {
    let html = `<h1 style="text-align: center; font-size: 28px; font-weight: bold; margin-bottom: 20px;">${qp.title}</h1>`;
    html += `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 16px; background: rgba(0,0,0,0.05); border-radius: 8px; margin-bottom: 24px;">`;
    html += `<div><p style="font-size: 14px; color: #666;">Grade</p><p style="font-weight: 600;">${qp.grade}</p></div>`;
    html += `<div><p style="font-size: 14px; color: #666;">Total Marks</p><p style="font-weight: 600;">${qp.totalMarks}</p></div>`;
    html += `<div><p style="font-size: 14px; color: #666;">Duration</p><p style="font-weight: 600;">${qp.duration}</p></div>`;
    html += `</div>`;
    
    qp.sections.forEach((section) => {
      html += `<div style="margin-bottom: 32px; padding-left: 24px; border-left: 4px solid #8b5cf6;">`;
      html += `<h2 style="font-size: 20px; font-weight: bold; color: #8b5cf6; margin-bottom: 8px;">${section.name}</h2>`;
      html += `<p style="font-size: 14px; color: #666; margin-bottom: 16px;">Marks: ${section.marks} | Time: ${section.timeAllocation}</p>`;
      
      section.questions.forEach((question) => {
        html += `<div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 12px;">`;
        html += `<div style="display: flex; justify-content: space-between; margin-bottom: 8px;">`;
        html += `<p style="font-weight: 500;">Q${question.id}. ${question.question}</p>`;
        html += `<span style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${question.marks} marks</span>`;
        html += `</div>`;
        
        if ('options' in question && question.options) {
          html += `<div style="margin-top: 8px;">`;
          (question.options as string[]).forEach((opt) => {
            html += `<p style="font-size: 14px; color: #666; margin: 4px 0;">${opt}</p>`;
          });
          html += `</div>`;
        }
        
        html += `</div>`;
      });
      
      html += `</div>`;
    });
    
    return html;
  };

  const handleGenerate = () => {
    if (!formData.subject || !formData.grade || !formData.totalMarks || !formData.duration) {
      toast.error("Please fill in all fields");
      return;
    }

    const totalWeight = chapters.reduce((sum, ch) => sum + ch.weight, 0);
    if (totalWeight !== 100) {
      toast.error(`Chapter weights must add up to 100% (currently ${totalWeight}%)`);
      return;
    }

    setIsLoading(true);
    setQuestionPaper(null);
    setIsEditing(false);

    setTimeout(() => {
      const qp = {
        ...dummyQuestionPaper,
        title: `${formData.subject} - Final Exam`,
        grade: formData.grade,
        totalMarks: parseInt(formData.totalMarks),
        duration: formData.duration
      };
      setQuestionPaper(qp);
      setEditableContent(generateEditableContent(qp));
      setIsLoading(false);
      toast.success("Question paper generated successfully!");
    }, 440);
  };

  return (
    <div className="space-y-8">
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
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-semibold">Quick Demo Data</Label>
              <div className="flex gap-2">
                {sampleData.questionPapers.map((sample, idx) => (
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="books">Books/Textbooks</Label>
                  <Input
                    id="books"
                    placeholder="e.g., NCERT Mathematics Part 1 & 2"
                    value={formData.books}
                    onChange={(e) => setFormData({ ...formData, books: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="syllabus">Syllabus</Label>
                  <Input
                    id="syllabus"
                    placeholder="e.g., Full Syllabus / Chapters 1-5"
                    value={formData.syllabus}
                    onChange={(e) => setFormData({ ...formData, syllabus: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Chapters & Weights (%)</Label>
                  <Button type="button" onClick={addChapter} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Chapter
                  </Button>
                </div>
                <div className="space-y-2">
                  {chapters.map((chapter, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Chapter name"
                        value={chapter.name}
                        onChange={(e) => updateChapter(index, "name", e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        placeholder="Weight %"
                        value={chapter.weight || ""}
                        onChange={(e) => updateChapter(index, "weight", parseInt(e.target.value) || 0)}
                        className="w-24"
                      />
                      {chapters.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeChapter(index)}
                          className="px-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <p className="text-sm text-muted-foreground">
                    Total: {chapters.reduce((sum, ch) => sum + ch.weight, 0)}% (must be 100%)
                  </p>
                </div>
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
                <div className="flex gap-2">
                  <Button 
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "View Preview" : "Edit Paper"}
                  </Button>
                  <Button variant="outline">Export as PDF</Button>
                </div>
              </div>

{isEditing ? (
                <RichTextEditor content={editableContent} onChange={setEditableContent} />
              ) : (
                <>
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
                </>
              )}
            </Card>
          )}
      </div>
    </div>
  );
};

export default QuestionPapers;

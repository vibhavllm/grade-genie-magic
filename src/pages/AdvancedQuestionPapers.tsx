import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Upload, Plus, X, FileText, Link as LinkIcon, Target } from "lucide-react";
import { toast } from "sonner";
import { LoadingState } from "@/components/LoadingState";

interface Chapter {
  name: string;
  weight: number;
}

interface Section {
  name: string;
  marks: number;
}

const AdvancedQuestionPapers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  
  // Mandatory fields
  const [subject, setSubject] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [duration, setDuration] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  
  // Advanced fields
  const [sections, setSections] = useState<Section[]>([{ name: "", marks: 0 }]);
  const [chapters, setChapters] = useState<Chapter[]>([{ name: "", weight: 0 }]);
  const [courseOutcomes, setCourseOutcomes] = useState("");
  const [urls, setUrls] = useState<string[]>([""]);
  
  // File states
  const [previousPapers, setPreviousPapers] = useState<File[]>([]);
  const [lessonPlans, setLessonPlans] = useState<File[]>([]);
  const [courseMapping, setCourseMapping] = useState<File[]>([]);
  const [notes, setNotes] = useState<File[]>([]);
  const [textbooks, setTextbooks] = useState<File[]>([]);
  const [ppts, setPpts] = useState<File[]>([]);

  const handleFileUpload = (files: FileList | null, setter: React.Dispatch<React.SetStateAction<File[]>>) => {
    if (files) {
      setter(prev => [...prev, ...Array.from(files)]);
      toast.success(`${files.length} file(s) uploaded`);
    }
  };

  const removeFile = (index: number, files: File[], setter: React.Dispatch<React.SetStateAction<File[]>>) => {
    setter(files.filter((_, i) => i !== index));
  };

  const addSection = () => setSections([...sections, { name: "", marks: 0 }]);
  const removeSection = (index: number) => {
    if (sections.length > 1) setSections(sections.filter((_, i) => i !== index));
  };
  const updateSection = (index: number, field: keyof Section, value: string | number) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const addChapter = () => setChapters([...chapters, { name: "", weight: 0 }]);
  const removeChapter = (index: number) => {
    if (chapters.length > 1) setChapters(chapters.filter((_, i) => i !== index));
  };
  const updateChapter = (index: number, field: keyof Chapter, value: string | number) => {
    const updated = [...chapters];
    updated[index] = { ...updated[index], [field]: value };
    setChapters(updated);
  };

  const addUrl = () => setUrls([...urls, ""]);
  const removeUrl = (index: number) => {
    if (urls.length > 1) setUrls(urls.filter((_, i) => i !== index));
  };
  const updateUrl = (index: number, value: string) => {
    const updated = [...urls];
    updated[index] = value;
    setUrls(updated);
  };

  const handleGenerate = () => {
    if (!subject || !maxMarks || !duration || !classLevel || !userPrompt) {
      toast.error("Please fill in all mandatory fields");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Question paper generated successfully!");
    }, 2000);
  };

  const FileUploadSection = ({ 
    label, 
    files, 
    setter, 
    icon: Icon = FileText 
  }: { 
    label: string; 
    files: File[]; 
    setter: React.Dispatch<React.SetStateAction<File[]>>;
    icon?: typeof FileText;
  }) => (
    <div className="space-y-3">
      <Label className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </Label>
      <div className="flex flex-col gap-2">
        <Input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          onChange={(e) => handleFileUpload(e.target.files, setter)}
          className="cursor-pointer"
        />
        {files.length > 0 && (
          <div className="space-y-1">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-secondary/30 rounded-md text-sm">
                <span className="truncate flex-1">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(idx, files, setter)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent">
            Advanced Question Paper Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create comprehensive, context-aware exam papers with AI-powered precision
          </p>
        </div>

        {/* Main Content */}
        <Card className="shadow-elegant border-primary/20 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl">Generate Your Question Paper</CardTitle>
            <CardDescription>
              Fill in the mandatory details, then optionally add advanced configurations for better results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic" className="text-base">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Basic Details
                </TabsTrigger>
                <TabsTrigger value="advanced" className="text-base">
                  <Target className="h-4 w-4 mr-2" />
                  Advanced Options
                </TabsTrigger>
              </TabsList>

              {/* Basic Tab */}
              <TabsContent value="basic" className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-base">
                      Subject <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Mathematics"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="class" className="text-base">
                      Class/Grade <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="class"
                      placeholder="e.g., Grade 10"
                      value={classLevel}
                      onChange={(e) => setClassLevel(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxMarks" className="text-base">
                      Maximum Marks <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="maxMarks"
                      type="number"
                      placeholder="e.g., 100"
                      value={maxMarks}
                      onChange={(e) => setMaxMarks(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-base">
                      Duration <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 3 hours"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prompt" className="text-base">
                    Question Paper Requirements <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe your requirements for the question paper. For example: 'Create a balanced paper covering all chapters with 40% theory and 60% practical questions...'"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    Be specific about question types, difficulty levels, and coverage you need
                  </p>
                </div>
              </TabsContent>

              {/* Advanced Tab */}
              <TabsContent value="advanced" className="space-y-8 animate-fade-in">
                {/* Sections Configuration */}
                <Card className="border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Sections Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label>Define Paper Sections</Label>
                      <Button onClick={addSection} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Section
                      </Button>
                    </div>
                    {sections.map((section, index) => (
                      <div key={index} className="flex gap-3 items-end">
                        <div className="flex-1 space-y-2">
                          <Label>Section Name</Label>
                          <Input
                            placeholder="e.g., Section A - MCQs"
                            value={section.name}
                            onChange={(e) => updateSection(index, "name", e.target.value)}
                          />
                        </div>
                        <div className="w-32 space-y-2">
                          <Label>Marks</Label>
                          <Input
                            type="number"
                            placeholder="Marks"
                            value={section.marks || ""}
                            onChange={(e) => updateSection(index, "marks", parseInt(e.target.value) || 0)}
                          />
                        </div>
                        {sections.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSection(index)}
                            className="mb-0.5"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Chapter Weightage */}
                <Card className="border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Chapter-wise Weightage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label>Chapter Distribution (%)</Label>
                      <Button onClick={addChapter} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Chapter
                      </Button>
                    </div>
                    {chapters.map((chapter, index) => (
                      <div key={index} className="flex gap-3 items-end">
                        <div className="flex-1 space-y-2">
                          <Label>Chapter Name</Label>
                          <Input
                            placeholder="e.g., Algebra"
                            value={chapter.name}
                            onChange={(e) => updateChapter(index, "name", e.target.value)}
                          />
                        </div>
                        <div className="w-32 space-y-2">
                          <Label>Weight %</Label>
                          <Input
                            type="number"
                            placeholder="Weight"
                            value={chapter.weight || ""}
                            onChange={(e) => updateChapter(index, "weight", parseInt(e.target.value) || 0)}
                          />
                        </div>
                        {chapters.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeChapter(index)}
                            className="mb-0.5"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <p className="text-sm text-muted-foreground mt-2">
                      Total Weight: {chapters.reduce((sum, ch) => sum + ch.weight, 0)}%
                    </p>
                  </CardContent>
                </Card>

                {/* Context Documents */}
                <Card className="border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Context Documents
                    </CardTitle>
                    <CardDescription>
                      Upload reference materials to help AI understand context better
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FileUploadSection
                        label="Previous Year Papers"
                        files={previousPapers}
                        setter={setPreviousPapers}
                      />
                      <FileUploadSection
                        label="Lesson Plans"
                        files={lessonPlans}
                        setter={setLessonPlans}
                      />
                      <FileUploadSection
                        label="Course Mapping"
                        files={courseMapping}
                        setter={setCourseMapping}
                      />
                      <FileUploadSection
                        label="Notes"
                        files={notes}
                        setter={setNotes}
                      />
                      <FileUploadSection
                        label="Textbooks"
                        files={textbooks}
                        setter={setTextbooks}
                      />
                      <FileUploadSection
                        label="PowerPoint Presentations"
                        files={ppts}
                        setter={setPpts}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* URLs */}
                <Card className="border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <LinkIcon className="h-5 w-5" />
                      Reference URLs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label>Add Reference Links</Label>
                      <Button onClick={addUrl} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add URL
                      </Button>
                    </div>
                    {urls.map((url, index) => (
                      <div key={index} className="flex gap-3">
                        <Input
                          placeholder="https://example.com/resource"
                          value={url}
                          onChange={(e) => updateUrl(index, e.target.value)}
                          className="flex-1"
                        />
                        {urls.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeUrl(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Course Outcomes */}
                <Card className="border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Course Outcomes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="List the course outcomes or learning objectives that should be addressed in the question paper..."
                      value={courseOutcomes}
                      onChange={(e) => setCourseOutcomes(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Generate Button */}
            <div className="pt-6 border-t">
              <Button 
                onClick={handleGenerate} 
                className="w-full h-12 text-base"
                size="lg"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Question Paper
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-3">
                {activeTab === "basic" 
                  ? "Add advanced options for more precise results" 
                  : "All advanced configurations will be considered"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card className="p-8 shadow-elegant animate-fade-in">
            <LoadingState message="Analyzing context and generating your question paper..." />
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdvancedQuestionPapers;

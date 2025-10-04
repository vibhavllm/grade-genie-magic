import { Header } from "@/components/Header";
import { FeatureCard } from "@/components/FeatureCard";
import { 
  BookOpen, 
  FileText, 
  Target, 
  Lightbulb, 
  CheckSquare, 
  Shield, 
  Search,
  BarChart3 
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Syllabus-aligned Lesson Plans",
      description: "Auto-generate lesson sequences mapped directly to syllabus outcomes and learning objectives.",
      path: "/lesson-plans",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: FileText,
      title: "Model Question Paper Generator",
      description: "Produce balanced, blueprint-driven model papers with sections, marks, and time estimates.",
      path: "/question-papers",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Adaptive Assignment Generation",
      description: "Create personalized practice assignments targeting each student's weak topics.",
      path: "/assignments",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Lightbulb,
      title: "Topic Summarization",
      description: "Generate concise topic summaries, key concepts, and quick revision checklists.",
      path: "/summaries",
      gradient: "from-rose-500 to-orange-500"
    },
    {
      icon: CheckSquare,
      title: "Rubric Auto-generation",
      description: "Suggest per-question rubrics and standardize scoring to reduce variance.",
      path: "/rubrics",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: Shield,
      title: "Blueprint Validation",
      description: "Validate topic coverage and calibrate question difficulty against historical data.",
      path: "/validation",
      gradient: "from-amber-500 to-yellow-500"
    },
    {
      icon: Search,
      title: "Plagiarism & Fairness Checks",
      description: "Run similarity scans, detect duplicates, and flag potential bias issues.",
      path: "/checks",
      gradient: "from-yellow-500 to-lime-500"
    },
    {
      icon: BarChart3,
      title: "Submission Analytics",
      description: "Track submissions, aggregate feedback, and surface actionable analytics.",
      path: "/analytics",
      gradient: "from-lime-500 to-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            AI-Powered Educational Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline assessment creation, validation, and analytics with intelligent automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;

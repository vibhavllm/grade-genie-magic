import { SignIn } from "@clerk/clerk-react";
import { FlipWords } from "@/components/FlipWords";
import { Sparkles, BookOpen, Target, TrendingUp, Shield } from "lucide-react";

const Landing = () => {
  const flipWords = ["AI", "Insight", "Automation", "Personalization", "Intelligence"];
  
  const features = [
    {
      icon: BookOpen,
      title: "Smart Question Papers",
      description: "Generate balanced, syllabus-aligned assessments"
    },
    {
      icon: Target,
      title: "Adaptive Assignments",
      description: "Personalized practice for every student"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track progress and identify learning gaps"
    },
    {
      icon: Shield,
      title: "Automated Validation",
      description: "Ensure quality and consistency"
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero with FlipWords (60%) */}
      <div className="w-[60%] flex flex-col justify-center p-12 bg-background">
        <div className="max-w-3xl">
          {/* Main Hero */}
          <div className="mb-12">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Empower learning through{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent">
                <FlipWords words={flipWords} />
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              The intelligent examination suite that transforms how educators create assessments, 
              track progress, and personalize learning experiences.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="group p-6 rounded-xl border bg-card/50 hover:bg-card hover:shadow-card transition-smooth"
              >
                <div className="mb-3 inline-flex p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-smooth">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Clerk Sign In (40%) */}
      <div className="w-[40%] flex items-center justify-center p-8 bg-gradient-to-br from-secondary via-background to-secondary/50">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="gradient-primary rounded-lg p-2">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-primary">Enstine</span>
            </div>
            <p className="text-muted-foreground">Sign in to continue to your dashboard</p>
          </div>
          
          <SignIn 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-lg border-0 bg-card",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;

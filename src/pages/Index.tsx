import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  FileText, 
  Target, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Clock,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const stats = [
    { label: "Total Assessments", value: "1,247", icon: FileText, change: "+12%", trend: "up" },
    { label: "Active Students", value: "856", icon: Users, change: "+8%", trend: "up" },
    { label: "Avg. Score", value: "78%", icon: TrendingUp, change: "+3%", trend: "up" },
    { label: "Time Saved", value: "124h", icon: Clock, change: "+22%", trend: "up" },
  ];

  const recentActivity = [
    { title: "Mathematics Final Exam", type: "Question Paper", time: "2 hours ago", status: "completed" },
    { title: "Physics - Newton's Laws", type: "Lesson Plan", time: "5 hours ago", status: "completed" },
    { title: "Algebra Practice Set", type: "Assignment", time: "1 day ago", status: "completed" },
    { title: "Chemistry Midterm", type: "Validation", time: "2 days ago", status: "completed" },
  ];

  const quickActions = [
    { 
      title: "Create Lesson Plan", 
      description: "Generate syllabus-aligned teaching materials",
      icon: BookOpen, 
      path: "/lesson-plans",
      gradient: "from-indigo-500 to-purple-500"
    },
    { 
      title: "Generate Questions", 
      description: "Build balanced assessment papers",
      icon: FileText, 
      path: "/question-papers",
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      title: "Adaptive Assignment", 
      description: "Personalized practice for students",
      icon: Target, 
      path: "/assignments",
      gradient: "from-pink-500 to-rose-500"
    },
    { 
      title: "Topic Summary", 
      description: "Quick revision materials",
      icon: Lightbulb, 
      path: "/summaries",
      gradient: "from-rose-500 to-orange-500"
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
        <p className="text-muted-foreground">Here's what's happening with your educational tools today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 shadow-card hover:shadow-glow transition-smooth">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Quick Actions</h3>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action, idx) => (
              <Link key={idx} to={action.path}>
                <div className="group flex items-center gap-4 p-4 rounded-lg border hover:border-primary transition-smooth cursor-pointer hover:shadow-card">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${action.gradient}`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium group-hover:text-primary transition-smooth">{action.title}</p>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Activity</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-4 pb-4 border-b last:border-0">
                <div className="p-2 rounded-lg bg-secondary">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.type}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {activity.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-8 shadow-card bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Explore AI Features</h3>
            <p className="text-muted-foreground mb-4">
              Press <kbd className="px-2 py-1 bg-card rounded border mx-1">⌘</kbd>
              <kbd className="px-2 py-1 bg-card rounded border">K</kbd> to quickly navigate between features
            </p>
          </div>
          <div className="hidden md:block">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-primary-glow">
              <Sparkles className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;

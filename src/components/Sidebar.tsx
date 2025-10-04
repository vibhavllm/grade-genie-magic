import { NavLink } from "react-router-dom";
import { 
  BookOpen, 
  FileText, 
  Target, 
  Lightbulb, 
  CheckSquare, 
  Shield, 
  Search,
  BarChart3,
  Home,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Lesson Plans", icon: BookOpen, path: "/lesson-plans" },
  { name: "Question Papers", icon: FileText, path: "/question-papers" },
  { name: "Assignments", icon: Target, path: "/assignments" },
  { name: "Summaries", icon: Lightbulb, path: "/summaries" },
  { name: "Rubrics", icon: CheckSquare, path: "/rubrics" },
  { name: "Validation", icon: Shield, path: "/validation" },
  { name: "Integrity Checks", icon: Search, path: "/checks" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card/80 backdrop-blur-lg transition-transform">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="gradient-primary rounded-lg p-2">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Enrich & Validate
          </span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="border-t p-4">
          <div className="rounded-lg bg-secondary/50 p-4 text-sm">
            <p className="font-semibold mb-1">Need Help?</p>
            <p className="text-xs text-muted-foreground">
              Press <kbd className="px-1.5 py-0.5 bg-card rounded border">⌘</kbd>
              <kbd className="px-1.5 py-0.5 bg-card rounded border ml-1">K</kbd> for quick navigation
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

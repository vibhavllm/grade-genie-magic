import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
} from "lucide-react";

const commands = [
  { name: "Dashboard", icon: Home, path: "/", keywords: ["home", "main", "overview"] },
  { name: "Lesson Plans", icon: BookOpen, path: "/lesson-plans", keywords: ["syllabus", "teaching", "class"] },
  { name: "Question Papers", icon: FileText, path: "/question-papers", keywords: ["exam", "test", "assessment"] },
  { name: "Assignments", icon: Target, path: "/assignments", keywords: ["homework", "practice", "adaptive"] },
  { name: "Topic Summaries", icon: Lightbulb, path: "/summaries", keywords: ["notes", "revision", "highlights"] },
  { name: "Rubrics", icon: CheckSquare, path: "/rubrics", keywords: ["scoring", "grading", "criteria"] },
  { name: "Validation", icon: Shield, path: "/validation", keywords: ["blueprint", "calibrate", "verify"] },
  { name: "Integrity Checks", icon: Search, path: "/checks", keywords: ["plagiarism", "duplicate", "fairness"] },
  { name: "Analytics", icon: BarChart3, path: "/analytics", keywords: ["data", "insights", "performance"] },
];

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search for a feature..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="AI Features">
          {commands.map((command) => (
            <CommandItem
              key={command.path}
              onSelect={() => handleSelect(command.path)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <command.icon className="h-4 w-4" />
              <span>{command.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

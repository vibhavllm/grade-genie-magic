import { Loader2, Sparkles } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = "Einstein working..." }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <Sparkles className="absolute top-0 right-0 h-4 w-4 text-accent animate-pulse" />
      </div>
      <p className="text-sm font-medium text-muted-foreground animate-pulse">{message}</p>
    </div>
  );
};

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { CommandPalette } from "./CommandPalette";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <CommandPalette />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-64">
          <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card/80 backdrop-blur-lg px-6">
            <h1 className="text-xl font-semibold">AI Educational Tools</h1>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const event = new KeyboardEvent('keydown', {
                  key: 'k',
                  metaKey: true,
                  bubbles: true
                });
                document.dispatchEvent(event);
              }}
            >
              <Search className="h-4 w-4 mr-2" />
              Quick Search
              <kbd className="ml-2 px-1.5 py-0.5 bg-secondary rounded text-xs">⌘K</kbd>
            </Button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

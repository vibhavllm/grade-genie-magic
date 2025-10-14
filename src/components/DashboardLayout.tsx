import { ReactNode, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { CommandPalette } from "./CommandPalette";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { useTelemetry } from "@/hooks/useTelemetry";
import { telemetry } from "@/lib/telemetry";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { trackInteraction } = useTelemetry();

  useEffect(() => {
    // Track clicks globally
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementInfo = target.tagName + (target.id ? `#${target.id}` : '') + 
                         (target.className ? `.${target.className.split(' ')[0]}` : '');
      
      trackInteraction({
        type: 'click',
        target: elementInfo,
      });
    };

    // Track scrolling
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        trackInteraction({
          type: 'scroll',
          value: `${window.scrollY}px`,
        });
      }, 500);
    };

    if (telemetry.getConsent()) {
      document.addEventListener('click', handleClick);
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [trackInteraction]);

  return (
    <>
      <CommandPalette />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-64">
          <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card/80 backdrop-blur-lg px-6">
            <h1 className="text-xl font-semibold">Enrich & Validate</h1>
            <div className="flex items-center gap-4">
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
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10"
                  }
                }}
              />
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

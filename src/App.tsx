import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { DashboardLayout } from "./components/DashboardLayout";
import { ConsentBanner } from "./components/ConsentBanner";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import LessonPlans from "./pages/LessonPlans";
import QuestionPapers from "./pages/QuestionPapers";
import AdvancedQuestionPapers from "./pages/AdvancedQuestionPapers";
import Assignments from "./pages/Assignments";
import Summaries from "./pages/Summaries";
import Rubrics from "./pages/Rubrics";
import Validation from "./pages/Validation";
import Checks from "./pages/Checks";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

const clerkPubKey = "pk_test_Y2xhc3NpYy1oZWRnZWhvZy03My5jbGVyay5hY2NvdW50cy5kZXYk";

const App = () => (
  <ClerkProvider publishableKey={clerkPubKey}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ConsentBanner />
        <BrowserRouter>
          <SignedIn>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/lesson-plans" element={<LessonPlans />} />
                <Route path="/question-papers" element={<QuestionPapers />} />
                <Route path="/question-papers-advanced" element={<AdvancedQuestionPapers />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/summaries" element={<Summaries />} />
                <Route path="/rubrics" element={<Rubrics />} />
                <Route path="/validation" element={<Validation />} />
                <Route path="/checks" element={<Checks />} />
                <Route path="/analytics" element={<Analytics />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardLayout>
          </SignedIn>
          <SignedOut>
            <Routes>
              <Route path="*" element={<Landing />} />
            </Routes>
          </SignedOut>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;

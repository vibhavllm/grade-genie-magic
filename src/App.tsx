import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LessonPlans from "./pages/LessonPlans";
import QuestionPapers from "./pages/QuestionPapers";
import Assignments from "./pages/Assignments";
import Summaries from "./pages/Summaries";
import Rubrics from "./pages/Rubrics";
import Validation from "./pages/Validation";
import Checks from "./pages/Checks";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lesson-plans" element={<LessonPlans />} />
          <Route path="/question-papers" element={<QuestionPapers />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/summaries" element={<Summaries />} />
          <Route path="/rubrics" element={<Rubrics />} />
          <Route path="/validation" element={<Validation />} />
          <Route path="/checks" element={<Checks />} />
          <Route path="/analytics" element={<Analytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

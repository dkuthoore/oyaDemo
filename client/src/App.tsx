import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Lessons from "@/pages/Lessons";
import Layout from "@/components/layout/Layout";
import ChatModal from "@/components/chat/ChatModal";
import InsightModal from "@/components/insights/InsightModal";
import LessonModal from "@/components/lessons/LessonModal";
import FloatingChatButton from "@/components/chat/FloatingChatButton";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard">
        <Layout>
          <Dashboard />
        </Layout>
      </Route>
      <Route path="/lessons">
        <Layout>
          <Lessons />
        </Layout>
      </Route>
      <Route>
        <Landing />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Router />
          <FloatingChatButton />
          <ChatModal />
          <InsightModal />
          <LessonModal />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

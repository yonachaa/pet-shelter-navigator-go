
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto py-6 px-4 max-w-md">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-emergency-dark flex items-center">
              <span className="text-emergency-primary mr-2">Pet</span>Shelter
              <div className="ml-2 h-2 w-2 rounded-full bg-emergency-success animate-pulse-slow"></div>
            </h1>
            <div className="flex items-center space-x-2">
              <div className="text-xs font-medium py-1 px-2 bg-emergency-primary/10 text-emergency-primary rounded-full">
                안전 모드
              </div>
            </div>
          </div>
        </header>
        <div className="mt-4">{children}</div>
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;

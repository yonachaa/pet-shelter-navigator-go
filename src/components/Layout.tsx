
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-50">
      <div className="fixed inset-0 backdrop-blur-xl bg-white/30" />
      <main className="container mx-auto py-4 px-4 mb-20 max-w-md relative">
        <header className="mb-6">
          <div className="flex items-center justify-between backdrop-blur-md bg-white/60 rounded-2xl p-4 shadow-lg border border-white/20">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent mr-2">
                Surf
              </span>
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Woof
              </span>
              <div className="ml-2 h-2 w-2 rounded-full bg-green-400 animate-pulse-slow"></div>
            </h1>
            <div className="flex items-center space-x-2">
              <div className="text-xs font-medium py-1 px-3 bg-white/80 text-sky-600 rounded-full shadow-sm border border-sky-100/50">
                Safe Mode
              </div>
            </div>
          </div>
        </header>
        <div className="space-y-4 relative">{children}</div>
      </main>
      <BottomNav />
      <Toaster />
    </div>
  );
};

export default Layout;

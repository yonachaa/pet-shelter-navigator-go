
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import BottomNav from "./BottomNav";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNav = false }) => {
  return (
    <div className="min-h-screen bg-gradient-mesh">
      <main className="mx-auto py-3 px-4 mb-24 max-w-[430px] relative pt-safe">
        {/* Header — Apple-style glass bar */}
        <header className="mb-5">
          <div className="glass-strong rounded-2xl px-5 py-3.5 flex items-center justify-between">
            <Link to="/" className="flex items-center active:opacity-70 transition-opacity">
              <span className="font-logo text-[22px] bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                SurfWoof
              </span>
            </Link>
            <div className="h-2 w-2 rounded-full bg-success animate-pulse-dot" />
          </div>
        </header>
        <div className="space-y-3.5 relative">{children}</div>
      </main>
      {!hideNav && <BottomNav />}
      <Toaster />
    </div>
  );
};

export default Layout;

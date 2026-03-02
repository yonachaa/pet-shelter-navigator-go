
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
      <main className="mx-auto py-3 px-4 mb-24 max-w-[430px] relative">
        {/* Header — minimal, no box */}
        <header className="mb-5 px-1 py-3 flex items-center justify-between">
          <Link to="/" className="active:opacity-70 transition-opacity">
            <span className="font-logo text-[18px] text-foreground">
              SurfWoof
            </span>
          </Link>
          <div className="h-2 w-2 rounded-full bg-success animate-pulse-dot" />
        </header>
        <div className="space-y-3.5 relative">{children}</div>
      </main>
      {!hideNav && <BottomNav />}
      <Toaster />
    </div>
  );
};

export default Layout;


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
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-4 px-4 mb-20 max-w-md relative">
        <header className="mb-6">
          <div className="flex items-center justify-between bg-card rounded-2xl p-4 shadow-sm border border-border">
            <Link to="/" className="flex items-center">
              <span className="font-logo text-2xl tracking-tight text-foreground">
                SurfWoof
              </span>
            </Link>
          </div>
        </header>
        <div className="space-y-4 relative">{children}</div>
      </main>
      {!hideNav && <BottomNav />}
      <Toaster />
    </div>
  );
};

export default Layout;

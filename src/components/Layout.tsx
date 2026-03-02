
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
        <div className="h-3" />
        <div className="space-y-3.5 relative">{children}</div>
      </main>
      {!hideNav && <BottomNav />}
      <Toaster />
    </div>
  );
};

export default Layout;

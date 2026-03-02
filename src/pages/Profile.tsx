
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, ChevronRight, ArrowLeft, FileCheck, Syringe, BadgeCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import userProfileImg from "@/assets/user-profile.png";
import dogProfileImg from "@/assets/dog-profile.png";

const documents = [
  { name: "Rabies Vaccination Certificate", status: "Verified", date: "2025-08-15", icon: Syringe },
  { name: "DHPP Vaccination Record", status: "Verified", date: "2025-06-20", icon: Syringe },
  { name: "Pet Registration Card", status: "Verified", date: "2024-12-01", icon: BadgeCheck },
  { name: "Microchip ID Record", status: "Verified", date: "2024-11-10", icon: FileCheck },
];

const fadeSlide = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.25, ease: "easeInOut" as const },
};

const Profile = () => {
  const [view, setView] = useState<"main" | "account">("main");

  React.useEffect(() => {
    document.title = "Profile — SurfWoof";
  }, []);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {view === "account" ? (
          <motion.div key="account" {...fadeSlide} className="space-y-3.5">
            <Button variant="ghost" onClick={() => setView("main")} className="pl-0 font-semibold text-[15px] h-10 active:scale-95 transition-transform">
              <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
            </Button>
            <h2 className="text-[20px] font-bold text-foreground tracking-tight">Account Settings</h2>
            
            <Card className="glass-strong rounded-2xl border-0 shadow-apple overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-semibold text-[15px] text-foreground mb-0.5">Pet Documents</h3>
                <p className="text-[12px] text-muted-foreground mb-3.5">Pre-approved for emergency shelters</p>
                <div className="space-y-2">
                  {documents.map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/60 rounded-xl">
                      <div className="w-9 h-9 rounded-[10px] bg-primary/8 flex items-center justify-center shrink-0">
                        <doc.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-foreground truncate">{doc.name}</p>
                        <p className="text-[11px] text-muted-foreground">{doc.date}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-success bg-success/10 px-2 py-[3px] rounded-full shrink-0">
                        ✓ {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-strong rounded-2xl border-0 shadow-apple overflow-hidden">
              <CardContent className="p-4 space-y-2.5">
                <h3 className="font-semibold text-[15px] text-foreground">Emergency Contact</h3>
                {[
                  { label: "Phone", value: "+1 234 567 8900" },
                  { label: "Alt. Contact", value: "+1 234 567 1234" },
                  { label: "Blood Type", value: "O+" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between p-2.5 bg-muted/60 rounded-xl text-[13px]">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div key="main" {...fadeSlide} className="space-y-5">
            {/* Profile header */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-[72px] w-[72px] ring-2 ring-border">
                  <AvatarImage src={userProfileImg} alt="John Doe" className="object-cover" />
                  <AvatarFallback className="bg-muted text-muted-foreground text-xl font-bold">JD</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-8 h-8 rounded-full ring-2 ring-card overflow-hidden">
                  <img src={dogProfileImg} alt="Buddy" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h2 className="text-[20px] font-bold text-foreground tracking-tight">John Doe</h2>
                <p className="text-[14px] text-muted-foreground">& Buddy 🐾</p>
                <p className="text-[12px] text-success font-medium mt-0.5">All documents verified ✓</p>
              </div>
            </div>

            <div className="space-y-2">
              <Card
                className="glass-strong rounded-2xl border-0 shadow-apple cursor-pointer active:scale-[0.98] transition-transform overflow-hidden"
                onClick={() => setView("account")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[10px] bg-muted flex items-center justify-center">
                        <Settings className="h-[18px] w-[18px] text-foreground" />
                      </div>
                      <span className="text-[15px] font-medium text-foreground">Account Settings</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Profile;

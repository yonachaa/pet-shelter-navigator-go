
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Settings, Bell, Shield, ChevronRight, ArrowLeft, FileCheck, Dog, Syringe, BadgeCheck } from "lucide-react";

const documents = [
  { name: "Rabies Vaccination Certificate", status: "Verified", date: "2025-08-15", icon: Syringe },
  { name: "DHPP Vaccination Record", status: "Verified", date: "2025-06-20", icon: Syringe },
  { name: "Pet Registration Card", status: "Verified", date: "2024-12-01", icon: BadgeCheck },
  { name: "Microchip ID Record", status: "Verified", date: "2024-11-10", icon: FileCheck },
];

const Profile = () => {
  const [view, setView] = useState<"main" | "account">("main");

  if (view === "account") {
    return (
      <Layout>
        <div className="space-y-4">
          <Button variant="ghost" onClick={() => setView("main")} className="pl-0 font-bold">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h2 className="text-xl font-bold text-foreground">Account Settings</h2>
          
          <Card className="border-border shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-bold text-foreground mb-1">Pet Documents</h3>
              <p className="text-xs text-muted-foreground mb-4">Pre-approved documents for emergency shelters</p>
              <div className="space-y-3">
                {documents.map((doc, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-secondary rounded-xl">
                    <doc.icon className="h-5 w-5 text-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">Uploaded: {doc.date}</p>
                    </div>
                    <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-full flex-shrink-0">
                      ✓ {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-foreground">Emergency Contact</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-secondary rounded-lg">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-bold text-foreground">+1 234 567 8900</span>
                </div>
                <div className="flex justify-between p-2 bg-secondary rounded-lg">
                  <span className="text-muted-foreground">Alt. Contact</span>
                  <span className="font-bold text-foreground">+1 234 567 1234</span>
                </div>
                <div className="flex justify-between p-2 bg-secondary rounded-lg">
                  <span className="text-muted-foreground">Blood Type</span>
                  <span className="font-bold text-foreground">O+</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Profile header with photos */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-foreground">
              <AvatarFallback className="bg-secondary text-foreground text-xl font-bold">
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            {/* Pet avatar overlapping */}
            <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-secondary border-2 border-card flex items-center justify-center">
              <Dog className="h-4 w-4 text-foreground" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">John Doe</h2>
            <p className="text-sm text-muted-foreground">& Buddy 🐾</p>
            <p className="text-xs text-muted-foreground mt-0.5">All documents verified ✓</p>
          </div>
        </div>

        <div className="space-y-2">
          {[
            { icon: Settings, label: "Account Settings", action: () => setView("account") },
            { icon: Bell, label: "Notifications", action: () => {} },
            { icon: Shield, label: "Privacy & Security", action: () => {} },
          ].map((item, i) => (
            <Card key={i} className="border-border shadow-sm cursor-pointer hover:bg-secondary/50 transition-colors" onClick={item.action}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5 text-foreground" />
                    <span className="text-sm font-bold text-foreground">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

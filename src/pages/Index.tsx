
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import PetProfile from "@/components/PetProfile";
import { EmergencyMap } from "@/components/EmergencyMap";
import ShelterCard from "@/components/ShelterCard";
import VerificationCode from "@/components/VerificationCode";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [isApproved, setIsApproved] = useState(false);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("A7B9C2D4");

  const petData = {
    name: "Buddy",
    breed: "Golden Retriever",
    age: 3,
    specialNeeds: "Has allergies",
  };

  const shelterData = {
    name: "Downtown Emergency Shelter",
    address: "83 Main Street, Downtown",
    capacity: { total: 120, available: 43 },
    petFriendly: true,
    status: "approved" as const,
    facilities: ["Medical Aid", "Water", "Power", "Pet Area", "Showers"],
  };

  useEffect(() => {
    if (isEmergencyMode && !isApproved) {
      const timer = setTimeout(() => {
        setIsApproved(true);
        toast({
          title: "✅ Shelter Approved",
          description: "You are cleared to proceed to Downtown Emergency Shelter.",
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isEmergencyMode, isApproved, toast]);

  const refreshCode = () => {
    const newCode = Math.random().toString(36).substring(2, 6).toUpperCase().padEnd(8, "0").substring(0, 8);
    setVerificationCode(newCode);
    toast({ title: "Code Updated", description: "New verification code generated." });
  };

  const startEmergencyMode = () => {
    setIsEmergencyMode(true);
    toast({ title: "🚨 Emergency Mode", description: "Locating nearest shelters..." });
  };

  return (
    <Layout>
      {!isEmergencyMode ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          {/* Emergency icon with gradient ring */}
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-danger/20 to-danger/5 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-danger" />
            </div>
            <div className="absolute -inset-2 rounded-full border-2 border-danger/20 animate-pulse-dot" />
          </div>
          <h2 className="text-[22px] font-bold text-foreground mb-2 tracking-tight">
            Emergency Evacuation
          </h2>
          <p className="text-[15px] text-muted-foreground mb-10 max-w-[280px] leading-relaxed">
            Safely evacuate with your pet during emergencies
          </p>
          <Button
            onClick={startEmergencyMode}
            className="rounded-2xl h-[52px] px-10 w-full max-w-[320px] text-[16px] font-semibold bg-danger hover:bg-danger/90 text-danger-foreground shadow-apple-lg active:scale-[0.98] transition-transform"
          >
            Activate Emergency Mode
          </Button>
        </div>
      ) : (
        <>
          {/* Status Banner — Glass */}
          <div className={`glass-strong rounded-2xl p-4 flex items-center gap-3 ${
            isApproved 
              ? "ring-1 ring-success/30" 
              : "ring-1 ring-warning/30"
          }`}>
            {isApproved ? (
              <div className="w-9 h-9 rounded-full bg-success/12 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-warning/12 flex items-center justify-center shrink-0">
                <Loader2 className="h-5 w-5 text-warning animate-spin" />
              </div>
            )}
            <div className="min-w-0">
              <p className={`font-semibold text-[13px] ${isApproved ? "text-success" : "text-warning"}`}>
                {isApproved ? "APPROVED — Proceed to Shelter" : "PENDING — Awaiting Approval"}
              </p>
              <p className="text-[12px] text-muted-foreground mt-0.5 leading-snug">
                {isApproved 
                  ? "Your spot has been confirmed. Navigate now." 
                  : "Verifying registration and pet documents..."}
              </p>
            </div>
          </div>

          <PetProfile {...petData} />
          
          <EmergencyMap
            shelterName={shelterData.name}
            distance="1.4 miles"
            eta="15 min"
            isApproved={isApproved}
          />
          
          <ShelterCard {...shelterData} status={isApproved ? "approved" : "pending"} />
          
          <VerificationCode
            code={verificationCode}
            expiresIn="30 min"
            onRefresh={refreshCode}
          />
        </>
      )}
    </Layout>
  );
};

export default Index;

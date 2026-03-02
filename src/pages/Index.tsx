
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
          <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mb-8">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Emergency Evacuation
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xs">
            Safely evacuate with your pet during emergencies
          </p>
          <Button
            onClick={startEmergencyMode}
            variant="destructive"
            className="rounded-xl h-14 px-10 w-full max-w-xs text-base font-bold"
          >
            Activate Emergency Mode
          </Button>
        </div>
      ) : (
        <>
          {/* Status Banner */}
          <div className={`rounded-xl p-4 mb-2 flex items-center space-x-3 ${
            isApproved 
              ? "bg-success/10 border border-success/30" 
              : "bg-warning/10 border border-warning/30"
          }`}>
            {isApproved ? (
              <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
            ) : (
              <Loader2 className="h-6 w-6 text-warning animate-spin flex-shrink-0" />
            )}
            <div>
              <p className={`font-bold text-sm ${isApproved ? "text-success" : "text-warning"}`}>
                {isApproved ? "APPROVED — Proceed to Shelter" : "PENDING — Awaiting Approval"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isApproved 
                  ? "Your spot has been confirmed. Navigate now." 
                  : "Verifying your registration and pet documents..."}
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

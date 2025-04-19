
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import PetProfile from "@/components/PetProfile";
import EmergencyMap from "@/components/EmergencyMap";
import ShelterCard from "@/components/ShelterCard";
import VerificationCode from "@/components/VerificationCode";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [isApproved, setIsApproved] = useState(false);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("A7B9C2D4");

  // Mock data
  const petData = {
    name: "Buddy",
    breed: "Golden Retriever",
    age: 3,
    specialNeeds: "Has allergies",
  };

  const shelterData = {
    name: "Downtown Emergency Shelter",
    address: "83 Main Street, Downtown",
    capacity: {
      total: 120,
      available: 43,
    },
    petFriendly: true,
    status: "approved",
    facilities: ["Medical Aid", "Water", "Power", "Pet Area", "Showers"],
  };

  useEffect(() => {
    if (isEmergencyMode && !isApproved) {
      const timer = setTimeout(() => {
        setIsApproved(true);
        toast({
          title: "Shelter Approved!",
          description: "Please proceed to Downtown Emergency Shelter",
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isEmergencyMode, isApproved, toast]);

  const refreshCode = () => {
    const newCode = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()
      .padEnd(8, "0")
      .substring(0, 8);
    setVerificationCode(newCode);
    toast({
      title: "Code Updated",
      description: "New verification code has been generated",
    });
  };

  const startNavigation = () => {
    const address = encodeURIComponent(shelterData.address);
    window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${address}&travelmode=driving`;
    
    toast({
      title: "Navigation Started",
      description: "Google Maps navigation is starting",
    });
  };

  const startEmergencyMode = () => {
    setIsEmergencyMode(true);
    toast({
      title: "Emergency Mode Activated",
      description: "Searching for nearby shelters...",
    });
  };

  return (
    <Layout>
      {!isEmergencyMode ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 rounded-full bg-emergency-primary/10 flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-emergency-primary"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Emergency Evacuation Service
          </h2>
          <p className="text-gray-500 mb-8 max-w-xs">
            We help you and your pet safely evacuate during emergencies
          </p>
          <Button
            onClick={startEmergencyMode}
            className="bg-emergency-danger hover:bg-emergency-danger/90 text-white rounded-full h-12 px-8 w-full max-w-xs emergency-shadow-hover transition-all"
          >
            Activate Emergency Mode
          </Button>
        </div>
      ) : (
        <>
          {!isApproved && (
            <Alert className="mb-6 border-emergency-warning bg-emergency-warning/10 text-emergency-warning">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Awaiting Shelter Approval</AlertTitle>
              <AlertDescription>
                Please wait while we confirm your shelter assignment.
              </AlertDescription>
            </Alert>
          )}

          <PetProfile {...petData} />
          
          <EmergencyMap
            shelterName={shelterData.name}
            distance="1.4 miles"
            eta="15 min"
            onStartNavigation={startNavigation}
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

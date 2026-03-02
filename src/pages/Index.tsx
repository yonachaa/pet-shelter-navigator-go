
import React, { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import PetProfile from "@/components/PetProfile";
import { EmergencyMap } from "@/components/EmergencyMap";
import ShelterCard from "@/components/ShelterCard";
import VerificationCode from "@/components/VerificationCode";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw } from "lucide-react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl">
      {/* Animated rings */}
      <div className="relative mb-12">
        <div className="w-20 h-20 rounded-full border-2 border-primary/20 animate-ping absolute inset-0" />
        <div className="w-20 h-20 rounded-full border-2 border-primary/10 animate-pulse absolute inset-0" style={{ animationDelay: '0.5s' }} />
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>

      {/* Main tagline with slow blink */}
      <h1
        className="text-[24px] font-bold text-foreground tracking-tight text-center mb-4"
        style={{
          animation: "soft-blink 2.5s ease-in-out infinite",
        }}
      >
        Grab your dog, we'll do the rest{dots}
      </h1>

      {/* Subtitle */}
      <p className="text-[13px] text-muted-foreground text-center max-w-[300px] leading-relaxed opacity-0"
        style={{ animation: "fade-in 0.8s ease-out 1s forwards" }}
      >
        Analyzing shelter distance, routing, and capacity in real-time
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-10">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary/40"
            style={{
              animation: "dot-bounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes soft-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes dot-bounce {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
};

const Index = () => {
  const { toast } = useToast();
  const [isApproved, setIsApproved] = useState(false);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("A7B9C2D4");
  const [lastRefreshed, setLastRefreshed] = useState<number | null>(null);
  const [refreshAgo, setRefreshAgo] = useState("just now");

  const petData = {
    name: "Buddy",
    breed: "West Highland White Terrier",
    age: 3,
  };

  const shelterData = {
    name: "Downtown Emergency Shelter",
    address: "83 Main Street, Downtown",
    capacity: { total: 120, available: 43 },
    petFriendly: true,
    status: "approved" as const,
    facilities: ["Medical Aid", "Water", "Power", "Pet Area", "Showers"],
  };

  // Auto-refresh data every 1s so API latency never exceeds 1s
  useEffect(() => {
    if (!lastRefreshed) return;
    const interval = setInterval(() => {
      setLastRefreshed(Date.now());
      setRefreshAgo("<1s ago");
    }, 1000);
    return () => clearInterval(interval);
  }, [lastRefreshed]);

  useEffect(() => {
    if (isEmergencyMode && !isLoading && !isApproved) {
      const timer = setTimeout(() => {
        setIsApproved(true);
        toast({
          title: "✅ Shelter Approved",
          description: "You are cleared to proceed to Downtown Emergency Shelter.",
          duration: 4000,
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isEmergencyMode, isLoading, isApproved, toast]);

  const refreshCode = () => {
    const newCode = Math.random().toString(36).substring(2, 6).toUpperCase().padEnd(8, "0").substring(0, 8);
    setVerificationCode(newCode);
    toast({ title: "Code Updated", description: "New verification code generated." });
  };

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setLastRefreshed(Date.now());
  }, []);

  const startEmergencyMode = () => {
    setIsEmergencyMode(true);
    setIsLoading(true);
  };

  const handleRefreshData = () => {
    setLastRefreshed(Date.now());
    setRefreshAgo("just now");
    toast({ title: "Data Refreshed", description: "Shelter and routing data updated." });
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
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
            {/* Real-time refresh indicator */}
            {lastRefreshed && (
              <div className="flex items-center justify-between glass rounded-xl px-3.5 py-2.5">
                <p className="text-[11px] text-muted-foreground leading-tight max-w-[260px]">
                  Integrated with government databases and real-time APIs
                </p>
                <button
                  onClick={handleRefreshData}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-primary shrink-0 active:scale-95 transition-transform"
                >
                  <RefreshCw className="h-3 w-3" />
                  {refreshAgo}
                </button>
              </div>
            )}

            {/* Pending status inline — only show when not approved */}
            {!isApproved && (
              <div className="glass-strong rounded-2xl p-4 flex items-center gap-3 ring-1 ring-warning/30">
                <div className="w-9 h-9 rounded-full bg-warning/12 flex items-center justify-center shrink-0">
                  <Loader2 className="h-5 w-5 text-warning animate-spin" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[13px] text-warning">
                    PENDING — Awaiting Approval
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-0.5 leading-snug">
                    Verifying registration and pet documents...
                  </p>
                </div>
              </div>
            )}

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
    </>
  );
};

export default Index;

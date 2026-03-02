
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import PetProfile from "@/components/PetProfile";
import { EmergencyMap } from "@/components/EmergencyMap";
import ShelterCard from "@/components/ShelterCard";
import VerificationCode from "@/components/VerificationCode";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const Index = () => {
  const { toast } = useToast();
  const [isApproved, setIsApproved] = useState(false);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("A7B9C2D4");

  useEffect(() => {
    document.title = "SurfWoof — Emergency Pet Evacuation";
  }, []);

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
          duration: 4000,
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
      <AnimatePresence mode="wait">
        {!isEmergencyMode ? (
          <motion.div
            key="idle"
            className="flex flex-col items-center justify-center py-16 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        ) : (
          <motion.div
            key="emergency"
            className="space-y-3.5"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {/* Status banner */}
            <AnimatePresence mode="wait">
              {!isApproved ? (
                <motion.div
                  key="pending"
                  {...fadeUp}
                  className="glass-strong rounded-2xl p-4 flex items-center gap-3 ring-1 ring-warning/30"
                >
                  <div className="w-9 h-9 rounded-full bg-warning/12 flex items-center justify-center shrink-0">
                    <Loader2 className="h-5 w-5 text-warning animate-spin" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[13px] text-warning">PENDING — Awaiting Approval</p>
                    <p className="text-[12px] text-muted-foreground mt-0.5 leading-snug">
                      Verifying registration and pet documents...
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="approved"
                  {...fadeUp}
                  className="glass-strong rounded-2xl p-4 flex items-center gap-3 ring-1 ring-success/30"
                >
                  <div className="w-9 h-9 rounded-full bg-success/12 flex items-center justify-center shrink-0">
                    <Shield className="h-5 w-5 text-success" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[13px] text-success">APPROVED — Ready to Go</p>
                    <p className="text-[12px] text-muted-foreground mt-0.5 leading-snug">
                      You are cleared for Downtown Emergency Shelter
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={fadeUp}><PetProfile {...petData} /></motion.div>
            
            <motion.div variants={fadeUp}>
              <EmergencyMap
                shelterName={shelterData.name}
                distance="1.4 miles"
                eta="15 min"
                isApproved={isApproved}
              />
            </motion.div>
            
            <motion.div variants={fadeUp}>
              <ShelterCard {...shelterData} status={isApproved ? "approved" : "pending"} />
            </motion.div>
            
            <motion.div variants={fadeUp}>
              <VerificationCode
                code={verificationCode}
                expiresIn="30 min"
                onRefresh={refreshCode}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Index;

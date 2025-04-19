
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
    name: "멍이",
    breed: "골든 리트리버",
    age: 3,
    specialNeeds: "알레르기가 있습니다",
  };

  const shelterData = {
    name: "성동구 재난 대피소",
    address: "서울 성동구 왕십리로 83",
    capacity: {
      total: 120,
      available: 43,
    },
    petFriendly: true,
    status: "approved",
    facilities: ["의료 지원", "식수", "전기", "반려동물 공간", "샤워 시설"],
  };

  // Simulate shelter approval after 3 seconds
  useEffect(() => {
    if (isEmergencyMode && !isApproved) {
      const timer = setTimeout(() => {
        setIsApproved(true);
        toast({
          title: "대피소 승인 완료!",
          description: "성동구 재난 대피소로 이동해 주세요.",
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isEmergencyMode, isApproved, toast]);

  // Generate new verification code
  const refreshCode = () => {
    const newCode = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()
      .padEnd(8, "0")
      .substring(0, 8);
    setVerificationCode(newCode);
    toast({
      title: "인증 코드가 갱신되었습니다",
      description: "새 코드가 발급되었습니다",
    });
  };

  // Start navigation
  const startNavigation = () => {
    // In a real app, this would use the Google Maps URL scheme
    // window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(shelterData.address)}&travelmode=driving`;
    
    toast({
      title: "길 안내가 시작됩니다",
      description: "Google 지도 앱으로 이동합니다",
    });
    
    // For demo purposes just show a toast
    setTimeout(() => {
      toast({
        title: "길 안내 중",
        description: "약 15분 후 도착 예정입니다",
      });
    }, 2000);
  };

  const startEmergencyMode = () => {
    setIsEmergencyMode(true);
    toast({
      title: "비상 모드가 활성화되었습니다",
      description: "인근 대피소를 찾는 중...",
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
          <h2 className="text-xl font-bold text-emergency-dark mb-2">
            재난 대피 지원 서비스
          </h2>
          <p className="text-gray-500 mb-8 max-w-xs">
            재난 상황에서 반려동물과 함께 안전하게 대피할 수 있도록 도와드립니다
          </p>
          <Button
            onClick={startEmergencyMode}
            className="bg-emergency-danger hover:bg-emergency-danger/90 text-white rounded-full h-12 px-8 w-full max-w-xs emergency-shadow-hover transition-all"
          >
            비상 모드 활성화
          </Button>
        </div>
      ) : (
        <>
          {!isApproved && (
            <Alert className="mb-6 border-emergency-warning bg-emergency-warning/10 text-emergency-warning">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>대피소 승인 대기 중</AlertTitle>
              <AlertDescription>
                인근 대피소에서 승인을 기다리고 있습니다. 잠시만 기다려주세요.
              </AlertDescription>
            </Alert>
          )}

          <PetProfile {...petData} />
          
          <EmergencyMap
            shelterName={shelterData.name}
            distance="2.3km"
            eta="15분"
            onStartNavigation={startNavigation}
            isApproved={isApproved}
          />
          
          <ShelterCard {...shelterData} status={isApproved ? "approved" : "pending"} />
          
          <VerificationCode
            code={verificationCode}
            expiresIn="30분"
            onRefresh={refreshCode}
          />
        </>
      )}
    </Layout>
  );
};

export default Index;

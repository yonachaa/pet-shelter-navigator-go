
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, MapPin } from "lucide-react";

interface EmergencyMapProps {
  shelterName: string;
  distance: string;
  eta: string;
  onStartNavigation: () => void;
  isApproved: boolean;
}

const EmergencyMap: React.FC<EmergencyMapProps> = ({
  shelterName,
  distance,
  eta,
  onStartNavigation,
  isApproved,
}) => {
  return (
    <Card className="mb-6 emergency-shadow border-none overflow-hidden">
      <div className="relative h-48 bg-blue-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center">
          <MapPin className="text-emergency-primary w-8 h-8" />
          <div className="absolute h-full w-full flex items-center justify-center">
            <div className="h-24 w-24 rounded-full border-4 border-emergency-primary/30 animate-pulse-slow"></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-sm text-emergency-dark">
                {shelterName}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{distance}</span>
                <span>·</span>
                <span>{eta}</span>
              </div>
            </div>
            <Button
              onClick={onStartNavigation}
              disabled={!isApproved}
              className={`${
                isApproved
                  ? "bg-emergency-secondary hover:bg-emergency-secondary/90"
                  : "bg-gray-300"
              } text-white rounded-full h-10 px-5`}
            >
              {isApproved ? (
                <>
                  <span className="mr-1">Go</span>
                  <Navigation className="h-4 w-4" />
                </>
              ) : (
                "대기 중"
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EmergencyMap;

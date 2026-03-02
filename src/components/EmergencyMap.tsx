
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmergencyMapProps {
  shelterName?: string;
  distance?: string;
  eta?: string;
  onStartNavigation?: () => void;
  isApproved?: boolean;
}

export const EmergencyMap: React.FC<EmergencyMapProps> = ({
  shelterName = "Downtown Emergency Shelter",
  distance = "1.4 miles",
  eta = "15 min",
  isApproved = true,
}) => {
  const navigate = useNavigate();

  const handleStartNavigation = () => {
    navigate(`/navigate?dest=${encodeURIComponent(shelterName)}&addr=${encodeURIComponent("83 Main Street, Downtown")}`);
  };

  return (
    <Card className="overflow-hidden border-border shadow-sm">
      <div className="relative h-[240px] bg-muted">
        {/* Simulated map grid */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full border-t border-foreground" style={{ top: `${i * 8}%` }} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full border-l border-foreground" style={{ left: `${i * 8}%` }} />
          ))}
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <MapPin className="text-foreground w-8 h-8" />
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-foreground">{shelterName}</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{distance}</span>
                <span>•</span>
                <span>{eta}</span>
              </div>
            </div>
            
            <Button
              onClick={handleStartNavigation}
              disabled={!isApproved}
              className="rounded-xl px-5 h-11 font-bold"
            >
              <span>Navigate</span>
              <Navigation className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

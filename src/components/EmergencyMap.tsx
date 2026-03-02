
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
    <Card className="glass-strong rounded-2xl border-0 shadow-apple overflow-hidden">
      <div className="relative h-[200px] bg-gradient-to-br from-primary/[0.06] via-muted to-accent">
        {/* Map grid overlay */}
        <div className="absolute inset-0 opacity-[0.06]">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full border-t border-foreground" style={{ top: `${i * 10}%` }} />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full border-l border-foreground" style={{ left: `${i * 10}%` }} />
          ))}
        </div>
        
        {/* Pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative animate-float">
            <div className="absolute inset-0 -m-3 rounded-full bg-primary/10 animate-pulse-dot" />
            <MapPin className="w-7 h-7 text-primary drop-shadow-md" />
          </div>
        </div>
        
        {/* Bottom info bar */}
        <div className="absolute bottom-0 inset-x-0 glass-strong p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-semibold text-[15px] text-foreground truncate">{shelterName}</h3>
              <p className="text-[13px] text-muted-foreground mt-0.5">
                {distance} · {eta}
              </p>
            </div>
            
            <Button
              onClick={handleStartNavigation}
              disabled={!isApproved}
              size="sm"
              className="rounded-xl h-9 px-4 text-[13px] font-semibold shadow-apple shrink-0 bg-primary hover:bg-primary/90"
            >
              Navigate
              <Navigation className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

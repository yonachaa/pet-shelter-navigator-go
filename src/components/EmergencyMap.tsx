
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
      <div className="relative h-[220px] bg-gradient-to-br from-primary/[0.04] via-muted to-accent overflow-hidden">
        {/* Street grid */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
          {/* Roads */}
          <rect x="0" y="95" width="400" height="14" fill="hsl(var(--muted-foreground))" opacity="0.08" rx="2" />
          <rect x="0" y="155" width="400" height="10" fill="hsl(var(--muted-foreground))" opacity="0.06" rx="1" />
          <rect x="180" y="0" width="14" height="220" fill="hsl(var(--muted-foreground))" opacity="0.08" rx="2" />
          <rect x="300" y="0" width="10" height="220" fill="hsl(var(--muted-foreground))" opacity="0.06" rx="1" />
          <rect x="80" y="0" width="8" height="220" fill="hsl(var(--muted-foreground))" opacity="0.05" rx="1" />

          {/* Buildings */}
          <rect x="20" y="20" width="45" height="60" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.1" />
          <rect x="100" y="30" width="60" height="50" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.12" />
          <rect x="210" y="15" width="70" height="65" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.1" />
          <rect x="320" y="25" width="55" height="55" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.08" />
          <rect x="20" y="120" width="50" height="25" rx="3" fill="hsl(var(--muted-foreground))" opacity="0.08" />
          <rect x="100" y="115" width="65" height="30" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.1" />
          <rect x="210" y="118" width="75" height="28" rx="4" fill="hsl(var(--primary))" opacity="0.12" />
          <rect x="320" y="120" width="50" height="25" rx="3" fill="hsl(var(--muted-foreground))" opacity="0.07" />
          <rect x="25" y="170" width="40" height="35" rx="3" fill="hsl(var(--muted-foreground))" opacity="0.09" />
          <rect x="110" y="172" width="55" height="30" rx="3" fill="hsl(var(--muted-foreground))" opacity="0.08" />
          <rect x="215" y="170" width="65" height="35" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.1" />
          <rect x="325" y="172" width="45" height="30" rx="3" fill="hsl(var(--muted-foreground))" opacity="0.07" />

          {/* Shelter label on building */}
          <text x="247" y="136" fontSize="7" fill="hsl(var(--primary))" fontWeight="600" textAnchor="middle" opacity="0.7">Shelter</text>

          {/* Dashed route from user to shelter */}
          <path
            d="M 187 190 L 187 102 L 247 102 L 247 82"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 4"
            opacity="0.5"
          />
        </svg>

        {/* Shelter pin */}
        <div className="absolute" style={{ top: '24%', left: '60%', transform: 'translate(-50%, -100%)' }}>
          <div className="relative animate-float">
            <div className="absolute inset-0 -m-3 rounded-full bg-primary/10 animate-pulse-dot" />
            <MapPin className="w-7 h-7 text-primary drop-shadow-md" fill="hsl(var(--primary))" fillOpacity={0.2} />
          </div>
        </div>

        {/* Current location (You) */}
        <div className="absolute" style={{ top: '82%', left: '46.5%', transform: 'translate(-50%, -50%)' }}>
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/40 border-2 border-white" />
            <div className="absolute -inset-2 rounded-full bg-primary/20 animate-pulse-dot" />
          </div>
          <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-foreground whitespace-nowrap bg-card/80 backdrop-blur-sm px-1.5 py-0.5 rounded-md">You</span>
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

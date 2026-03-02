
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

          {/* Flood zones */}
          <defs>
            <radialGradient id="flood1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.08" />
            </radialGradient>
            <radialGradient id="flood2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.05" />
            </radialGradient>
          </defs>
          <ellipse cx="60" cy="160" rx="65" ry="40" fill="url(#flood1)" />
          <ellipse cx="340" cy="100" rx="55" ry="50" fill="url(#flood2)" />
          <ellipse cx="130" cy="80" rx="35" ry="25" fill="url(#flood1)" />
          {/* Flood wave pattern lines */}
          <path d="M 10 155 Q 30 148 50 155 Q 70 162 90 155 Q 110 148 120 155" stroke="#3b82f6" strokeWidth="1.2" fill="none" opacity="0.25" />
          <path d="M 15 170 Q 35 163 55 170 Q 75 177 95 170 Q 115 163 125 170" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.18" />
          <path d="M 295 90 Q 315 83 335 90 Q 355 97 375 90 Q 390 83 395 90" stroke="#2563eb" strokeWidth="1.2" fill="none" opacity="0.25" />
          <path d="M 300 110 Q 320 103 340 110 Q 360 117 380 110" stroke="#2563eb" strokeWidth="1" fill="none" opacity="0.18" />
          <path d="M 105 75 Q 120 68 135 75 Q 150 82 160 75" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.2" />

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

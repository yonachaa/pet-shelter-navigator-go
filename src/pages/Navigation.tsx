
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Navigation as NavIcon, MapPin, Clock, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NavigationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("dest") || "Downtown Emergency Shelter";
  const address = searchParams.get("addr") || "83 Main Street, Downtown";

  const [etaMinutes, setEtaMinutes] = useState(15);
  const [distanceMiles, setDistanceMiles] = useState(1.4);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    document.title = `Navigate to ${destination} — SurfWoof`;
  }, [destination]);

  useEffect(() => {
    if (isNavigating && etaMinutes > 0) {
      const interval = setInterval(() => {
        setEtaMinutes((prev) => Math.max(0, prev - 1));
        setDistanceMiles((prev) => Math.max(0, +(prev - 0.1).toFixed(1)));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isNavigating, etaMinutes]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col z-50">
      {/* Map area */}
      <div className="flex-1 relative bg-gradient-to-br from-primary/[0.04] via-muted to-accent overflow-hidden">
        {/* Detailed SVG map */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 430 600" preserveAspectRatio="xMidYMid slice">
          {/* Roads */}
          <rect x="0" y="180" width="430" height="16" fill="hsl(var(--muted-foreground))" opacity="0.08" rx="2" />
          <rect x="0" y="320" width="430" height="12" fill="hsl(var(--muted-foreground))" opacity="0.06" rx="2" />
          <rect x="0" y="440" width="430" height="14" fill="hsl(var(--muted-foreground))" opacity="0.07" rx="2" />
          <rect x="130" y="0" width="14" height="600" fill="hsl(var(--muted-foreground))" opacity="0.08" rx="2" />
          <rect x="280" y="0" width="12" height="600" fill="hsl(var(--muted-foreground))" opacity="0.06" rx="2" />
          <rect x="370" y="0" width="10" height="600" fill="hsl(var(--muted-foreground))" opacity="0.05" rx="1" />
          <rect x="60" y="0" width="8" height="600" fill="hsl(var(--muted-foreground))" opacity="0.04" rx="1" />

          {/* Buildings */}
          <rect x="15" y="30" width="35" height="130" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.1" />
          <rect x="75" y="50" width="45" height="110" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.08" />
          <rect x="155" y="20" width="110" height="140" rx="6" fill="hsl(var(--primary))" opacity="0.1" />
          <rect x="300" y="40" width="60" height="120" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.09" />
          <rect x="385" y="30" width="30" height="130" rx="3" fill="hsl(var(--muted-foreground))" opacity="0.07" />

          <rect x="15" y="210" width="100" height="90" rx="5" fill="hsl(var(--muted-foreground))" opacity="0.08" />
          <rect x="155" y="205" width="55" height="100" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.1" />
          <rect x="220" y="210" width="50" height="95" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.07" />
          <rect x="300" y="200" width="55" height="105" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.09" />
          <rect x="385" y="210" width="35" height="90" rx="3" fill="hsl(var(--muted-foreground))" opacity="0.06" />

          <rect x="15" y="345" width="50" height="80" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.09" />
          <rect x="75" y="340" width="45" height="85" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.07" />
          <rect x="155" y="345" width="115" height="80" rx="5" fill="hsl(var(--muted-foreground))" opacity="0.08" />
          <rect x="300" y="340" width="65" height="85" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.1" />

          <rect x="15" y="465" width="105" height="60" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.07" />
          <rect x="155" y="460" width="60" height="70" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.09" />
          <rect x="300" y="465" width="55" height="60" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.08" />

          {/* Shelter label */}
          <text x="210" y="98" fontSize="10" fill="hsl(var(--primary))" fontWeight="700" textAnchor="middle" opacity="0.6">SHELTER</text>

          {/* Route */}
          <path
            d="M 215 490 L 215 447 L 137 447 L 137 326 L 137 188 L 210 188 L 210 160"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={isNavigating ? "8 5" : "none"}
            opacity="0.5"
          >
            {isNavigating && (
              <animate attributeName="stroke-dashoffset" from="0" to="-26" dur="1s" repeatCount="indefinite" />
            )}
          </path>
        </svg>

        {/* Shelter pin */}
        <div className="absolute" style={{ top: '18%', left: '49%', transform: 'translate(-50%, -100%)' }}>
          <div className="relative animate-float">
            <div className="absolute inset-0 -m-3 rounded-full bg-primary/10 animate-pulse-dot" />
            <MapPin className="w-8 h-8 text-primary drop-shadow-lg" fill="hsl(var(--primary))" fillOpacity={0.2} />
          </div>
        </div>

        {/* Current location */}
        <div className="absolute" style={{ top: '78%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <div className="relative">
            <div className="w-5 h-5 rounded-full bg-primary shadow-lg shadow-primary/40 border-[2.5px] border-card" />
            <div className="absolute -inset-2.5 rounded-full bg-primary/20 animate-pulse-dot" />
          </div>
          <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-foreground whitespace-nowrap bg-card/90 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-apple">You</span>
        </div>

        {/* Back button */}
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          size="icon"
          className="absolute top-14 left-4 glass-strong rounded-2xl h-11 w-11 border-0 shadow-apple-lg z-10 active:scale-95 transition-transform"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Bottom panel */}
      <motion.div
        className="glass-nav pb-safe"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.35 }}
      >
        <div className="max-w-[430px] mx-auto p-5 space-y-4">
          <div>
            <h2 className="text-[17px] font-bold text-foreground">{destination}</h2>
            <p className="text-[13px] text-muted-foreground">{address}</p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-[10px] bg-primary/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <span className="font-bold text-[20px] text-foreground">{etaMinutes}<span className="text-[13px] font-medium text-muted-foreground ml-1">min</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-[10px] bg-primary/10 flex items-center justify-center">
                <Route className="h-4 w-4 text-primary" />
              </div>
              <span className="font-bold text-[20px] text-foreground">{distanceMiles}<span className="text-[13px] font-medium text-muted-foreground ml-1">mi</span></span>
            </div>
          </div>

          {!isNavigating ? (
            <Button
              onClick={() => setIsNavigating(true)}
              className="w-full h-[52px] text-[16px] font-semibold rounded-2xl shadow-apple-lg active:scale-[0.98] transition-transform"
            >
              <NavIcon className="h-5 w-5 mr-2" />
              Start Navigation
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex-1 h-[52px] text-[15px] font-semibold rounded-2xl"
              >
                End
              </Button>
              <div className="flex-1 h-[52px] rounded-2xl bg-success text-success-foreground flex items-center justify-center font-semibold text-[15px] shadow-apple">
                <NavIcon className="h-4 w-4 mr-2 animate-pulse" />
                Navigating...
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NavigationPage;

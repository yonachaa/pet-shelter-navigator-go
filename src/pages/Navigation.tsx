
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Navigation as NavIcon, MapPin, Clock, Route } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavigationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("dest") || "Downtown Emergency Shelter";
  const address = searchParams.get("addr") || "83 Main Street, Downtown";

  const [etaMinutes, setEtaMinutes] = useState(15);
  const [distanceMiles, setDistanceMiles] = useState(1.4);
  const [isNavigating, setIsNavigating] = useState(false);

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
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.05]">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full border-t border-foreground" style={{ top: `${i * 4.16}%` }} />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full border-l border-foreground" style={{ left: `${i * 7.14}%` }} />
          ))}
        </div>

        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="routeGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M 50 82 L 50 60 L 38 48 L 38 28 L 50 18"
            stroke="url(#routeGrad)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={isNavigating ? "3 2" : "none"}
          />
        </svg>

        {/* Current location dot */}
        <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/30" />
            <div className="absolute -inset-2 rounded-full bg-primary/20 animate-pulse-dot" />
          </div>
        </div>

        {/* Destination */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <MapPin className="w-7 h-7 text-danger drop-shadow-md" fill="hsl(var(--danger))" />
          <span className="text-[11px] font-semibold text-foreground mt-1.5 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-apple">
            {destination}
          </span>
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
      <div className="glass-nav pb-safe">
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
      </div>
    </div>
  );
};

export default NavigationPage;

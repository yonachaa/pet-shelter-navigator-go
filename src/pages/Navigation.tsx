
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
    <div className="fixed inset-0 bg-foreground text-primary-foreground flex flex-col z-50">
      {/* Map area */}
      <div className="flex-1 relative bg-muted">
        {/* Simulated map grid */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full border-t border-foreground/10" style={{ top: `${i * 5}%` }} />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full border-l border-foreground/10" style={{ left: `${i * 5}%` }} />
          ))}
        </div>

        {/* Simulated route line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M 50 85 L 50 60 L 35 45 L 35 25 L 50 15"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray={isNavigating ? "4 2" : "none"}
            className={isNavigating ? "animate-pulse" : ""}
          />
        </svg>

        {/* Current location */}
        <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2">
          <div className="w-5 h-5 rounded-full bg-primary border-2 border-primary-foreground shadow-lg">
            <div className="w-full h-full rounded-full bg-primary animate-pulse-dot" />
          </div>
        </div>

        {/* Destination pin */}
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <MapPin className="w-8 h-8 text-danger" fill="hsl(var(--danger))" />
          <span className="text-xs font-bold text-foreground mt-1 bg-card px-2 py-0.5 rounded-full shadow">
            {destination}
          </span>
        </div>

        {/* Back button */}
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          size="icon"
          className="absolute top-12 left-4 bg-card text-foreground border-border rounded-full shadow-md z-10 h-11 w-11"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Bottom panel */}
      <div className="bg-card text-card-foreground border-t border-border pb-safe">
        <div className="max-w-md mx-auto p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">{destination}</h2>
              <p className="text-sm text-muted-foreground">{address}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-bold text-lg">{etaMinutes} min</span>
            </div>
            <div className="flex items-center space-x-2">
              <Route className="h-4 w-4 text-muted-foreground" />
              <span className="font-bold text-lg">{distanceMiles} mi</span>
            </div>
          </div>

          {!isNavigating ? (
            <Button
              onClick={() => setIsNavigating(true)}
              className="w-full h-14 text-base font-bold rounded-xl"
            >
              <NavIcon className="h-5 w-5 mr-2" />
              Start Navigation
            </Button>
          ) : (
            <div className="flex space-x-3">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex-1 h-14 text-base font-bold rounded-xl"
              >
                End
              </Button>
              <div className="flex-1 h-14 rounded-xl bg-success text-success-foreground flex items-center justify-center font-bold text-base">
                <NavIcon className="h-5 w-5 mr-2 animate-pulse" />
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

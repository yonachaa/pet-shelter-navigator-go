
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleStartNavigation = () => {
    const address = encodeURIComponent("83 Main Street, Downtown");
    window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${address}&travelmode=driving`;
    
    toast({
      title: "Navigation Started",
      description: "Opening Google Maps navigation...",
    });
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="relative h-[300px] bg-gradient-to-br from-sky-400/20 to-sky-600/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <MapPin className="text-sky-500 w-8 h-8 animate-bounce" />
            <div className="absolute -inset-4">
              <div className="h-16 w-16 rounded-full border-4 border-sky-500/30 animate-ping" />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-xl bg-white/60 p-4 border-t border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{shelterName}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{distance}</span>
                <span>•</span>
                <span>{eta}</span>
              </div>
            </div>
            
            <Button
              onClick={handleStartNavigation}
              disabled={!isApproved}
              className="bg-sky-500 hover:bg-sky-600 text-white rounded-full px-4 h-10 flex items-center space-x-2"
            >
              <span>Navigate</span>
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};


import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const shelters = [
  {
    id: 1, name: "Downtown Emergency Shelter", address: "83 Main Street, Downtown",
    distance: "1.4 mi", eta: "15 min", capacity: { total: 120, available: 43 },
    petFriendly: true, facilities: ["Medical Aid", "Water", "Pet Area"],
  },
  {
    id: 2, name: "Westside Community Center", address: "221 West Ave",
    distance: "2.1 mi", eta: "22 min", capacity: { total: 80, available: 12 },
    petFriendly: true, facilities: ["Water", "Power", "Pet Area"],
  },
  {
    id: 3, name: "North County Shelter", address: "500 Oak Blvd",
    distance: "3.8 mi", eta: "35 min", capacity: { total: 200, available: 98 },
    petFriendly: false, facilities: ["Medical Aid", "Water", "Power", "Showers"],
  },
  {
    id: 4, name: "Harbor Point Shelter", address: "12 Harbor Rd",
    distance: "4.5 mi", eta: "40 min", capacity: { total: 60, available: 3 },
    petFriendly: true, facilities: ["Water", "Pet Area"],
  },
];

const Shelters = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reserving, setReserving] = useState<number | null>(null);
  const [reserved, setReserved] = useState<number[]>([]);

  const handleReserve = (id: number, name: string) => {
    setReserving(id);
    setTimeout(() => {
      setReserving(null);
      setReserved((prev) => [...prev, id]);
      toast({ title: "Spot Reserved!", description: `Your spot at ${name} is confirmed.` });
    }, 1500);
  };

  const handleNavigate = (name: string, address: string) => {
    navigate(`/navigate?dest=${encodeURIComponent(name)}&addr=${encodeURIComponent(address)}`);
  };

  return (
    <Layout>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Nearby Shelters</h2>
        {shelters.map((s) => {
          const occupancy = Math.round(((s.capacity.total - s.capacity.available) / s.capacity.total) * 100);
          const isReserved = reserved.includes(s.id);

          return (
            <Card key={s.id} className="border-border shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{s.name}</h3>
                    <p className="text-sm text-muted-foreground">{s.address}</p>
                  </div>
                  <div className="text-right text-sm shrink-0 ml-2">
                    <span className="font-bold text-foreground">{s.distance}</span>
                    <p className="text-xs text-muted-foreground">{s.eta}</p>
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className={`font-bold ${s.capacity.available <= 5 ? 'text-danger' : 'text-foreground'}`}>
                      {s.capacity.available}/{s.capacity.total}
                      {s.capacity.available <= 5 && " — Almost Full!"}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${occupancy > 90 ? 'bg-danger' : occupancy > 60 ? 'bg-warning' : 'bg-success'}`}
                      style={{ width: `${occupancy}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {s.petFriendly ? (
                    <Badge variant="outline" className="text-xs font-bold border-foreground text-foreground">🐾 Pet Friendly</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs text-muted-foreground border-border">No Pets</Badge>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {s.facilities.map((f, i) => (
                      <span key={i} className="text-xs py-0.5 px-2 bg-secondary text-muted-foreground rounded-full">{f}</span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 pt-1">
                  <Button
                    onClick={() => handleReserve(s.id, s.name)}
                    disabled={isReserved || reserving === s.id || s.capacity.available === 0}
                    variant={isReserved ? "outline" : "default"}
                    className="flex-1 h-11 rounded-xl font-bold text-sm"
                  >
                    {reserving === s.id ? (
                      <><MapPin className="h-4 w-4 mr-1 animate-pulse" /> Reserving...</>
                    ) : isReserved ? (
                      "✓ Reserved"
                    ) : (
                      <><MapPin className="h-4 w-4 mr-1" /> Reserve Spot</>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleNavigate(s.name, s.address)}
                    variant="outline"
                    className="h-11 rounded-xl font-bold text-sm px-4"
                  >
                    <Navigation className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
};

export default Shelters;

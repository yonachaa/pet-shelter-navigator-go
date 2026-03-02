
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ShelterCardProps {
  name: string;
  address: string;
  capacity: { total: number; available: number };
  petFriendly: boolean;
  status: "pending" | "approved" | "rejected";
  facilities: string[];
}

const ShelterCard: React.FC<ShelterCardProps> = ({
  name, address, capacity, petFriendly, status, facilities,
}) => {
  const statusConfig = {
    approved: { label: "Approved", className: "bg-success/10 text-success border-success/30" },
    rejected: { label: "Rejected", className: "bg-danger/10 text-danger border-danger/30" },
    pending: { label: "Pending", className: "bg-warning/10 text-warning border-warning/30" },
  };

  const { label, className } = statusConfig[status];
  const occupancyPercent = Math.round(((capacity.total - capacity.available) / capacity.total) * 100);

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-foreground">{name}</h3>
          <span className={`text-xs font-bold py-1 px-2.5 rounded-full border ${className}`}>
            {label}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{address}</p>
        
        {/* Capacity bar */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Capacity</span>
            <span className="font-bold text-foreground">{capacity.available}/{capacity.total} available</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${occupancyPercent > 80 ? 'bg-danger' : occupancyPercent > 50 ? 'bg-warning' : 'bg-success'}`}
              style={{ width: `${occupancyPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {petFriendly && (
            <Badge variant="outline" className="text-xs font-bold border-foreground text-foreground">
              🐾 Pet Friendly
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {facilities.map((facility, index) => (
            <span key={index} className="text-xs py-1 px-2.5 bg-secondary text-muted-foreground rounded-full font-medium">
              {facility}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShelterCard;

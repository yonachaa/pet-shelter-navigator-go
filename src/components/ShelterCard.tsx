
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
    approved: { label: "Approved", className: "bg-success/12 text-success" },
    rejected: { label: "Rejected", className: "bg-danger/12 text-danger" },
    pending: { label: "Pending", className: "bg-warning/12 text-warning" },
  };

  const { label, className } = statusConfig[status];
  const occupancyPercent = Math.round(((capacity.total - capacity.available) / capacity.total) * 100);

  return (
    <Card className="glass-strong rounded-2xl border-0 shadow-apple overflow-hidden">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[15px] text-foreground">{name}</h3>
          <span className={`text-[11px] font-semibold py-[3px] px-2.5 rounded-full ${className}`}>
            {label}
          </span>
        </div>
        <p className="text-[13px] text-muted-foreground">{address}</p>
        
        {/* Capacity */}
        <div>
          <div className="flex justify-between text-[11px] mb-1.5">
            <span className="text-muted-foreground">Capacity</span>
            <span className="font-semibold text-foreground">{capacity.available}/{capacity.total}</span>
          </div>
          <div className="h-[6px] bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                occupancyPercent > 80 ? 'bg-danger' : occupancyPercent > 50 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${occupancyPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {petFriendly && (
            <Badge variant="outline" className="text-[11px] font-semibold border-primary/30 text-primary rounded-lg h-6">
              🐾 Pet Friendly
            </Badge>
          )}
          {facilities.map((facility, index) => (
            <span key={index} className="text-[11px] py-[2px] px-2 bg-muted text-muted-foreground rounded-lg font-medium">
              {facility}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShelterCard;

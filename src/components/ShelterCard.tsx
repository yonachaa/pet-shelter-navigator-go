
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ShelterCardProps {
  name: string;
  address: string;
  capacity: {
    total: number;
    available: number;
  };
  petFriendly: boolean;
  status: "pending" | "approved" | "rejected";
  facilities: string[];
}

const ShelterCard: React.FC<ShelterCardProps> = ({
  name,
  address,
  capacity,
  petFriendly,
  status,
  facilities,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "approved":
        return "bg-emergency-success/10 text-emergency-success";
      case "rejected":
        return "bg-emergency-danger/10 text-emergency-danger";
      default:
        return "bg-emergency-warning/10 text-emergency-warning";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "approved":
        return "Approved";
      case "Rejected":
        return "rejected";
      
    }
  };

  return (
    <Card className="mb-6 emergency-shadow border-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg text-emergency-dark">{name}</h3>
          <span
            className={`inline-block text-xs font-medium py-1 px-2 rounded-full ${getStatusColor()}`}
          >
            {getStatusText()}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-3">{address}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs">
            <span className="font-medium text-emergency-dark">
              Capacity: {capacity.available}/{capacity.total}
            </span>
          </div>
          {petFriendly && (
            <Badge variant="outline" className="text-xs border-emergency-primary text-emergency-primary">
              Pet friendly
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {facilities.map((facility, index) => (
            <span
              key={index}
              className="text-xs py-1 px-2 bg-emergency-primary/5 text-emergency-primary/70 rounded-full"
            >
              {facility}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShelterCard;

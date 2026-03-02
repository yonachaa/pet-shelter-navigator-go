
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, AlertTriangle, CheckCircle, Info, ChevronDown, ChevronUp, Radio } from "lucide-react";

const alertsData = [
  {
    id: 1, type: "critical", title: "🔴 Hurricane Warning", icon: AlertTriangle,
    message: "Category 3 hurricane approaching. Mandatory evacuation in effect.",
    detail: "Hurricane Maria is expected to make landfall within 12 hours. All residents in Zone A and B must evacuate immediately. Pet-friendly shelters are available at Downtown Emergency Shelter and Westside Community Center. Bring essential documents and supplies for 72 hours.",
    time: "35 min ago",
  },
  {
    id: 2, type: "warning", title: "⚠️ Flash Flood Alert", icon: AlertTriangle,
    message: "Flash flood warning for low-lying areas until 8 PM.",
    detail: "National Weather Service has issued a flash flood warning. Avoid driving through flooded roads. If water rises in your area, move to higher ground immediately. Emergency services are on standby.",
    time: "2 hours ago",
  },
  {
    id: 3, type: "info", title: "New Pet-Friendly Shelter", icon: Info,
    message: "Harbor Point Shelter now accepting pets.",
    detail: "Harbor Point Shelter at 12 Harbor Rd has opened as a pet-friendly emergency shelter with capacity for 60 people. Facilities include water and designated pet areas. Bring your pet's vaccination records.",
    time: "5 hours ago",
  },
  {
    id: 4, type: "info", title: "Supply Distribution", icon: Bell,
    message: "Emergency supply kits available at City Hall.",
    detail: "The city is distributing emergency supply kits including water, food rations, first aid supplies, and batteries. Open until 6 PM today. Bring valid ID. One kit per household.",
    time: "8 hours ago",
  },
  {
    id: 5, type: "success", title: "Registration Complete", icon: CheckCircle,
    message: "Emergency profile and pet documents verified.",
    detail: "Your emergency registration is complete. All pet vaccination records and registration documents have been verified. You are pre-approved for pet-friendly shelters in your area.",
    time: "1 day ago",
  },
  {
    id: 6, type: "info", title: "Road Closure Update", icon: Radio,
    message: "Highway 101 North closed due to debris.",
    detail: "Highway 101 Northbound is closed between Exit 12 and Exit 15 due to fallen debris. Use alternate routes via Route 5 or local roads. Expected reopening: 24-48 hours after storm passes.",
    time: "3 hours ago",
  },
];

const Alerts = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "critical": return "border-l-4 border-l-danger bg-danger/5";
      case "warning": return "border-l-4 border-l-warning bg-warning/5";
      case "success": return "border-l-4 border-l-success bg-success/5";
      default: return "border-l-4 border-l-border";
    }
  };

  return (
    <Layout>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Alerts</h2>
          <span className="text-xs font-bold text-danger bg-danger/10 px-2.5 py-1 rounded-full">
            {alertsData.filter(a => a.type === "critical").length} Critical
          </span>
        </div>
        {alertsData.map((alert) => (
          <Card
            key={alert.id}
            className={`border-border shadow-sm cursor-pointer transition-colors hover:bg-secondary/30 overflow-hidden ${getTypeStyle(alert.type)}`}
            onClick={() => setExpanded(expanded === alert.id ? null : alert.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <alert.icon className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-foreground">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{alert.message}</p>
                    <span className="text-xs text-muted-foreground mt-1 block">{alert.time}</span>
                  </div>
                </div>
                {expanded === alert.id ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
                )}
              </div>
              {expanded === alert.id && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm text-foreground leading-relaxed">{alert.detail}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Alerts;

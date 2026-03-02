
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Info, ChevronDown, ChevronUp, Bell, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const alertsData = [
  {
    id: 1, type: "critical", title: "Hurricane Warning", icon: AlertTriangle,
    message: "Category 3 hurricane approaching. Mandatory evacuation in effect.",
    detail: "Hurricane Maria is expected to make landfall within 12 hours. All residents in Zone A and B must evacuate immediately. Pet-friendly shelters are available at Downtown Emergency Shelter and Westside Community Center. Bring essential documents and supplies for 72 hours.",
    time: "35 min ago",
  },
  {
    id: 2, type: "warning", title: "Flash Flood Alert", icon: AlertTriangle,
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

  useEffect(() => {
    document.title = "Alerts — SurfWoof";
  }, []);

  const getAccent = (type: string) => {
    switch (type) {
      case "critical": return "from-danger/20 to-danger/5";
      case "warning": return "from-warning/20 to-warning/5";
      case "success": return "from-success/20 to-success/5";
      default: return "from-primary/10 to-primary/5";
    }
  };

  const getDot = (type: string) => {
    switch (type) {
      case "critical": return "bg-danger";
      case "warning": return "bg-warning";
      case "success": return "bg-success";
      default: return "bg-primary";
    }
  };

  return (
    <Layout>
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-foreground tracking-tight">Alerts</h2>
          <span className="text-[11px] font-semibold text-danger bg-danger/10 px-2.5 py-[3px] rounded-full">
            {alertsData.filter(a => a.type === "critical").length} Critical
          </span>
        </div>
        {alertsData.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Card
              className="glass-strong rounded-2xl border-0 shadow-apple cursor-pointer active:scale-[0.98] transition-transform overflow-hidden"
              onClick={() => setExpanded(expanded === alert.id ? null : alert.id)}
            >
              <div className={`h-1 bg-gradient-to-r ${getAccent(alert.type)}`} />
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${getDot(alert.type)}`} />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[14px] text-foreground">{alert.title}</h3>
                      <p className="text-[13px] text-muted-foreground mt-0.5 leading-snug">{alert.message}</p>
                      <span className="text-[11px] text-muted-foreground/70 mt-1 block">{alert.time}</span>
                    </div>
                  </div>
                  {expanded === alert.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                </div>
                <AnimatePresence>
                  {expanded === alert.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 ml-5 border-t border-border">
                        <p className="text-[13px] text-foreground leading-relaxed">{alert.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
};

export default Alerts;

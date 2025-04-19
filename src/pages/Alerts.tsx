
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, AlertTriangle, CheckCircle } from "lucide-react";

const Alerts = () => {
  const alerts = [
    {
      type: "warning",
      title: "Storm Warning",
      message: "Severe weather alert for your area",
      time: "2 hours ago",
      icon: AlertTriangle,
    },
    {
      type: "info",
      title: "Shelter Update",
      message: "New pet-friendly shelter available",
      time: "5 hours ago",
      icon: Bell,
    },
    {
      type: "success",
      title: "Registration Complete",
      message: "Emergency contact successfully updated",
      time: "1 day ago",
      icon: CheckCircle,
    },
  ];

  return (
    <Layout>
      <div className="space-y-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
          Alerts & Updates
        </h2>
        {alerts.map((alert, index) => (
          <Card key={index} className="backdrop-blur-md bg-white/60 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  <alert.icon className="h-5 w-5 text-sky-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{alert.title}</h3>
                  <p className="text-sm text-gray-500">{alert.message}</p>
                  <span className="text-xs text-gray-400 mt-1">{alert.time}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Alerts;

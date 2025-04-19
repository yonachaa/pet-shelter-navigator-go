
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, Bell, Shield } from "lucide-react";

const Profile = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
            <p className="text-sm text-gray-500">Emergency Contact: +1 234 567 8900</p>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="backdrop-blur-md bg-white/60 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-sky-500" />
                <span className="text-sm font-medium">Account Settings</span>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/60 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-sky-500" />
                <span className="text-sm font-medium">Notifications</span>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/60 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-sky-500" />
                <span className="text-sm font-medium">Privacy & Security</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

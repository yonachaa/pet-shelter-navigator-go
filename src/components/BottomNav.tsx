
import React from "react";
import { Home, MapPin, User, Bell } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: MapPin, label: "Shelters", path: "/shelters" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Bell, label: "Alerts", path: "/alerts" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center space-y-1 ${
                isActive ? "text-emergency-primary" : "text-gray-500"
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

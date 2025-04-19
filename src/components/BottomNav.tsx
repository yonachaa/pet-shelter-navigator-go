
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
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-white/40 border-t border-white/40 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center space-y-1 transition-all duration-300 ${
                isActive 
                ? "text-sky-600 scale-110" 
                : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;


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
    <nav className="fixed bottom-0 left-0 right-0 glass-nav pb-safe z-50">
      <div className="max-w-[430px] mx-auto flex items-center justify-around h-[52px]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 transition-all duration-200 active:scale-90 min-w-[64px] ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-[22px] w-[22px]" strokeWidth={isActive ? 2.2 : 1.6} />
              <span className={`text-[10px] leading-tight ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

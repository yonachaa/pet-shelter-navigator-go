
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dog } from "lucide-react";

interface PetProfileProps {
  name: string;
  breed: string;
  age: number;
  specialNeeds: string;
}

const PetProfile: React.FC<PetProfileProps> = ({ name, breed, age, specialNeeds }) => {
  return (
    <Card className="glass-strong rounded-2xl border-0 shadow-apple overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3.5">
          <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Dog className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[17px] text-foreground leading-tight">{name}</h3>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              {breed} · {age} yrs
            </p>
            {specialNeeds && (
              <div className="mt-1.5">
                <span className="inline-flex items-center text-[11px] font-semibold py-[3px] px-2 bg-warning/12 text-warning rounded-full">
                  ⚠ {specialNeeds}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PetProfile;

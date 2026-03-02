
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
    <Card className="border-border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
            <Dog className="w-7 h-7 text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {breed} · {age} years old
            </p>
            {specialNeeds && (
              <div className="mt-1.5">
                <span className="inline-block text-xs font-bold py-1 px-2.5 bg-warning/10 text-warning rounded-full">
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

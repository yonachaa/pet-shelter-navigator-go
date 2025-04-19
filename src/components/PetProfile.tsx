
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
    <Card className="backdrop-blur-md bg-white/60 border-white/20 shadow-xl">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500/20 to-sky-600/20 flex items-center justify-center backdrop-blur-sm border border-white/20">
            <Dog className="w-8 h-8 text-sky-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">
              {breed} · {age} years old
            </p>
            {specialNeeds && (
              <div className="mt-2">
                <span className="inline-block text-xs font-medium py-1 px-2 bg-amber-500/10 text-amber-600 rounded-full">
                  Special Care Required
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

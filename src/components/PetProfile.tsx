
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PetProfileProps {
  name: string;
  breed: string;
  age: number;
  specialNeeds: string;
}

const PetProfile: React.FC<PetProfileProps> = ({ name, breed, age, specialNeeds }) => {
  return (
    <Card className="mb-6 emergency-shadow border-none">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-emergency-primary/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-emergency-primary"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="9" cy="10" r="1" />
              <circle cx="15" cy="10" r="1" />
              <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-emergency-dark">{name}</h3>
            <p className="text-sm text-gray-500">
              {breed} · {age}살
            </p>
            {specialNeeds && (
              <div className="mt-2">
                <span className="inline-block text-xs font-medium py-1 px-2 bg-emergency-warning/10 text-emergency-warning rounded-full">
                  특별 관리 필요
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

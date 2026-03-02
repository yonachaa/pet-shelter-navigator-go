
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import dogProfileImg from "@/assets/dog-profile.png";

interface PetProfileProps {
  name: string;
  breed: string;
  age: number;
  registrationNo?: string;
  rabiesVaccinated?: boolean;
}

const PetProfile: React.FC<PetProfileProps> = ({ name, breed, age, registrationNo = "410123-2022-00581", rabiesVaccinated = true }) => {
  return (
    <Card className="glass-strong rounded-2xl border-0 shadow-apple overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3.5">
          <img
            src={dogProfileImg}
            alt={name}
            className="w-[52px] h-[52px] rounded-[14px] object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[17px] text-foreground leading-tight">{name}</h3>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              {breed} · {age} yrs
            </p>
            <div className="flex items-center gap-3 mt-1.5">
              {rabiesVaccinated && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success">
                  <CheckCircle2 className="h-3 w-3" />
                  Rabies
                </span>
              )}
              <span className="text-[11px] text-muted-foreground font-mono">
                #{registrationNo}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PetProfile;

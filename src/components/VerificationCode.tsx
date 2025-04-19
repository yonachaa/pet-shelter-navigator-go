
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface VerificationCodeProps {
  code: string;
  expiresIn: string;
  onRefresh: () => void;
}

const VerificationCode: React.FC<VerificationCodeProps> = ({
  code,
  expiresIn,
  onRefresh,
}) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "Show this code to staff",
    });
  };

  return (
    <Card className="mb-6 emergency-shadow border-none">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-emergency-dark">Authorization Code</h3>
          <span className="text-xs text-gray-500">{expiresIn} Expiring Soon</span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex-1 bg-emergency-primary/5 rounded-lg p-3 text-center">
            <span className="tracking-widest font-mono text-xl font-bold text-emergency-primary">
              {code}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopy}
            className="border-emergency-primary text-emergency-primary hover:bg-emergency-primary/5"
          >
            Copy
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onRefresh}
            className="text-gray-500 hover:text-emergency-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Show this code with your pet’s information upon arrival for quick entry.
        </p>
      </CardContent>
    </Card>
  );
};

export default VerificationCode;

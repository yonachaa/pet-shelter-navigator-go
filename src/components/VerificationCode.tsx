
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Copy } from "lucide-react";
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
    toast({ title: "Copied", description: "Show this code to shelter staff." });
  };

  return (
    <Card className="glass-strong rounded-2xl border-0 shadow-apple overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-[15px] text-foreground">Authorization Code</h3>
          <span className="text-[11px] text-muted-foreground font-medium">Expires in {expiresIn}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gradient-to-r from-primary/[0.06] to-primary/[0.02] rounded-xl p-3 text-center">
            <span className="tracking-[0.2em] font-mono text-xl font-bold text-primary">
              {code}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleCopy}
            className="h-10 w-10 rounded-xl border-border hover:bg-muted shrink-0"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={onRefresh}
            className="h-10 w-10 rounded-xl border-border hover:bg-muted shrink-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-[12px] text-muted-foreground mt-2.5 leading-relaxed">
          Present this code with your pet's documents upon arrival.
        </p>
      </CardContent>
    </Card>
  );
};

export default VerificationCode;

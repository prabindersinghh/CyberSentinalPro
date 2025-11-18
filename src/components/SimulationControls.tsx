import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wifi, Mail, Users, Smartphone } from "lucide-react";

interface SimulationControlsProps {
  onSimulate: (type: string) => void;
}

export const SimulationControls = ({ onSimulate }: SimulationControlsProps) => {
  return (
    <Card className="border-warning/20">
      <CardHeader>
        <CardTitle className="text-base">🔥 Attack Simulations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            onClick={() => onSimulate("mitm")}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 border-destructive/30 hover:bg-destructive/10"
          >
            <Wifi className="h-6 w-6 text-destructive" />
            <span className="text-xs">MITM Attack</span>
          </Button>
          <Button
            onClick={() => onSimulate("phishing")}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 border-warning/30 hover:bg-warning/10"
          >
            <Mail className="h-6 w-6 text-warning" />
            <span className="text-xs">Phishing Email</span>
          </Button>
          <Button
            onClick={() => onSimulate("behavior")}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 border-secondary/30 hover:bg-secondary/10"
          >
            <Users className="h-6 w-6 text-secondary" />
            <span className="text-xs">Behavior Anomaly</span>
          </Button>
          <Button
            onClick={() => onSimulate("iot")}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 border-primary/30 hover:bg-primary/10"
          >
            <Smartphone className="h-6 w-6 text-primary" />
            <span className="text-xs">IoT Attack</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

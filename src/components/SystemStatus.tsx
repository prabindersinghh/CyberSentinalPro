import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, HardDrive, Activity } from "lucide-react";

interface SystemStatusProps {
  stats: {
    cpuUsage: number;
    memoryUsage: number;
    activeConnections: number;
    threatsBlocked: number;
  };
}

export const SystemStatus = ({ stats }: SystemStatusProps) => {
  return (
    <Card className="border-primary/20">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">CPU</div>
              <div className="text-sm font-mono">{stats.cpuUsage}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">RAM</div>
              <div className="text-sm font-mono">{stats.memoryUsage}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-success" />
            <Badge variant="success" className="text-xs">
              OPERATIONAL
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

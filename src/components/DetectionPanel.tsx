import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface DetectionPanelProps {
  title: string;
  icon: LucideIcon;
  status: "ACTIVE" | "LEARNING" | "IDLE";
  detections: string[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "success";
    case "LEARNING":
      return "warning";
    case "IDLE":
      return "secondary";
    default:
      return "default";
  }
};

export const DetectionPanel = ({ title, icon: Icon, status, detections }: DetectionPanelProps) => {
  return (
    <Card className="border-primary/10 hover:border-primary/30 transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-primary" />
            <span>{title}</span>
          </div>
          <Badge variant={getStatusColor(status) as any} className="text-xs">
            {status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {detections.map((detection, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{detection}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Confidence</span>
            <span className="font-mono text-primary">98.7%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

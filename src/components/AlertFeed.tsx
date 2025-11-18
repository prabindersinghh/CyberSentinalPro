import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Shield, Mail, Users, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Alert {
  id: number;
  type: string;
  severity: string;
  title: string;
  description: string;
  timestamp: string;
  evidence: any;
}

interface AlertFeedProps {
  alerts: Alert[];
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case "MITM_ATTACK":
      return Wifi;
    case "PHISHING":
      return Mail;
    case "BEHAVIOR_ANOMALY":
      return Users;
    case "IOT_THREAT":
      return Shield;
    default:
      return AlertTriangle;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "CRITICAL":
      return "destructive";
    case "HIGH":
      return "warning";
    case "MEDIUM":
      return "secondary";
    default:
      return "default";
  }
};

export const AlertFeed = ({ alerts }: AlertFeedProps) => {
  return (
    <Card className="h-[calc(100vh-300px)] border-destructive/20 danger-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Real-Time Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="space-y-4">
            {alerts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No threats detected</p>
                <p className="text-xs mt-2">Use simulation controls to test detection engines</p>
              </div>
            ) : (
              alerts.map((alert) => {
                const Icon = getAlertIcon(alert.type);
                return (
                  <Card key={alert.id} className="border-l-4 border-l-destructive hover:bg-card/50 transition-colors">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <Badge variant={getSeverityColor(alert.severity) as any}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <h4 className="font-semibold mb-1">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {alert.description}
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="w-full">
                            View Evidence
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Icon className="h-5 w-5" />
                              {alert.title}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Alert Details</h4>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Type:</span>
                                  <span className="ml-2 font-mono">{alert.type}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Severity:</span>
                                  <Badge className="ml-2" variant={getSeverityColor(alert.severity) as any}>
                                    {alert.severity}
                                  </Badge>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-muted-foreground">Timestamp:</span>
                                  <span className="ml-2 font-mono">
                                    {new Date(alert.timestamp).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Evidence</h4>
                              <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs">
                                {JSON.stringify(alert.evidence, null, 2)}
                              </pre>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Recommended Actions</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                <li>Isolate affected systems from network</li>
                                <li>Capture network traffic for forensic analysis</li>
                                <li>Update security policies and firewall rules</li>
                                <li>Notify security operations team</li>
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

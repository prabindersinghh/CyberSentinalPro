import { useState, useEffect } from "react";
import { Shield, Activity, AlertTriangle, Users, Network, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertFeed } from "@/components/AlertFeed";
import { ThreatMap } from "@/components/ThreatMap";
import { DetectionPanel } from "@/components/DetectionPanel";
import { SystemStatus } from "@/components/SystemStatus";
import { SimulationControls } from "@/components/SimulationControls";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [systemStats, setSystemStats] = useState({
    threatsBlocked: 0,
    activeConnections: 147,
    cpuUsage: 23,
    memoryUsage: 45,
  });
  const { toast } = useToast();

  const handleSimulation = (type: string) => {
    const timestamp = new Date().toISOString();
    let alert: any;

    switch (type) {
      case "mitm":
        alert = {
          id: Date.now(),
          type: "MITM_ATTACK",
          severity: "CRITICAL",
          title: "Man-in-the-Middle Attack Detected",
          description: "ARP spoofing attempt detected from 192.168.1.105",
          timestamp,
          evidence: {
            sourceMAC: "AA:BB:CC:DD:EE:FF",
            targetIP: "192.168.1.1",
            anomalyScore: 0.94,
          },
        };
        break;
      case "phishing":
        alert = {
          id: Date.now(),
          type: "PHISHING",
          severity: "HIGH",
          title: "Phishing Email Detected",
          description: "Suspicious email with credential harvesting attempt",
          timestamp,
          evidence: {
            sender: "admin@paypa1-security.com",
            probability: 0.89,
            urlEntropy: 3.7,
          },
        };
        break;
      case "behavior":
        alert = {
          id: Date.now(),
          type: "BEHAVIOR_ANOMALY",
          severity: "MEDIUM",
          title: "Unusual User Behavior",
          description: "Login from new location detected",
          timestamp,
          evidence: {
            user: "john.doe@company.com",
            location: "Moscow, Russia",
            behaviorScore: 0.72,
          },
        };
        break;
      case "iot":
        alert = {
          id: Date.now(),
          type: "IOT_THREAT",
          severity: "HIGH",
          title: "IoT Device Compromised",
          description: "Smart camera sending data to unknown server",
          timestamp,
          evidence: {
            device: "Camera-Living-Room",
            destination: "185.220.101.45:8080",
            dataVolume: "2.3 GB",
          },
        };
        break;
    }

    setAlerts((prev) => [alert, ...prev]);
    setSystemStats((prev) => ({
      ...prev,
      threatsBlocked: prev.threatsBlocked + 1,
    }));

    toast({
      title: "⚠️ Threat Detected",
      description: alert.title,
      variant: alert.severity === "CRITICAL" ? "destructive" : "default",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats((prev) => ({
        ...prev,
        activeConnections: Math.floor(140 + Math.random() * 20),
        cpuUsage: Math.floor(20 + Math.random() * 15),
        memoryUsage: Math.floor(40 + Math.random() * 15),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Shield className="h-10 w-10 text-primary cyber-glow" />
          <div>
            <h1 className="text-3xl font-bold cyber-text">CYBERSENTINEL</h1>
            <p className="text-sm text-muted-foreground">
              Agentic AI-Powered Threat Detection System
            </p>
          </div>
        </div>
        <SystemStatus stats={systemStats} />
      </header>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/20 cyber-glow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{systemStats.threatsBlocked}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            <Network className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {systemStats.activeConnections}
            </div>
            <p className="text-xs text-muted-foreground">Real-time monitoring</p>
          </CardContent>
        </Card>

        <Card className="border-success/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Optimal</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>

        <Card className="border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Detection Engines</CardTitle>
            <AlertTriangle className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">5/5</div>
            <p className="text-xs text-muted-foreground">Active & learning</p>
          </CardContent>
        </Card>
      </div>

      {/* Simulation Controls */}
      <SimulationControls onSimulate={handleSimulation} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Threat Map & Detection Panels */}
        <div className="lg:col-span-2 space-y-6">
          <ThreatMap />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetectionPanel
              title="Rule Engine"
              icon={Shield}
              status="ACTIVE"
              detections={["ARP Spoofing", "DNS Poisoning", "MITM Detection"]}
            />
            <DetectionPanel
              title="AI Anomaly"
              icon={Activity}
              status="LEARNING"
              detections={["Zero-Day Detection", "Traffic Analysis", "Behavioral Patterns"]}
            />
            <DetectionPanel
              title="Phishing Guard"
              icon={Mail}
              status="ACTIVE"
              detections={["Email Scanning", "URL Analysis", "Spear-Phishing"]}
            />
            <DetectionPanel
              title="UEBA Engine"
              icon={Users}
              status="ACTIVE"
              detections={["User Behavior", "Entity Analytics", "Insider Threats"]}
            />
          </div>
        </div>

        {/* Right Column - Alert Feed */}
        <div className="lg:col-span-1">
          <AlertFeed alerts={alerts} />
        </div>
      </div>
    </div>
  );
};

export default Index;

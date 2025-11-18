import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

export const ThreatMap = () => {
  const [threats, setThreats] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreats((prev) => {
        const newThreat = {
          x: Math.random() * 100,
          y: Math.random() * 100,
          id: Date.now(),
        };
        return [...prev.slice(-10), newThreat];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-primary/20 scan-line">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Global Threat Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-64 bg-muted/20 rounded-lg overflow-hidden border border-primary/10">
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Threat Points */}
          {threats.map((threat) => (
            <div
              key={threat.id}
              className="absolute w-3 h-3 animate-ping"
              style={{
                left: `${threat.x}%`,
                top: `${threat.y}%`,
                background: "hsl(var(--destructive))",
                borderRadius: "50%",
                boxShadow: "0 0 20px hsl(var(--destructive))",
              }}
            />
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {threats.map((threat, i) => {
              if (i === 0) return null;
              const prev = threats[i - 1];
              return (
                <line
                  key={`line-${threat.id}`}
                  x1={`${prev.x}%`}
                  y1={`${prev.y}%`}
                  x2={`${threat.x}%`}
                  y2={`${threat.y}%`}
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  opacity="0.3"
                />
              );
            })}
          </svg>

          {/* Center Node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-primary rounded-full cyber-glow pulse-cyber" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Active Threats</div>
            <div className="text-xl font-bold text-destructive">{threats.length}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Countries</div>
            <div className="text-xl font-bold text-warning">23</div>
          </div>
          <div>
            <div className="text-muted-foreground">Blocked IPs</div>
            <div className="text-xl font-bold text-success">1,547</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

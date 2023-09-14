"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_COUNTS } from "@/constants";
import { Button } from "@/components/ui/button";

interface TrialCounterProps {
  usageLimitCount: number;
}

const TrialCounter = ({ usageLimitCount = 0 }: TrialCounterProps) => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {usageLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(usageLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button className="w-full text-md" variant="premium">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrialCounter;

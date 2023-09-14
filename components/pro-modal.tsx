"use client";

import {
  Check,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    bgColor: "bg-violet-500/10",
    color: "text-violet-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    bgColor: "bg-green-700/10",
    color: "text-green-700",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    bgColor: "bg-pink-700/10",
    color: "text-pink-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    bgColor: "bg-orange-700/10",
    color: "text-orange-700",
  },
];

const ProModal = () => {
  const proModal = useProModal();

  return (
    <div>
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
              <div className="flex items-center gap-x-2 font-bold py-1">
                Upgrade to Premium
                <Badge className="uppercase text-sm py-1" variant="premium">
                  pro
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
              {tools.map((tool) => (
                <Card
                  key={tool.label}
                  className="p-3 border-black/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("w-6 h-6", tool.color)} />
                    </div>
                    <div className="font-semibold text-sm">{tool.label}</div>
                  </div>
                  <Check className="text-primary w-5 h-5" />
                </Card>
              ))}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button size="lg" variant="premium" className="w-full" >
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProModal;

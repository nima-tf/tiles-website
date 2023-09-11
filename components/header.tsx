import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

const Header = ({
  title,
  description,
  icon: Icon,
  iconColor,
  iconBg,
}: HeaderProps) => {
  return (
    <div className="flex px-4 lg:px-8 items-center mb-8 gap-x-3">
      <div className={cn("w-fit p-2 rounded-md", iconBg)}>
        <Icon className={cn("h-8 w-8 ", iconColor)} />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Header;
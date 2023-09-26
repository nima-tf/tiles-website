import { Settings } from "lucide-react";

import Header from "@/components/header";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/subscription-button";

const SettingsPage = async () => {
    const isPro = await checkSubscription();
  return (
    <div>
      <Header
        title="Settings"
        description="Manage account settings."
        icon={Settings}
        iconBg="bg-gray-700/10"
        iconColor="text-gray-700"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
            {isPro? "You are currently on a pro plan." : "You are currently on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro}/>
      </div>
    </div>
  );
};

export default SettingsPage;

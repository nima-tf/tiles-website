import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

import { getUsageLimitCount } from "@/lib/usage-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const usageLimit = await getUsageLimitCount();
  const isPro = await checkSubscription();
 
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72  md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar usageLimitCount={usageLimit} isPro={isPro} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

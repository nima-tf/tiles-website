import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

import { getUsageLimitCount } from "@/lib/usage-limit";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const usageLimit = await getUsageLimitCount();
 
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72  md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar usageLimitCount={usageLimit} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

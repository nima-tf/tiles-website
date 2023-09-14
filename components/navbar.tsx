import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import MobileSlider from "@/components/mobile-sidebar";
import { getUsageLimitCount } from "@/lib/usage-limit";

const Navbar = async () => {
  const usageLimitCount = await getUsageLimitCount();
  return (
    <div className="flex items-center p-4">
      <Button variant="ghost" size="icon" className="md:hidden">
        <MobileSlider usageLimitCount={usageLimitCount} />
      </Button>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;

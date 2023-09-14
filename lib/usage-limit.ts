import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const increaseUsageLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userUsageLimit = await prismadb.userUsageLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userUsageLimit) {
    await prismadb.userUsageLimit.update({
      where: { userId: userId },
      data: { count: userUsageLimit.count + 1 },
    });
  } else {
    await prismadb.userUsageLimit.create({
      data: {
        userId: userId,
        count: 1,
      },
    });
  }
};

export const checkUsageLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userUsageLimit = await prismadb.userUsageLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userUsageLimit || userUsageLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getUsageLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const userUsageLimit = await prismadb.userUsageLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userUsageLimit) {
    return userUsageLimit.count;
  } else {
    return 0;
  }
};

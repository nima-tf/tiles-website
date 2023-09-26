"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("9128bb4c-876c-4178-85b6-49d4aeba63fb");
  }, []);

  return null;
};

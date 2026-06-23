"use client";

import React, { ReactNode } from "react";
import { CompareProvider } from "@/context/CompareContext";
import CompareFloatingButton from "@/components/CompareFloatingButton";

import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CompareProvider>
        {children}
        <CompareFloatingButton />
      </CompareProvider>
    </ThemeProvider>
  );
}

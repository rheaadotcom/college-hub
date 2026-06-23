"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { College } from "@/types/college";

interface CompareContextType {
  selectedColleges: College[];
  addCollege: (college: College) => void;
  removeCollege: (collegeId: number) => void;
  clearComparison: () => void;
  isComparing: (collegeId: number) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);

  const addCollege = (college: College) => {
    if (selectedColleges.some((c) => c.id === college.id)) {
      return; // Already added
    }
    
    if (selectedColleges.length >= 3) {
      alert("You can only compare up to 3 colleges at a time.");
      return;
    }

    setSelectedColleges((prev) => [...prev, college]);
  };

  const removeCollege = (collegeId: number) => {
    setSelectedColleges((prev) => prev.filter((c) => c.id !== collegeId));
  };

  const clearComparison = () => {
    setSelectedColleges([]);
  };

  const isComparing = (collegeId: number) => {
    return selectedColleges.some((c) => c.id === collegeId);
  };

  return (
    <CompareContext.Provider
      value={{
        selectedColleges,
        addCollege,
        removeCollege,
        clearComparison,
        isComparing,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}

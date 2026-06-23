"use client";

import { useCompare } from "@/context/CompareContext";
import { College } from "@/types/college";
import { GitCompare, Check } from "lucide-react";

interface CompareActionButtonProps {
  college: College;
}

export default function CompareActionButton({ college }: CompareActionButtonProps) {
  const { addCollege, removeCollege, isComparing, selectedColleges } = useCompare();
  const comparing = isComparing(college.id);

  const handleCompareClick = () => {
    if (comparing) {
      removeCollege(college.id);
    } else {
      if (selectedColleges.length >= 3) {
        alert("You can only compare up to 3 colleges at a time.");
        return;
      }
      addCollege(college);
    }
  };

  return (
    <button 
      onClick={handleCompareClick}
      className={`inline-flex items-center px-4 py-2 border rounded-xl font-medium transition-colors shadow-sm ${
        comparing
          ? "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
      }`}
    >
      {comparing ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Added to Compare
        </>
      ) : (
        <>
          <GitCompare className="w-4 h-4 mr-2 text-gray-500" />
          Compare
        </>
      )}
    </button>
  );
}

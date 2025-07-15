"use client";

import { useState, useEffect } from "react";
import { Clock, X, Menu } from "lucide-react";
import StepSidebar from "@/components/step-sidebar";
import StepContent from "@/components/step-content";
import { Button } from "@/components/ui/button";
import { demoProject } from "@/data/demo-project";

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(14);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNextStep = () => {
    if (activeStep < demoProject.steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Corresponds to md: breakpoint in Tailwind
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b p-3 flex justify-between items-center bg-white z-20">
        <div className="flex items-center gap-2">
          {/* Hamburger menu for mobile, shown only below md screens */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          {/* The 'X' close button, hidden on smaller screens */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hidden md:flex"
          >
            <X className="h-4 w-4" />
          </Button>
          <h1 className="text-sm font-medium truncate text-wrap">{demoProject.title}</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed top-0 left-0 h-full w-72 border-r overflow-y-auto bg-gray-50 z-40
            transform transition-transform ease-in-out
            md:relative md:translate-x-0
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <StepSidebar
            steps={demoProject.steps}
            activeStep={activeStep}
            onStepClick={(stepIndex) => {
              setActiveStep(stepIndex);
              setIsSidebarOpen(false); // Close sidebar after clicking an item on mobile
            }}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <StepContent step={demoProject.steps[activeStep]} />

          {/* Navigation */}
          <div className="flex justify-between p-4 border-t bg-white md:bg-transparent">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={activeStep === demoProject.steps.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

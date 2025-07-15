"use client"

import { cn } from "@/lib/utils"
import type { Step } from "@/types/step"
import { CheckCircle } from "lucide-react"

interface StepSidebarProps {
  steps: Step[]
  activeStep: number
  onStepClick: (index: number) => void
}

export default function StepSidebar({ steps, activeStep, onStepClick }: StepSidebarProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="py-2 flex-grow">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;

          return (
            <button
              key={index}
              className={cn(
                "w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-gray-100 transition-colors",
                isActive && "bg-gray-100"
              )}
              onClick={() => onStepClick(index)}
            >
              <div className="flex-shrink-0 mt-0.5">
                <div
                  className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full border text-xs font-medium",
                    isCompleted
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "border-gray-300",
                    isActive && !isCompleted && "border-blue-500 text-blue-500"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
              </div>
              <div>
                <p
                  className={cn(
                    "font-medium text-sm",
                    isActive && "text-blue-500"
                  )}
                >
                  {step.title}
                </p>
                {step.subtitle && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step.subtitle}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <div className="px-4 py-2 pb-8 text-sm text-muted-foreground text-center">
        Designed by{" "}
        <span className="font-bold text-blue-500">
          <a href="https://www.skygazeindia.com/" target="_blank">
            Skygaze India
          </a>
        </span>
      </div>
    </div>
  );
}

"use client"

import { useState } from "react"
import { Clock, X } from "lucide-react"
import StepSidebar from "@/components/step-sidebar"
import StepContent from "@/components/step-content"
import { Button } from "@/components/ui/button"
import { demoProject } from "@/data/demo-project"

export default function Home() {
  const [activeStep, setActiveStep] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(50) // in minutes

  const handleNextStep = () => {
    if (activeStep < demoProject.steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b p-3 flex justify-between items-center bg-white">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
          <h1 className="text-sm font-medium truncate">{demoProject.title}</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{timeRemaining} mins remaining</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 border-r overflow-y-auto bg-gray-50">
          <StepSidebar steps={demoProject.steps} activeStep={activeStep} onStepClick={setActiveStep} />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <StepContent step={demoProject.steps[activeStep]} />

          {/* Navigation */}
          <div className="flex justify-between p-4 border-t">
            <Button variant="outline" onClick={handlePreviousStep} disabled={activeStep === 0}>
              Back
            </Button>
            <Button onClick={handleNextStep} disabled={activeStep === demoProject.steps.length - 1}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

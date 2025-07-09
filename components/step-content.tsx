import type { Step } from "@/types/step"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import CodeBlock from "@/components/code-block"
import Image from "next/image"

interface StepContentProps {
  step: Step
}

export default function StepContent({ step }: StepContentProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-1">
        {step.number}. {step.title}
      </h2>
      {step.subtitle && <p className="text-muted-foreground mb-4">{step.subtitle}</p>}

      <div className="space-y-6">
        {step.content.map((item, index) => {
          switch (item.type) {
            case "text":
              return (
                <p key={index} className="text-sm leading-relaxed">
                  {item.content}
                </p>
              )

            case "image":
              return (
                <div key={index} className="my-4 border rounded-md overflow-hidden">
                  <Image
                    src={item.url || "/placeholder.svg"}
                    alt={item.alt || step.title}
                    width={item.width || 800}
                    height={item.height || 450}
                    className="w-full h-auto"
                  />
                  {item.caption && (
                    <p className="text-xs text-center text-muted-foreground p-2 bg-gray-50">{item.caption}</p>
                  )}
                </div>
              )

            case "code":
              return <CodeBlock key={index} code={item.content} language={item.language} />

            case "link":
              return (
                <div key={index} className="my-2">
                  <Button variant="link" className="p-0 h-auto text-blue-500 flex items-center gap-1" asChild>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.text} <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              )

            case "question":
              return (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-md p-4 my-4">
                  <h3 className="font-medium text-blue-800 mb-2">{item.question}</h3>
                  {item.options && (
                    <div className="space-y-2 mt-2">
                      {item.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <input
                            type="radio"
                            id={`option-${index}-${optIndex}`}
                            name={`question-${index}`}
                            className="h-4 w-4 text-blue-600"
                          />
                          <label htmlFor={`option-${index}-${optIndex}`} className="text-sm">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.inputType === "text" && (
                    <input
                      type="text"
                      placeholder={item.placeholder || "Type your answer here..."}
                      className="w-full mt-2 p-2 border rounded-md text-sm"
                    />
                  )}
                </div>
              )

            default:
              return null
          }
        })}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  fileName?: string
}

export default function CodeBlock({ code, language = "javascript", fileName }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-md overflow-hidden border">
      {fileName && (
        <div className="bg-gray-100 px-4 py-2 text-xs font-mono border-b flex items-center justify-between">
          <span>{fileName}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyToClipboard}>
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </Button>
        </div>
      )}
      <pre className={cn("p-4 text-sm overflow-x-auto", !fileName && "relative")}>
        {!fileName && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-6 w-6 bg-white/90 hover:bg-white/70"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </Button>
        )}
        <code className="language-{language}">{code}</code>
      </pre>
    </div>
  )
}

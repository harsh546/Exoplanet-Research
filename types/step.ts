export interface ContentItem {
  type: "text" | "image" | "code" | "link" | "question"
  content?: string
  url?: string
  alt?: string
  width?: number
  height?: number
  caption?: string
  language?: string
  text?: string
  question?: string
  options?: string[]
  inputType?: "text" | "radio"
  placeholder?: string
}

export interface Step {
  number: number
  title: string
  subtitle?: string
  content: ContentItem[]
  isCompleted?: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  estimatedTime: number
  steps: Step[]
}

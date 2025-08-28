'use client'

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({ 
  code, 
  language = 'javascript', 
  filename, 
  showLineNumbers = false,
  className = "" 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const lines = code.split('\n')

  return (
    <div className={`my-8 ${className}`}>
      <div className="relative bg-card-background border border-border rounded-2xl overflow-hidden shadow-sm">
        {/* Header with filename */}
        {filename && (
          <div className="px-4 py-3 bg-background-secondary border-b border-border flex items-center justify-between">
            <span className="text-sm font-mono text-foreground-muted">
              {filename}
            </span>
            <span className="text-xs text-foreground-muted uppercase tracking-wide">
              {language}
            </span>
          </div>
        )}
        
        {/* Code content */}
        <div className="relative">
          <pre className="p-6 overflow-x-auto text-sm">
            <code className="font-mono text-foreground">
              {showLineNumbers ? (
                <div className="table">
                  {lines.map((line, index) => (
                    <div key={index} className="table-row">
                      <span className="table-cell text-foreground-muted pr-4 select-none text-right">
                        {index + 1}
                      </span>
                      <span className="table-cell">
                        {line || '\n'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                code
              )}
            </code>
          </pre>
          
          {/* Copy button */}
          <button
            onClick={copyToClipboard}
            className="absolute top-4 right-4 p-2 bg-background-secondary border border-border rounded-lg hover:bg-background-tertiary transition-all duration-200 group"
            title={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4 text-foreground-muted group-hover:text-foreground" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

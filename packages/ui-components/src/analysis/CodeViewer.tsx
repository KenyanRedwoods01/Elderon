import React, { useState } from 'react'
import { Copy, Check, Eye, EyeOff } from 'lucide-react'
import { clsx } from 'clsx'

export interface CodeViewerProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  maxHeight?: string
  className?: string
  copyable?: boolean
  collapsible?: boolean
}

const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  language = 'javascript',
  showLineNumbers = true,
  maxHeight = '400px',
  className,
  copyable = true,
  collapsible = false
}) => {
  const [copied, setCopied] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const lines = code.split('\n')

  return (
    <div className={clsx('bg-gray-900 rounded-lg overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">{language}</span>
          {showLineNumbers && (
            <span className="text-xs text-gray-500">
              {lines.length} lines
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {collapsible && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
            >
              {isCollapsed ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          )}
          
          {copyable && (
            <button
              onClick={handleCopy}
              className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Code Content */}
      {!isCollapsed && (
        <div className="relative">
          <pre
            className="p-4 text-sm text-gray-100 overflow-auto"
            style={{ maxHeight }}
          >
            <code>
              {lines.map((line, index) => (
                <div key={index} className="flex">
                  {showLineNumbers && (
                    <span className="text-gray-500 mr-4 select-none w-8 text-right">
                      {index + 1}
                    </span>
                  )}
                  <span className="flex-1">{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </div>
  )
}

export default CodeViewer
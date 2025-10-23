import React, { useState } from 'react'
import { clsx } from 'clsx'

export interface Tab {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

export interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
  variant?: 'default' | 'pills' | 'underline'
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  className,
  variant = 'default'
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const variants = {
    default: 'border-b border-gray-200',
    pills: 'space-x-1',
    underline: 'border-b border-gray-200'
  }

  const tabVariants = {
    default: {
      active: 'border-enterprise-blue text-enterprise-blue',
      inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    },
    pills: {
      active: 'bg-enterprise-blue text-white',
      inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
    },
    underline: {
      active: 'border-enterprise-blue text-enterprise-blue',
      inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }
  }

  return (
    <div className={className}>
      <div className={clsx('flex', variants[variant])}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            disabled={tab.disabled}
            className={clsx(
              'px-4 py-2 text-sm font-medium transition-colors duration-200',
              variant === 'pills' ? 'rounded-lg' : 'border-b-2',
              tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
              activeTab === tab.id
                ? tabVariants[variant].active
                : tabVariants[variant].inactive
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}

export default Tabs
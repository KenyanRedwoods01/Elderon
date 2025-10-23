import React from 'react'
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'
import { clsx } from 'clsx'

export interface RiskIndicatorProps {
  level: 'low' | 'medium' | 'high' | 'critical'
  label?: string
  className?: string
  showIcon?: boolean
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({
  level,
  label,
  className,
  showIcon = true
}) => {
  const getLevelConfig = () => {
    switch (level) {
      case 'low':
        return {
          color: 'text-green-600 bg-green-100',
          icon: CheckCircle,
          text: 'Low Risk'
        }
      case 'medium':
        return {
          color: 'text-yellow-600 bg-yellow-100',
          icon: Info,
          text: 'Medium Risk'
        }
      case 'high':
        return {
          color: 'text-orange-600 bg-orange-100',
          icon: AlertTriangle,
          text: 'High Risk'
        }
      case 'critical':
        return {
          color: 'text-red-600 bg-red-100',
          icon: XCircle,
          text: 'Critical Risk'
        }
      default:
        return {
          color: 'text-gray-600 bg-gray-100',
          icon: Info,
          text: 'Unknown Risk'
        }
    }
  }

  const config = getLevelConfig()
  const Icon = config.icon

  return (
    <div className={clsx('inline-flex items-center', className)}>
      <span
        className={clsx(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          config.color
        )}
      >
        {showIcon && <Icon className="h-3 w-3 mr-1" />}
        {label || config.text}
      </span>
    </div>
  )
}

export default RiskIndicator
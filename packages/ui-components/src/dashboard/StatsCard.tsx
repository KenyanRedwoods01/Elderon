import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { clsx } from 'clsx'

export interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: string | number
    type: 'positive' | 'negative' | 'neutral'
  }
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray'
  className?: string
  loading?: boolean
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'blue',
  className,
  loading = false
}) => {
  const colors = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    red: 'text-red-600 bg-red-100',
    purple: 'text-purple-600 bg-purple-100',
    gray: 'text-gray-600 bg-gray-100'
  }

  if (loading) {
    return (
      <div className={clsx('bg-white rounded-lg shadow-sm border border-gray-200 p-6', className)}>
        <div className="animate-pulse">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div className="ml-4 flex-1">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx('bg-white rounded-lg shadow-sm border border-gray-200 p-6', className)}
    >
      <div className="flex items-center">
        {icon && (
          <div className={clsx('p-3 rounded-lg', colors[color])}>
            {icon}
          </div>
        )}
        <div className={clsx('flex-1', icon && 'ml-4')}>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change && (
              <div className={clsx(
                'ml-2 flex items-center text-sm',
                change.type === 'positive' ? 'text-green-600' :
                change.type === 'negative' ? 'text-red-600' : 'text-gray-600'
              )}>
                {change.type === 'positive' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : change.type === 'negative' ? (
                  <TrendingDown className="h-4 w-4" />
                ) : null}
                <span className="ml-1">{change.value}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default StatsCard
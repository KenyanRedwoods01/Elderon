import React from 'react'
import { LoadingSpinner } from '../ui/LoadingSpinner'

export interface LoadingStateProps {
  message?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 'md',
  className
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <LoadingSpinner size={size} />
      <p className="mt-4 text-sm text-gray-600">{message}</p>
    </div>
  )
}

export default LoadingState
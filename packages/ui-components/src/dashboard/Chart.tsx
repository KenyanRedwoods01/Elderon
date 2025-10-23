import React from 'react'
import { clsx } from 'clsx'

export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface ChartProps {
  data: ChartData[]
  type?: 'bar' | 'line' | 'pie' | 'area'
  title?: string
  className?: string
  height?: number
  showLegend?: boolean
  showGrid?: boolean
}

const Chart: React.FC<ChartProps> = ({
  data,
  type = 'bar',
  title,
  className,
  height = 300,
  showLegend = true,
  showGrid = true
}) => {
  const maxValue = Math.max(...data.map(d => d.value))
  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
  ]

  const getBarChart = () => (
    <div className="flex items-end justify-between h-full space-x-2">
      {data.map((item, index) => (
        <div key={item.name} className="flex-1 flex flex-col items-center">
          <div
            className="w-full rounded-t transition-all duration-300 hover:opacity-80"
            style={{
              height: `${(item.value / maxValue) * 100}%`,
              backgroundColor: item.color || colors[index % colors.length],
              minHeight: '4px'
            }}
          />
          <div className="mt-2 text-xs text-gray-600 text-center">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  )

  const getLineChart = () => (
    <div className="relative h-full">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {showGrid && (
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
        )}
        {showGrid && <rect width="100%" height="100%" fill="url(#grid)" />}
        
        <polyline
          fill="none"
          stroke={colors[0]}
          strokeWidth="2"
          points={data.map((item, index) => 
            `${(index / (data.length - 1)) * 380 + 10},${180 - (item.value / maxValue) * 160 + 10}`
          ).join(' ')}
        />
        
        {data.map((item, index) => (
          <circle
            key={item.name}
            cx={(index / (data.length - 1)) * 380 + 10}
            cy={180 - (item.value / maxValue) * 160 + 10}
            r="4"
            fill={item.color || colors[0]}
            className="hover:r-6 transition-all duration-200"
          />
        ))}
      </svg>
    </div>
  )

  const getPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    let currentAngle = 0

    return (
      <div className="relative w-full h-full">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const angle = (percentage / 100) * 360
            const startAngle = currentAngle
            const endAngle = currentAngle + angle
            currentAngle += angle

            const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180)
            const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180)
            const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180)
            const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180)
            const largeArcFlag = angle > 180 ? 1 : 0

            return (
              <path
                key={item.name}
                d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={item.color || colors[index % colors.length]}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            )
          })}
        </svg>
      </div>
    )
  }

  const getAreaChart = () => (
    <div className="relative h-full">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {showGrid && (
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
        )}
        {showGrid && <rect width="100%" height="100%" fill="url(#grid)" />}
        
        <path
          d={`M 10,${180 - (data[0]?.value / maxValue) * 160 + 10} ${data.map((item, index) => 
            `L ${(index / (data.length - 1)) * 380 + 10},${180 - (item.value / maxValue) * 160 + 10}`
          ).join(' ')} L ${(data.length - 1) / (data.length - 1) * 380 + 10},180 L 10,180 Z`}
          fill={`url(#gradient-${type})`}
          opacity="0.3"
        />
        
        <polyline
          fill="none"
          stroke={colors[0]}
          strokeWidth="2"
          points={data.map((item, index) => 
            `${(index / (data.length - 1)) * 380 + 10},${180 - (item.value / maxValue) * 160 + 10}`
          ).join(' ')}
        />
      </svg>
      
      <defs>
        <linearGradient id={`gradient-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} stopOpacity="0.8"/>
          <stop offset="100%" stopColor={colors[0]} stopOpacity="0.1"/>
        </linearGradient>
      </defs>
    </div>
  )

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return getBarChart()
      case 'line':
        return getLineChart()
      case 'pie':
        return getPieChart()
      case 'area':
        return getAreaChart()
      default:
        return getBarChart()
    }
  }

  return (
    <div className={clsx('bg-white rounded-lg shadow-sm border border-gray-200 p-6', className)}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      
      <div style={{ height: `${height}px` }}>
        {renderChart()}
      </div>
      
      {showLegend && (
        <div className="mt-4 flex flex-wrap gap-4">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color || colors[index % colors.length] }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Chart
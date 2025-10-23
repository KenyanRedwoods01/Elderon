import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

export interface DropdownItem {
  id: string
  label: string
  value: any
  disabled?: boolean
  icon?: React.ReactNode
  onClick?: () => void
}

export interface DropdownProps {
  items: DropdownItem[]
  value?: any
  onChange?: (item: DropdownItem) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  trigger?: React.ReactNode
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className,
  trigger
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedItem = items.find(item => item.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      onChange?.(item)
      setIsOpen(false)
      item.onClick?.()
    }
  }

  return (
    <div ref={dropdownRef} className={clsx('relative', className)}>
      {trigger ? (
        <div onClick={() => !disabled && setIsOpen(!isOpen)}>
          {trigger}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={clsx(
            'relative w-full bg-white border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-enterprise-blue focus:border-enterprise-blue',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span className={clsx(
            'block truncate',
            selectedItem ? 'text-gray-900' : 'text-gray-500'
          )}>
            {selectedItem ? selectedItem.label : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className={clsx(
              'h-5 w-5 text-gray-400 transition-transform duration-200',
              isOpen && 'rotate-180'
            )} />
          </span>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
          >
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={clsx(
                  'relative w-full py-2 pl-3 pr-9 text-left cursor-pointer transition-colors duration-200',
                  item.disabled
                    ? 'opacity-50 cursor-not-allowed text-gray-400'
                    : 'text-gray-900 hover:bg-gray-100',
                  selectedItem?.id === item.id && 'bg-enterprise-blue text-white hover:bg-blue-600'
                )}
              >
                <div className="flex items-center">
                  {item.icon && (
                    <span className="mr-3">{item.icon}</span>
                  )}
                  <span className="block truncate">{item.label}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown
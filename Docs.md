# 🏗️ ElderonAI - Enterprise Platform Continuation

Based on my analysis of the comprehensive ElderonAI platform architecture, I'll now continue with the remaining critical components for the enterprise-grade gateway application and documentation system.

## **🔐 Organization Selection Interface**

```tsx
// apps/gateway/src/components/organizations/org-switcher.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building, 
  Plus, 
  Search, 
  Users, 
  Shield, 
  Settings,
  ChevronDown,
  LogOut
} from 'lucide-react'

interface Organization {
  id: string
  name: string
  logo?: string
  plan: 'starter' | 'professional' | 'enterprise'
  memberCount: number
  lastActive: Date
  securityLevel: 'basic' | 'standard' | 'advanced'
}

export function OrganizationSwitcher() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Mock data - replace with API call
    const mockOrgs: Organization[] = [
      {
        id: '1',
        name: 'Acme Corporation',
        plan: 'enterprise',
        memberCount: 245,
        lastActive: new Date(),
        securityLevel: 'advanced'
      },
      {
        id: '2',
        name: 'Tech Innovations Ltd',
        plan: 'professional',
        memberCount: 42,
        lastActive: new Date(Date.now() - 86400000),
        securityLevel: 'standard'
      },
      {
        id: '3',
        name: 'Startup Ventures',
        plan: 'starter',
        memberCount: 8,
        lastActive: new Date(Date.now() - 172800000),
        securityLevel: 'basic'
      }
    ]
    setOrganizations(mockOrgs)
    setSelectedOrg(mockOrgs[0])
  }, [])

  const filteredOrgs = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOrgSelect = (org: Organization) => {
    setSelectedOrg(org)
    setIsOpen(false)
    // Redirect to organization dashboard
    window.location.href = `/org/${org.id}/dashboard`
  }

  return (
    <div className="relative">
      {/* Current Organization Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 bg-white transition-colors w-full max-w-xs"
      >
        {selectedOrg?.logo ? (
          <img
            src={selectedOrg.logo}
            alt={selectedOrg.name}
            className="w-8 h-8 rounded-lg"
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-r from-enterprise-blue to-enterprise-purple rounded-lg flex items-center justify-center">
            <Building className="w-4 h-4 text-white" />
          </div>
        )}
        
        <div className="flex-1 text-left">
          <div className="font-semibold text-gray-900 text-sm truncate">
            {selectedOrg?.name}
          </div>
          <div className="text-xs text-gray-500 capitalize">
            {selectedOrg?.plan} • {selectedOrg?.memberCount} members
          </div>
        </div>
        
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Organization Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Select Organization</h3>
                <button className="text-xs text-enterprise-blue hover:text-blue-700 font-medium">
                  Manage
                </button>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-enterprise-blue focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Organization List */}
            <div className="max-h-64 overflow-y-auto">
              {filteredOrgs.map((org, index) => (
                <motion.button
                  key={org.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleOrgSelect(org)}
                  className={`w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 transition-colors ${
                    selectedOrg?.id === org.id ? 'bg-blue-50 border-r-2 border-enterprise-blue' : ''
                  }`}
                >
                  {org.logo ? (
                    <img
                      src={org.logo}
                      alt={org.name}
                      className="w-10 h-10 rounded-lg"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-r from-enterprise-blue to-enterprise-purple rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">
                      {org.name}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                      <Users className="w-3 h-3" />
                      <span>{org.memberCount} members</span>
                      <Shield className="w-3 h-3 ml-2" />
                      <span className="capitalize">{org.securityLevel} security</span>
                    </div>
                  </div>
                  
                  <div className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                    org.plan === 'enterprise' 
                      ? 'bg-purple-100 text-purple-800'
                      : org.plan === 'professional'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {org.plan}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="p-3 border-t border-gray-200 space-y-2">
              <button className="w-full flex items-center justify-center space-x-2 p-2 text-enterprise-blue hover:bg-blue-50 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Create New Organization</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

## 🔐 MFA Setup Components

```tsx
// apps/gateway/src/components/auth/mfa-setup.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Smartphone, 
  Mail, 
  Key, 
  CheckCircle,
  Copy,
  RefreshCw
} from 'lucide-react'

type MfaMethod = 'authenticator' | 'sms' | 'email' | 'biometric'

interface MfaSetupProps {
  onComplete: () => void
  onCancel: () => void
}

export function MfaSetup({ onComplete, onCancel }: MfaSetupProps) {
  const [selectedMethod, setSelectedMethod] = useState<MfaMethod>('authenticator')
  const [step, setStep] = useState<'select' | 'setup' | 'verify' | 'complete'>('select')
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', ''])
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const mfaMethods = [
    {
      id: 'authenticator',
      name: 'Authenticator App',
      description: 'Use Google Authenticator, Authy, or similar apps',
      icon: Smartphone,
      security: 'High',
      setupTime: '2 minutes'
    },
    {
      id: 'biometric',
      name: 'Biometric Authentication',
      description: 'Use fingerprint or facial recognition',
      icon: Shield,
      security: 'Highest',
      setupTime: '1 minute'
    },
    {
      id: 'sms',
      name: 'SMS Verification',
      description: 'Receive codes via text message',
      icon: Mail,
      security: 'Medium',
      setupTime: '1 minute'
    },
    {
      id: 'email',
      name: 'Email Verification',
      description: 'Receive codes via email',
      icon: Mail,
      security: 'Medium',
      setupTime: '1 minute'
    }
  ]

  const generateBackupCodes = () => {
    const codes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    )
    setBackupCodes(codes)
  }

  const setupAuthenticator = async () => {
    // Mock setup - replace with actual API call
    setQrCodeUrl('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/ElderonAI:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=ElderonAI')
    setSecretKey('JBSWY3DPEHPK3PXP')
    generateBackupCodes()
  }

  const handleVerificationCodeChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-verify when complete
    if (newCode.every(digit => digit) && newCode.join('').length === 6) {
      verifyCode(newCode.join(''))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const verifyCode = async (code: string) => {
    // Mock verification - replace with actual API call
    setTimeout(() => {
      setStep('complete')
    }, 1000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  useEffect(() => {
    if (step === 'setup' && selectedMethod === 'authenticator') {
      setupAuthenticator()
    }
  }, [step, selectedMethod])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-enterprise-blue to-enterprise-purple rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Enable Multi-Factor Authentication</h2>
          <p className="text-sm text-gray-600 mt-2">
            Add an extra layer of security to your account
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {step === 'select' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Choose your verification method
              </h3>
              
              {mfaMethods.map((method) => (
                <motion.button
                  key={method.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedMethod(method.id as MfaMethod)
                    setStep('setup')
                  }}
                  className={`w-full flex items-start space-x-4 p-4 rounded-lg border transition-all ${
                    selectedMethod === method.id
                      ? 'border-enterprise-blue bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    selectedMethod === method.id
                      ? 'bg-enterprise-blue text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{method.description}</div>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Security: {method.security}</span>
                      <span>Setup: {method.setupTime}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={onCancel}
                  className="flex-1 btn-secondary py-2"
                >
                  Skip for now
                </button>
              </div>
            </motion.div>
          )}

          {step === 'setup' && selectedMethod === 'authenticator' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Set up Authenticator App
              </h3>

              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <p>1. Install an authenticator app like Google Authenticator or Authy</p>
                  <p>2. Scan the QR code or enter the secret key manually</p>
                </div>

                <div className="flex flex-col items-center space-y-4 p-4 bg-gray-50 rounded-lg">
                  {qrCodeUrl && (
                    <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32" />
                  )}
                  
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 mb-2">Or enter this code manually:</p>
                    <div className="flex items-center space-x-2 bg-white p-3 rounded border">
                      <code className="text-sm font-mono">{secretKey}</code>
                      <button
                        onClick={() => copyToClipboard(secretKey)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Copy className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep('verify')}
                  className="w-full btn-primary py-2"
                >
                  Continue to Verification
                </button>
              </div>
            </motion.div>
          )}

          {step === 'verify' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Enter Verification Code
              </h3>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Enter the 6-digit code from your authenticator app
                </p>

                <div className="flex justify-center space-x-2">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleVerificationCodeChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-enterprise-blue focus:border-transparent"
                    />
                  ))}
                </div>

                <button className="text-sm text-enterprise-blue hover:text-blue-700">
                  Can't access your authenticator app?
                </button>
              </div>
            </motion.div>
          )}

          {step === 'complete' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 text-center"
            >
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900">
                MFA Successfully Enabled!
              </h3>

              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Save Your Backup Codes</h4>
                  <p className="text-sm text-yellow-700 mb-3">
                    These codes can be used if you lose access to your authenticator app.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                    {backupCodes.map((code, index) => (
                      <div key={index} className="bg-white p-2 rounded border text-center">
                        {code}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => copyToClipboard(backupCodes.join('\n'))}
                    className="w-full mt-3 flex items-center justify-center space-x-2 py-2 text-yellow-700 hover:bg-yellow-100 rounded"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy All Codes</span>
                  </button>
                </div>

                <button
                  onClick={onComplete}
                  className="w-full btn-primary py-2"
                >
                  Finish Setup
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
```

## 📊 Security Audit Dashboard
```tsx
// apps/gateway/src/components/security/audit-log.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Building
} from 'lucide-react'

interface AuditEvent {
  id: string
  timestamp: Date
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  organization: string
  action: string
  resource: string
  ipAddress: string
  userAgent: string
  status: 'success' | 'failure' | 'warning'
  severity: 'low' | 'medium' | 'high' | 'critical'
  details?: any
}

export function AuditLog() {
  const [events, setEvents] = useState<AuditEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<AuditEvent[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    status: 'all',
    severity: 'all',
    dateRange: '7d'
  })
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null)

  useEffect(() => {
    // Mock data - replace with API call
    const mockEvents: AuditEvent[] = [
      {
        id: '1',
        timestamp: new Date(),
        user: { id: '1', name: 'John Doe', email: 'john@acme.com' },
        organization: 'Acme Corporation',
        action: 'USER_LOGIN',
        resource: 'Authentication Gateway',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        status: 'success',
        severity: 'low'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 3600000),
        user: { id: '2', name: 'Jane Smith', email: 'jane@acme.com' },
        organization: 'Acme Corporation',
        action: 'PASSWORD_CHANGE',
        resource: 'User Settings',
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        status: 'success',
        severity: 'medium'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 7200000),
        user: { id: '3', name: 'Bob Wilson', email: 'bob@acme.com' },
        organization: 'Acme Corporation',
        action: 'FAILED_LOGIN',
        resource: 'Authentication Gateway',
        ipAddress: '203.0.113.45',
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
        status: 'failure',
        severity: 'high',
        details: { attempts: 5, lockout: true }
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 86400000),
        user: { id: '4', name: 'Alice Brown', email: 'alice@acme.com' },
        organization: 'Acme Corporation',
        action: 'PERMISSION_GRANT',
        resource: 'Admin Panel',
        ipAddress: '192.168.1.102',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        status: 'success',
        severity: 'medium'
      }
    ]
    setEvents(mockEvents)
    setFilteredEvents(mockEvents)
  }, [])

  useEffect(() => {
    let filtered = events

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.resource.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(event => event.status === filters.status)
    }

    if (filters.severity !== 'all') {
      filtered = filtered.filter(event => event.severity === filters.severity)
    }

    setFilteredEvents(filtered)
  }, [searchTerm, filters, events])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failure': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default: return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const exportToCSV = () => {
    // Implement CSV export logic
    console.log('Exporting audit log to CSV')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Security Audit Log</h2>
          <p className="text-gray-600">Monitor and review security events across your organization</p>
        </div>
        <button
          onClick={exportToCSV}
          className="btn-secondary flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-enterprise-blue focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-enterprise-blue focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failure">Failure</option>
            <option value="warning">Warning</option>
          </select>

          {/* Severity Filter */}
          <select
            value={filters.severity}
            onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-enterprise-blue focus:border-transparent"
          >
            <option value="all">All Severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          {/* Date Range */}
          <select
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-enterprise-blue focus:border-transparent"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Audit Events Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((event, index) => (
                <motion.tr
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{event.action}</div>
                      <div className="text-sm text-gray-500">
                        {event.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{event.user.name}</div>
                        <div className="text-sm text-gray-500">{event.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {event.resource}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {event.ipAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(event.status)}
                      <span className="ml-2 text-sm text-gray-900 capitalize">{event.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getSeverityColor(event.severity)}`}>
                      {event.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="text-enterprise-blue hover:text-blue-700 flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredEvents.length}</span> of{' '}
            <span className="font-medium">{events.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">User</label>
                  <p className="text-sm text-gray-900">{selectedEvent.user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Organization</label>
                  <p className="text-sm text-gray-900">{selectedEvent.organization}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Action</label>
                  <p className="text-sm text-gray-900">{selectedEvent.action}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Resource</label>
                  <p className="text-sm text-gray-900">{selectedEvent.resource}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">IP Address</label>
                  <p className="text-sm text-gray-900">{selectedEvent.ipAddress}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">User Agent</label>
                  <p className="text-sm text-gray-900 truncate">{selectedEvent.userAgent}</p>
                </div>
              </div>
              
              {selectedEvent.details && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Details</label>
                  <pre className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg mt-1 overflow-x-auto">
                    {JSON.stringify(selectedEvent.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
```
## 📚 Docs App - Comprehensive Documentation System
```tsx
// apps/docs/src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Book, 
  FileText, 
  Users, 
  Settings, 
  ChevronRight,
  Home,
  Star,
  History,
  Bookmark,
  Share2,
  ThumbsUp,
  MessageSquare,
  Eye
} from 'lucide-react'

interface DocumentationPage {
  id: string
  title: string
  description: string
  content: string
  category: string
  tags: string[]
  lastUpdated: Date
  author: string
  views: number
  likes: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedReadTime: number
  relatedPages: string[]
}

export default function DocsApp() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [recentPages, setRecentPages] = useState<DocumentationPage[]>([])
  const [bookmarkedPages, setBookmarkedPages] = useState<DocumentationPage[]>([])
  const [selectedPage, setSelectedPage] = useState<DocumentationPage | null>(null)

  const categories = [
    { id: 'all', name: 'All Documentation', icon: Book, count: 124 },
    { id: 'getting-started', name: 'Getting Started', icon: Home, count: 15 },
    { id: 'authentication', name: 'Authentication', icon: Users, count: 23 },
    { id: 'api', name: 'API Reference', icon: Settings, count: 42 },
    { id: 'security', name: 'Security', icon: Star, count: 18 },
    { id: 'deployment', name: 'Deployment', icon: Share2, count: 26 }
  ]

  const mockPages: DocumentationPage[] = [
    {
      id: '1',
      title: 'Getting Started with ElderonAI',
      description: 'Complete guide to setting up your ElderonAI instance',
      content: '# Getting Started\n\nWelcome to ElderonAI...',
      category: 'getting-started',
      tags: ['setup', 'installation', 'configuration'],
      lastUpdated: new Date(),
      author: 'Tech Team',
      views: 1245,
      likes: 42,
      difficulty: 'beginner',
      estimatedReadTime: 10,
      relatedPages: ['2', '3']
    },
    {
      id: '2',
      title: 'Authentication API Reference',
      description: 'Complete API documentation for authentication endpoints',
      content: '# Authentication API\n\n## Overview...',
      category: 'api',
      tags: ['api', 'authentication', 'security'],
      lastUpdated: new Date(Date.now() - 86400000),
      author: 'Security Team',
      views: 892,
      likes: 31,
      difficulty: 'intermediate',
      estimatedReadTime: 15,
      relatedPages: ['1', '4']
    }
  ]

  useEffect(() => {
    // Load recent and bookmarked pages from localStorage
    const savedRecent = localStorage.getItem('docs-recent')
    const savedBookmarks = localStorage.getItem('docs-bookmarks')
    
    if (savedRecent) setRecentPages(JSON.parse(savedRecent))
    if (savedBookmarks) setBookmarkedPages(JSON.parse(savedBookmarks))
  }, [])

  const filteredPages = mockPages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         page.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         page.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handlePageView = (page: DocumentationPage) => {
    setSelectedPage(page)
    
    // Add to recent pages
    const newRecent = [page, ...recentPages.filter(p => p.id !== page.id)].slice(0, 5)
    setRecentPages(newRecent)
    localStorage.setItem('docs-recent', JSON.stringify(newRecent))
  }

  const toggleBookmark = (page: DocumentationPage) => {
    const isBookmarked = bookmarkedPages.some(p => p.id === page.id)
    let newBookmarks
    
    if (isBookmarked) {
      newBookmarks = bookmarkedPages.filter(p => p.id !== page.id)
    } else {
      newBookmarks = [page, ...bookmarkedPages]
    }
    
    setBookmarkedPages(newBookmarks)
    localStorage.setItem('docs-bookmarks', JSON.stringify(newBookmarks))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-enterprise-blue to-enterprise-purple rounded-lg flex items-center justify-center">
                  <Book className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">ElderonAI Docs</span>
              </div>
              
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-900 font-medium">Home</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Guides</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">API Reference</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Tutorials</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-enterprise-blue focus:border-transparent w-64"
                />
              </div>
              
              <button className="btn-primary flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Contribute</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-enterprise-blue text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className="w-4 h-4" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className={`text-sm ${
                      selectedCategory === category.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Pages */}
            {recentPages.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <History className="w-4 h-4" />
                  <span>Recently Viewed</span>
                </h3>
                <div className="space-y-3">
                  {recentPages.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => handlePageView(page)}
                      className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-sm text-gray-900">{page.title}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {page.estimatedReadTime} min read
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bookmarked Pages */}
            {bookmarkedPages.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Bookmark className="w-4 h-4" />
                  <span>Bookmarks</span>
                </h3>
                <div className="space-y-3">
                  {bookmarkedPages.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => handlePageView(page)}
                      className="w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-sm text-gray-900">{page.title}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {page.estimatedReadTime} min read
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedPage ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200"
              >
                {/* Page Header */}
                <div className="border-b border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                        <span>{selectedPage.category}</span>
                        <ChevronRight className="w-3 h-3" />
                        <span>{selectedPage.difficulty}</span>
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedPage.title}
                      </h1>
                      <p className="text-gray-600">{selectedPage.description}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleBookmark(selectedPage)}
                        className={`p-2 rounded-lg ${
                          bookmarkedPages.some(p => p.id === selectedPage.id)
                            ? 'text-yellow-500 bg-yellow-50'
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Bookmark className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Last updated: {selectedPage.lastUpdated.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{selectedPage.estimatedReadTime} min read</span>
                      <span>•</span>
                      <span>By {selectedPage.author}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Eye className="w-4 h-4" />
                        <span>{selectedPage.views}</span>
                      </div>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{selectedPage.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                        <MessageSquare className="w-4 h-4" />
                        <span>Comment</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Page Content */}
                <div className="p-6 prose prose-blue max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: selectedPage.content }} />
                </div>

                {/* Related Pages */}
                <div className="border-t border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Related Pages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPage.relatedPages.map((pageId) => {
                      const page = mockPages.find(p => p.id === pageId)
                      return page ? (
                        <button
                          key={page.id}
                          onClick={() => handlePageView(page)}
                          className="text-left p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                        >
                          <div className="font-medium text-gray-900">{page.title}</div>
                          <div className="text-sm text-gray-600 mt-1">{page.description}</div>
                        </button>
                      ) : null
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-enterprise-blue to-enterprise-purple rounded-xl p-8 text-white">
                  <h1 className="text-3xl font-bold mb-4">ElderonAI Documentation</h1>
                  <p className="text-blue-100 text-lg mb-6">
                    Comprehensive guides, API references, and tutorials to help you build with ElderonAI
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-white text-enterprise-blue px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                      Get Started
                    </button>
                    <button className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
                      API Reference
                    </button>
                  </div>
                </div>

                {/* Search Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPages.map((page, index) => (
                    <motion.button
                      key={page.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handlePageView(page)}
                      className="bg-white rounded-lg border border-gray-200 p-6 text-left hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          page.difficulty === 'beginner' 
                            ? 'bg-green-100 text-green-800'
                            : page.difficulty === 'intermediate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {page.difficulty}
                        </span>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Eye className="w-4 h-4" />
                          <span>{page.views}</span>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2">{page.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{page.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {page.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{page.estimatedReadTime} min</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {filteredPages.length === 0 && searchQuery && (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">Try different keywords or browse the categories</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
```
## 🚀 Additional Enterprise Components
```tsx
// apps/gateway/src/components/enterprise/feature-flags.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ToggleLeft, ToggleRight, Settings, Users, Globe } from 'lucide-react'

interface FeatureFlag {
  id: string
  name: string
  description: string
  enabled: boolean
  environment: 'development' | 'staging' | 'production'
  targetUsers: string[]
  rolloutPercentage: number
  lastModified: Date
  createdBy: string
}

export function FeatureFlagsManager() {
  const [flags, setFlags] = useState<FeatureFlag[]>([])
  const [selectedEnvironment, setSelectedEnvironment] = useState<'development' | 'staging' | 'production'>('production')

  useEffect(() => {
    // Mock data
    const mockFlags: FeatureFlag[] = [
      {
        id: '1',
        name: 'dark-mode',
        description: 'Enable dark mode across the application',
        enabled: true,
        environment: 'production',
        targetUsers: ['all'],
        rolloutPercentage: 100,
        lastModified: new Date(),
        createdBy: 'admin@acme.com'
      },
      {
        id: '2',
        name: 'advanced-analytics',
        description: 'New analytics dashboard with enhanced metrics',
        enabled: false,
        environment: 'production',
        targetUsers: ['premium-users'],
        rolloutPercentage: 25,
        lastModified: new Date(),
        createdBy: 'product@acme.com'
      }
    ]
    setFlags(mockFlags)
  }, [])

  const toggleFlag = (flagId: string) => {
    setFlags(flags.map(flag => 
      flag.id === flagId ? { ...flag, enabled: !flag.enabled } : flag
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Feature Flags</h2>
          <p className="text-gray-600">Manage feature releases and A/B testing</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedEnvironment}
            onChange={(e) => setSelectedEnvironment(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-enterprise-blue"
          >
            <option value="development">Development</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
          </select>
          
          <button className="btn-primary flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Create Flag</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {flags.map((flag, index) => (
          <motion.div
            key={flag.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{flag.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    flag.enabled 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {flag.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{flag.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span className="capitalize">{flag.environment}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{flag.targetUsers.join(', ')}</span>
                  </div>
                  
                  <span>Rollout: {flag.rolloutPercentage}%</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleFlag(flag.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    flag.enabled ? 'bg-enterprise-blue' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      flag.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                
                <button className="text-gray-400 hover:text-gray-600">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

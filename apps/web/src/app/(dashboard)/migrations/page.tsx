'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  BarChart3,
  Settings,
  Eye,
  Download,
  RefreshCw,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

export default function MigrationsPage() {
  const [migrations, setMigrations] = useState([])
  const [selectedMigration, setSelectedMigration] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    // Simulate loading migrations
    setMigrations([
      {
        id: 1,
        name: 'E-commerce Platform Migration',
        description: 'Migrating from Java Spring Boot to microservices architecture',
        status: 'running',
        progress: 75,
        startTime: '2024-01-20T10:00:00Z',
        estimatedCompletion: '2024-01-22T14:00:00Z',
        sourceTech: 'Java Spring Boot',
        targetTech: 'Node.js + React',
        filesProcessed: 1247,
        totalFiles: 1650,
        errors: 3,
        warnings: 12,
        steps: [
          { id: 1, name: 'Code Analysis', status: 'completed', progress: 100 },
          { id: 2, name: 'Dependency Mapping', status: 'completed', progress: 100 },
          { id: 3, name: 'Code Transformation', status: 'running', progress: 75 },
          { id: 4, name: 'Testing', status: 'pending', progress: 0 },
          { id: 5, name: 'Deployment', status: 'pending', progress: 0 }
        ]
      },
      {
        id: 2,
        name: 'CRM System Modernization',
        description: 'Upgrading .NET Framework to .NET Core with cloud deployment',
        status: 'completed',
        progress: 100,
        startTime: '2024-01-15T09:00:00Z',
        completedTime: '2024-01-18T16:30:00Z',
        sourceTech: '.NET Framework',
        targetTech: '.NET Core + Azure',
        filesProcessed: 892,
        totalFiles: 892,
        errors: 0,
        warnings: 2,
        steps: [
          { id: 1, name: 'Code Analysis', status: 'completed', progress: 100 },
          { id: 2, name: 'Dependency Mapping', status: 'completed', progress: 100 },
          { id: 3, name: 'Code Transformation', status: 'completed', progress: 100 },
          { id: 4, name: 'Testing', status: 'completed', progress: 100 },
          { id: 5, name: 'Deployment', status: 'completed', progress: 100 }
        ]
      },
      {
        id: 3,
        name: 'Payment Gateway Integration',
        description: 'Integrating multiple payment providers and modernizing payment processing',
        status: 'paused',
        progress: 45,
        startTime: '2024-01-10T14:00:00Z',
        estimatedCompletion: '2024-01-25T18:00:00Z',
        sourceTech: 'PHP Laravel',
        targetTech: 'Node.js + TypeScript',
        filesProcessed: 456,
        totalFiles: 1020,
        errors: 8,
        warnings: 15,
        steps: [
          { id: 1, name: 'Code Analysis', status: 'completed', progress: 100 },
          { id: 2, name: 'Dependency Mapping', status: 'completed', progress: 100 },
          { id: 3, name: 'Code Transformation', status: 'paused', progress: 45 },
          { id: 4, name: 'Testing', status: 'pending', progress: 0 },
          { id: 5, name: 'Deployment', status: 'pending', progress: 0 }
        ]
      }
    ])
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-blue-600 bg-blue-100'
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'paused':
        return 'text-yellow-600 bg-yellow-100'
      case 'failed':
        return 'text-red-600 bg-red-100'
      case 'pending':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Play className="h-4 w-4" />
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'paused':
        return <Pause className="h-4 w-4" />
      case 'failed':
        return <AlertCircle className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleStartMigration = (id: number) => {
    setMigrations(prev => prev.map(m => 
      m.id === id ? { ...m, status: 'running' } : m
    ))
  }

  const handlePauseMigration = (id: number) => {
    setMigrations(prev => prev.map(m => 
      m.id === id ? { ...m, status: 'paused' } : m
    ))
  }

  const handleStopMigration = (id: number) => {
    setMigrations(prev => prev.map(m => 
      m.id === id ? { ...m, status: 'failed' } : m
    ))
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Migrations</h1>
              <p className="mt-2 text-gray-600">
                Manage and monitor your automated code migrations
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center"
            >
              <Zap className="h-5 w-5 mr-2" />
              New Migration
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Migrations</p>
                <p className="text-2xl font-semibold text-gray-900">{migrations.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {migrations.filter(m => m.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Play className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Running</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {migrations.filter(m => m.status === 'running').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-gray-100">
                <Clock className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {migrations.filter(m => m.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Migrations List */}
        <div className="space-y-6">
          {migrations.map((migration, index) => (
            <motion.div
              key={migration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{migration.name}</h3>
                      <span className={`ml-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(migration.status)}`}>
                        {getStatusIcon(migration.status)}
                        <span className="ml-1 capitalize">{migration.status}</span>
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{migration.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span>From: {migration.sourceTech}</span>
                      <ArrowRight className="h-4 w-4" />
                      <span>To: {migration.targetTech}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Settings className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Progress: {migration.progress}%</span>
                    <span>{migration.filesProcessed} / {migration.totalFiles} files</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        migration.status === 'completed' ? 'bg-green-500' : 
                        migration.status === 'running' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${migration.progress}%` }}
                    />
                  </div>
                </div>

                {/* Steps */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Migration Steps</h4>
                  <div className="space-y-2">
                    {migration.steps.map((step, stepIndex) => (
                      <div key={step.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            step.status === 'completed' ? 'bg-green-100 text-green-600' :
                            step.status === 'running' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {step.status === 'completed' ? <CheckCircle className="h-4 w-4" /> : stepIndex + 1}
                          </div>
                          <span className="ml-3 text-sm text-gray-700">{step.name}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-1 mr-3">
                            <div 
                              className="bg-enterprise-blue h-1 rounded-full transition-all duration-300"
                              style={{ width: `${step.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{step.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-900">{migration.filesProcessed}</div>
                    <div className="text-sm text-gray-500">Files Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-red-600">{migration.errors}</div>
                    <div className="text-sm text-gray-500">Errors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-yellow-600">{migration.warnings}</div>
                    <div className="text-sm text-gray-500">Warnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-900">
                      {migration.status === 'completed' ? 'Done' : 
                       migration.estimatedCompletion ? '2d 4h' : '-'}
                    </div>
                    <div className="text-sm text-gray-500">ETA</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {migration.status === 'pending' && (
                      <button
                        onClick={() => handleStartMigration(migration.id)}
                        className="btn-primary flex items-center"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Migration
                      </button>
                    )}
                    {migration.status === 'running' && (
                      <>
                        <button
                          onClick={() => handlePauseMigration(migration.id)}
                          className="btn-secondary flex items-center"
                        >
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </button>
                        <button
                          onClick={() => handleStopMigration(migration.id)}
                          className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center"
                        >
                          <Square className="h-4 w-4 mr-2" />
                          Stop
                        </button>
                      </>
                    )}
                    {migration.status === 'paused' && (
                      <button
                        onClick={() => handleStartMigration(migration.id)}
                        className="btn-primary flex items-center"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Resume
                      </button>
                    )}
                    {migration.status === 'failed' && (
                      <button className="btn-primary flex items-center">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Retry
                      </button>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {migration.status === 'completed' ? 
                      `Completed on ${new Date(migration.completedTime).toLocaleDateString()}` :
                      `Started on ${new Date(migration.startTime).toLocaleDateString()}`
                    }
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {migrations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No migrations found</h3>
            <p className="text-gray-500 mb-6">
              Get started by creating your first migration
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              <Zap className="h-5 w-5 mr-2" />
              Create Migration
            </button>
          </motion.div>
        )}
      </div>

      {/* Create Migration Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Create New Migration</h3>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Migration Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-enterprise-blue focus:border-enterprise-blue"
                    placeholder="Enter migration name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-enterprise-blue focus:border-enterprise-blue"
                    placeholder="Enter migration description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Source Technology
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-enterprise-blue focus:border-enterprise-blue">
                      <option>Java Spring Boot</option>
                      <option>.NET Framework</option>
                      <option>PHP Laravel</option>
                      <option>Python Django</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Technology
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-enterprise-blue focus:border-enterprise-blue">
                      <option>Node.js + React</option>
                      <option>.NET Core + Azure</option>
                      <option>Node.js + TypeScript</option>
                      <option>Python FastAPI</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="btn-primary"
              >
                Create Migration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FileText,
  Code,
  Database,
  Globe,
  Shield,
  Zap,
  Download,
  RefreshCw,
  Play,
  Pause
} from 'lucide-react'

export default function AnalysisPage() {
  const [analysisData, setAnalysisData] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedTab, setSelectedTab] = useState('overview')

  useEffect(() => {
    // Simulate loading analysis data
    setAnalysisData({
      overview: {
        totalFiles: 1247,
        linesOfCode: 45678,
        complexity: 'Medium',
        riskLevel: 'Low',
        lastAnalyzed: '2 hours ago'
      },
      metrics: {
        maintainability: 85,
        reliability: 92,
        security: 78,
        performance: 88,
        testCoverage: 65
      },
      issues: [
        {
          id: 1,
          type: 'security',
          severity: 'high',
          title: 'SQL Injection Vulnerability',
          file: 'src/controllers/UserController.java',
          line: 45,
          description: 'User input is directly concatenated into SQL query without sanitization'
        },
        {
          id: 2,
          type: 'performance',
          severity: 'medium',
          title: 'Inefficient Database Query',
          file: 'src/repositories/ProductRepository.java',
          line: 123,
          description: 'N+1 query problem detected in product listing'
        },
        {
          id: 3,
          type: 'maintainability',
          severity: 'low',
          title: 'Code Duplication',
          file: 'src/utils/ValidationUtils.java',
          line: 67,
          description: 'Similar validation logic found in multiple methods'
        }
      ],
      recommendations: [
        {
          id: 1,
          category: 'Security',
          title: 'Implement Input Validation',
          description: 'Add proper input sanitization for all user inputs',
          impact: 'High',
          effort: 'Medium'
        },
        {
          id: 2,
          category: 'Performance',
          title: 'Optimize Database Queries',
          description: 'Use eager loading and query optimization techniques',
          impact: 'High',
          effort: 'Low'
        },
        {
          id: 3,
          category: 'Maintainability',
          title: 'Extract Common Utilities',
          description: 'Create reusable utility functions for common operations',
          impact: 'Medium',
          effort: 'Low'
        }
      ]
    })
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'text-red-600 bg-red-100'
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'Low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'issues', name: 'Issues', icon: AlertTriangle },
    { id: 'recommendations', name: 'Recommendations', icon: CheckCircle },
    { id: 'metrics', name: 'Metrics', icon: TrendingUp }
  ]

  const handleStartAnalysis = () => {
    setIsAnalyzing(true)
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      // Refresh data
    }, 5000)
  }

  if (!analysisData) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Loading analysis data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Code Analysis</h1>
              <p className="mt-2 text-gray-600">
                AI-powered analysis of your codebase for quality, security, and performance
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="btn-secondary flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Export Report
              </button>
              <button
                onClick={handleStartAnalysis}
                disabled={isAnalyzing}
                className="btn-primary flex items-center"
              >
                {isAnalyzing ? (
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Play className="h-5 w-5 mr-2" />
                )}
                {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                    selectedTab === tab.id
                      ? 'border-enterprise-blue text-enterprise-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Files</p>
                    <p className="text-2xl font-semibold text-gray-900">{analysisData.overview.totalFiles}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <Code className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Lines of Code</p>
                    <p className="text-2xl font-semibold text-gray-900">{analysisData.overview.linesOfCode.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Complexity</p>
                    <p className="text-2xl font-semibold text-gray-900">{analysisData.overview.complexity}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-red-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Risk Level</p>
                    <p className="text-2xl font-semibold text-gray-900">{analysisData.overview.riskLevel}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Last Analyzed</p>
                    <p className="text-sm font-semibold text-gray-900">{analysisData.overview.lastAnalyzed}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quality Metrics</h3>
              <div className="space-y-4">
                {Object.entries(analysisData.metrics).map(([metric, value]) => (
                  <div key={metric} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-32 text-sm font-medium text-gray-700 capitalize">
                        {metric.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="ml-4 w-64 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            value >= 80 ? 'bg-green-500' : 
                            value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                    <div className="ml-4 text-sm font-semibold text-gray-900">{value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Issues Tab */}
        {selectedTab === 'issues' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Code Issues</h3>
                <p className="text-sm text-gray-600">Issues found during analysis</p>
              </div>
              <div className="divide-y divide-gray-200">
                {analysisData.issues.map((issue) => (
                  <div key={issue.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                            {issue.severity.toUpperCase()}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">{issue.type}</span>
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">{issue.title}</h4>
                        <p className="text-gray-600 mb-3">{issue.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>{issue.file}:{issue.line}</span>
                        </div>
                      </div>
                      <button className="ml-4 px-4 py-2 text-sm font-medium text-enterprise-blue hover:bg-blue-50 rounded-md transition-colors">
                        View Code
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Recommendations Tab */}
        {selectedTab === 'recommendations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysisData.recommendations.map((rec) => (
                <div key={rec.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(rec.impact)}`}>
                      {rec.category}
                    </div>
                    <div className="text-sm text-gray-500">{rec.effort} Effort</div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{rec.title}</h4>
                  <p className="text-gray-600 mb-4">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(rec.impact)}`}>
                      {rec.impact} Impact
                    </span>
                    <button className="text-sm font-medium text-enterprise-blue hover:text-blue-700">
                      Apply Fix
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Metrics Tab */}
        {selectedTab === 'metrics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Detailed Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Code Quality</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Maintainability</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                        </div>
                        <span className="text-sm font-semibold">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Reliability</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
                        </div>
                        <span className="text-sm font-semibold">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Security</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }} />
                        </div>
                        <span className="text-sm font-semibold">78%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Performance</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Performance</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }} />
                        </div>
                        <span className="text-sm font-semibold">88%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Test Coverage</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }} />
                        </div>
                        <span className="text-sm font-semibold">65%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
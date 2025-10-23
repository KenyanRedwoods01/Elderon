'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  FolderOpen, 
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeMigrations: 0,
    completedMigrations: 0,
    aiAnalysis: 0
  })

  const [recentActivity, setRecentActivity] = useState([])
  const [migrationProgress, setMigrationProgress] = useState([])

  useEffect(() => {
    // Simulate loading data
    setStats({
      totalProjects: 12,
      activeMigrations: 3,
      completedMigrations: 45,
      aiAnalysis: 128
    })

    setRecentActivity([
      {
        id: 1,
        type: 'migration',
        title: 'Legacy Java App Migration',
        status: 'completed',
        time: '2 hours ago',
        progress: 100
      },
      {
        id: 2,
        type: 'analysis',
        title: 'Code Quality Analysis',
        status: 'in-progress',
        time: '4 hours ago',
        progress: 75
      },
      {
        id: 3,
        type: 'project',
        title: 'New Project Created',
        status: 'completed',
        time: '1 day ago',
        progress: 100
      }
    ])

    setMigrationProgress([
      {
        id: 1,
        name: 'E-commerce Platform',
        progress: 85,
        status: 'in-progress',
        eta: '2 days'
      },
      {
        id: 2,
        name: 'CRM System',
        progress: 45,
        status: 'in-progress',
        eta: '1 week'
      },
      {
        id: 3,
        name: 'Payment Gateway',
        progress: 100,
        status: 'completed',
        eta: 'Completed'
      }
    ])
  }, [])

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      change: '+2',
      changeType: 'positive',
      icon: FolderOpen,
      color: 'blue'
    },
    {
      title: 'Active Migrations',
      value: stats.activeMigrations,
      change: '+1',
      changeType: 'positive',
      icon: Zap,
      color: 'yellow'
    },
    {
      title: 'Completed Migrations',
      value: stats.completedMigrations,
      change: '+5',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'AI Analysis',
      value: stats.aiAnalysis,
      change: '+12',
      changeType: 'positive',
      icon: BarChart3,
      color: 'purple'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-100'
      case 'pending':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'in-progress':
        return <Clock className="h-4 w-4" />
      case 'pending':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back! Here's what's happening with your enterprise transformations.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <div className={`ml-2 flex items-center text-sm ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.changeType === 'positive' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      <span className="ml-1">{stat.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                      {activity.progress < 100 && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{activity.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-enterprise-blue h-2 rounded-full transition-all duration-300"
                              style={{ width: `${activity.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Migration Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Migration Progress</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {migrationProgress.map((migration) => (
                  <div key={migration.id}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{migration.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(migration.status)}`}>
                        {migration.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>{migration.progress}% complete</span>
                      <span>{migration.eta}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          migration.status === 'completed' ? 'bg-green-500' : 'bg-enterprise-blue'
                        }`}
                        style={{ width: `${migration.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FolderOpen className="h-6 w-6 text-enterprise-blue mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">New Project</div>
                  <div className="text-sm text-gray-500">Start a new migration project</div>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <BarChart3 className="h-6 w-6 text-enterprise-blue mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Run Analysis</div>
                  <div className="text-sm text-gray-500">Analyze existing codebase</div>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Zap className="h-6 w-6 text-enterprise-blue mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Start Migration</div>
                  <div className="text-sm text-gray-500">Begin automated migration</div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
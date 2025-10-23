'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Activity, 
  Database, 
  Shield, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Server,
  Zap
} from 'lucide-react'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalProjects: 0,
    systemHealth: 0
  })

  const [recentActivity, setRecentActivity] = useState([])
  const [systemMetrics, setSystemMetrics] = useState([])

  useEffect(() => {
    // Simulate loading data
    setStats({
      totalUsers: 1247,
      activeUsers: 892,
      totalProjects: 156,
      systemHealth: 98
    })

    setRecentActivity([
      {
        id: 1,
        type: 'user',
        action: 'New user registered',
        user: 'john.doe@company.com',
        time: '2 minutes ago',
        status: 'success'
      },
      {
        id: 2,
        type: 'project',
        action: 'Project created',
        user: 'jane.smith@enterprise.com',
        time: '15 minutes ago',
        status: 'success'
      },
      {
        id: 3,
        type: 'system',
        action: 'Migration completed',
        user: 'System',
        time: '1 hour ago',
        status: 'success'
      },
      {
        id: 4,
        type: 'error',
        action: 'API rate limit exceeded',
        user: 'api-client-123',
        time: '2 hours ago',
        status: 'warning'
      }
    ])

    setSystemMetrics([
      {
        name: 'CPU Usage',
        value: 45,
        status: 'good',
        trend: 'down'
      },
      {
        name: 'Memory Usage',
        value: 68,
        status: 'warning',
        trend: 'up'
      },
      {
        name: 'Disk Usage',
        value: 32,
        status: 'good',
        trend: 'stable'
      },
      {
        name: 'Network I/O',
        value: 23,
        status: 'good',
        trend: 'down'
      }
    ])
  }, [])

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      change: '+8%',
      changeType: 'positive',
      icon: Activity,
      color: 'green'
    },
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      change: '+5%',
      changeType: 'positive',
      icon: Database,
      color: 'purple'
    },
    {
      title: 'System Health',
      value: `${stats.systemHealth}%`,
      change: '+2%',
      changeType: 'positive',
      icon: Shield,
      color: 'green'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100'
      case 'warning':
        return 'text-yellow-600 bg-yellow-100'
      case 'error':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />
      case 'error':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600'
      case 'warning':
        return 'text-yellow-600'
      case 'critical':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Monitor and manage your ElderonAI enterprise platform
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
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
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
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.user}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* System Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">System Metrics</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {systemMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{metric.name}</h4>
                      <div className="flex items-center">
                        <span className={`text-sm font-semibold ${getMetricStatusColor(metric.status)}`}>
                          {metric.value}%
                        </span>
                        {metric.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-red-500 ml-1" />
                        ) : metric.trend === 'down' ? (
                          <TrendingDown className="h-4 w-4 text-green-500 ml-1" />
                        ) : (
                          <div className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          metric.status === 'good' ? 'bg-green-500' :
                          metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${metric.value}%` }}
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-6 w-6 text-enterprise-blue mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Manage Users</div>
                  <div className="text-sm text-gray-500">View and manage user accounts</div>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Activity className="h-6 w-6 text-enterprise-blue mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">View Analytics</div>
                  <div className="text-sm text-gray-500">Check platform analytics</div>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Database className="h-6 w-6 text-enterprise-blue mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">System Status</div>
                  <div className="text-sm text-gray-500">Monitor system health</div>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="h-6 w-6 text-enterprise-blue mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Platform Settings</div>
                  <div className="text-sm text-gray-500">Configure platform settings</div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Server className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">API Server</h4>
                <p className="text-sm text-green-600">Operational</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Database</h4>
                <p className="text-sm text-green-600">Operational</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">AI Engine</h4>
                <p className="text-sm text-green-600">Operational</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
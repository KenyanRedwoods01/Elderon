'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  Building2,
  FolderKanban,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Server,
  Database,
  Cpu,
  HardDrive,
  Zap,
  Clock,
  UserPlus,
  GitBranch,
  BarChart3,
  PieChart,
  LineChart,
  Eye,
  Settings,
  Shield,
} from 'lucide-react';
import {
  LineChart as ReLineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AdminPage() {
  // Mock data for demonstration (in real app, fetch from API)
  const stats = {
    total_users: 1247,
    total_organizations: 89,
    total_projects: 456,
    active_analyses: 23,
    system_health: 'healthy',
    users_change: '+12.3%',
    orgs_change: '+8.5%',
    projects_change: '+15.7%',
  };

  const userSignupsData = [
    { date: '2024-06', count: 78 },
    { date: '2024-07', count: 92 },
    { date: '2024-08', count: 115 },
    { date: '2024-09', count: 143 },
    { date: '2024-10', count: 178 },
    { date: '2024-11', count: 216 },
    { date: '2024-12', count: 289 },
  ];

  const projectsByLanguage = [
    { name: 'JavaScript', value: 156, color: '#F7DF1E' },
    { name: 'TypeScript', value: 134, color: '#3178C6' },
    { name: 'Python', value: 87, color: '#3776AB' },
    { name: 'Java', value: 45, color: '#007396' },
    { name: 'Go', value: 23, color: '#00ADD8' },
    { name: 'Other', value: 11, color: '#6B7280' },
  ];

  const activeUsersData = [
    { day: 'Mon', users: 423 },
    { day: 'Tue', users: 456 },
    { day: 'Wed', users: 478 },
    { day: 'Thu', users: 512 },
    { day: 'Fri', users: 489 },
    { day: 'Sat', users: 234 },
    { day: 'Sun', users: 198 },
  ];

  const systemMetrics = [
    { name: 'API Gateway', status: 'healthy', uptime: 99.98, responseTime: '45ms', requests: '2.3M' },
    { name: 'Database', status: 'healthy', uptime: 99.99, responseTime: '12ms', connections: 47 },
    { name: 'Redis Cache', status: 'healthy', uptime: 100, hitRate: '94.2%', keys: '1.2M' },
    { name: 'Code Analyzer', status: 'healthy', uptime: 99.95, queueSize: 12, processed: '456' },
    { name: 'AI Orchestrator', status: 'warning', uptime: 99.87, queueSize: 34, processed: '234' },
    { name: 'Migration Engine', status: 'healthy', uptime: 99.92, active: 8, completed: '89' },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'user_signup',
      user: 'john.doe@company.com',
      action: 'New user registration',
      timestamp: '2 minutes ago',
      icon: UserPlus,
      color: 'text-green-600',
    },
    {
      id: 2,
      type: 'project_created',
      user: 'jane.smith@enterprise.com',
      action: 'Created project "Mobile App Modernization"',
      timestamp: '15 minutes ago',
      icon: FolderKanban,
      color: 'text-blue-600',
    },
    {
      id: 3,
      type: 'analysis_completed',
      user: 'System',
      action: 'Completed code analysis for "E-Commerce Platform"',
      timestamp: '23 minutes ago',
      icon: BarChart3,
      color: 'text-purple-600',
    },
    {
      id: 4,
      type: 'migration_started',
      user: 'bob.wilson@tech.io',
      action: 'Started migration from React to Next.js',
      timestamp: '1 hour ago',
      icon: GitBranch,
      color: 'text-orange-600',
    },
    {
      id: 5,
      type: 'user_signup',
      user: 'alice.johnson@startup.com',
      action: 'New user registration',
      timestamp: '2 hours ago',
      icon: UserPlus,
      color: 'text-green-600',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return CheckCircle;
      case 'warning':
        return AlertCircle;
      case 'error':
        return AlertCircle;
      default:
        return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-2">System overview and management console</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500 bg-opacity-20 text-green-400 rounded-xl border border-green-500 border-opacity-30">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold">All Systems Operational</span>
            </div>
            <button className="p-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-all border border-gray-700">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 shadow-xl border border-blue-500 border-opacity-30">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-100" />
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{stats.total_users.toLocaleString()}</div>
                <div className="text-sm text-blue-200 mt-1">{stats.users_change} this month</div>
              </div>
            </div>
            <div className="text-blue-100 font-medium">Total Users</div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 shadow-xl border border-purple-500 border-opacity-30">
            <div className="flex items-center justify-between mb-4">
              <Building2 className="w-8 h-8 text-purple-100" />
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{stats.total_organizations}</div>
                <div className="text-sm text-purple-200 mt-1">{stats.orgs_change} this month</div>
              </div>
            </div>
            <div className="text-purple-100 font-medium">Organizations</div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 shadow-xl border border-green-500 border-opacity-30">
            <div className="flex items-center justify-between mb-4">
              <FolderKanban className="w-8 h-8 text-green-100" />
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{stats.total_projects}</div>
                <div className="text-sm text-green-200 mt-1">{stats.projects_change} this month</div>
              </div>
            </div>
            <div className="text-green-100 font-medium">Active Projects</div>
          </div>

          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-6 shadow-xl border border-orange-500 border-opacity-30">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-orange-100" />
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{stats.active_analyses}</div>
                <div className="text-sm text-orange-200 mt-1">Running now</div>
              </div>
            </div>
            <div className="text-orange-100 font-medium">Active Analyses</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Signups Chart */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              User Signups (Last 7 Months)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userSignupsData}>
                <defs>
                  <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorSignups)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Projects by Language */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-400" />
              Projects by Language
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={projectsByLanguage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {projectsByLanguage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Users Chart */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" />
            Active Users This Week
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activeUsersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Bar dataKey="users" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* System Health and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Health */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-400" />
              System Health
            </h3>
            <div className="space-y-3">
              {systemMetrics.map((service, idx) => {
                const StatusIcon = getStatusIcon(service.status);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${getStatusColor(service.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white">{service.name}</div>
                        <div className="text-xs text-gray-400 mt-1">Uptime: {service.uptime}%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      {service.responseTime && (
                        <div className="text-sm text-gray-300">{service.responseTime}</div>
                      )}
                      {service.queueSize !== undefined && (
                        <div className="text-xs text-gray-500">Queue: {service.queueSize}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-4 bg-gray-900 rounded-xl border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <div className={`p-2 rounded-lg bg-opacity-20 ${activity.color}`}>
                      <Icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm">{activity.action}</div>
                      <div className="text-xs text-gray-400 mt-1">{activity.user}</div>
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">{activity.timestamp}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all flex flex-col items-center gap-2">
              <Users className="w-6 h-6" />
              <span className="text-sm font-medium">Manage Users</span>
            </button>
            <button className="p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all flex flex-col items-center gap-2">
              <Building2 className="w-6 h-6" />
              <span className="text-sm font-medium">Organizations</span>
            </button>
            <button className="p-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all flex flex-col items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              <span className="text-sm font-medium">Analytics</span>
            </button>
            <button className="p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all flex flex-col items-center gap-2">
              <Settings className="w-6 h-6" />
              <span className="text-sm font-medium">System Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

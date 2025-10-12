'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardContent, Spinner } from '@elderonai/ui';
import { FolderKanban, LineChart, GitBranch, Users, TrendingUp, TrendingDown, Activity, Clock, CheckCircle2, AlertCircle, ArrowUpRight, Code2, FileCode, Zap } from 'lucide-react';
import { BarChart, Bar, LineChart as RechartsLineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts';
import { api } from '@/lib/api';
import { getUser } from '@/lib/auth';
import { format, subDays } from 'date-fns';

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4'];

export default function DashboardPage() {
  const user = getUser();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await api.get('/api/dashboard/stats');
      return response.data;
    },
  });

  const { data: activity } = useQuery({
    queryKey: ['dashboard-activity'],
    queryFn: async () => {
      const response = await api.get('/api/dashboard/activity');
      return response.data.activity || [];
    },
  });

  // Project activity data (last 14 days)
  const projectActivityData = Array.from({ length: 14 }, (_, i) => {
    const date = subDays(new Date(), 13 - i);
    return {
      date: format(date, 'MMM dd'),
      projects: Math.floor(Math.random() * 3) + 1,
      analyses: Math.floor(Math.random() * 5) + 2,
      migrations: Math.floor(Math.random() * 2),
    };
  });

  // Projects by language distribution
  const projectsByLanguage = [
    { name: 'TypeScript', value: 35, color: '#3178C6' },
    { name: 'JavaScript', value: 25, color: '#F7DF1E' },
    { name: 'Python', value: 20, color: '#3776AB' },
    { name: 'Java', value: 12, color: '#007396' },
    { name: 'Go', value: 8, color: '#00ADD8' },
  ];

  // Active migrations with detailed progress
  const activeMigrations = [
    { 
      name: 'React 16 → React 18', 
      project: 'E-commerce Platform',
      progress: 85, 
      status: 'in_progress',
      filesProcessed: 342,
      totalFiles: 402,
      estimatedTime: '2 hours'
    },
    { 
      name: 'Angular 10 → React 18', 
      project: 'Admin Dashboard',
      progress: 60, 
      status: 'in_progress',
      filesProcessed: 180,
      totalFiles: 300,
      estimatedTime: '4 hours'
    },
    { 
      name: 'Vue 2 → Vue 3', 
      project: 'Customer Portal',
      progress: 100, 
      status: 'completed',
      filesProcessed: 156,
      totalFiles: 156,
      estimatedTime: 'Completed'
    },
    { 
      name: 'Express → Fastify', 
      project: 'API Gateway',
      progress: 45, 
      status: 'in_progress',
      filesProcessed: 54,
      totalFiles: 120,
      estimatedTime: '6 hours'
    },
  ];

  // Performance metrics over time
  const performanceMetrics = Array.from({ length: 12 }, (_, i) => {
    const month = format(subDays(new Date(), (11 - i) * 30), 'MMM');
    return {
      month,
      analysisTime: Math.floor(Math.random() * 30) + 40,
      successRate: Math.floor(Math.random() * 10) + 88,
      complexity: Math.floor(Math.random() * 15) + 30,
    };
  });

  // Code quality metrics
  const codeQualityData = [
    { subject: 'Security', A: 85, B: 95, fullMark: 100 },
    { subject: 'Performance', A: 78, B: 88, fullMark: 100 },
    { subject: 'Maintainability', A: 92, B: 96, fullMark: 100 },
    { subject: 'Reliability', A: 88, B: 93, fullMark: 100 },
    { subject: 'Test Coverage', A: 75, B: 85, fullMark: 100 },
  ];

  // System health indicators
  const systemHealth = [
    { name: 'API Response', value: 98, color: '#10B981' },
    { name: 'Database', value: 95, color: '#3B82F6' },
    { name: 'Cache Hit Rate', value: 87, color: '#8B5CF6' },
    { name: 'Success Rate', value: 99, color: '#F59E0B' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats?.projects_count || 0,
      change: '+12.5%',
      changeValue: '+4',
      trend: 'up',
      icon: FolderKanban,
      color: 'text-blue-600 bg-blue-100',
      bgGradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Analyses',
      value: stats?.active_analyses || 0,
      change: '+8.2%',
      changeValue: '+2',
      trend: 'up',
      icon: LineChart,
      color: 'text-green-600 bg-green-100',
      bgGradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Completed Migrations',
      value: stats?.completed_migrations || 0,
      change: '+25.3%',
      changeValue: '+6',
      trend: 'up',
      icon: GitBranch,
      color: 'text-purple-600 bg-purple-100',
      bgGradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Team Members',
      value: stats?.team_members || 0,
      change: '+16.7%',
      changeValue: '+2',
      trend: 'up',
      icon: Users,
      color: 'text-orange-600 bg-orange-100',
      bgGradient: 'from-orange-500 to-orange-600'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome back, {user?.name || user?.email?.split('@')[0]}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Here's a comprehensive overview of your platform activity and metrics
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          Last updated: {format(new Date(), 'MMM dd, yyyy HH:mm')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={stat.title} variant="elevated" className="hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform`}></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <TrendIcon className="h-3 w-3" />
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.title}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                    <span className="text-sm text-gray-500">{stat.changeValue} this week</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Activity Chart */}
        <Card variant="elevated" className="hover:shadow-xl transition-shadow">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Project Activity Timeline
              </h2>
              <span className="text-sm text-gray-500">Last 14 days</span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={projectActivityData}>
                <defs>
                  <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorAnalyses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorMigrations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#6B7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="projects"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorProjects)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="analyses"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorAnalyses)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="migrations"
                  stroke="#8B5CF6"
                  fillOpacity={1}
                  fill="url(#colorMigrations)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Projects by Language */}
        <Card variant="elevated" className="hover:shadow-xl transition-shadow">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-purple-600" />
                Projects by Language
              </h2>
              <span className="text-sm text-gray-500">Distribution</span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={280}>
                <PieChart>
                  <Pie
                    data={projectsByLanguage}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projectsByLanguage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {projectsByLanguage.map((lang, idx) => (
                  <div key={idx} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: lang.color }}
                      ></div>
                      <span className="font-medium text-gray-700 group-hover:text-gray-900">{lang.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">{lang.value}</span>
                      <span className="text-sm text-gray-500">projects</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card variant="elevated" className="hover:shadow-xl transition-shadow">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Performance Metrics
            </h2>
            <span className="text-sm text-gray-500">Last 12 months</span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={320}>
            <RechartsLineChart data={performanceMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="left" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="analysisTime"
                stroke="#3B82F6"
                strokeWidth={3}
                name="Avg Analysis Time (s)"
                dot={{ fill: '#3B82F6', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="successRate"
                stroke="#10B981"
                strokeWidth={3}
                name="Success Rate (%)"
                dot={{ fill: '#10B981', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="complexity"
                stroke="#8B5CF6"
                strokeWidth={3}
                name="Avg Complexity Score"
                dot={{ fill: '#8B5CF6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Migrations - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card variant="elevated" className="hover:shadow-xl transition-shadow h-full">
            <CardHeader className="border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-purple-600" />
                Active Migrations
              </h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {activeMigrations.map((migration, idx) => (
                  <div key={idx} className="group hover:bg-gray-50 p-4 rounded-xl transition-all border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                          {migration.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{migration.project}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {migration.status === 'completed' ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Completed
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1">
                            <Activity className="h-3 w-3 animate-pulse" />
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-bold text-gray-900">{migration.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${
                            migration.status === 'completed' 
                              ? 'bg-gradient-to-r from-green-500 to-green-600' 
                              : 'bg-gradient-to-r from-blue-500 to-purple-600'
                          }`}
                          style={{ width: `${migration.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm pt-2">
                        <span className="text-gray-600">
                          {migration.filesProcessed} / {migration.totalFiles} files
                        </span>
                        <span className="text-gray-600">
                          {migration.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <Card variant="elevated" className="hover:shadow-xl transition-shadow">
          <CardHeader className="border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              System Health
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={240}>
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="20%" 
                outerRadius="100%" 
                barSize={15} 
                data={systemHealth}
              >
                <RadialBar
                  label={{ position: 'insideStart', fill: '#fff', fontSize: 12 }}
                  background
                  dataKey="value"
                />
                <Legend 
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </RadialBarChart>
            </ResponsiveContainer>
            
            <div className="mt-6 space-y-3">
              {systemHealth.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: item.color }}>
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Feed */}
      <Card variant="elevated" className="hover:shadow-xl transition-shadow">
        <CardHeader className="border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Recent Activity Feed
          </h2>
        </CardHeader>
        <CardContent className="p-6">
          {activity && activity.length > 0 ? (
            <div className="space-y-4">
              {activity.slice(0, 8).map((item: any, idx: number) => (
                <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="mt-1 flex-shrink-0">
                    {item.action.toLowerCase().includes('created') ? (
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                    ) : item.action.toLowerCase().includes('updated') ? (
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileCode className="h-5 w-5 text-blue-600" />
                      </div>
                    ) : (
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Activity className="h-5 w-5 text-purple-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      by {item.user_name || item.user_email}
                    </p>
                    {item.details && (
                      <p className="text-xs text-gray-500 mt-1">
                        {JSON.stringify(item.details).substring(0, 50)}...
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-gray-500">
                      {format(new Date(item.created_at), 'MMM dd')}
                    </p>
                    <p className="text-xs text-gray-400">
                      {format(new Date(item.created_at), 'HH:mm')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No recent activity</p>
              <p className="text-sm text-gray-400 mt-1">Activity will appear here as you use the platform</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

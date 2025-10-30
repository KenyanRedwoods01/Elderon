'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardHeader, CardContent, Spinner, Button } from '@elderonai/ui';
import {
  ArrowLeft, Edit, Trash2, GitBranch, Code2, FileCode, Settings,
  PlayCircle, CheckCircle2, AlertCircle, Clock, TrendingUp, BarChart3,
  Terminal, Package, Shield, Zap, FileText, ExternalLink
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { api } from '@/lib/api';
import { Project } from '@elderonai/types';
import { format } from 'date-fns';
import Link from 'next/link';

type Tab = 'overview' | 'analysis' | 'migrations' | 'files' | 'settings';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', params.id],
    queryFn: async () => {
      const response = await api.get(`/api/projects/${params.id}`);
      return response.data.project as Project;
    },
  });

  const deleteProject = useMutation({
    mutationFn: async () => {
      await api.delete(`/api/projects/${params.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      router.push('/projects');
    },
  });

  // Mock data for visualizations
  const complexityTrend = Array.from({ length: 10 }, (_, i) => ({
    version: `v${i + 1}`,
    complexity: Math.floor(Math.random() * 20) + 40,
    maintainability: Math.floor(Math.random() * 15) + 75,
  }));

  const codeQuality = [
    { category: 'Security', score: 85, benchmark: 90 },
    { category: 'Performance', score: 78, benchmark: 85 },
    { category: 'Maintainability', score: 92, benchmark: 88 },
    { category: 'Reliability', score: 88, benchmark: 90 },
    { category: 'Test Coverage', score: 75, benchmark: 80 },
    { category: 'Documentation', score: 82, benchmark: 85 },
  ];

  const issuesByType = [
    { name: 'Critical', value: 3, color: '#EF4444' },
    { name: 'High', value: 12, color: '#F59E0B' },
    { name: 'Medium', value: 28, color: '#3B82F6' },
    { name: 'Low', value: 45, color: '#10B981' },
    { name: 'Info', value: 67, color: '#8B5CF6' },
  ];

  const dependencyStats = {
    total: 142,
    outdated: 23,
    vulnerable: 5,
    upToDate: 114,
  };

  const fileMetrics = [
    { type: 'TypeScript', files: 342, lines: 45623, color: '#3178C6' },
    { type: 'JavaScript', files: 89, lines: 12456, color: '#F7DF1E' },
    { type: 'CSS/SCSS', files: 76, lines: 8934, color: '#264DE4' },
    { type: 'JSON', files: 34, lines: 2145, color: '#5E5E5E' },
    { type: 'Other', files: 28, lines: 1876, color: '#9CA3AF' },
  ];

  const migrationHistory = [
    {
      id: 1,
      from: 'React 16',
      to: 'React 18',
      status: 'completed',
      date: new Date('2024-01-15'),
      filesChanged: 234,
      success: true,
    },
    {
      id: 2,
      from: 'Webpack 4',
      to: 'Webpack 5',
      status: 'in_progress',
      date: new Date('2024-02-01'),
      filesChanged: 45,
      progress: 65,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
        <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been deleted.</p>
        <Link href="/projects">
          <Button>Back to Projects</Button>
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: FileText },
    { id: 'analysis' as Tab, label: 'Analysis', icon: BarChart3 },
    { id: 'migrations' as Tab, label: 'Migrations', icon: GitBranch },
    { id: 'files' as Tab, label: 'Files', icon: FileCode },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    analyzing: 'bg-blue-100 text-blue-700',
    migrating: 'bg-purple-100 text-purple-700',
    completed: 'bg-gray-100 text-gray-700',
    archived: 'bg-gray-100 text-gray-500',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link href="/projects" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Projects
          </Link>
          <div className="flex items-center gap-4 mt-2">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Code2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
                {project.language && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    {project.language}
                  </span>
                )}
                {project.framework && (
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                    {project.framework}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="danger"
            className="flex items-center gap-2"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card variant="elevated" className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Files</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">569</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <FileCode className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">+12 this week</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Lines of Code</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">71K</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-xl">
                      <Code2 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">+2.3K this week</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Dependencies</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">142</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <Package className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-sm text-red-500 mt-2">5 vulnerable</p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Code Quality</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">A-</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-xl">
                      <Shield className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <p className="text-sm text-green-500 mt-2">+2 grades improved</p>
                </CardContent>
              </Card>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card variant="elevated">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Project Information</h2>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {project.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Description</label>
                      <p className="text-gray-900 mt-1">{project.description}</p>
                    </div>
                  )}
                  {project.repository_url && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Repository</label>
                      <a
                        href={project.repository_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mt-1"
                      >
                        {project.repository_url}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Created</label>
                      <p className="text-gray-900 mt-1">
                        {format(new Date(project.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Updated</label>
                      <p className="text-gray-900 mt-1">
                        {format(new Date(project.updated_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <button className="w-full flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <PlayCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900">Run Analysis</p>
                      <p className="text-sm text-gray-600">Analyze code quality and complexity</p>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group">
                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                      <GitBranch className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900">Start Migration</p>
                      <p className="text-sm text-gray-600">Migrate to a new framework</p>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
                    <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <Terminal className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900">Run Tests</p>
                      <p className="text-sm text-gray-600">Execute test suite</p>
                    </div>
                  </button>
                </CardContent>
              </Card>
            </div>

            {/* File Metrics */}
            <Card variant="elevated">
              <CardHeader className="border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">File Metrics by Type</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {fileMetrics.map((metric, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: metric.color }}
                          ></div>
                          <span className="font-medium text-gray-900">{metric.type}</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <span className="text-gray-600">{metric.files} files</span>
                          <span className="text-gray-600">{metric.lines.toLocaleString()} lines</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${(metric.files / 569) * 100}%`,
                            backgroundColor: metric.color
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-6">
            {/* Code Quality Radar */}
            <Card variant="elevated">
              <CardHeader className="border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Code Quality Assessment</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={codeQuality}>
                      <PolarGrid stroke="#E5E7EB" />
                      <PolarAngleAxis dataKey="category" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Current Score" dataKey="score" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                      <Radar name="Benchmark" dataKey="benchmark" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>

                  <div className="space-y-4">
                    {codeQuality.map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-700">{item.category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900">{item.score}</span>
                            <span className="text-sm text-gray-500">/ {item.benchmark}</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              item.score >= item.benchmark ? 'bg-green-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Issues Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card variant="elevated">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Issues by Severity</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <ResponsiveContainer width="50%" height={250}>
                      <PieChart>
                        <Pie
                          data={issuesByType}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {issuesByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="flex-1 space-y-3">
                      {issuesByType.map((issue, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: issue.color }}
                            ></div>
                            <span className="text-sm font-medium">{issue.name}</span>
                          </div>
                          <span className="text-lg font-bold">{issue.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader className="border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Complexity Trend</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={complexityTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="version" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="complexity"
                        stroke="#EF4444"
                        strokeWidth={2}
                        name="Complexity"
                      />
                      <Line
                        type="monotone"
                        dataKey="maintainability"
                        stroke="#10B981"
                        strokeWidth={2}
                        name="Maintainability"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Dependency Report */}
            <Card variant="elevated">
              <CardHeader className="border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Package className="h-5 w-5 text-purple-600" />
                  Dependencies Status
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-gray-900">{dependencyStats.total}</p>
                    <p className="text-sm text-gray-600 mt-1">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600">{dependencyStats.upToDate}</p>
                    <p className="text-sm text-gray-600 mt-1">Up to Date</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-yellow-600">{dependencyStats.outdated}</p>
                    <p className="text-sm text-gray-600 mt-1">Outdated</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-red-600">{dependencyStats.vulnerable}</p>
                    <p className="text-sm text-gray-600 mt-1">Vulnerable</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'migrations' && (
          <div className="space-y-6">
            <Card variant="elevated">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Migration History</h2>
                  <Button className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4" />
                    New Migration
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {migrationHistory.length > 0 ? (
                  <div className="space-y-4">
                    {migrationHistory.map((migration) => (
                      <div key={migration.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {migration.from} → {migration.to}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {format(migration.date, 'MMM dd, yyyy')} • {migration.filesChanged} files changed
                            </p>
                          </div>
                          {migration.status === 'completed' ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Completed
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                              In Progress
                            </span>
                          )}
                        </div>
                        {migration.progress && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-semibold">{migration.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                                style={{ width: `${migration.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <GitBranch className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No migrations yet</p>
                    <p className="text-sm text-gray-500 mt-1">Start a migration to modernize your codebase</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'files' && (
          <div>
            <Card variant="elevated">
              <CardHeader className="border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Project Files</h2>
              </CardHeader>
              <CardContent className="p-6">
                {project.repository_url ? (
                  <div className="text-center py-12">
                    <FileCode className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Repository file browser</p>
                    <a
                      href={project.repository_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2"
                    >
                      View on GitHub
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileCode className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No repository linked</p>
                    <p className="text-sm text-gray-500 mt-1">Add a repository URL in settings</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card variant="elevated">
              <CardHeader className="border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Project Settings</h2>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    defaultValue={project.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    defaultValue={project.description || ''}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      defaultValue={project.language || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select language</option>
                      <option value="TypeScript">TypeScript</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="Python">Python</option>
                      <option value="Java">Java</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Framework
                    </label>
                    <select
                      defaultValue={project.framework || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select framework</option>
                      <option value="React">React</option>
                      <option value="Vue">Vue.js</option>
                      <option value="Angular">Angular</option>
                      <option value="Next.js">Next.js</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    defaultValue={project.repository_url || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1">Save Changes</Button>
                  <Button variant="secondary">Cancel</Button>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader className="border-b border-gray-100">
                <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Delete Project</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Once deleted, this project cannot be recovered
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md m-4">
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Delete Project</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Are you sure you want to delete <strong>{project.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="danger"
                  className="flex-1"
                  onClick={() => deleteProject.mutate()}
                  loading={deleteProject.isPending}
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

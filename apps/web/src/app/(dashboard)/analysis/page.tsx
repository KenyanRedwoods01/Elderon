'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FileCode,
  Upload,
  Play,
  Download,
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Code,
  FileText,
  Shield,
  Package,
  TrendingUp,
  Clock,
  Zap,
  Brain,
  Target,
  Activity,
  BarChart3,
  PieChart,
  GitBranch,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { api } from '@/lib/api';

type AnalysisType = 'complexity' | 'security' | 'dependencies' | 'patterns' | 'all';
type AnalysisStatus = 'idle' | 'uploading' | 'analyzing' | 'completed' | 'error';

interface AnalysisResult {
  id: string;
  project_id: string;
  analysis_type: string;
  status: string;
  results: {
    metrics: {
      lines_of_code: number;
      functions: number;
      classes: number;
      complexity_average: number;
      maintainability_index: number;
      test_coverage: number;
    };
    quality_scores: {
      maintainability: number;
      reliability: number;
      security: number;
      testability: number;
      documentation: number;
      performance: number;
    };
    issues: Array<{
      severity: 'critical' | 'high' | 'medium' | 'low';
      type: string;
      message: string;
      file: string;
      line: number;
      suggestion: string;
    }>;
    ai_suggestions: Array<{
      category: string;
      priority: 'high' | 'medium' | 'low';
      title: string;
      description: string;
      impact: string;
      effort: string;
    }>;
    dependencies: {
      total: number;
      outdated: number;
      vulnerable: number;
      details: Array<{
        name: string;
        current: string;
        latest: string;
        status: 'up-to-date' | 'outdated' | 'vulnerable';
      }>;
    };
    complexity_distribution: Array<{
      range: string;
      count: number;
    }>;
    trend_data: Array<{
      date: string;
      complexity: number;
      maintainability: number;
      issues: number;
    }>;
  };
  created_at: string;
  completed_at: string;
}

export default function AnalysisPage() {
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [analysisType, setAnalysisType] = useState<AnalysisType>('all');
  const [codeContent, setCodeContent] = useState<string>('');
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Fetch user's projects
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get('/api/projects');
      return response.data.data;
    },
  });

  // Mock analysis results for demonstration (in real app, this comes from API)
  const mockAnalysisResult: AnalysisResult = {
    id: '1',
    project_id: selectedProject || '1',
    analysis_type: analysisType,
    status: 'completed',
    results: {
      metrics: {
        lines_of_code: 15847,
        functions: 342,
        classes: 87,
        complexity_average: 4.8,
        maintainability_index: 76,
        test_coverage: 68,
      },
      quality_scores: {
        maintainability: 76,
        reliability: 82,
        security: 71,
        testability: 68,
        documentation: 64,
        performance: 79,
      },
      issues: [
        {
          severity: 'critical',
          type: 'Security Vulnerability',
          message: 'SQL Injection vulnerability detected',
          file: 'src/database/queries.ts',
          line: 145,
          suggestion: 'Use parameterized queries instead of string concatenation',
        },
        {
          severity: 'high',
          type: 'Code Smell',
          message: 'Function complexity exceeds threshold (complexity: 18)',
          file: 'src/services/UserService.ts',
          line: 89,
          suggestion: 'Break down function into smaller, more manageable functions',
        },
        {
          severity: 'high',
          type: 'Performance Issue',
          message: 'N+1 query problem detected',
          file: 'src/api/routes/projects.ts',
          line: 234,
          suggestion: 'Use eager loading or batch queries to reduce database calls',
        },
        {
          severity: 'medium',
          type: 'Code Duplication',
          message: 'Duplicated code block found in 3 locations',
          file: 'src/utils/validation.ts',
          line: 56,
          suggestion: 'Extract common logic into a reusable utility function',
        },
        {
          severity: 'medium',
          type: 'Deprecated API',
          message: 'Using deprecated API: componentWillMount',
          file: 'src/components/Dashboard.tsx',
          line: 78,
          suggestion: 'Migrate to useEffect hook or componentDidMount',
        },
        {
          severity: 'low',
          type: 'Code Style',
          message: 'Inconsistent variable naming convention',
          file: 'src/utils/helpers.ts',
          line: 23,
          suggestion: 'Use camelCase consistently for variable names',
        },
      ],
      ai_suggestions: [
        {
          category: 'Architecture',
          priority: 'high',
          title: 'Implement Repository Pattern',
          description:
            'Your data access layer is tightly coupled with business logic. Implementing the Repository pattern will improve testability and maintainability by abstracting data access.',
          impact: 'Improved testability, reduced coupling, easier to maintain',
          effort: '3-5 days',
        },
        {
          category: 'Performance',
          priority: 'high',
          title: 'Optimize Database Queries',
          description:
            'Multiple N+1 query problems detected across the codebase. Implementing eager loading and query batching can reduce database calls by 60-70%.',
          impact: '40-50% reduction in API response times',
          effort: '2-3 days',
        },
        {
          category: 'Security',
          priority: 'high',
          title: 'Implement Input Validation Layer',
          description:
            'Add comprehensive input validation using a schema validation library (e.g., Zod) at the API boundary to prevent injection attacks and ensure data integrity.',
          impact: 'Significantly improved security posture',
          effort: '4-6 days',
        },
        {
          category: 'Testing',
          priority: 'medium',
          title: 'Increase Test Coverage',
          description:
            'Current test coverage is 68%. Focus on testing critical paths, especially authentication, payment processing, and data transformation logic.',
          impact: 'Increased confidence in deployments, fewer production bugs',
          effort: '5-7 days',
        },
        {
          category: 'Code Quality',
          priority: 'medium',
          title: 'Refactor Complex Functions',
          description:
            '12 functions have cyclomatic complexity > 10. Breaking these down into smaller, focused functions will improve readability and maintainability.',
          impact: 'Easier code maintenance and onboarding',
          effort: '3-4 days',
        },
        {
          category: 'Documentation',
          priority: 'low',
          title: 'Add JSDoc Comments',
          description:
            'Many public functions lack documentation. Adding JSDoc comments will improve IDE autocomplete and help team members understand function purposes.',
          impact: 'Better developer experience',
          effort: '2-3 days',
        },
      ],
      dependencies: {
        total: 156,
        outdated: 23,
        vulnerable: 4,
        details: [
          { name: 'lodash', current: '4.17.15', latest: '4.17.21', status: 'vulnerable' },
          { name: 'axios', current: '0.21.1', latest: '1.6.2', status: 'outdated' },
          { name: 'react', current: '18.2.0', latest: '18.2.0', status: 'up-to-date' },
          { name: 'express', current: '4.17.1', latest: '4.18.2', status: 'outdated' },
        ],
      },
      complexity_distribution: [
        { range: '1-5', count: 234 },
        { range: '6-10', count: 87 },
        { range: '11-15', count: 34 },
        { range: '16-20', count: 12 },
        { range: '21+', count: 8 },
      ],
      trend_data: [
        { date: '2024-07', complexity: 5.2, maintainability: 72, issues: 89 },
        { date: '2024-08', complexity: 5.1, maintainability: 73, issues: 85 },
        { date: '2024-09', complexity: 5.0, maintainability: 74, issues: 82 },
        { date: '2024-10', complexity: 4.9, maintainability: 75, issues: 78 },
        { date: '2024-11', complexity: 4.8, maintainability: 76, issues: 74 },
        { date: '2024-12', complexity: 4.8, maintainability: 76, issues: 71 },
      ],
    },
    created_at: new Date().toISOString(),
    completed_at: new Date().toISOString(),
  };

  const startAnalysis = async () => {
    if (!codeContent && !selectedProject) {
      alert('Please select a project or paste code to analyze');
      return;
    }

    setStatus('analyzing');
    setProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 5;
      });
    }, 200);

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setStatus('completed');
      setAnalysisResult(mockAnalysisResult);
    }, 4000);
  };

  const exportResults = () => {
    // In real implementation, generate and download PDF
    alert('Export functionality would generate a PDF report of the analysis results');
  };

  const analysisTypes = [
    { id: 'all', label: 'Complete Analysis', icon: Activity, description: 'Run all analysis types' },
    {
      id: 'complexity',
      label: 'Complexity Analysis',
      icon: BarChart3,
      description: 'Analyze code complexity and maintainability',
    },
    {
      id: 'security',
      label: 'Security Scan',
      icon: Shield,
      description: 'Detect security vulnerabilities',
    },
    {
      id: 'dependencies',
      label: 'Dependencies',
      icon: Package,
      description: 'Check for outdated and vulnerable packages',
    },
    {
      id: 'patterns',
      label: 'Code Patterns',
      icon: GitBranch,
      description: 'Identify patterns and anti-patterns',
    },
  ];

  const severityColors = {
    critical: '#DC2626',
    high: '#F59E0B',
    medium: '#3B82F6',
    low: '#10B981',
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-blue-100 text-blue-800 border-blue-300',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              AI-Powered Code Analysis
            </h1>
            <p className="text-gray-600 mt-2">
              Analyze your codebase for complexity, security, dependencies, and code quality with AI-powered insights
            </p>
          </div>
          {status === 'completed' && (
            <button
              onClick={exportResults}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium shadow-lg"
            >
              <Download className="w-5 h-5" />
              Export Report
            </button>
          )}
        </div>

        {/* Analysis Setup Section */}
        {status !== 'completed' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileCode className="w-6 h-6 text-blue-600" />
              Configure Analysis
            </h2>

            <div className="space-y-6">
              {/* Project Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Project (Optional)
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Choose a project...</option>
                  {projects?.map((project: any) => (
                    <option key={project.id} value={project.id}>
                      {project.name} - {project.language}
                    </option>
                  ))}
                </select>
              </div>

              {/* Analysis Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Analysis Type</label>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {analysisTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setAnalysisType(type.id as AnalysisType)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          analysisType === type.id
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 mb-2 ${
                            analysisType === type.id ? 'text-blue-600' : 'text-gray-600'
                          }`}
                        />
                        <div className="font-semibold text-gray-900 text-sm">{type.label}</div>
                        <div className="text-xs text-gray-600 mt-1">{type.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Code Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Paste Code (Optional)
                </label>
                <textarea
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  placeholder="Paste your code here for analysis..."
                  className="w-full h-64 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm transition-all"
                />
              </div>

              {/* Start Analysis Button */}
              <button
                onClick={startAnalysis}
                disabled={status === 'analyzing'}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {status === 'analyzing' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing... {progress}%
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Analysis
                  </>
                )}
              </button>

              {/* Progress Bar */}
              {status === 'analyzing' && (
                <div className="space-y-3">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {progress < 30
                        ? 'Parsing code structure...'
                        : progress < 60
                        ? 'Running static analysis...'
                        : progress < 90
                        ? 'Analyzing with AI...'
                        : 'Generating insights...'}
                    </span>
                    <span className="font-semibold text-blue-600">{progress}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {status === 'completed' && analysisResult && (
          <div className="space-y-6">
            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Code className="w-8 h-8 opacity-80" />
                  <div className="text-4xl font-bold">{analysisResult.results.metrics.lines_of_code.toLocaleString()}</div>
                </div>
                <div className="text-blue-100 font-medium">Lines of Code</div>
                <div className="text-sm text-blue-200 mt-2">
                  {analysisResult.results.metrics.functions} functions •{' '}
                  {analysisResult.results.metrics.classes} classes
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 opacity-80" />
                  <div className="text-4xl font-bold">{analysisResult.results.metrics.complexity_average}</div>
                </div>
                <div className="text-purple-100 font-medium">Avg Complexity</div>
                <div className="text-sm text-purple-200 mt-2">
                  Maintainability: {analysisResult.results.metrics.maintainability_index}/100
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Target className="w-8 h-8 opacity-80" />
                  <div className="text-4xl font-bold">{analysisResult.results.metrics.test_coverage}%</div>
                </div>
                <div className="text-green-100 font-medium">Test Coverage</div>
                <div className="text-sm text-green-200 mt-2">
                  {analysisResult.results.issues.length} issues found
                </div>
              </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code Quality Radar Chart */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Code Quality Scores
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart
                    data={Object.entries(analysisResult.results.quality_scores).map(([key, value]) => ({
                      category: key.charAt(0).toUpperCase() + key.slice(1),
                      score: value,
                      fullMark: 100,
                    }))}
                  >
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="category" tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6B7280' }} />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                      strokeWidth={2}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Complexity Distribution */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Complexity Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analysisResult.results.complexity_distribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="range" tick={{ fill: '#6B7280' }} />
                    <YAxis tick={{ fill: '#6B7280' }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trend Data */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Quality Trends (6 Months)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analysisResult.results.trend_data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" tick={{ fill: '#6B7280' }} />
                    <YAxis tick={{ fill: '#6B7280' }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="complexity"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={{ fill: '#8B5CF6' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="maintainability"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ fill: '#10B981' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="issues"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={{ fill: '#F59E0B' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Issue Severity Distribution */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-red-600" />
                  Issues by Severity
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={[
                        {
                          name: 'Critical',
                          value: analysisResult.results.issues.filter((i) => i.severity === 'critical')
                            .length,
                          color: '#DC2626',
                        },
                        {
                          name: 'High',
                          value: analysisResult.results.issues.filter((i) => i.severity === 'high').length,
                          color: '#F59E0B',
                        },
                        {
                          name: 'Medium',
                          value: analysisResult.results.issues.filter((i) => i.severity === 'medium')
                            .length,
                          color: '#3B82F6',
                        },
                        {
                          name: 'Low',
                          value: analysisResult.results.issues.filter((i) => i.severity === 'low').length,
                          color: '#10B981',
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {[
                        { color: '#DC2626' },
                        { color: '#F59E0B' },
                        { color: '#3B82F6' },
                        { color: '#10B981' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Dependencies Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Dependencies Health
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">
                    {analysisResult.results.dependencies.total}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Total Dependencies</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">
                    {analysisResult.results.dependencies.total -
                      analysisResult.results.dependencies.outdated}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Up to Date</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-600">
                    {analysisResult.results.dependencies.outdated}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Outdated</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <div className="text-3xl font-bold text-red-600">
                    {analysisResult.results.dependencies.vulnerable}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Vulnerable</div>
                </div>
              </div>
              <div className="space-y-3">
                {analysisResult.results.dependencies.details.slice(0, 4).map((dep, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-semibold text-gray-900">{dep.name}</div>
                        <div className="text-sm text-gray-600">
                          Current: {dep.current} → Latest: {dep.latest}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        dep.status === 'vulnerable'
                          ? 'bg-red-100 text-red-800'
                          : dep.status === 'outdated'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {dep.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Issues List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                Issues Found ({analysisResult.results.issues.length})
              </h3>
              <div className="space-y-4">
                {analysisResult.results.issues.map((issue, idx) => {
                  const Icon =
                    issue.severity === 'critical'
                      ? XCircle
                      : issue.severity === 'high'
                      ? AlertCircle
                      : issue.severity === 'medium'
                      ? AlertTriangle
                      : CheckCircle;
                  return (
                    <div
                      key={idx}
                      className="border-l-4 p-5 rounded-r-xl bg-gray-50 hover:shadow-md transition-all"
                      style={{ borderColor: severityColors[issue.severity] }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <Icon
                            className="w-6 h-6 flex-shrink-0 mt-1"
                            style={{ color: severityColors[issue.severity] }}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-bold text-gray-900">{issue.message}</span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold uppercase`}
                                style={{
                                  backgroundColor: severityColors[issue.severity] + '20',
                                  color: severityColors[issue.severity],
                                }}
                              >
                                {issue.severity}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-3">
                              <span className="font-medium">{issue.type}</span> in{' '}
                              <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                                {issue.file}:{issue.line}
                              </code>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-3">
                              <div className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                AI Suggestion
                              </div>
                              <div className="text-sm text-gray-700">{issue.suggestion}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI-Powered Recommendations
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {analysisResult.results.ai_suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    className={`border-2 rounded-xl p-6 hover:shadow-lg transition-all ${priorityColors[suggestion.priority]}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase">{suggestion.category}</span>
                      </div>
                      <span className="text-xs font-bold uppercase px-2 py-1 bg-white rounded-full">
                        {suggestion.priority} Priority
                      </span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{suggestion.title}</h4>
                    <p className="text-sm mb-4 leading-relaxed">{suggestion.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        <span className="font-semibold">Impact:</span>
                        <span>{suggestion.impact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">Effort:</span>
                        <span>{suggestion.effort}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

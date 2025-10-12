'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  GitBranch,
  Plus,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Play,
  Pause,
  RotateCcw,
  FileCode,
  Zap,
  Target,
  TrendingUp,
  Database,
  Layers,
  Code,
  Package,
  Settings,
  AlertTriangle,
  CheckCheck,
  Loader2,
} from 'lucide-react';
import { api } from '@/lib/api';

type MigrationStatus = 'planning' | 'in_progress' | 'testing' | 'completed' | 'failed' | 'paused';
type WizardStep = 'project' | 'source' | 'target' | 'plan' | 'confirm';

interface Migration {
  id: string;
  project_id: string;
  project_name: string;
  source_framework: string;
  target_framework: string;
  status: MigrationStatus;
  progress: number;
  started_at: string;
  completed_at: string | null;
  files_total: number;
  files_migrated: number;
  ai_recommendations: {
    strategy: string;
    estimated_time: string;
    confidence: number;
    risks: string[];
    steps: Array<{
      step: number;
      title: string;
      description: string;
      status: 'pending' | 'in_progress' | 'completed';
    }>;
  };
}

const frameworks = [
  { id: 'react', name: 'React', category: 'Frontend', icon: '⚛️' },
  { id: 'vue', name: 'Vue.js', category: 'Frontend', icon: '💚' },
  { id: 'angular', name: 'Angular', category: 'Frontend', icon: '🅰️' },
  { id: 'svelte', name: 'Svelte', category: 'Frontend', icon: '🔥' },
  { id: 'nextjs', name: 'Next.js', category: 'Framework', icon: '▲' },
  { id: 'nuxtjs', name: 'Nuxt.js', category: 'Framework', icon: '💚' },
  { id: 'express', name: 'Express', category: 'Backend', icon: '🚂' },
  { id: 'nestjs', name: 'NestJS', category: 'Backend', icon: '🐱' },
  { id: 'django', name: 'Django', category: 'Backend', icon: '🐍' },
  { id: 'flask', name: 'Flask', category: 'Backend', icon: '🌶️' },
  { id: 'springboot', name: 'Spring Boot', category: 'Backend', icon: '🍃' },
  { id: 'rails', name: 'Ruby on Rails', category: 'Backend', icon: '💎' },
];

export default function MigrationsPage() {
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<WizardStep>('project');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [sourceFramework, setSourceFramework] = useState<string>('');
  const [targetFramework, setTargetFramework] = useState<string>('');
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const [planProgress, setPlanProgress] = useState(0);

  // Fetch projects
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get('/api/projects');
      return response.data.data;
    },
  });

  // Mock migrations data
  const migrations: Migration[] = [
    {
      id: '1',
      project_id: '1',
      project_name: 'E-Commerce Platform',
      source_framework: 'React',
      target_framework: 'Next.js',
      status: 'in_progress',
      progress: 67,
      started_at: '2024-12-10T10:30:00Z',
      completed_at: null,
      files_total: 248,
      files_migrated: 166,
      ai_recommendations: {
        strategy: 'Incremental Migration',
        estimated_time: '8-12 hours',
        confidence: 92,
        risks: [
          'State management needs refactoring',
          'Some third-party libraries may need replacement',
        ],
        steps: [
          {
            step: 1,
            title: 'Setup Next.js project structure',
            description: 'Initialize Next.js with App Router and configure TypeScript',
            status: 'completed',
          },
          {
            step: 2,
            title: 'Migrate routing system',
            description: 'Convert React Router to Next.js file-based routing',
            status: 'completed',
          },
          {
            step: 3,
            title: 'Convert components to Server Components',
            description: 'Identify and convert suitable components to RSC',
            status: 'in_progress',
          },
          {
            step: 4,
            title: 'Setup API routes',
            description: 'Migrate API calls to Next.js API routes',
            status: 'pending',
          },
          {
            step: 5,
            title: 'Configure SSR/SSG',
            description: 'Implement server-side rendering for key pages',
            status: 'pending',
          },
        ],
      },
    },
    {
      id: '2',
      project_id: '2',
      project_name: 'Admin Dashboard',
      source_framework: 'Vue 2',
      target_framework: 'Vue 3',
      status: 'completed',
      progress: 100,
      started_at: '2024-12-05T14:20:00Z',
      completed_at: '2024-12-08T16:45:00Z',
      files_total: 142,
      files_migrated: 142,
      ai_recommendations: {
        strategy: 'Big Bang Migration',
        estimated_time: '6-8 hours',
        confidence: 95,
        risks: ['Composition API learning curve', 'Plugin compatibility issues'],
        steps: [],
      },
    },
    {
      id: '3',
      project_id: '3',
      project_name: 'Mobile App Backend',
      source_framework: 'Express',
      target_framework: 'NestJS',
      status: 'planning',
      progress: 0,
      started_at: '2024-12-12T09:00:00Z',
      completed_at: null,
      files_total: 87,
      files_migrated: 0,
      ai_recommendations: {
        strategy: 'Strangler Fig Pattern',
        estimated_time: '16-20 hours',
        confidence: 88,
        risks: [
          'Dependency injection patterns differ significantly',
          'Middleware needs complete restructuring',
        ],
        steps: [],
      },
    },
  ];

  const mockGeneratedPlan = {
    strategy: 'Incremental Migration with Dual-Run',
    estimated_time: '10-14 hours',
    confidence: 89,
    risks: [
      'State management patterns differ between frameworks',
      'Some React-specific libraries need alternatives',
      'Testing coverage should be maintained during migration',
    ],
    benefits: [
      'Improved performance with SSR/SSG',
      'Better SEO capabilities',
      'Simplified deployment',
      'Built-in optimization features',
    ],
    steps: [
      {
        step: 1,
        title: 'Project Setup & Configuration',
        description:
          'Initialize Next.js project, configure TypeScript, set up ESLint and Prettier, migrate package.json dependencies',
        estimated_time: '1-2 hours',
        complexity: 'Low',
      },
      {
        step: 2,
        title: 'Routing Migration',
        description:
          'Convert React Router setup to Next.js App Router, migrate route definitions to file-based routing, update navigation logic',
        estimated_time: '2-3 hours',
        complexity: 'Medium',
      },
      {
        step: 3,
        title: 'Component Conversion',
        description:
          'Identify components suitable for Server Components, convert client components with "use client" directive, update imports and exports',
        estimated_time: '3-4 hours',
        complexity: 'Medium',
      },
      {
        step: 4,
        title: 'State Management Refactoring',
        description:
          'Evaluate current state management (Redux/Context), migrate to Next.js-friendly patterns, implement server state with React Query if needed',
        estimated_time: '2-3 hours',
        complexity: 'High',
      },
      {
        step: 5,
        title: 'API Integration',
        description:
          'Set up Next.js API routes, migrate existing API calls, implement server actions for mutations, configure API middleware',
        estimated_time: '2-3 hours',
        complexity: 'Medium',
      },
      {
        step: 6,
        title: 'Styling & Assets',
        description:
          'Migrate CSS/styling approach, configure Tailwind or CSS modules, optimize image loading with next/image, update static assets',
        estimated_time: '1-2 hours',
        complexity: 'Low',
      },
      {
        step: 7,
        title: 'Testing & Validation',
        description:
          'Update test configurations, migrate existing tests, ensure test coverage maintained, perform end-to-end testing',
        estimated_time: '2-3 hours',
        complexity: 'Medium',
      },
    ],
  };

  const getStatusColor = (status: MigrationStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'planning':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'testing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'paused':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: MigrationStatus) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'in_progress':
        return Play;
      case 'planning':
        return Clock;
      case 'testing':
        return AlertCircle;
      case 'failed':
        return XCircle;
      case 'paused':
        return Pause;
      default:
        return Clock;
    }
  };

  const startWizard = () => {
    setShowWizard(true);
    setWizardStep('project');
  };

  const nextStep = () => {
    const steps: WizardStep[] = ['project', 'source', 'target', 'plan', 'confirm'];
    const currentIndex = steps.indexOf(wizardStep);
    if (currentIndex < steps.length - 1) {
      setWizardStep(steps[currentIndex + 1]);

      // Simulate plan generation when moving to plan step
      if (steps[currentIndex + 1] === 'plan') {
        setGeneratingPlan(true);
        setPlanProgress(0);
        const interval = setInterval(() => {
          setPlanProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setGeneratingPlan(false);
              return 100;
            }
            return prev + 10;
          });
        }, 300);
      }
    }
  };

  const prevStep = () => {
    const steps: WizardStep[] = ['project', 'source', 'target', 'plan', 'confirm'];
    const currentIndex = steps.indexOf(wizardStep);
    if (currentIndex > 0) {
      setWizardStep(steps[currentIndex - 1]);
    }
  };

  const canProceed = () => {
    switch (wizardStep) {
      case 'project':
        return selectedProject !== '';
      case 'source':
        return sourceFramework !== '';
      case 'target':
        return targetFramework !== '';
      case 'plan':
        return !generatingPlan;
      default:
        return true;
    }
  };

  const startMigration = () => {
    alert('Migration would start here. This would trigger the backend migration engine.');
    setShowWizard(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <GitBranch className="w-8 h-8 text-purple-600" />
              Framework Migrations
            </h1>
            <p className="text-gray-600 mt-2">
              AI-powered framework migrations with step-by-step guidance and automated code transformation
            </p>
          </div>
          <button
            onClick={startWizard}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
          >
            <Plus className="w-5 h-5" />
            New Migration
          </button>
        </div>

        {/* Migration Wizard Modal */}
        {showWizard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Wizard Header */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Migration</h2>
                {/* Progress Steps */}
                <div className="flex items-center justify-between">
                  {[
                    { id: 'project', label: 'Project', icon: FileCode },
                    { id: 'source', label: 'Source', icon: Code },
                    { id: 'target', label: 'Target', icon: Target },
                    { id: 'plan', label: 'Plan', icon: Zap },
                    { id: 'confirm', label: 'Confirm', icon: CheckCheck },
                  ].map((step, idx, arr) => {
                    const Icon = step.icon;
                    const isActive = wizardStep === step.id;
                    const isPast =
                      arr.findIndex((s) => s.id === wizardStep) > arr.findIndex((s) => s.id === step.id);
                    return (
                      <div key={step.id} className="flex items-center flex-1">
                        <div className="flex flex-col items-center flex-1">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                              isActive
                                ? 'bg-purple-600 border-purple-600 text-white'
                                : isPast
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'bg-white border-gray-300 text-gray-400'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span
                            className={`text-xs mt-2 font-medium ${
                              isActive ? 'text-purple-600' : isPast ? 'text-green-600' : 'text-gray-400'
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                        {idx < arr.length - 1 && (
                          <div
                            className={`flex-1 h-0.5 mx-2 ${
                              isPast ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Wizard Content */}
              <div className="p-6">
                {/* Step 1: Select Project */}
                {wizardStep === 'project' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Select Project</h3>
                    <p className="text-gray-600 mb-6">
                      Choose the project you want to migrate to a different framework
                    </p>
                    <div className="space-y-3">
                      {projects?.map((project: any) => (
                        <button
                          key={project.id}
                          onClick={() => {
                            setSelectedProject(project.id);
                            setSourceFramework(project.framework || '');
                          }}
                          className={`w-full p-5 border-2 rounded-xl text-left transition-all hover:shadow-md ${
                            selectedProject === project.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-gray-900">{project.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {project.language} • {project.framework || 'No framework set'}
                              </p>
                            </div>
                            {selectedProject === project.id && (
                              <CheckCircle className="w-6 h-6 text-purple-600" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Select Source Framework */}
                {wizardStep === 'source' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Source Framework</h3>
                    <p className="text-gray-600 mb-6">
                      Select or confirm the current framework of your project
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {frameworks.map((framework) => (
                        <button
                          key={framework.id}
                          onClick={() => setSourceFramework(framework.id)}
                          className={`p-5 border-2 rounded-xl transition-all hover:shadow-md ${
                            sourceFramework === framework.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-3xl mb-2">{framework.icon}</div>
                          <div className="font-bold text-gray-900">{framework.name}</div>
                          <div className="text-xs text-gray-600 mt-1">{framework.category}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Select Target Framework */}
                {wizardStep === 'target' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Target Framework</h3>
                    <p className="text-gray-600 mb-6">
                      Select the framework you want to migrate to
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {frameworks
                        .filter((f) => f.id !== sourceFramework)
                        .map((framework) => (
                          <button
                            key={framework.id}
                            onClick={() => setTargetFramework(framework.id)}
                            className={`p-5 border-2 rounded-xl transition-all hover:shadow-md ${
                              targetFramework === framework.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-3xl mb-2">{framework.icon}</div>
                            <div className="font-bold text-gray-900">{framework.name}</div>
                            <div className="text-xs text-gray-600 mt-1">{framework.category}</div>
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Step 4: AI-Generated Plan */}
                {wizardStep === 'plan' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Migration Plan</h3>
                    {generatingPlan ? (
                      <div className="text-center py-12">
                        <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">AI is generating your migration plan...</p>
                        <div className="mt-4 max-w-md mx-auto">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full transition-all"
                              style={{ width: `${planProgress}%` }}
                            />
                          </div>
                          <p className="text-sm text-gray-500 mt-2">{planProgress}%</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Strategy Overview */}
                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 text-lg mb-2">
                                {mockGeneratedPlan.strategy}
                              </h4>
                              <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="bg-white rounded-lg p-3">
                                  <div className="text-sm text-gray-600">Estimated Time</div>
                                  <div className="font-bold text-purple-600 text-lg">
                                    {mockGeneratedPlan.estimated_time}
                                  </div>
                                </div>
                                <div className="bg-white rounded-lg p-3">
                                  <div className="text-sm text-gray-600">AI Confidence</div>
                                  <div className="font-bold text-green-600 text-lg">
                                    {mockGeneratedPlan.confidence}%
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Risks & Benefits */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                            <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <AlertTriangle className="w-5 h-5 text-red-600" />
                              Potential Risks
                            </h5>
                            <ul className="space-y-2">
                              {mockGeneratedPlan.risks.map((risk, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                  <span className="text-red-600 mt-1">•</span>
                                  <span>{risk}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                            <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-green-600" />
                              Expected Benefits
                            </h5>
                            <ul className="space-y-2">
                              {mockGeneratedPlan.benefits.map((benefit, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                  <span className="text-green-600 mt-1">•</span>
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Migration Steps */}
                        <div>
                          <h5 className="font-bold text-gray-900 mb-4">Migration Steps</h5>
                          <div className="space-y-3">
                            {mockGeneratedPlan.steps.map((step) => (
                              <div
                                key={step.step}
                                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all"
                              >
                                <div className="flex items-start gap-4">
                                  <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                                    {step.step}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <h6 className="font-bold text-gray-900">{step.title}</h6>
                                      <span
                                        className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                          step.complexity === 'High'
                                            ? 'bg-red-100 text-red-800'
                                            : step.complexity === 'Medium'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-green-100 text-green-800'
                                        }`}
                                      >
                                        {step.complexity}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                                    <div className="text-xs text-gray-500">
                                      ⏱️ Estimated: {step.estimated_time}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 5: Confirm */}
                {wizardStep === 'confirm' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Migration</h3>
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                      <h4 className="font-bold text-gray-900 mb-4">Migration Summary</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-3 border-b border-purple-200">
                          <span className="text-gray-600">Project</span>
                          <span className="font-semibold text-gray-900">
                            {projects?.find((p: any) => p.id === selectedProject)?.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-purple-200">
                          <span className="text-gray-600">From</span>
                          <span className="font-semibold text-gray-900">
                            {frameworks.find((f) => f.id === sourceFramework)?.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-purple-200">
                          <span className="text-gray-600">To</span>
                          <span className="font-semibold text-gray-900">
                            {frameworks.find((f) => f.id === targetFramework)?.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-purple-200">
                          <span className="text-gray-600">Strategy</span>
                          <span className="font-semibold text-gray-900">
                            {mockGeneratedPlan.strategy}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <span className="text-gray-600">Estimated Time</span>
                          <span className="font-semibold text-gray-900">
                            {mockGeneratedPlan.estimated_time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-700">
                          <p className="font-semibold mb-1">Before you start:</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Ensure your project is committed to version control</li>
                            <li>Back up your database if applicable</li>
                            <li>Review the migration plan and potential risks</li>
                            <li>Ensure you have sufficient test coverage</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Wizard Footer */}
              <div className="p-6 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={() => setShowWizard(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium transition-all"
                >
                  Cancel
                </button>
                <div className="flex items-center gap-3">
                  {wizardStep !== 'project' && (
                    <button
                      onClick={prevStep}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all"
                    >
                      Back
                    </button>
                  )}
                  {wizardStep === 'confirm' ? (
                    <button
                      onClick={startMigration}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all flex items-center gap-2"
                    >
                      <Play className="w-5 h-5" />
                      Start Migration
                    </button>
                  ) : (
                    <button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Migrations */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-purple-600" />
            Active Migrations
          </h2>
          <div className="space-y-4">
            {migrations
              .filter((m) => m.status === 'in_progress' || m.status === 'planning')
              .map((migration) => {
                const StatusIcon = getStatusIcon(migration.status);
                return (
                  <div
                    key={migration.id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">
                          {migration.project_name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Code className="w-4 h-4" />
                            {migration.source_framework}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                          <span className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {migration.target_framework}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-2 ${getStatusColor(
                          migration.status
                        )}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {migration.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    {migration.status === 'in_progress' && (
                      <>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2 text-sm">
                            <span className="text-gray-600">
                              Progress: {migration.files_migrated} / {migration.files_total} files
                            </span>
                            <span className="font-bold text-purple-600">{migration.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full transition-all"
                              style={{ width: `${migration.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          {migration.ai_recommendations.steps.map((step) => (
                            <div
                              key={step.step}
                              className={`flex items-center gap-3 p-3 rounded-lg ${
                                step.status === 'completed'
                                  ? 'bg-green-50 border border-green-200'
                                  : step.status === 'in_progress'
                                  ? 'bg-blue-50 border border-blue-200'
                                  : 'bg-gray-50 border border-gray-200'
                              }`}
                            >
                              {step.status === 'completed' ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : step.status === 'in_progress' ? (
                                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                              ) : (
                                <Clock className="w-5 h-5 text-gray-400" />
                              )}
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 text-sm">{step.title}</div>
                                <div className="text-xs text-gray-600">{step.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                      <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm font-medium">
                        <Settings className="w-4 h-4" />
                        Manage
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium">
                        <Pause className="w-4 h-4" />
                        Pause
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-all text-sm font-medium">
                        <RotateCcw className="w-4 h-4" />
                        Rollback
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Migration History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-gray-600" />
            Migration History
          </h2>
          <div className="space-y-3">
            {migrations
              .filter((m) => m.status === 'completed' || m.status === 'failed')
              .map((migration) => {
                const StatusIcon = getStatusIcon(migration.status);
                return (
                  <div
                    key={migration.id}
                    className="flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <StatusIcon
                        className={`w-8 h-8 ${
                          migration.status === 'completed' ? 'text-green-600' : 'text-red-600'
                        }`}
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{migration.project_name}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                          <span>
                            {migration.source_framework} → {migration.target_framework}
                          </span>
                          <span>•</span>
                          <span>{migration.files_total} files</span>
                          <span>•</span>
                          <span>
                            {new Date(migration.completed_at || migration.started_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        migration.status
                      )}`}
                    >
                      {migration.status.toUpperCase()}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

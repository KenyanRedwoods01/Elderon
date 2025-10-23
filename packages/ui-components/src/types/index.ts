export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'user'
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  avatar?: string
  createdAt: string
  lastLogin?: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'paused' | 'failed'
  progress: number
  owner: string
  technologies: string[]
  createdAt: string
  updatedAt: string
}

export interface Migration {
  id: string
  name: string
  description: string
  status: 'pending' | 'running' | 'paused' | 'completed' | 'failed'
  progress: number
  sourceTech: string
  targetTech: string
  filesProcessed: number
  totalFiles: number
  errors: number
  warnings: number
  startTime: string
  estimatedCompletion?: string
  completedTime?: string
}

export interface Analysis {
  id: string
  projectId: string
  type: 'code-quality' | 'security' | 'performance' | 'maintainability'
  status: 'pending' | 'running' | 'completed' | 'failed'
  results: {
    score: number
    issues: Issue[]
    recommendations: Recommendation[]
  }
  createdAt: string
  completedAt?: string
}

export interface Issue {
  id: string
  type: 'security' | 'performance' | 'maintainability' | 'reliability'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  file: string
  line: number
  status: 'open' | 'resolved' | 'ignored'
}

export interface Recommendation {
  id: string
  category: 'Security' | 'Performance' | 'Maintainability' | 'Reliability'
  title: string
  description: string
  impact: 'Low' | 'Medium' | 'High'
  effort: 'Low' | 'Medium' | 'High'
  status: 'pending' | 'applied' | 'dismissed'
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  read: boolean
  createdAt: string
}

export interface SystemMetric {
  name: string
  value: number
  status: 'good' | 'warning' | 'critical'
  trend: 'up' | 'down' | 'stable'
  unit?: string
}

export interface Activity {
  id: string
  type: 'user' | 'project' | 'migration' | 'system' | 'error'
  action: string
  user: string
  time: string
  status: 'success' | 'warning' | 'error'
  details?: Record<string, any>
}
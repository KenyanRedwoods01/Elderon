'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardContent, Spinner } from '@elderonai/ui';
import { FolderKanban, LineChart, GitBranch, Users } from 'lucide-react';
import { api } from '@/lib/api';
import { getUser } from '@/lib/auth';

export default function DashboardPage() {
  const user = getUser();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await api.get('/api/dashboard/stats');
      return response.data;
    },
  });

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
      icon: FolderKanban,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      title: 'Active Analyses',
      value: stats?.active_analyses || 0,
      icon: LineChart,
      color: 'text-green-600 bg-green-100',
    },
    {
      title: 'Migrations',
      value: stats?.completed_migrations || 0,
      icon: GitBranch,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      title: 'Team Members',
      value: stats?.team_members || 0,
      icon: Users,
      color: 'text-orange-600 bg-orange-100',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || user?.email}
        </h1>
        <p className="mt-2 text-gray-600">
          Here's what's happening with your projects today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} variant="elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="elevated">
          <CardHeader>
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">No recent activity to display</p>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/projects/new"
              className="block px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              + New Project
            </a>
            <a
              href="/analysis"
              className="block px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium"
            >
              Start Analysis
            </a>
            <a
              href="/docs"
              className="block px-4 py-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium"
            >
              View Documentation
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

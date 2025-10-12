'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Spinner, Button } from '@elderonai/ui';
import { Plus } from 'lucide-react';
import { api } from '@/lib/api';
import { Project } from '@elderonai/types';
import { timeAgo } from '@elderonai/utils';

export default function ProjectsPage() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get('/api/projects');
      return response.data.data as Project[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-2 text-gray-600">Manage your modernization projects</p>
        </div>
        <Link href="/projects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {!projects || projects.length === 0 ? (
        <Card variant="elevated">
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first project</p>
            <Link href="/projects/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card variant="elevated" className="hover:shadow-xl transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                  {project.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {project.language && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {project.language}
                      </span>
                    )}
                    {project.framework && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                        {project.framework}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Updated {timeAgo(new Date(project.updated_at))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, Button, Input } from '@elderonai/ui';
import { api } from '@/lib/api';

const projectSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  description: z.string().max(500).optional(),
  repository_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  language: z.string().optional(),
  framework: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function NewProjectPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await api.post('/api/projects', data);
      router.push(`/projects/${response.data.project.id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
        <p className="mt-2 text-gray-600">Add a new project to start modernization</p>
      </div>

      <Card variant="elevated">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Project Name"
              {...register('name')}
              error={errors.name?.message}
              required
              placeholder="My Legacy Application"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={4}
                placeholder="Brief description of the project..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <Input
              label="Repository URL (Optional)"
              type="url"
              {...register('repository_url')}
              error={errors.repository_url?.message}
              placeholder="https://github.com/username/repo"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  {...register('language')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select language</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                  <option value="Ruby">Ruby</option>
                  <option value="PHP">PHP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Framework
                </label>
                <select
                  {...register('framework')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select framework</option>
                  <option value="React">React</option>
                  <option value="Vue">Vue.js</option>
                  <option value="Angular">Angular</option>
                  <option value="Next.js">Next.js</option>
                  <option value="Django">Django</option>
                  <option value="Flask">Flask</option>
                  <option value="Spring Boot">Spring Boot</option>
                  <option value="ASP.NET">ASP.NET</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <Button type="submit" loading={isLoading}>
                Create Project
              </Button>
              <Button type="button" variant="secondary" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

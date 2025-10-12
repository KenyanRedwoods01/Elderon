'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Card, CardContent } from '@elderonai/ui';
import { api } from '@/lib/api';
import { setToken } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await api.post('/api/auth/login', data);
      const { token } = response.data;

      setToken(token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="elevated">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            required
          />

          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
            required
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" loading={isLoading}>
            Sign in
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700">
            Forgot your password?
          </Link>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

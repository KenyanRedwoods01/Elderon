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
import { isStrongPassword } from '@elderonai/utils';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password');
  const passwordStrength = password ? (isStrongPassword(password) ? 'strong' : 'weak') : null;

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await api.post('/api/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const { token } = response.data;
      setToken(token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="elevated">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Name" type="text" {...register('name')} error={errors.name?.message} required />

          <Input label="Email" type="email" {...register('email')} error={errors.email?.message} required />

          <div>
            <Input
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              required
            />
            {passwordStrength && (
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      passwordStrength === 'strong' ? 'bg-green-500 w-full' : 'bg-yellow-500 w-1/2'
                    }`}
                  />
                </div>
                <p className="text-xs mt-1 text-gray-600">
                  Password strength: {passwordStrength === 'strong' ? 'Strong' : 'Weak'}
                </p>
              </div>
            )}
          </div>

          <Input
            label="Confirm Password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            required
          />

          <div className="flex items-start">
            <input
              type="checkbox"
              {...register('terms')}
              className="mt-1 h-4 w-4 rounded border-gray-300"
            />
            <label className="ml-2 text-sm text-gray-600">
              I agree to the{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.terms && <p className="text-sm text-red-600">{errors.terms.message}</p>}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" loading={isLoading}>
            Create account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

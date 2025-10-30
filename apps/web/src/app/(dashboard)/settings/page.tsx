'use client';

import { Card, CardHeader, CardContent, Input, Button } from '@elderonai/ui';
import { getUser } from '@/lib/auth';

export default function SettingsPage() {
  const user = getUser();

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="space-y-6">
        <Card variant="elevated">
          <CardHeader>
            <h2 className="text-lg font-semibold">Profile</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Name" defaultValue={user?.name || ''} />
            <Input
              label="Email"
              type="email"
              defaultValue={user?.email || ''}
              disabled
            />
            <p className="text-sm text-gray-500">
              Contact support to change your email address
            </p>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <h2 className="text-lg font-semibold">Security</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="secondary">Change Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

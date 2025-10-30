'use client';

import { useRouter } from 'next/navigation';
import { LogOut, User, Settings } from 'lucide-react';
import { getUser, clearToken } from '@/lib/auth';
import { useState } from 'react';

export function Navbar() {
  const router = useRouter();
  const user = getUser();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    clearToken();
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ElderonAI
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium">{user?.name || user?.email}</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  router.push('/settings');
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

# 🏗️ ElderonAI - Platform Gateway (Enterprise Grade)

## 🔐 **Application 2: Platform Gateway** (`apps/gateway`)

---

## 📁 **Complete File Structure**

```
apps/gateway/
├── 📄 package.json
├── 📄 next.config.js
├── 📄 middleware.ts
├── 📄 .env.local
├── 📄 .env.example
├── 📁 public/
│   ├── 📄 favicon.ico
│   ├── 📁 icons/
│   │   ├── 📄 azure-ad.svg
│   │   ├── 📄 okta.svg
│   │   ├── 📄 google.svg
│   │   └── 📄 github.svg
│   └── 📁 security/
│       ├── 📄 soc2-badge.svg
│       ├── 📄 gdpr-compliant.svg
│       └── 📄 hipaa-ready.svg
├── 📁 src/
│   ├── 📄 app/
│   │   ├── 📄 layout.tsx
│   │   ├── 📄 page.tsx
│   │   ├── 📁 auth/
│   │   │   ├── 📄 layout.tsx
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 register/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 sso/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 mfa/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 callback/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 error/
│   │   │       └── 📄 page.tsx
│   │   ├── 📁 onboarding/
│   │   │   ├── 📄 page.tsx
│   │   │   ├── 📁 organization/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 team/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 complete/
│   │   │       └── 📄 page.tsx
│   │   ├── 📁 org-selection/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 security/
│   │   │   ├── 📄 page.tsx
│   │   │   ├── 📁 compliance/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 audit/
│   │   │       └── 📄 page.tsx
│   │   └── 📁 api/
│   │       ├── 📁 auth/
│   │       │   ├── 📄 route.ts
│   │       │   ├── 📁 sso/
│   │       │   │   └── 📄 route.ts
│   │       │   ├── 📁 mfa/
│   │       │   │   └── 📄 route.ts
│   │       │   └── 📁 session/
│   │       │       └── 📄 route.ts
│   │       └── 📁 organizations/
│   │           └── 📄 route.ts
│   ├── 📁 components/
│   │   ├── 📁 auth/
│   │   │   ├── 📄 enterprise-login.tsx
│   │   │   ├── 📄 sso-buttons.tsx
│   │   │   ├── 📄 mfa-setup.tsx
│   │   │   ├── 📄 security-banner.tsx
│   │   │   └── 📄 compliance-badges.tsx
│   │   ├── 📁 onboarding/
│   │   │   ├── 📄 organization-setup.tsx
│   │   │   ├── 📄 team-invite.tsx
│   │   │   ├── 📄 progress-steps.tsx
│   │   │   └── 📄 welcome-modal.tsx
│   │   ├── 📁 organizations/
│   │   │   ├── 📄 org-switcher.tsx
│   │   │   ├── 📄 org-card.tsx
│   │   │   ├── 📄 member-list.tsx
│   │   │   └── 📄 invite-dialog.tsx
│   │   ├── 📁 security/
│   │   │   ├── 📄 session-manager.tsx
│   │   │   ├── 📄 security-events.tsx
│   │   │   ├── 📄 compliance-dashboard.tsx
│   │   │   └── 📄 audit-log.tsx
│   │   └── 📁 ui/
│   │       ├── 📄 enterprise-header.tsx
│   │       ├── 📄 security-footer.tsx
│   │       ├── 📄 loading-spinner.tsx
│   │       └── 📄 error-boundary.tsx
│   ├── 📁 lib/
│   │   ├── 📁 auth/
│   │   │   ├── 📄 providers.ts
│   │   │   ├── 📄 session.ts
│   │   │   ├── 📄 mfa.ts
│   │   │   ├── 📄 sso.ts
│   │   │   └── 📄 security.ts
│   │   ├── 📁 api/
│   │   │   ├── 📄 client.ts
│   │   │   ├── 📄 auth-api.ts
│   │   │   ├── 📄 org-api.ts
│   │   │   └── 📄 security-api.ts
│   │   ├── 📁 utils/
│   │   │   ├── 📄 encryption.ts
│   │   │   ├── 📄 validation.ts
│   │   │   ├── 📄 logging.ts
│   │   │   └── 📄 audit.ts
│   │   └── 📁 middleware/
│   │       ├── 📄 auth-middleware.ts
│   │       ├── 📄 rate-limit.ts
│   │       ├── 📄 security-headers.ts
│   │       └── 📄 audit-middleware.ts
│   ├── 📁 types/
│   │   ├── 📄 auth.ts
│   │   ├── 📄 organization.ts
│   │   ├── 📄 security.ts
│   │   └── 📄 api.ts
│   ├── 📁 hooks/
│   │   ├── 📄 use-auth.ts
│   │   ├── 📄 use-organizations.ts
│   │   ├── 📄 use-security.ts
│   │   └── 📄 use-audit.ts
│   ├── 📁 store/
│   │   ├── 📄 auth-store.ts
│   │   ├── 📄 org-store.ts
│   │   ├── 📄 security-store.ts
│   │   └── 📄 index.ts
│   └── 📁 styles/
│       └── 📄 globals.css
├── 📁 tests/
│   ├── 📁 e2e/
│   │   ├── 📄 auth.spec.ts
│   │   ├── 📄 sso.spec.ts
│   │   └── 📄 onboarding.spec.ts
│   ├── 📁 integration/
│   │   ├── 📄 api.test.ts
│   │   └── 📄 middleware.test.ts
│   └── 📁 unit/
│       ├── 📄 auth.test.ts
│       └── 📄 security.test.ts
└── 📁 scripts/
    ├── 📄 setup-ssl.sh
    ├── 📄 generate-keys.sh
    └── 📄 security-scan.sh
```

---

## 🏗️ **Let's Build Step by Step**

### **1. Package Configuration**

```json
// apps/gateway/package.json
{
  "name": "@elderonai/gateway",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "next lint",
    "test": "jest",
    "test:e2e": "playwright test",
    "security:scan": "node scripts/security-scan.js"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tailwindcss": "^3.3.0",
    "lucide-react": "^0.292.0",
    "framer-motion": "^10.16.0",
    "jose": "^4.14.0",
    "bcryptjs": "^2.4.3",
    "otplib": "^12.0.1",
    "uuid": "^9.0.0",
    "qs": "^6.11.0",
    "axios": "^1.5.0",
    "zod": "^3.22.0",
    "next-auth": "^4.24.0",
    "iron-session": "^6.3.0"
  },
  "devDependencies": {
    "@types/node": "20.8.0",
    "@types/react": "18.2.0",
    "@types/react-dom": "18.2.0",
    "@types/bcryptjs": "^2.4.0",
    "@types/uuid": "^9.0.0",
    "autoprefixer": "^10.4.0",
    "eslint": "8.51.0",
    "eslint-config-next": "14.0.0",
    "postcss": "^8.4.0",
    "typescript": "5.2.0",
    "jest": "^29.0.0",
    "@playwright/test": "^1.30.0"
  }
}
```

### **2. Environment Configuration**

```bash
# apps/gateway/.env.example
# Authentication
NEXTAUTH_URL=https://platform.elderonai.com
NEXTAUTH_SECRET=your-nextauth-secret-here

# SSO Providers
AZURE_AD_CLIENT_ID=your-azure-client-id
AZURE_AD_CLIENT_SECRET=your-azure-client-secret
AZURE_AD_TENANT_ID=your-azure-tenant-id

OKTA_CLIENT_ID=your-okta-client-id
OKTA_CLIENT_SECRET=your-okta-client-secret
OKTA_DOMAIN=your-okta-domain

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Security
JWT_SECRET=your-jwt-secret-key
ENCRYPTION_KEY=your-encryption-key
MFA_ENCRYPTION_KEY=your-mfa-encryption-key

# API Endpoints
AUTH_API_URL=http://localhost:3002
ORGANIZATION_API_URL=http://localhost:3003
AUDIT_API_URL=http://localhost:3004

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000

# Security Headers
CSP_DIRECTIVES="default-src 'self'; script-src 'self' 'unsafe-inline'"
HSTS_MAX_AGE=31536000
```

### **3. Next.js Configuration**

```javascript
// apps/gateway/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['platform.elderonai.com', 'images.unsplash.com'],
  },
  env: {
    CUSTOM_ENV: process.env.CUSTOM_ENV || 'development',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: false,
      },
    ]
  }
}

module.exports = nextConfig
```

### **4. Middleware Configuration**

```typescript
// apps/gateway/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Security headers
  const response = NextResponse.next()
  
  // CSP Header
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
  )
  
  // HSTS Header
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  )
  
  // XSS Protection
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Check authentication
  const token = request.cookies.get('auth-token')
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isApiRoute = request.nextUrl.pathname.startsWith('/api')
  
  // Redirect logic
  if (!token && !isAuthPage && !isApiRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/org-selection', request.url))
  }
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons/|security/).*)',
  ],
}
```

### **5. Main Layout**

```tsx
// apps/gateway/src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ElderonAI Platform Gateway - Secure Enterprise Access',
  description: 'Secure authentication and organization management for ElderonAI enterprise platform',
  keywords: 'enterprise authentication, SSO, multi-tenant, security, compliance',
  robots: 'noindex, nofollow', // Gateway should not be indexed
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full">
          {children}
        </div>
      </body>
    </html>
  )
}
```

### **6. Authentication Providers Configuration**

```typescript
// apps/gateway/src/lib/auth/providers.ts
import AzureADProvider from 'next-auth/providers/azure-ad'
import OktaProvider from 'next-auth/providers/okta'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authProviders = {
  azure: AzureADProvider({
    clientId: process.env.AZURE_AD_CLIENT_ID!,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
    tenantId: process.env.AZURE_AD_TENANT_ID,
  }),
  
  okta: OktaProvider({
    clientId: process.env.OKTA_CLIENT_ID!,
    clientSecret: process.env.OKTA_CLIENT_SECRET!,
    issuer: process.env.OKTA_DOMAIN!,
  }),
  
  google: GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  
  github: GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
  
  credentials: CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
      mfaCode: { label: 'MFA Code', type: 'text', optional: true }
    },
    async authorize(credentials) {
      // Implement credential-based authentication
      const user = await authenticateWithCredentials(credentials)
      return user
    }
  })
}

export type ProviderType = keyof typeof authProviders
```

### **7. Enterprise Login Component**

```tsx
// apps/gateway/src/components/auth/enterprise-login.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Azure, 
  Key, 
  Github, 
  Mail, 
  Shield, 
  Lock, 
  Eye, 
  EyeOff,
  Smartphone 
} from 'lucide-react'

const ssoProviders = [
  {
    id: 'azure',
    name: 'Azure Active Directory',
    icon: Azure,
    color: 'from-blue-600 to-blue-700',
    description: 'Enterprise SSO with Azure AD'
  },
  {
    id: 'okta',
    name: 'Okta',
    icon: Key,
    color: 'from-purple-600 to-purple-700',
    description: 'Enterprise identity management'
  },
  {
    id: 'google',
    name: 'Google Workspace',
    icon: Mail,
    color: 'from-red-500 to-red-600',
    description: 'Google enterprise accounts'
  },
  {
    id: 'github',
    name: 'GitHub Enterprise',
    icon: Github,
    color: 'from-gray-800 to-gray-900',
    description: 'GitHub organization SSO'
  }
]

export function EnterpriseLogin() {
  const [activeTab, setActiveTab] = useState<'sso' | 'credentials' | 'mfa'>('sso')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mfaCode: ''
  })

  const handleSSOLogin = (provider: string) => {
    // Redirect to SSO provider
    window.location.href = `/api/auth/signin/${provider}`
  }

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implement credential login logic
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Security Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-enterprise-blue to-enterprise-purple rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">ElderonAI Gateway</h2>
              <p className="text-sm text-gray-600">Enterprise Secure Access</p>
            </div>
          </div>
          
          {/* Security Badges */}
          <div className="flex justify-center space-x-4 mb-6">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Lock className="w-3 h-3" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Shield className="w-3 h-3" />
              <span>GDPR Ready</span>
            </div>
          </div>
        </div>

        {/* Login Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('sso')}
              className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'sso'
                  ? 'border-enterprise-blue text-enterprise-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Enterprise SSO
            </button>
            <button
              onClick={() => setActiveTab('credentials')}
              className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'credentials'
                  ? 'border-enterprise-blue text-enterprise-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Credentials
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'sso' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Select your identity provider
                </h3>
                
                {ssoProviders.map((provider) => (
                  <motion.button
                    key={provider.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSSOLogin(provider.id)}
                    className="w-full flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${provider.color} flex items-center justify-center`}>
                      <provider.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-enterprise-blue transition-colors">
                        {provider.name}
                      </div>
                      <div className="text-sm text-gray-600">{provider.description}</div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {activeTab === 'credentials' && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleCredentialLogin}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-enterprise-blue focus:border-transparent"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-enterprise-blue focus:border-transparent pr-10"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-enterprise-blue text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign In
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-enterprise-blue hover:text-blue-700"
                  >
                    Forgot your password?
                  </button>
                </div>
              </motion.form>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center text-xs text-gray-500">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
          <p className="mt-1">All access is logged for security purposes.</p>
        </div>
      </div>
    </div>
  )
}
```

### **8. API Route Handlers**
```typescript
// apps/gateway/src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authProviders } from '@/lib/auth/providers'
import { authOptions } from '@/lib/auth/session'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```
### **API Continues**
```typescript
// apps/gateway/src/lib/auth/session.ts
import type { NextAuthOptions } from 'next-auth'
import { authProviders } from './providers'

export const authOptions: NextAuthOptions = {
  providers: Object.values(authProviders),
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours
  },
  jwt: {
    maxAge: 8 * 60 * 60, // 8 hours
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Add custom JWT properties
      if (user) {
        token.role = user.role
        token.organization = user.organization
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Add custom session properties
      session.user.role = token.role
      session.user.organization = token.organization
      session.accessToken = token.accessToken
      return session
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects after authentication
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  events: {
    async signIn(message) {
      // Log successful sign-ins
      console.log('User signed in:', message.user.email)
    },
    async signOut(message) {
      // Log sign-outs
      console.log('User signed out')
    },
  },
}
```

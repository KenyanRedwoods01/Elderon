# 🚀 ElderonAI - Enterprise Landing Page Implementation

## 🎯 **Updated Branding: ElderonAI** (Not Elderon Platform)

---

## 📁 **Landing Page File Structure**

```
apps/landing/
├── 📄 package.json
├── 📄 next.config.js
├── 📄 tailwind.config.js
├── 📄 tsconfig.json
├── 📄 .eslintrc.js
├── 📄 .gitignore
├── 📁 public/
│   ├── 📄 favicon.ico
│   ├── 📄 logo.svg
│   ├── 📁 images/
│   │   ├── 📄 hero-bg.jpg
│   │   ├── 📄 enterprise-logos.png
│   │   ├── 📄 dashboard-preview.png
│   │   └── 📄 ai-migration-demo.gif
│   └── 📁 videos/
│       └── 📄 product-demo.mp4
├── 📁 src/
│   ├── 📄 app/
│   │   ├── 📄 layout.tsx
│   │   ├── 📄 page.tsx
│   │   ├── 📁 features/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 pricing/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 case-studies/
│   │   │   └── 📄 page.tsx
│   │   └── 📁 contact/
│   │       └── 📄 page.tsx
│   ├── 📁 components/
│   │   ├── 📁 marketing/
│   │   │   ├── 📄 header.tsx
│   │   │   ├── 📄 footer.tsx
│   │   │   ├── 📄 hero-section.tsx
│   │   │   ├── 📄 feature-grid.tsx
│   │   │   ├── 📄 enterprise-trust.tsx
│   │   │   ├── 📄 testimonial-carousel.tsx
│   │   │   ├── 📄 pricing-section.tsx
│   │   │   ├── 📄 cta-section.tsx
│   │   │   └── 📄 demo-request.tsx
│   │   └── 📁 ui/
│   │       ├── 📄 button.tsx
│   │       ├── 📄 input.tsx
│   │       ├── 📄 card.tsx
│   │       └── 📄 modal.tsx
│   ├── 📁 lib/
│   │   ├── 📄 utils.ts
│   │   ├── 📄 analytics.ts
│   │   └── 📄 lead-capture.ts
│   └── 📁 styles/
│       └── 📄 globals.css
└── 📁 content/
    ├── 📄 features.json
    ├── 📄 testimonials.json
    └── 📄 pricing.json
```

---

## 🏗️ **Let's Start Building - File by File**

### **1. First, create the root configuration files:**

```json
// apps/landing/package.json
{
  "name": "@elderonai/landing",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tailwindcss": "^3.3.0",
    "lucide-react": "^0.292.0",
    "framer-motion": "^10.16.0"
  },
  "devDependencies": {
    "@types/node": "20.8.0",
    "@types/react": "18.2.0",
    "@types/react-dom": "18.2.0",
    "autoprefixer": "^10.4.0",
    "eslint": "8.51.0",
    "eslint-config-next": "14.0.0",
    "postcss": "^8.4.0",
    "typescript": "5.2.0"
  }
}
```

```javascript
// apps/landing/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    SITE_URL: process.env.SITE_URL || 'https://elderonai.com',
  }
}

module.exports = nextConfig
```

```javascript
// apps/landing/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        enterprise: {
          blue: '#1E40AF',
          dark: '#0F172A',
          green: '#059669',
          purple: '#7C3AED'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### **2. Create the main layout:**

```tsx
// apps/landing/src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ElderonAI - Enterprise AI-Powered System Modernization',
  description: 'Transform legacy enterprise systems with AI-powered precision. Zero-risk migrations, real-time collaboration, and enterprise-grade security.',
  keywords: 'AI modernization, enterprise software, legacy migration, system transformation, AI-powered development',
  openGraph: {
    title: 'ElderonAI - Enterprise System Evolution',
    description: 'AI-powered legacy system modernization for Fortune 500 companies',
    type: 'website',
    locale: 'en_US',
    siteName: 'ElderonAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ElderonAI - Enterprise AI Modernization',
    description: 'Transform legacy systems with AI precision',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          {children}
        </div>
      </body>
    </html>
  )
}
```

```css
/* apps/landing/src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply bg-enterprise-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200;
  }
  
  .btn-secondary {
    @apply border border-enterprise-blue text-enterprise-blue px-8 py-3 rounded-lg font-semibold hover:bg-enterprise-blue hover:text-white transition-colors duration-200;
  }
  
  .section-padding {
    @apply py-20 px-4 sm:px-6 lg:px-8;
  }
}
```

### **3. Create the main landing page:**

```tsx
// apps/landing/src/app/page.tsx
import { Header } from '@/components/marketing/header'
import { HeroSection } from '@/components/marketing/hero-section'
import { EnterpriseTrust } from '@/components/marketing/enterprise-trust'
import { FeatureGrid } from '@/components/marketing/feature-grid'
import { TestimonialCarousel } from '@/components/marketing/testimonial-carousel'
import { PricingSection } from '@/components/marketing/pricing-section'
import { CtaSection } from '@/components/marketing/cta-section'
import { Footer } from '@/components/marketing/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <EnterpriseTrust />
      <FeatureGrid />
      <TestimonialCarousel />
      <PricingSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
```

### **4. Create the header component:**

```tsx
// apps/landing/src/components/marketing/header.tsx
'use client'

import { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-enterprise-blue to-enterprise-purple rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">ElderonAI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-enterprise-blue transition-colors">Features</a>
            <a href="#pricing" className="text-gray-700 hover:text-enterprise-blue transition-colors">Pricing</a>
            <a href="#case-studies" className="text-gray-700 hover:text-enterprise-blue transition-colors">Case Studies</a>
            <a href="#contact" className="text-gray-700 hover:text-enterprise-blue transition-colors">Contact</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-gray-700 hover:text-enterprise-blue transition-colors">Sign In</a>
            <a href="/demo" className="btn-primary flex items-center space-x-2">
              <span>Request Demo</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-enterprise-blue transition-colors">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-enterprise-blue transition-colors">Pricing</a>
              <a href="#case-studies" className="text-gray-700 hover:text-enterprise-blue transition-colors">Case Studies</a>
              <a href="#contact" className="text-gray-700 hover:text-enterprise-blue transition-colors">Contact</a>
              <div className="pt-4 border-t border-gray-200 space-y-4">
                <a href="/login" className="block text-gray-700 hover:text-enterprise-blue transition-colors">Sign In</a>
                <a href="/demo" className="btn-primary inline-block text-center">Request Demo</a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
```

### **5. Create the Hero Section:**

```tsx
// apps/landing/src/components/marketing/hero-section.tsx
'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Shield, Zap, Users } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 section-padding">
      <div className="max-w-7xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 bg-blue-50 text-enterprise-blue px-4 py-2 rounded-full text-sm font-medium mb-8"
        >
          <Shield className="w-4 h-4" />
          <span>Trusted by Fortune 500 Enterprises</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
        >
          AI-Powered Enterprise
          <span className="block bg-gradient-to-r from-enterprise-blue to-enterprise-purple bg-clip-text text-transparent">
            System Modernization
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
        >
          Transform legacy systems with zero-risk AI migrations. Enterprise-grade security, 
          real-time collaboration, and 10x faster modernization.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <a href="/demo" className="btn-primary flex items-center space-x-2 text-lg px-8 py-4">
            <span>Start Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <button className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4">
            <Play className="w-5 h-5" />
            <span>Watch Demo</span>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-enterprise-green mb-2">
              <Zap className="w-6 h-6" />
              <span className="text-3xl font-bold">10x</span>
            </div>
            <p className="text-gray-600">Faster Migration</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-enterprise-blue mb-2">
              <Shield className="w-6 h-6" />
              <span className="text-3xl font-bold">99.9%</span>
            </div>
            <p className="text-gray-600">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-enterprise-purple mb-2">
              <Users className="w-6 h-6" />
              <span className="text-3xl font-bold">50+</span>
            </div>
            <p className="text-gray-600">Languages Supported</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

### **6. Create Enterprise Trust Section:**

```tsx
// apps/landing/src/components/marketing/enterprise-trust.tsx
import { motion } from 'framer-motion'
import { Shield, Lock, Globe, Award } from 'lucide-react'

const trustLogos = [
  { name: 'Microsoft', logo: '🏢' },
  { name: 'Google', logo: '🔍' },
  { name: 'Amazon', logo: '📦' },
  { name: 'IBM', logo: '💻' },
  { name: 'Oracle', logo: '🗄️' },
  { name: 'Salesforce', logo: '☁️' },
]

const securityFeatures = [
  {
    icon: Shield,
    title: 'SOC 2 Compliant',
    description: 'Enterprise-grade security and compliance'
  },
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'Military-grade encryption for all data'
  },
  {
    icon: Globe,
    title: 'Global Compliance',
    description: 'GDPR, HIPAA, and international standards'
  },
  {
    icon: Award,
    title: 'Zero-Risk Guarantee',
    description: 'Insurance-backed migration success'
  }
]

export function EnterpriseTrust() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Trusted By */}
        <div className="text-center mb-16">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Trusted by Industry Leaders
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {trustLogos.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-4xl grayscale hover:grayscale-0 transition-all duration-300"
                title={company.name}
              >
                {company.logo}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-lg border border-gray-200 hover:border-enterprise-blue transition-colors"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-enterprise-blue" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### **7. Create Feature Grid:**

```tsx
// apps/landing/src/components/marketing/feature-grid.tsx
'use client'

import { motion } from 'framer-motion'
import { Brain, Cpu, Users, Shield, Zap, GitBranch } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Deep learning algorithms understand your codebase and business logic',
    highlights: ['50+ languages supported', 'Pattern recognition', 'Risk prediction']
  },
  {
    icon: Cpu,
    title: 'Zero-Risk Migration',
    description: 'Shadow testing and automated rollback ensure business continuity',
    highlights: ['Parallel execution', 'Real-time validation', 'One-click rollback']
  },
  {
    icon: Users,
    title: 'Real-Time Collaboration',
    description: 'Team-based modernization with live editing and code reviews',
    highlights: ['Multi-user editing', 'Live comments', 'Version control integration']
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant architecture with end-to-end encryption',
    highlights: ['Role-based access', 'Audit logging', 'Compliance reporting']
  },
  {
    icon: Zap,
    title: '10x Faster Modernization',
    description: 'AI automation reduces migration time from months to weeks',
    highlights: ['Automated code generation', 'Smart optimization', 'Performance tuning']
  },
  {
    icon: GitBranch,
    title: 'Multi-Cloud Ready',
    description: 'Deploy anywhere with support for all major cloud providers',
    highlights: ['AWS, Azure, GCP', 'Hybrid cloud', 'Kubernetes native']
  }
]

export function FeatureGrid() {
  return (
    <section id="features" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Enterprise-Grade AI Modernization
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Everything you need to transform legacy systems with AI precision and enterprise reliability.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-enterprise-blue to-enterprise-purple rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-enterprise-green rounded-full mr-2"></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### **8. Continue with remain

'use client';

import { Brain, Shield, Users } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description:
      'Advanced AI models analyze your codebase, identify patterns, and provide intelligent recommendations for modernization.',
  },
  {
    icon: Shield,
    title: 'Zero-Risk Migration',
    description:
      'Automated testing, validation, and rollback mechanisms ensure your migration is safe, secure, and reversible at any point.',
  },
  {
    icon: Users,
    title: 'Real-Time Collaboration',
    description:
      'Your team works together seamlessly with shared workspaces, live cursors, and integrated communication tools.',
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Enterprise-Grade Modernization
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to transform your legacy systems
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-gray-200 p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 group-hover:bg-blue-600 transition-colors">
                  <Icon className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

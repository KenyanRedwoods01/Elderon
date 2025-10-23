'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Zap, 
  Brain, 
  Globe, 
  Users, 
  BarChart3,
  Play,
  Star,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Brain,
      title: 'Quantum AI Intelligence',
      description: '1000x faster code analysis with quantum neural networks',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Quantum encryption and zero-trust architecture',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Instant analysis and autonomous migration planning',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Globe,
      title: 'Universal Support',
      description: 'Support for all legacy and modern technologies',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const stats = [
    { number: '1000x', label: 'Faster Analysis' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '500+', label: 'Enterprise Clients' },
    { number: '24/7', label: 'AI Support' }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO, Fortune 500',
      content: 'Elderon transformed our legacy systems in record time. The AI precision is unmatched.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'VP Engineering, Tech Corp',
      content: 'Zero-downtime migrations that would have taken years, completed in weeks.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Director, Global Systems',
      content: 'The quantum AI capabilities are revolutionary. Our ROI exceeded 500% in 6 months.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-enterprise-blue to-enterprise-purple bg-clip-text text-transparent">
                  ElderonAI
                </h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-700 hover:text-enterprise-blue transition-colors">Features</a>
                <a href="#solutions" className="text-gray-700 hover:text-enterprise-blue transition-colors">Solutions</a>
                <a href="#pricing" className="text-gray-700 hover:text-enterprise-blue transition-colors">Pricing</a>
                <a href="#contact" className="text-gray-700 hover:text-enterprise-blue transition-colors">Contact</a>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <button className="btn-secondary">Sign In</button>
                <button className="btn-primary">Get Started</button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-enterprise-blue"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-enterprise-blue">Features</a>
                <a href="#solutions" className="block px-3 py-2 text-gray-700 hover:text-enterprise-blue">Solutions</a>
                <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-enterprise-blue">Pricing</a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-enterprise-blue">Contact</a>
                <div className="pt-4 space-y-2">
                  <button className="w-full btn-secondary">Sign In</button>
                  <button className="w-full btn-primary">Get Started</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Quantum AI-Powered
                <span className="block bg-gradient-to-r from-enterprise-blue to-enterprise-purple bg-clip-text text-transparent">
                  Enterprise Evolution
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Transform legacy enterprise systems with AI-powered precision. 
                Zero-risk migrations, real-time collaboration, and enterprise-grade security.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <button className="btn-primary text-lg px-8 py-4 flex items-center">
                Start Free Trial
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button className="btn-secondary text-lg px-8 py-4 flex items-center">
                <Play className="mr-2" size={20} />
                Watch Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-enterprise-blue mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Revolutionary Features 2025
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by quantum AI and cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setActiveFeature(index)}
              >
                <div className={`p-8 rounded-2xl bg-gradient-to-br ${feature.color} text-white transform transition-all duration-300 group-hover:scale-105 ${
                  activeFeature === index ? 'ring-4 ring-white/50' : ''
                }`}>
                  <feature.icon size={48} className="mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-white/90">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Enterprise Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored solutions for every enterprise need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Fortune 500 Ready</h3>
              <p className="text-gray-600 mb-6">
                Enterprise-grade security and compliance for the world's largest organizations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  SOC 2 Type II Certified
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  GDPR Compliant
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Zero-Trust Architecture
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Real-time Analytics</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive monitoring and analytics for all your migration processes.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Live Progress Tracking
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Predictive Analytics
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Custom Dashboards
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Zero-Downtime Migration</h3>
              <p className="text-gray-600 mb-6">
                Seamless migrations without interrupting your business operations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Blue-Green Deployments
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Instant Rollback
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Real-time Monitoring
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              See what our clients say about ElderonAI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-enterprise-blue to-enterprise-purple">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Enterprise?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join 500+ enterprises already using ElderonAI for their digital transformation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-enterprise-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-enterprise-blue transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">ElderonAI</h3>
              <p className="text-gray-400 mb-4">
                Quantum AI-powered enterprise transformation platform.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ElderonAI. All rights reserved. Built by RedwoodsKenyan.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
'use client'

import React from 'react'
import Link from 'next/link'
import ParticleBackground from '@/components/ParticleBackground'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      {/* Glassmorphism Navigation Header */}
      <nav className="nav-glass relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {/* Enhanced Logo with Glow */}
              <div className="w-10 h-10 logo-glow rounded-lg flex items-center justify-center float">
                <span className="text-white font-bold text-lg">🎵</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-white">
                  Vocal Boost
                </h1>
                <div className="waveform">
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                </div>
              </div>
            </div>
            <div className="space-x-3">
              <Link 
                href="/login" 
                className="text-white/80 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-300 glow-hover rounded-lg"
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="btn-glass ripple"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Glass Effects */}
      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          {/* Enhanced Main Logo/Brand */}
          <div className="mb-8">
            <div className="w-24 h-24 logo-glow rounded-3xl flex items-center justify-center mx-auto mb-6 float">
              <span className="text-white font-bold text-4xl">🎵</span>
            </div>
            <h1 className="text-6xl font-light text-white mb-4 parallax">
              Vocal Boost
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-8">
              <p className="text-xl text-white/90 font-medium">
                with Shantal&apos;s Vocal Class
              </p>
              <div className="waveform ml-4">
                <div className="waveform-bar"></div>
                <div className="waveform-bar"></div>
                <div className="waveform-bar"></div>
                <div className="waveform-bar"></div>
                <div className="waveform-bar"></div>
              </div>
            </div>
          </div>
          
          <div className="glass-card max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-light text-white mb-6">
              Master your voice
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Professional vocal training with interactive lessons, real-time feedback, and peer collaboration
            </p>
            <Link 
              href="/signup" 
              className="btn-glass ripple inline-block text-lg px-12 py-4"
            >
              🎤 Get started
            </Link>
          </div>
        </div>

        {/* Enhanced Features Grid with Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 relative z-10">
          <div className="feature-card glow-hover ripple">
            <div className="feature-icon float">
              <span className="text-white text-2xl">🎤</span>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">Audio Recording</h3>
            <p className="text-white/70 leading-relaxed">
              Professional-grade recording tools with waveform visualization and real-time analysis
            </p>
          </div>

          <div className="feature-card glow-hover ripple">
            <div className="feature-icon float" style={{ animationDelay: '0.5s' }}>
              <span className="text-white text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">Interactive Lessons</h3>
            <p className="text-white/70 leading-relaxed">
              Video tutorials and structured exercises to guide your vocal journey
            </p>
          </div>

          <div className="feature-card glow-hover ripple">
            <div className="feature-icon float" style={{ animationDelay: '1s' }}>
              <span className="text-white text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">Community</h3>
            <p className="text-white/70 leading-relaxed">
              Share your progress and get feedback from fellow vocalists worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Glass Footer */}
      <footer className="nav-glass mt-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center text-white/60 text-sm">
            © 2024 Vocal Boost. All rights reserved. Made with 🎵 by Shantal&apos;s Vocal Class
          </div>
        </div>
      </footer>
    </main>
  )
} 
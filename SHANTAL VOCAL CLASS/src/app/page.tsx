'use client'

import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Clean Navigation Header */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              VocalTraining
            </h1>
            <div className="space-x-3">
              <Link 
                href="/login" 
                className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors"
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-gray-900 mb-6">
            Master your voice
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Professional vocal training with interactive lessons, real-time feedback, and peer collaboration
          </p>
          <Link 
            href="/signup" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-base font-medium transition-colors inline-block"
          >
            Get started
          </Link>
        </div>

        {/* Clean Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-xl">🎤</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Audio Recording</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Professional-grade recording tools with waveform visualization
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-xl">📚</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Lessons</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Video tutorials and structured exercises to guide your progress
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-xl">👥</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Peer Reviews</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Get feedback from fellow students and collaborate on your journey
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center text-gray-500 text-sm">
            © 2024 VocalTraining. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
} 
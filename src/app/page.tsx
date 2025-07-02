'use client'

import React from 'react'
import Link from 'next/link'
import HashtagBackground from '../components/HashtagBackground'

export default function Home() {
  return (
    <main className="h-screen bg-white relative overflow-hidden flex flex-col">
      {/* Animated Hashtag Background */}
      <HashtagBackground />
      
      {/* Video Background */}
      <div className="fixed inset-0 z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/home_page_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col h-full">
        {/* Clean Navigation Header */}
        <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm flex-shrink-0">
          <div className="max-w-6xl mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {/* Logo */}
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🎵</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Vocal Boost
                </h1>
              </div>
              <div className="space-x-3">
                <Link 
                  href="/login" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-1.5 text-sm font-medium transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto px-6 text-center">
            {/* Main Logo/Brand */}
            <div className="mb-4">
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-1">
                Vocal Boost
              </h1>
              <p className="text-lg md:text-xl text-purple-600 font-medium mb-3">
                Shantal Lindsay Presents
              </p>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">
              Master your voice
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              Professional vocal training with interactive lessons, real-time feedback, and peer collaboration
            </p>
            <Link 
              href="/signup" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-base font-medium transition-colors inline-block mb-8"
            >
              Get started
            </Link>

            {/* Features Grid - Integrated into hero */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 text-sm md:text-lg">🎤</span>
                </div>
                <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1">Audio Recording</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Professional-grade recording tools
                </p>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 text-sm md:text-lg">📚</span>
                </div>
                <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1">Interactive Lessons</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Video tutorials and structured exercises
                </p>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 text-sm md:text-lg">👥</span>
                </div>
                <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1">Community</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Share progress and get feedback
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="flex-shrink-0 bg-white/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-2">
            <div className="text-center text-gray-500 text-xs">
              © 2024 Vocal Boost. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
} 
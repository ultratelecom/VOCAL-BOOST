'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import { mockCurrentUser } from '../../lib/mockUser'
import { getAllModules } from '../../lib/lessonFlow'

export default function DashboardPage() {
  const user = mockCurrentUser
  const modules = getAllModules()
  const firstName = user.name.split(' ')[0]
  
  // State for module accordion and completed assignments
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['1'])) // Module 1 expanded by default
  const [completedAssignments] = useState<Set<string>>(new Set(['1a', '1b'])) // Mock completed assignments
  const [showConfetti, setShowConfetti] = useState<string | null>(null)
  
  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }
  
  const isModuleCompleted = (moduleLesson: any) => {
    return moduleLesson.lessons.every((lesson: any) => 
      lesson.type === 'intro' || completedAssignments.has(lesson.assignmentId)
    )
  }
  
  const celebrateCompletion = (moduleId: string) => {
    setShowConfetti(moduleId)
    setTimeout(() => setShowConfetti(null), 3000)
  }
  
  const getAssignmentStatus = (lesson: any) => {
    if (lesson.type === 'intro') return null
    if (completedAssignments.has(lesson.assignmentId)) {
      return 'COMPLETED'
    }
    return 'PENDING'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="confetti-animation">
            {[...Array(50)].map((_, i) => (
              <div 
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981'][Math.floor(Math.random() * 4)],
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-center h-full">
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-purple-200 text-center animate-bounce">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-purple-600 mb-2">Congratulations!</h3>
              <p className="text-gray-600">
                Amazing progress! Your dedication to improving your vocal skills is truly inspiring. 
                Keep up the fantastic work - every note you practice brings you closer to mastery! 🎵
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎵</span>
              </div>
              <Link href="/" className="text-2xl font-semibold text-gray-900">
                Vocal Boost
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {firstName}</span>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{firstName[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Overview */}
        <div className="mb-12">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Welcome to Shantal&apos;s Vocal Class</h1>
          <p className="text-gray-600 mb-8">Continue building your vocal skills through structured modules</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Completed</h3>
                <span className="text-2xl font-light text-purple-600">{user.progress.lessonsCompleted}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Lessons finished</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Streak</h3>
                <span className="text-2xl font-light text-orange-500">{user.progress.currentStreak}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Days practicing</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Practice Time</h3>
                <span className="text-2xl font-light text-green-500">{user.progress.totalPracticeHours}h</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Total hours</p>
            </div>
          </div>
        </div>

        {/* Course Modules with Accordion */}
        <div className="mb-12">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Course Modules</h2>
          <div className="space-y-4">
            {modules.map((moduleItem) => {
              const isCompleted = isModuleCompleted(moduleItem)
              const isExpanded = expandedModules.has(moduleItem.module)
              
              return (
                <div key={moduleItem.module} className="bg-white border border-gray-200 rounded-lg overflow-hidden relative">
                  {/* Module Header */}
                  <div 
                    className={`p-6 cursor-pointer transition-colors ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}
                    onClick={() => toggleModule(moduleItem.module)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-gray-700">
                          {isExpanded ? '▼' : '▶'}
                        </button>
                        <div>
                          <h3 className={`text-lg font-medium ${isCompleted ? 'text-green-700' : 'text-gray-900'}`}>
                            Module {moduleItem.module}: {moduleItem.title}
                          </h3>
                          <p className="text-sm text-gray-600">{moduleItem.lessons.length} lessons</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {isCompleted ? (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            ✓ COMPLETED
                          </span>
                        ) : (
                          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                            Module {moduleItem.module}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Module Content (Accordion) */}
                  {isExpanded && (
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {moduleItem.lessons.map((lesson) => {
                          const status = getAssignmentStatus(lesson)
                          
                          return (
                            <div key={lesson.id} className="relative">
                              <Link
                                href={`/module/${moduleItem.module}/${lesson.id}`}
                                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    lesson.type === 'intro' 
                                      ? 'bg-blue-100 text-blue-600' 
                                      : 'bg-orange-100 text-orange-600'
                                  }`}>
                                    <span className="text-sm">
                                      {lesson.type === 'intro' ? '📖' : '📝'}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900 text-sm group-hover:text-purple-600 transition-colors">
                                      {lesson.title}
                                    </p>
                                    <p className="text-xs text-gray-500 capitalize">
                                      {lesson.type}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                              
                              {/* Status Tab */}
                              {status && (
                                <div className={`absolute -right-1 top-2 px-2 py-1 text-xs font-bold rounded-l-md ${
                                  status === 'COMPLETED' 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-red-500 text-white animate-pulse'
                                }`}>
                                  {status}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                      
                      {/* Completion Celebration Button */}
                      {isCompleted && (
                        <div className="mt-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              celebrateCompletion(moduleItem.module)
                            }}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            🎉 Celebrate Progress!
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/warmup"
              className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors group"
            >
              <div className="text-2xl mb-3">🎵</div>
              <h3 className="font-medium mb-1">Start Warmup</h3>
              <p className="text-sm text-purple-100">Essential vocal warmup exercises</p>
            </Link>
            
            <Link
              href="/assignment/1a"
              className="bg-white border border-gray-200 p-6 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="text-2xl mb-3">📝</div>
              <h3 className="font-medium mb-1 text-gray-900">Assignments</h3>
              <p className="text-sm text-gray-600">Submit your latest work</p>
            </Link>
            
            <Link
              href="/peer"
              className="bg-white border border-gray-200 p-6 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="text-2xl mb-3">👥</div>
              <h3 className="font-medium mb-1 text-gray-900">Peer Review</h3>
              <p className="text-sm text-gray-600">Give feedback to classmates</p>
            </Link>
            
            <Link
              href="/admin"
              className="bg-white border border-gray-200 p-6 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="text-2xl mb-3">📊</div>
              <h3 className="font-medium mb-1 text-gray-900">Admin</h3>
              <p className="text-sm text-gray-600">View detailed analytics</p>
            </Link>
          </div>
        </div>
      </div>

      {/* CSS for Confetti Animation */}
      <style jsx>{`
        .confetti-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall linear infinite;
        }
        
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
} 
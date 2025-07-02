'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import { mockCurrentUser } from '../../lib/mockUser'
import { getAllModules } from '../../lib/lessonFlow'
import NotificationDropdown from '../../components/Notifications/NotificationDropdown'
import PeerReviewDropdown from '../../components/PeerReview/PeerReviewDropdown'
import ParticleBackground from '../../components/ParticleBackground'

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
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
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

      {/* Enhanced Glass Header */}
      <header className="nav-glass relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 logo-glow rounded-lg flex items-center justify-center float">
                <span className="text-white font-bold text-sm">🎵</span>
              </div>
              <div className="flex flex-col">
                <Link href="/" className="text-2xl font-semibold text-white glow-hover">
                  Vocal Boost
                </Link>
                <div className="waveform" style={{ transform: 'scale(0.7)', transformOrigin: 'left' }}>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/80 glass px-3 py-1 rounded-full">Welcome, {firstName} 👋</span>
              <div className="glow-hover">
                <PeerReviewDropdown completedAssignments={completedAssignments} />
              </div>
              <div className="glow-hover">
                <NotificationDropdown />
              </div>
              <Link href="/profile">
                <div className="w-8 h-8 logo-glow rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110">
                  <span className="text-white text-sm font-medium">{firstName[0]}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        {/* Enhanced Progress Overview */}
        <div className="mb-12">
          <div className="glass-card text-center mb-8">
            <h1 className="text-4xl font-light text-white mb-3">Welcome to Shantal&apos;s Vocal Class</h1>
            <p className="text-white/80 text-lg">Continue building your vocal skills through structured modules</p>
            <div className="waveform mt-4">
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card glow-hover ripple float">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">Completed</h3>
                <span className="text-3xl font-light text-purple-300">{user.progress.lessonsCompleted}</span>
              </div>
              <p className="text-sm text-white/70 mt-1">Lessons finished</p>
              <div className="mt-3 w-full bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div className="glass-card glow-hover ripple float" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">Streak</h3>
                <span className="text-3xl font-light text-orange-300">{user.progress.currentStreak}</span>
              </div>
              <p className="text-sm text-white/70 mt-1">Days practicing</p>
              <div className="mt-3 flex space-x-1">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i < user.progress.currentStreak ? 'bg-orange-400' : 'bg-white/20'}`}></div>
                ))}
              </div>
            </div>
            
            <div className="glass-card glow-hover ripple float" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">Practice Time</h3>
                <span className="text-3xl font-light text-green-300">{user.progress.totalPracticeHours}h</span>
              </div>
              <p className="text-sm text-white/70 mt-1">Total hours</p>
              <div className="mt-3 w-full bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Course Modules with Accordion */}
        <div className="mb-12">
          <div className="glass-card mb-6 text-center">
            <h2 className="text-2xl font-medium text-white mb-2">Course Modules</h2>
            <div className="waveform">
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
            </div>
          </div>
          <div className="space-y-4">
            {modules.map((moduleItem) => {
              const isCompleted = isModuleCompleted(moduleItem)
              const isExpanded = expandedModules.has(moduleItem.module)
              
              return (
                <div key={moduleItem.module} className="glass-card glow-hover overflow-hidden relative">
                  {/* Module Header */}
                  <div 
                    className={`p-6 cursor-pointer transition-all duration-300 ${isCompleted ? 'bg-green-500/20' : ''} hover:bg-white/10`}
                    onClick={() => toggleModule(moduleItem.module)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="text-white/70 hover:text-white transition-colors glow-hover p-2 rounded-lg">
                          {isExpanded ? '▼' : '▶'}
                        </button>
                        <div>
                          <h3 className={`text-lg font-medium ${isCompleted ? 'text-green-300' : 'text-white'}`}>
                            Module {moduleItem.module}: {moduleItem.title}
                          </h3>
                          <p className="text-sm text-white/70">{moduleItem.lessons.length} lessons</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {isCompleted ? (
                          <span className="status-completed">
                            ✓ COMPLETED
                          </span>
                        ) : (
                          <span className="glass px-3 py-1 rounded-full text-sm font-medium text-white">
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
                                className="block p-4 glass rounded-lg hover:bg-white/20 transition-all duration-300 group glow-hover ripple"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center float ${
                                    lesson.type === 'intro' 
                                      ? 'bg-blue-500/80 text-blue-100' 
                                      : 'bg-orange-500/80 text-orange-100'
                                  }`}>
                                    <span className="text-sm">
                                      {lesson.type === 'intro' ? '📖' : '📝'}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium text-white text-sm group-hover:text-purple-300 transition-colors">
                                      {lesson.title}
                                    </p>
                                    <p className="text-xs text-white/70 capitalize">
                                      {lesson.type}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                              
                              {/* Enhanced Status Tab */}
                              {status && (
                                <div className={`absolute -right-1 top-2 px-2 py-1 text-xs font-bold rounded-l-md ${
                                  status === 'COMPLETED' 
                                    ? 'status-completed' 
                                    : 'status-pending'
                                }`}>
                                  {status}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                      
                      {/* Enhanced Completion Celebration Button */}
                      {isCompleted && (
                        <div className="mt-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              celebrateCompletion(moduleItem.module)
                            }}
                            className="btn-glass ripple"
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

        {/* Enhanced Quick Actions */}
        <div className="mb-12">
          <div className="glass-card mb-6 text-center">
            <h2 className="text-2xl font-medium text-white mb-2">Quick Actions</h2>
            <div className="waveform">
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/warmup"
              className="glass-card glow-hover ripple group float"
              style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(236, 72, 153, 0.6))' }}
            >
              <div className="text-3xl mb-3 float">🎵</div>
              <h3 className="font-medium mb-1 text-white">Start Warmup</h3>
              <p className="text-sm text-white/80">Essential vocal warmup exercises</p>
            </Link>
            
            <Link
              href="/assignment/1a"
              className="glass-card glow-hover ripple group float"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="text-3xl mb-3 float">📝</div>
              <h3 className="font-medium mb-1 text-white">Assignments</h3>
              <p className="text-sm text-white/80">Submit your latest work</p>
            </Link>
            
            <Link
              href="/community"
              className="glass-card glow-hover ripple group float"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="text-3xl mb-3 float">💬</div>
              <h3 className="font-medium mb-1 text-white">Community</h3>
              <p className="text-sm text-white/80">Share and get feedback from others</p>
            </Link>
            
            <Link
              href="/admin"
              className="glass-card glow-hover ripple group float"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="text-3xl mb-3 float">📊</div>
              <h3 className="font-medium mb-1 text-white">Admin</h3>
              <p className="text-sm text-white/80">View detailed analytics</p>
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
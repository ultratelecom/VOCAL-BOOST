'use client';

import React from 'react'
import Link from 'next/link'
import { mockCurrentUser } from '../../lib/mockUser'
import { getAllModules } from '../../lib/lessonFlow'

export default function DashboardPage() {
  const user = mockCurrentUser
  const modules = getAllModules()
  const firstName = user.name.split(' ')[0]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-semibold text-gray-900">
              VocalTraining
            </Link>
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
          <h1 className="text-3xl font-light text-gray-900 mb-2">Welcome to Shantal's Vocal Class</h1>
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

        {/* Course Modules */}
        <div className="mb-12">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Course Modules</h2>
          <div className="space-y-8">
            {modules.map((module) => (
              <div key={module.module} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Module {module.module}: {module.title}
                    </h3>
                    <p className="text-sm text-gray-600">{module.lessons.length} lessons</p>
                  </div>
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                    Module {module.module}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {module.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/module/${module.module}/${lesson.id}`}
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
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/module/1/1-intro"
              className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors group"
            >
              <div className="text-2xl mb-3">🎤</div>
              <h3 className="font-medium mb-1">Start Module 1</h3>
              <p className="text-sm text-purple-100">Begin your vocal journey</p>
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
    </div>
  )
} 
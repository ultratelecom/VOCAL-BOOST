'use client'

import React from 'react'
import { mockCourses, getLessonById } from '../../../lib/courseStructure'
import Link from 'next/link'

interface LessonPageProps {
  params: {
    lessonId: string
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  const lesson = getLessonById(params.lessonId)

  if (!lesson) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Lesson not found</h1>
          <p className="text-gray-600 mb-8">The lesson you're looking for doesn't exist.</p>
          <Link 
            href="/dashboard" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="text-2xl font-semibold text-gray-900">
              VocalTraining
            </Link>
            <Link 
              href="/dashboard" 
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Lesson Content */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium">
              {lesson.type.toUpperCase()}
            </span>
            <span className="mx-2">•</span>
            <span>{lesson.duration} minutes</span>
            <span className="mx-2">•</span>
            <span className="capitalize">{lesson.difficulty}</span>
          </div>
          
          <h1 className="text-3xl font-light text-gray-900 mb-4">{lesson.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{lesson.description}</p>
        </div>

        {/* Lesson Content Based on Type */}
        {lesson.type === 'video' && (
          <div className="space-y-8">
            <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">▶</span>
                </div>
                <p className="text-gray-600">Video player would be here</p>
                <p className="text-sm text-gray-500 mt-1">{lesson.content?.videoUrl}</p>
              </div>
            </div>
            
            {lesson.content?.keyPoints && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-4">Key Points</h3>
                <ul className="space-y-2">
                  {lesson.content.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {lesson.type === 'checklist' && lesson.content?.items && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Complete these exercises</h3>
            <div className="space-y-3">
              {lesson.content.items.map((item: any) => (
                <label key={item.id} className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={item.completed}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="ml-3 text-gray-700">{item.text}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {lesson.type === 'form' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Submit your recording</h3>
            <div className="space-y-4">
              <p className="text-gray-600">{lesson.content?.instructions}</p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-xl">🎤</span>
                </div>
                <p className="text-gray-600 mb-4">Record your audio here</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  Start Recording
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Actions */}
        <div className="mt-12 flex justify-between items-center">
          <Link 
            href="/dashboard" 
            className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
          >
            ← Back to lessons
          </Link>
          
          <div className="space-x-3">
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Mark as complete
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              Next lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 
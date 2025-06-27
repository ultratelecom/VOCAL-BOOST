'use client'

import React from 'react'
import Link from 'next/link'
import { getLessonById, getModuleById, getNextLesson } from '../../../../lib/lessonFlow'
import LessonIntro from '../../../../components/LessonPage/LessonIntro'
import LessonAssignment from '../../../../components/LessonPage/LessonAssignment'

interface ModuleLessonPageProps {
  params: {
    moduleId: string
    lessonId: string
  }
}

export default function ModuleLessonPage({ params }: ModuleLessonPageProps) {
  const module = getModuleById(params.moduleId)
  const lesson = getLessonById(params.moduleId, params.lessonId)
  const nextLesson = getNextLesson(params.moduleId, params.lessonId)

  if (!module || !lesson) {
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
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                Back to dashboard
              </Link>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Module & Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
              Module {module.module}
            </span>
          </div>
          
          <h1 className="text-3xl font-light text-gray-900 mb-2">{lesson.title}</h1>
          <p className="text-gray-600">{module.title}</p>
        </div>

        {/* Lesson Content */}
        {lesson.type === 'intro' ? (
          <LessonIntro lesson={lesson} />
        ) : (
          <LessonAssignment lesson={lesson} />
        )}

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
          <Link 
            href="/dashboard" 
            className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
          >
            ← Back to dashboard
          </Link>
          
          {nextLesson && (
            <Link
              href={`/module/${nextLesson.moduleId}/${nextLesson.lessonId}`}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              Next lesson →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
} 
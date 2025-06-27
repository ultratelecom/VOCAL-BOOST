import React from 'react'
import { LessonFlowItem } from '../../lib/lessonFlow'

interface LessonIntroProps {
  lesson: LessonFlowItem
}

export default function LessonIntro({ lesson }: LessonIntroProps) {
  return (
    <div className="space-y-8">
      {/* Video Placeholder */}
      <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">▶</span>
          </div>
          <p className="text-gray-600 mb-2">Introduction Video</p>
          <p className="text-sm text-gray-500">Video content would be here</p>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Lesson Overview</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg">
            {lesson.content}
          </p>
        </div>
      </div>

      {/* Key Points */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span className="text-gray-700">Focus on building your foundation with proper technique</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span className="text-gray-700">Practice consistently to develop muscle memory</span>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span className="text-gray-700">Listen actively to develop your ear and understanding</span>
          </li>
        </ul>
      </div>

      {/* Resources */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-4">Additional Resources</h3>
        <div className="space-y-3">
          <a 
            href="#" 
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">📄</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Lesson Notes</p>
                <p className="text-sm text-gray-600">Downloadable PDF with key concepts</p>
              </div>
            </div>
          </a>
          
          <a 
            href="#" 
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">🎵</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Practice Tracks</p>
                <p className="text-sm text-gray-600">Audio files for warm-ups and exercises</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
} 
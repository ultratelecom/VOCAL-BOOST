import React from 'react'
import Link from 'next/link'
import { LessonFlowItem } from '../../lib/lessonFlow'
import { getAssignmentById } from '../../lib/assignmentsData'

interface LessonAssignmentProps {
  lesson: LessonFlowItem
}

export default function LessonAssignment({ lesson }: LessonAssignmentProps) {
  const assignment = lesson.assignmentId ? getAssignmentById(lesson.assignmentId) : null

  if (!assignment) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Assignment not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Assignment Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-medium text-gray-900">Assignment Details</h2>
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
            Assignment
          </span>
        </div>
        
        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          {assignment.description}
        </p>

        {/* Submission Requirements */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Submission Options</h3>
          <div className="flex flex-wrap gap-2">
            {assignment.uploadType.map(type => (
              <span 
                key={type}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm capitalize font-medium"
              >
                {type === 'audio' ? '🎤 Audio Recording' : 
                 type === 'video' ? '📹 Video Recording' : 
                 '📝 Written Reflection'}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/assignment/${assignment.id}`}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
        >
          Start Assignment
        </Link>
      </div>

      {/* Instructions */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-4">Instructions</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
            <span className="text-gray-700">Review the assignment description carefully</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
            <span className="text-gray-700">Choose your preferred submission method (audio, video, or text)</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
            <span className="text-gray-700">Complete your recording or written response</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
            <span className="text-gray-700">Submit your assignment for instructor review</span>
          </li>
        </ul>
      </div>

      {/* Tips */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-4">Success Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">💡</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Be Authentic</p>
              <p className="text-sm text-gray-600">Let your unique voice and personality shine through</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm">🎯</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Take Your Time</p>
              <p className="text-sm text-gray-600">Quality over speed - focus on doing your best work</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-sm">🔄</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Practice First</p>
              <p className="text-sm text-gray-600">Do a few run-throughs before your final recording</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-sm">❓</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Ask Questions</p>
              <p className="text-sm text-gray-600">Reach out if you need clarification or help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Submissions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-4">Your Progress</h3>
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
          <span className="text-gray-600">Not yet submitted</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Once you submit this assignment, you'll see your submission status here.
        </p>
      </div>
    </div>
  )
} 
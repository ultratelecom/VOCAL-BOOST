'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { getAllModules } from '../../lib/lessonFlow'

interface PeerReviewDropdownProps {
  completedAssignments: Set<string>
}

export default function PeerReviewDropdown({ completedAssignments }: PeerReviewDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const modules = getAllModules()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get all assignments from all modules
  const allAssignments = modules.flatMap(courseModule => 
    courseModule.lessons
      .filter(lesson => lesson.type === 'assignment' && lesson.assignmentId)
      .map(lesson => ({
        ...lesson,
        moduleNumber: courseModule.module,
        moduleTitle: courseModule.title
      }))
  )

  const completedAssignmentsCount = allAssignments.filter(assignment => 
    completedAssignments.has(assignment.assignmentId!)
  ).length

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Peer Review Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <span className="text-sm font-medium">Peer Review</span>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">Review Others&apos; Work</h3>
            <p className="text-sm text-gray-600 mt-1">
              You can review assignments you&apos;ve completed ({completedAssignmentsCount}/{allAssignments.length})
            </p>
          </div>

          {/* Assignments List */}
          <div className="max-h-80 overflow-y-auto">
            {allAssignments.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <div className="text-2xl mb-2">📝</div>
                <p className="text-sm">No assignments available</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {modules.map((courseModule) => {
                  const moduleAssignments = courseModule.lessons.filter(
                    lesson => lesson.type === 'assignment' && lesson.assignmentId
                  )
                  
                  if (moduleAssignments.length === 0) return null

                  return (
                    <div key={courseModule.module} className="p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">
                        Module {courseModule.module}: {courseModule.title}
                      </h4>
                      <div className="space-y-2">
                        {moduleAssignments.map((assignment) => {
                          const isCompleted = completedAssignments.has(assignment.assignmentId!)
                          const canReview = isCompleted

                          return (
                            <div
                              key={assignment.assignmentId}
                              className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                                canReview
                                  ? 'border-green-200 bg-green-50 hover:bg-green-100'
                                  : 'border-gray-200 bg-gray-50 opacity-60'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  canReview 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-300 text-gray-500'
                                }`}>
                                  {canReview ? '✓' : '📝'}
                                </div>
                                <div>
                                  <p className={`text-sm font-medium ${
                                    canReview ? 'text-gray-900' : 'text-gray-500'
                                  }`}>
                                    {assignment.title}
                                  </p>
                                  <p className={`text-xs ${
                                    canReview ? 'text-gray-600' : 'text-gray-400'
                                  }`}>
                                    {canReview ? 'Available for review' : 'Complete to unlock'}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                {canReview ? (
                                  <Link
                                    href={`/peer-review/${assignment.assignmentId}`}
                                    onClick={() => setIsOpen(false)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1"
                                  >
                                    <span>✓</span>
                                    <span>Review</span>
                                  </Link>
                                ) : (
                                  <span className="bg-gray-200 text-gray-500 px-3 py-1.5 rounded-lg text-xs font-medium opacity-60">
                                    Locked
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-600">
                Complete assignments to unlock peer review
              </div>
              <Link
                href="/community"
                className="text-sm text-purple-600 hover:text-purple-700 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Visit Community →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
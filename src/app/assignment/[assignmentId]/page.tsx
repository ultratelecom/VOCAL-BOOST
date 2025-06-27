'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { assignments, getAssignmentById } from '../../../lib/assignmentsData'
import AssignmentUpload from '../../../components/Assignment/AssignmentUpload'
import NotificationDropdown from '../../../components/Notifications/NotificationDropdown'
import PeerReviewDropdown from '../../../components/PeerReview/PeerReviewDropdown'

export default function AssignmentPage() {
  const params = useParams()
  const assignmentId = params.assignmentId as string
  const assignment = getAssignmentById(assignmentId)
  const [completedAssignments] = useState<Set<string>>(new Set(['1a', '1b'])) // Mock completed assignments

  if (!assignment) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Assignment not found</h1>
          <p className="text-gray-600 mb-8">The assignment you&apos;re looking for doesn&apos;t exist.</p>
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
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎵</span>
              </div>
              <Link href="/dashboard" className="text-2xl font-semibold text-gray-900">
                Vocal Boost
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                Back to dashboard
              </Link>
              <PeerReviewDropdown completedAssignments={completedAssignments} />
              <NotificationDropdown />
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Assignment Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
              Module {assignment.module}
            </span>
          </div>
          
          <h1 className="text-3xl font-light text-gray-900 mb-4">{assignment.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{assignment.description}</p>
        </div>

        {/* Vocal Warmup Section */}
        <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">🎵</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-2">Prepare Your Voice First</h3>
              <p className="text-gray-600 text-sm mb-4">
                For optimal performance, warm up your voice before starting this assignment. 
                A proper warmup helps prevent vocal strain and improves your recording quality.
              </p>
              <div className="flex space-x-3">
                <Link
                  href="/warmup"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2"
                >
                  <span>🎵</span>
                  <span>Start Vocal Warmup</span>
                </Link>
                <button className="border border-purple-300 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                  Already warmed up
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Types */}
        <div className="mb-8">
          <h3 className="font-medium text-gray-900 mb-3">Submission Requirements</h3>
          <div className="flex space-x-2">
            {assignment.uploadType.map(type => (
              <span 
                key={type}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm capitalize"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Assignment Upload Component */}
        <AssignmentUpload assignment={assignment} />
      </div>
    </div>
  )
} 
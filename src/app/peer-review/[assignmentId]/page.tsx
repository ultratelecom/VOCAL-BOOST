'use client'

import React from 'react'
import Link from 'next/link'
import { getPeerSubmissions } from '../../../lib/mockPeerReviewData'
import { getAssignmentById } from '../../../lib/assignmentsData'
import PeerReviewGrid from '../../../components/PeerGrid/PeerReviewGrid'

interface PeerReviewPageProps {
  params: {
    assignmentId: string
  }
}

export default function PeerReviewPage({ params }: PeerReviewPageProps) {
  const assignmentId = params.assignmentId
  const assignment = getAssignmentById(assignmentId)
  const peerSubmissions = getPeerSubmissions(assignmentId)

  if (!assignment) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Assignment not found</h1>
          <p className="text-gray-600 mb-8">The assignment you're looking for doesn't exist.</p>
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

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link 
              href={`/assignment/${assignmentId}`}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors mr-4"
            >
              ← Back to assignment
            </Link>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
              Assignment {assignmentId.toUpperCase()}
            </span>
          </div>
          
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Peer Submissions: {assignment.title}
          </h1>
          <p className="text-gray-600 max-w-2xl">
            See what your classmates created for this assignment. Leave thoughtful feedback to help everyone grow as vocalists.
          </p>
        </div>

        {/* Assignment Description Reminder */}
        <div className="bg-purple-50 rounded-lg p-6 mb-8">
          <h2 className="font-medium text-purple-900 mb-2">Assignment Brief</h2>
          <p className="text-purple-700 text-sm leading-relaxed">
            {assignment.description}
          </p>
        </div>

        {/* Peer Submissions Grid */}
        <PeerReviewGrid 
          submissions={peerSubmissions} 
          assignmentId={assignmentId}
        />

        {/* Navigation Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
          <Link 
            href="/dashboard" 
            className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
          >
            ← Back to dashboard
          </Link>
          
          <div className="flex space-x-4">
            <Link
              href={`/assignment/${assignmentId}`}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              View assignment
            </Link>
            
            <Link
              href="/peer"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              All peer reviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 
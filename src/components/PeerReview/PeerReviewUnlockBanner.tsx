import React from 'react'
import Link from 'next/link'

export default function PeerReviewUnlockBanner() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-purple-600 text-2xl">🔒</span>
      </div>
      
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        Unlock Peer Review
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
        Complete 3 more lessons to unlock peer review. This feature allows you to review 
        other students' work and receive feedback on your own submissions.
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
          <span>Give feedback to fellow students</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
          <span>Receive detailed peer reviews</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
          <span>Improve faster through collaboration</span>
        </div>
      </div>
      
      <div className="mt-8">
        <Link 
          href="/dashboard" 
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors inline-block"
        >
          Continue Lessons
        </Link>
      </div>
    </div>
  )
} 
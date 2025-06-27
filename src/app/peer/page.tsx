'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import PeerReviewUnlockBanner from '../../components/PeerReview/PeerReviewUnlockBanner'
import PeerSubmissionList from '../../components/PeerReview/PeerSubmissionList'

export default function PeerPage() {
  const [hasUnlockedPeerReview] = useState(true) // Mock: user has completed enough lessons

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
                Dashboard
              </Link>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Peer Review</h1>
          <p className="text-gray-600">
            Review fellow students' submissions and get feedback on your own work
          </p>
        </div>

        {/* Content */}
        {!hasUnlockedPeerReview ? (
          <PeerReviewUnlockBanner />
        ) : (
          <PeerSubmissionList />
        )}
      </div>
    </div>
  )
} 
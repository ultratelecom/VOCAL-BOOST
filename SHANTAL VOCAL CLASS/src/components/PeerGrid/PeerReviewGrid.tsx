import React from 'react'
import { PeerSubmission } from '../../lib/mockPeerReviewData'
import PeerReviewCard from './PeerReviewCard'

interface PeerReviewGridProps {
  submissions: PeerSubmission[]
  assignmentId: string
}

export default function PeerReviewGrid({ submissions, assignmentId }: PeerReviewGridProps) {
  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-400 text-2xl">👥</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Be the first to submit your assignment! Once you submit, you'll be able to see and comment on your classmates' work.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium text-gray-900">Class Submissions</h2>
            <p className="text-gray-600">{submissions.length} students have shared their work</p>
          </div>
          <div className="flex space-x-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-medium text-purple-600">
                {submissions.reduce((acc, sub) => acc + sub.likes, 0)}
              </div>
              <div className="text-gray-500">Total likes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium text-blue-600">
                {submissions.reduce((acc, sub) => acc + sub.comments.length, 0)}
              </div>
              <div className="text-gray-500">Comments</div>
            </div>
          </div>
        </div>
      </div>

      {/* Submissions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {submissions.map((submission) => (
          <PeerReviewCard 
            key={submission.id} 
            submission={submission} 
            assignmentId={assignmentId}
          />
        ))}
      </div>

      {/* Encouragement Footer */}
      <div className="bg-purple-50 rounded-lg p-6 text-center">
        <h3 className="font-medium text-purple-900 mb-2">Keep the momentum going! 🎵</h3>
        <p className="text-purple-700 text-sm">
          Remember to leave thoughtful, constructive feedback for your classmates. 
          Your support helps everyone grow as vocalists.
        </p>
      </div>
    </div>
  )
} 
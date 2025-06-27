import React, { useState } from 'react'
import { PeerSubmission } from '../../lib/mockPeerReviewData'
import PeerCommentBox from './PeerCommentBox'

interface PeerReviewCardProps {
  submission: PeerSubmission
  assignmentId: string
}

export default function PeerReviewCard({ submission, assignmentId }: PeerReviewCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [localLikes, setLocalLikes] = useState(submission.likes)

  const handleLike = () => {
    if (!isLiked) {
      setLocalLikes(prev => prev + 1)
      setIsLiked(true)
      // Here you would call the API to like the submission
    }
  }

  const getSubmissionTypeIcon = () => {
    switch (submission.submissionType) {
      case 'audio': return '🎤'
      case 'video': return '📹'
      case 'text': return '📝'
      default: return '📄'
    }
  }

  const getSubmissionTypeColor = () => {
    switch (submission.submissionType) {
      case 'audio': return 'bg-purple-100 text-purple-600'
      case 'video': return 'bg-red-100 text-red-600'
      case 'text': return 'bg-blue-100 text-blue-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-lg">
                {submission.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{submission.name}</h3>
              <p className="text-sm text-gray-500">{submission.timestamp}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubmissionTypeColor()}`}>
            {getSubmissionTypeIcon()} {submission.submissionType}
          </span>
        </div>

        {/* Content */}
        {submission.text && (
          <div className="mb-4">
            <p className="text-gray-700 leading-relaxed">{submission.text}</p>
          </div>
        )}

        {/* Media Player */}
        {submission.submissionType === 'audio' && submission.audioUrl && (
          <div className="mb-4 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <button className="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors">
                <span className="text-white text-lg">▶</span>
              </button>
              <div className="flex-1">
                <div className="w-full bg-purple-200 rounded-full h-2 mb-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0:00</span>
                  <span>2:34</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {submission.submissionType === 'video' && submission.videoUrl && (
          <div className="mb-4 bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
            <button className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors">
              <span className="text-white text-2xl">▶</span>
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isLiked 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{isLiked ? '❤️' : '🤍'}</span>
              <span>{localLikes}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <span>💬</span>
              <span>{submission.comments.length}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100">
          <div className="p-6 space-y-4">
            {/* Existing Comments */}
            {submission.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-600 text-xs font-medium">
                    {comment.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.comment}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Comment Input */}
            <PeerCommentBox 
              submissionId={submission.id} 
              assignmentId={assignmentId}
              onCommentAdded={() => {
                // Refresh comments or update state
                console.log('Comment added!')
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
} 
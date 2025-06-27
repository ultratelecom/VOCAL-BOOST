import React, { useState } from 'react'
import { mockAdminFeedback, AdminFeedback, getPendingFeedback } from '../../lib/mockAdminFeedback'
import AdminVoiceReplyBox from './AdminVoiceReplyBox'

export default function UserSubmissionsPanel() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed'>('pending')
  const [selectedSubmission, setSelectedSubmission] = useState<AdminFeedback | null>(null)
  
  const filteredSubmissions = mockAdminFeedback.filter(submission => {
    if (filter === 'pending') return submission.status === 'pending'
    if (filter === 'reviewed') return submission.status !== 'pending'
    return true
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'reviewed':
        return 'bg-blue-100 text-blue-700'
      case 'published':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          {[
            { value: 'pending', label: 'Pending Review', count: getPendingFeedback().length },
            { value: 'reviewed', label: 'Reviewed', count: mockAdminFeedback.filter(f => f.status !== 'pending').length },
            { value: 'all', label: 'All Submissions', count: mockAdminFeedback.length }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === option.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label} ({option.count})
            </button>
          ))}
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map(submission => (
          <div key={submission.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-medium text-sm">
                    {submission.studentName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{submission.studentName}</h3>
                  <p className="text-sm text-gray-500">{submission.lessonTitle}</p>
                  <p className="text-xs text-gray-400">{formatDate(submission.submittedAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(submission.status)}`}>
                  {submission.status}
                </span>
                {submission.status === 'pending' && (
                  <button
                    onClick={() => setSelectedSubmission(submission)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Review
                  </button>
                )}
              </div>
            </div>

            {/* Audio Player */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-4">
                <button className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-white text-sm">▶</span>
                </button>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">0:00</span>
              </div>
            </div>

            {/* Existing Feedback (if reviewed) */}
            {submission.status !== 'pending' && (
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Instructor Feedback</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium">Overall:</span> {submission.feedback.overall}</p>
                    <p className="text-sm"><span className="font-medium">Technique:</span> {submission.feedback.technique}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium">Strengths:</span> {submission.feedback.strengths}</p>
                    <p className="text-sm"><span className="font-medium">Improvements:</span> {submission.feedback.improvements}</p>
                  </div>
                </div>
                
                {/* Scores */}
                <div className="mt-4 grid grid-cols-5 gap-4">
                  {Object.entries(submission.scores).map(([skill, score]) => (
                    <div key={skill} className="text-center">
                      <div className="text-lg font-medium text-gray-900">{score}/10</div>
                      <div className="text-xs text-gray-500 capitalize">{skill}</div>
                    </div>
                  ))}
                </div>

                {submission.isVoiceReply && (
                  <div className="mt-4 bg-purple-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600 text-sm">🎤</span>
                      <span className="text-sm text-purple-700">Voice feedback available</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-xl">📝</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions</h3>
          <p className="text-gray-600">
            {filter === 'pending' ? 'All submissions have been reviewed!' : 'No submissions found for this filter.'}
          </p>
        </div>
      )}

      {/* Review Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-gray-900">Review Submission</h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <AdminVoiceReplyBox
                submission={selectedSubmission}
                onComplete={() => setSelectedSubmission(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
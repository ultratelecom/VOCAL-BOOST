import React, { useState } from 'react'
import { mockPeerSubmissions, PeerSubmission } from '../../lib/mockPeerSubmissions'
import PeerSubmissionCard from './PeerSubmissionCard'

export default function PeerSubmissionList() {
  const [filter, setFilter] = useState<'all' | 'breathing' | 'pitch' | 'tone' | 'rhythm'>('all')
  const [submissions] = useState<PeerSubmission[]>(mockPeerSubmissions)

  const filteredSubmissions = submissions.filter(submission => 
    filter === 'all' || submission.lessonType === filter
  )

  const filterOptions = [
    { value: 'all', label: 'All submissions' },
    { value: 'breathing', label: 'Breathing' },
    { value: 'pitch', label: 'Pitch' },
    { value: 'tone', label: 'Tone' },
    { value: 'rhythm', label: 'Rhythm' }
  ]

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value as any)}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                filter === option.value
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Submissions Count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {filteredSubmissions.length} submission{filteredSubmissions.length !== 1 ? 's' : ''} available for review
        </p>
        <div className="text-xs text-gray-500">
          Sorted by most recent
        </div>
      </div>

      {/* Submissions Grid */}
      {filteredSubmissions.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-xl">📝</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
          <p className="text-gray-600">Check back later for new submissions to review.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map(submission => (
            <PeerSubmissionCard 
              key={submission.id} 
              submission={submission} 
            />
          ))}
        </div>
      )}
    </div>
  )
} 
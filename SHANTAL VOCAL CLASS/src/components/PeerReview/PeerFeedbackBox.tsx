import React, { useState } from 'react'

interface PeerFeedbackBoxProps {
  submissionId: string
  onSubmit: (rating: number, feedback: string) => void
  onCancel: () => void
}

export default function PeerFeedbackBox({ submissionId, onSubmit, onCancel }: PeerFeedbackBoxProps) {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0 || !feedback.trim()) {
      alert('Please provide both a rating and feedback')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onSubmit(rating, feedback)
    setIsSubmitting(false)
  }

  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setRating(index + 1)}
        className={`text-2xl transition-colors ${
          index < rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
        }`}
      >
        ⭐
      </button>
    ))
  }

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Write your review</h4>
      
      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex space-x-1 mb-1">
          {renderStars()}
        </div>
        <p className="text-xs text-gray-500">
          Click stars to rate (1-5 stars)
        </p>
      </div>

      {/* Feedback */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Feedback
        </label>
        <textarea
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share constructive feedback about technique, tone quality, pitch accuracy, or areas for improvement..."
          className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 resize-none"
        />
        <div className="mt-1 text-xs text-gray-500">
          {feedback.length}/500 characters
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || rating === 0 || !feedback.trim() || feedback.length > 500}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
        
        <button
          onClick={() => {
            onCancel()
            setRating(0)
            setFeedback('')
          }}
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
} 
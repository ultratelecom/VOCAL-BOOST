import React, { useState } from 'react'
import { AdminFeedback } from '../../lib/mockAdminFeedback'

interface AdminVoiceReplyBoxProps {
  submission: AdminFeedback
  onComplete: () => void
}

export default function AdminVoiceReplyBox({ submission, onComplete }: AdminVoiceReplyBoxProps) {
  const [feedback, setFeedback] = useState({
    overall: '',
    technique: '',
    improvements: '',
    strengths: ''
  })
  
  const [scores, setScores] = useState({
    technique: 0,
    pitchAccuracy: 0,
    rhythm: 0,
    expression: 0,
    overall: 0
  })
  
  const [isRecording, setIsRecording] = useState(false)
  const [isVoiceReply, setIsVoiceReply] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleScoreChange = (skill: string, value: number) => {
    setScores(prev => ({ ...prev, [skill]: value }))
  }

  const handleSubmit = async () => {
    if (!feedback.overall.trim() || scores.overall === 0) {
      alert('Please provide overall feedback and rating')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Here you would save the feedback to the backend
    console.log('Feedback submitted:', { feedback, scores, isVoiceReply })
    
    setIsSubmitting(false)
    onComplete()
  }

  const renderStars = (currentRating: number, skill: string) => {
    return [...Array(10)].map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => handleScoreChange(skill, index + 1)}
        className={`text-lg transition-colors ${
          index < currentRating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
        }`}
      >
        ⭐
      </button>
    ))
  }

  return (
    <div className="space-y-6">
      {/* Student Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">{submission.studentName}</h3>
        <p className="text-sm text-gray-600">{submission.lessonTitle}</p>
        <p className="text-xs text-gray-500 mt-1">
          Submitted {new Date(submission.submittedAt).toLocaleDateString()}
        </p>
      </div>

      {/* Audio Player */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Student Submission</h4>
        <div className="flex items-center space-x-4">
          <button className="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors">
            <span className="text-white">▶</span>
          </button>
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-purple-600 h-3 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
          <span className="text-sm text-gray-500">0:00</span>
        </div>
      </div>

      {/* Scoring */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Rating (1-10 stars)</h4>
        
        {Object.entries(scores).map(([skill, score]) => (
          <div key={skill} className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 capitalize w-32">
              {skill === 'pitchAccuracy' ? 'Pitch Accuracy' : skill}
            </label>
            <div className="flex items-center space-x-1">
              {renderStars(score, skill)}
              <span className="ml-2 text-sm text-gray-600 w-8">{score}/10</span>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Form */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Written Feedback</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overall Feedback *
          </label>
          <textarea
            rows={3}
            value={feedback.overall}
            onChange={(e) => setFeedback(prev => ({ ...prev, overall: e.target.value }))}
            placeholder="Provide overall assessment and encouragement..."
            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technique Notes
          </label>
          <textarea
            rows={2}
            value={feedback.technique}
            onChange={(e) => setFeedback(prev => ({ ...prev, technique: e.target.value }))}
            placeholder="Comments on breathing, posture, vocal technique..."
            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Areas for Improvement
          </label>
          <textarea
            rows={2}
            value={feedback.improvements}
            onChange={(e) => setFeedback(prev => ({ ...prev, improvements: e.target.value }))}
            placeholder="Specific areas to focus on for next practice..."
            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Strengths
          </label>
          <textarea
            rows={2}
            value={feedback.strengths}
            onChange={(e) => setFeedback(prev => ({ ...prev, strengths: e.target.value }))}
            placeholder="What the student did well..."
            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 resize-none"
          />
        </div>
      </div>

      {/* Voice Reply Option */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center space-x-3 mb-4">
          <input
            type="checkbox"
            id="voiceReply"
            checked={isVoiceReply}
            onChange={(e) => setIsVoiceReply(e.target.checked)}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="voiceReply" className="text-sm font-medium text-gray-700">
            Add voice feedback
          </label>
        </div>

        {isVoiceReply && (
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isRecording 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {isRecording ? '⏸' : '🎤'}
              </button>
              <div className="flex-1">
                <p className="text-sm text-purple-700">
                  {isRecording ? 'Recording voice feedback...' : 'Click to record voice feedback'}
                </p>
                {isRecording && (
                  <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                    <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '30%' }}></div>
                  </div>
                )}
              </div>
              {isRecording && (
                <span className="text-sm text-purple-600 font-medium">0:15</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex space-x-3 pt-6 border-t border-gray-200">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !feedback.overall.trim() || scores.overall === 0}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
        
        <button
          onClick={onComplete}
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
} 
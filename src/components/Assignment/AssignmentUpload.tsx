import React, { useState } from 'react'
import Link from 'next/link'
import { Assignment } from '../../lib/assignmentsData'

interface AssignmentUploadProps {
  assignment: Assignment
}

export default function AssignmentUpload({ assignment }: AssignmentUploadProps) {
  const [activeTab, setActiveTab] = useState<'audio' | 'video' | 'text'>('audio')
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecording, setHasRecording] = useState(false)
  const [textSubmission, setTextSubmission] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleStartRecording = () => {
    setIsRecording(true)
    // Simulate recording for demo
    setTimeout(() => {
      setIsRecording(false)
      setHasRecording(true)
    }, 3000)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would handle the actual submission
    console.log('Assignment submitted:', {
      assignmentId: assignment.id,
      type: activeTab,
      content: activeTab === 'text' ? textSubmission : `${activeTab}-recording`
    })
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const canSubmit = () => {
    if (activeTab === 'audio' || activeTab === 'video') return hasRecording
    if (activeTab === 'text') return textSubmission.trim().length > 0
    return false
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Submit Your Assignment</h2>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {assignment.uploadType.map(type => (
            <button
              key={type}
              onClick={() => setActiveTab(type as 'audio' | 'video' | 'text')}
              className={`py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === type
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {type === 'audio' ? '🎤 Audio Recording' : 
               type === 'video' ? '📹 Video Recording' :
               '📝 Text Submission'}
            </button>
          ))}
        </nav>
      </div>

      {/* Audio Recording Tab */}
      {activeTab === 'audio' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-medium text-gray-900 mb-4">Record Your Audio Performance</h3>
            
            {!hasRecording ? (
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎤</span>
                </div>
                
                {!isRecording ? (
                  <div>
                    <p className="text-gray-600 mb-4">
                      Click the button below to start recording your vocal performance
                    </p>
                    <button
                      onClick={handleStartRecording}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Start Audio Recording
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-purple-600 font-medium mb-4">Recording audio...</p>
                    <div className="w-full bg-purple-200 rounded-full h-3 mb-4">
                      <div className="bg-purple-600 h-3 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                    <button
                      onClick={() => {
                        setIsRecording(false)
                        setHasRecording(true)
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Stop Recording
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <button className="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors">
                    <span className="text-white">▶</span>
                  </button>
                  <div className="flex-1 max-w-sm">
                    <div className="w-full bg-purple-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <span className="text-sm text-purple-600">0:00 / 2:15</span>
                </div>
                
                <p className="text-purple-700 mb-4">Audio recording ready for submission</p>
                
                <button
                  onClick={() => {
                    setHasRecording(false)
                    setIsRecording(false)
                  }}
                  className="text-purple-600 hover:text-purple-700 text-sm transition-colors"
                >
                  Record again
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Video Recording Tab */}
      {activeTab === 'video' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-medium text-gray-900 mb-4">Record Your Video Performance</h3>
            
            {!hasRecording ? (
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📹</span>
                </div>
                
                {!isRecording ? (
                  <div>
                    <p className="text-gray-600 mb-4">
                      Click the button below to start recording your video performance
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Make sure you're in a well-lit area and your camera is positioned properly
                    </p>
                    <button
                      onClick={handleStartRecording}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Start Video Recording
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-red-600 font-medium mb-4">Recording video...</p>
                    <div className="w-full bg-red-200 rounded-full h-3 mb-4">
                      <div className="bg-red-600 h-3 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                    <button
                      onClick={() => {
                        setIsRecording(false)
                        setHasRecording(true)
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Stop Recording
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-red-50 rounded-lg p-6">
                <div className="bg-gray-900 rounded-lg aspect-video mb-4 flex items-center justify-center">
                  <button className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors">
                    <span className="text-white text-2xl">▶</span>
                  </button>
                </div>
                
                <p className="text-red-700 mb-4">Video recording ready for submission</p>
                
                <button
                  onClick={() => {
                    setHasRecording(false)
                    setIsRecording(false)
                  }}
                  className="text-red-600 hover:text-red-700 text-sm transition-colors"
                >
                  Record again
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Text Submission Tab */}
      {activeTab === 'text' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Written Reflection</h3>
            <p className="text-sm text-gray-600 mb-4">
              Share your thoughts, learnings, and reflections about this assignment.
            </p>
            
            <textarea
              rows={8}
              value={textSubmission}
              onChange={(e) => setTextSubmission(e.target.value)}
              placeholder="Describe your experience, what you learned, challenges you faced, and your thoughts about your performance..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 resize-none"
            />
            
            <div className="mt-2 text-xs text-gray-500">
              {textSubmission.length}/1000 characters
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit() || isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
          </button>
          
          <button
            onClick={() => {
              setTextSubmission('')
              setHasRecording(false)
              setIsRecording(false)
            }}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-3">
          Make sure to review your submission before submitting. You can always come back and resubmit if needed.
        </p>
      </div>

      {/* Success Message with Peer Review Link */}
      {isSubmitted && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">✓</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-green-900 mb-2">Assignment submitted successfully! 🎉</h3>
              <p className="text-green-800 text-sm mb-4">
                Great work! Your submission has been saved and your instructor will review it soon.
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  href={`/peer-review/${assignment.id}`}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2"
                >
                  <span>👥</span>
                  <span>See what classmates are doing</span>
                </Link>
                <span className="text-green-700 text-sm">
                  Leave comments and support your peers!
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 
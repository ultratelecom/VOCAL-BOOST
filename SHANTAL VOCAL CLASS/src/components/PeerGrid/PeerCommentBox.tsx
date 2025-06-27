import React, { useState } from 'react'

interface PeerCommentBoxProps {
  submissionId: string
  assignmentId: string
  onCommentAdded: () => void
}

export default function PeerCommentBox({ submissionId, assignmentId, onCommentAdded }: PeerCommentBoxProps) {
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!comment.trim()) return

    setIsSubmitting(true)

    try {
      // Simulate API call to add comment
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would call the actual API:
      // await addPeerComment(assignmentId, submissionId, {
      //   id: generateId(),
      //   author: currentUser.name,
      //   authorAvatar: currentUser.avatar,
      //   comment: comment.trim(),
      //   timestamp: 'just now'
      // })

      setComment('')
      onCommentAdded()
      
    } catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-3">
      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-medium">You</span>
      </div>
      
      <div className="flex-1">
        <div className="relative">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a thoughtful comment for your classmate..."
            rows={3}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 resize-none disabled:opacity-50"
          />
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>💡 Be specific and constructive</span>
              <span>🎵 Focus on technique and emotion</span>
            </div>
            
            <button
              type="submit"
              disabled={!comment.trim() || isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
} 
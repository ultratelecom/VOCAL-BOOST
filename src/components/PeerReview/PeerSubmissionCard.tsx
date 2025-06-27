'use client';

import { useState } from 'react';

interface PeerSubmission {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  lessonTitle: string;
  projectTitle: string;
  submittedAt: string;
  audioUrl: string;
  duration: number;
  notes?: string;
  averageRating?: number;
  reviewCount: number;
  hasUserReviewed: boolean;
}

interface PeerSubmissionCardProps {
  submission: PeerSubmission;
  onReview: (submissionId: string, rating: number, feedback: string) => void;
}

export default function PeerSubmissionCard({ submission, onReview }: PeerSubmissionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleReviewSubmit = async () => {
    if (rating === 0 || !feedback.trim()) {
      alert('Please provide both a rating and feedback');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onReview(submission.id, rating, feedback);
      setIsReviewing(false);
      setRating(0);
      setFeedback('');
    } catch (error) {
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (currentRating: number, interactive = false) => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        type="button"
        disabled={!interactive}
        onClick={() => interactive && setRating(index + 1)}
        className={`text-2xl ${
          interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'
        } ${index < currentRating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ⭐
      </button>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow">
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={submission.userAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
              alt={submission.userName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{submission.userName}</h3>
              <p className="text-sm text-gray-600">{submission.projectTitle}</p>
              <p className="text-xs text-gray-500">{formatDate(submission.submittedAt)}</p>
            </div>
          </div>
          
          <div className="text-right">
            {submission.averageRating && (
              <div className="flex items-center space-x-1 mb-1">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm font-medium">{submission.averageRating.toFixed(1)}</span>
                <span className="text-xs text-gray-500">({submission.reviewCount} reviews)</span>
              </div>
            )}
            <div className="text-xs text-gray-500">
              Duration: {formatTime(submission.duration)}
            </div>
          </div>
        </div>

        {/* Lesson Info */}
        <div className="mb-4">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Lesson:</span> {submission.lessonTitle}
          </p>
          {submission.notes && (
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Notes:</span> {submission.notes}
            </p>
          )}
        </div>

        {/* Audio Player */}
        <div className="mb-4">
          <audio
            controls
            className="w-full"
            src={submission.audioUrl}
          >
            Your browser does not support the audio element.
          </audio>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
          
          {!submission.hasUserReviewed && (
            <button
              onClick={() => setIsReviewing(!isReviewing)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              {isReviewing ? 'Cancel Review' : 'Write Review'}
            </button>
          )}
          
          {submission.hasUserReviewed && (
            <span className="text-green-600 text-sm font-medium">
                              ✓ You&apos;ve reviewed this
            </span>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t bg-gray-50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance Insights */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Performance Insights</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Technique</span>
                  <div className="flex space-x-1">
                    {renderStars(4)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Rhythm</span>
                  <div className="flex space-x-1">
                    {renderStars(3)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pitch</span>
                  <div className="flex space-x-1">
                    {renderStars(4)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expression</span>
                  <div className="flex space-x-1">
                    {renderStars(5)}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Feedback */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Recent Feedback</h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium">Emma T.</span>
                    <div className="flex space-x-1">
                      {renderStars(4)}
                    </div>
                  </div>
                                    <p className="text-sm text-gray-700">
                    &quot;Great breathing control! Your technique has really improved.&quot;
                  </p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium">Michael C.</span>
                    <div className="flex space-x-1">
                      {renderStars(5)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    &quot;Excellent work on the scales. Your pitch accuracy is impressive!&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Form */}
      {isReviewing && (
        <div className="border-t bg-blue-50 p-6">
          <h4 className="font-medium text-gray-900 mb-4">Write Your Review</h4>
          
          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Rating
            </label>
            <div className="flex space-x-1">
              {renderStars(rating, true)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Click stars to rate (1-5 stars)
            </p>
          </div>

          {/* Feedback */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback
            </label>
            <textarea
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share constructive feedback about technique, pitch, rhythm, or expression..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
            <div className="mt-1 text-xs text-gray-500">
              {feedback.length}/300 characters
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3">
            <button
              onClick={handleReviewSubmit}
              disabled={isSubmitting || rating === 0 || !feedback.trim() || feedback.length > 300}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              onClick={() => {
                setIsReviewing(false);
                setRating(0);
                setFeedback('');
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 
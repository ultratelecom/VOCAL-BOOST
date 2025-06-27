'use client';

import { useState } from 'react';

interface Submission {
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
  status: 'pending_review' | 'in_review' | 'reviewed' | 'needs_revision';
}

interface Feedback {
  type: 'comment' | 'suggestion' | 'praise' | 'correction';
  content: string;
  audioTimestamp?: number;
  rating?: number;
}

export default function AdminFeedbackPanel() {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [feedback, setFeedback] = useState<Feedback>({
    type: 'comment',
    content: '',
    audioTimestamp: undefined,
    rating: undefined
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - replace with actual API calls
  const pendingSubmissions: Submission[] = [
    {
      id: 'sub-1',
      userId: 'user-2',
      userName: 'Sarah Martinez',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=150&h=150&fit=crop&crop=face',
      lessonTitle: 'Understanding Diaphragmatic Breathing',
      projectTitle: 'Breathing Exercise Recording',
      submittedAt: '2024-01-18T10:30:00Z',
      audioUrl: '/audio/submissions/sarah-breathing-exercise.mp3',
      duration: 125,
      notes: 'I found this exercise challenging at first, but I think I improved by the end.',
      status: 'pending_review'
    },
    {
      id: 'sub-3',
      userId: 'user-4',
      userName: 'Emma Thompson',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lessonTitle: 'Daily Breathing Exercises',
      projectTitle: 'Scale Practice Submission',
      submittedAt: '2024-01-16T09:45:00Z',
      audioUrl: '/audio/submissions/emma-scales-practice.mp3',
      duration: 167,
      notes: 'Working on maintaining breath support throughout the scales.',
      status: 'in_review'
    }
  ];

  const feedbackTypes = [
    { value: 'comment', label: 'General Comment', icon: '💬', color: 'gray' },
    { value: 'praise', label: 'Praise', icon: '👏', color: 'green' },
    { value: 'suggestion', label: 'Suggestion', icon: '💡', color: 'blue' },
    { value: 'correction', label: 'Correction', icon: '✏️', color: 'yellow' }
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSubmissionSelect = (submission: Submission) => {
    setSelectedSubmission(submission);
    // Mark as in review when selected
    submission.status = 'in_review';
  };

  const handleFeedbackSubmit = async () => {
    if (!selectedSubmission || !feedback.content.trim()) {
      alert('Please select a submission and provide feedback');
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Feedback submitted successfully!');
      
      // Reset form
      setFeedback({
        type: 'comment',
        content: '',
        audioTimestamp: undefined,
        rating: undefined
      });
      
      // Mark submission as reviewed
      if (selectedSubmission) {
        selectedSubmission.status = 'reviewed';
      }
      
    } catch (error) {
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const parseAudioTimestamp = (value: string) => {
    if (!value) return undefined;
    
    if (value.includes(':')) {
      const [minutes, seconds] = value.split(':');
      return parseInt(minutes) * 60 + parseInt(seconds || '0');
    }
    
    return parseInt(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Submissions List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Pending Reviews</h2>
        
        {pendingSubmissions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📋</div>
            <p>No submissions pending review</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingSubmissions.map((submission) => (
              <div
                key={submission.id}
                onClick={() => handleSubmissionSelect(submission)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedSubmission?.id === submission.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={submission.userAvatar}
                    alt={submission.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">
                        {submission.userName}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        submission.status === 'pending_review'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {submission.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {submission.projectTitle}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(submission.submittedAt)} • {formatTime(submission.duration)}
                    </p>
                    {submission.notes && (
                      <p className="text-xs text-gray-600 mt-1 truncate">
                        "{submission.notes}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback Panel */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Review & Feedback</h2>
        
        {selectedSubmission ? (
          <div className="space-y-6">
            {/* Submission Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Reviewing Submission</h3>
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={selectedSubmission.userAvatar}
                  alt={selectedSubmission.userName}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium">{selectedSubmission.userName}</p>
                  <p className="text-sm text-gray-600">{selectedSubmission.projectTitle}</p>
                </div>
              </div>
              
              {/* Audio Player */}
              <div className="mb-3">
                <audio
                  controls
                  className="w-full"
                  src={selectedSubmission.audioUrl}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
              
              {selectedSubmission.notes && (
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-700">
                    <strong>Student Notes:</strong> {selectedSubmission.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Feedback Form */}
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-medium mb-4">Provide Feedback</h4>
              
              {/* Feedback Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFeedback(prev => ({ ...prev, type: type.value as any }))}
                      className={`flex items-center space-x-2 px-3 py-2 border rounded-md text-sm transition-colors ${
                        feedback.type === type.value
                          ? `bg-${type.color}-50 border-${type.color}-500 text-${type.color}-700`
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio Timestamp */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audio Timestamp (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 1:30 or 90"
                  onChange={(e) => {
                    const timestamp = parseAudioTimestamp(e.target.value);
                    setFeedback(prev => ({ ...prev, audioTimestamp: timestamp }));
                  }}
                  className="block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Rating */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (1-10)
                </label>
                <select
                  value={feedback.rating || ''}
                  onChange={(e) => setFeedback(prev => ({ 
                    ...prev, 
                    rating: e.target.value ? parseInt(e.target.value) : undefined 
                  }))}
                  className="block w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">No rating</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              {/* Feedback Content */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback
                </label>
                <textarea
                  rows={5}
                  value={feedback.content}
                  onChange={(e) => setFeedback(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Provide detailed feedback to help the student improve..."
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
                <div className="mt-1 text-xs text-gray-500">
                  {feedback.content.length}/1000 characters
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3">
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={isSubmitting || !feedback.content.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
                
                <button
                  onClick={() => {
                    if (selectedSubmission) {
                      selectedSubmission.status = 'needs_revision';
                      alert('Marked for revision. Student will be notified.');
                    }
                  }}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
                >
                  Request Revision
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">👈</div>
            <p>Select a submission from the list to begin reviewing</p>
          </div>
        )}
      </div>
    </div>
  );
} 
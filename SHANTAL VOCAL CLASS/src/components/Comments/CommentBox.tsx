'use client';

import { useState } from 'react';

interface CommentBoxProps {
  onSubmit: (content: string, type?: string, audioTimestamp?: number) => void;
  placeholder?: string;
  submitText?: string;
  compact?: boolean;
  showTypeSelector?: boolean;
  showAudioTimestamp?: boolean;
  initialType?: string;
}

export default function CommentBox({
  onSubmit,
  placeholder = "Write your comment...",
  submitText = "Post Comment",
  compact = false,
  showTypeSelector = false,
  showAudioTimestamp = false,
  initialType = "comment"
}: CommentBoxProps) {
  const [content, setContent] = useState('');
  const [type, setType] = useState(initialType);
  const [audioTimestamp, setAudioTimestamp] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commentTypes = [
    { value: 'comment', label: 'General Comment', icon: '💬' },
    { value: 'praise', label: 'Praise', icon: '👏' },
    { value: 'suggestion', label: 'Suggestion', icon: '💡' },
    { value: 'correction', label: 'Correction', icon: '✏️' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      alert('Please enter a comment');
      return;
    }

    setIsSubmitting(true);

    try {
      const timestampSeconds = audioTimestamp ? parseFloat(audioTimestamp) * 60 : undefined;
      onSubmit(content, type, timestampSeconds);
      
      // Reset form
      setContent('');
      setAudioTimestamp('');
      setType(initialType);
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const parseAudioTimestamp = (value: string) => {
    // Parse various timestamp formats: "1:30", "90", "1.5"
    if (!value) return '';
    
    if (value.includes(':')) {
      const [minutes, seconds] = value.split(':');
      const totalMinutes = parseInt(minutes) + (parseInt(seconds) || 0) / 60;
      return totalMinutes.toString();
    }
    
    return value;
  };

  const formatAudioTimestamp = (value: string) => {
    if (!value) return '';
    
    const minutes = parseFloat(value);
    if (isNaN(minutes)) return value;
    
    const wholeMinutes = Math.floor(minutes);
    const seconds = Math.round((minutes - wholeMinutes) * 60);
    
    if (seconds === 0) {
      return `${wholeMinutes}:00`;
    } else {
      return `${wholeMinutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Comment Type Selector */}
      {showTypeSelector && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comment Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {commentTypes.map((commentType) => (
              <button
                key={commentType.value}
                type="button"
                onClick={() => setType(commentType.value)}
                className={`flex items-center space-x-2 px-3 py-2 border rounded-md text-sm transition-colors ${
                  type === commentType.value
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{commentType.icon}</span>
                <span>{commentType.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Audio Timestamp */}
      {showAudioTimestamp && (
        <div>
          <label htmlFor="audioTimestamp" className="block text-sm font-medium text-gray-700 mb-2">
            Audio Timestamp (Optional)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="audioTimestamp"
              value={audioTimestamp}
              onChange={(e) => setAudioTimestamp(e.target.value)}
              placeholder="e.g., 1:30 or 90"
              className="block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <span className="text-sm text-gray-500">
              {audioTimestamp && formatAudioTimestamp(parseAudioTimestamp(audioTimestamp))}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Reference a specific time in the audio (format: minutes:seconds or total seconds)
          </p>
        </div>
      )}

      {/* Comment Content */}
      <div>
        {!compact && (
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Comment
          </label>
        )}
        <textarea
          id="comment"
          rows={compact ? 3 : 4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
          disabled={isSubmitting}
        />
        <div className="mt-1 flex justify-between">
          <span className="text-xs text-gray-500">
            {content.length}/500 characters
          </span>
          {content.length > 450 && (
            <span className="text-xs text-yellow-600">
              {500 - content.length} characters remaining
            </span>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim() || content.length > 500}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Posting...
            </>
          ) : (
            submitText
          )}
        </button>
      </div>

      {/* Tips */}
      {!compact && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h5 className="text-sm font-medium text-blue-900 mb-2">💡 Tips for effective feedback:</h5>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Be specific about what you noticed</li>
            <li>• Include both strengths and areas for improvement</li>
            <li>• Reference specific moments using timestamps</li>
            <li>• Be encouraging and constructive</li>
          </ul>
        </div>
      )}
    </form>
  );
} 
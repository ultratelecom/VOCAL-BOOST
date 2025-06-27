'use client';

import { useState } from 'react';
import CommentBox from './CommentBox';

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  type: 'comment' | 'suggestion' | 'praise' | 'correction';
  audioTimestamp?: number;
  rating?: number;
  replies?: Comment[];
  isInstructor?: boolean;
}

interface CommentThreadProps {
  comments: Comment[];
  onAddComment?: (content: string, type: string, audioTimestamp?: number) => void;
  onReply?: (commentId: string, content: string) => void;
  allowReplies?: boolean;
  showAddComment?: boolean;
}

export default function CommentThread({ 
  comments, 
  onAddComment, 
  onReply, 
  allowReplies = true,
  showAddComment = true 
}: CommentThreadProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  };

  const formatAudioTimestamp = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCommentTypeIcon = (type: string) => {
    switch (type) {
      case 'praise':
        return '👏';
      case 'suggestion':
        return '💡';
      case 'correction':
        return '✏️';
      default:
        return '💬';
    }
  };

  const getCommentTypeColor = (type: string) => {
    switch (type) {
      case 'praise':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'suggestion':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'correction':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const handleReply = (commentId: string, content: string) => {
    if (onReply) {
      onReply(commentId, content);
    }
    setReplyingTo(null);
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-8 mt-3' : 'mb-6'}`}>
      <div className={`border rounded-lg p-4 ${getCommentTypeColor(comment.type)}`}>
        {/* Comment Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <img
              src={comment.authorAvatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`}
              alt={comment.author}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className={`font-medium ${comment.isInstructor ? 'text-blue-700' : ''}`}>
                  {comment.author}
                </span>
                {comment.isInstructor && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Instructor
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-600">
                {formatTimestamp(comment.timestamp)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getCommentTypeIcon(comment.type)}</span>
            {comment.audioTimestamp !== undefined && (
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                @ {formatAudioTimestamp(comment.audioTimestamp)}
              </span>
            )}
            {comment.rating && (
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-medium">{comment.rating}/10</span>
              </div>
            )}
          </div>
        </div>

        {/* Comment Content */}
        <div className="mb-3">
          <p className="text-gray-700 leading-relaxed">{comment.content}</p>
        </div>

        {/* Comment Actions */}
        {allowReplies && !isReply && (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {replyingTo === comment.id ? 'Cancel Reply' : 'Reply'}
            </button>
            <button className="text-gray-500 hover:text-gray-700 text-sm">
              👍 Helpful
            </button>
          </div>
        )}

        {/* Reply Box */}
        {replyingTo === comment.id && (
          <div className="mt-4">
            <CommentBox
              onSubmit={(content) => handleReply(comment.id, content)}
              placeholder="Write a reply..."
              submitText="Reply"
              compact={true}
            />
          </div>
        )}
      </div>

      {/* Render Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3">
          {comment.replies.map(reply => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Existing Comments */}
      {comments.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Feedback & Comments ({comments.length})
          </h3>
          {comments.map(comment => renderComment(comment))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">💬</div>
          <p>No comments yet. Be the first to leave feedback!</p>
        </div>
      )}

      {/* Add Comment Box */}
      {showAddComment && onAddComment && (
        <div className="border-t pt-6">
          <h4 className="text-md font-semibold mb-3">Add Your Feedback</h4>
          <CommentBox
            onSubmit={(content, type, audioTimestamp) => onAddComment(content, type || 'comment', audioTimestamp)}
            placeholder="Share your thoughts, suggestions, or encouragement..."
            submitText="Post Comment"
            showTypeSelector={true}
            showAudioTimestamp={true}
          />
        </div>
      )}
    </div>
  );
} 
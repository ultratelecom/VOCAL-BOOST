'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import NotificationDropdown from '../../components/Notifications/NotificationDropdown'
import PeerReviewDropdown from '../../components/PeerReview/PeerReviewDropdown'
import AudioRecorder from '../../components/Audio/AudioRecorder'
import HashtagBackground from '../../components/HashtagBackground'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'upload'>('feed')
  const [uploadType, setUploadType] = useState<'audio' | 'video' | 'text'>('audio')
  const [completedAssignments] = useState<Set<string>>(new Set(['1a', '1b']))
  const [commentedPosts, setCommentedPosts] = useState<Set<string>>(new Set())
  const [showCommentForm, setShowCommentForm] = useState<string | null>(null)
  const [commentText, setCommentText] = useState('')
  const [animatingComment, setAnimatingComment] = useState<string | null>(null)

  const communityPosts = [
    {
      id: '1',
      author: 'Sarah M.',
      authorAvatar: '/avatars/sarah.jpg',
      type: 'audio',
      title: 'My First Vocal Run Attempt 🎵',
      description: 'Working on melismatic runs in "Amazing Grace". Any tips on breath control?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 12,
      comments: 5,
      duration: '1:45',
      tags: ['runs', 'breathing']
    },
    {
      id: '2',
      author: 'Michael K.',
      authorAvatar: '/avatars/michael.jpg',
      type: 'video',
      title: 'Diaphragmatic Breathing Exercise',
      description: 'Sharing my daily warmup routine. This has helped me so much!',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 18,
      comments: 8,
      duration: '3:20',
      tags: ['warmup', 'breathing']
    },
    {
      id: '3',
      author: 'Lisa P.',
      authorAvatar: '/avatars/lisa.jpg',
      type: 'text',
      title: 'Question about High Notes',
      description: 'I\'m struggling with my head voice transition around E5. Any exercises?',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      likes: 7,
      comments: 12,
      tags: ['head-voice', 'high-notes']
    },
    {
      id: '4',
      author: 'David R.',
      authorAvatar: '/avatars/david.jpg',
      type: 'audio',
      title: 'Cover: "Hallelujah"',
      description: 'Finally feeling confident enough to share! Feedback welcome.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      likes: 25,
      comments: 15,
      duration: '4:12',
      tags: ['cover', 'performance']
    },
    {
      id: '5',
      author: 'Emma T.',
      authorAvatar: '/avatars/emma.jpg',
      type: 'video',
      title: 'Vibrato Practice Session',
      description: 'Working on controlled vibrato with classical exercises.',
      timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
      likes: 14,
      comments: 6,
      duration: '2:30',
      tags: ['vibrato', 'classical']
    },
    {
      id: '6',
      author: 'James L.',
      authorAvatar: '/avatars/james.jpg',
      type: 'audio',
      title: 'Jazz Improvisation',
      description: 'First attempt at vocal jazz improvisation. How did I do?',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      likes: 20,
      comments: 9,
      duration: '3:45',
      tags: ['jazz', 'improvisation']
    },
    {
      id: '7',
      author: 'Maya S.',
      authorAvatar: '/avatars/maya.jpg',
      type: 'text',
      title: 'Breathing Technique Tips',
      description: 'Sharing some breathing exercises that helped me with stamina.',
      timestamp: new Date(Date.now() - 60 * 60 * 60 * 1000),
      likes: 30,
      comments: 18,
      tags: ['breathing', 'stamina']
    },
    {
      id: '8',
      author: 'Alex K.',
      authorAvatar: '/avatars/alex.jpg',
      type: 'video',
      title: 'Vocal Warm-up Routine',
      description: 'My 10-minute morning vocal warm-up that works wonders.',
      timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
      likes: 22,
      comments: 11,
      duration: '10:15',
      tags: ['warmup', 'routine']
    },
    {
      id: '9',
      author: 'Sophie R.',
      authorAvatar: '/avatars/sophie.jpg',
      type: 'audio',
      title: 'Opera Aria Practice',
      description: 'Working on "O mio babbino caro" - feedback on technique please!',
      timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000),
      likes: 16,
      comments: 7,
      duration: '2:45',
      tags: ['opera', 'classical']
    },
    {
      id: '10',
      author: 'Ryan M.',
      authorAvatar: '/avatars/ryan.jpg',
      type: 'text',
      title: 'Stage Fright Solutions',
      description: 'Tips that helped me overcome performance anxiety.',
      timestamp: new Date(Date.now() - 120 * 60 * 60 * 1000),
      likes: 35,
      comments: 25,
      tags: ['performance', 'confidence']
    },
    {
      id: '11',
      author: 'Zoe H.',
      authorAvatar: '/avatars/zoe.jpg',
      type: 'video',
      title: 'Belt Technique Demo',
      description: 'Demonstrating proper belt technique vs. shouting.',
      timestamp: new Date(Date.now() - 144 * 60 * 60 * 1000),
      likes: 28,
      comments: 14,
      duration: '4:30',
      tags: ['belt', 'technique']
    },
    {
      id: '12',
      author: 'Marcus B.',
      authorAvatar: '/avatars/marcus.jpg',
      type: 'audio',
      title: 'R&B Vocal Runs',
      description: 'Practicing some classic R&B vocal runs. Rate my execution!',
      timestamp: new Date(Date.now() - 168 * 60 * 60 * 1000),
      likes: 19,
      comments: 8,
      duration: '1:30',
      tags: ['rnb', 'runs']
    }
  ]

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audio': return '🎵'
      case 'video': return '🎥'
      case 'text': return '💬'
      default: return '📄'
    }
  }

  const handleComment = async (postId: string) => {
    if (!commentText.trim()) return
    
    // Add animation
    setAnimatingComment(postId)
    
    // Simulate comment submission
    setTimeout(() => {
      setCommentedPosts(prev => new Set(Array.from(prev).concat(postId)))
      setShowCommentForm(null)
      setCommentText('')
      setAnimatingComment(null)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Animated Hashtag Background */}
      <HashtagBackground />
      
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎵</span>
              </div>
              <Link href="/dashboard" className="text-xl font-semibold text-gray-900">
                Vocal Boost
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                Dashboard
              </Link>
              <PeerReviewDropdown completedAssignments={completedAssignments} />
              <NotificationDropdown />
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-light text-gray-900 mb-1">Community</h1>
          <p className="text-gray-600 text-sm">
            Share your progress, get feedback, and connect with fellow vocalists
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'feed'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Community Feed
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'upload'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Share Something
          </button>
        </div>

        {/* Content */}
        {activeTab === 'feed' ? (
          /* Community Feed - 6 Card Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {communityPosts.map((post) => (
              <div 
                key={post.id} 
                className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 relative ${
                  animatingComment === post.id ? 'scale-105 shadow-xl ring-2 ring-purple-400' : ''
                }`}
              >
                {/* Commented Badge */}
                {commentedPosts.has(post.id) && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 z-10 animate-bounce">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Post Header */}
                <div className="flex items-start space-x-2 mb-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="text-xs">{getTypeIcon(post.type)}</span>
                      <span className="text-xs text-gray-500 truncate">{post.author}</span>
                    </div>
                    <h4 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight">{post.title}</h4>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-3">
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-2">{post.description}</p>
                  
                  {/* Media Indicator */}
                  {(post.type === 'audio' || post.type === 'video') && post.duration && (
                    <div className="bg-gray-50 rounded p-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">▶</span>
                        </div>
                        <span className="text-xs text-gray-600">{post.duration}</span>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                      <span>❤️</span>
                      <span>{post.likes}</span>
                    </button>
                    <button 
                      onClick={() => setShowCommentForm(showCommentForm === post.id ? null : post.id)}
                      className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
                    >
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">{formatTimeAgo(post.timestamp)}</span>
                </div>

                {/* Comment Form */}
                {showCommentForm === post.id && (
                  <div className="border-t pt-3 space-y-2 animate-fadeIn">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Leave a comment..."
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500 resize-none"
                      rows={2}
                    />
                    <div className="flex justify-end space-x-1">
                      <button
                        onClick={() => {
                          setShowCommentForm(null)
                          setCommentText('')
                        }}
                        className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleComment(post.id)}
                        disabled={!commentText.trim() || animatingComment === post.id}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded disabled:opacity-50"
                      >
                        {animatingComment === post.id ? '...' : 'Comment'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Upload Section - Compact */
          <div className="max-w-2xl bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Share with the Community</h2>
            
            {/* Upload Type Selection */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">What would you like to share?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { type: 'audio', icon: '🎵', title: 'Audio Recording', desc: 'Share a vocal recording' },
                  { type: 'video', icon: '🎥', title: 'Video Performance', desc: 'Upload a video' },
                  { type: 'text', icon: '💬', title: 'Text Post', desc: 'Ask questions or share tips' }
                ].map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setUploadType(option.type as any)}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      uploadType === option.type
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <h4 className="font-medium text-gray-900">{option.title}</h4>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Give your post a catchy title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Tell the community about your post..."
                />
              </div>

              {/* Content Upload */}
              {uploadType === 'audio' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Audio Recording</label>
                  <AudioRecorder
                    maxDuration={300}
                    onRecordingComplete={(blob) => {
                      console.log('Community audio uploaded:', blob)
                    }}
                  />
                </div>
              )}

              {uploadType === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Upload</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-2">🎥</div>
                    <p className="text-gray-600 mb-2">Drag and drop your video here</p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Choose Video File
                    </button>
                  </div>
                </div>
              )}

              {uploadType === 'text' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Share your thoughts, ask questions, or provide tips..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (optional)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., breathing, high-notes, beginner"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Save as Draft
                </button>
                <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                  Share with Community
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  )
} 
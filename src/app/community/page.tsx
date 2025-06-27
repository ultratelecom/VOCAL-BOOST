'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import NotificationDropdown from '../../components/Notifications/NotificationDropdown'
import PeerReviewDropdown from '../../components/PeerReview/PeerReviewDropdown'
import AudioRecorder from '../../components/Audio/AudioRecorder'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'upload'>('feed')
  const [uploadType, setUploadType] = useState<'audio' | 'video' | 'text'>('audio')
  const [completedAssignments] = useState<Set<string>>(new Set(['1a', '1b'])) // Mock completed assignments

  const communityPosts = [
    {
      id: '1',
      author: 'Sarah M.',
      authorAvatar: '/avatars/sarah.jpg',
      type: 'audio',
      title: 'My First Vocal Run Attempt 🎵',
      description: 'Working on melismatic runs in "Amazing Grace". Any tips on breath control during long passages?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 12,
      comments: 5,
      duration: '1:45',
      tags: ['runs', 'breathing', 'practice']
    },
    {
      id: '2',
      author: 'Michael K.',
      authorAvatar: '/avatars/michael.jpg',
      type: 'video',
      title: 'Diaphragmatic Breathing Exercise',
      description: 'Sharing my daily warmup routine. This has helped me so much with breath support!',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 18,
      comments: 8,
      duration: '3:20',
      tags: ['warmup', 'breathing', 'technique']
    },
    {
      id: '3',
      author: 'Lisa P.',
      authorAvatar: '/avatars/lisa.jpg',
      type: 'text',
      title: 'Question about High Notes',
      description: 'I&apos;m struggling with my head voice transition around E5. Does anyone have exercises that helped them with this specific challenge? I can hit the notes but they sound airy.',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      likes: 7,
      comments: 12,
      tags: ['head-voice', 'high-notes', 'question']
    },
    {
      id: '4',
      author: 'David R.',
      authorAvatar: '/avatars/david.jpg',
      type: 'audio',
      title: 'Cover: "Hallelujah" (Leonard Cohen)',
      description: 'Been working on this song for weeks. Finally feeling confident enough to share! Feedback welcome on emotional delivery.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      likes: 25,
      comments: 15,
      duration: '4:12',
      tags: ['cover', 'performance', 'emotional-delivery']
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎵</span>
              </div>
              <Link href="/dashboard" className="text-2xl font-semibold text-gray-900">
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

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Community</h1>
          <p className="text-gray-600">
            Share your progress, get feedback, and connect with fellow vocalists
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
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
          /* Community Feed */
          <div className="space-y-6">
            {communityPosts.map((post) => (
              <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-6">
                {/* Post Header */}
                <div className="flex items-start space-x-3 mb-4">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{post.author}</h3>
                      <span className="text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{formatTimeAgo(post.timestamp)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getTypeIcon(post.type)}</span>
                      <h4 className="font-medium text-gray-900">{post.title}</h4>
                      {post.duration && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {post.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-gray-700 mb-3">{post.description}</p>
                  
                  {/* Media Placeholder */}
                  {post.type === 'audio' && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white">▶</span>
                        </div>
                        <div>
                          <p className="font-medium text-purple-900">Audio Recording</p>
                          <p className="text-sm text-purple-600">{post.duration}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {post.type === 'video' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white">▶</span>
                        </div>
                        <div>
                          <p className="font-medium text-blue-900">Video Recording</p>
                          <p className="text-sm text-blue-600">{post.duration}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center space-x-6 pt-3 border-t border-gray-100">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors">
                    <span>❤️</span>
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
                    <span>💬</span>
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors">
                    <span>🔗</span>
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Upload Section */
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Share with the Community</h2>
            
            {/* Upload Type Selection */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">What would you like to share?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { type: 'audio', icon: '🎵', title: 'Audio Recording', desc: 'Share a vocal recording or song' },
                  { type: 'video', icon: '🎥', title: 'Video Performance', desc: 'Upload a video of your practice' },
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Give your post a catchy title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Tell the community about your post. What feedback are you looking for?"
                />
              </div>

              {/* Content Upload */}
              {uploadType === 'audio' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Audio Recording
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Upload
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Share your thoughts, ask questions, or provide tips to the community..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (optional)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g., breathing, high-notes, beginner (separate with commas)"
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
    </div>
  )
} 
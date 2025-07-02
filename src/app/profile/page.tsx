'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { mockCurrentUser } from '../../lib/mockUser'
import NotificationDropdown from '../../components/Notifications/NotificationDropdown'
import PeerReviewDropdown from '../../components/PeerReview/PeerReviewDropdown'
import HashtagBackground from '../../components/HashtagBackground'

export default function ProfilePage() {
  const [user, setUser] = useState(mockCurrentUser)
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [completedAssignments] = useState<Set<string>>(new Set(['1a', '1b'])) // Mock completed assignments
  
  // Form states
  const [newEmail, setNewEmail] = useState(user.email)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleEmailSave = () => {
    setUser(prev => ({ ...prev, email: newEmail }))
    setIsEditingEmail(false)
  }

  const handlePasswordSave = () => {
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      // In real app, this would make API call
      setIsEditingPassword(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      alert('Password updated successfully!')
    } else {
      alert('Passwords must match and be at least 6 characters long')
    }
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploadingPhoto(true)
      // Simulate upload delay
      setTimeout(() => {
        const photoUrl = URL.createObjectURL(file)
        setUser(prev => ({ ...prev, profileImage: photoUrl }))
        setIsUploadingPhoto(false)
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Animated Hashtag Background */}
      <HashtagBackground />
      
      {/* Header */}
      <header className="border-b border-gray-200 bg-white relative z-10">
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
                <span className="text-white text-sm font-medium">{user.name[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">
            Manage your account information and vocal training preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Photo & Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Photo</h2>
              
              <div className="text-center">
                <div className="relative mx-auto w-32 h-32 mb-4">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover border-4 border-purple-100"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-purple-100 flex items-center justify-center border-4 border-purple-200">
                      <span className="text-purple-600 text-4xl font-bold">{user.name[0]}</span>
                    </div>
                  )}
                  
                  {isUploadingPhoto && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      disabled={isUploadingPhoto}
                    />
                    <span className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block">
                      {isUploadingPhoto ? 'Uploading...' : 'Upload Photo'}
                    </span>
                  </label>
                  
                  {user.profileImage && (
                    <button
                      onClick={() => setUser(prev => ({ ...prev, profileImage: '' }))}
                      className="block mx-auto text-gray-500 hover:text-gray-700 text-sm transition-colors"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">{user.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                <p className="text-xs text-gray-500 capitalize">
                  {user.experienceLevel} • Member since {new Date(user.enrolledDate).getFullYear()}
                </p>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Email Settings */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Email Address</h2>
              
              {!isEditingEmail ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">{user.email}</p>
                    <p className="text-sm text-gray-500">Your account email for notifications and login</p>
                  </div>
                  <button
                    onClick={() => setIsEditingEmail(true)}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Email Address
                    </label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleEmailSave}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingEmail(false)
                        setNewEmail(user.email)
                      }}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Password Settings */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Password</h2>
              
              {!isEditingPassword ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">••••••••</p>
                    <p className="text-sm text-gray-500">Keep your account secure with a strong password</p>
                  </div>
                  <button
                    onClick={() => setIsEditingPassword(true)}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handlePasswordSave}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Update Password
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingPassword(false)
                        setCurrentPassword('')
                        setNewPassword('')
                        setConfirmPassword('')
                      }}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* One-on-One Booking with Shantal */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl">👩‍🎤</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-medium text-purple-900 mb-2">Book a One-on-One with Shantal</h2>
                  <p className="text-purple-700 text-sm mb-4 leading-relaxed">
                    Take your vocal skills to the next level with personalized coaching from Shantal. 
                    Get expert feedback, overcome specific challenges, and accelerate your progress with tailored guidance.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white bg-opacity-50 rounded-lg p-4">
                      <h3 className="font-medium text-purple-900 mb-1">30-Minute Session</h3>
                      <p className="text-sm text-purple-700 mb-2">Perfect for quick technique reviews</p>
                      <p className="text-lg font-bold text-purple-900">$75</p>
                    </div>
                    <div className="bg-white bg-opacity-50 rounded-lg p-4">
                      <h3 className="font-medium text-purple-900 mb-1">60-Minute Session</h3>
                      <p className="text-sm text-purple-700 mb-2">Comprehensive coaching session</p>
                      <p className="text-lg font-bold text-purple-900">$125</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Book 30-Min Session
                    </button>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Book 60-Min Session
                    </button>
                  </div>
                  
                  <p className="text-xs text-purple-600 mt-3">
                    Sessions are conducted via video call. You&apos;ll receive a calendar invite after booking.
                  </p>
                </div>
              </div>
            </div>

            {/* Vocal Progress Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Your Vocal Journey</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{user.progress.lessonsCompleted}</div>
                  <div className="text-sm text-gray-600">Lessons Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{user.progress.currentStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{user.progress.totalPracticeHours}h</div>
                  <div className="text-sm text-gray-600">Practice Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">8</div>
                  <div className="text-sm text-gray-600">Submissions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
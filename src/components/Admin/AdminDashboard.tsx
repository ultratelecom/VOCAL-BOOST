import React, { useState } from 'react'
import { getUserStats } from '../../lib/mockUsers'
import { getFeedbackStats } from '../../lib/mockAdminFeedback'
import UserProgressOverview from './UserProgressOverview'
import UserSubmissionsPanel from './UserSubmissionsPanel'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const userStats = getUserStats()
  const feedbackStats = getFeedbackStats()

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-light text-gray-900 mb-1">{userStats.totalUsers}</div>
          <div className="text-sm text-gray-600">Total Students</div>
          <div className="text-xs text-gray-500 mt-1">
            {userStats.activeUsers} active
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-light text-gray-900 mb-1">{feedbackStats.pending}</div>
          <div className="text-sm text-gray-600">Pending Reviews</div>
          <div className="text-xs text-gray-500 mt-1">
            {feedbackStats.total} total submissions
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-light text-gray-900 mb-1">{userStats.premiumUsers}</div>
          <div className="text-sm text-gray-600">Premium Students</div>
          <div className="text-xs text-gray-500 mt-1">
            {Math.round((userStats.premiumUsers / userStats.totalUsers) * 100)}% of total
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-light text-gray-900 mb-1">{userStats.averageProgress}%</div>
          <div className="text-sm text-gray-600">Avg Progress</div>
          <div className="text-xs text-gray-500 mt-1">
            Across all students
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Student Overview' },
            { id: 'submissions', label: 'Submissions' },
            { id: 'analytics', label: 'Analytics' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <UserProgressOverview />}
      {activeTab === 'submissions' && <UserSubmissionsPanel />}
      {activeTab === 'analytics' && (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-xl">📊</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
          <p className="text-gray-600">Detailed analytics and reporting features will be available here.</p>
        </div>
      )}
    </div>
  )
} 
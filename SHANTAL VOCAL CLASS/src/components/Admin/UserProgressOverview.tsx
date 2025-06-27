import React, { useState } from 'react'
import { mockAdminUsers, AdminUser } from '../../lib/mockUsers'

export default function UserProgressOverview() {
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [users] = useState<AdminUser[]>(mockAdminUsers)

  const filteredUsers = users.filter(user => {
    if (filter === 'active') return user.isActive
    if (filter === 'inactive') return !user.isActive
    return true
  })

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-yellow-500'
    if (percentage >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getSubscriptionBadge = (plan: string, status: string) => {
    if (plan === 'premium') return 'bg-purple-100 text-purple-700'
    if (plan === 'basic') return 'bg-blue-100 text-blue-700'
    return 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex space-x-4">
        {[
          { value: 'all', label: 'All Students' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' }
        ].map(option => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === option.value
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => {
                const progressPercentage = Math.round((user.progress.lessonsCompleted / user.progress.totalLessons) * 100)
                
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-4">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-purple-100">
                              <span className="text-purple-600 font-medium text-sm">{user.name[0]}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400 capitalize">{user.experienceLevel}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{user.progress.lessonsCompleted}/{user.progress.totalLessons} lessons</span>
                          <span className="text-gray-500">{progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(progressPercentage)}`}
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.progress.practiceHours}h practice • {user.progress.currentStreak} day streak
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSubscriptionBadge(user.subscription.plan, user.subscription.status)}`}>
                        {user.subscription.plan}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {user.subscription.status}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.lastLoginDate).toLocaleDateString()}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-xl">👥</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-600">Try adjusting your filter settings.</p>
        </div>
      )}
    </div>
  )
} 
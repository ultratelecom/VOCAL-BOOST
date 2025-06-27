'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { mockNotifications, markNotificationAsRead, getNotificationIcon } from '../../lib/mockNotifications'
import NotificationDropdown from '../../components/Notifications/NotificationDropdown'
import PeerReviewDropdown from '../../components/PeerReview/PeerReviewDropdown'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [completedAssignments] = useState<Set<string>>(new Set(['1a', '1b'])) // Mock completed assignments

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId)
    setNotifications([...mockNotifications])
  }

  const markAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.isRead) {
        markNotificationAsRead(notification.id)
      }
    })
    setNotifications([...mockNotifications])
  }

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

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
          <div className="flex items-center space-x-3 mb-2">
            <div className="text-3xl">🔔</div>
            <h1 className="text-3xl font-light text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-gray-600">
            Stay updated with feedback, reviews, and community activity
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === 'unread' 
                  ? 'You&apos;re all caught up! Check back later for new updates.'
                  : 'When you receive feedback, reviews, or community interactions, they&apos;ll appear here.'
                }
              </p>
              <Link
                href="/community"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
              >
                Visit Community
              </Link>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`border rounded-lg p-6 transition-colors hover:bg-gray-50 ${
                  !notification.isRead ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'
                }`}
              >
                {notification.actionUrl ? (
                  <Link
                    href={notification.actionUrl}
                    onClick={() => handleNotificationClick(notification.id)}
                    className="block"
                  >
                    <NotificationContent notification={notification} />
                  </Link>
                ) : (
                  <div onClick={() => handleNotificationClick(notification.id)}>
                    <NotificationContent notification={notification} />
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        {filteredNotifications.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/community"
                className="bg-white border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="text-2xl mb-2">💬</div>
                <h4 className="font-medium text-gray-900">Visit Community</h4>
                <p className="text-sm text-gray-600 mt-1">Share and get feedback</p>
              </Link>
              
              <Link
                href="/dashboard"
                className="bg-white border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="text-2xl mb-2">📚</div>
                <h4 className="font-medium text-gray-900">Continue Learning</h4>
                <p className="text-sm text-gray-600 mt-1">Back to your lessons</p>
              </Link>
              
              <button
                onClick={markAllAsRead}
                className="bg-white border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                <div className="text-2xl mb-2">✅</div>
                <h4 className="font-medium text-gray-900">Mark All Read</h4>
                <p className="text-sm text-gray-600 mt-1">Clear all notifications</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function NotificationContent({ notification }: { notification: any }) {
  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        {notification.avatarUrl ? (
          <img
            src={notification.avatarUrl}
            alt={notification.senderName}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-lg">{getNotificationIcon(notification.type)}</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className={`text-base font-medium text-gray-900 ${!notification.isRead ? 'font-semibold' : ''}`}>
            {notification.title}
          </h3>
          {!notification.isRead && (
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
          )}
        </div>
        <p className="text-gray-700 mt-1">{notification.message}</p>
        <div className="flex items-center space-x-3 mt-2">
          <span className="text-sm text-gray-500">{formatTimeAgo(notification.timestamp)}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            notification.type === 'peer_review' ? 'bg-blue-100 text-blue-700' :
            notification.type === 'assignment_feedback' ? 'bg-green-100 text-green-700' :
            notification.type === 'community_post' ? 'bg-purple-100 text-purple-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {notification.type.replace('_', ' ')}
          </span>
        </div>
      </div>
    </div>
  )
} 
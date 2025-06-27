'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { mockNotifications, getUnreadNotifications, markNotificationAsRead, getNotificationIcon } from '../../lib/mockNotifications'

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = getUnreadNotifications().length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId)
    setNotifications([...mockNotifications]) // Trigger re-render
    setIsOpen(false)
  }

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

  const markAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.isRead) {
        markNotificationAsRead(notification.id)
      }
    })
    setNotifications([...mockNotifications])
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          🔔
        </div>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <div className="text-2xl mb-2">🔔</div>
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.isRead ? 'bg-purple-50' : ''
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
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 text-center">
            <Link
              href="/notifications"
              className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
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
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        {notification.avatarUrl ? (
          <img
            src={notification.avatarUrl}
            alt={notification.senderName}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-sm">{getNotificationIcon(notification.type)}</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className={`text-sm font-medium text-gray-900 ${!notification.isRead ? 'font-semibold' : ''}`}>
            {notification.title}
          </p>
          {!notification.isRead && (
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
        <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(notification.timestamp)}</p>
      </div>
    </div>
  )
} 
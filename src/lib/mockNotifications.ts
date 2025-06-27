export interface Notification {
  id: string
  type: 'peer_review' | 'assignment_feedback' | 'community_post' | 'system'
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  actionUrl?: string
  avatarUrl?: string
  senderName?: string
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'peer_review',
    title: 'New Review on Your Breathing Exercise',
    message: 'Sarah M. left a review on your Module 1 breathing assignment',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    actionUrl: '/peer-review/1a#review-sarah-m',
    avatarUrl: '/avatars/sarah.jpg',
    senderName: 'Sarah M.'
  },
  {
    id: '2',
    type: 'community_post',
    title: 'Your Community Post Got Feedback',
    message: 'Michael K. commented on your vocal warm-up video',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: false,
    actionUrl: '/community/post/my-warmup-video#comment-michael-k',
    avatarUrl: '/avatars/michael.jpg',
    senderName: 'Michael K.'
  },
  {
    id: '3',
    type: 'peer_review',
    title: 'Review Request for Module 2',
    message: 'New submissions available for peer review in Module 2: Pitch Control',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    actionUrl: '/peer-review/2a'
  },
  {
    id: '4',
    type: 'assignment_feedback',
    title: 'Instructor Feedback Available',
    message: 'Shantal has provided feedback on your Module 1 final assignment',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isRead: true,
    actionUrl: '/assignment/1c#instructor-feedback',
    avatarUrl: '/avatars/shantal.jpg',
    senderName: 'Shantal'
  },
  {
    id: '5',
    type: 'system',
    title: 'Welcome to Vocal Boost!',
    message: 'Complete your first warmup session to unlock advanced features',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    isRead: true,
    actionUrl: '/warmup'
  }
]

export const getUnreadNotifications = () => {
  return mockNotifications.filter(notification => !notification.isRead)
}

export const getNotificationById = (id: string) => {
  return mockNotifications.find(notification => notification.id === id)
}

export const markNotificationAsRead = (id: string) => {
  const notification = mockNotifications.find(n => n.id === id)
  if (notification) {
    notification.isRead = true
  }
}

export const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'peer_review':
      return '👥'
    case 'assignment_feedback':
      return '📝'
    case 'community_post':
      return '💬'
    case 'system':
      return '🔔'
    default:
      return '📢'
  }
} 
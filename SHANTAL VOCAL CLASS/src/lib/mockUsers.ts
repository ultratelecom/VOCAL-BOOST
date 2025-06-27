export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledDate: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  isActive: boolean;
  lastLoginDate: string;
  progress: {
    lessonsCompleted: number;
    totalLessons: number;
    practiceHours: number;
    currentStreak: number;
    averageScore: number;
    submissionsCount: number;
  };
  skillLevels: {
    breathing: number;
    pitchControl: number;
    toneQuality: number;
    rhythm: number;
  };
  subscription: {
    plan: 'free' | 'basic' | 'premium';
    status: 'active' | 'expired' | 'cancelled';
    expiryDate?: string;
  };
}

export const mockAdminUsers: AdminUser[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    enrolledDate: '2023-12-01',
    experienceLevel: 'intermediate',
    isActive: true,
    lastLoginDate: '2024-01-20',
    progress: {
      lessonsCompleted: 12,
      totalLessons: 20,
      practiceHours: 45,
      currentStreak: 7,
      averageScore: 85,
      submissionsCount: 8
    },
    skillLevels: {
      breathing: 85,
      pitchControl: 70,
      toneQuality: 75,
      rhythm: 80
    },
    subscription: {
      plan: 'premium',
      status: 'active',
      expiryDate: '2024-12-01'
    }
  },
  {
    id: 'user-2',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=40&h=40&fit=crop&crop=face',
    enrolledDate: '2024-01-15',
    experienceLevel: 'beginner',
    isActive: true,
    lastLoginDate: '2024-01-19',
    progress: {
      lessonsCompleted: 3,
      totalLessons: 20,
      practiceHours: 8,
      currentStreak: 2,
      averageScore: 78,
      submissionsCount: 2
    },
    skillLevels: {
      breathing: 45,
      pitchControl: 30,
      toneQuality: 40,
      rhythm: 50
    },
    subscription: {
      plan: 'basic',
      status: 'active',
      expiryDate: '2024-07-15'
    }
  },
  {
    id: 'user-3',
    name: 'Marcus Johnson',
    email: 'marcus.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    enrolledDate: '2023-09-10',
    experienceLevel: 'advanced',
    isActive: false,
    lastLoginDate: '2024-01-10',
    progress: {
      lessonsCompleted: 28,
      totalLessons: 30,
      practiceHours: 120,
      currentStreak: 0,
      averageScore: 92,
      submissionsCount: 15
    },
    skillLevels: {
      breathing: 95,
      pitchControl: 90,
      toneQuality: 88,
      rhythm: 92
    },
    subscription: {
      plan: 'premium',
      status: 'expired',
      expiryDate: '2024-01-10'
    }
  },
  {
    id: 'user-4',
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@email.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    enrolledDate: '2023-11-20',
    experienceLevel: 'intermediate',
    isActive: true,
    lastLoginDate: '2024-01-20',
    progress: {
      lessonsCompleted: 15,
      totalLessons: 25,
      practiceHours: 55,
      currentStreak: 4,
      averageScore: 82,
      submissionsCount: 10
    },
    skillLevels: {
      breathing: 75,
      pitchControl: 80,
      toneQuality: 70,
      rhythm: 85
    },
    subscription: {
      plan: 'basic',
      status: 'active',
      expiryDate: '2024-05-20'
    }
  },
  {
    id: 'user-5',
    name: 'David Kim',
    email: 'david.kim@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    enrolledDate: '2024-01-01',
    experienceLevel: 'professional',
    isActive: true,
    lastLoginDate: '2024-01-20',
    progress: {
      lessonsCompleted: 8,
      totalLessons: 15,
      practiceHours: 32,
      currentStreak: 12,
      averageScore: 96,
      submissionsCount: 6
    },
    skillLevels: {
      breathing: 98,
      pitchControl: 95,
      toneQuality: 94,
      rhythm: 97
    },
    subscription: {
      plan: 'premium',
      status: 'active',
      expiryDate: '2025-01-01'
    }
  },
  {
    id: 'user-6',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=40&h=40&fit=crop&crop=face',
    enrolledDate: '2023-10-15',
    experienceLevel: 'beginner',
    isActive: false,
    lastLoginDate: '2023-12-20',
    progress: {
      lessonsCompleted: 5,
      totalLessons: 20,
      practiceHours: 12,
      currentStreak: 0,
      averageScore: 65,
      submissionsCount: 3
    },
    skillLevels: {
      breathing: 40,
      pitchControl: 35,
      toneQuality: 38,
      rhythm: 42
    },
    subscription: {
      plan: 'free',
      status: 'active'
    }
  }
];

export const getActiveUsers = (): AdminUser[] => {
  return mockAdminUsers.filter(user => user.isActive);
};

export const getUsersByExperienceLevel = (level: string): AdminUser[] => {
  return mockAdminUsers.filter(user => user.experienceLevel === level);
};

export const getUsersBySubscriptionPlan = (plan: string): AdminUser[] => {
  return mockAdminUsers.filter(user => user.subscription.plan === plan);
};

export const getUserStats = () => {
  return {
    totalUsers: mockAdminUsers.length,
    activeUsers: mockAdminUsers.filter(user => user.isActive).length,
    premiumUsers: mockAdminUsers.filter(user => user.subscription.plan === 'premium').length,
    averageProgress: Math.round(
      mockAdminUsers.reduce((sum, user) => 
        sum + (user.progress.lessonsCompleted / user.progress.totalLessons) * 100, 0
      ) / mockAdminUsers.length
    )
  };
}; 
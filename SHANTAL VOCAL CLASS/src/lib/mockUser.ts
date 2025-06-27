export interface User {
  id: string;
  name: string;
  email: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  enrolledDate: string;
  profileImage?: string;
  bio?: string;
  progress: {
    lessonsCompleted: number;
    totalPracticeHours: number;
    currentStreak: number;
    skillRatings: {
      breathing: number;
      pitchControl: number;
      toneQuality: number;
      rhythm: number;
    };
  };
  preferences: {
    notifications: boolean;
    publicProfile: boolean;
    peerReview: boolean;
  };
}

export const mockCurrentUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  experienceLevel: 'intermediate',
  enrolledDate: '2023-12-01',
  profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  bio: 'Passionate about vocal performance and always looking to improve my technique.',
  progress: {
    lessonsCompleted: 12,
    totalPracticeHours: 45,
    currentStreak: 7,
    skillRatings: {
      breathing: 85,
      pitchControl: 70,
      toneQuality: 75,
      rhythm: 80
    }
  },
  preferences: {
    notifications: true,
    publicProfile: true,
    peerReview: true
  }
};

export const mockUsers: User[] = [
  mockCurrentUser,
  {
    id: 'user-2',
    name: 'Sarah Martinez',
    email: 'sarah.martinez@email.com',
    experienceLevel: 'beginner',
    enrolledDate: '2024-01-15',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=150&h=150&fit=crop&crop=face',
    bio: 'New to vocal training but excited to learn!',
    progress: {
      lessonsCompleted: 3,
      totalPracticeHours: 8,
      currentStreak: 2,
      skillRatings: {
        breathing: 45,
        pitchControl: 30,
        toneQuality: 40,
        rhythm: 50
      }
    },
    preferences: {
      notifications: true,
      publicProfile: false,
      peerReview: false
    }
  },
  {
    id: 'user-3',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    experienceLevel: 'advanced',
    enrolledDate: '2023-09-10',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Professional singer working on refining my technique.',
    progress: {
      lessonsCompleted: 28,
      totalPracticeHours: 120,
      currentStreak: 15,
      skillRatings: {
        breathing: 95,
        pitchControl: 90,
        toneQuality: 88,
        rhythm: 92
      }
    },
    preferences: {
      notifications: true,
      publicProfile: true,
      peerReview: true
    }
  },
  {
    id: 'user-4',
    name: 'Emma Thompson',
    email: 'emma.thompson@email.com',
    experienceLevel: 'intermediate',
    enrolledDate: '2023-11-20',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Choir member looking to improve solo performance skills.',
    progress: {
      lessonsCompleted: 15,
      totalPracticeHours: 55,
      currentStreak: 4,
      skillRatings: {
        breathing: 75,
        pitchControl: 80,
        toneQuality: 70,
        rhythm: 85
      }
    },
    preferences: {
      notifications: false,
      publicProfile: true,
      peerReview: true
    }
  }
];

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getCurrentUser = (): User => {
  return mockCurrentUser;
}; 
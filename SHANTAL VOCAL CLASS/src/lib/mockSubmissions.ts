export interface Submission {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  lessonId: string;
  lessonTitle: string;
  projectId: string;
  projectTitle: string;
  submittedAt: string;
  status: 'pending_review' | 'in_review' | 'reviewed' | 'needs_revision';
  audioUrl: string;
  duration: number; // in seconds
  notes?: string;
  feedback?: SubmissionFeedback[];
  rating?: number;
  tags?: string[];
}

export interface SubmissionFeedback {
  id: string;
  instructorId: string;
  instructorName: string;
  submissionId: string;
  timestamp: string;
  type: 'comment' | 'suggestion' | 'praise' | 'correction';
  content: string;
  audioTimestamp?: number; // for time-specific feedback
  rating?: number;
}

export interface PeerReview {
  id: string;
  submissionId: string;
  reviewerId: string;
  reviewerName: string;
  submittedAt: string;
  rating: number;
  feedback: string;
  helpful: boolean;
  categories: {
    technique: number;
    rhythm: number;
    pitch: number;
    expression: number;
  };
}

export const mockSubmissions: Submission[] = [
  {
    id: 'sub-1',
    userId: 'user-2',
    userName: 'Sarah Martinez',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=150&h=150&fit=crop&crop=face',
    lessonId: 'lesson-1',
    lessonTitle: 'Understanding Diaphragmatic Breathing',
    projectId: 'project-1',
    projectTitle: 'Breathing Exercise Recording',
    submittedAt: '2024-01-18T10:30:00Z',
    status: 'pending_review',
    audioUrl: '/audio/submissions/sarah-breathing-exercise.mp3',
    duration: 125,
    notes: 'I found this exercise challenging at first, but I think I improved by the end. Looking forward to feedback!',
    tags: ['breathing', 'beginner', 'first-attempt']
  },
  {
    id: 'sub-2',
    userId: 'user-3',
    userName: 'Michael Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lessonId: 'lesson-1',
    lessonTitle: 'Understanding Diaphragmatic Breathing',
    projectId: 'project-1',
    projectTitle: 'Breathing Exercise Recording',
    submittedAt: '2024-01-17T14:15:00Z',
    status: 'reviewed',
    audioUrl: '/audio/submissions/michael-breathing-exercise.mp3',
    duration: 108,
    notes: 'Applying techniques from my performance background to the fundamentals.',
    rating: 9,
    tags: ['breathing', 'advanced', 'technique'],
    feedback: [
      {
        id: 'feedback-1',
        instructorId: 'instructor-1',
        instructorName: 'Dr. Sarah Williams',
        submissionId: 'sub-2',
        timestamp: '2024-01-17T16:30:00Z',
        type: 'praise',
        content: 'Excellent technique! Your diaphragmatic breathing is very controlled and consistent.',
        rating: 9
      },
      {
        id: 'feedback-2',
        instructorId: 'instructor-1',
        instructorName: 'Dr. Sarah Williams',
        submissionId: 'sub-2',
        timestamp: '2024-01-17T16:32:00Z',
        type: 'suggestion',
        content: 'Try to focus on even more relaxation in the shoulder area around the 45-second mark.',
        audioTimestamp: 45
      }
    ]
  },
  {
    id: 'sub-3',
    userId: 'user-4',
    userName: 'Emma Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lessonId: 'lesson-2',
    lessonTitle: 'Daily Breathing Exercises',
    projectId: 'project-2',
    projectTitle: 'Scale Practice Submission',
    submittedAt: '2024-01-16T09:45:00Z',
    status: 'in_review',
    audioUrl: '/audio/submissions/emma-scales-practice.mp3',
    duration: 167,
    notes: 'Working on maintaining breath support throughout the scales. Some notes feel easier than others.',
    tags: ['scales', 'breath-support', 'intermediate']
  },
  {
    id: 'sub-4',
    userId: 'user-1',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lessonId: 'lesson-3',
    lessonTitle: 'Breathing Assessment',
    projectId: 'project-3',
    projectTitle: 'Breathing Technique Evaluation',
    submittedAt: '2024-01-15T11:20:00Z',
    status: 'reviewed',
    audioUrl: '/audio/submissions/alex-breathing-assessment.mp3',
    duration: 145,
    notes: 'Trying to implement all the techniques learned so far. Hope my progress shows!',
    rating: 8,
    tags: ['assessment', 'progress-check', 'intermediate'],
    feedback: [
      {
        id: 'feedback-3',
        instructorId: 'instructor-1',
        instructorName: 'Dr. Sarah Williams',
        submissionId: 'sub-4',
        timestamp: '2024-01-15T15:45:00Z',
        type: 'comment',
        content: 'Great improvement since your first submission! Your breathing has become much more controlled.',
        rating: 8
      },
      {
        id: 'feedback-4',
        instructorId: 'instructor-1',
        instructorName: 'Dr. Sarah Williams',
        submissionId: 'sub-4',
        timestamp: '2024-01-15T15:47:00Z',
        type: 'correction',
        content: 'Watch your posture around the 1:20 mark - try to keep your spine aligned.',
        audioTimestamp: 80
      }
    ]
  },
  {
    id: 'sub-5',
    userId: 'user-2',
    userName: 'Sarah Martinez',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=150&h=150&fit=crop&crop=face',
    lessonId: 'lesson-4',
    lessonTitle: 'Basic Warm-up Routine',
    projectId: 'project-4',
    projectTitle: 'Warm-up Routine Practice',
    submittedAt: '2024-01-14T08:30:00Z',
    status: 'needs_revision',
    audioUrl: '/audio/submissions/sarah-warmup-routine.mp3',
    duration: 89,
    notes: 'First attempt at the full warm-up routine. Some exercises felt awkward.',
    rating: 6,
    tags: ['warm-up', 'first-attempt', 'needs-work'],
    feedback: [
      {
        id: 'feedback-5',
        instructorId: 'instructor-1',
        instructorName: 'Dr. Sarah Williams',
        submissionId: 'sub-5',
        timestamp: '2024-01-14T12:15:00Z',
        type: 'suggestion',
        content: 'Good effort! Focus on slowing down the lip trills - they should be more relaxed and controlled.',
        rating: 6
      },
      {
        id: 'feedback-6',
        instructorId: 'instructor-1',
        instructorName: 'Dr. Sarah Williams',
        submissionId: 'sub-5',
        timestamp: '2024-01-14T12:17:00Z',
        type: 'correction',
        content: 'The humming exercises need more breath support. Try the breathing exercises before attempting again.',
        audioTimestamp: 35
      }
    ]
  }
];

export const mockPeerReviews: PeerReview[] = [
  {
    id: 'peer-1',
    submissionId: 'sub-2',
    reviewerId: 'user-4',
    reviewerName: 'Emma Thompson',
    submittedAt: '2024-01-17T18:00:00Z',
    rating: 8,
    feedback: 'Really solid technique! I learned a lot just from listening to your approach.',
    helpful: true,
    categories: {
      technique: 9,
      rhythm: 8,
      pitch: 8,
      expression: 7
    }
  },
  {
    id: 'peer-2',
    submissionId: 'sub-4',
    reviewerId: 'user-3',
    reviewerName: 'Michael Chen',
    submittedAt: '2024-01-15T20:30:00Z',
    rating: 7,
    feedback: 'Nice progress! Your breathing control has definitely improved. Keep practicing the posture work.',
    helpful: true,
    categories: {
      technique: 7,
      rhythm: 8,
      pitch: 7,
      expression: 6
    }
  }
];

export const getSubmissionsByUserId = (userId: string): Submission[] => {
  return mockSubmissions.filter(sub => sub.userId === userId);
};

export const getSubmissionById = (submissionId: string): Submission | undefined => {
  return mockSubmissions.find(sub => sub.id === submissionId);
};

export const getSubmissionsByStatus = (status: Submission['status']): Submission[] => {
  return mockSubmissions.filter(sub => sub.status === status);
};

export const getSubmissionsByLessonId = (lessonId: string): Submission[] => {
  return mockSubmissions.filter(sub => sub.lessonId === lessonId);
};

export const getPeerReviewsBySubmissionId = (submissionId: string): PeerReview[] => {
  return mockPeerReviews.filter(review => review.submissionId === submissionId);
};

export const getInstructorFeedback = (submissionId: string): SubmissionFeedback[] => {
  const submission = getSubmissionById(submissionId);
  return submission?.feedback || [];
};

// Analytics functions
export const getSubmissionStats = () => {
  const totalSubmissions = mockSubmissions.length;
  const pendingReviews = getSubmissionsByStatus('pending_review').length;
  const inReview = getSubmissionsByStatus('in_review').length;
  const completed = getSubmissionsByStatus('reviewed').length;
  const needsRevision = getSubmissionsByStatus('needs_revision').length;

  const averageRating = mockSubmissions
    .filter(sub => sub.rating)
    .reduce((sum, sub) => sum + (sub.rating || 0), 0) / 
    mockSubmissions.filter(sub => sub.rating).length;

  return {
    totalSubmissions,
    pendingReviews,
    inReview,
    completed,
    needsRevision,
    averageRating: Math.round(averageRating * 10) / 10
  };
}; 
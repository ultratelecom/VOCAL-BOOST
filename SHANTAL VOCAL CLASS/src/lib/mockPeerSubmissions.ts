export interface PeerSubmission {
  id: string;
  studentName: string;
  studentAvatar?: string;
  lessonTitle: string;
  lessonType: 'breathing' | 'pitch' | 'tone' | 'rhythm';
  audioUrl: string;
  duration: number; // in seconds
  submittedAt: string;
  description: string;
  reviewsCount: number;
  isReviewedByCurrentUser: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface PeerReview {
  id: string;
  submissionId: string;
  reviewerName: string;
  reviewerAvatar?: string;
  rating: number; // 1-5 stars
  feedback: string;
  timestamp: string;
  isHelpful: boolean;
}

export const mockPeerSubmissions: PeerSubmission[] = [
  {
    id: 'sub-1',
    studentName: 'Sarah Chen',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=40&h=40&fit=crop&crop=face',
    lessonTitle: 'Diaphragmatic Breathing Exercise',
    lessonType: 'breathing',
    audioUrl: '/audio/breathing-exercise-1.mp3',
    duration: 45,
    submittedAt: '2 hours ago',
    description: 'First attempt at the 4-4-4 breathing pattern. Would love feedback on my technique!',
    reviewsCount: 3,
    isReviewedByCurrentUser: false,
    difficulty: 'beginner'
  },
  {
    id: 'sub-2',
    studentName: 'Marcus Johnson',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    lessonTitle: 'Scale Practice - C Major',
    lessonType: 'pitch',
    audioUrl: '/audio/scale-practice-c-major.mp3',
    duration: 62,
    submittedAt: '4 hours ago',
    description: 'Working on pitch accuracy. I think I\'m struggling with the higher notes.',
    reviewsCount: 5,
    isReviewedByCurrentUser: true,
    difficulty: 'intermediate'
  },
  {
    id: 'sub-3',
    studentName: 'Emma Rodriguez',
    studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    lessonTitle: 'Vowel Modification Exercise',
    lessonType: 'tone',
    audioUrl: '/audio/vowel-modification.mp3',
    duration: 38,
    submittedAt: '6 hours ago',
    description: 'Practicing vowel sounds for better tone quality. How does this sound?',
    reviewsCount: 2,
    isReviewedByCurrentUser: false,
    difficulty: 'intermediate'
  },
  {
    id: 'sub-4',
    studentName: 'David Kim',
    studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    lessonTitle: 'Rhythm Clapping Exercise',
    lessonType: 'rhythm',
    audioUrl: '/audio/rhythm-clapping.mp3',
    duration: 30,
    submittedAt: '1 day ago',
    description: 'Complex rhythm patterns from lesson 3. I\'m not sure if I got the syncopation right.',
    reviewsCount: 4,
    isReviewedByCurrentUser: false,
    difficulty: 'advanced'
  },
  {
    id: 'sub-5',
    studentName: 'Lisa Thompson',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=40&h=40&fit=crop&crop=face',
    lessonTitle: 'Lip Trill Warm-up',
    lessonType: 'breathing',
    audioUrl: '/audio/lip-trill-warmup.mp3',
    duration: 25,
    submittedAt: '1 day ago',
    description: 'Daily warm-up routine. Still working on consistency.',
    reviewsCount: 1,
    isReviewedByCurrentUser: false,
    difficulty: 'beginner'
  }
];

export const mockPeerReviews: PeerReview[] = [
  {
    id: 'review-1',
    submissionId: 'sub-1',
    reviewerName: 'Alex Johnson',
    reviewerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    rating: 4,
    feedback: 'Great breath control! I can really hear the improvement in your support. Try to keep your shoulders more relaxed on the inhale.',
    timestamp: '1 hour ago',
    isHelpful: true
  },
  {
    id: 'review-2',
    submissionId: 'sub-1',
    reviewerName: 'Maria Garcia',
    reviewerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    rating: 5,
    feedback: 'Excellent technique! Your breathing sounds very controlled and steady. Keep up the good work!',
    timestamp: '30 minutes ago',
    isHelpful: true
  },
  {
    id: 'review-3',
    submissionId: 'sub-2',
    reviewerName: 'Chris Wilson',
    reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    rating: 3,
    feedback: 'Good effort on the scales! The lower notes sound solid. For the higher notes, try opening your mouth a bit more and think about lifting your soft palate.',
    timestamp: '2 hours ago',
    isHelpful: true
  }
];

export const getPeerSubmissions = (limit?: number): PeerSubmission[] => {
  return limit ? mockPeerSubmissions.slice(0, limit) : mockPeerSubmissions;
};

export const getPeerReviewsForSubmission = (submissionId: string): PeerReview[] => {
  return mockPeerReviews.filter(review => review.submissionId === submissionId);
};

export const getSubmissionById = (id: string): PeerSubmission | undefined => {
  return mockPeerSubmissions.find(submission => submission.id === id);
}; 
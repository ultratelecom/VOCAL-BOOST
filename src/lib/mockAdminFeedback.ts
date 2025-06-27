export interface AdminFeedback {
  id: string;
  submissionId: string;
  studentId: string;
  studentName: string;
  instructorId: string;
  instructorName: string;
  lessonTitle: string;
  audioUrl: string;
  submittedAt: string;
  feedback: {
    overall: string;
    technique: string;
    improvements: string;
    strengths: string;
  };
  scores: {
    technique: number; // 1-10
    pitchAccuracy: number; // 1-10
    rhythm: number; // 1-10
    expression: number; // 1-10
    overall: number; // 1-10
  };
  status: 'pending' | 'reviewed' | 'published';
  reviewedAt?: string;
  isVoiceReply: boolean;
  voiceReplyUrl?: string;
}

export const mockAdminFeedback: AdminFeedback[] = [
  {
    id: 'feedback-1',
    submissionId: 'sub-1',
    studentId: 'user-1',
    studentName: 'Alex Johnson',
    instructorId: 'instructor-1',
    instructorName: 'Dr. Sarah Williams',
    lessonTitle: 'Breathing Fundamentals',
    audioUrl: '/audio/breathing-exercise-1.mp3',
    submittedAt: '2024-01-19T10:30:00Z',
    feedback: {
      overall: 'Excellent progress! Your diaphragmatic breathing technique shows significant improvement.',
      technique: 'Great control of breath flow. Focus on maintaining consistent support throughout longer phrases.',
      improvements: 'Work on relaxing the shoulders more during inhalation. Try practicing in front of a mirror.',
      strengths: 'Strong understanding of the fundamentals. Very consistent rhythm and control.'
    },
    scores: {
      technique: 8,
      pitchAccuracy: 9,
      rhythm: 9,
      expression: 7,
      overall: 8
    },
    status: 'published',
    reviewedAt: '2024-01-19T14:20:00Z',
    isVoiceReply: false
  },
  {
    id: 'feedback-2',
    submissionId: 'sub-2',
    studentId: 'user-2',
    studentName: 'Sarah Chen',
    instructorId: 'instructor-1',
    instructorName: 'Dr. Sarah Williams',
    lessonTitle: 'Scale Practice - C Major',
    audioUrl: '/audio/scale-practice-c-major.mp3',
    submittedAt: '2024-01-19T15:45:00Z',
    feedback: {
      overall: 'Good effort on the scales! There are some areas we can work on to improve your pitch accuracy.',
      technique: 'Your breathing support is good. Let\'s focus on vowel placement for better resonance.',
      improvements: 'Practice scales more slowly first, then gradually increase tempo. Focus on pitch accuracy over speed.',
      strengths: 'Nice steady tempo and good effort. Your lower register sounds very solid.'
    },
    scores: {
      technique: 6,
      pitchAccuracy: 5,
      rhythm: 7,
      expression: 6,
      overall: 6
    },
    status: 'reviewed',
    reviewedAt: '2024-01-20T09:15:00Z',
    isVoiceReply: true,
    voiceReplyUrl: '/audio/instructor-feedback-2.mp3'
  },
  {
    id: 'feedback-3',
    submissionId: 'sub-3',
    studentId: 'user-4',
    studentName: 'Emma Rodriguez',
    instructorId: 'instructor-2',
    instructorName: 'Prof. Michael Davis',
    lessonTitle: 'Vowel Modification Exercise',
    audioUrl: '/audio/vowel-modification.mp3',
    submittedAt: '2024-01-20T08:20:00Z',
    feedback: {
      overall: '',
      technique: '',
      improvements: '',
      strengths: ''
    },
    scores: {
      technique: 0,
      pitchAccuracy: 0,
      rhythm: 0,
      expression: 0,
      overall: 0
    },
    status: 'pending',
    isVoiceReply: false
  },
  {
    id: 'feedback-4',
    submissionId: 'sub-4',
    studentId: 'user-3',
    studentName: 'Marcus Johnson',
    instructorId: 'instructor-2',
    instructorName: 'Prof. Michael Davis',
    lessonTitle: 'Advanced Vibrato Technique',
    audioUrl: '/audio/vibrato-technique.mp3',
    submittedAt: '2024-01-18T16:30:00Z',
    feedback: {
      overall: 'Outstanding work! Your vibrato control has improved dramatically. This is professional-level technique.',
      technique: 'Excellent laryngeal control. The speed and width of your vibrato are very well controlled.',
      improvements: 'Continue working on seamless transitions between straight tone and vibrato.',
      strengths: 'Natural vibrato development, consistent throughout your range, excellent musical expression.'
    },
    scores: {
      technique: 10,
      pitchAccuracy: 9,
      rhythm: 10,
      expression: 10,
      overall: 10
    },
    status: 'published',
    reviewedAt: '2024-01-19T11:45:00Z',
    isVoiceReply: true,
    voiceReplyUrl: '/audio/instructor-feedback-4.mp3'
  }
];

export const getPendingFeedback = (): AdminFeedback[] => {
  return mockAdminFeedback.filter(feedback => feedback.status === 'pending');
};

export const getRecentFeedback = (limit: number = 10): AdminFeedback[] => {
  return mockAdminFeedback
    .filter(feedback => feedback.status !== 'pending')
    .sort((a, b) => new Date(b.reviewedAt || '').getTime() - new Date(a.reviewedAt || '').getTime())
    .slice(0, limit);
};

export const getFeedbackByStudent = (studentId: string): AdminFeedback[] => {
  return mockAdminFeedback.filter(feedback => feedback.studentId === studentId);
};

export const getFeedbackStats = () => {
  return {
    total: mockAdminFeedback.length,
    pending: mockAdminFeedback.filter(f => f.status === 'pending').length,
    reviewed: mockAdminFeedback.filter(f => f.status === 'reviewed').length,
    published: mockAdminFeedback.filter(f => f.status === 'published').length,
    averageScore: Math.round(
      mockAdminFeedback
        .filter(f => f.status !== 'pending')
        .reduce((sum, f) => sum + f.scores.overall, 0) / 
      mockAdminFeedback.filter(f => f.status !== 'pending').length
    )
  };
}; 
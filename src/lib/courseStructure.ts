export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'form' | 'checklist';
  description: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  moduleId: string;
  orderIndex: number;
  prerequisites?: string[];
  content: any; // Specific to lesson type
  skills: string[];
  isCompleted?: boolean;
  progress?: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: number; // total minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  courseId: string;
  orderIndex: number;
  lessons: Lesson[];
  isUnlocked?: boolean;
  completionRate?: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  totalDuration: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  modules: Module[];
  enrollmentCount: number;
  rating: number;
  skills: string[];
}

export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Vocal Fundamentals',
    description: 'Master the basics of vocal technique and breathing',
    instructor: 'Dr. Sarah Williams',
    totalDuration: 12,
    difficulty: 'beginner',
    enrollmentCount: 234,
    rating: 4.8,
    skills: ['Breathing', 'Posture', 'Basic Technique', 'Vocal Health'],
    modules: [
      {
        id: 'module-1',
        title: 'Breathing Foundation',
        description: 'Learn proper breathing techniques for vocal performance',
        duration: 120,
        difficulty: 'beginner',
        courseId: 'course-1',
        orderIndex: 1,
        isUnlocked: true,
        completionRate: 85,
        lessons: [
          {
            id: 'lesson-1',
            title: 'Understanding Diaphragmatic Breathing',
            type: 'video',
            description: 'Introduction to proper breathing for singers',
            duration: 15,
            difficulty: 'beginner',
            moduleId: 'module-1',
            orderIndex: 1,
            skills: ['Breathing', 'Anatomy'],
            isCompleted: true,
            progress: 100,
            content: {
              videoUrl: '/videos/breathing-fundamentals.mp4',
              transcript: 'Welcome to vocal breathing fundamentals...',
              keyPoints: [
                'Diaphragmatic breathing is the foundation',
                'Practice daily for muscle memory',
                'Avoid shallow chest breathing'
              ],
              exercises: [
                'Lie down and practice belly breathing',
                'Count breathing rhythm: 4 in, 4 hold, 4 out',
                'Practice while standing with good posture'
              ]
            }
          },
          {
            id: 'lesson-2',
            title: 'Daily Breathing Exercises',
            type: 'checklist',
            description: 'Complete daily breathing routine',
            duration: 10,
            difficulty: 'beginner',
            moduleId: 'module-1',
            orderIndex: 2,
            skills: ['Breathing', 'Daily Practice'],
            isCompleted: false,
            progress: 60,
            content: {
              items: [
                { id: 1, text: 'Posture check - shoulders relaxed', completed: true },
                { id: 2, text: 'Diaphragmatic breathing - 10 cycles', completed: true },
                { id: 3, text: 'Rib expansion exercise', completed: true },
                { id: 4, text: 'Breath hold exercise - 5 repetitions', completed: false },
                { id: 5, text: 'Cool down with gentle stretches', completed: false }
              ]
            }
          },
          {
            id: 'lesson-3',
            title: 'Breathing Assessment',
            type: 'form',
            description: 'Record and submit your breathing exercise',
            duration: 20,
            difficulty: 'beginner',
            moduleId: 'module-1',
            orderIndex: 3,
            skills: ['Breathing', 'Self-Assessment'],
            isCompleted: false,
            progress: 0,
            content: {
              instructions: 'Record yourself performing the breathing exercises',
              submissionType: 'audio',
              maxDuration: 300,
              criteria: [
                'Proper diaphragmatic breathing',
                'Consistent rhythm',
                'Relaxed posture'
              ]
            }
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Vocal Warm-ups',
        description: 'Essential warm-up routines for vocal practice',
        duration: 90,
        difficulty: 'beginner',
        courseId: 'course-1',
        orderIndex: 2,
        isUnlocked: true,
        completionRate: 30,
        lessons: [
          {
            id: 'lesson-4',
            title: 'Basic Warm-up Routine',
            type: 'video',
            description: 'Learn the essential warm-up exercises',
            duration: 20,
            difficulty: 'beginner',
            moduleId: 'module-2',
            orderIndex: 1,
            skills: ['Warm-up', 'Vocal Health'],
            isCompleted: false,
            progress: 0,
            content: {
              videoUrl: '/videos/vocal-warmups.mp4',
              exercises: [
                'Lip trills',
                'Humming scales',
                'Tongue twisters',
                'Sirens'
              ]
            }
          }
        ]
      },
      {
        id: 'module-3',
        title: 'Pitch Control',
        description: 'Develop accurate pitch and intonation',
        duration: 150,
        difficulty: 'intermediate',
        courseId: 'course-1',
        orderIndex: 3,
        isUnlocked: false,
        completionRate: 0,
        lessons: [
          {
            id: 'lesson-5',
            title: 'Interval Training',
            type: 'video',
            description: 'Practice singing accurate intervals',
            duration: 25,
            difficulty: 'intermediate',
            moduleId: 'module-3',
            orderIndex: 1,
            skills: ['Pitch Control', 'Ear Training'],
            content: {
              videoUrl: '/videos/interval-training.mp4'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    title: 'Advanced Vocal Techniques',
    description: 'Master advanced vocal techniques and performance skills',
    instructor: 'Prof. Michael Davis',
    totalDuration: 20,
    difficulty: 'advanced',
    enrollmentCount: 89,
    rating: 4.9,
    skills: ['Vibrato', 'Runs & Riffs', 'Performance', 'Style'],
    modules: [
      {
        id: 'module-4',
        title: 'Vibrato Development',
        description: 'Learn to develop and control vibrato',
        duration: 180,
        difficulty: 'advanced',
        courseId: 'course-2',
        orderIndex: 1,
        isUnlocked: false,
        completionRate: 0,
        lessons: []
      }
    ]
  }
];

export const getLessonById = (lessonId: string): Lesson | undefined => {
  for (const course of mockCourses) {
    for (const module of course.modules) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
  }
  return undefined;
};

export const getModuleById = (moduleId: string): Module | undefined => {
  for (const course of mockCourses) {
    const module = course.modules.find(m => m.id === moduleId);
    if (module) return module;
  }
  return undefined;
};

export const getCourseById = (courseId: string): Course | undefined => {
  return mockCourses.find(course => course.id === courseId);
};

export const getNextLesson = (currentLessonId: string): Lesson | undefined => {
  const currentLesson = getLessonById(currentLessonId);
  if (!currentLesson) return undefined;

  const module = getModuleById(currentLesson.moduleId);
  if (!module) return undefined;

  const currentIndex = module.lessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex < module.lessons.length - 1) {
    return module.lessons[currentIndex + 1];
  }

  // Look for next module's first lesson
  const course = getCourseById(module.courseId);
  if (!course) return undefined;

  const moduleIndex = course.modules.findIndex(m => m.id === module.id);
  if (moduleIndex < course.modules.length - 1) {
    const nextModule = course.modules[moduleIndex + 1];
    return nextModule.lessons[0];
  }

  return undefined;
}; 
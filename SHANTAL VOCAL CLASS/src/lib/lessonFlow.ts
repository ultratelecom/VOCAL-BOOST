export interface LessonFlowItem {
  id: string;
  title: string;
  type: 'intro' | 'assignment';
  content?: string;
  assignmentId?: string;
}

export interface ModuleFlow {
  module: string;
  title: string;
  lessons: LessonFlowItem[];
}

export const lessonFlow: ModuleFlow[] = [
  {
    module: "1",
    title: "Foundation of Singing, Listening and Your Voice",
    lessons: [
      {
        id: "1-intro",
        title: "Welcome to the Vocal Boost",
        type: "intro",
        content: "Welcome to your first day of the vocal boost! You should have already done your daily warm ups. Today we're going to start with understanding your voice and building the foundation for your vocal journey. This module will help you discover your unique vocal qualities and begin developing your listening skills through mimicking exercises."
      },
      {
        id: "1a",
        title: "Sharing Your Voice and Story",
        type: "assignment",
        assignmentId: "1a"
      },
      {
        id: "1b",
        title: "Listening and Mimicking",
        type: "assignment",
        assignmentId: "1b"
      },
      {
        id: "1c",
        title: "Mimicking Advanced",
        type: "assignment",
        assignmentId: "1c"
      }
    ]
  },
  {
    module: "2",
    title: "Storytelling, Soul and Intention",
    lessons: [
      {
        id: "2-intro",
        title: "Introduction to Soul Singing",
        type: "intro",
        content: "In this part of the cycle, we explore strategies and methods necessary to connect with a song and with an audience. You'll learn how to infuse your performances with genuine emotion and develop your unique artistic voice. This module focuses on the deeper aspects of vocal performance - the soul and intention behind every note you sing."
      },
      {
        id: "2a",
        title: "Techniques of Soul",
        type: "assignment",
        assignmentId: "2a"
      },
      {
        id: "2b",
        title: "Uncovering Soul",
        type: "assignment",
        assignmentId: "2b"
      },
      {
        id: "2c",
        title: "Connecting with Emotion",
        type: "assignment",
        assignmentId: "2c"
      },
      {
        id: "2d",
        title: "Song Selection and Storytelling",
        type: "assignment",
        assignmentId: "2d"
      }
    ]
  },
  {
    module: "3",
    title: "Learning Your Final Song",
    lessons: [
      {
        id: "3-intro",
        title: "Getting Ready for Your Final Performance",
        type: "intro",
        content: "In this part of the class, you are going to focus on perfecting one song. This is where everything comes together - your technical skills, emotional connection, and unique artistic voice. You'll work through multiple checkpoints to ensure your final performance showcases all the growth and learning from the previous modules."
      },
      {
        id: "3a",
        title: "Final Song – Checkpoint 1",
        type: "assignment",
        assignmentId: "3a"
      },
      {
        id: "3b",
        title: "Final Song – Checkpoint 2",
        type: "assignment",
        assignmentId: "3b"
      },
      {
        id: "3c",
        title: "Your Final Performance",
        type: "assignment",
        assignmentId: "3c"
      }
    ]
  }
];

export const getModuleById = (moduleId: string): ModuleFlow | undefined => {
  return lessonFlow.find(module => module.module === moduleId);
};

export const getLessonById = (moduleId: string, lessonId: string): LessonFlowItem | undefined => {
  const module = getModuleById(moduleId);
  return module?.lessons.find(lesson => lesson.id === lessonId);
};

export const getNextLesson = (moduleId: string, lessonId: string): { moduleId: string; lessonId: string } | null => {
  const module = getModuleById(moduleId);
  if (!module) return null;

  const currentIndex = module.lessons.findIndex(lesson => lesson.id === lessonId);
  
  // Check if there's a next lesson in the same module
  if (currentIndex < module.lessons.length - 1) {
    return {
      moduleId: moduleId,
      lessonId: module.lessons[currentIndex + 1].id
    };
  }

  // Check if there's a next module
  const moduleIndex = lessonFlow.findIndex(m => m.module === moduleId);
  if (moduleIndex < lessonFlow.length - 1) {
    const nextModule = lessonFlow[moduleIndex + 1];
    return {
      moduleId: nextModule.module,
      lessonId: nextModule.lessons[0].id
    };
  }

  return null;
};

export const getAllModules = (): ModuleFlow[] => {
  return lessonFlow;
}; 
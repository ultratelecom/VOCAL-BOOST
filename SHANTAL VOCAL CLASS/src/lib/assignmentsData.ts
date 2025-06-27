export interface Assignment {
  id: string;
  module: string;
  title: string;
  description: string;
  uploadType: string[];
}

export const assignments: Assignment[] = [
  {
    id: "1a",
    module: "1",
    title: "Sharing Your Voice and Story",
    description: "Introduce yourself via text or video, share your vocal journey, and sing a small section of a song you love. This is your ice-breaker to open up to the process.",
    uploadType: ["audio", "video", "text"]
  },
  {
    id: "1b",
    module: "1",
    title: "Listening and Mimicking",
    description: "Choose 6 artists and mimic short sections from their songs. Submit a video or audio for each artist and describe what was easy, hard, and what you learned.",
    uploadType: ["audio", "video", "text"]
  },
  {
    id: "1c",
    module: "1",
    title: "Mimicking Advanced",
    description: "Pick 3 artists that stretch your voice. Mimic them and record 3 separate sessions. Focus on expanding vocal range and control.",
    uploadType: ["audio", "video", "text"]
  },
  {
    id: "2a",
    module: "2",
    title: "Techniques of Soul",
    description: "Apply soul techniques (volume, pitch, breath, vibrato) to a song. Record your soulful version and describe the choices you made.",
    uploadType: ["audio", "video", "text"]
  },
  {
    id: "2b",
    module: "2",
    title: "Uncovering Soul",
    description: "Perform a section of a song in your own voice. Focus on expression and delivery. Submit with commentary on how you added emotion.",
    uploadType: ["audio", "video", "text"]
  },
  {
    id: "2c",
    module: "2",
    title: "Connecting With Emotion",
    description: "Pick a song that connects to your personal story. Record your interpretation and explain how it relates to your emotions.",
    uploadType: ["audio", "video", "text"]
  },
  {
    id: "2d",
    module: "2",
    title: "Song Selection and Storytelling",
    description: "Select 4 songs for your voice based on your character and vocal identity. Upload short demos and explain why each song fits you.",
    uploadType: ["audio", "video", "text"]
  },
  {
    id: "3a",
    module: "3",
    title: "Final Song – Checkpoint 1",
    description: "Start learning and breaking down your final song. Submit a first draft of your performance.",
    uploadType: ["audio", "video", "text"]
  },
  {
    id: "3b",
    module: "3",
    title: "Final Song – Checkpoint 2",
    description: "Continue practicing and improving. Submit your second checkpoint performance.",
    uploadType: ["audio", "video", "text"]
  },
  {
    id: "3c",
    module: "3",
    title: "Your Final Performance",
    description: "Upload your complete final performance. This is your final showcase — vocals, performance, and story.",
    uploadType: ["audio", "video", "text"]
  }
];

export const getAssignmentById = (id: string): Assignment | undefined => {
  return assignments.find(assignment => assignment.id === id);
};

export const getAssignmentsByModule = (module: string): Assignment[] => {
  return assignments.filter(assignment => assignment.module === module);
};

export const getModules = (): string[] => {
  const modules = assignments.map(assignment => assignment.module);
  return Array.from(new Set(modules)).sort();
}; 
export interface PeerSubmission {
  id: string
  name: string
  avatar: string
  audioUrl?: string
  videoUrl?: string
  text?: string
  submissionType: 'audio' | 'video' | 'text'
  timestamp: string
  likes: number
  comments: PeerComment[]
}

export interface PeerComment {
  id: string
  author: string
  authorAvatar: string
  comment: string
  timestamp: string
}

export const peerReviewData: Record<string, PeerSubmission[]> = {
  "1a": [
    {
      id: "p1",
      name: "Ava Johnson",
      avatar: "/avatars/ava.png",
      audioUrl: "/audio/ava-1a.mp3",
      text: "I focused on clarity and emotion here. This was my first time really sharing my voice publicly, and I chose 'Hallelujah' by Leonard Cohen. I've always loved this song for its raw emotional depth.",
      submissionType: "audio",
      timestamp: "2 hours ago",
      likes: 12,
      comments: [
        {
          id: "c1",
          author: "Jordan Lee",
          authorAvatar: "/avatars/jordan.png",
          comment: "Beautiful tone! Your emotion really comes through. Have you tried adding more vibrato in the chorus?",
          timestamp: "1 hour ago"
        },
        {
          id: "c2",
          author: "Sam Green",
          authorAvatar: "/avatars/sam.png",
          comment: "This gave me chills! Love your interpretation of this classic.",
          timestamp: "45 minutes ago"
        }
      ]
    },
    {
      id: "p2",
      name: "Jordan Lee",
      avatar: "/avatars/jordan.png",
      videoUrl: "/video/jordan-1a.mp4",
      text: "This was tough, but I love the song! I went with 'Someone You Loved' by Lewis Capaldi. The vulnerability in this song really speaks to me, and I wanted to challenge myself with the higher notes.",
      submissionType: "video",
      timestamp: "3 hours ago",
      likes: 8,
      comments: [
        {
          id: "c3",
          author: "Ava Johnson",
          authorAvatar: "/avatars/ava.png",
          comment: "Your stage presence is amazing! I can see how much this song means to you.",
          timestamp: "2 hours ago"
        }
      ]
    },
    {
      id: "p3",
      name: "Maya Patel",
      avatar: "/avatars/maya.png",
      audioUrl: "/audio/maya-1a.mp3",
      text: "I decided to share 'Rise Up' by Andra Day. This song always gives me strength during difficult times. My vocal journey started during a challenging period in my life, and music became my healing.",
      submissionType: "audio",
      timestamp: "5 hours ago",
      likes: 15,
      comments: [
        {
          id: "c4",
          author: "Carlos Rodriguez",
          authorAvatar: "/avatars/carlos.png",
          comment: "So powerful! Your story really adds depth to your performance.",
          timestamp: "3 hours ago"
        }
      ]
    },
    {
      id: "p4",
      name: "Carlos Rodriguez",
      avatar: "/avatars/carlos.png",
      text: "I chose to write about my connection to 'La Vie En Rose' by Édith Piaf. Growing up bilingual, this song represents the beauty of expressing emotion in different languages. I didn't record this time but wanted to share my story and preparation process.",
      submissionType: "text",
      timestamp: "1 day ago",
      likes: 6,
      comments: []
    }
  ],
  "1b": [
    {
      id: "p5",
      name: "Sam Green",
      avatar: "/avatars/sam.png",
      audioUrl: "/audio/sam-1b.mp3",
      text: "Mimicking Rihanna was a challenge! I worked on 'Stay', 'Love on the Brain', and 'Diamonds'. Each song showed different aspects of her style - from vulnerable to powerful to pop perfection.",
      submissionType: "audio",
      timestamp: "4 hours ago",
      likes: 10,
      comments: [
        {
          id: "c5",
          author: "Ava Johnson",
          authorAvatar: "/avatars/ava.png",
          comment: "Your Rihanna impression is spot on! I love how you captured her unique vocal runs.",
          timestamp: "2 hours ago"
        }
      ]
    },
    {
      id: "p6",
      name: "Taylor Swift",
      avatar: "/avatars/taylor.png",
      videoUrl: "/video/taylor-1b.mp4",
      text: "I chose to mimic Billie Eilish, Adele, and John Legend. The contrast between Billie's whisper-soft style and Adele's powerhouse vocals was incredible to explore. John Legend taught me about smooth R&B phrasing.",
      submissionType: "video",
      timestamp: "6 hours ago",
      likes: 18,
      comments: [
        {
          id: "c6",
          author: "Jordan Lee",
          authorAvatar: "/avatars/jordan.png",
          comment: "The range you showed here is incredible! Your Adele impression gave me goosebumps.",
          timestamp: "4 hours ago"
        }
      ]
    }
  ],
  "1c": [
    {
      id: "p7",
      name: "Alex Chen",
      avatar: "/avatars/alex.png",
      audioUrl: "/audio/alex-1c.mp3",
      text: "Advanced mimicking with Mariah Carey, Whitney Houston, and Beyoncé. These three legends pushed my vocal range to its absolute limits. The whistle notes were... an experience!",
      submissionType: "audio",
      timestamp: "2 hours ago",
      likes: 22,
      comments: [
        {
          id: "c7",
          author: "Maya Patel",
          authorAvatar: "/avatars/maya.png",
          comment: "Those whistle notes! 🤯 How long did it take you to get those Mariah runs down?",
          timestamp: "1 hour ago"
        }
      ]
    }
  ],
  "2a": [
    {
      id: "p8",
      name: "Luna Rodriguez",
      avatar: "/avatars/luna.png",
      videoUrl: "/video/luna-2a.mp4",
      text: "Applied soul techniques to 'A Change Is Gonna Come' by Sam Cooke. I worked on volume dynamics, controlled vibrato, and breath support to convey the civil rights message with the respect it deserves.",
      submissionType: "video",
      timestamp: "1 hour ago",
      likes: 16,
      comments: []
    }
  ],
  "2b": [
    {
      id: "p9",
      name: "Kai Johnson",
      avatar: "/avatars/kai.png",
      audioUrl: "/audio/kai-2b.mp3",
      text: "Uncovering soul in 'What's Going On' by Marvin Gaye. I focused on finding my own voice within this classic while honoring the original's social consciousness and smooth delivery.",
      submissionType: "audio",
      timestamp: "3 hours ago",
      likes: 11,
      comments: [
        {
          id: "c8",
          author: "Alex Chen",
          authorAvatar: "/avatars/alex.png",
          comment: "Your interpretation brings new life to this classic. Love the modern touches you added!",
          timestamp: "1 hour ago"
        }
      ]
    }
  ],
  "3a": [
    {
      id: "p10",
      name: "River Thompson",
      avatar: "/avatars/river.png",
      videoUrl: "/video/river-3a.mp4",
      text: "First checkpoint for my final song: 'Imagine' by John Lennon. I'm focusing on the message of peace and hope, working on my storytelling through vocal dynamics and emotional connection.",
      submissionType: "video",
      timestamp: "5 hours ago",
      likes: 14,
      comments: [
        {
          id: "c9",
          author: "Luna Rodriguez",
          authorAvatar: "/avatars/luna.png",
          comment: "Beautiful song choice! Your voice suits this message perfectly. Can't wait to see your final performance.",
          timestamp: "3 hours ago"
        }
      ]
    }
  ]
};

export const getPeerSubmissions = (assignmentId: string): PeerSubmission[] => {
  return peerReviewData[assignmentId] || [];
};

export const addPeerComment = (assignmentId: string, submissionId: string, comment: PeerComment): void => {
  const submissions = peerReviewData[assignmentId];
  if (submissions) {
    const submission = submissions.find(s => s.id === submissionId);
    if (submission) {
      submission.comments.push(comment);
    }
  }
};

export const likePeerSubmission = (assignmentId: string, submissionId: string): void => {
  const submissions = peerReviewData[assignmentId];
  if (submissions) {
    const submission = submissions.find(s => s.id === submissionId);
    if (submission) {
      submission.likes += 1;
    }
  }
}; 
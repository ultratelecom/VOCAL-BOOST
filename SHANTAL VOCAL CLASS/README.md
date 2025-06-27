# 🎤 Vocal Training Platform

A comprehensive web-based vocal training platform built with Next.js, TypeScript, and TailwindCSS. This platform provides students with interactive lessons, audio recording capabilities, peer review features, and instructor feedback tools.

## ✨ Features

### 🎯 Core Features
- **Interactive Lessons**: Video, form-based, and checklist lessons
- **Audio Recording**: Built-in audio recorder with waveform visualization
- **Progress Tracking**: Real-time progress monitoring and analytics
- **Peer Review System**: Students can review each other's submissions
- **Instructor Dashboard**: Comprehensive admin tools for feedback and management
- **Comment System**: Threaded comments with audio timestamps
- **User Authentication**: Login/signup with role-based access

### 📱 User Interface
- **Responsive Design**: Mobile-first, works on all devices
- **Modern UI**: Clean, intuitive interface with TailwindCSS
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Dark Mode Ready**: Prepared for future dark mode implementation

### 🔧 Technical Features
- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Modular, reusable components
- **State Management**: React hooks and local state management
- **Audio Processing**: Real-time audio recording and playback
- **File Upload**: Secure audio file handling and validation

## 🏗️ Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── login/page.tsx         # Login page
│   ├── signup/page.tsx        # Signup page
│   ├── dashboard/page.tsx     # Main dashboard
│   ├── lesson/[lessonId]/     # Dynamic lesson pages
│   ├── submit/[projectId]/    # Submission pages
│   └── admin/page.tsx         # Admin dashboard
├── components/                # Reusable UI components
│   ├── Layout.tsx            # Main layout wrapper
│   ├── Lesson/               # Lesson-specific components
│   │   ├── VideoLesson.tsx   # Video-based lessons
│   │   ├── FormLesson.tsx    # Form-based lessons
│   │   └── ChecklistLesson.tsx # Checklist lessons
│   ├── Audio/                # Audio handling components
│   │   ├── AudioRecorder.tsx # Recording functionality
│   │   └── WaveformPlayer.tsx # Audio playback with waveform
│   ├── Comments/             # Comment system
│   │   ├── CommentThread.tsx # Threaded comments
│   │   └── CommentBox.tsx    # Comment composition
│   ├── Admin/                # Admin tools
│   │   ├── AdminFeedbackPanel.tsx
│   │   └── UserSubmissionList.tsx
│   └── PeerReview/           # Peer review system
│       └── PeerSubmissionCard.tsx
├── lib/                      # Utilities and mock data
│   ├── utils.ts             # Helper functions
│   ├── mockUser.ts          # User data models
│   ├── courseStructure.ts   # Course and lesson models
│   └── mockSubmissions.ts   # Submission data models
└── styles/
    └── global.css           # Global styles and utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd "SHANTAL VOCAL CLASS"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📋 Pages & Routes

### Public Routes
- `/login` - User authentication
- `/signup` - New user registration

### Protected Routes
- `/dashboard` - Main student dashboard
- `/lesson/[lessonId]` - Individual lesson pages
- `/submit/[projectId]` - Assignment submission
- `/admin` - Instructor dashboard (admin only)

## 🎯 Key Components

### AudioRecorder
Advanced audio recording component with:
- Real-time audio level monitoring
- Recording controls (start, pause, resume, stop)
- Playback functionality
- Duration limits and progress tracking

### WaveformPlayer
Interactive audio player featuring:
- Visual waveform representation
- Click-to-seek functionality
- Playback speed control
- Volume control

### Lesson Components
Three types of interactive lessons:
- **VideoLesson**: Video content with progress tracking
- **FormLesson**: Assignment submission with audio recording
- **ChecklistLesson**: Practice sessions with timed exercises

### Comment System
Comprehensive feedback system:
- Threaded replies
- Audio timestamp references
- Multiple comment types (praise, suggestion, correction)
- Real-time feedback

## 🎨 Styling & Design

- **TailwindCSS**: Utility-first CSS framework
- **Custom Components**: Consistent design system
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliant
- **Custom Animations**: Smooth transitions and micro-interactions

## 📊 Mock Data

The platform includes comprehensive mock data for development:

### Users
- Student profiles with progress tracking
- Instructor accounts with admin privileges
- Avatar management and user preferences

### Courses & Lessons
- Structured course curriculum
- Multiple lesson types and difficulty levels
- Progress tracking and prerequisites

### Submissions & Reviews
- Student assignment submissions
- Peer review system
- Instructor feedback and ratings

## 🔒 Security Features

- Input validation and sanitization
- File type and size restrictions
- XSS protection
- CSRF protection (ready for backend integration)

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add your backend API URLs here
```

## 🧪 Testing

The application includes:
- TypeScript type checking
- ESLint for code quality
- Component testing structure (ready for implementation)

## 🔮 Future Enhancements

### Phase 1
- [ ] Real backend integration (Supabase/Firebase)
- [ ] User authentication system
- [ ] File upload to cloud storage

### Phase 2
- [ ] Real-time collaboration features
- [ ] Advanced audio analysis
- [ ] Mobile app (React Native)

### Phase 3
- [ ] AI-powered feedback
- [ ] Voice analysis and coaching
- [ ] Advanced analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Audio processing with Web Audio API
- Icons from various emoji sets

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Happy Learning! 🎵** 
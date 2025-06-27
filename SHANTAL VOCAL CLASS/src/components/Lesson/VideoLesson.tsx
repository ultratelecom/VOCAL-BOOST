'use client';

import { useState, useRef, useEffect } from 'react';

interface VideoLessonProps {
  lesson: {
    id: string;
    title: string;
    content: {
      videoUrl: string;
      transcript?: string;
      keyPoints?: string[];
      exercises?: string[];
    };
  };
  progress: number;
  onProgressUpdate: (progress: number) => void;
}

export default function VideoLesson({ lesson, progress, onProgressUpdate }: VideoLessonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // Update progress based on video completion
      if (video.duration > 0) {
        const watchProgress = Math.floor((video.currentTime / video.duration) * 100);
        onProgressUpdate(Math.max(progress, watchProgress));
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [progress, onProgressUpdate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = seekTime;
  };

  const markSectionComplete = (section: string) => {
    const newCompleted = new Set(completedSections);
    newCompleted.add(section);
    setCompletedSections(newCompleted);
    
    // Update progress if all sections are complete
    const totalSections = 3; // video, key points, exercises
    const completionProgress = Math.floor((newCompleted.size / totalSections) * 100);
    onProgressUpdate(Math.max(progress, completionProgress));
  };

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full aspect-video"
          src="/videos/sample-vocal-lesson.mp4" // Placeholder video
          poster="/images/video-thumbnail.jpg"
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Custom Controls */}
        <div className="bg-gray-900 text-white p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlayPause}
              className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                value={duration > 0 ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors text-sm"
            >
              {showTranscript ? 'Hide' : 'Show'} Transcript
            </button>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Points */}
        {lesson.content.keyPoints && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Key Points</h3>
              <button
                onClick={() => markSectionComplete('keyPoints')}
                disabled={completedSections.has('keyPoints')}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  completedSections.has('keyPoints')
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {completedSections.has('keyPoints') ? '✓ Reviewed' : 'Mark as Reviewed'}
              </button>
            </div>
            <ul className="space-y-2">
              {lesson.content.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Practice Exercises */}
        {lesson.content.exercises && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Practice Exercises</h3>
              <button
                onClick={() => markSectionComplete('exercises')}
                disabled={completedSections.has('exercises')}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  completedSections.has('exercises')
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {completedSections.has('exercises') ? '✓ Completed' : 'Mark as Complete'}
              </button>
            </div>
            <div className="space-y-3">
              {lesson.content.exercises.map((exercise, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <span className="text-blue-600 font-semibold mr-2 mt-1">{index + 1}.</span>
                    <span className="text-gray-700">{exercise}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Transcript */}
      {showTranscript && lesson.content.transcript && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Video Transcript</h3>
            <button
              onClick={() => markSectionComplete('transcript')}
              disabled={completedSections.has('transcript')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                completedSections.has('transcript')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {completedSections.has('transcript') ? '✓ Read' : 'Mark as Read'}
            </button>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{lesson.content.transcript}</p>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Lesson Progress</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Video watched</span>
            <span className={`text-sm font-medium ${
              progress >= 90 ? 'text-green-600' : 'text-gray-400'
            }`}>
              {progress >= 90 ? '✓ Complete' : `${Math.floor((currentTime / duration) * 100) || 0}%`}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Key points reviewed</span>
            <span className={`text-sm font-medium ${
              completedSections.has('keyPoints') ? 'text-green-600' : 'text-gray-400'
            }`}>
              {completedSections.has('keyPoints') ? '✓ Complete' : 'Pending'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Exercises completed</span>
            <span className={`text-sm font-medium ${
              completedSections.has('exercises') ? 'text-green-600' : 'text-gray-400'
            }`}>
              {completedSections.has('exercises') ? '✓ Complete' : 'Pending'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 
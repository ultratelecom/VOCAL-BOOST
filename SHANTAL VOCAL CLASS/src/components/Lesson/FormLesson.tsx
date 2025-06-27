'use client';

import { useState } from 'react';
import AudioRecorder from '@/components/Audio/AudioRecorder';

interface FormLessonProps {
  lesson: {
    id: string;
    title: string;
    content: {
      instructions: string;
      exercises?: string[];
      criteria?: string[];
      submissionType: 'audio' | 'video' | 'text';
      maxDuration?: number;
    };
  };
  progress: number;
  onProgressUpdate: (progress: number) => void;
}

export default function FormLesson({ lesson, progress, onProgressUpdate }: FormLessonProps) {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [textResponse, setTextResponse] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const handleStepComplete = (step: string) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(step);
    setCompletedSteps(newCompleted);

    // Update progress based on completed steps
    const totalSteps = 4; // instructions, practice, recording, submission
    const stepProgress = Math.floor((newCompleted.size / totalSteps) * 100);
    onProgressUpdate(Math.max(progress, stepProgress));
  };

  const handleSubmit = async () => {
    if (lesson.content.submissionType === 'audio' && !audioBlob) {
      alert('Please record audio before submitting');
      return;
    }

    if (lesson.content.submissionType === 'text' && !textResponse.trim()) {
      alert('Please provide a text response before submitting');
      return;
    }

    setIsSubmitting(true);

    // Mock submission process
    setTimeout(() => {
      handleStepComplete('submission');
      onProgressUpdate(100);
      setIsSubmitting(false);
      alert('Submission completed! You will receive feedback from your instructor soon.');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-900">Instructions</h3>
          <button
            onClick={() => handleStepComplete('instructions')}
            disabled={completedSteps.has('instructions')}
            className={`px-3 py-1 rounded text-sm font-medium ${
              completedSteps.has('instructions')
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {completedSteps.has('instructions') ? '✓ Read' : 'Mark as Read'}
          </button>
        </div>
        <p className="text-blue-800 leading-relaxed">{lesson.content.instructions}</p>
      </div>

      {/* Practice Exercises */}
      {lesson.content.exercises && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Practice Exercises</h3>
            <button
              onClick={() => handleStepComplete('practice')}
              disabled={completedSteps.has('practice')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                completedSteps.has('practice')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {completedSteps.has('practice') ? '✓ Practiced' : 'Mark as Practiced'}
            </button>
          </div>
          <div className="space-y-3">
            {lesson.content.exercises.map((exercise, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-1">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{exercise}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assessment Criteria */}
      {lesson.content.criteria && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Assessment Criteria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.content.criteria.map((criterion, index) => (
              <div key={index} className="flex items-center p-3 border rounded-lg">
                <span className="text-green-600 mr-3">✓</span>
                <span className="text-gray-700">{criterion}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submission Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Submit Your Work</h3>
          {lesson.content.maxDuration && (
            <span className="text-sm text-gray-500">
              Max duration: {Math.floor(lesson.content.maxDuration / 60)}:{String(lesson.content.maxDuration % 60).padStart(2, '0')}
            </span>
          )}
        </div>

        {/* Audio Recording */}
        {lesson.content.submissionType === 'audio' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Audio Recording
            </label>
            <AudioRecorder
              maxDuration={lesson.content.maxDuration || 300}
              onRecordingComplete={(blob) => {
                setAudioBlob(blob);
                handleStepComplete('recording');
              }}
            />
          </div>
        )}

        {/* Text Response */}
        {lesson.content.submissionType === 'text' && (
          <div className="mb-6">
            <label htmlFor="textResponse" className="block text-sm font-medium text-gray-700 mb-2">
              Written Response
            </label>
            <textarea
              id="textResponse"
              rows={6}
              value={textResponse}
              onChange={(e) => {
                setTextResponse(e.target.value);
                if (e.target.value.trim() && !completedSteps.has('recording')) {
                  handleStepComplete('recording');
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your response here..."
            />
            <div className="mt-1 text-sm text-gray-500">
              {textResponse.length} characters
            </div>
          </div>
        )}

        {/* Additional Notes */}
        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any additional comments or questions about your performance..."
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={
            isSubmitting || 
            (lesson.content.submissionType === 'audio' && !audioBlob) ||
            (lesson.content.submissionType === 'text' && !textResponse.trim())
          }
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit for Review'}
        </button>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Lesson Progress</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Instructions read</span>
            <span className={`text-sm font-medium ${
              completedSteps.has('instructions') ? 'text-green-600' : 'text-gray-400'
            }`}>
              {completedSteps.has('instructions') ? '✓ Complete' : 'Pending'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Practice exercises</span>
            <span className={`text-sm font-medium ${
              completedSteps.has('practice') ? 'text-green-600' : 'text-gray-400'
            }`}>
              {completedSteps.has('practice') ? '✓ Complete' : 'Pending'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              {lesson.content.submissionType === 'audio' ? 'Recording' : 'Response'} prepared
            </span>
            <span className={`text-sm font-medium ${
              completedSteps.has('recording') ? 'text-green-600' : 'text-gray-400'
            }`}>
              {completedSteps.has('recording') ? '✓ Complete' : 'Pending'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Submitted for review</span>
            <span className={`text-sm font-medium ${
              completedSteps.has('submission') ? 'text-green-600' : 'text-gray-400'
            }`}>
              {completedSteps.has('submission') ? '✓ Complete' : 'Pending'}
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Overall Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 
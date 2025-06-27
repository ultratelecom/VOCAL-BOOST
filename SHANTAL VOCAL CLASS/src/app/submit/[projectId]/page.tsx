'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import AudioRecorder from '@/components/Audio/AudioRecorder';
import CommentThread from '@/components/Comments/CommentThread';

// Mock project data
const mockProjects = {
  '1': {
    id: '1',
    title: 'Breathing Exercise Recording',
    description: 'Record yourself performing the diaphragmatic breathing exercise learned in Lesson 1.',
    instructions: [
      'Find a quiet space',
      'Record 2 minutes of breathing exercises',
      'Focus on proper diaphragmatic technique',
      'Submit for instructor feedback'
    ],
    dueDate: '2024-01-25',
    maxDuration: 120, // seconds
    submissionType: 'audio'
  },
  '2': {
    id: '2',
    title: 'Scale Practice Submission',
    description: 'Submit a recording of major scales as practiced in the pitch control lesson.',
    instructions: [
      'Warm up your voice first',
      'Record ascending and descending major scales',
      'Start from your comfortable range',
      'Maintain consistent tone throughout'
    ],
    dueDate: '2024-01-28',
    maxDuration: 180,
    submissionType: 'audio'
  }
};

export default function SubmitPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [project, setProject] = useState<any>(null);
  const [submission, setSubmission] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Simulate API call
    const foundProject = mockProjects[projectId as keyof typeof mockProjects];
    if (foundProject) {
      setProject(foundProject);
      
      // Check for existing submission
      const savedSubmission = localStorage.getItem(`submission-${projectId}`);
      if (savedSubmission) {
        setSubmission(JSON.parse(savedSubmission));
      }
    }
  }, [projectId]);

  const handleSubmit = async () => {
    if (!audioBlob) {
      alert('Please record audio before submitting');
      return;
    }

    setIsSubmitting(true);

    // Mock submission process
    setTimeout(() => {
      const newSubmission = {
        id: Date.now(),
        projectId,
        submittedAt: new Date().toISOString(),
        audioUrl: URL.createObjectURL(audioBlob),
        notes,
        status: 'pending_review',
        feedback: null
      };

      setSubmission(newSubmission);
      localStorage.setItem(`submission-${projectId}`, JSON.stringify(newSubmission));
      setIsSubmitting(false);
      setAudioBlob(null);
      setNotes('');
    }, 2000);
  };

  if (!project) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Project not found</h1>
            <p className="text-gray-600 mt-2">The requested project could not be found.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
          <p className="text-gray-600 mb-4">{project.description}</p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Instructions:</h3>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              {project.instructions.map((instruction: string, index: number) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600">
            <span>Due: {project.dueDate}</span>
            <span>Max Duration: {Math.floor(project.maxDuration / 60)}:{String(project.maxDuration % 60).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Existing Submission */}
        {submission && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-green-900">✅ Submission Complete</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                submission.status === 'pending_review' ? 'bg-yellow-100 text-yellow-800' :
                submission.status === 'reviewed' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {submission.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            
            <p className="text-green-700 mb-4">
              Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
            </p>

            {submission.audioUrl && (
              <div className="mb-4">
                <audio controls className="w-full">
                  <source src={submission.audioUrl} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {submission.notes && (
              <div className="mb-4">
                <h4 className="font-medium text-green-900 mb-2">Your Notes:</h4>
                <p className="text-green-700 bg-white p-3 rounded border">{submission.notes}</p>
              </div>
            )}

            {submission.feedback && (
              <div>
                <h4 className="font-medium text-green-900 mb-2">Instructor Feedback:</h4>
                <CommentThread comments={submission.feedback} />
              </div>
            )}
          </div>
        )}

        {/* Submission Form */}
        {!submission && (
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Submit Your Recording</h2>
            
            {/* Audio Recorder */}
            <div className="mb-6">
              <AudioRecorder
                maxDuration={project.maxDuration}
                onRecordingComplete={setAudioBlob}
              />
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any notes about your performance, challenges, or questions..."
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!audioBlob || isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Recording'}
            </button>
          </div>
        )}

        {/* Resubmission Option */}
        {submission && submission.status !== 'reviewed' && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setSubmission(null)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Submit New Recording
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
} 
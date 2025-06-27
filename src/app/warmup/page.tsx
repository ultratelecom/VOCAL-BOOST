'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import AudioRecorder from '../../components/Audio/AudioRecorder'

export default function WarmupPage() {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set())

  const warmupExercises = [
    {
      id: 1,
      title: "Breathing Foundation",
      duration: "3 minutes",
      description: "Deep diaphragmatic breathing to prepare your instrument",
      instructions: [
        "Place one hand on chest, one on diaphragm",
        "Breathe in for 4 counts through nose", 
        "Hold for 4 counts",
        "Exhale for 6 counts through mouth",
        "Repeat 8-10 times"
      ],
      audioGuide: "/audio/breathing-exercise.mp3",
      icon: "🫁"
    },
    {
      id: 2, 
      title: "Lip Trills & Bubbles",
      duration: "2 minutes",
      description: "Gentle lip vibrations to relax facial muscles",
      instructions: [
        "Keep lips loose and relaxed",
        "Blow air to create gentle lip vibration",
        "Start with comfortable low pitch",
        "Glide up and down smoothly",
        "Keep airflow steady and consistent"
      ],
      audioGuide: "/audio/lip-trills.mp3",
      icon: "💋"
    },
    {
      id: 3,
      title: "Tongue Twisters",
      duration: "2 minutes", 
      description: "Articulation and diction clarity exercises",
      instructions: [
        "Start slowly and clearly",
        "Red leather, yellow leather",
        "Unique New York, unique New York",
        "The lips, the teeth, the tip of the tongue",
        "Gradually increase speed while maintaining clarity"
      ],
      audioGuide: "/audio/tongue-twisters.mp3",
      icon: "👅"
    },
    {
      id: 4,
      title: "Vocal Sirens",
      duration: "3 minutes",
      description: "Smooth pitch glides to stretch vocal range",
      instructions: [
        "Use 'ng' sound (like 'sing' without 'si')",
        "Start at comfortable low pitch",
        "Glide smoothly to higher pitch",
        "Then glide back down", 
        "Keep sound connected and smooth"
      ],
      audioGuide: "/audio/vocal-sirens.mp3",
      icon: "🚨"
    },
    {
      id: 5,
      title: "Scale Warm-ups",
      duration: "4 minutes",
      description: "Simple scales to activate pitch accuracy",
      instructions: [
        "Start with 5-note scale (Do-Re-Mi-Fa-Sol)",
        "Use 'Ma' or 'La' syllables",
        "Keep tempo moderate and steady",
        "Focus on accurate pitch intervals",
        "Gradually expand range if comfortable"
      ],
      audioGuide: "/audio/scale-warmups.mp3", 
      icon: "🎼"
    }
  ]

  const completeExercise = (exerciseId: number) => {
    setCompletedExercises(prev => new Set([...Array.from(prev), exerciseId]))
  }

  const allExercisesCompleted = completedExercises.size === warmupExercises.length

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎵</span>
              </div>
              <Link href="/dashboard" className="text-2xl font-semibold text-gray-900">
                Vocal Boost
              </Link>
            </div>
            <Link 
              href="/dashboard" 
              className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🎵</span>
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-2">Vocal Warmup Session</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Prepare your voice with these essential exercises. Complete all warmups before starting your assignments for optimal vocal performance.
          </p>
          
          {/* Progress Indicator */}
          <div className="mt-6">
            <div className="flex justify-center space-x-2 mb-2">
              {warmupExercises.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    completedExercises.has(index + 1)
                      ? 'bg-green-500'
                      : index === currentExercise
                      ? 'bg-purple-600'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">
              {completedExercises.size} of {warmupExercises.length} exercises completed
            </p>
          </div>
        </div>

        {/* Exercise Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {warmupExercises.map((exercise, index) => {
            const isCompleted = completedExercises.has(exercise.id)
            const isCurrent = index === currentExercise
            
            return (
              <div
                key={exercise.id}
                className={`border rounded-lg p-6 transition-all ${
                  isCompleted
                    ? 'bg-green-50 border-green-200'
                    : isCurrent
                    ? 'bg-purple-50 border-purple-200 shadow-md'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{exercise.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{exercise.title}</h3>
                      <p className="text-sm text-gray-600">{exercise.duration}</p>
                    </div>
                  </div>
                  {isCompleted && (
                    <div className="text-green-500 text-xl">✓</div>
                  )}
                </div>

                <p className="text-gray-700 mb-4">{exercise.description}</p>

                {/* Instructions */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
                  <ul className="space-y-1">
                    {exercise.instructions.map((instruction, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="text-purple-600 mr-2 mt-1">•</span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Audio Guide */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Audio Guide</span>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors"
                    >
                      {isPlaying ? '⏸️' : '▶️'}
                    </button>
                  </div>
                  <audio
                    className="w-full mt-2"
                    controls
                    preload="none"
                  >
                    <source src={exercise.audioGuide} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {!isCompleted ? (
                    <>
                      <button
                        onClick={() => setCurrentExercise(index)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                      >
                        {isCurrent ? 'Current Exercise' : 'Start Exercise'}
                      </button>
                      <button
                        onClick={() => completeExercise(exercise.id)}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                      >
                        Complete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setCompletedExercises(prev => {
                        const newSet = new Set(Array.from(prev))
                        newSet.delete(exercise.id)
                        return newSet
                      })}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                    >
                      Mark Incomplete
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Completion Message */}
        {allExercisesCompleted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mb-8">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Warmup Complete!</h3>
            <p className="text-green-700 mb-4">
              Excellent work! Your voice is now warmed up and ready for practice. 
              You&apos;re prepared to tackle any vocal challenge that comes your way!
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/dashboard"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Continue to Lessons
              </Link>
              <button
                onClick={() => setCompletedExercises(new Set())}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Restart Warmup
              </button>
            </div>
          </div>
        )}

        {/* Quick Record */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-4">Practice Recording</h3>
          <p className="text-gray-600 mb-4">
            Record yourself doing any of these exercises to track your progress over time.
          </p>
          <AudioRecorder
            maxDuration={180}
            onRecordingComplete={(blob) => {
              console.log('Warmup recording completed:', blob)
            }}
          />
        </div>
      </div>
    </div>
  )
} 
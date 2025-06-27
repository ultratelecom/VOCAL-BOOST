'use client';

import { useState, useEffect } from 'react';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
  description?: string;
  tips?: string[];
}

interface ChecklistLessonProps {
  lesson: {
    id: string;
    title: string;
    content: {
      items: ChecklistItem[];
    };
  };
  progress: number;
  onProgressUpdate: (progress: number) => void;
}

export default function ChecklistLesson({ lesson, progress, onProgressUpdate }: ChecklistLessonProps) {
  const [items, setItems] = useState<ChecklistItem[]>(lesson.content.items);
  const [showTips, setShowTips] = useState<Set<number>>(new Set());
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);

  useEffect(() => {
    // Calculate progress based on completed items
    const completedCount = items.filter(item => item.completed).length;
    const progressPercentage = Math.floor((completedCount / items.length) * 100);
    onProgressUpdate(progressPercentage);
  }, [items, onProgressUpdate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSessionActive && startTime) {
      interval = setInterval(() => {
        setSessionDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSessionActive, startTime]);

  const toggleItem = (itemId: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const toggleTips = (itemId: number) => {
    const newShowTips = new Set(showTips);
    if (newShowTips.has(itemId)) {
      newShowTips.delete(itemId);
    } else {
      newShowTips.add(itemId);
    }
    setShowTips(newShowTips);
  };

  const startSession = () => {
    setStartTime(Date.now());
    setIsSessionActive(true);
    // Reset all items to uncompleted when starting a new session
    setItems(prevItems =>
      prevItems.map(item => ({ ...item, completed: false }))
    );
  };

  const endSession = () => {
    setIsSessionActive(false);
  };

  const resetChecklist = () => {
    setItems(prevItems =>
      prevItems.map(item => ({ ...item, completed: false }))
    );
    setIsSessionActive(false);
    setStartTime(null);
    setSessionDuration(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const completedCount = items.filter(item => item.completed).length;
  const allCompleted = completedCount === items.length;

  return (
    <div className="space-y-6">
      {/* Session Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Practice Session</h3>
            <p className="text-gray-600">Complete all exercises in order</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {completedCount}/{items.length}
            </div>
            <div className="text-sm text-gray-500">completed</div>
          </div>
        </div>

        {/* Session Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {!isSessionActive ? (
              <button
                onClick={startSession}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Start Practice Session
              </button>
            ) : (
              <button
                onClick={endSession}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                End Session
              </button>
            )}
            
            <button
              onClick={resetChecklist}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
          </div>

          {isSessionActive && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Recording</span>
              </div>
              <div className="font-mono text-lg font-bold">
                {formatTime(sessionDuration)}
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{Math.floor((completedCount / items.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(completedCount / items.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`bg-white rounded-lg shadow transition-all duration-200 ${
              item.completed ? 'ring-2 ring-green-500 bg-green-50' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleItem(item.id)}
                  disabled={!isSessionActive}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    item.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-blue-500'
                  } ${!isSessionActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {item.completed && '✓'}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-lg font-medium ${
                      item.completed ? 'text-green-700 line-through' : 'text-gray-900'
                    }`}>
                      {index + 1}. {item.text}
                    </h4>
                    
                    {item.tips && (
                      <button
                        onClick={() => toggleTips(item.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        {showTips.has(item.id) ? 'Hide Tips' : 'Show Tips'}
                      </button>
                    )}
                  </div>

                  {item.description && (
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  )}

                  {/* Tips */}
                  {item.tips && showTips.has(item.id) && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-900 mb-2">💡 Tips:</h5>
                      <ul className="space-y-1">
                        {item.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-blue-800 text-sm flex items-start">
                            <span className="text-blue-600 mr-2 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {allCompleted && isSessionActive && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-green-600 text-4xl mb-2">🎉</div>
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Excellent work! You've completed all exercises.
          </h3>
          <p className="text-green-700 mb-4">
            Session completed in {formatTime(sessionDuration)}
          </p>
          <button
            onClick={endSession}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Finish Session
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Instructions</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 mt-1">1.</span>
            Click "Start Practice Session" to begin timing your practice
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 mt-1">2.</span>
            Complete each exercise in order by checking them off
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 mt-1">3.</span>
            Use "Show Tips" for additional guidance on any exercise
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2 mt-1">4.</span>
            Click "End Session" when you're finished practicing
          </li>
        </ul>
      </div>
    </div>
  );
} 
'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioRecorderProps {
  maxDuration: number; // in seconds
  onRecordingComplete: (audioBlob: Blob) => void;
}

export default function AudioRecorder({ maxDuration, onRecordingComplete }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      stopRecording();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (playbackUrl) {
        URL.revokeObjectURL(playbackUrl);
      }
    };
  }, [playbackUrl]);

  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      streamRef.current = stream;
      
      // Set up audio visualization
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      return stream;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
      return null;
    }
  };

  const updateAudioLevel = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
    setAudioLevel(Math.floor((average / 255) * 100));
  };

  const startRecording = async () => {
    const stream = await requestMicrophoneAccess();
    if (!stream) return;

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      setRecordedBlob(blob);
      const url = URL.createObjectURL(blob);
      setPlaybackUrl(url);
      onRecordingComplete(blob);
    };

    mediaRecorder.start();
    setIsRecording(true);
    setDuration(0);

    // Start timer and audio level monitoring
    intervalRef.current = setInterval(() => {
      setDuration(prev => {
        const newDuration = prev + 1;
        if (newDuration >= maxDuration) {
          stopRecording();
          return maxDuration;
        }
        return newDuration;
      });
      updateAudioLevel();
    }, 1000);
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      
      intervalRef.current = setInterval(() => {
        setDuration(prev => {
          const newDuration = prev + 1;
          if (newDuration >= maxDuration) {
            stopRecording();
            return maxDuration;
          }
          return newDuration;
        });
        updateAudioLevel();
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && (isRecording || isPaused)) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      setAudioLevel(0);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const playRecording = () => {
    if (playbackUrl && audioElementRef.current) {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  const pausePlayback = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    }
  };

  const deleteRecording = () => {
    if (playbackUrl) {
      URL.revokeObjectURL(playbackUrl);
    }
    setPlaybackUrl(null);
    setRecordedBlob(null);
    setDuration(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    const remaining = maxDuration - duration;
    if (remaining <= 10) return 'text-red-600';
    if (remaining <= 30) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Audio Recorder</h3>
        <p className="text-gray-600 text-sm">
          Maximum recording time: {formatTime(maxDuration)}
        </p>
      </div>

      {/* Recording Controls */}
      {!recordedBlob && (
        <div className="text-center space-y-4">
          {/* Audio Level Indicator */}
          {(isRecording || isPaused) && (
            <div className="mb-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-sm text-gray-600">Audio Level:</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-red-500 transition-all duration-100"
                    style={{ width: `${audioLevel}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Timer */}
          {(isRecording || isPaused || duration > 0) && (
            <div className={`text-2xl font-mono font-bold ${getTimeColor()}`}>
              {formatTime(duration)} / {formatTime(maxDuration)}
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4">
            {!isRecording && !isPaused && (
              <button
                onClick={startRecording}
                className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <span className="w-4 h-4 bg-white rounded-full"></span>
                <span>Start Recording</span>
              </button>
            )}

            {isRecording && !isPaused && (
              <>
                <button
                  onClick={pauseRecording}
                  className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
                >
                  ⏸️ Pause
                </button>
                <button
                  onClick={stopRecording}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  ⏹️ Stop
                </button>
              </>
            )}

            {isPaused && (
              <>
                <button
                  onClick={resumeRecording}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  ▶️ Resume
                </button>
                <button
                  onClick={stopRecording}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  ⏹️ Stop
                </button>
              </>
            )}
          </div>

          {/* Recording Status */}
          {isRecording && !isPaused && (
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Recording...</span>
            </div>
          )}

          {isPaused && (
            <div className="flex items-center justify-center space-x-2 text-yellow-600">
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              <span className="text-sm font-medium">Recording Paused</span>
            </div>
          )}
        </div>
      )}

      {/* Playback Controls */}
      {recordedBlob && playbackUrl && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-green-900">Recording Complete</h4>
              <span className="text-sm text-green-700">
                Duration: {formatTime(duration)}
              </span>
            </div>

            <audio
              ref={audioElementRef}
              src={playbackUrl}
              onEnded={() => setIsPlaying(false)}
              className="w-full mb-3"
              controls
            />

            <div className="flex justify-center space-x-3">
              <button
                onClick={isPlaying ? pausePlayback : playRecording}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                {isPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
              
              <button
                onClick={deleteRecording}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                🗑️ Delete & Re-record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Recording Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Find a quiet environment with minimal background noise</li>
          <li>• Position yourself 6-12 inches from your microphone</li>
          <li>• Speak or sing clearly and at a comfortable volume</li>
          <li>• Monitor the audio level to avoid clipping (red zone)</li>
        </ul>
      </div>
    </div>
  );
} 
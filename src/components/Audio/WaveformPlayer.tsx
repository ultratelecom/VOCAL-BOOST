'use client';

import { useState, useRef, useEffect } from 'react';

interface WaveformPlayerProps {
  audioUrl: string;
  title?: string;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
}

export default function WaveformPlayer({ audioUrl, title, onTimeUpdate }: WaveformPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    generateWaveform();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (isPlaying) {
      updateWaveform();
    }
  }, [isPlaying, currentTime]);

  const generateWaveform = async () => {
    setIsLoading(true);
    try {
      const audioContext = new AudioContext();
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      const channelData = audioBuffer.getChannelData(0);
      const samples = 100; // Number of waveform bars
      const blockSize = Math.floor(channelData.length / samples);
      const waveform = [];

      for (let i = 0; i < samples; i++) {
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum += Math.abs(channelData[i * blockSize + j]);
        }
        waveform.push(sum / blockSize);
      }

      // Normalize waveform data
      const max = Math.max(...waveform);
      const normalizedWaveform = waveform.map(value => (value / max) * 100);
      
      setWaveformData(normalizedWaveform);
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating waveform:', error);
      // Generate a simple sine wave as fallback
      const fallbackWaveform = Array.from({ length: 100 }, (_, i) => 
        Math.abs(Math.sin(i * 0.1)) * 50 + 10
      );
      setWaveformData(fallbackWaveform);
      setIsLoading(false);
    }
  };

  const updateWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas || waveformData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const barWidth = width / waveformData.length;
    const progressRatio = duration > 0 ? currentTime / duration : 0;

    waveformData.forEach((amplitude, index) => {
      const barHeight = (amplitude / 100) * height * 0.8;
      const x = index * barWidth;
      const y = (height - barHeight) / 2;

      // Color bars based on playback progress
      const isPlayed = index < progressRatio * waveformData.length;
      ctx.fillStyle = isPlayed ? '#3B82F6' : '#E5E7EB';
      
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    });

    // Draw playhead
    const playheadX = progressRatio * width;
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(playheadX, 0);
    ctx.lineTo(playheadX, height);
    ctx.stroke();

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateWaveform);
    }
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(audio.currentTime);
    if (onTimeUpdate) {
      onTimeUpdate(audio.currentTime, audio.duration);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setDuration(audio.duration);
  };

  const handleWaveformClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    if (!canvas || !audio || duration === 0) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickRatio = clickX / canvas.width;
    const newTime = clickRatio * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handlePlaybackRateChange = (rate: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const handleVolumeChange = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white border rounded-lg p-4">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
      )}

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Waveform Display */}
      <div className="mb-4">
        {isLoading ? (
          <div className="h-24 bg-gray-100 rounded flex items-center justify-center">
            <div className="text-gray-500">Loading waveform...</div>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            width={600}
            height={96}
            className="w-full h-24 cursor-pointer bg-gray-50 rounded"
            onClick={handleWaveformClick}
          />
        )}
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Play Controls and Time Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePlayPause}
              disabled={isLoading}
              className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <div className="text-sm text-gray-600 font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Playback Rate */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Speed:</span>
            <select
              value={playbackRate}
              onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600 w-12">Volume:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-600 w-8">{Math.round(volume * 100)}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              const audio = audioRef.current;
              if (audio) {
                audio.currentTime = parseFloat(e.target.value);
              }
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Additional Controls */}
      <div className="mt-4 flex justify-between items-center text-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              const audio = audioRef.current;
              if (audio) audio.currentTime = Math.max(0, audio.currentTime - 10);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            ⏪ -10s
          </button>
          <button
            onClick={() => {
              const audio = audioRef.current;
              if (audio) audio.currentTime = Math.min(duration, audio.currentTime + 10);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            +10s ⏩
          </button>
        </div>
        
        <div className="text-gray-500">
          Click waveform to seek
        </div>
      </div>
    </div>
  );
} 
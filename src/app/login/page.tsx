'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import ParticleBackground from '@/components/ParticleBackground';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const fillDemoCredentials = () => {
    setEmail('test@vocalboost.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      {/* Glassmorphism Header */}
      <header className="nav-glass relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 logo-glow rounded-lg flex items-center justify-center float">
                <span className="text-white font-bold text-sm">🎵</span>
              </div>
              <div className="flex flex-col">
                <Link href="/" className="text-2xl font-semibold text-white glow-hover">
                  Vocal Boost
                </Link>
                <div className="waveform" style={{ transform: 'scale(0.7)', transformOrigin: 'left' }}>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                  <div className="waveform-bar"></div>
                </div>
              </div>
            </div>
            <Link 
              href="/" 
              className="text-white/80 hover:text-white text-sm transition-all duration-300 glow-hover px-3 py-1 rounded-lg"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </header>

      <div className="min-h-screen flex flex-col justify-center relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="glass-card glow-hover">
            <div className="text-center mb-8">
              <div className="w-16 h-16 logo-glow rounded-2xl flex items-center justify-center mx-auto mb-4 float">
                <span className="text-white font-bold text-2xl">🎵</span>
              </div>
              <h1 className="text-3xl font-light text-white mb-2">Vocal Boost</h1>
              <p className="text-white/80 text-sm">Sign in to your account</p>
              <div className="waveform mt-3">
                <div className="waveform-bar"></div>
                <div className="waveform-bar"></div>
                <div className="waveform-bar"></div>
                <div className="waveform-bar"></div>
                <div className="waveform-bar"></div>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="glass bg-red-500/20 border border-red-400/30 text-red-100 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-3 glass rounded-md text-sm placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 glow-hover"
                />
              </div>

              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-3 glass rounded-md text-sm placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 glow-hover"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-glass w-full ripple"
                >
                  {isLoading ? '🎵 Signing in...' : '🎤 Sign in'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 glass text-white/80">OR</span>
                </div>
              </div>

              <div className="mt-6 text-center space-y-3">
                <button
                  onClick={fillDemoCredentials}
                  className="glass px-4 py-2 rounded-lg text-white hover:text-purple-300 text-sm font-medium transition-all duration-300 glow-hover ripple"
                >
                  🎭 Use demo credentials
                </button>
                
                <div className="text-xs text-white/60">
                  Demo: test@vocalboost.com / password123
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-white/80">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-purple-300 hover:text-purple-100 font-medium transition-colors glow-hover">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link 
              href="/" 
              className="text-white/70 hover:text-white text-sm transition-all duration-300 glow-hover px-3 py-1 rounded-lg"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import ParticleBackground from '@/components/ParticleBackground';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signUp, isLoading } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.name);
      setSuccess('Account created successfully! Please check your email to verify your account.');
      
      // Redirect to login after a delay
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    }
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
            <p className="text-white/80 text-sm">Sign up to get started</p>
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
            
            {success && (
              <div className="glass bg-green-500/20 border border-green-400/30 text-green-100 px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}
            
            <div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-3 glass rounded-md text-sm placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 glow-hover"
              />
            </div>

            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-3 glass rounded-md text-sm placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 glow-hover"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-3 glass rounded-md text-sm placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 glow-hover"
              />
            </div>

            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-3 glass rounded-md text-sm placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 glow-hover"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-glass w-full ripple"
              >
                {isLoading ? '🎵 Creating account...' : '🎤 Sign up'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-xs text-white/60 text-center leading-relaxed">
              By signing up, you agree to our{' '}
              <a href="#" className="text-purple-300 hover:text-purple-100 glow-hover">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-purple-300 hover:text-purple-100 glow-hover">Privacy Policy</a>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/80">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-300 hover:text-purple-100 font-medium transition-colors glow-hover">
                Log in
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
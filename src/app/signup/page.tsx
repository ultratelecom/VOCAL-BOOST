'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to dashboard on successful signup
    router.push('/dashboard');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-200 sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">VocalTraining</h1>
            <p className="text-gray-600 text-sm">Sign up to get started</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
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
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600"
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
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600"
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
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600"
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
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By signing up, you agree to our{' '}
              <a href="#" className="text-purple-600 hover:text-purple-700">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
} 
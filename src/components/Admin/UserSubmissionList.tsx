'use client';

import { useState } from 'react';

interface Submission {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  lessonTitle: string;
  projectTitle: string;
  submittedAt: string;
  status: 'pending_review' | 'in_review' | 'reviewed' | 'needs_revision';
  rating?: number;
  duration: number;
}

export default function UserSubmissionList() {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API calls
  const allSubmissions: Submission[] = [
    {
      id: 'sub-1',
      userId: 'user-2',
      userName: 'Sarah Martinez',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=150&h=150&fit=crop&crop=face',
      lessonTitle: 'Understanding Diaphragmatic Breathing',
      projectTitle: 'Breathing Exercise Recording',
      submittedAt: '2024-01-18T10:30:00Z',
      status: 'pending_review',
      duration: 125
    },
    {
      id: 'sub-2',
      userId: 'user-3',
      userName: 'Michael Chen',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lessonTitle: 'Understanding Diaphragmatic Breathing',
      projectTitle: 'Breathing Exercise Recording',
      submittedAt: '2024-01-17T14:15:00Z',
      status: 'reviewed',
      rating: 9,
      duration: 108
    },
    {
      id: 'sub-3',
      userId: 'user-4',
      userName: 'Emma Thompson',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lessonTitle: 'Daily Breathing Exercises',
      projectTitle: 'Scale Practice Submission',
      submittedAt: '2024-01-16T09:45:00Z',
      status: 'in_review',
      duration: 167
    },
    {
      id: 'sub-4',
      userId: 'user-1',
      userName: 'Alex Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lessonTitle: 'Breathing Assessment',
      projectTitle: 'Breathing Technique Evaluation',
      submittedAt: '2024-01-15T11:20:00Z',
      status: 'reviewed',
      rating: 8,
      duration: 145
    },
    {
      id: 'sub-5',
      userId: 'user-2',
      userName: 'Sarah Martinez',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=150&h=150&fit=crop&crop=face',
      lessonTitle: 'Basic Warm-up Routine',
      projectTitle: 'Warm-up Routine Practice',
      submittedAt: '2024-01-14T08:30:00Z',
      status: 'needs_revision',
      rating: 6,
      duration: 89
    }
  ];

  const getFilteredSubmissions = () => {
    let filtered = allSubmissions;

    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter(sub => sub.status === filter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(sub => 
        sub.userName.toLowerCase().includes(term) ||
        sub.lessonTitle.toLowerCase().includes(term) ||
        sub.projectTitle.toLowerCase().includes(term)
      );
    }

    // Sort submissions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
        case 'oldest':
          return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
        case 'name':
          return a.userName.localeCompare(b.userName);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_review':
        return 'bg-blue-100 text-blue-800';
      case 'reviewed':
        return 'bg-green-100 text-green-800';
      case 'needs_revision':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getStatusCounts = () => {
    return {
      all: allSubmissions.length,
      pending_review: allSubmissions.filter(s => s.status === 'pending_review').length,
      in_review: allSubmissions.filter(s => s.status === 'in_review').length,
      reviewed: allSubmissions.filter(s => s.status === 'reviewed').length,
      needs_revision: allSubmissions.filter(s => s.status === 'needs_revision').length
    };
  };

  const filteredSubmissions = getFilteredSubmissions();
  const statusCounts = getStatusCounts();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Submissions</h2>
        <p className="text-gray-600">Manage and review all student submissions</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All ({statusCounts.all})</option>
              <option value="pending_review">Pending Review ({statusCounts.pending_review})</option>
              <option value="in_review">In Review ({statusCounts.in_review})</option>
              <option value="reviewed">Reviewed ({statusCounts.reviewed})</option>
              <option value="needs_revision">Needs Revision ({statusCounts.needs_revision})</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Student Name</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student or lesson..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">📭</div>
            <p>No submissions found matching your criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={submission.userAvatar}
                          alt={submission.userName}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {submission.userName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {submission.userId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{submission.projectTitle}</div>
                      <div className="text-sm text-gray-500">{submission.lessonTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(submission.submittedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatTime(submission.duration)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}>
                        {submission.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {submission.rating ? (
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">⭐</span>
                          <span className="text-sm font-medium">{submission.rating}/10</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Not rated</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          Review
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Listen
                        </button>
                        {submission.status === 'reviewed' && (
                          <button className="text-green-600 hover:text-green-900">
                            View Feedback
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{count}</div>
            <div className="text-sm text-gray-600 capitalize">
              {status.replace('_', ' ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeAPI } from '../utils/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Fetch resume data
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await resumeAPI.getMyResume();
      if (response.data.success) {
        setResume(response.data.data);
      }
    } catch (error) {
      console.log('No resume found or error fetching resume');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Skills', value: resume?.skills?.length || 0, color: 'bg-blue-500' },
    { label: 'Projects', value: resume?.projects?.length || 0, color: 'bg-green-500' },
    { label: 'Courses', value: resume?.courses?.length || 0, color: 'bg-purple-500' },
    { label: 'Achievements', value: resume?.achievements?.length || 0, color: 'bg-orange-500' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      
      <div className="ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-sm text-gray-600">
            {user?.email}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Resume Summary */}
        {resume?.summary && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Resume Summary</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{resume.summary}</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => navigate('/resume-builder')}
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition text-left"
            >
              <div className="text-gray-700 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 text-sm">Edit Resume</h3>
              <p className="text-xs text-gray-600 mt-1">Update your information</p>
            </button>

            <button 
              onClick={() => navigate('/integrations')}
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition text-left"
            >
              <div className="text-gray-700 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 text-sm">Integrations</h3>
              <p className="text-xs text-gray-600 mt-1">Connect platforms</p>
            </button>

            <button 
              onClick={() => navigate('/resume-builder')}
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition text-left"
            >
              <div className="text-gray-700 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 text-sm">Preview</h3>
              <p className="text-xs text-gray-600 mt-1">View and export</p>
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

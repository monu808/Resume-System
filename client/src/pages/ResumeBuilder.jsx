import { useState, useEffect, useRef } from 'react';
import { resumeAPI } from '../utils/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import EnhancedResumeForm from '../components/EnhancedResumeForm';
import ResumePreview from '../components/ResumePreview';

const ResumeBuilder = () => {
  const previewRef = useRef(null);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    courses: [],
    achievements: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await resumeAPI.getMyResume();
      if (response.data.success) {
        setResumeData(response.data.data);
      }
    } catch (error) {
      console.log('No resume found, starting fresh');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await resumeAPI.saveResume(resumeData);
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Resume saved successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save resume. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateSummary = async () => {
    setGenerating(true);
    setMessage({ type: '', text: '' });

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await resumeAPI.generateSummary({
        ...resumeData,
        name: user.name,
        role: user.role,
      });

      if (response.data.success) {
        setResumeData({
          ...resumeData,
          summary: response.data.data.summary,
        });
        setMessage({ type: 'success', text: 'AI summary generated successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to generate summary. Please try again.' });
    } finally {
      setGenerating(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      // Dynamically import html2canvas and jspdf
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const element = previewRef.current;
      
      if (!element) {
        setMessage({ type: 'error', text: 'Unable to generate PDF. Please try again.' });
        return;
      }

      setMessage({ type: 'info', text: 'Generating PDF...' });

      // Capture the resume preview as canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const fileName = `${user.name || 'Resume'}_Resume.pdf`;
      pdf.save(fileName);

      setMessage({ type: 'success', text: 'PDF downloaded successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Export error:', error);
      setMessage({ type: 'error', text: 'Failed to export PDF. Please try again.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Resume Builder</h1>
          <p className="text-sm text-gray-600">Create and customize your professional resume</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={handleGenerateSummary}
            disabled={generating}
            className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {generating ? 'Generating...' : 'Generate AI Summary'}
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>

          <button
            onClick={handleExportPDF}
            className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
          >
            Export PDF
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Resume Details</h2>
            <EnhancedResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          </div>

          {/* Right: Preview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 lg:sticky lg:top-8 lg:self-start">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Live Preview</h2>
            <div ref={previewRef}>
              <ResumePreview resumeData={resumeData} />
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

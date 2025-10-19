import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import IntegrationDashboard from '../components/IntegrationDashboard';

const Integrations = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      
      <div className="ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Platform Integrations
            </h1>
            <p className="text-sm text-gray-600">
              Connect your accounts to automatically sync achievements and projects to your resume.
            </p>
          </div>

          {/* Integration Dashboard */}
          <IntegrationDashboard />
        </div>
      </div>
    </div>
  );
};

export default Integrations;

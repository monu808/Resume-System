import { useState, useEffect } from 'react';
import { integrationAPI } from '../utils/api';

const IntegrationDashboard = () => {
  const [loading, setLoading] = useState({});
  const [integrationData, setIntegrationData] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showModal, setShowModal] = useState(null);
  const [credentials, setCredentials] = useState({ value: '' });

  const platforms = [
    {
      id: 'coursera',
      name: 'Coursera',
      icon: '🎓',
      authField: 'API Key',
      guide: 'Get your API key from Coursera Developer Portal',
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: '💻',
      authField: 'Username',
      guide: 'Enter your GitHub username',
    },
    {
      id: 'devfolio',
      name: 'Devfolio',
      icon: '🏆',
      authField: 'Username',
      guide: 'Enter your Devfolio username',
    },
  ];

  useEffect(() => {
    fetchIntegrationData();
  }, []);

  const fetchIntegrationData = async () => {
    try {
      const response = await integrationAPI.getData();
      if (response.data.success) {
        setIntegrationData(response.data.data.all || []);
      }
    } catch (error) {
      console.error('Error fetching integration data:', error);
    }
  };

  const handleConnect = (platformId) => {
    setShowModal(platformId);
    setCredentials({ value: '' });
  };

  const handleSync = async (platformId) => {
    if (!credentials.value.trim()) {
      setMessage({
        type: 'error',
        text: `Please enter your ${platforms.find(p => p.id === platformId)?.authField}`,
      });
      return;
    }

    setLoading(prev => ({ ...prev, [platformId]: true }));
    setMessage({ type: '', text: '' });

    try {
      let response;
      if (platformId === 'coursera') {
        response = await integrationAPI.syncCoursera(credentials.value);
      } else if (platformId === 'github') {
        response = await integrationAPI.syncGitHub(credentials.value);
      } else if (platformId === 'devfolio') {
        response = await integrationAPI.syncDevfolio(credentials.value);
      }
      
      if (response.data.success) {
        setMessage({
          type: 'success',
          text: response.data.message,
        });
        await fetchIntegrationData();
        setShowModal(null);
        setCredentials({ value: '' });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || `Failed to sync ${platformId}. Please check your credentials.`;
      
      // Special handling for platforms with instructions
      if (error.response?.data?.instructions) {
        setMessage({
          type: 'info',
          text: errorMsg + '\n\nInstructions:\n' + error.response.data.instructions.steps.join('\n'),
        });
      } else {
        setMessage({
          type: 'error',
          text: errorMsg,
        });
      }
      setTimeout(() => setMessage({ type: '', text: '' }), 8000);
    } finally {
      setLoading(prev => ({ ...prev, [platformId]: false }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this item?')) return;

    try {
      const response = await integrationAPI.deleteData(id);
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Item removed' });
        await fetchIntegrationData();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete' });
    }
  };

  const getPlatformData = (platformName) => {
    return integrationData.filter(item => item.platform === platformName);
  };

  return (
    <div className="space-y-6">
      {/* Alert Message */}
      {message.text && (
        <div className={`p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Platform Cards - Minimal Design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map((platform) => {
          const items = getPlatformData(platform.name);
          const isConnected = items.length > 0;

          return (
            <div
              key={platform.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl mb-1">{platform.icon}</div>
                  <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                </div>
                {isConnected && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {items.length} items
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-4">{platform.guide}</p>

              <button
                onClick={() => handleConnect(platform.id)}
                disabled={loading[platform.id]}
                className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 rounded-lg transition disabled:opacity-50"
              >
                {loading[platform.id] ? 'Syncing...' : isConnected ? 'Sync Again' : 'Connect & Sync'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Synced Data Table - Minimal */}
      {integrationData.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Synced Data</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {integrationData.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{item.platform}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.dataType}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.date ? new Date(item.date).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Connection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">
              Connect {platforms.find(p => p.id === showModal)?.name}
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {platforms.find(p => p.id === showModal)?.authField}
              </label>
              <input
                type="text"
                value={credentials.value}
                onChange={(e) => setCredentials({ value: e.target.value })}
                placeholder={`Enter your ${platforms.find(p => p.id === showModal)?.authField.toLowerCase()}`}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                {platforms.find(p => p.id === showModal)?.guide}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-blue-800">
                <strong>💡 Real Integration:</strong> This will fetch real data from {platforms.find(p => p.id === showModal)?.name}. Make sure your credentials are correct.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSync(showModal)}
                disabled={loading[showModal]}
                className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                {loading[showModal] ? 'Syncing...' : 'Connect & Sync'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationDashboard;

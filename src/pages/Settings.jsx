import { useState } from "react";
import axios from "axios";
import { Key } from "lucide-react";

export const Settings= () => {
  const [apiKey, setApiKey] = useState("");
  const [newApiKey, setNewApiKey] = useState("");
  const url = import.meta.env.VITE_API_URL;

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/set_apikey`, {
        apiKey: newApiKey,
      });

      setApiKey(newApiKey);
      console.log(res.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const clearApiKey = async () => {
    try {
      const res = await axios.delete(`${url}/api/delete_apikey`)
      console.log(res.data);
      setApiKey("")
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-2 mb-8">
        <Key className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Key className="w-5 h-5 mr-2" />
            AI Provider Configuration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save API Key
              </button>
              {apiKey && (
                <button
                  type="button"
                  onClick={clearApiKey}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Remove API Key
                </button>
              )}
            </div>
          </form>

          {apiKey && (
            <div className="mt-6 p-4 bg-green-50 text-green-800 rounded-lg">
              API key is configured for Gemini
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

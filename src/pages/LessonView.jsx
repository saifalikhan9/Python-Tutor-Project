import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, MessageSquare } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import axios from 'axios';



export const LessonView= () => {
  const url = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);

  const lessonContent = {
    '1': {
      title: 'Meet Python, Your New Friend!',
      content: `print("Hello, Python friend!")`,
      instructions: "Welcome to your first Python lesson!",
    },
    '2': {
      title: 'Numbers and Math Magic',
      content: `print(2 + 2)\nprint(10 - 5)\nprint(3 * 4)`,
      instructions: "Ready to become a math wizard?",
    }
  }[id || '1'];

  const handleRunCode = async () => {
    setIsRunning(true);
    setError(null);
    const currentCode = code || lessonContent.content;

    try {
      const response = await axios.post(`${url}/api/execute`, { code: currentCode });
      setOutput(response.data.output);

      if (!response.data.error) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: "Great job! Your code ran successfully." }]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while running the code');
      setOutput('Error: Failed to execute code. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    try {
      const response = await axios.post(`${url}/api/chat`, {
        message: userMessage,
        code: code || lessonContent.content,
        lessonId: id,
        
      });
      setChatMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble responding right now." }]);
    }
    setUserMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <button onClick={() => navigate('/lessons')} className="flex items-center text-indigo-600 hover:text-indigo-700 mb-6">
        <ArrowLeft className="w-5 h-5" /> <span>Back to Lessons</span>
      </button>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{lessonContent.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <p className="text-gray-700">{lessonContent.instructions}</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Code Editor</h2>
              <button onClick={handleRunCode} disabled={isRunning} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <Play className="w-4 h-4" /><span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </button>
            </div>
            <div className="border rounded-lg overflow-hidden bg-[#282c34] shadow-lg">
              <CodeMirror value={code || lessonContent.content} height="300px" theme={oneDark} extensions={[python()]} onChange={setCode} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Output</h2>
              <div className="border rounded-lg p-4 h-[150px] bg-white overflow-auto shadow-inner">
                {error && <div className="text-red-600 mb-2">{error}</div>}
                <SyntaxHighlighter language="plaintext" style={vs2015}>{output || 'Run your code to see the output here! 🚀'}</SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <MessageSquare className="w-5 h-5" /> <span>Need Help?</span>
          </h2>
          <div className="border rounded-lg bg-white shadow-lg flex flex-col h-[600px]">
            <div className="flex-1 p-4 overflow-auto space-y-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}>{msg.content}</div>
                </div>
              ))}
            </div>
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <input type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} placeholder="Ask for help..." className="flex-1 px-3 py-2 border rounded-lg" onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
                <button onClick={handleSendMessage} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

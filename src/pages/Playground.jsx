import { useState } from 'react';
import { Play, RefreshCw, Save, MessageSquare } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from 'axios';



export const Playground= () => {
  const url = import.meta.env.VITE_API_URL
  const [code, setCode] = useState('# Welcome to your Python playground! 🐍\n# Try writing some code below:\n\nprint("Hello, Python friend!")\n\n# Try these fun examples:\n# 1. Make a calculation\n# print(2 + 2)\n\n# 2. Create a variable\n# name = "Your name"\n# print("Hello,", name)');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: "Hi there! 👋 I'm your Python buddy! I'm here to help you learn and practice Python. Try running the example code, or write your own code and I'll help you understand how it works!"
    }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  
  const handleRunCode = async () => {
    setIsRunning(true);
    setError(null)
    const currentCode = code ;

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
    const id = Math.floor(Math.random()*10);
    if (!userMessage.trim()) return;

    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    try {
      const response = await axios.post(`${url}/api/chat`, {
        message: userMessage,
        code: code,
        lessonId: JSON.stringify(id) ,
        
      });
      setChatMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble responding right now." }]);
    }
    setUserMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Python Playground</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Code Editor</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setCode('# Write your Python code here\n')}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Clear Code"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Save Code"
              >
                <Save className="w-5 h-5" />
              </button>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className={`bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2 ${
                  isRunning ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Play className="w-4 h-4" />
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </button>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden bg-[#282c34] shadow-lg">
            <CodeMirror
              value={code}
              height="400px"
              theme={oneDark}
              extensions={[python()]}
              onChange={(value) => setCode(value)}
              className="text-base"
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightSpecialChars: true,
                history: true,
                foldGutter: true,
                drawSelection: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
                syntaxHighlighting: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                rectangularSelection: true,
                crosshairCursor: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
                closeBracketsKeymap: true,
                defaultKeymap: true,
                searchKeymap: true,
                historyKeymap: true,
                foldKeymap: true,
                completionKeymap: true,
                lintKeymap: true,
              }}
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Output</h2>
            <div className="border rounded-lg p-4 h-[200px] bg-white overflow-auto shadow-inner">
              <SyntaxHighlighter
                language="plaintext"
                style={vs2015}
                customStyle={{ background: 'transparent' }}
              >
                {output === null ? error : output || 'Run your code to see the output here! 🚀'}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Python Buddy Chat</span>
          </h2>
          
          <div className="border rounded-lg bg-white shadow-lg flex flex-col h-[640px]">
            <div className="flex-1 p-4 overflow-auto space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Ask your Python buddy for help..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
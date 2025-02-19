"use client"

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Play, MessageSquare } from "lucide-react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs"
import CodeMirror from "@uiw/react-codemirror"
import { python } from "@codemirror/lang-python"
import { oneDark } from "@codemirror/theme-one-dark"
import { modules } from "../constants/Conts"
import ModuleContent from "../components/ModuleContent.jsx"
import axios from "axios"

export const LessonView = () => {
  const url = import.meta.env.VITE_API_URL
  const { id } = useParams()
  const navigate = useNavigate()

  // Use the modules object to get the lesson data based on the URL id.
  // If no module is found for the provided id, default to the first module.
  const moduleData = modules[id] || modules[1]
  

  // Use the codeExample from moduleData for the code editor.
  const [code, setCode] = useState(moduleData.content.codeExample || "")
  const [output, setOutput] = useState("")
  const [chatMessages, setChatMessages] = useState([{role: "assistant", content: "Hi there! 👋 I'm your Python buddy! I'm here to help you learn and practice Python. Try running the example code, or write your own code and I'll help you understand how it works!" }])
  const [userMessage, setUserMessage] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState(null)

  const handleRunCode = async () => {
    setIsRunning(true)
    setError(null)

    // Use user-edited code if available; otherwise, use the default code content
    const currentCode = code || moduleData.content.codeExample

    try {
      const response = await axios.post(
        `${url}/api/execute`,
        { code: currentCode },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      setOutput(response.data.output)

      const chatres = await axios.post(
        `${url}/api/chat`,
        {
          message: response.data.output,
          code: currentCode,
          lessonId: moduleData.content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )

      setChatMessages((prev) => [...prev, { role: "assistant", content: chatres.data.response }])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while running the code")
      setOutput("Error: Failed to execute code. Please try again.")
    } finally {
      setIsRunning(false)
    }
  }

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return

    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }])
    try {
      const response = await axios.post(
        `${url}/api/chat`,
        {
          message: userMessage,
          code: code || moduleData.content.codeExample,
          lessonId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      setChatMessages((prev) => [...prev, { role: "assistant", content: response.data.response }])
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble responding right now.",
        },
      ])
    }
    setUserMessage("")
  }
  
  
  return (
    <div className="max-w-7xl mx-auto px-4">
      <button
        onClick={() => navigate("/lessons")}
        className="flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5" /> <span>Back to Lessons</span>
      </button>

      {/* Display the lesson title from the module's content */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{moduleData.content.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ModuleContent content={moduleData.content} />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Code Editor</h2>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Play className=" w-4 h-4" />
                <span>{isRunning ? "Running..." : "Run Code"}</span>
              </button>
            </div>
            <div className="border rounded-lg overflow-hidden bg-[#282c34] shadow-lg">
              <CodeMirror value={code} height="300px" theme={oneDark} extensions={[python()]} onChange={setCode} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Output</h2>
              <div className="border rounded-lg p-4 h-[150px] bg-white overflow-auto shadow-inner">
                {error && <div className="text-red-600 mb-2">{error}</div>}
                <SyntaxHighlighter language="plaintext" style={vs2015}>
                  {output || "Run your code to see the output here! 🚀"}
                </SyntaxHighlighter>
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
                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.role === "assistant" && <div className="font-semibold mb-1">Assistant</div>}
                    <div className="whitespace-pre-wrap">{msg.content}</div>
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
                  placeholder="Ask for help..."
                  className="flex-1 px-3 py-2 border rounded-lg"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
  )
}


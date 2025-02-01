import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, BookOpen, PlayCircle } from 'lucide-react';

export  const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">
          Welcome to PythonBuddy!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your child&apos;s personal AI-powered Python tutor that makes learning to code fun and
          interactive. With PythonBuddy, we combine the power of artificial intelligence
          with engaging lessons to create a unique learning experience tailored to each
          child&apos;s needs.
        </p>
        <p className="text-lg text-gray-600">
          Our intelligent tutor adapts to your child&apos;s learning pace, provides instant
          feedback, and makes programming concepts easy to understand through interactive
          examples and fun challenges. Start your child&apos;s coding journey today!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Bot className="w-12 h-12 text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">AI-Powered Learning</h2>
          <p className="text-gray-600">
            Personalized guidance and instant feedback from our friendly AI tutor
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <BookOpen className="w-12 h-12 text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Interactive Lessons</h2>
          <p className="text-gray-600">
            Fun, engaging lessons designed specifically for young learners
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <PlayCircle className="w-12 h-12 text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Practice Playground</h2>
          <p className="text-gray-600">
            Safe environment to experiment with code and learn by doing
          </p>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Link
          to="/lessons"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Start Learning
        </Link>
        <Link
          to="/playground"
          className="bg-white text-indigo-600 px-6 py-3 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
        >
          Try Playground
        </Link>
      </div>
    </div>
  );
};


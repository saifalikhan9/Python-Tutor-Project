import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Star, Award, Lock } from "lucide-react";
import { modules } from "../constants/Conts";
import axios from "axios";

export const Lessons = () => {
  const navigate = useNavigate();

  const handleStartLesson = (lessonId) => {
    navigate(`/lessons/${lessonId}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Python Adventures
          </h1>
        </div>
      </div>

      {!modules && <div> loading</div>}

      {modules && (
        <div className="grid gap-6">
          {Object.keys(modules).map((key) => (
            <div
              key={key}
              className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 
            }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {modules[key].title}
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {modules[key].description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleStartLesson(key);
                  }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Start</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

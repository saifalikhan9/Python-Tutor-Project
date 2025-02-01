import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Star, Award, Lock } from 'lucide-react';

export const Lessons= () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('all');

  const lessons = [
    {
      id: '1',
      title: 'Meet Python, Your New Friend!',
      description: 'Start your coding adventure by learning about Python and writing your first program.',
      difficulty: 'beginner',
      completed: false,
      duration: '20 mins',
      xp: 100,
      locked: false,
    },
    {
      id: '2',
      title: 'Numbers and Math Magic',
      description: 'Learn how to use Python to solve math problems and create cool number games!',
      difficulty: 'beginner',
      completed: false,
      duration: '25 mins',
      xp: 150,
      locked: false,
    },
    {
      id: '3',
      title: 'Making Decisions with If Statements',
      description: 'Teach your program to make smart choices using if statements - just like a robot brain!',
      difficulty: 'beginner',
      completed: false,
      duration: '30 mins',
      xp: 200,
      locked: true,
    },
    {
      id: '4',
      title: 'Loops: The Power of Repetition',
      description: 'Discover how to make your program repeat tasks using fun loops!',
      difficulty: 'intermediate',
      completed: false,
      duration: '35 mins',
      xp: 250,
      locked: true,
    },
  ];

  const filteredLessons = selectedLevel === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.difficulty === selectedLevel);

  const handleStartLesson = (lessonId) => {
    navigate(`/lessons/${lessonId}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Python Adventures</h1>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 ${
              lesson.locked ? 'opacity-75' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {lesson.title}
                  </h2>
                  {lesson.locked && <Lock className="w-4 h-4 text-gray-400" />}
                </div>
                <p className="text-gray-600 mb-4">{lesson.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full font-medium
                    ${lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : ''}
                    ${lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${lesson.difficulty === 'advanced' ? 'bg-red-100 text-red-800' : ''}`}
                  >
                    {lesson.difficulty}
                  </span>
                  <span className="flex items-center text-gray-500">
                    <Star className="w-4 h-4 mr-1" />
                    {lesson.xp} XP
                  </span>
                  <span className="text-gray-500">
                    {lesson.duration}
                  </span>
                </div>
              </div>
              <button
                onClick={() => !lesson.locked && handleStartLesson(lesson.id)}
                className={`ml-4 px-6 py-2 rounded-lg transition-colors flex items-center space-x-2
                  ${lesson.locked 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                disabled={lesson.locked}
              >
                {lesson.completed ? (
                  <>
                    <Award className="w-5 h-5" />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-5 h-5" />
                    <span>Start</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header.jsx';
import { Home } from './pages/Home.jsx';
import { Lessons } from './pages/Lesson.jsx';
import { LessonView } from './pages/LessonView.jsx';
import { Playground } from './pages/Playground.jsx';
import { Settings } from './pages/Settings.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lessons/:id" element={<LessonView />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
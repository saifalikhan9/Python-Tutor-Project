import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home.jsx";
import { Lessons } from "./pages/Lesson.jsx";
import { LessonView } from "./pages/LessonView.jsx";
import { Playground } from "./pages/Playground.jsx";
import { Settings } from "./pages/Settings.jsx";
import useAuth from "./hooks/useAuth.js";
import { SignIn } from "./pages/SignIn.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { useApiKey } from "./context/ApiKeyContext.jsx";

function App() {
  const { isAuthenticated } = useAuth();
  const { apiKey } = useApiKey();

  return (
    
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          {isAuthenticated && <Header />}
          <main
            className={isAuthenticated ? "container mx-auto px-4 py-8" : ""}
          >
            <Routes>
              <Route
                path="/signin"
                element={
                  isAuthenticated ? <Navigate to="/" replace /> : <SignIn />
                }
              />
              <Route
                path="/signup"
                element={
                  isAuthenticated ? <Navigate to="/" replace /> : <SignUp />
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    {apiKey ? <Home /> : <Navigate to="/settings" replace />}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lessons"
                element={
                  <ProtectedRoute>
                    {apiKey ? <Lessons /> : <Navigate to="/settings" replace />}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lessons/:id"
                element={
                  <ProtectedRoute>
                    {apiKey ? (
                      <LessonView />
                    ) : (
                      <Navigate to="/settings" replace />
                    )}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/playground"
                element={
                  <ProtectedRoute>
                    {apiKey ? (
                      <Playground />
                    ) : (
                      <Navigate to="/settings" replace />
                    )}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>

  );
}

export default App;

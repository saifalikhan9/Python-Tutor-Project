import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Settings,LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth';


export const Header = () => {
  const {isAuthenticated, logout} = useAuth()
  const handleLogout = async () =>{
    try {
      await logout();
      window.location.reload();
      
    } catch (error) {
      console.log(error,"errors");
      
    }
  }
  return (


    <header className="bg-indigo-600 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
          <Brain className="w-8 h-8" />
          <span>PythonBuddy</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/lessons" className="hover:text-indigo-200 transition-colors">
            Lessons
          </Link>
          <Link to="/playground" className="hover:text-indigo-200 transition-colors">
            Playground
          </Link>
          <Link to="/settings" className="hover:text-indigo-200 transition-colors">
            <Settings className="w-6 h-6" />
          </Link>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 hover:text-indigo-200 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-6 h-6" />
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
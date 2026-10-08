import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, User, LogOut, PlusCircle } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 text-brand-600 font-bold text-xl">
            <Briefcase className="h-6 w-6" />
            <span>JobNest</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/jobs" className="text-slate-600 hover:text-brand-600 font-medium">Find Jobs</Link>
            {user?.role === 'employer' && (
              <Link to="/dashboard" className="text-slate-600 hover:text-brand-600 font-medium flex items-center space-x-1">
                <PlusCircle className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
                  <User className="h-4 w-4 text-slate-500" />
                  {user.name} ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center text-sm font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition"
                >
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2">
                  Sign In
                </Link>
                <Link to="/register" className="text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 px-4 py-2 rounded-lg transition">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
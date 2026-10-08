import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.get('/users');
      const users = res.data.data || [];
      const foundUser = users.find(u => u.email === email);

      if (foundUser) {
        login(foundUser);
        navigate(foundUser.role === 'employer' ? '/dashboard' : '/jobs');
      } else {
        setError('User not found. Please verify your credentials.');
      }
    } catch (err) {
      setError('Login request failed. Check API connectivity.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-xl border border-slate-200">
      <h2 className="text-2xl font-bold text-center text-slate-900 mb-6">Welcome Back</h2>
      {error && <div className="mb-4 text-xs bg-rose-50 text-rose-600 p-3 rounded-lg">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>
        <button type="submit" className="w-full bg-brand-600 text-white font-medium py-2.5 rounded-lg text-sm hover:bg-brand-700 transition">
          Sign In
        </button>
      </form>
      <p className="mt-4 text-center text-xs text-slate-500">
        Don't have an account? <Link to="/register" className="text-brand-600 font-semibold">Register</Link>
      </p>
    </div>
  );
}
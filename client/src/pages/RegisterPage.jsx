import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosInstance';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/users', { name, email, password, role });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-xl border border-slate-200">
      <h2 className="text-2xl font-bold text-center text-slate-900 mb-6">Create JobNest Account</h2>
      {error && <div className="mb-4 text-xs bg-rose-50 text-rose-600 p-3 rounded-lg">{error}</div>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Account Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2 text-sm"
          >
            <option value="candidate">Job Candidate</option>
            <option value="employer">Employer / Company</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-brand-600 text-white font-medium py-2 rounded-lg text-sm">
          Register Account
        </button>
      </form>
    </div>
  );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

export default function HomePage() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?q=${encodeURIComponent(keyword)}&loc=${encodeURIComponent(location)}`);
  };

  return (
    <div className="space-y-12">
      <section className="bg-slate-900 py-20 text-white text-center rounded-2xl px-4 mt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Find the Job That Fits Your Life
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
          Explore thousands of remote, full-time, and hybrid opportunities at top companies.
        </p>

        <form onSubmit={handleSearch} className="max-w-3xl mx-auto bg-white p-2 rounded-xl shadow-lg flex flex-col md:flex-row gap-2">
          <div className="flex items-center flex-1 px-3 py-2 text-slate-700">
            <Search className="h-5 w-5 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Job title or skill..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full focus:outline-none text-sm"
            />
          </div>
          <div className="flex items-center flex-1 px-3 py-2 text-slate-700 border-t md:border-t-0 md:border-l border-slate-200">
            <MapPin className="h-5 w-5 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="City or Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full focus:outline-none text-sm"
            />
          </div>
          <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 rounded-lg text-sm transition">
            Search
          </button>
        </form>
      </section>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api/axiosInstance';
import JobCard from '../components/JobCard';

export default function JobListingsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('q') || '';
  const loc = searchParams.get('loc') || '';

  useEffect(() => {
    fetchJobs();
  }, [query, loc]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await API.get('/jobs');
      let data = response.data.data || [];

      if (query) {
        data = data.filter(j => j.title.toLowerCase().includes(query.toLowerCase()));
      }
      if (loc) {
        data = data.filter(j => j.location.toLowerCase().includes(loc.toLowerCase()));
      }

      setJobs(data);
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Job Listings</h2>
        <span className="text-sm text-slate-500">{jobs.length} jobs available</span>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500">Loading listings...</div>
      ) : jobs.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-xl border border-slate-200">
          <p className="text-slate-500">No job opportunities found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
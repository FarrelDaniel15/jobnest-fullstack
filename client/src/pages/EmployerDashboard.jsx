import { useState, useEffect } from 'react';
import API from '../api/axiosInstance';
import { Trash, Plus } from 'lucide-react';

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState('FULL_TIME');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await API.get('/jobs');
      setJobs(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      await API.post('/jobs', {
        companyId: 1,
        categoryId: 1,
        title,
        description,
        salary: parseInt(salary) || null,
        jobType,
        location,
      });
      setTitle('');
      setLocation('');
      setSalary('');
      setDescription('');
      loadJobs();
    } catch (err) {
      console.error('Failed to create job', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      await API.delete(`/jobs/${id}`);
      loadJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">Employer Management Dashboard</h1>

      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-brand-600" /> Create Job Listing
        </h2>
        <form onSubmit={handleCreateJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Job Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 text-sm rounded-lg"
          />
          <input
            type="text"
            placeholder="Location (e.g. Jakarta / Remote)"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 text-sm rounded-lg"
          />
          <input
            type="number"
            placeholder="Monthly Salary (IDR)"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="border p-2 text-sm rounded-lg"
          />
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="border p-2 text-sm rounded-lg"
          >
            <option value="FULL_TIME">FULL_TIME</option>
            <option value="PART_TIME">PART_TIME</option>
            <option value="REMOTE">REMOTE</option>
            <option value="INTERNSHIP">INTERNSHIP</option>
          </select>
          <textarea
            placeholder="Detailed description..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 text-sm rounded-lg md:col-span-2"
            rows="3"
          ></textarea>
          <button type="submit" className="md:col-span-2 bg-brand-600 text-white font-medium py-2 rounded-lg text-sm">
            Publish Job Listing
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b text-xs font-semibold text-slate-700 uppercase">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Type</th>
              <th className="p-4">Location</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-900">{job.title}</td>
                <td className="p-4">{job.jobType}</td>
                <td className="p-4">{job.location}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(job.id)} className="text-rose-600 hover:text-rose-800">
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
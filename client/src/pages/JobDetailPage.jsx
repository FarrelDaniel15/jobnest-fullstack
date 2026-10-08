import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Building, DollarSign } from 'lucide-react';

export default function JobDetailPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resumeUrl, setResumeUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data.data);
      } catch (err) {
        console.error('Job error', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetail();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');

    try {
      setApplying(true);
      await API.post('/applications', {
        jobId: parseInt(id),
        userId: user.id,
        resumeUrl,
        notes,
      });
      setMessage({ type: 'success', text: 'Application submitted successfully!' });
      setResumeUrl('');
      setNotes('');
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to submit application.' });
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="py-12 text-center text-slate-500">Loading job details...</div>;
  if (!job) return <div className="py-12 text-center text-slate-500">Job not found.</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
            <span className="flex items-center"><Building className="h-4 w-4 mr-1"/> {job.company?.name || 'Company'}</span>
            <span className="flex items-center"><MapPin className="h-4 w-4 mr-1"/> {job.location}</span>
            {job.salary && <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1"/> Rp {job.salary.toLocaleString('id-ID')}</span>}
          </div>
          <hr className="my-4" />
          <h2 className="font-semibold text-slate-800 mb-2">Job Description</h2>
          <p className="text-slate-600 whitespace-pre-line leading-relaxed text-sm">{job.description}</p>
        </div>
      </div>

      <div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 sticky top-20">
          <h3 className="font-bold text-slate-900 text-lg">Apply for this position</h3>
          {message && (
            <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleApply} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Resume / CV Link</label>
              <input
                type="url"
                required
                placeholder="https://drive.google.com/..."
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Cover Note</label>
              <textarea
                rows="3"
                placeholder="Brief introduction..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={applying}
              className="w-full bg-brand-600 text-white font-medium py-2.5 rounded-lg text-sm hover:bg-brand-700 transition disabled:opacity-50"
            >
              {applying ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { MapPin, DollarSign } from 'lucide-react';

export default function JobCard({ job }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-slate-900 hover:text-brand-600">
            <Link to={`/jobs/${job.id}`}>{job.title}</Link>
          </h3>
          <span className="text-xs bg-brand-50 text-brand-700 font-medium px-2.5 py-1 rounded-full">
            {job.jobType}
          </span>
        </div>
        <p className="text-sm text-slate-600 mb-4">{job.company?.name || 'Company'}</p>
        
        <div className="space-y-1.5 text-xs text-slate-500 mb-4">
          <div className="flex items-center space-x-1.5">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span>{job.location}</span>
          </div>
          {job.salary && (
            <div className="flex items-center space-x-1.5">
              <DollarSign className="h-3.5 w-3.5 text-slate-400" />
              <span>Rp {job.salary.toLocaleString('id-ID')} / month</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Posted {new Date(job.createdAt).toLocaleDateString()}
        </span>
        <Link
          to={`/jobs/${job.id}`}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700"
        >
          View Details &rarr;
        </Link>
      </div>
    </div>
  );
}
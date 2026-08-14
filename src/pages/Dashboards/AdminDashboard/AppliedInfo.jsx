import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { FaSearch, FaCheckCircle, FaTimesCircle, FaUserPlus } from 'react-icons/fa';

const AppliedInfo = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: requests = [], refetch, isLoading } = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/v1/users/private');
      return res.data;
    },
  });

  const handleApprove = (user) => {
    Swal.fire({
      title: 'Approve as Instructor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0BAC7C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/api/v1/users/instructor_approved/${user._id}`).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({ title: 'Approved!', icon: 'success' });
          }
        });
      }
    });
  };

  const handleReject = (user) => {
    Swal.fire({
      title: 'Reject this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#0BAC7C',
      confirmButtonText: 'Yes, Reject',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/api/v1/users/instructor_rejected/${user._id}`).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({ title: 'Rejected!', icon: 'success' });
          }
        });
      }
    });
  };

  // Only show users who have applied (have a status field)
  const applicants = requests.filter((u) => u.status);

  const filtered = applicants.filter((u) => {
    const q = search.toLowerCase();
    const matchesSearch =
      u.displayName?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.title?.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusBadge = (status) => {
    if (status === 'approved') return 'bg-green-100 text-green-700';
    if (status === 'rejected') return 'bg-red-100 text-red-700';
    return 'bg-amber-100 text-amber-700';
  };

  const counts = {
    pending: applicants.filter((u) => u.status === 'pending').length,
    approved: applicants.filter((u) => u.status === 'approved').length,
    rejected: applicants.filter((u) => u.status === 'rejected').length,
  };

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="Instructor Applicants | GS Classroom" />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">Teacher Requests</h1>
        <p className="text-slate-500 mt-2">
          {applicants.length} total applications &mdash; review and approve instructor requests.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Pending', value: counts.pending, cls: 'border-amber-200 bg-amber-50 text-amber-700' },
          { label: 'Approved', value: counts.approved, cls: 'border-green-200 bg-green-50 text-green-700' },
          { label: 'Rejected', value: counts.rejected, cls: 'border-red-200 bg-red-50 text-red-700' },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl border p-5 ${s.cls}`}>
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="text-sm font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch size={14} />
            </span>
            <input
              type="text"
              placeholder="Search by name, email, or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary transition text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-3 px-3 rounded-xl border border-gray-200 outline-none focus:border-primary bg-white text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applicant list */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <img className="w-48" src="https://i.ibb.co/TqhV9yt/loading.gif" alt="Loading" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
          <div className="text-gray-300 text-5xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-secondary">No requests found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((user, idx) => (
            <div
              key={user._id}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {/* Left: avatar + info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span className="text-sm text-gray-400 w-5 shrink-0">{idx + 1}</span>
                  <img
                    src={user.photoURL || 'https://i.pravatar.cc/150?img=10'}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-secondary truncate">{user.displayName}</h3>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>

                {/* Middle: details */}
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 shrink-0">
                  {user.title && (
                    <span className="bg-gray-100 px-2.5 py-1.5 rounded-lg">
                      <span className="font-medium text-gray-700">Title:</span> {user.title}
                    </span>
                  )}
                  {user.category && (
                    <span className="bg-gray-100 px-2.5 py-1.5 rounded-lg">
                      <span className="font-medium text-gray-700">Category:</span> {user.category}
                    </span>
                  )}
                  {user.experience && (
                    <span className="bg-gray-100 px-2.5 py-1.5 rounded-lg">
                      <span className="font-medium text-gray-700">Exp:</span> {user.experience}
                    </span>
                  )}
                </div>

                {/* Right: status + actions */}
                <div className="flex items-center gap-3 shrink-0 flex-wrap">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusBadge(user.status)}`}>
                    {user.status}
                  </span>

                  {user.status !== 'approved' && user.status !== 'rejected' && (
                    <>
                      <button
                        onClick={() => handleApprove(user)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600 transition"
                      >
                        <FaCheckCircle size={12} /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(user)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition"
                      >
                        <FaTimesCircle size={12} /> Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedInfo;

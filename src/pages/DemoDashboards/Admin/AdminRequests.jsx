import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { FaSearch, FaUserCheck, FaUserTimes, FaEnvelope, FaFileAlt, FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useLocalStorage } from '../../../hooks/useStorage';
import { mockTeacherRequests, mockUsers } from '../../../data/mockData';

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700' },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700' }
};

const AdminRequests = () => {
  const [requests, setRequests] = useLocalStorage('demo_teacher_requests', mockTeacherRequests);
  const [users, setUsers] = useLocalStorage('demo_users', mockUsers);
  const [searchQuery, setSearchQuery] = useLocalStorage('demo_admin_request_search', '');
  const [filterStatus, setFilterStatus] = useLocalStorage('demo_admin_request_filter', 'all');

  const filteredRequests = useMemo(() => {
    let result = [...requests];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r =>
        r.displayName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q)
      );
    }
    if (filterStatus !== 'all') {
      result = result.filter(r => r.status === filterStatus);
    }
    return result;
  }, [requests, searchQuery, filterStatus]);

  const counts = useMemo(() => ({
    all: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  }), [requests]);

  const handleApprove = (req) => {
    Swal.fire({
      title: `Approve ${req.displayName}?`,
      html: `<p class="text-slate-600">They will be granted Teacher access to the platform.</p><div class="mt-3 text-left text-sm bg-green-50 p-3 rounded-lg"><b>Role:</b> ${req.title}<br/><b>Experience:</b> ${req.experience}`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, approve',
      borderRadius: '12px'
    }).then((result) => {
      if (result.isConfirmed) {
        setRequests(prev => prev.map(r => r._id === req._id ? { ...r, status: 'approved' } : r));
        const newUser = {
          _id: `u${Date.now()}`,
          displayName: req.displayName,
          email: req.email,
          photoURL: req.photoURL,
          role: 'teacher',
          title: req.title,
          status: 'approved',
          experience: req.experience
        };
        setUsers(prev => [...prev, newUser]);
        toast.success(`${req.displayName} approved as Teacher! 🎉`);
      }
    });
  };

  const handleReject = (req) => {
    Swal.fire({
      title: `Reject ${req.displayName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, reject',
      borderRadius: '12px'
    }).then((result) => {
      if (result.isConfirmed) {
        setRequests(prev => prev.map(r => r._id === req._id ? { ...r, status: 'rejected' } : r));
        toast.success(`${req.displayName}'s application has been rejected.`);
      }
    });
  };

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="Teacher Requests | Admin Demo" />

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
          Teacher Applications
        </h1>
        <p className="text-slate-500 mt-2">
          Review and manage teacher role change requests.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <button
          onClick={() => setFilterStatus('all')}
          className={`p-4 rounded-xl border-2 transition text-left ${
            filterStatus === 'all'
              ? 'bg-gray-100 border-gray-400 shadow-md'
              : 'bg-white border-gray-100 hover:bg-gray-50'
          }`}
        >
          <div className="text-2xl font-bold text-gray-700">{counts.all}</div>
          <div className="text-xs font-medium text-slate-500 mt-1">All Requests</div>
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`p-4 rounded-xl border-2 transition text-left ${
            filterStatus === 'pending'
              ? 'bg-amber-50 border-amber-400 shadow-md'
              : 'bg-white border-gray-100 hover:bg-amber-50'
          }`}
        >
          <div className="text-2xl font-bold text-amber-600">{counts.pending}</div>
          <div className="text-xs font-medium text-amber-700 mt-1">Pending Review</div>
        </button>
        <button
          onClick={() => setFilterStatus('approved')}
          className={`p-4 rounded-xl border-2 transition text-left ${
            filterStatus === 'approved'
              ? 'bg-green-50 border-green-400 shadow-md'
              : 'bg-white border-gray-100 hover:bg-green-50'
          }`}
        >
          <div className="text-2xl font-bold text-green-600">{counts.approved}</div>
          <div className="text-xs font-medium text-green-700 mt-1">Approved</div>
        </button>
        <button
          onClick={() => setFilterStatus('rejected')}
          className={`p-4 rounded-xl border-2 transition text-left ${
            filterStatus === 'rejected'
              ? 'bg-red-50 border-red-400 shadow-md'
              : 'bg-white border-gray-100 hover:bg-red-50'
          }`}
        >
          <div className="text-2xl font-bold text-red-600">{counts.rejected}</div>
          <div className="text-xs font-medium text-red-700 mt-1">Rejected</div>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search by applicant name, email or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 transition"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="py-3 px-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 bg-white text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
          <div className="text-gray-300 text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-secondary">No requests found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map(req => {
            const status = statusConfig[req.status] || statusConfig.pending;
            return (
              <div key={req._id} className={`bg-white rounded-xl border overflow-hidden hover:shadow-lg transition ${
                req.status === 'pending' ? 'border-amber-200' :
                req.status === 'approved' ? 'border-green-200' : 'border-red-200'
              }`}>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">
                  <div className="p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                      <img src={req.photoURL} alt={req.displayName} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between flex-wrap gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-xl font-bold text-secondary">{req.displayName}</h3>
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${status.color}`}>
                                {status.label}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500 mt-0.5">{req.email}</p>
                          </div>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <FaFileAlt size={11} /> Applied {req.appliedDate}
                          </span>
                        </div>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-3 rounded-xl bg-gray-50">
                            <div className="text-xs text-slate-400 font-medium">Applying For</div>
                            <div className="text-sm font-semibold text-secondary mt-0.5">{req.title}</div>
                          </div>
                          <div className="p-3 rounded-xl bg-gray-50">
                            <div className="text-xs text-slate-400 font-medium">Experience</div>
                            <div className="text-sm font-semibold text-secondary mt-0.5">{req.experience}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`p-5 md:p-6 lg:flex lg:flex-col lg:justify-center gap-2 lg:min-w-[200px] ${
                    req.status === 'pending' ? 'bg-amber-50/50' :
                    req.status === 'approved' ? 'bg-green-50/50' : 'bg-red-50/50'
                  }`}>
                    <button
                      onClick={() => toast.success('Opening application details...')}
                      className="w-full py-2.5 rounded-lg bg-white border border-gray-200 text-slate-600 text-sm font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                    >
                      <FaEye size={13} /> View Details
                    </button>
                    <button
                      onClick={() => toast.success(`Email to ${req.displayName} opened...`)}
                      className="w-full py-2.5 rounded-lg bg-white border border-gray-200 text-slate-600 text-sm font-semibold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition flex items-center justify-center gap-2"
                    >
                      <FaEnvelope size={13} /> Contact
                    </button>
                    {req.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(req)}
                          className="w-full py-2.5 rounded-lg bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2 shadow-md shadow-green-500/20"
                        >
                          <FaCheck size={13} /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(req)}
                          className="w-full py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2 shadow-md shadow-red-500/20"
                        >
                          <FaTimes size={13} /> Reject
                        </button>
                      </>
                    )}
                    {req.status === 'approved' && (
                      <div className="w-full py-2.5 rounded-lg bg-green-100 text-green-700 text-sm font-semibold text-center flex items-center justify-center gap-2">
                        <FaUserCheck size={13} /> Teacher Added
                      </div>
                    )}
                    {req.status === 'rejected' && (
                      <div className="w-full py-2.5 rounded-lg bg-red-100 text-red-700 text-sm font-semibold text-center flex items-center justify-center gap-2">
                        <FaUserTimes size={13} /> Rejected
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminRequests;

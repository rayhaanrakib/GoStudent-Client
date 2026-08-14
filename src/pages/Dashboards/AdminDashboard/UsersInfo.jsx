import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { FaSearch, FaUserShield, FaUsers, FaChalkboardTeacher, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const USERS_PER_PAGE = 10;

const UsersInfo = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/v1/users/private');
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: 'Make this user an Admin?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Make Admin',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/api/v1/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({ title: 'Done!', icon: 'success' });
          }
        });
      }
    });
  };

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const q = search.toLowerCase();
      const matchesSearch =
        u.displayName?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
      const matchesRole = roleFilter === 'all' || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / USERS_PER_PAGE));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * USERS_PER_PAGE;
    return filtered.slice(start, start + USERS_PER_PAGE);
  }, [filtered, currentPage]);

  const roleBadge = (role) => {
    if (role === 'admin') return 'bg-orange-100 text-orange-700';
    if (role === 'teacher') return 'bg-blue-100 text-blue-700';
    return 'bg-green-100 text-green-700';
  };

  const counts = {
    students: users.filter((u) => u.role === 'student').length,
    teachers: users.filter((u) => u.role === 'teacher').length,
    admins: users.filter((u) => u.role === 'admin').length,
  };

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="All Users | GS Classroom" />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">All Users</h1>
        <p className="text-slate-500 mt-2">{users.length} registered users on the platform.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Students', value: counts.students, icon: FaUsers, cls: 'border-primary/20 bg-primary/5 text-primary' },
          { label: 'Teachers', value: counts.teachers, icon: FaChalkboardTeacher, cls: 'border-blue-200 bg-blue-50 text-blue-600' },
          { label: 'Admins', value: counts.admins, icon: FaUserShield, cls: 'border-orange-200 bg-orange-50 text-orange-600' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`rounded-xl border p-5 ${s.cls}`}>
              <div className="flex items-center justify-between mb-2">
                <Icon size={20} />
              </div>
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="text-sm font-medium mt-1">{s.label}</div>
            </div>
          );
        })}
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
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary transition text-sm"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
            className="py-3 px-3 rounded-xl border border-gray-200 outline-none focus:border-primary bg-white text-sm"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* User list */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <img className="w-48" src="https://i.ibb.co/TqhV9yt/loading.gif" alt="Loading" />
        </div>
      ) : paginated.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
          <div className="text-gray-300 text-5xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-secondary">No users found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {paginated.map((u, idx) => (
            <div
              key={u._id}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="text-sm text-gray-400 w-6 shrink-0">
                  {(currentPage - 1) * USERS_PER_PAGE + idx + 1}
                </span>
                <img
                  src={u.photoURL || 'https://i.pravatar.cc/150?img=10'}
                  alt={u.displayName}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-semibold text-secondary truncate">{u.displayName}</h3>
                  <p className="text-xs text-slate-500 truncate">{u.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 flex-wrap">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${roleBadge(u.role)}`}>
                  {u.role}
                </span>
                {u.role !== 'admin' ? (
                  <button
                    onClick={() => handleMakeAdmin(u)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-orange-500 text-white text-xs font-medium hover:bg-orange-600 transition"
                  >
                    <FaUserShield size={12} /> Make Admin
                  </button>
                ) : (
                  <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-500 text-xs">
                    Already Admin
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
          <p className="text-sm text-slate-500">
            Showing {(currentPage - 1) * USERS_PER_PAGE + 1}–{Math.min(currentPage * USERS_PER_PAGE, filtered.length)} of {filtered.length} users
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <FaChevronLeft size={12} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg border text-sm font-medium transition ${
                  page === currentPage
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersInfo;

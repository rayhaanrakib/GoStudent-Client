import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { FaSearch, FaFilter, FaEnvelope, FaUserShield, FaChalkboardTeacher, FaUserGraduate, FaBan, FaUserCheck } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useLocalStorage } from '../../../hooks/useStorage';
import { mockUsers } from '../../../data/mockData';

const roleConfig = {
  student: { label: 'Student', color: 'bg-primary/10 text-primary', Icon: FaUserGraduate },
  teacher: { label: 'Teacher', color: 'bg-blue-100 text-blue-600', Icon: FaChalkboardTeacher },
  admin: { label: 'Admin', color: 'bg-orange-100 text-orange-600', Icon: FaUserShield }
};

const AdminUsers = () => {
  const [users, setUsers] = useLocalStorage('demo_users', mockUsers);
  const [searchQuery, setSearchQuery] = useLocalStorage('demo_admin_user_search', '');
  const [filterRole, setFilterRole] = useLocalStorage('demo_admin_user_filter', 'all');

  const filteredUsers = useMemo(() => {
    let result = [...users];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u =>
        u.displayName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.title || '').toLowerCase().includes(q)
      );
    }
    if (filterRole !== 'all') {
      result = result.filter(u => u.role === filterRole);
    }
    return result;
  }, [users, searchQuery, filterRole]);

  const counts = useMemo(() => ({
    all: users.length,
    student: users.filter(u => u.role === 'student').length,
    teacher: users.filter(u => u.role === 'teacher').length,
    admin: users.filter(u => u.role === 'admin').length
  }), [users]);

  const handleBan = (userId, name) => {
    Swal.fire({
      title: `Ban ${name}?`,
      text: "This user will lose access to the platform.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, ban them',
      borderRadius: '12px'
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(prev => prev.filter(u => u._id !== userId));
        toast.success(`User ${name} has been banned.`);
      }
    });
  };

  const promoteTeacher = (userId, name) => {
    Swal.fire({
      title: `Promote ${name} to Teacher?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, promote',
      borderRadius: '12px'
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: 'teacher' } : u));
        toast.success(`${name} promoted to Teacher!`);
      }
    });
  };

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="All Users | Admin Demo" />

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
          Manage Users
        </h1>
        <p className="text-slate-500 mt-2">
          {counts.all} registered users • {filteredUsers.length} showing
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { key: 'all', label: 'All Users', count: counts.all, color: 'from-gray-100 to-gray-50 border-gray-200 text-gray-700' },
          { key: 'student', label: 'Students', count: counts.student, color: 'from-primary/10 to-green-50 border-primary/20 text-primary' },
          { key: 'teacher', label: 'Teachers', count: counts.teacher, color: 'from-blue-100 to-cyan-50 border-blue-200 text-blue-600' },
          { key: 'admin', label: 'Admins', count: counts.admin, color: 'from-orange-100 to-red-50 border-orange-200 text-orange-600' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilterRole(tab.key)}
            className={`p-4 rounded-xl border-2 transition text-left ${
              filterRole === tab.key
                ? tab.color + ' shadow-md border-current'
                : 'bg-white border-gray-100 hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl font-bold">{tab.count}</div>
            <div className="text-xs font-medium text-slate-500 mt-1">{tab.label}</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search users by name, email, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" size={14} />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="py-3 px-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 bg-white text-sm"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
          <div className="text-gray-300 text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-secondary">No users found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredUsers.map(u => {
            const role = roleConfig[u.role] || roleConfig.student;
            const RoleIcon = role.Icon;
            return (
              <div key={u._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition p-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img src={u.photoURL} alt={u.displayName} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${role.color} flex items-center justify-center`}>
                      <RoleIcon size={9} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-secondary truncate">{u.displayName}</h3>
                        <p className="text-xs text-slate-500 truncate">{u.email}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${role.color}`}>
                        {role.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{u.title || '—'}</p>
                    {u.experience && (
                      <p className="text-xs text-blue-500 mt-1 font-medium">{u.experience} experience</p>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => toast.success(`Email draft opened for ${u.displayName}`)}
                    className="py-2 rounded-lg bg-gray-50 text-slate-600 text-xs font-semibold hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-center gap-1.5"
                  >
                    <FaEnvelope size={11} /> Email
                  </button>
                  {u.role === 'student' && (
                    <button
                      onClick={() => promoteTeacher(u._id, u.displayName)}
                      className="py-2 rounded-lg bg-gray-50 text-slate-600 text-xs font-semibold hover:bg-blue-100 hover:text-blue-700 transition flex items-center justify-center gap-1.5"
                    >
                      <FaUserCheck size={11} /> Promote
                    </button>
                  )}
                  {u.role !== 'admin' && (
                    <button
                      onClick={() => handleBan(u._id, u.displayName)}
                      className="py-2 rounded-lg bg-gray-50 text-slate-600 text-xs font-semibold hover:bg-red-100 hover:text-red-700 transition col-span-2 flex items-center justify-center gap-1.5"
                    >
                      <FaBan size={11} /> Ban User
                    </button>
                  )}
                  {u.role === 'admin' && (
                    <button
                      onClick={() => toast.success('Admin account cannot be banned')}
                      className="py-2 rounded-lg bg-gray-50 text-slate-400 text-xs font-semibold cursor-not-allowed col-span-2 flex items-center justify-center gap-1.5"
                    >
                      🔒 Protected Account
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;

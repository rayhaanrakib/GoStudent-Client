import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { FaBook, FaUsers, FaUserShield, FaClipboardList, FaArrowRight, FaChartLine, FaDollarSign, FaCheckCircle, FaUserPlus } from 'react-icons/fa';
import { useLocalStorage } from '../../../hooks/useStorage';
import { mockCourses, mockUsers, mockTeacherRequests } from '../../../data/mockData';

const AdminOverview = () => {
  const [courses] = useLocalStorage('demo_courses', mockCourses);
  const [users] = useLocalStorage('demo_users', mockUsers);
  const [requests, setRequests] = useLocalStorage('demo_teacher_requests', mockTeacherRequests);

  const approvedCourses = courses.filter(c => c.courseStatus === 1).length;
  const pendingCourses = courses.filter(c => c.courseStatus === 0).length;
  const rejectedCourses = courses.filter(c => c.courseStatus === 'rejected').length;
  const students = users.filter(u => u.role === 'student').length;
  const teachers = users.filter(u => u.role === 'teacher').length;
  const admins = users.filter(u => u.role === 'admin').length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;

  const totalEnrollment = courses.reduce((acc, c) => acc + c.totalEnrollment, 0);
  const totalRevenue = courses.reduce((acc, c) => acc + (c.price * c.totalEnrollment), 0);

  const stats = [
    { label: 'Total Users', value: users.length, icon: FaUsers, color: 'bg-orange-100 text-orange-600', border: 'border-orange-200', sub: `${students}S • ${teachers}T • ${admins}A` },
    { label: 'Total Classes', value: courses.length, icon: FaBook, color: 'bg-purple-100 text-purple-600', border: 'border-purple-200', sub: `${approvedCourses} Approved` },
    { label: 'Total Enrollment', value: totalEnrollment, icon: FaCheckCircle, color: 'bg-blue-100 text-blue-600', border: 'border-blue-200', sub: 'All time' },
    { label: 'Platform Revenue', value: totalRevenue, prefix: '$', icon: FaDollarSign, color: 'bg-green-100 text-green-600', border: 'border-green-200', sub: 'Gross value' }
  ];

  const recentRequests = [...requests].filter(r => r.status === 'pending').slice(0, 3);

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="Admin Overview | GS Classroom Demo" />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
          Welcome back, Chris! 👋
        </h1>
        <p className="text-slate-500 mt-2">
          Platform overview and activity at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`bg-white rounded-xl p-5 border ${stat.border} shadow-sm hover:shadow-md transition`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon size={20} />
                </div>
                <FaChartLine className="text-green-500 text-xs" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-secondary">
                {stat.prefix || ''}<CountUp end={Number(stat.value)} duration={1.5} />{stat.suffix || ''}
              </div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              {stat.sub && <div className="text-xs text-slate-400 mt-1">{stat.sub}</div>}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <h2 className="text-xl font-semibold text-secondary">Class Status Distribution</h2>
            <Link to="/demo/admin/classes" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Manage <FaArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 text-center">
              <div className="text-4xl font-bold text-green-600">{approvedCourses}</div>
              <div className="text-sm text-green-700 mt-1 font-medium">Approved</div>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 text-center">
              <div className="text-4xl font-bold text-amber-600">{pendingCourses}</div>
              <div className="text-sm text-amber-700 mt-1 font-medium">Pending Review</div>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 text-center">
              <div className="text-4xl font-bold text-red-600">{rejectedCourses}</div>
              <div className="text-sm text-red-700 mt-1 font-medium">Rejected</div>
            </div>
          </div>
          <div className="space-y-3">
            {courses.slice(0, 4).map(c => (
              <div key={c._id} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                <img src={c.courseImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-secondary truncate">{c.courseName}</h4>
                  <p className="text-xs text-slate-500 truncate">{c.instructorName} • {c.totalEnrollment} enrolled</p>
                </div>
                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                  c.courseStatus === 1 ? 'bg-green-100 text-green-700' :
                  c.courseStatus === 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                }`}>
                  {c.courseStatus === 1 ? 'Approved' : c.courseStatus === 0 ? 'Pending' : 'Rejected'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-secondary">Pending Teacher Requests</h2>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">{pendingRequests}</span>
            </div>
            <div className="space-y-3">
              {recentRequests.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">No pending requests 🎉</div>
              ) : (
                recentRequests.map(r => (
                  <div key={r._id} className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 border border-orange-100">
                    <img src={r.photoURL} alt={r.displayName} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-secondary truncate">{r.displayName}</div>
                      <div className="text-xs text-slate-500 truncate">{r.title}</div>
                    </div>
                    <FaUserPlus className="text-orange-500" />
                  </div>
                ))
              )}
            </div>
            <Link to="/demo/admin/requests" className="mt-4 block text-center text-primary font-medium text-sm hover:text-accent transition">
              Review all requests →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
              <FaUserShield size={20} />
            </div>
            <h3 className="text-xl font-bold mb-1">Platform Admin</h3>
            <p className="text-sm text-white/80 mb-5">Manage all users, classes, and teacher applications.</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Link to="/demo/admin/users" className="bg-white/15 hover:bg-white/25 rounded-lg p-2.5 text-center text-sm font-medium transition">
                Users ({users.length})
              </Link>
              <Link to="/demo/admin/classes" className="bg-white/15 hover:bg-white/25 rounded-lg p-2.5 text-center text-sm font-medium transition">
                Classes ({courses.length})
              </Link>
            </div>
            <Link to="/demo/admin/requests" className="flex items-center justify-center gap-2 bg-white text-orange-600 rounded-lg p-3 text-sm font-bold hover:bg-gray-100 transition w-full">
              <FaClipboardList size={14} /> Review Pending Requests
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <h2 className="text-xl font-semibold text-secondary">User Roles Overview</h2>
          <Link to="/demo/admin/users" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Manage Users <FaArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                <FaUsers />
              </div>
              <span className="text-xs font-bold text-primary bg-white px-2 py-0.5 rounded-full">Students</span>
            </div>
            <div className="text-3xl font-bold text-secondary">{students}</div>
            <div className="text-xs text-slate-500 mt-1">Active student accounts</div>
          </div>
          <div className="p-5 rounded-xl border border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <FaBook />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-white px-2 py-0.5 rounded-full">Teachers</span>
            </div>
            <div className="text-3xl font-bold text-secondary">{teachers}</div>
            <div className="text-xs text-slate-500 mt-1">Active teacher accounts</div>
          </div>
          <div className="p-5 rounded-xl border border-orange-200 bg-orange-50">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                <FaUserShield />
              </div>
              <span className="text-xs font-bold text-orange-600 bg-white px-2 py-0.5 rounded-full">Admins</span>
            </div>
            <div className="text-3xl font-bold text-secondary">{admins}</div>
            <div className="text-xs text-slate-500 mt-1">Administrator accounts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;

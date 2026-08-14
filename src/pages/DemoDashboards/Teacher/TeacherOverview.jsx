import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { FaBook, FaUsers, FaDollarSign, FaStar, FaArrowRight, FaPlus, FaEye, FaClock, FaSearch } from 'react-icons/fa';
import { useLocalStorage } from '../../../hooks/useStorage';
import { mockTeacherClasses, mockClassEnrollments } from '../../../data/mockData';
import TablePagination from '../../../components/shared/TablePagination';

const ACTIVITY_PAGE_SIZE = 5;

const TeacherOverview = () => {
  const [teacherClasses] = useLocalStorage('demo_teacher_classes', mockTeacherClasses);
  const [enrollments] = useLocalStorage('demo_class_enrollments', mockClassEnrollments);
  const [activityPage, setActivityPage] = useState(1);
  const [activitySearch, setActivitySearch] = useState('');

  const approvedClasses = teacherClasses.filter(c => c.courseStatus === 1);
  const pendingClasses = teacherClasses.filter(c => c.courseStatus === 0);
  const rejectedClasses = teacherClasses.filter(c => c.courseStatus === 'rejected');
  const totalStudents = enrollments.reduce((acc, e) => acc + e.students.length, 0);
  const totalRevenue = approvedClasses.reduce((acc, c) => acc + (c.price * c.totalEnrollment), 0);
  const avgRating = approvedClasses.length > 0
    ? (approvedClasses.reduce((acc, c) => acc + c.courseRatings, 0) / approvedClasses.length).toFixed(1)
    : 0;

  const stats = [
    { label: 'Active Classes', value: approvedClasses.length, icon: FaBook, color: 'bg-blue-100 text-blue-600', border: 'border-blue-200' },
    { label: 'Total Students', value: totalStudents, icon: FaUsers, color: 'bg-primary/10 text-primary', border: 'border-primary/20' },
    { label: 'Total Revenue', value: totalRevenue, prefix: '$', icon: FaDollarSign, color: 'bg-amber-100 text-amber-600', border: 'border-amber-200' },
    { label: 'Avg. Rating', value: avgRating, icon: FaStar, color: 'bg-purple-100 text-purple-600', border: 'border-purple-200' }
  ];

  const recentClasses = [...approvedClasses].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)).slice(0, 3);

  const allActivityRows = enrollments.flatMap(e =>
    e.students.map(s => ({ enrollment: e, student: s }))
  );

  const filteredActivityRows = activitySearch.trim()
    ? allActivityRows.filter(({ enrollment, student }) => {
        const q = activitySearch.toLowerCase();
        return student.name?.toLowerCase().includes(q) || enrollment.className?.toLowerCase().includes(q);
      })
    : allActivityRows;

  const activityTotalPages = Math.max(1, Math.ceil(filteredActivityRows.length / ACTIVITY_PAGE_SIZE));
  const paginatedActivityRows = filteredActivityRows.slice(
    (activityPage - 1) * ACTIVITY_PAGE_SIZE,
    activityPage * ACTIVITY_PAGE_SIZE
  );

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="Teacher Overview | GS Classroom Demo" />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
          Welcome back, Jessica! 👋
        </h1>
        <p className="text-slate-500 mt-2">
          Here's what's happening with your classes today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`bg-white rounded-xl p-5 border ${stat.border} shadow-sm hover:shadow-md transition`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-secondary">
                {stat.prefix || ''}<CountUp end={Number(stat.value)} duration={1.5} decimals={typeof stat.value === 'string' && stat.value.includes('.') ? 1 : 0} />{stat.suffix || ''}
              </div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-secondary">My Recent Classes</h2>
            <Link to="/demo/teacher/classes" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <FaArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-4">
            {recentClasses.map(cls => (
              <div key={cls._id} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                <img src={cls.courseImage} alt={cls.courseName} className="w-24 h-24 lg:w-32 lg:h-20 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-secondary truncate">{cls.courseName}</h3>
                      <p className="text-xs text-slate-500 mt-1">{cls.courseCategory} • Created {cls.createdDate}</p>
                    </div>
                    <span className="text-lg font-bold text-primary whitespace-nowrap">${cls.price}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><FaUsers size={11} /> {cls.totalEnrollment} enrolled</span>
                    <span className="flex items-center gap-1"><FaStar size={11} className="text-amber-500" /> {cls.courseRatings || 'New'}</span>
                    <span className="flex items-center gap-1"><FaBook size={11} /> {cls.lectures} lectures</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-semibold text-secondary mb-5">Class Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20">
                <div>
                  <div className="font-semibold text-primary text-sm">Approved</div>
                  <div className="text-xs text-slate-500">Live & Enrolling</div>
                </div>
                <div className="text-2xl font-bold text-primary">{approvedClasses.length}</div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div>
                  <div className="font-semibold text-amber-600 text-sm">Pending Review</div>
                  <div className="text-xs text-slate-500">Awaiting Admin</div>
                </div>
                <div className="text-2xl font-bold text-amber-600">{pendingClasses.length}</div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-200">
                <div>
                  <div className="font-semibold text-red-600 text-sm">Rejected</div>
                  <div className="text-xs text-slate-500">Needs Revision</div>
                </div>
                <div className="text-2xl font-bold text-red-600">{rejectedClasses.length}</div>
              </div>
            </div>
          </div>

          <Link to="/demo/teacher/add" className="block">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <FaPlus size={20} />
              </div>
              <h3 className="text-xl font-bold mb-1">Create New Class</h3>
              <p className="text-sm text-white/80 mb-4">Add a new course to start teaching students.</p>
              <div className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                Get Started <FaArrowRight size={12} />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-secondary">Recent Student Activity</h2>
          <Link to="/demo/teacher/students" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View Students <FaArrowRight size={12} />
          </Link>
        </div>
        <div className="mb-4 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FaSearch size={13} />
          </span>
          <input
            type="text"
            placeholder="Search by student name or class..."
            value={activitySearch}
            onChange={(e) => { setActivitySearch(e.target.value); setActivityPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-blue-400 transition text-sm"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider rounded-tl-xl">Student</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Class</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Progress</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider rounded-tr-xl">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedActivityRows.map(({ enrollment, student }) => (
                <tr key={`${enrollment.classId}-${student._id}`} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={student.photo} alt={student.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-sm text-secondary">{student.name}</div>
                        <div className="text-xs text-slate-400">Joined {student.enrolledDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{enrollment.className}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 min-w-[140px]">
                      <div className="flex-1 w-full bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${student.progress >= 80 ? 'bg-primary' : student.progress >= 40 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${student.progress}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 w-10 text-right">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 flex items-center gap-1">
                    <FaClock size={10} /> {student.lastAccessed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination
          currentPage={activityPage}
          totalPages={activityTotalPages}
          totalItems={filteredActivityRows.length}
          pageSize={ACTIVITY_PAGE_SIZE}
          onPageChange={setActivityPage}
          accentClass="bg-blue-500 border-blue-500 text-white"
        />
      </div>
    </div>
  );
};

export default TeacherOverview;

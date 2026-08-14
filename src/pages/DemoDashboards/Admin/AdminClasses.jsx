import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { FaSearch, FaFilter, FaUsers, FaStar, FaCheck, FaTimes, FaEye, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useLocalStorage } from '../../../hooks/useStorage';
import { mockCourses, mockTeacherClasses } from '../../../data/mockData';

const statusConfig = {
  1: { label: 'Approved', classes: 'bg-green-100 text-green-700' },
  0: { label: 'Pending', classes: 'bg-amber-100 text-amber-700' },
  'rejected': { label: 'Rejected', classes: 'bg-red-100 text-red-700' }
};

const AdminClasses = () => {
  const [courses, setCourses] = useLocalStorage('demo_courses', mockCourses);
  const [teacherClasses, setTeacherClasses] = useLocalStorage('demo_teacher_classes', mockTeacherClasses);
  const [searchQuery, setSearchQuery] = useLocalStorage('demo_admin_class_search', '');
  const [filterStatus, setFilterStatus] = useLocalStorage('demo_admin_class_filter', 'all');

  const allClasses = useMemo(() => [...courses], [courses]);

  const filteredClasses = useMemo(() => {
    let result = [...allClasses];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.courseName.toLowerCase().includes(q) ||
        c.instructorName.toLowerCase().includes(q) ||
        c.courseCategory.toLowerCase().includes(q)
      );
    }
    if (filterStatus !== 'all') {
      const statusVal = filterStatus === 'approved' ? 1 : filterStatus === 'pending' ? 0 : 'rejected';
      result = result.filter(c => c.courseStatus === statusVal);
    }
    return result;
  }, [allClasses, searchQuery, filterStatus]);

  const updateStatus = (classId, newStatus) => {
    const target = courses.find(c => c._id === classId);
    const statusLabel = newStatus === 1 ? 'Approved' : newStatus === 0 ? 'Pending' : 'Rejected';

    Swal.fire({
      title: `${statusLabel} this class?`,
      text: target?.courseName,
      icon: newStatus === 1 ? 'success' : newStatus === 'rejected' ? 'warning' : 'question',
      showCancelButton: true,
      confirmButtonColor: newStatus === 1 ? '#10B981' : newStatus === 'rejected' ? '#EF4444' : '#F59E0B',
      cancelButtonColor: '#6B7280',
      confirmButtonText: `Yes, ${statusLabel}`,
      borderRadius: '12px'
    }).then((result) => {
      if (result.isConfirmed) {
        setCourses(prev => prev.map(c => c._id === classId ? { ...c, courseStatus: newStatus } : c));
        setTeacherClasses(prev => prev.map(c => c.courseId === classId ? { ...c, courseStatus: newStatus } : c));
        toast.success(`Class ${statusLabel.toLowerCase()} successfully!`);
      }
    });
  };

  const filterOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="All Classes | Admin Demo" />

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
          All Classes
        </h1>
        <p className="text-slate-500 mt-2">
          {allClasses.length} total classes • {filteredClasses.length} showing
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search class name, instructor, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" size={14} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="py-3 px-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 bg-white text-sm"
            >
              {filterOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {filteredClasses.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
          <div className="text-gray-300 text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-secondary">No classes found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Instructor</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredClasses.map(cls => {
                  const status = statusConfig[cls.courseStatus] || statusConfig[0];
                  return (
                    <tr key={cls._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={cls.courseImage} alt="" className="w-14 h-10 rounded-lg object-cover" />
                          <div className="min-w-0 max-w-[200px]">
                            <div className="font-semibold text-secondary text-sm truncate">{cls.courseName}</div>
                            <div className="text-xs text-slate-400">{cls.lectures} lectures</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <img src={cls.instructorImage} alt="" className="w-7 h-7 rounded-full object-cover" />
                          <span className="text-sm text-slate-600 truncate">{cls.instructorName}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${status.classes}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {cls.courseStatus !== 1 && (
                            <button
                              onClick={() => updateStatus(cls._id, 1)}
                              className="w-8 h-8 rounded-lg bg-gray-50 text-slate-500 hover:bg-green-100 hover:text-green-600 flex items-center justify-center transition" title="Approve"
                            >
                              <FaCheck size={13} />
                            </button>
                          )}
                          {cls.courseStatus !== 'rejected' && (
                            <button
                              onClick={() => updateStatus(cls._id, 'rejected')}
                              className="w-8 h-8 rounded-lg bg-gray-50 text-slate-500 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition" title="Reject"
                            >
                              <FaTimes size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClasses;

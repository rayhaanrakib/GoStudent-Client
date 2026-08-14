import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaUsers, FaStar, FaEdit, FaTrash, FaEye, FaPlus, FaCheckCircle, FaClock, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useLocalStorage } from '../../../hooks/useStorage';
import { mockTeacherClasses, mockCourses } from '../../../data/mockData';
import TablePagination from '../../../components/shared/TablePagination';

const PAGE_SIZE = 6;

const statusConfig = {
  1: { label: 'Approved', classes: 'bg-green-100 text-green-700', icon: FaCheckCircle },
  0: { label: 'Pending', classes: 'bg-amber-100 text-amber-700', icon: FaClock },
  'rejected': { label: 'Rejected', classes: 'bg-red-100 text-red-700', icon: FaTimes }
};

const TeacherClasses = () => {
  const [teacherClasses, setTeacherClasses] = useLocalStorage('demo_teacher_classes', mockTeacherClasses);
  const [courses, setCourses] = useLocalStorage('demo_courses', mockCourses);
  const [searchQuery, setSearchQuery] = useLocalStorage('demo_teacher_class_search', '');
  const [filterStatus, setFilterStatus] = useLocalStorage('demo_teacher_class_filter', 'all');
  const [viewMode, setViewMode] = useLocalStorage('demo_teacher_view_mode', 'grid');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredClasses = useMemo(() => {
    let result = [...teacherClasses];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => c.courseName.toLowerCase().includes(q) || c.courseCategory.toLowerCase().includes(q));
    }
    if (filterStatus !== 'all') {
      const statusVal = filterStatus === 'approved' ? 1 : filterStatus === 'pending' ? 0 : 'rejected';
      result = result.filter(c => c.courseStatus === statusVal);
    }
    return result;
  }, [teacherClasses, searchQuery, filterStatus]);

  const handleDelete = (classId) => {
    Swal.fire({
      title: 'Delete this class?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const target = teacherClasses.find(c => c._id === classId);
        setTeacherClasses(prev => prev.filter(c => c._id !== classId));
        if (target) setCourses(prev => prev.filter(c => c._id !== target.courseId));
        toast.success('Class deleted successfully');
      }
    });
  };

  const filterOptions = [
    { value: 'all', label: 'All Classes' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const totalPages = Math.max(1, Math.ceil(filteredClasses.length / PAGE_SIZE));
  const paginated  = filteredClasses.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleFilterChange = (setter) => (e) => { setter(e.target.value); setCurrentPage(1); };

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="My Classes | Teacher Demo" />

      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
            My Classes
          </h1>
          <p className="text-slate-500 mt-2">
            {teacherClasses.length} total classes • {filteredClasses.length} showing
          </p>
        </div>
        <Link to="/demo/teacher/add" className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-medium hover:bg-accent transition shadow-md shadow-primary/20">
          <FaPlus size={14} /> Add New Class
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search classes..."
              value={searchQuery}
              onChange={handleFilterChange(setSearchQuery)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary transition"
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" size={14} />
              <select
                value={filterStatus}
                onChange={handleFilterChange(setFilterStatus)}
                className="py-3 px-3 rounded-xl border border-gray-200 outline-none focus:border-primary bg-white text-sm"
              >
                {filterOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 text-sm transition ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 text-sm transition ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {filteredClasses.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
          <div className="text-gray-300 text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-secondary">No classes found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your filters or create a new class.</p>
          <Link to="/demo/teacher/add" className="mt-4 inline-flex items-center gap-2 text-primary font-medium">
            <FaPlus /> Create First Class
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginated.map(cls => {
              const status = statusConfig[cls.courseStatus] || statusConfig[0];
              const StatusIcon = status.icon;
              return (
                <div key={cls._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition group">
                  <div className="relative block overflow-hidden">
                    <img src={cls.courseImage} alt={cls.courseName} className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 ${status.classes}`}>
                      <StatusIcon size={10} /> {status.label}
                    </div>
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-xs font-semibold text-primary">
                      {cls.courseCategory}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-secondary font-semibold text-lg line-clamp-1">{cls.courseName}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 h-8">{cls.shortDescription}</p>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 rounded-lg bg-gray-50">
                        <FaUsers className="mx-auto text-slate-400 mb-1" size={14} />
                        <div className="font-bold text-secondary">{cls.totalEnrollment}</div>
                        <div className="text-slate-400">Enrolled</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-gray-50">
                        <FaStar className="mx-auto text-amber-500 mb-1" size={14} />
                        <div className="font-bold text-secondary">{cls.courseRatings || '-'}</div>
                        <div className="text-slate-400">Rating</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-gray-50">
                        <FaUsers className="mx-auto text-blue-500 mb-1" size={14} />
                        <div className="font-bold text-secondary">{cls.lectures}</div>
                        <div className="text-slate-400">Lectures</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-2xl font-bold text-secondary">${cls.price}</span>
                      <div className="flex items-center gap-1">
                        <button className="w-8 h-8 rounded-lg bg-gray-50 text-slate-500 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition" title="View">
                          <FaEye size={13} />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-gray-50 text-slate-500 hover:bg-primary/10 hover:text-primary flex items-center justify-center transition" title="Edit">
                          <FaEdit size={13} />
                        </button>
                        <button onClick={() => handleDelete(cls._id)} className="w-8 h-8 rounded-lg bg-gray-50 text-slate-500 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition" title="Delete">
                          <FaTrash size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredClasses.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider rounded-tl-xl">Class</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Enrolled</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider rounded-tr-xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginated.map((cls, idx) => {
                    const status = statusConfig[cls.courseStatus] || statusConfig[0];
                    const StatusIcon = status.icon;
                    return (
                      <tr key={cls._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-slate-400">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={cls.courseImage} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                            <div>
                              <div className="font-semibold text-secondary text-sm">{cls.courseName}</div>
                              <div className="text-xs text-slate-400">Created {cls.createdDate}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{cls.courseCategory}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${status.classes}`}>
                            <StatusIcon size={10} /> {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 font-medium">{cls.totalEnrollment}</td>
                        <td className="px-6 py-4 text-sm font-bold text-secondary">${cls.price}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <button className="w-8 h-8 rounded-lg bg-gray-50 text-slate-500 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition">
                              <FaEye size={12} />
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-gray-50 text-slate-500 hover:bg-primary/10 hover:text-primary flex items-center justify-center transition">
                              <FaEdit size={12} />
                            </button>
                            <button onClick={() => handleDelete(cls._id)} className="w-8 h-8 rounded-lg bg-gray-50 text-slate-500 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition">
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredClasses.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default TeacherClasses;

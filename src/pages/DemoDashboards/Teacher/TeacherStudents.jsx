import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { FaSearch, FaEnvelope, FaUserGraduate, FaFilter, FaBook, FaClock, FaComments, FaCrown } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useLocalStorage } from '../../../hooks/useStorage';
import { mockClassEnrollments } from '../../../data/mockData';

const TeacherStudents = () => {
  const [enrollments] = useLocalStorage('demo_class_enrollments', mockClassEnrollments);
  const [searchQuery, setSearchQuery] = useLocalStorage('demo_teacher_student_search', '');
  const [filterClass, setFilterClass] = useLocalStorage('demo_teacher_student_filter', 'all');

  const allStudents = useMemo(() => {
    const list = [];
    enrollments.forEach(e => {
      e.students.forEach(s => {
        list.push({ ...s, className: e.className, classId: e.classId });
      });
    });
    return list;
  }, [enrollments]);

  const filteredStudents = useMemo(() => {
    let result = [...allStudents];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(q));
    }
    if (filterClass !== 'all') {
      result = result.filter(s => s.classId === filterClass);
    }
    return result;
  }, [allStudents, searchQuery, filterClass]);

  const avgProgress = filteredStudents.length > 0
    ? Math.round(filteredStudents.reduce((acc, s) => acc + s.progress, 0) / filteredStudents.length)
    : 0;

  const handleMessage = (name) => {
    toast.success(`Opening chat with ${name}...`);
  };

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="My Students | Teacher Demo" />

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
          My Students
        </h1>
        <p className="text-slate-500 mt-2">
          {filteredStudents.length} active students across your classes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-primary/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FaUserGraduate size={18} />
            </div>
          </div>
          <div className="text-2xl font-bold text-secondary">{allStudents.length}</div>
          <div className="text-sm text-slate-500 mt-1">Total Enrolled Students</div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FaBook size={18} />
            </div>
          </div>
          <div className="text-2xl font-bold text-secondary">{enrollments.length}</div>
          <div className="text-sm text-slate-500 mt-1">Active Classes</div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <FaClock size={18} />
            </div>
          </div>
          <div className="text-2xl font-bold text-secondary">{avgProgress}%</div>
          <div className="text-sm text-slate-500 mt-1">Avg. Student Progress</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search students by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" size={14} />
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="py-3 px-3 rounded-xl border border-gray-200 outline-none focus:border-primary bg-white text-sm"
            >
              <option value="all">All Classes</option>
              {enrollments.map(e => <option key={e.classId} value={e.classId}>{e.className}</option>)}
            </select>
          </div>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
          <div className="text-gray-300 text-6xl mb-4">👨‍🎓</div>
          <h3 className="text-xl font-semibold text-secondary">No students found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredStudents.map(s => {
            const isTop = s.progress >= 80;
            return (
              <div key={`${s.classId}-${s._id}`} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition group">
                <div className="h-20 bg-gradient-to-r from-blue-500 to-cyan-500 relative">
                  {isTop && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-400 text-amber-900 px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
                      <FaCrown size={10} /> Top Performer
                    </div>
                  )}
                </div>
                <div className="px-5 pb-5 -mt-10">
                  <div className="relative inline-block">
                    <img src={s.photo} alt={s.name} className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg object-cover" />
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-secondary">{s.name}</h3>
                  <p className="text-sm text-primary font-medium mt-0.5">{s.className}</p>

                  <div className="mt-4 p-4 rounded-xl bg-gray-50 space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-500">Course Progress</span>
                        <span className="font-semibold text-secondary">{s.progress}%</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full transition-all ${
                            s.progress >= 80 ? 'bg-primary' : s.progress >= 40 ? 'bg-blue-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${s.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-gray-200">
                      <span>Enrolled: {s.enrolledDate}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>Last Active: {s.lastAccessed}</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleMessage(s.name)}
                      className="py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition flex items-center justify-center gap-1.5"
                    >
                      <FaEnvelope size={12} /> Message
                    </button>
                    <button className="py-2.5 rounded-xl bg-gray-100 text-slate-600 text-sm font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-1.5">
                      <FaComments size={12} /> Feedback
                    </button>
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

export default TeacherStudents;

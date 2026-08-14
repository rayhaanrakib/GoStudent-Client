import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaClock } from 'react-icons/fa';
import { useLocalStorage } from '../../../hooks/useStorage';
import { mockStudentEnrolled, mockCourses } from '../../../data/mockData';

const StudentClasses = () => {
  const [enrolledCourses, setEnrolledCourses] = useLocalStorage('demo_student_enrolled', mockStudentEnrolled);
  const [courses] = useLocalStorage('demo_courses', mockCourses);
  const [searchQuery, setSearchQuery] = useLocalStorage('demo_student_class_search', '');
  const [filterProgress, setFilterProgress] = useLocalStorage('demo_student_class_filter', 'all');
  const [sortBy, setSortBy] = useLocalStorage('demo_student_class_sort', 'recent');
  const [viewMode, setViewMode] = useLocalStorage('demo_student_view_mode', 'grid');

  const filteredEnrolled = useMemo(() => {
    let result = [...enrolledCourses];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.courseName.toLowerCase().includes(q) ||
        c.instructorName.toLowerCase().includes(q)
      );
    }

    if (filterProgress === 'inprogress') {
      result = result.filter(c => c.progress > 0 && c.progress < 100);
    } else if (filterProgress === 'completed') {
      result = result.filter(c => c.progress === 100);
    } else if (filterProgress === 'notstarted') {
      result = result.filter(c => c.progress === 0);
    }

    if (sortBy === 'recent') {
      result.sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
    } else if (sortBy === 'progress') {
      result.sort((a, b) => b.progress - a.progress);
    } else if (sortBy === 'alpha') {
      result.sort((a, b) => a.courseName.localeCompare(b.courseName));
    }

    return result;
  }, [enrolledCourses, searchQuery, filterProgress, sortBy]);

  const updateProgress = (enrId, newProgress) => {
    setEnrolledCourses(prev => prev.map(c => {
      if (c._id === enrId) {
        const total = c.totalLessons;
        const completed = Math.round((newProgress / 100) * total);
        return { ...c, progress: newProgress, completedLessons: completed, lastAccessed: new Date().toISOString().split('T')[0] };
      }
      return c;
    }));
  };

  const progressOptions = [
    { value: 'all', label: 'All Courses' },
    { value: 'inprogress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'notstarted', label: 'Not Started' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Recently Accessed' },
    { value: 'progress', label: 'Progress %' },
    { value: 'alpha', label: 'A-Z' }
  ];

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="My Classes | Student Demo" />

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
          My Enrolled Classes
        </h1>
        <p className="text-slate-500 mt-2">
          {enrolledCourses.length} courses enrolled • {filteredEnrolled.length} showing
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
              placeholder="Search by course name or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary transition"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" size={14} />
              <select
                value={filterProgress}
                onChange={(e) => setFilterProgress(e.target.value)}
                className="py-3 px-3 rounded-xl border border-gray-200 outline-none focus:border-primary bg-white text-sm"
              >
                {progressOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-3 px-3 rounded-xl border border-gray-200 outline-none focus:border-primary bg-white text-sm"
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>Sort: {o.label}</option>)}
            </select>

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

      {filteredEnrolled.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
          <div className="text-gray-300 text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-secondary">No courses found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your filters or search query.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEnrolled.map(course => (
            <div key={course._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition group">
              <div className="relative block overflow-hidden">
                <img src={course.courseImage} alt={course.courseName} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-semibold ${
                  course.progress === 100 ? 'bg-primary text-white' :
                  course.progress > 0 ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                }`}>
                  {course.progress === 100 ? 'Completed' : course.progress > 0 ? 'In Progress' : 'Not Started'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-secondary font-semibold text-lg truncate">{course.courseName}</h3>
                <p className="text-sm text-slate-500 mt-1">by {course.instructorName}</p>

                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-2">
                    <span>Progress</span>
                    <span className="font-semibold text-primary">{course.progress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={course.progress}
                    onChange={(e) => updateProgress(course._id, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1"><FaClock size={10} /> {course.completedLessons}/{course.totalLessons} lessons</span>
                    <span>Last: {course.lastAccessed}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                    <FaStar size={12} />
                    {courses.find(c => c._id === course.courseId)?.courseRatings || '4.8'}
                  </span>
                  <Link to={`/demo/student/progress`} className="text-primary text-sm font-medium hover:text-accent transition">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEnrolled.map(course => (
            <div key={course._id} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition flex flex-col sm:flex-row gap-4">
              <img src={course.courseImage} alt={course.courseName} className="w-full sm:w-48 h-32 object-cover rounded-lg" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-secondary text-lg">{course.courseName}</h3>
                      <p className="text-sm text-slate-500">by {course.instructorName}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                      course.progress === 100 ? 'bg-primary/10 text-primary' :
                      course.progress > 0 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {course.progress === 100 ? 'Completed' : course.progress > 0 ? `${course.progress}%` : 'Not Started'}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-2">
                    <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                    <span>Last accessed: {course.lastAccessed}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full transition-all" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={course.progress}
                      onChange={(e) => updateProgress(course._id, parseInt(e.target.value))}
                      className="w-24 sm:w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <Link to="/demo/student/progress" className="text-primary text-sm font-medium whitespace-nowrap">Details →</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentClasses;

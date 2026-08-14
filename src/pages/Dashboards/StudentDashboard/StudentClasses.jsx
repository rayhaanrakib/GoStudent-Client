import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import useEnrolled from '../../../hooks/useEnrolled';
import { FaSearch, FaFilter, FaBook, FaArrowRight } from 'react-icons/fa';

const StudentClasses = () => {
  const enrolledInfo = useEnrolled();
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const filtered = useMemo(() => {
    if (!search) return enrolledInfo;
    const q = search.toLowerCase();
    return enrolledInfo.filter(
      (c) =>
        c.courseName?.toLowerCase().includes(q) ||
        c.instructorName?.toLowerCase().includes(q)
    );
  }, [enrolledInfo, search]);

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="Enrolled Courses | GS Classroom" />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
          My Enrolled Classes
        </h1>
        <p className="text-slate-500 mt-2">
          {enrolledInfo.length} courses enrolled &mdash; {filtered.length} showing
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch size={14} />
            </span>
            <input
              type="text"
              placeholder="Search by course name or instructor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary transition text-sm"
            />
          </div>
          <div className="flex rounded-xl border border-gray-200 overflow-hidden shrink-0">
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

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
          <div className="text-gray-300 text-5xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-secondary">No courses found</h3>
          <p className="text-slate-500 mt-2">
            {search ? 'Try adjusting your search.' : "You haven't enrolled in any courses yet."}
          </p>
          {!search && (
            <Link
              to="/all-courses"
              className="mt-4 inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition"
            >
              Browse Courses <FaArrowRight size={12} />
            </Link>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition group"
            >
              <div className="relative block overflow-hidden">
                <img
                  src={course.courseImage}
                  alt={course.courseName}
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-xs font-semibold text-primary flex items-center gap-1">
                  <FaBook size={10} /> Enrolled
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-secondary font-semibold text-lg line-clamp-1">{course.courseName}</h3>
                <p className="text-sm text-slate-500 mt-1">by {course.instructorName}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link to={`/user-dashboard/details/${course.courseId}`}>
                    <button className="w-full text-white bg-primary hover:bg-accent font-medium rounded-xl text-sm px-4 py-2.5 transition flex items-center justify-center gap-2">
                      See Details <FaArrowRight size={12} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <img
                src={course.courseImage}
                alt={course.courseName}
                className="w-full sm:w-40 h-28 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-secondary text-lg truncate">{course.courseName}</h3>
                <p className="text-sm text-slate-500 mt-1">by {course.instructorName}</p>
              </div>
              <div className="shrink-0">
                <Link to={`/user-dashboard/details/${course.courseId}`}>
                  <button className="text-white bg-primary hover:bg-accent font-medium rounded-xl text-sm px-5 py-2.5 transition flex items-center gap-2 whitespace-nowrap">
                    See Details <FaArrowRight size={12} />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentClasses;

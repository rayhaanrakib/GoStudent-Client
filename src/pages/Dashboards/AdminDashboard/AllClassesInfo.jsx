import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaSearch, FaFilter, FaEye, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const AllClassesInfo = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: classesInfo = [], refetch, isLoading } = useQuery({
    queryKey: ['classesInfo'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/v1/admin/courses');
      return res.data;
    },
  });

  const handleApprove = (course) => {
    Swal.fire({
      title: 'Approve this course?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0BAC7C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/api/v1/courses/approved/${course._id}`).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({ title: 'Approved!', icon: 'success' });
          }
        });
      }
    });
  };

  const handleReject = (course) => {
    Swal.fire({
      title: 'Reject this course?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#0BAC7C',
      confirmButtonText: 'Yes, Reject',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/api/v1/courses/rejected/${course._id}`).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({ title: 'Rejected!', icon: 'success' });
          }
        });
      }
    });
  };

  const statusLabel = (status) => {
    if (status === 1) return { text: 'Approved', cls: 'bg-green-100 text-green-700' };
    if (status === 'rejected') return { text: 'Rejected', cls: 'bg-red-100 text-red-700' };
    return { text: 'Pending', cls: 'bg-amber-100 text-amber-700' };
  };

  const filtered = classesInfo.filter((c) => {
    const matchesSearch =
      c.courseName?.toLowerCase().includes(search.toLowerCase()) ||
      c.instructorEmail?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'approved' && c.courseStatus === 1) ||
      (statusFilter === 'pending' && c.courseStatus === 0) ||
      (statusFilter === 'rejected' && c.courseStatus === 'rejected');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="All Courses | GS Classroom" />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
          All Classes
        </h1>
        <p className="text-slate-500 mt-2">
          {classesInfo.length} total &mdash; review and manage course submissions.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Approved', value: classesInfo.filter((c) => c.courseStatus === 1).length, cls: 'border-green-200 bg-green-50 text-green-700' },
          { label: 'Pending', value: classesInfo.filter((c) => c.courseStatus === 0).length, cls: 'border-amber-200 bg-amber-50 text-amber-700' },
          { label: 'Rejected', value: classesInfo.filter((c) => c.courseStatus === 'rejected').length, cls: 'border-red-200 bg-red-50 text-red-700' },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl border p-5 ${s.cls}`}>
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="text-sm font-medium mt-1">{s.label} Courses</div>
          </div>
        ))}
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
              placeholder="Search by course name or instructor email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary transition text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" size={14} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-3 px-3 rounded-xl border border-gray-200 outline-none focus:border-primary bg-white text-sm"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course list */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <img className="w-48" src="https://i.ibb.co/TqhV9yt/loading.gif" alt="Loading" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
          <div className="text-gray-300 text-5xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-secondary">No courses found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((course, idx) => {
            const s = statusLabel(course.courseStatus);
            return (
              <div
                key={course._id}
                className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span className="text-sm text-gray-400 w-5 shrink-0">{idx + 1}</span>
                  <img
                    src={course.courseImage}
                    alt={course.courseName}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-secondary truncate">{course.courseName}</h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{course.instructorEmail}</p>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-1">{course.shortDescription}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 flex-wrap">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${s.cls}`}>
                    {s.text}
                  </span>

                  {course.courseStatus === 1 && (
                    <Link to={`/course/${course._id}`}>
                      <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 transition">
                        <FaEye size={12} /> View
                      </button>
                    </Link>
                  )}

                  {course.courseStatus === 0 && (
                    <>
                      <button
                        onClick={() => handleApprove(course)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600 transition"
                      >
                        <FaCheckCircle size={12} /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(course)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition"
                      >
                        <FaTimesCircle size={12} /> Reject
                      </button>
                    </>
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

export default AllClassesInfo;

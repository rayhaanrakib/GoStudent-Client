import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaClock,
  FaTimes,
} from 'react-icons/fa';
import TablePagination from '../../../components/shared/TablePagination';

const statusConfig = {
  1: { label: 'Approved', cls: 'bg-green-100 text-green-700', icon: FaCheckCircle },
  0: { label: 'Pending', cls: 'bg-amber-100 text-amber-700', icon: FaClock },
  rejected: { label: 'Rejected', cls: 'bg-red-100 text-red-700', icon: FaTimes },
};

const PAGE_SIZE_LIST = 8;
const PAGE_SIZE_GRID = 6;

const AddedClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: addedClasses = [], refetch, isLoading } = useQuery({
    queryKey: ['addedClasses'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/instructor/classes/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id, currentStatus) => {
    if (currentStatus === 1) return; // approved classes can't be deleted
    Swal.fire({
      title: 'Delete this class?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/api/v1/instructor/classes/${id}`).then((res) => {
          if (res.data?.deletedCount) {
            Swal.fire({ title: 'Deleted!', text: 'Course deleted.', icon: 'success' });
            refetch();
          }
        });
      }
    });
  };

  const filtered = addedClasses.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch =
      c.courseName?.toLowerCase().includes(q) ||
      c.courseCategory?.toLowerCase().includes(q);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'approved' && c.courseStatus === 1) ||
      (statusFilter === 'pending' && c.courseStatus === 0) ||
      (statusFilter === 'rejected' && c.courseStatus === 'rejected');
    return matchesSearch && matchesStatus;
  });

  const pageSize = viewMode === 'list' ? PAGE_SIZE_LIST : PAGE_SIZE_GRID;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="My Courses | GS Classroom" />

      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
            My Classes
          </h1>
          <p className="text-slate-500 mt-2">
            {addedClasses.length} total &mdash; {filtered.length} showing
          </p>
        </div>
        <Link
          to="/teacher-dashboard/add"
          className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-medium hover:bg-accent transition shadow-md shadow-primary/20"
        >
          <FaPlus size={13} /> Add New Class
        </Link>
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
              placeholder="Search by name or category..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary transition text-sm"
            />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" size={14} />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="py-3 px-3 rounded-xl border border-gray-200 outline-none focus:border-primary bg-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => { setViewMode('grid'); setCurrentPage(1); }}
                className={`px-4 py-3 text-sm transition ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Grid
              </button>
              <button
                onClick={() => { setViewMode('list'); setCurrentPage(1); }}
                className={`px-4 py-3 text-sm transition ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <img className="w-48" src="https://i.ibb.co/TqhV9yt/loading.gif" alt="Loading" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
          <div className="text-gray-300 text-5xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-secondary">No classes found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your filters or add a new class.</p>
          <Link
            to="/teacher-dashboard/add"
            className="mt-4 inline-flex items-center gap-1 text-primary font-medium"
          >
            <FaPlus size={12} /> Add your first class
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginated.map((course) => {
            const status = statusConfig[course.courseStatus] ?? statusConfig[0];
            const StatusIcon = status.icon;
            return (
              <div
                key={course._id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition group"
              >
                <div className="relative block overflow-hidden">
                  <img
                    src={course.courseImage}
                    alt={course.courseName}
                    className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 ${status.cls}`}
                  >
                    <StatusIcon size={10} /> {status.label}
                  </div>
                  {course.courseCategory && (
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-xs font-semibold text-primary">
                      {course.courseCategory}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-secondary font-semibold text-lg line-clamp-1">{course.courseName}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 h-8">{course.shortDescription}</p>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2 rounded-lg bg-gray-50">
                      <FaUsers className="mx-auto text-slate-400 mb-1" size={14} />
                      <div className="font-bold text-secondary">{course.totalEnrollment ?? 0}</div>
                      <div className="text-slate-400">Enrolled</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-gray-50">
                      <FaStar className="mx-auto text-amber-500 mb-1" size={14} />
                      <div className="font-bold text-secondary">{course.courseRatings ?? '—'}</div>
                      <div className="text-slate-400">Rating</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-gray-50">
                      <FaUsers className="mx-auto text-blue-500 mb-1" size={14} />
                      <div className="font-bold text-secondary">{course.lectures ?? '—'}</div>
                      <div className="text-slate-400">Lectures</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-2xl font-bold text-secondary">${course.price}</span>
                    <div className="flex items-center gap-1">
                      {course.courseStatus === 1 && (
                        <Link to={`/teacher-dashboard/details/${course._id}`}>
                          <button
                            className="w-8 h-8 rounded-lg bg-gray-50 text-slate-500 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition"
                            title="View details"
                          >
                            <FaEye size={13} />
                          </button>
                        </Link>
                      )}
                      <Link to={`/teacher-dashboard/update/${course._id}`}>
                        <button
                          className="w-8 h-8 rounded-lg bg-gray-50 text-slate-500 hover:bg-primary/10 hover:text-primary flex items-center justify-center transition"
                          title="Edit"
                        >
                          <FaEdit size={13} />
                        </button>
                      </Link>
                      {course.courseStatus !== 1 && (
                        <button
                          onClick={() => handleDelete(course._id, course.courseStatus)}
                          className="w-8 h-8 rounded-lg bg-gray-50 text-slate-500 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition"
                          title="Delete"
                        >
                          <FaTrash size={13} />
                        </button>
                      )}
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
            totalItems={filtered.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            accentClass="bg-primary border-primary text-white"
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-12">
                    #
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Enrolled
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map((course, idx) => {
                  const status = statusConfig[course.courseStatus] ?? statusConfig[0];
                  const StatusIcon = status.icon;
                  return (
                    <tr key={course._id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4 text-sm text-slate-400 font-medium">
                        {(currentPage - 1) * PAGE_SIZE_LIST + idx + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={course.courseImage}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-semibold text-secondary text-sm line-clamp-1">
                              {course.courseName}
                            </div>
                            <div className="text-xs text-slate-400">{course.instructorEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{course.courseCategory}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${status.cls}`}
                        >
                          <StatusIcon size={10} /> {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                        {course.totalEnrollment ?? 0}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-secondary">${course.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {course.courseStatus === 1 && (
                            <Link to={`/teacher-dashboard/details/${course._id}`}>
                              <button className="w-8 h-8 rounded-lg bg-gray-50 text-slate-500 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition">
                                <FaEye size={12} />
                              </button>
                            </Link>
                          )}
                          <Link to={`/teacher-dashboard/update/${course._id}`}>
                            <button className="w-8 h-8 rounded-lg bg-gray-50 text-slate-500 hover:bg-primary/10 hover:text-primary flex items-center justify-center transition">
                              <FaEdit size={12} />
                            </button>
                          </Link>
                          {course.courseStatus !== 1 && (
                            <button
                              onClick={() => handleDelete(course._id, course.courseStatus)}
                              className="w-8 h-8 rounded-lg bg-gray-50 text-slate-500 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition"
                            >
                              <FaTrash size={12} />
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
          <div className="px-6 pb-4">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filtered.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              accentClass="bg-primary border-primary text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddedClasses;

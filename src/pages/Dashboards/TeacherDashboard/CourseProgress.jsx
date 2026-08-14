import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
import {
  FaUsers, FaStar, FaBook, FaArrowLeft, FaDollarSign,
  FaCheckCircle, FaClock, FaTimes,
} from 'react-icons/fa';

const statusConfig = {
  1: { label: 'Approved', cls: 'bg-green-100 text-green-700', icon: FaCheckCircle },
  0: { label: 'Pending', cls: 'bg-amber-100 text-amber-700', icon: FaClock },
  rejected: { label: 'Rejected', cls: 'bg-red-100 text-red-700', icon: FaTimes },
};

const CourseProgress = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const classId = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);

  const { data: courseInfo, isLoading } = useQuery({
    queryKey: ['courseProgress', classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/course/payment/${classId}`);
      return res.data;
    },
    enabled: !!classId,
  });

  const status = statusConfig[courseInfo?.courseStatus] ?? statusConfig[0];
  const StatusIcon = status.icon;
  const revenue = (courseInfo?.price ?? 0) * (courseInfo?.totalEnrollment ?? 0);

  const stats = [
    {
      label: 'Total Enrollment',
      value: courseInfo?.totalEnrollment ?? 0,
      icon: FaUsers,
      color: 'bg-primary/10 text-primary',
      border: 'border-primary/20',
    },
    {
      label: 'Course Rating',
      value: courseInfo?.courseRatings ?? 0,
      icon: FaStar,
      color: 'bg-amber-100 text-amber-600',
      border: 'border-amber-200',
      decimals: 1,
    },
    {
      label: 'Total Lectures',
      value: courseInfo?.lectures ?? 0,
      icon: FaBook,
      color: 'bg-blue-100 text-blue-600',
      border: 'border-blue-200',
    },
    {
      label: 'Total Revenue',
      value: revenue,
      prefix: '$',
      icon: FaDollarSign,
      color: 'bg-green-100 text-green-600',
      border: 'border-green-200',
    },
  ];

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title={`${courseInfo?.courseName || 'Course'} Progress | GS Classroom`} />

      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary font-medium transition mb-6"
      >
        <FaArrowLeft size={12} /> Back to My Classes
      </button>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <img className="w-48" src="https://i.ibb.co/TqhV9yt/loading.gif" alt="Loading" />
        </div>
      ) : (
        <>
          {/* Course hero */}
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="absolute inset-0">
              <img
                src={courseInfo?.courseImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop'}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-secondary/40" />
            </div>
            <div className="relative p-6 md:p-10 text-white">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {courseInfo?.courseCategory && (
                    <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold border border-white/20">
                      {courseInfo.courseCategory}
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${status.cls}`}>
                    <StatusIcon size={10} /> {status.label}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-2">
                  {courseInfo?.courseName || 'Course Details'}
                </h1>
                <p className="text-white/80 text-sm mb-4 line-clamp-2">
                  {courseInfo?.shortDescription || 'No description available.'}
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
                  <span className="flex items-center gap-1"><FaBook size={12} /> {courseInfo?.lectures ?? 0} Lectures</span>
                  <span className="flex items-center gap-1"><FaUsers size={12} /> {courseInfo?.totalEnrollment ?? 0} Students</span>
                  <span className="flex items-center gap-1"><FaStar size={12} className="text-amber-400" /> {courseInfo?.courseRatings ?? '—'} Rating</span>
                  <span className="font-bold text-white">${courseInfo?.price ?? 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className={`bg-white rounded-xl p-5 border ${stat.border} shadow-sm hover:shadow-md transition`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <Icon size={20} />
                    </div>
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-secondary">
                    {stat.prefix || ''}<CountUp end={Number(stat.value)} duration={1.5} decimals={stat.decimals || 0} />
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Course info card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-secondary mb-5">Course Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Instructor</div>
                  <div className="font-medium text-secondary">{courseInfo?.instructorName || '—'}</div>
                  <div className="text-xs text-slate-500">{courseInfo?.instructorEmail}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Language</div>
                  <div className="font-medium text-secondary">{courseInfo?.language || 'English'}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Certificate</div>
                  <div className="font-medium text-secondary">{courseInfo?.certificate || '—'}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Category</div>
                  <div className="font-medium text-secondary">{courseInfo?.courseCategory || '—'}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Price</div>
                  <div className="text-2xl font-bold text-secondary">${courseInfo?.price ?? 0}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status</div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${status.cls}`}>
                    <StatusIcon size={10} /> {status.label}
                  </span>
                </div>
              </div>
            </div>

            {courseInfo?.detailedDescription && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</div>
                <p className="text-slate-600 text-sm leading-relaxed">{courseInfo.detailedDescription}</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100 flex gap-3 flex-wrap">
              <Link to={`/teacher-dashboard/update/${classId}`}>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-accent transition text-sm">
                  Edit Course
                </button>
              </Link>
              <Link to="/teacher-dashboard/classes">
                <button className="px-5 py-2.5 rounded-xl border border-gray-200 text-slate-600 font-medium hover:bg-gray-50 transition text-sm">
                  Back to Classes
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseProgress;

import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import {
  FaBook, FaGraduationCap, FaClock, FaStar,
  FaArrowRight, FaTrophy, FaCalendarAlt,
} from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useEnrolled from '../../../hooks/useEnrolled';
import useCourses from '../../../hooks/useCourses';
import { mockStudentEnrolled, mockCourses } from '../../../data/mockData';

// ── helpers ────────────────────────────────────────────────────────────────
const DEMO_ACHIEVEMENTS = [
  { title: 'First Enrollment', desc: 'You enrolled in your first course!', date: 'This year', icon: FaTrophy, color: 'bg-yellow-500' },
  { title: 'Keep Learning', desc: 'Log in and keep going 🔥', date: 'Ongoing', icon: FaCalendarAlt, color: 'bg-primary' },
];

// ── component ──────────────────────────────────────────────────────────────
const StudentOverview = () => {
  const { user } = useAuth();
  const enrolledFromAPI = useEnrolled();      // [] while loading or empty
  const [coursesFromAPI] = useCourses();      // [] while loading or empty

  // Use real data when available, otherwise fall back to demo
  const enrolled = enrolledFromAPI.length > 0 ? enrolledFromAPI : mockStudentEnrolled;
  const courses  = coursesFromAPI.length  > 0 ? coursesFromAPI  : mockCourses;
  const isDemo   = enrolledFromAPI.length === 0;

  // ── derived stats ──────────────────────────────────────────────────────
  const totalEnrolled = enrolled.length;

  // progress comes from the local progress storage OR from enrolled data
  const progressValues = enrolled.map(e => {
    if (typeof e.progress === 'number') return e.progress;
    if (e.completedLessons && e.totalLessons)
      return Math.round((e.completedLessons / e.totalLessons) * 100);
    return 0;
  });
  const avgProgress = progressValues.length > 0
    ? Math.round(progressValues.reduce((a, b) => a + b, 0) / progressValues.length)
    : 0;

  const completedLessons = enrolled.reduce((acc, c) => acc + (c.completedLessons || 0), 0);

  const avgRating = courses.length > 0
    ? Math.round((courses.reduce((acc, c) => acc + (c.courseRatings || 0), 0) / courses.length) * 10) / 10
    : 4.8;

  // ── stats cards ────────────────────────────────────────────────────────
  const stats = [
    { label: 'Enrolled Courses',   value: totalEnrolled,    suffix: '',  icon: FaBook,          color: 'bg-primary/10 text-primary',   border: 'border-primary/20'  },
    { label: 'Overall Progress',   value: avgProgress,      suffix: '%', icon: FaGraduationCap, color: 'bg-blue-100 text-blue-600',    border: 'border-blue-200'    },
    { label: 'Lessons Completed',  value: completedLessons, suffix: '',  icon: FaClock,         color: 'bg-amber-100 text-amber-600',  border: 'border-amber-200'   },
    { label: 'Avg. Course Rating', value: avgRating,        suffix: '',  icon: FaStar,          color: 'bg-purple-100 text-purple-600', border: 'border-purple-200', decimals: 1 },
  ];

  // ── continue learning – 2 most recently accessed ───────────────────────
  const continueLearning = [...enrolled]
    .sort((a, b) => {
      const da = a.lastAccessed ? new Date(a.lastAccessed) : new Date(0);
      const db = b.lastAccessed ? new Date(b.lastAccessed) : new Date(0);
      return db - da;
    })
    .slice(0, 2);

  // ── recommended – approved courses not yet enrolled in ─────────────────
  const enrolledIds = new Set(enrolled.map(e => e.courseId || e._id));
  const recommended = courses
    .filter(c => c.courseStatus === 1 && !enrolledIds.has(c._id))
    .slice(0, 3);

  const displayName = user?.displayName?.split(' ')[0] || 'there';

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="Student Overview | GS Classroom" />

      {/* ── header ────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
          Welcome back, {displayName}! 👋
        </h1>
        <p className="text-slate-500 mt-2">
          {isDemo
            ? "You haven't enrolled in any courses yet. Browse below to get started."
            : 'Continue your learning journey from where you left off.'}
        </p>
        {isDemo && (
          <div className="mt-3 inline-flex items-center gap-2 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full font-medium">
            📊 Showing demo data — enroll in a course to see your real stats
          </div>
        )}
      </div>

      {/* ── stat cards ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`bg-white rounded-xl p-5 border ${stat.border} shadow-sm hover:shadow-md transition`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-secondary">
                <CountUp end={stat.value} duration={1.5} decimals={stat.decimals || 0} />{stat.suffix}
              </div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* ── continue learning + achievements ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Continue learning */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-secondary">Continue Learning</h2>
            <Link
              to="/user-dashboard/class"
              className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <FaArrowRight size={12} />
            </Link>
          </div>

          {continueLearning.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              No courses yet. <Link to="/all-courses" className="text-primary font-medium">Browse courses →</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {continueLearning.map(course => {
                const prog = typeof course.progress === 'number'
                  ? course.progress
                  : course.completedLessons && course.totalLessons
                    ? Math.round((course.completedLessons / course.totalLessons) * 100)
                    : 0;
                const completed = course.completedLessons || Math.round((prog / 100) * (course.totalLessons || 0));
                const total = course.totalLessons || 0;

                return (
                  <Link
                    key={course._id}
                    to={`/user-dashboard/details/${course.courseId || course._id}`}
                    className="flex gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition group"
                  >
                    <img
                      src={course.courseImage}
                      alt={course.courseName}
                      className="w-24 h-20 lg:w-32 lg:h-20 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-secondary truncate group-hover:text-primary transition">
                        {course.courseName}
                      </h3>
                      <p className="text-sm text-slate-500 mb-2">by {course.instructorName}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                        <div
                          className="bg-primary h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${prog}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{prog}% complete</span>
                        {total > 0 && <span>{completed}/{total} lessons</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold text-secondary mb-5">Achievements</h2>
          <div className="space-y-4">
            {DEMO_ACHIEVEMENTS.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                  <div className={`w-10 h-10 rounded-lg ${a.color} text-white flex items-center justify-center flex-shrink-0`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-secondary text-sm">{a.title}</div>
                    <div className="text-xs text-slate-500">{a.desc}</div>
                    <div className="text-xs text-primary mt-1">{a.date}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next milestone */}
          <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-green-50 border border-primary/20">
            <div className="text-sm font-semibold text-secondary">Next Milestone</div>
            <div className="text-xs text-slate-500 mt-1">
              {totalEnrolled === 0
                ? 'Enroll in your first course to start your journey!'
                : totalEnrolled < 3
                  ? `Enroll in ${3 - totalEnrolled} more course${3 - totalEnrolled > 1 ? 's' : ''} to earn "Explorer" badge!`
                  : 'Complete a course to earn your first certificate!'}
            </div>
            <div className="w-full bg-white rounded-full h-2 mt-3">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${Math.min(100, (totalEnrolled / 3) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── recommended courses ───────────────────────────────────────── */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-secondary">Recommended for You</h2>
          <Link
            to="/all-courses"
            className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            Browse All <FaArrowRight size={12} />
          </Link>
        </div>

        {recommended.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            You've enrolled in all available courses — great work! 🎉
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommended.map(course => (
              <div
                key={course._id}
                className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-xl transition group"
              >
                <div className="relative block overflow-hidden">
                  <img
                    src={course.courseImage}
                    alt={course.courseName}
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white px-2.5 py-1 rounded-md text-xs font-semibold text-primary shadow-sm">
                    {course.courseCategory}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-secondary font-semibold line-clamp-1">{course.courseName}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">by {course.instructorName}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                    <span>{course.lectures} lessons</span>
                    <span>•</span>
                    <span>{course.language}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-500">
                      <FaStar size={10} /> {course.courseRatings}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-secondary">${course.price}</span>
                    <Link to={`/course/${course._id}`}>
                      <button className="text-white bg-primary hover:bg-accent font-medium rounded-lg text-sm px-4 py-2 transition">
                        Enroll Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentOverview;

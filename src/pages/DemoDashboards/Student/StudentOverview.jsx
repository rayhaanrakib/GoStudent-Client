import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { FaBook, FaGraduationCap, FaClock, FaStar, FaArrowRight, FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import { useLocalStorage } from '../../../hooks/useStorage';
import { mockStudentEnrolled, mockCourses } from '../../../data/mockData';

const StudentOverview = () => {
  const [enrolledCourses] = useLocalStorage('demo_student_enrolled', mockStudentEnrolled);
  const [courses] = useLocalStorage('demo_courses', mockCourses);

  const totalProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
    : 0;
  const completedLessons = enrolledCourses.reduce((acc, c) => acc + c.completedLessons, 0);
  const totalLessons = enrolledCourses.reduce((acc, c) => acc + c.totalLessons, 0);
  const approvedCourses = courses.filter(c => c.courseStatus === 1);

  const stats = [
    { label: 'Enrolled Courses', value: enrolledCourses.length, icon: FaBook, color: 'bg-primary/10 text-primary', border: 'border-primary/20' },
    { label: 'Overall Progress', value: totalProgress, suffix: '%', icon: FaGraduationCap, color: 'bg-blue-100 text-blue-600', border: 'border-blue-200' },
    { label: 'Lessons Completed', value: completedLessons, icon: FaClock, color: 'bg-amber-100 text-amber-600', border: 'border-amber-200' },
    { label: 'Avg. Rating', value: 4.8, icon: FaStar, color: 'bg-purple-100 text-purple-600', border: 'border-purple-200' }
  ];

  const continueLearning = [...enrolledCourses]
    .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))
    .slice(0, 2);

  const recommended = approvedCourses
    .filter(c => !enrolledCourses.some(e => e.courseId === c._id))
    .slice(0, 3);

  const achievements = [
    { title: 'First Course Completed', desc: 'Spanish for Beginners', date: 'Jan 2024', icon: FaTrophy, color: 'bg-yellow-500' },
    { title: '7-Day Streak', desc: 'Keep it going!', date: 'Jan 22, 2024', icon: FaCalendarAlt, color: 'bg-primary' }
  ];

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="Student Overview | GS Classroom Demo" />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
          Welcome back, Alex! 👋
        </h1>
        <p className="text-slate-500 mt-2">
          Continue your learning journey from where you left off.
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
                <CountUp end={stat.value} duration={1.5} decimals={typeof stat.value === 'number' && stat.value % 1 !== 0 ? 1 : 0} />{stat.suffix || ''}
              </div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-secondary">Continue Learning</h2>
            <Link to="/demo/student/classes" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <FaArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-4">
            {continueLearning.map(course => (
              <div key={course._id} className="flex gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                <img src={course.courseImage} alt={course.courseName} className="w-24 h-24 lg:w-32 lg:h-20 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-secondary truncate">{course.courseName}</h3>
                  <p className="text-sm text-slate-500 mb-2">by {course.instructorName}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                    <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{course.progress}% complete</span>
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold text-secondary mb-5">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((a, i) => {
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
          <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-green-50 border border-primary/20">
            <div className="text-sm font-semibold text-secondary">Next Milestone</div>
            <div className="text-xs text-slate-500 mt-1">Complete 1 more course to earn "Fast Learner" badge!</div>
            <div className="w-full bg-white rounded-full h-2 mt-3">
              <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-secondary">Recommended for You</h2>
          <Link to="/all-courses" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Browse All <FaArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommended.map(course => (
            <div key={course._id} className="border border-gray-100 rounded-lg overflow-hidden bg-white hover:shadow-xl transition group">
              <div className="relative block overflow-hidden">
                <img src={course.courseImage} alt={course.courseName} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-semibold text-primary">
                  {course.courseCategory}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-secondary font-semibold">{course.courseName}</h3>
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
                  <button className="text-white bg-primary hover:bg-accent font-medium rounded-md text-sm px-4 py-2 transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;

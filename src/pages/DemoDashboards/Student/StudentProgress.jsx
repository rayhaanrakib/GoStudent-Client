import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FaBook, FaTrophy, FaClock, FaChartBar, FaArrowUp, FaStar, FaCheckCircle } from 'react-icons/fa';
import { useLocalStorage } from '../../../hooks/useStorage';
import { mockStudentEnrolled, mockWeeklyProgress, mockStudentPayments } from '../../../data/mockData';

const StudentProgress = () => {
  const [enrolledCourses, setEnrolledCourses] = useLocalStorage('demo_student_enrolled', mockStudentEnrolled);
  const [weeklyProgress] = useLocalStorage('demo_student_weekly', mockWeeklyProgress);
  const [payments] = useLocalStorage('demo_student_payments', mockStudentPayments);
  const [selectedTab, setSelectedTab] = useLocalStorage('demo_student_progress_tab', 'overview');

  const totalHours = weeklyProgress.reduce((acc, d) => acc + d.hours, 0);
  const maxHours = Math.max(...weeklyProgress.map(d => d.hours));
  const avgProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
    : 0;
  const completedCourses = enrolledCourses.filter(c => c.progress === 100).length;
  const totalSpent = payments.reduce((acc, p) => acc + p.amount, 0);

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

  const sortedByProgress = useMemo(() =>
    [...enrolledCourses].sort((a, b) => b.progress - a.progress), [enrolledCourses]);

  const tabOptions = [
    { value: 'overview', label: 'Overview' },
    { value: 'courses', label: 'Course Breakdown' },
    { value: 'payments', label: 'Payment History' }
  ];

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="Learning Progress | Student Demo" />

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
          Learning Progress
        </h1>
        <p className="text-slate-500 mt-2">
          Track your learning journey and achievements.
        </p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {tabOptions.map(tab => (
          <button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition ${
              selectedTab === tab.value
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'bg-white border border-gray-200 text-slate-500 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {selectedTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 border border-primary/20 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <FaChartBar />
                </div>
                <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-md flex items-center gap-1">
                  <FaArrowUp size={10} /> 12%
                </span>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-secondary">{avgProgress}%</div>
              <div className="text-sm text-slate-500 mt-1">Average Progress</div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-blue-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FaClock />
                </div>
                <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-1 rounded-md">This Week</span>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-secondary">{totalHours.toFixed(1)}h</div>
              <div className="text-sm text-slate-500 mt-1">Total Study Hours</div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-amber-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <FaBook />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-secondary">{completedCourses}/{enrolledCourses.length}</div>
              <div className="text-sm text-slate-500 mt-1">Completed Courses</div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-purple-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                  <FaTrophy />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-secondary">3</div>
              <div className="text-sm text-slate-500 mt-1">Achievements Earned</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-secondary">Weekly Study Hours</h2>
                <span className="text-xs text-slate-400">Last 7 days</span>
              </div>
              <div className="flex items-end justify-between gap-2 sm:gap-4 h-48">
                {weeklyProgress.map(day => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-green-400 rounded-t-lg transition-all duration-500 hover:from-accent"
                      style={{ height: `${(day.hours / maxHours) * 100}%`, minHeight: '8px' }}
                      title={`${day.hours} hours`}
                    />
                    <span className="text-xs text-slate-500 font-medium">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-secondary mb-5">Achievements</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200">
                  <div className="w-14 h-14 rounded-xl bg-yellow-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <FaTrophy size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-secondary">First Course Completed</div>
                    <div className="text-xs text-slate-500">Spanish for Beginners</div>
                  </div>
                  <FaCheckCircle className="text-green-500" size={18} />
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-green-50 border border-primary/20">
                  <div className="w-14 h-14 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <FaBook size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-secondary">7-Day Learning Streak</div>
                    <div className="text-xs text-slate-500">Keep the momentum going!</div>
                  </div>
                  <FaCheckCircle className="text-green-500" size={18} />
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                  <div className="w-14 h-14 rounded-xl bg-blue-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <FaStar size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-secondary">50 Lessons Completed</div>
                    <div className="text-xs text-slate-500">388 more to go</div>
                  </div>
                  <FaCheckCircle className="text-green-500" size={18} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedTab === 'courses' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-secondary">Course Progress Breakdown</h2>
            <p className="text-sm text-slate-500 mt-1">Click and drag sliders to update progress (demo)</p>
          </div>
          <div className="divide-y divide-gray-100">
            {sortedByProgress.map(course => (
              <div key={course._id} className="p-5 hover:bg-gray-50 transition">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <img src={course.courseImage} alt={course.courseName} className="w-full sm:w-28 h-20 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-secondary">{course.courseName}</h3>
                      <p className="text-sm text-slate-500">by {course.instructorName}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      course.progress === 100 ? 'bg-primary/10 text-primary' :
                      course.progress > 50 ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {course.progress}%
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex-1 w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          course.progress === 100 ? 'bg-primary' :
                          course.progress > 50 ? 'bg-blue-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={course.progress}
                      onChange={(e) => updateProgress(course._id, parseInt(e.target.value))}
                      className="w-24 sm:w-36 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-slate-400">
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    <span>Enrolled: {course.enrolledDate} • Last: {course.lastAccessed}</span>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'payments' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-semibold text-secondary">Payment History</h2>
              <p className="text-sm text-slate-500 mt-1">{payments.length} transactions</p>
            </div>
            <div className="bg-green-50 border border-green-200 px-4 py-2 rounded-xl">
              <div className="text-xs text-green-600 font-semibold">Total Spent</div>
              <div className="text-lg font-bold text-green-700">${totalSpent.toFixed(2)}</div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map(p => (
                  <tr key={p._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-secondary">{p.courseName}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-secondary">${p.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{p.method}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{p.date}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        <FaCheckCircle size={10} /> {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/demo/student/classes" className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition">
          ← Back to My Classes
        </Link>
      </div>
    </div>
  );
};

export default StudentProgress;

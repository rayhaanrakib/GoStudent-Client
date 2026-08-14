import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  FaBook, FaTrophy, FaClock, FaChartBar,
  FaArrowUp, FaStar, FaCheckCircle, FaSearch,
} from 'react-icons/fa';
import useEnrolled from '../../../hooks/useEnrolled';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import {
  mockStudentEnrolled,
  mockWeeklyProgress,
  mockStudentPayments,
} from '../../../data/mockData';
import TablePagination from '../../../components/shared/TablePagination';

// ── static demo weekly hours (used when no real data) ─────────────────────
const DEMO_WEEKLY = mockWeeklyProgress;
const PAYMENT_PAGE_SIZE = 5;

// ── component ──────────────────────────────────────────────────────────────
const StudentProgress = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const enrolledFromAPI = useEnrolled();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [paymentPage, setPaymentPage] = useState(1);
  const [paymentSearch, setPaymentSearch] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');

  // ── payment history from the real API ─────────────────────────────────
  const { data: paymentsFromAPI = [] } = useQuery({
    queryKey: ['studentPayments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/payments/${user.email}`);
      return res.data;
    },
  });

  // ── fall back to demo when empty ──────────────────────────────────────
  const enrolled = enrolledFromAPI.length > 0 ? enrolledFromAPI : mockStudentEnrolled;
  const payments = paymentsFromAPI.length > 0 ? paymentsFromAPI : mockStudentPayments;
  const weeklyProgress = DEMO_WEEKLY;           // no real weekly API — always use demo bars
  const isDemo = enrolledFromAPI.length === 0;

  // ── derived stats ──────────────────────────────────────────────────────
  const progressValues = enrolled.map(e => {
    if (typeof e.progress === 'number') return e.progress;
    if (e.completedLessons && e.totalLessons)
      return Math.round((e.completedLessons / e.totalLessons) * 100);
    return 0;
  });
  const avgProgress = progressValues.length > 0
    ? Math.round(progressValues.reduce((a, b) => a + b, 0) / progressValues.length)
    : 0;
  const completedCourses = progressValues.filter(p => p === 100).length;

  const totalHours  = weeklyProgress.reduce((acc, d) => acc + d.hours, 0);
  const maxHours    = Math.max(...weeklyProgress.map(d => d.hours), 1);

  const totalSpent = payments.reduce((acc, p) => {
    const amt = p.amount ?? p.price ?? 0;
    return acc + (typeof amt === 'number' ? amt : parseFloat(amt) || 0);
  }, 0);

  const sortedByProgress = useMemo(
    () =>
      [...enrolled].sort((a, b) => {
        const pa = typeof a.progress === 'number' ? a.progress
          : a.completedLessons && a.totalLessons
            ? Math.round((a.completedLessons / a.totalLessons) * 100) : 0;
        const pb = typeof b.progress === 'number' ? b.progress
          : b.completedLessons && b.totalLessons
            ? Math.round((b.completedLessons / b.totalLessons) * 100) : 0;
        return pb - pa;
      }),
    [enrolled]
  );

  // ── unique payment methods for filter dropdown ─────────────────────────
  const paymentMethods = useMemo(() => {
    const methods = [...new Set(payments.map(p => p.method ?? p.paymentMethod ?? ''))].filter(Boolean);
    return methods;
  }, [payments]);

  // ── filtered + paginated payments ─────────────────────────────────────
  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      const courseName = p.courseName || p.name || '';
      const method = p.method ?? p.paymentMethod ?? '';
      const q = paymentSearch.toLowerCase();
      const matchesSearch = !q || courseName.toLowerCase().includes(q) || method.toLowerCase().includes(q);
      const matchesMethod = paymentMethodFilter === 'all' || method === paymentMethodFilter;
      return matchesSearch && matchesMethod;
    });
  }, [payments, paymentSearch, paymentMethodFilter]);

  const paymentTotalPages = Math.max(1, Math.ceil(filteredPayments.length / PAYMENT_PAGE_SIZE));
  const paginatedPayments = filteredPayments.slice(
    (paymentPage - 1) * PAYMENT_PAGE_SIZE,
    paymentPage * PAYMENT_PAGE_SIZE
  );

  const tabOptions = [
    { value: 'overview', label: 'Overview' },
    { value: 'courses',  label: 'Course Breakdown' },
    { value: 'payments', label: 'Payment History' },
  ];

  const tabBtnClass = (val) =>
    `px-5 py-2.5 rounded-xl font-medium text-sm transition ${
      selectedTab === val
        ? 'bg-primary text-white shadow-md shadow-primary/20'
        : 'bg-white border border-gray-200 text-slate-500 hover:bg-gray-50'
    }`;

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="Learning Progress | GS Classroom" />

      {/* ── header ────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
          Learning Progress
        </h1>
        <p className="text-slate-500 mt-2">
          Track your learning journey and achievements.
        </p>
        {isDemo && (
          <div className="mt-3 inline-flex items-center gap-2 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full font-medium">
            📊 Showing demo data — enroll in a course to see your real progress
          </div>
        )}
      </div>

      {/* ── tabs ──────────────────────────────────────────────────────── */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabOptions.map(tab => (
          <button key={tab.value} onClick={() => setSelectedTab(tab.value)} className={tabBtnClass(tab.value)}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          TAB: OVERVIEW
      ══════════════════════════════════════════════════════════════════ */}
      {selectedTab === 'overview' && (
        <>
          {/* stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 border border-primary/20 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <FaChartBar />
                </div>
                <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-md flex items-center gap-1">
                  <FaArrowUp size={10} /> Active
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
              <div className="text-sm text-slate-500 mt-1">Study Hours (demo)</div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-amber-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <FaBook />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-secondary">
                {completedCourses}/{enrolled.length}
              </div>
              <div className="text-sm text-slate-500 mt-1">Completed Courses</div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-purple-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                  <FaTrophy />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-secondary">
                {Math.max(1, completedCourses + (enrolled.length > 0 ? 1 : 0))}
              </div>
              <div className="text-sm text-slate-500 mt-1">Achievements Earned</div>
            </div>
          </div>

          {/* chart + achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Bar chart */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-secondary">Weekly Study Hours</h2>
                <span className="text-xs text-slate-400">Last 7 days (demo)</span>
              </div>
              <div className="flex items-end justify-between gap-2 sm:gap-4 h-48">
                {weeklyProgress.map(day => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-green-400 rounded-t-lg transition-all duration-500 hover:from-accent cursor-default"
                      style={{ height: `${(day.hours / maxHours) * 100}%`, minHeight: '8px' }}
                      title={`${day.hours}h`}
                    />
                    <span className="text-xs text-slate-500 font-medium">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-secondary mb-5">Achievements</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200">
                  <div className="w-14 h-14 rounded-xl bg-yellow-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <FaTrophy size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-secondary">First Enrollment</div>
                    <div className="text-xs text-slate-500">Welcome to GS Classroom!</div>
                  </div>
                  <FaCheckCircle className="text-green-500 shrink-0" size={18} />
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-green-50 border border-primary/20">
                  <div className="w-14 h-14 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <FaBook size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-secondary">Active Learner</div>
                    <div className="text-xs text-slate-500">You are making progress — keep it up!</div>
                  </div>
                  <FaCheckCircle className="text-green-500 shrink-0" size={18} />
                </div>

                {completedCourses > 0 && (
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                    <div className="w-14 h-14 rounded-xl bg-blue-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                      <FaStar size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-secondary">Course Completed 🎉</div>
                      <div className="text-xs text-slate-500">You finished {completedCourses} course{completedCourses > 1 ? 's' : ''}!</div>
                    </div>
                    <FaCheckCircle className="text-green-500 shrink-0" size={18} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB: COURSE BREAKDOWN
      ══════════════════════════════════════════════════════════════════ */}
      {selectedTab === 'courses' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-secondary">Course Progress Breakdown</h2>
            <p className="text-sm text-slate-500 mt-1">
              Your progress across all enrolled courses.
            </p>
          </div>

          {sortedByProgress.length === 0 ? (
            <div className="p-16 text-center">
              <div className="text-gray-300 text-5xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-secondary">No courses yet</h3>
              <p className="text-slate-500 mt-2">
                <Link to="/all-courses" className="text-primary font-medium">Browse courses →</Link>
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {sortedByProgress.map(course => {
                const prog = typeof course.progress === 'number'
                  ? course.progress
                  : course.completedLessons && course.totalLessons
                    ? Math.round((course.completedLessons / course.totalLessons) * 100)
                    : 0;
                const completed = course.completedLessons || 0;
                const total = course.totalLessons || 0;

                return (
                  <div key={course._id} className="p-5 hover:bg-gray-50 transition">
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                      <img
                        src={course.courseImage}
                        alt={course.courseName}
                        className="w-full sm:w-28 h-20 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-secondary truncate">{course.courseName}</h3>
                            <p className="text-sm text-slate-500">by {course.instructorName}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 ${
                            prog === 100 ? 'bg-primary/10 text-primary' :
                            prog > 50    ? 'bg-blue-100 text-blue-600'  : 'bg-amber-100 text-amber-600'
                          }`}>
                            {prog}%
                          </span>
                        </div>
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all duration-500 ${
                                prog === 100 ? 'bg-primary' :
                                prog > 50    ? 'bg-blue-500'  : 'bg-amber-500'
                              }`}
                              style={{ width: `${prog}%` }}
                            />
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between text-xs text-slate-400 flex-wrap gap-1">
                          {total > 0 && <span>{completed}/{total} lessons</span>}
                          {course.lastAccessed && <span>Last: {course.lastAccessed}</span>}
                        </div>
                        <div className="mt-3">
                          <Link
                            to={`/user-dashboard/details/${course.courseId || course._id}`}
                            className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:text-accent transition"
                          >
                            Continue Learning <FaArrowUp className="rotate-45" size={10} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {selectedTab === 'payments' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-semibold text-secondary">Payment History</h2>
              <p className="text-sm text-slate-500 mt-1">
                {filteredPayments.length} transaction{filteredPayments.length !== 1 ? 's' : ''}
                {paymentsFromAPI.length === 0 && (
                  <span className="ml-2 text-amber-600 text-xs">(demo data)</span>
                )}
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 px-4 py-2 rounded-xl">
              <div className="text-xs text-green-600 font-semibold">Total Spent</div>
              <div className="text-lg font-bold text-green-700">${totalSpent.toFixed(2)}</div>
            </div>
          </div>

          {/* Search + filter bar */}
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaSearch size={13} />
              </span>
              <input
                type="text"
                placeholder="Search by course or payment method..."
                value={paymentSearch}
                onChange={(e) => { setPaymentSearch(e.target.value); setPaymentPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-primary transition text-sm"
              />
            </div>
            {paymentMethods.length > 0 && (
              <select
                value={paymentMethodFilter}
                onChange={(e) => { setPaymentMethodFilter(e.target.value); setPaymentPage(1); }}
                className="py-2.5 px-3 rounded-xl border border-gray-200 outline-none focus:border-primary bg-white text-sm"
              >
                <option value="all">All Methods</option>
                {paymentMethods.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            )}
          </div>

          {payments.length === 0 ? (
            <div className="p-16 text-center">
              <div className="text-gray-300 text-5xl mb-4">💳</div>
              <h3 className="text-xl font-semibold text-secondary">No payments yet</h3>
              <p className="text-slate-500 mt-2">
                <Link to="/all-courses" className="text-primary font-medium">Browse courses →</Link>
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    {['Course', 'Amount', 'Method', 'Date', 'Status'].map(h => (
                      <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedPayments.map((p, idx) => {
                    const courseName = p.courseName || p.name || `Course ${idx + 1}`;
                    const amount     = p.amount ?? p.price ?? 0;
                    const method     = p.method ?? p.paymentMethod ?? '—';
                    const date       = p.date ?? p.createdAt
                      ? new Date(p.date ?? p.createdAt).toLocaleDateString()
                      : '—';
                    const status     = p.status ?? 'Paid';

                    return (
                      <tr key={p._id || idx} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-medium text-secondary">{courseName}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-secondary">
                          ${typeof amount === 'number' ? amount.toFixed(2) : parseFloat(amount).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{method}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{date}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            <FaCheckCircle size={10} /> {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="px-6 pb-4">
                <TablePagination
                  currentPage={paymentPage}
                  totalPages={paymentTotalPages}
                  totalItems={filteredPayments.length}
                  pageSize={PAYMENT_PAGE_SIZE}
                  onPageChange={setPaymentPage}
                  accentClass="bg-primary border-primary text-white"
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/user-dashboard/class"
          className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition"
        >
          ← Back to My Classes
        </Link>
      </div>
    </div>
  );
};

export default StudentProgress;

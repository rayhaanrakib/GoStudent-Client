import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Helmet } from 'react-helmet';
import {
  FaShieldAlt, FaLock, FaUsers, FaBook, FaGlobe,
  FaCertificate, FaStar, FaArrowLeft, FaCheckCircle,
} from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

/* ── tiny skeleton pulse ─────────────────────────────────────────────────── */
const Skeleton = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const Payment = () => {
  const location  = useLocation();
  const payId     = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
  const axiosSecure = useAxiosSecure();
  const [courseInfo, setCourseInfo] = useState(null);

  useEffect(() => {
    if (!payId) return;
    axiosSecure.get(`/api/v1/course/payment/${payId}`).then(res => setCourseInfo(res.data));
  }, [axiosSecure, payId]);

  const specs = courseInfo
    ? [
        { label: 'Category',    value: courseInfo.courseCategory   },
        { label: 'Enrollments', value: `${courseInfo.totalEnrollment ?? 0} students` },
        { label: 'Lectures',    value: courseInfo.lectures          },
        { label: 'Language',    value: courseInfo.language          },
        { label: 'Certificate', value: courseInfo.certificate       },
        { label: 'Instructor',  value: courseInfo.instructorName    },
        { label: 'Experience',  value: courseInfo.instructorExperience },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet title={courseInfo ? `Pay for ${courseInfo.courseName} | GS Classroom` : 'Payment | GS Classroom'} />

      {/* ── top bar ───────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to={courseInfo ? `/course/${courseInfo._id}` : '/all-courses'}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary font-medium transition">
            <FaArrowLeft size={12} /> Back to course
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <FaLock size={11} className="text-primary" />
            Secured by Stripe
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── LEFT: course summary + specs ────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Course card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {courseInfo ? (
                <div className="relative overflow-hidden group">
                  <img
                    src={courseInfo.courseImage}
                    alt={courseInfo.courseName}
                    className="w-full h-44 object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="inline-block text-xs font-semibold text-white bg-primary/80 backdrop-blur px-2.5 py-0.5 rounded-full mb-1">
                      {courseInfo.courseCategory}
                    </span>
                    <h2 className="text-white font-bold text-base leading-tight line-clamp-2">
                      {courseInfo.courseName}
                    </h2>
                  </div>
                </div>
              ) : (
                <Skeleton className="w-full h-44" />
              )}

              <div className="p-5">
                {courseInfo ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={courseInfo.instructorImage}
                        alt={courseInfo.instructorName}
                        className="w-9 h-9 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div>
                        <div className="text-xs text-slate-400">Instructor</div>
                        <div className="text-sm font-semibold text-secondary">{courseInfo.instructorName}</div>
                      </div>
                      <div className="ml-auto flex items-center gap-1 text-amber-400">
                        <FaStar size={13} />
                        <span className="text-sm font-bold text-secondary">{courseInfo.courseRatings}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs text-center">
                      <div className="bg-gray-50 rounded-xl p-2.5">
                        <FaBook className="text-primary mx-auto mb-1" size={13} />
                        <div className="font-bold text-secondary">{courseInfo.lectures}</div>
                        <div className="text-slate-400">Lessons</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-2.5">
                        <FaUsers className="text-primary mx-auto mb-1" size={13} />
                        <div className="font-bold text-secondary">{courseInfo.totalEnrollment ?? 0}</div>
                        <div className="text-slate-400">Students</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-2.5">
                        <FaGlobe className="text-primary mx-auto mb-1" size={13} />
                        <div className="font-bold text-secondary text-xs">{courseInfo.language}</div>
                        <div className="text-slate-400">Language</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                )}
              </div>
            </div>

            {/* What's included */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-secondary mb-3 text-sm">What's included</h3>
              <ul className="space-y-2.5">
                {[
                  'Full lifetime access',
                  'Access on all devices',
                  courseInfo?.certificate === 'Yes' ? 'Certificate of completion' : null,
                  'Self-paced learning',
                  '30-day money-back guarantee',
                ].filter(Boolean).map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <FaCheckCircle className="text-primary shrink-0" size={13} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── RIGHT: payment panel ─────────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-5">

            {/* Order summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-secondary mb-4">Order Summary</h2>

              {courseInfo ? (
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-5">
                  <img
                    src={courseInfo.courseImage}
                    alt={courseInfo.courseName}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-secondary text-sm line-clamp-2 leading-snug">
                      {courseInfo.courseName}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">by {courseInfo.instructorName}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-black text-secondary">${courseInfo.price}</div>
                    <div className="text-xs text-slate-400 line-through">${(courseInfo.price * 1.3).toFixed(0)}</div>
                  </div>
                </div>
              ) : (
                <Skeleton className="h-20 w-full mb-5" />
              )}

              {/* Price breakdown */}
              <div className="space-y-2 text-sm pb-4 border-b border-gray-100">
                <div className="flex justify-between text-slate-500">
                  <span>Original price</span>
                  <span className="line-through">${courseInfo ? (courseInfo.price * 1.3).toFixed(2) : '—'}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount applied</span>
                  <span>-${courseInfo ? (courseInfo.price * 0.3).toFixed(2) : '—'}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-secondary text-base mt-4">
                <span>Total</span>
                <span className="text-primary text-xl">${courseInfo?.price ?? '—'}</span>
              </div>
            </div>

            {/* Payment form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-secondary">Payment Details</h2>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <FaShieldAlt className="text-primary" size={13} />
                  SSL Encrypted
                </div>
              </div>

              {courseInfo ? (
                <Elements stripe={stripePromise}>
                  <CheckoutForm courseInfo={courseInfo} />
                </Elements>
              ) : (
                <div className="space-y-3">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              )}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><FaLock size={11} /> 256-bit SSL</span>
              <span className="flex items-center gap-1.5"><FaShieldAlt size={11} /> PCI Compliant</span>
              <span className="flex items-center gap-1.5"><FaCheckCircle size={11} /> 30-Day Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

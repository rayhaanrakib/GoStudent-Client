import { useState, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  FaStar, FaStarHalfAlt, FaRegStar,
  FaUsers, FaBook, FaClock, FaGlobe, FaCertificate,
  FaCheckCircle, FaPlayCircle, FaChevronDown, FaChevronUp,
  FaShieldAlt, FaInfinity, FaMobileAlt, FaArrowRight,
  FaShare, FaHeart, FaUserTie, FaBriefcase,
} from 'react-icons/fa';
import useCourses from '../../hooks/useCourses';
import useEnrolled from '../../hooks/useEnrolled';
import useUserInfo from '../../hooks/useUserInfo';
import useAuth from '../../hooks/useAuth';
import useFeedbacks from '../../hooks/useFeedbacks';

// ── helpers ───────────────────────────────────────────────────────────────

/** Render 0–5 stars with half-star support */
const StarRating = ({ rating = 0, size = 14 }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="flex items-center gap-0.5">
      {Array(full).fill(0).map((_, i) => <FaStar key={`f${i}`} size={size} className="text-amber-400" />)}
      {half && <FaStarHalfAlt size={size} className="text-amber-400" />}
      {Array(empty).fill(0).map((_, i) => <FaRegStar key={`e${i}`} size={size} className="text-amber-400" />)}
    </span>
  );
};

/** Deterministically generate demo reviews from course metadata */
const buildDemoReviews = (courseName, instructorName, rating) => {
  const first = instructorName?.split(' ')[0] || 'the instructor';
  const short = courseName?.split(':')[0]?.split(' Bootcamp')[0] || 'this course';
  return [
    {
      _id: 'dr1', name: 'Emma Wilson', image: 'https://i.pravatar.cc/150?img=25',
      rating: 5, date: '2 days ago',
      title: `Best ${short.split(' ')[0]} course I've taken!`,
      feedbackText: `${first} explains everything so clearly. The projects are practical and I finished with a portfolio I'm genuinely proud of. Worth every penny.`,
    },
    {
      _id: 'dr2', name: 'Mark Davis', image: 'https://i.pravatar.cc/150?img=7',
      rating: rating >= 4.7 ? 5 : 4, date: '5 days ago',
      title: 'Great content, well paced',
      feedbackText: `Really solid course. A couple of advanced sections felt slightly rushed, but overall ${short} covers everything you need and more.`,
    },
    {
      _id: 'dr3', name: 'Sophie Turner', image: 'https://i.pravatar.cc/150?img=23',
      rating: 5, date: '1 week ago',
      title: 'Went from zero to job-ready',
      feedbackText: `Started knowing nothing. Now I have real skills and the confidence to use them. The Q&A support from ${first} was fast and thorough.`,
    },
    {
      _id: 'dr4', name: 'James Rodriguez', image: 'https://i.pravatar.cc/150?img=53',
      rating: rating >= 4.5 ? 5 : 4, date: '2 weeks ago',
      title: `Highly recommend ${short}`,
      feedbackText: `I've taken several similar courses and this is the most organised. The examples are relevant to real-world work, not just toy exercises.`,
    },
  ];
};

/** Generate rating distribution breakdown */
const buildRatingDist = (rating) => {
  const r = parseFloat(rating) || 4.5;
  const five  = r >= 4.7 ? 72 : r >= 4.5 ? 65 : 55;
  const four  = r >= 4.5 ? 18 : 22;
  const three = r >= 4.3 ? 6  : 12;
  const two   = 3;
  const one   = Math.max(1, 100 - five - four - three - two);
  return [
    { stars: 5, pct: five  },
    { stars: 4, pct: four  },
    { stars: 3, pct: three },
    { stars: 2, pct: two   },
    { stars: 1, pct: one   },
  ];
};

/** What you'll learn items derived from category */
const buildLearningPoints = (category = '', courseName = '') => {
  const cat = category.toLowerCase();
  const base = [
    `Core ${category || 'subject'} concepts from beginner to advanced`,
    `Hands-on projects you can add to your portfolio`,
    `Industry best practices and modern workflows`,
    'Problem-solving skills used in real-world jobs',
    'How to read and write professional-grade code or work product',
    'Tips and techniques to accelerate your learning',
  ];
  if (cat.includes('web') || cat.includes('develop')) {
    return ['HTML5, CSS3, and JavaScript fundamentals', 'React.js and modern component architecture',
      'REST API integration and async programming', 'Responsive design and cross-browser compatibility',
      'Version control with Git and GitHub', 'Deployment to production platforms'];
  }
  if (cat.includes('data') || cat.includes('science')) {
    return ['Python programming for data analysis', 'Pandas, NumPy, and Matplotlib',
      'Machine learning fundamentals with Scikit-learn', 'Data visualisation and storytelling',
      'Statistical analysis and hypothesis testing', 'Capstone project with real dataset'];
  }
  if (cat.includes('design') || cat.includes('ux')) {
    return ['User research and empathy mapping', 'Wireframing and prototyping in Figma',
      'Visual hierarchy and typography', 'Usability testing methodologies',
      'Design systems and component libraries', 'Building a professional design portfolio'];
  }
  if (cat.includes('market')) {
    return ['SEO and content marketing strategy', 'Paid advertising on Google and Meta',
      'Email marketing and automation', 'Social media management', 'Analytics and KPI tracking', 'Growth hacking techniques'];
  }
  return base;
};

/** Course includes items */
const buildIncludes = (lectures = 0, certificate = 'Yes') => [
  { icon: FaPlayCircle, text: `${lectures || 0} on-demand video lectures` },
  { icon: FaInfinity,   text: 'Full lifetime access' },
  { icon: FaMobileAlt,  text: 'Access on mobile and desktop' },
  { icon: FaClock,      text: 'Self-paced — learn at your own speed' },
  ...(certificate === 'Yes' ? [{ icon: FaCertificate, text: 'Certificate of completion' }] : []),
  { icon: FaShieldAlt, text: '30-day money-back guarantee' },
];

/** Generate a simple dummy curriculum from lectures count */
const buildCurriculum = (total = 30) => {
  const modules = [
    { title: 'Getting Started', weight: 0.15 },
    { title: 'Core Fundamentals', weight: 0.25 },
    { title: 'Intermediate Concepts', weight: 0.25 },
    { title: 'Advanced Topics', weight: 0.20 },
    { title: 'Real-World Projects', weight: 0.15 },
  ];
  return modules.map((m, i) => ({
    id: i,
    title: m.title,
    lessons: Math.max(1, Math.round(total * m.weight)),
    duration: `${Math.round(total * m.weight * 8)} min`,
  }));
};

// ── Sticky purchase card ──────────────────────────────────────────────────
const PurchaseCard = ({ course, enrolledCheck, role }) => {
  const {
    _id, price, courseImage, totalEnrollment, language,
    lectures, certificate, courseRatings,
  } = course;

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Course thumbnail */}
      <div className="relative overflow-hidden group">
        <img
          src={courseImage}
          alt="Course preview"
          className="w-full h-48 object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <FaPlayCircle className="text-white" size={48} />
        </div>
      </div>

      <div className="p-5">
        {/* Price */}
        <div className="flex items-end gap-2 mb-5">
          <span className="text-4xl font-bold text-secondary">${price}</span>
          <span className="text-slate-400 line-through text-lg mb-1">${(price * 1.4).toFixed(0)}</span>
          <span className="ml-auto text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">30% OFF</span>
        </div>

        {/* CTA button */}
        {enrolledCheck ? (
          <Link to={`/${role === 'admin' ? 'admin' : role === 'teacher' ? 'teacher' : 'user'}-dashboard/class`}>
            <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-green-600 text-white font-bold text-base hover:from-green-600 hover:to-primary transition shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
              <FaPlayCircle /> Continue Learning
            </button>
          </Link>
        ) : (
          <Link to={`/payment/${_id}`}>
            <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-green-600 text-white font-bold text-base hover:from-green-600 hover:to-primary transition shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
              Enroll Now <FaArrowRight size={14} />
            </button>
          </Link>
        )}

        <p className="text-center text-xs text-slate-400 mt-3">30-day money-back guarantee</p>

        {/* Stats grid */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            { icon: FaUsers,       label: 'Students', value: (totalEnrollment || 0).toLocaleString() },
            { icon: FaStar,        label: 'Rating',   value: courseRatings || '—'                    },
            { icon: FaBook,        label: 'Lectures',  value: lectures || '—'                        },
            { icon: FaGlobe,       label: 'Language',  value: language || 'English'                  },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon size={14} />
              </div>
              <div>
                <div className="text-xs text-slate-400">{label}</div>
                <div className="text-sm font-semibold text-secondary">{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate badge */}
        {certificate === 'Yes' && (
          <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
            <FaCertificate className="text-amber-500" size={18} />
            <span className="text-sm font-medium text-amber-700">Certificate of completion included</span>
          </div>
        )}

        {/* Share / wishlist */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-2.5 rounded-xl border border-gray-200 text-slate-600 text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <FaHeart size={13} /> Wishlist
          </button>
          <button className="flex-1 py-2.5 rounded-xl border border-gray-200 text-slate-600 text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <FaShare size={13} /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

// ── main component ────────────────────────────────────────────────────────
const CourseDetails = () => {
  const [courses]       = useCourses();
  const [feedbacksAll]  = useFeedbacks();
  const enrolledInfo    = useEnrolled();
  const userInfo        = useUserInfo();
  const { user }        = useAuth();
  const location        = useLocation();
  const navigate        = useNavigate();

  const role = userInfo?.result?.role || 'user';

  const id     = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
  const course = courses.find(c => c._id === id);

  const [activeTab,   setActiveTab]   = useState('overview');
  const [openModules, setOpenModules] = useState([0]);
  const [wishlist,    setWishlist]    = useState(false);

  const {
    _id, courseName, courseCategory, language, certificate, lectures,
    instructorName, instructorTitle, instructorExperience,
    instructorEmail, instructorImage, courseImage,
    courseRatings, price, shortDescription, detailedDescription,
    totalEnrollment,
  } = course || {};

  const enrolledCheck = enrolledInfo.find(item => item.courseId === id);

  // ── derived data ────────────────────────────────────────────────────────
  const learningPoints = useMemo(() => buildLearningPoints(courseCategory, courseName), [courseCategory, courseName]);
  const includes       = useMemo(() => buildIncludes(lectures, certificate), [lectures, certificate]);
  const curriculum     = useMemo(() => buildCurriculum(lectures), [lectures]);
  const ratingDist     = useMemo(() => buildRatingDist(courseRatings), [courseRatings]);

  // Reviews: use real feedbacks if available, else demo
  const reviews = useMemo(() => {
    if (feedbacksAll?.length > 0) {
      const matched = feedbacksAll.filter(f =>
        f.courseId === id ||
        (f.courseName && f.courseName.toLowerCase() === courseName?.toLowerCase())
      );
      return matched.length > 0 ? matched : buildDemoReviews(courseName, instructorName, courseRatings);
    }
    return buildDemoReviews(courseName, instructorName, courseRatings);
  }, [feedbacksAll, id, courseName, instructorName, courseRatings]);

  // Related courses: same category, not current
  const related = useMemo(() =>
    courses.filter(c => c._id !== id && c.courseCategory === courseCategory).slice(0, 3),
    [courses, id, courseCategory]
  );

  const toggleModule = (idx) =>
    setOpenModules(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);

  const tabs = [
    { key: 'overview',    label: 'Overview'    },
    { key: 'curriculum',  label: 'Curriculum'  },
    { key: 'instructor',  label: 'Instructor'  },
    { key: 'reviews',     label: `Reviews (${reviews.length})` },
  ];

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-300 text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-secondary">Course not found</h2>
          <button onClick={() => navigate('/all-courses')} className="mt-4 text-primary font-medium">← Back to courses</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet title={`${courseName} | GS Classroom`} />

      {/* ── HERO BANNER ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-secondary">
        {/* blurred bg */}
        <div className="absolute inset-0">
          <img src={courseImage} alt="" className="w-full h-full object-cover opacity-15 blur-sm scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/60" />
        </div>

        <div className="relative container mx-auto px-4 py-14 lg:py-20">
          <div className="max-w-3xl">
            {/* breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-white/50 mb-5 flex-wrap">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <span>/</span>
              <Link to="/all-courses" className="hover:text-white transition">Courses</Link>
              <span>/</span>
              <span className="text-white/70">{courseCategory}</span>
            </div>

            {/* category badge */}
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-4 border border-primary/30">
              {courseCategory}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {courseName}
            </h1>

            <p className="text-white/70 text-base lg:text-lg mb-6 leading-relaxed max-w-2xl">
              {shortDescription}
            </p>

            {/* meta row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <StarRating rating={courseRatings} size={14} />
                <span className="text-white font-semibold ml-1">{courseRatings}</span>
                <span>({(totalEnrollment * 0.3).toFixed(0)} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <FaUsers size={13} className="text-primary" />
                <span>{(totalEnrollment || 0).toLocaleString()} students</span>
              </span>
              <span className="flex items-center gap-1.5">
                <FaBook size={13} className="text-primary" />
                <span>{lectures} lectures</span>
              </span>
              <span className="flex items-center gap-1.5">
                <FaGlobe size={13} className="text-primary" />
                <span>{language}</span>
              </span>
            </div>

            {/* instructor */}
            <div className="flex items-center gap-3 mt-6">
              <img
                src={instructorImage}
                alt={instructorName}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary/50"
              />
              <div>
                <span className="text-white/50 text-xs">Created by </span>
                <span className="text-white font-semibold">{instructorName}</span>
                <span className="text-white/50 text-xs ml-2">· {instructorTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── LEFT / MAIN CONTENT ──────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* ── WHAT YOU'LL LEARN ──────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-6">
              <h2 className="text-2xl font-bold text-secondary mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {learningPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-primary mt-0.5 shrink-0" size={15} />
                    <span className="text-slate-600 text-sm leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── TABBED CONTENT ─────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              {/* Tab bar */}
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition border-b-2 ${
                      activeTab === tab.key
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-transparent text-slate-500 hover:text-secondary hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-8">

                {/* ── OVERVIEW TAB ─────────────────────────────────── */}
                {activeTab === 'overview' && (
                  <div className="space-y-10">
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-4">Course Description</h3>
                      <p className="text-slate-600 leading-relaxed text-base">{detailedDescription}</p>
                    </div>

                    {/* Course includes */}
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-4">This Course Includes</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {includes.map(({ icon: Icon, text }, i) => (
                          <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              <Icon size={15} />
                            </div>
                            <span className="text-slate-600 text-sm">{text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key specifications */}
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-4">Key Specifications</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { label: 'Category',      value: courseCategory },
                          { label: 'Language',       value: language       },
                          { label: 'Lectures',       value: `${lectures} lessons` },
                          { label: 'Certificate',    value: certificate    },
                          { label: 'Total Students', value: (totalEnrollment || 0).toLocaleString() },
                          { label: 'Rating',         value: `${courseRatings} / 5.0` },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex items-center justify-between py-3 px-4 rounded-xl border border-gray-100 bg-gray-50">
                            <span className="text-sm text-slate-400 font-medium">{label}</span>
                            <span className="text-sm font-semibold text-secondary">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-4">Requirements</h3>
                      <ul className="space-y-2 text-slate-600 text-sm">
                        {[
                          'No prior experience needed — we start from the very basics',
                          'A computer with internet access (Windows, Mac or Linux)',
                          'Willingness to learn and practice consistently',
                          'Basic computer literacy is helpful but not required',
                        ].map((req, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* ── CURRICULUM TAB ───────────────────────────────── */}
                {activeTab === 'curriculum' && (
                  <div>
                    <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-secondary">Course Curriculum</h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {curriculum.length} sections • {lectures} lectures
                        </p>
                      </div>
                      <button
                        onClick={() => setOpenModules(openModules.length === curriculum.length ? [] : curriculum.map(m => m.id))}
                        className="text-primary text-sm font-medium hover:text-accent transition"
                      >
                        {openModules.length === curriculum.length ? 'Collapse All' : 'Expand All'}
                      </button>
                    </div>

                    <div className="space-y-2">
                      {curriculum.map(mod => (
                        <div key={mod.id} className="border border-gray-100 rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleModule(mod.id)}
                            className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                                openModules.includes(mod.id) ? 'bg-primary text-white' : 'bg-gray-200 text-slate-600'
                              }`}>
                                {mod.id + 1}
                              </div>
                              <span className="font-semibold text-secondary">{mod.title}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-xs text-slate-400">{mod.lessons} lessons · {mod.duration}</span>
                              {openModules.includes(mod.id)
                                ? <FaChevronUp size={12} className="text-slate-400" />
                                : <FaChevronDown size={12} className="text-slate-400" />}
                            </div>
                          </button>

                          {openModules.includes(mod.id) && (
                            <div className="divide-y divide-gray-50">
                              {Array.from({ length: mod.lessons }, (_, i) => (
                                <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition">
                                  <FaPlayCircle size={14} className="text-slate-300 shrink-0" />
                                  <span className="text-sm text-slate-600 flex-1">
                                    {mod.title} — Lesson {i + 1}
                                  </span>
                                  <span className="text-xs text-slate-400 shrink-0">
                                    {Math.floor(Math.random() * 15) + 5} min
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── INSTRUCTOR TAB ───────────────────────────────── */}
                {activeTab === 'instructor' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <img
                        src={instructorImage}
                        alt={instructorName}
                        className="w-28 h-28 rounded-2xl object-cover shadow-md shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-secondary">{instructorName}</h3>
                        <p className="text-primary font-medium mt-1">{instructorTitle}</p>
                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1.5">
                            <FaStar className="text-amber-400" size={14} />
                            {courseRatings} Instructor Rating
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FaUsers className="text-primary" size={14} />
                            {(totalEnrollment || 0).toLocaleString()} Students
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FaBriefcase className="text-primary" size={14} />
                            {instructorExperience} Experience
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { icon: FaUserTie,   label: 'Role',       value: instructorTitle    },
                        { icon: FaBriefcase, label: 'Experience', value: instructorExperience },
                        { icon: FaBook,      label: 'Courses',    value: `${courses.filter(c => c.instructorName === instructorName).length || 1} course${courses.filter(c => c.instructorName === instructorName).length > 1 ? 's' : ''}` },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
                            <Icon size={16} />
                          </div>
                          <div className="text-xs text-slate-400 mb-0.5">{label}</div>
                          <div className="font-semibold text-secondary text-sm">{value}</div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h4 className="font-semibold text-secondary mb-3">About the Instructor</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {instructorName} is a {instructorTitle} with {instructorExperience} of industry experience.
                        They have guided thousands of students through practical, project-based learning, combining
                        deep technical expertise with a gift for clear, engaging teaching. Students consistently
                        praise their responsiveness and real-world focus.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <FaBriefcase size={16} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Contact</div>
                        <div className="text-sm font-semibold text-secondary">{instructorEmail}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── REVIEWS TAB ──────────────────────────────────── */}
                {activeTab === 'reviews' && (
                  <div className="space-y-8">
                    {/* Overall rating summary */}
                    <div className="flex flex-col sm:flex-row gap-8 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="text-center shrink-0">
                        <div className="text-6xl font-black text-secondary">{courseRatings}</div>
                        <StarRating rating={courseRatings} size={18} />
                        <div className="text-xs text-slate-400 mt-1">Course Rating</div>
                      </div>
                      <div className="flex-1 space-y-2">
                        {ratingDist.map(({ stars, pct }) => (
                          <div key={stars} className="flex items-center gap-3">
                            <span className="text-xs text-slate-500 w-3 text-right">{stars}</span>
                            <FaStar size={11} className="text-amber-400 shrink-0" />
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-amber-400 h-2 rounded-full transition-all duration-700"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-400 w-7 text-right">{pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Individual reviews */}
                    <div className="space-y-5">
                      {reviews.map((review, idx) => {
                        const name   = review.name || review.studentName || `Student ${idx + 1}`;
                        const avatar = review.image || review.photoURL || review.avatar || `https://i.pravatar.cc/150?img=${(idx + 20) % 70}`;
                        const rating = review.rating || 5;
                        const title  = review.title || review.subject || '';
                        const body   = review.feedbackText || review.feedback || review.comment || '';
                        const date   = review.date || review.createdAt || '';

                        return (
                          <div key={review._id || idx} className="flex gap-4 p-5 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                            <img
                              src={avatar}
                              alt={name}
                              className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-gray-100"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 flex-wrap">
                                <div>
                                  <span className="font-semibold text-secondary">{name}</span>
                                  {title && <p className="text-sm font-medium text-slate-700 mt-0.5">{title}</p>}
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <StarRating rating={rating} size={13} />
                                  {date && <span className="text-xs text-slate-400">{date}</span>}
                                </div>
                              </div>
                              {body && <p className="text-slate-600 text-sm mt-2 leading-relaxed">{body}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── RELATED COURSES ──────────────────────────────────────── */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-secondary">Related Courses</h2>
                  <Link to="/all-courses" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    View All <FaArrowRight size={12} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {related.map(rc => (
                    <Link key={rc._id} to={`/course/${rc._id}`} className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition">
                      <div className="relative overflow-hidden">
                        <img
                          src={rc.courseImage}
                          alt={rc.courseName}
                          className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-xs font-semibold text-primary">
                          {rc.courseCategory}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-secondary text-sm line-clamp-2 group-hover:text-primary transition">
                          {rc.courseName}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">{rc.instructorName}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-1">
                            <FaStar size={11} className="text-amber-400" />
                            <span className="text-xs font-semibold text-secondary">{rc.courseRatings}</span>
                          </div>
                          <span className="text-sm font-bold text-secondary">${rc.price}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT / STICKY PURCHASE CARD ─────────────────────────── */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0">
            <div className="lg:sticky lg:top-6">
              <PurchaseCard course={course} enrolledCheck={enrolledCheck} role={role} />

              {/* Mobile enroll strip (shown only on small screens at bottom) */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 flex items-center justify-between gap-4 shadow-2xl">
                <span className="text-2xl font-bold text-secondary">${price}</span>
                {enrolledCheck ? (
                  <Link to={`/${role === 'teacher' ? 'teacher' : 'user'}-dashboard/class`} className="flex-1">
                    <button className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm">
                      Continue Learning
                    </button>
                  </Link>
                ) : (
                  <Link to={`/payment/${_id}`} className="flex-1">
                    <button className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm">
                      Enroll Now
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

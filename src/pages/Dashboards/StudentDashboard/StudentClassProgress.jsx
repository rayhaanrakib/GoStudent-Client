import React, { useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import {
  FaBook, FaTrophy, FaClock, FaChartBar, FaArrowLeft, FaStar,
  FaCheckCircle, FaPlayCircle, FaFileAlt, FaCommentDots, FaChevronRight,
  FaDownload, FaShareAlt, FaCertificate, FaExclamationTriangle, FaArrowUp, FaAngleDown, FaAngleUp
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useLocalStorage } from '../../../hooks/useStorage';
import useEnrolled from '../../../hooks/useEnrolled';
import useCourses from '../../../hooks/useCourses';
import useFeedbacks from '../../../hooks/useFeedbacks';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const seededRandom = (seed) => {
  let x = 0;
  for (let i = 0; i < seed.length; i++) {
    x = ((x << 5) - x) + seed.charCodeAt(i);
    x |= 0;
  }
  return () => {
    x = Math.sin(x) * 10000;
    return x - Math.floor(x);
  };
};

const buildCategoryTitlePools = (category, courseName) => {
  const subject = category.split(' ')[0] || 'Subject';
  const courseShort = courseName.split(':')[0].split(' - ')[0].split(' Bootcamp')[0].split(' Masterclass')[0];
  return {
    'Getting Started': [
      `Introduction to ${courseShort}`,
      `Setting Up Your ${subject} Environment`,
      `Overview of ${subject} Fundamentals`,
      `First Steps with ${courseShort}`,
      `Getting Help & Community Resources`,
      `Course Structure & How to Succeed`,
      `Your First ${subject} Exercise`
    ],
    'Core Fundamentals': [
      `Understanding ${subject} Basics`,
      `Core ${subject} Concepts Explained`,
      `Essential ${subject} Building Blocks`,
      `Working with ${subject} Data`,
      `${subject} Best Practices & Standards`,
      `Common ${subject} Patterns`,
      `Debugging ${subject} Code`,
      `Mastering ${subject} Syntax`,
      `${subject} Foundations Deep Dive`,
      `${subject} Core Techniques`
    ],
    'Advanced Concepts': [
      `Advanced ${subject} Patterns`,
      `${subject} Performance Optimization`,
      `${subject} State Management`,
      `Asynchronous ${subject}`,
      `${subject} Error Handling Strategies`,
      `${subject} Testing Fundamentals`,
      `${subject} Security Best Practices`,
      `Scaling ${subject} Applications`,
      `${subject} Architecture Patterns`
    ],
    'Practical Projects': [
      `Project 1: Mini ${subject} App`,
      `Building a ${subject} UI Component`,
      `Integrating APIs with ${subject}`,
      `Project 2: Full ${subject} Feature`,
      `${subject} Refactoring & Code Review`,
      `${subject} Portfolio Project`,
      `Real-World ${subject} Project`,
      `${subject} Case Study Project`
    ],
    'Final Assessment': [
      `${courseShort} Final Review`,
      `${subject} Practice Exam`,
      `${subject} Capstone Project`,
      `${courseShort} Certificate Quiz`,
      `Next Steps in Your ${subject} Journey`,
      `${subject} Portfolio Prep`,
      `Career Guidance for ${subject}`
    ],
    'Design Foundations': [
      `Introduction to ${courseShort}`,
      `Design Principles Overview`,
      `Setting Up Your Design Workspace`,
      `Understanding Color Theory`,
      `Typography Basics`,
      `First Design Exercise`
    ],
    'User Research': [
      `User Research Methods`,
      `Creating User Personas`,
      `User Interviews Basics`,
      `Usability Testing 101`,
      `Analyzing User Data`,
      `Empathy Mapping`,
      `User Journey Mapping`
    ],
    'Design Principles': [
      `Visual Hierarchy & Layout`,
      `Wireframing Techniques`,
      `Prototyping Basics`,
      `Interaction Design`,
      `Accessibility (a11y) Fundamentals`,
      `Design Systems Overview`,
      `Mobile-First Design`
    ],
    'Design Projects': [
      `Project: Landing Page Design`,
      `Project: Mobile App UI`,
      `Project: Dashboard Redesign`,
      `Project: E-Commerce Flow`,
      `Case Study: Full Product Design`,
      `Portfolio Project Piece`
    ],
    'Portfolio & Review': [
      `Design Portfolio Prep`,
      `Final Capstone Review`,
      `Client Presentation Skills`,
      `Career Next Steps`,
      `Certificate Assessment`
    ],
    'Data Fundamentals': [
      `Introduction to ${courseShort}`,
      `Setting Up Your Data Environment`,
      `Data Types & Structures`,
      `Basic Data Manipulation`,
      `Data Cleaning Basics`,
      `Your First Data Analysis`
    ],
    'Core Analysis Tools': [
      `Data Analysis Libraries Deep Dive`,
      `Data Wrangling Techniques`,
      `Exploratory Data Analysis`,
      `Statistical Foundations`,
      `Data Visualization Principles`,
      `Creating Effective Charts`,
      `Working with Real Datasets`
    ],
    'Advanced Techniques': [
      `Machine Learning Basics`,
      `Supervised Learning`,
      `Unsupervised Learning`,
      `Feature Engineering`,
      `Model Evaluation`,
      `Working with Large Datasets`,
      `Time Series Analysis`
    ],
    'Hands-On Projects': [
      `Project: Sales Data Analysis`,
      `Project: Customer Segmentation`,
      `Project: Predictive Model`,
      `Project: Dashboard & Reporting`,
      `Case Study: Business Insights`,
      `Portfolio Data Project`
    ],
    'Final Capstone': [
      `Capstone Project Proposal`,
      `Capstone Implementation`,
      `Capstone Presentation`,
      `Career Path Guidance`,
      `Certificate Final Assessment`
    ],
    'Marketing Foundations': [
      `Introduction to ${courseShort}`,
      `Marketing Strategy Basics`,
      `Understanding Your Audience`,
      `Market Research Methods`,
      `Brand Positioning Overview`
    ],
    'Core Strategies': [
      `Content Marketing Strategy`,
      `SEO Fundamentals`,
      `Social Media Strategy`,
      `Email Marketing Essentials`,
      `Conversion Optimization`,
      `Customer Journey Mapping`
    ],
    'Advanced Tactics': [
      `Paid Advertising Essentials`,
      `Analytics & Tracking Setup`,
      `Growth Hacking Techniques`,
      `Retargeting Strategies`,
      `A/B Testing Methodology`,
      `Funnel Optimization`
    ],
    'Campaign Projects': [
      `Project: Launch Campaign`,
      `Project: Social Media Campaign`,
      `Project: SEO Overhaul`,
      `Project: Full Marketing Plan`,
      `Case Study: Brand Growth`
    ],
    'Final Certification': [
      `Campaign Portfolio Review`,
      `Real-World Client Simulation`,
      `Career & Agency Guidance`,
      `Final Certification Exam`
    ],
    'Language Basics': [
      `Introduction to ${courseShort}`,
      `Alphabet & Pronunciation`,
      `Basic Greetings & Phrases`,
      `Numbers & Counting`,
      `Days, Months & Time`,
      `First Conversation Practice`
    ],
    'Core Vocabulary': [
      `Everyday Vocabulary`,
      `Food & Dining Terms`,
      `Travel & Directions`,
      `Family & Relationships`,
      `Work & Professional Vocab`,
      `Shopping & Commerce`,
      `Health & Wellness Terms`
    ],
    'Grammar & Structure': [
      `Sentence Structure Basics`,
      `Verb Conjugation 101`,
      `Tenses Overview`,
      `Articles & Gender`,
      `Pronouns & Prepositions`,
      `Common Grammar Patterns`,
      `Advanced Grammar Rules`
    ],
    'Conversation Practice': [
      `Everyday Dialogues`,
      `Travel Conversations`,
      `Workplace Communication`,
      `Storytelling Practice`,
      `Idioms & Expressions`,
      `Listening Comprehension`
    ],
    'Fluency Assessment': [
      `Speaking & Listening Review`,
      `Reading & Writing Practice`,
      `Real-World Scenario Test`,
      `Final Fluency Evaluation`,
      `Next Steps for Fluency`
    ]
  };
};

const buildModuleNames = (category) => {
  const cat = category.toLowerCase();
  if (cat.includes('ux') || cat.includes('design') || cat.includes('ui')) {
    return [
      { title: 'Design Foundations', weight: 0.18 },
      { title: 'User Research', weight: 0.22 },
      { title: 'Design Principles', weight: 0.25 },
      { title: 'Design Projects', weight: 0.22 },
      { title: 'Portfolio & Review', weight: 0.13 }
    ];
  }
  if (cat.includes('data') || cat.includes('science') || cat.includes('analytics')) {
    return [
      { title: 'Data Fundamentals', weight: 0.18 },
      { title: 'Core Analysis Tools', weight: 0.25 },
      { title: 'Advanced Techniques', weight: 0.25 },
      { title: 'Hands-On Projects', weight: 0.22 },
      { title: 'Final Capstone', weight: 0.10 }
    ];
  }
  if (cat.includes('marketing') || cat.includes('business')) {
    return [
      { title: 'Marketing Foundations', weight: 0.18 },
      { title: 'Core Strategies', weight: 0.25 },
      { title: 'Advanced Tactics', weight: 0.25 },
      { title: 'Campaign Projects', weight: 0.22 },
      { title: 'Final Certification', weight: 0.10 }
    ];
  }
  if (cat.includes('language')) {
    return [
      { title: 'Language Basics', weight: 0.20 },
      { title: 'Core Vocabulary', weight: 0.25 },
      { title: 'Grammar & Structure', weight: 0.25 },
      { title: 'Conversation Practice', weight: 0.20 },
      { title: 'Fluency Assessment', weight: 0.10 }
    ];
  }
  return [
    { title: 'Getting Started', weight: 0.15 },
    { title: 'Core Fundamentals', weight: 0.25 },
    { title: 'Advanced Concepts', weight: 0.30 },
    { title: 'Practical Projects', weight: 0.20 },
    { title: 'Final Assessment', weight: 0.10 }
  ];
};

const generateLessons = (totalLessons = 30, category = 'Web Development', courseName = 'Course', seedStr = 'default') => {
  const rand = seededRandom(seedStr + courseName + category + String(totalLessons));
  const moduleConfig = buildModuleNames(category);
  const titlePool = buildCategoryTitlePools(category, courseName);
  const typePool = ['video', 'video', 'video', 'reading', 'video', 'quiz', 'video', 'reading', 'assignment', 'video'];

  const modules = moduleConfig.map(m => ({
    title: m.title,
    lessons: Math.max(1, Math.ceil(totalLessons * m.weight))
  }));

  let lIdx = 0;
  let adjustedTotal = 0;
  modules.forEach(m => { adjustedTotal += m.lessons; });
  if (adjustedTotal > totalLessons) {
    let diff = adjustedTotal - totalLessons;
    for (let i = modules.length - 1; i >= 0 && diff > 0; i--) {
      const red = Math.min(diff, modules[i].lessons - 1);
      modules[i].lessons -= red;
      diff -= red;
    }
  }

  const out = [];
  modules.forEach((mod, mi) => {
    const modLessons = [];
    const tArr = titlePool[mod.title] || titlePool['Core Fundamentals'];
    for (let i = 0; i < mod.lessons && lIdx < totalLessons; i++, lIdx++) {
      modLessons.push({
        id: `L-${mi}-${i}-${seedStr.slice(0, 6)}`,
        title: tArr[i % tArr.length],
        type: typePool[lIdx % typePool.length],
        duration: Math.floor(rand() * 18) + 6,
        resource: lIdx % 4 === 0
      });
    }
    out.push({ module: mod.title, lessons: modLessons });
  });
  return out;
};

const generateWeeklyHours = (seedStr, baseProgress) => {
  const rand = seededRandom(seedStr);
  const mult = 0.8 + (baseProgress / 100) * 0.8;
  return [
    { day: 'Mon', hours: Math.round((1.5 + rand() * 2.5) * mult * 10) / 10 },
    { day: 'Tue', hours: Math.round((1.0 + rand() * 2.0) * mult * 10) / 10 },
    { day: 'Wed', hours: Math.round((1.8 + rand() * 2.8) * mult * 10) / 10 },
    { day: 'Thu', hours: Math.round((1.2 + rand() * 2.2) * mult * 10) / 10 },
    { day: 'Fri', hours: Math.round((0.8 + rand() * 1.8) * mult * 10) / 10 },
    { day: 'Sat', hours: Math.round((3.0 + rand() * 3.0) * mult * 10) / 10 },
    { day: 'Sun', hours: Math.round((2.0 + rand() * 2.5) * mult * 10) / 10 }
  ];
};

const generateRatingDistribution = (rating) => {
  const dist = {};
  const base5 = rating >= 4.7 ? 0.72 : rating >= 4.5 ? 0.65 : rating >= 4.2 ? 0.55 : rating >= 4.0 ? 0.48 : 0.38;
  dist[5] = Math.round(base5 * 100);
  const remaining = 100 - dist[5];
  dist[4] = Math.round(remaining * (rating >= 4.5 ? 0.55 : 0.45));
  dist[3] = Math.round((remaining - dist[4]) * (rating >= 4.3 ? 0.35 : 0.5));
  dist[2] = Math.round((remaining - dist[4] - dist[3]) * 0.6);
  dist[1] = Math.max(1, 100 - dist[5] - dist[4] - dist[3] - dist[2]);
  let check = dist[5] + dist[4] + dist[3] + dist[2] + dist[1];
  while (check > 100) { dist[1] = Math.max(1, dist[1] - 1); check--; }
  while (check < 100) { dist[5] += 1; check++; }
  return dist;
};

const generateDemoReviews = (courseName, instructorName, category, ratings) => {
  const cat = category.toLowerCase();
  const firstName = instructorName ? instructorName.split(' ')[0] : 'the instructor';
  return [
    {
      name: 'Emma W.', avatar: 'https://i.pravatar.cc/150?img=25', days: 2,
      rating: 5,
      title: `Best ${category.split(' ')[0]} course investment this year!`,
      body: `The pacing is perfect and ${firstName} breaks down complex topics in such a clear way. The project-based lessons are the best part — I finished with a portfolio I'm proud of.`
    },
    {
      name: 'Mark D.', avatar: 'https://i.pravatar.cc/150?img=7', days: 5,
      rating: ratings >= 4.7 ? 5 : 4,
      title: cat.includes('language') ? 'Great conversational practice' : 'Great content, some lessons could be longer',
      body: `Everything is explained really well. Only reason for less than 5 stars is a couple of advanced sections felt a bit rushed. Overall, ${courseName.split(':')[0]} is definitely worth the price.`
    },
    {
      name: 'Sophie T.', avatar: 'https://i.pravatar.cc/150?img=23', days: 10,
      rating: 5,
      title: cat.includes('language') ? 'Went from zero to real conversations' : 'Went from zero to building real projects',
      body: `Came into this knowing basically nothing. Now I've built 3 full projects and feel confident going into interviews. The Q&A support from ${firstName} was quick and thorough!`
    },
    {
      name: 'James R.', avatar: 'https://i.pravatar.cc/150?img=53', days: 18,
      rating: ratings >= 4.5 ? 5 : 4,
      title: `Highly recommend ${courseName.split(':')[0]}`,
      body: `I've taken a few courses on this topic, and this is hands-down the most organized one. The ${cat.includes('design') ? 'design critiques' : cat.includes('data') ? 'dataset exercises' : cat.includes('language') ? 'listening exercises' : 'coding challenges'} really helped reinforce everything.`
    }
  ];
};

const StudentClassProgress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const enrolled = useEnrolled();
  const [courses] = useCourses();
  const [feedbacks] = useFeedbacks();

  const currentEnrolled = enrolled?.find(e => e._id === id || e.courseId === id);
  const currentCourse = courses?.find(c =>
    c._id === id || c._id === currentEnrolled?.courseId || c._id === currentEnrolled?.course
  );

  const courseId = currentCourse?._id || currentEnrolled?.courseId || id;
  const courseName = currentEnrolled?.courseName || currentCourse?.courseName || 'Course Progress';
  const courseImage = currentEnrolled?.courseImage || currentCourse?.courseImage ||
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop';
  const instructorName = currentCourse?.instructorName || currentEnrolled?.instructorName || 'Your Instructor';
  const instructorImage = currentCourse?.instructorImage || 'https://i.pravatar.cc/150?img=47';
  const instructorTitle = currentCourse?.instructorTitle || 'Senior Instructor';
  const instructorExperience = currentCourse?.instructorExperience || currentEnrolled?.instructorExperience || '5+ years';
  const totalLessons = Math.max(1, currentEnrolled?.totalLessons || currentCourse?.lectures || 30);
  const category = currentCourse?.courseCategory || currentEnrolled?.courseCategory || 'Web Development';
  const ratings = currentCourse?.courseRatings || 4.8;
  const totalEnrollment = currentCourse?.totalEnrollment || currentEnrolled?.totalEnrollment || 500;
  const shortDescription = currentCourse?.shortDescription || currentCourse?.detailedDescription ||
    'A comprehensive course designed to help you master the subject from the ground up.';
  const detailedDescription = currentCourse?.detailedDescription || shortDescription;

  const defaultProgress = typeof currentEnrolled?.progress === 'number' ? currentEnrolled.progress : 0;
  const defaultCompleted = typeof currentEnrolled?.completedLessons === 'number'
    ? currentEnrolled.completedLessons
    : Math.floor((defaultProgress / 100) * totalLessons);

  const storageKey = `progress_course_${id || courseId}`;
  const defaultWeekly = generateWeeklyHours(String(courseId || id || 'default'), defaultProgress);

  const [storedProgress, setStoredProgress] = useLocalStorage(storageKey, {
    progress: defaultProgress,
    completedLessons: defaultCompleted,
    completedIds: [],
    lastAccessed: currentEnrolled?.lastAccessed || new Date().toISOString().split('T')[0],
    startedAt: currentEnrolled?.enrolledDate || new Date().toISOString().split('T')[0],
    lastLessonId: null,
    weeklyHours: defaultWeekly
  });

  const realCurriculum = useMemo(() => {
    const raw = (
      currentCourse?.curriculum ||
      currentEnrolled?.curriculum ||
      currentCourse?.modules ||
      currentEnrolled?.modules
    );
    if (raw && Array.isArray(raw) && raw.length > 0) {
      return raw.map((m, mi) => ({
        module: m.module || m.title || m.name || `Module ${mi + 1}`,
        lessons: (m.lessons || m.items || m.content || []).map((l, li) => ({
          id: l.id || l._id || `RL-${mi}-${li}`,
          title: l.title || l.name || l.lessonName || `Lesson ${li + 1}`,
          type: l.type || 'video',
          duration: l.duration || l.minutes || Math.floor(Math.random() * 18) + 6,
          resource: !!l.resource || !!l.hasResource
        }))
      }));
    }
    if (currentCourse?.lessons && Array.isArray(currentCourse.lessons) && currentCourse.lessons.length > 0) {
      return [{
        module: 'Course Content',
        lessons: currentCourse.lessons.map((l, li) => ({
          id: l.id || l._id || `SL-${li}`,
          title: l.title || l.name || `Lesson ${li + 1}`,
          type: l.type || 'video',
          duration: l.duration || l.minutes || 10,
          resource: !!l.resource
        }))
      }];
    }
    return null;
  }, [currentCourse, currentEnrolled]);

  const [curriculum, setCurriculum] = useState(() =>
    realCurriculum || generateLessons(totalLessons, category, courseName, String(courseId || id || 'default'))
  );

  useEffect(() => {
    if (realCurriculum) {
      setCurriculum(realCurriculum);
    } else {
      setCurriculum(generateLessons(totalLessons, category, courseName, String(courseId || id || 'default')));
    }
  }, [totalLessons, category, courseName, courseId, id, realCurriculum]);

  useEffect(() => {
    if (storedProgress.completedIds.length === 0 && defaultCompleted > 0) {
      const allIds = [];
      curriculum.forEach(m => m.lessons.forEach(l => allIds.push(l.id)));
      const toComplete = allIds.slice(0, Math.min(defaultCompleted, allIds.length));
      setStoredProgress(p => ({
        ...p,
        completedIds: toComplete,
        completedLessons: Math.min(defaultCompleted, allIds.length),
        progress: allIds.length > 0 ? Math.round((Math.min(defaultCompleted, allIds.length) / allIds.length) * 100) : p.progress
      }));
    }
  }, [curriculum]);

  useEffect(() => {
    const base = typeof currentEnrolled?.progress === 'number' ? currentEnrolled.progress : 0;
    const baseCompleted = typeof currentEnrolled?.completedLessons === 'number' ? currentEnrolled.completedLessons : null;
    if (storedProgress.progress === 0 && base > 0 && storedProgress.completedIds.length === 0) {
      const allIds = [];
      curriculum.forEach(m => m.lessons.forEach(l => allIds.push(l.id)));
      const compCount = baseCompleted ?? Math.floor((base / 100) * totalLessons);
      const safeCount = Math.min(compCount, allIds.length);
      setStoredProgress(p => ({
        ...p,
        progress: allIds.length > 0 ? Math.round((safeCount / allIds.length) * 100) : base,
        completedLessons: safeCount,
        completedIds: allIds.slice(0, safeCount)
      }));
    }
  }, [currentEnrolled]);

  const [activeTab, setActiveTab] = useLocalStorage(`${storageKey}_tab`, 'overview');
  const [openModules, setOpenModules] = useLocalStorage(`${storageKey}_modules`, [0]);
  const [filterLessons, setFilterLessons] = useLocalStorage(`${storageKey}_filter`, 'all');

  const totalLessonsCount = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = Math.min(totalLessonsCount, storedProgress.completedLessons);
  const progressPercent = totalLessonsCount > 0
    ? Math.round((completedCount / totalLessonsCount) * 100)
    : storedProgress.progress;
  const remainingCount = totalLessonsCount - completedCount;

  const totalHours = storedProgress.weeklyHours.reduce((acc, d) => acc + d.hours, 0);
  const maxHours = Math.max(...storedProgress.weeklyHours.map(d => d.hours), 1);

  const allLessonIds = useMemo(() =>
    curriculum.flatMap(m => m.lessons.map(l => l.id)), [curriculum]);

  const syncProgressToApi = async (newProgress, newCompleted) => {
    if (!currentEnrolled?._id && !currentEnrolled?.paymentId) return;
    try {
      const targetId = currentEnrolled._id || currentEnrolled.paymentId;
      await axiosSecure.patch(`/api/v1/payments/progress/${targetId}`, {
        progress: newProgress,
        completedLessons: newCompleted,
        lastAccessed: new Date().toISOString().split('T')[0]
      }).catch(() => {});
    } catch (_) { /* silently ignore - best effort sync */ }
  };

  const toggleLessonComplete = (lessonId) => {
    setStoredProgress(prev => {
      const alreadyDone = prev.completedIds.includes(lessonId);
      const newIds = alreadyDone
        ? prev.completedIds.filter(x => x !== lessonId)
        : [...prev.completedIds, lessonId];
      const newCompleted = newIds.length;
      const newPct = Math.round((newCompleted / totalLessonsCount) * 100);
      toast(alreadyDone ? 'Marked as incomplete' : '🎉 Lesson completed! +10 XP');
      syncProgressToApi(newPct, newCompleted);
      return {
        ...prev,
        completedIds: newIds,
        completedLessons: newCompleted,
        progress: newPct,
        lastLessonId: lessonId,
        lastAccessed: new Date().toISOString().split('T')[0]
      };
    });
  };

  const toggleModule = (idx) => {
    setOpenModules(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const nextLesson = useMemo(() => {
    for (const m of curriculum) {
      for (const l of m.lessons) {
        if (!storedProgress.completedIds.includes(l.id)) {
          return { ...l, module: m.module };
        }
      }
    }
    return null;
  }, [curriculum, storedProgress.completedIds]);

  const tabClass = (val) =>
    `px-5 py-2.5 rounded-xl font-medium text-sm transition ${
      activeTab === val
        ? 'bg-primary text-white shadow-md shadow-primary/20'
        : 'bg-white border border-gray-200 text-slate-500 hover:bg-gray-50'
    }`;

  const instructorCourses = useMemo(() => {
    return courses.filter(c => c.instructorName === instructorName);
  }, [courses, instructorName]);

  const instructorCourseCount = instructorCourses.length || 3;
  const instructorTotalStudents = instructorCourses.length > 0
    ? instructorCourses.reduce((acc, c) => acc + (c.totalEnrollment || 0), 0)
    : 5000;

  const ratingDist = useMemo(() => generateRatingDistribution(ratings), [ratings]);

  const courseFeedbacks = useMemo(() => {
    if (!feedbacks || feedbacks.length === 0) return null;
    const direct = feedbacks.filter(f => {
      const matchesId = (f.courseId && (f.courseId === courseId || f.courseId === currentCourse?._id));
      const matchesName = f.courseName && (
        f.courseName.toLowerCase() === courseName.toLowerCase() ||
        courseName.toLowerCase().includes(f.courseName.toLowerCase()) ||
        f.courseName.toLowerCase().includes(courseName.toLowerCase().split(':')[0])
      );
      const matchesInstructor = f.instructorName && f.instructorName === instructorName;
      return matchesId || matchesName || matchesInstructor;
    });
    return direct.length > 0 ? direct : feedbacks.slice(0, 4);
  }, [feedbacks, courseId, currentCourse, courseName, instructorName]);

  const displayReviews = useMemo(() => {
    if (courseFeedbacks && courseFeedbacks.length > 0) {
      return courseFeedbacks.map((f, i) => ({
        name: f.name || f.studentName || 'Student',
        avatar: f.image || f.photoURL || f.avatar || `https://i.pravatar.cc/150?img=${(i + 12) % 70}`,
        days: i + 1 * 3,
        rating: f.rating || 5,
        title: f.title || f.subject || `Review of ${courseName.split(':')[0]}`,
        body: f.feedbackText || f.feedback || f.comment || 'Great course with clear explanations and practical projects. Highly recommend to anyone starting out!'
      }));
    }
    return generateDemoReviews(courseName, instructorName, category, ratings);
  }, [courseFeedbacks, courseName, instructorName, category, ratings]);

  const averageReviewRating = useMemo(() => {
    if (displayReviews.length === 0) return ratings;
    const sum = displayReviews.reduce((a, r) => a + (r.rating || 0), 0);
    return Math.max(3, Math.min(5, Math.round((sum / displayReviews.length) * 10) / 10));
  }, [displayReviews, ratings]);

  const displayRatings = Math.max(3, Math.min(5, (ratings && ratings > 0 ? ratings : averageReviewRating)));

  if (!currentEnrolled && id && id !== 'demo') {
    return (
      <div className="py-10 px-4 md:px-8">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center max-w-xl mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center mx-auto mb-5">
            <FaExclamationTriangle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-secondary mb-2">Course Not Found</h2>
          <p className="text-slate-500 mb-6">It looks like you haven't enrolled in this course yet, or it may no longer be available.</p>
          <Link to="/user-dashboard/class" className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-medium hover:bg-accent transition">
            <FaArrowLeft /> Go to My Classes
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'curriculum', label: 'Curriculum' },
    { key: 'instructor', label: 'Instructor' },
    { key: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title={`${courseName} | Class Progress`} />

      <div className="mb-5">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary font-medium transition mb-4"
        >
          <FaArrowLeft size={12} /> Back to Classes
        </button>
      </div>

      <div className="relative mb-8 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        <div className="absolute inset-0">
          <img src={courseImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-secondary/40" />
        </div>
        <div className="relative p-6 md:p-10 text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold mb-4 border border-white/20">
              {category}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-3">{courseName}</h1>
            <p className="text-white/80 text-sm md:text-base mb-5 line-clamp-3">{shortDescription}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <img src={instructorImage} alt="" className="w-8 h-8 rounded-full border-2 border-white/50 object-cover" />
                <span className="font-medium">{instructorName}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaStar className="text-amber-400" />
                <span className="font-semibold">{displayRatings}</span>
                <span className="text-white/60">rating</span>
              </div>
              <div className="flex items-center gap-1 text-white/80">
                <FaBook /> {totalLessonsCount} lessons
              </div>
              <div className="flex items-center gap-1 text-white/80">
                <FaClock /> ~{Math.round(totalLessonsCount * 8 / 60)}h total
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-primary/20 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FaChartBar />
            </div>
            {progressPercent > 0 && (
              <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-md flex items-center gap-1">
                <FaArrowUp size={10} /> Keep Going!
              </span>
            )}
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-secondary">
            <CountUp end={progressPercent} duration={1.2} />%
          </div>
          <div className="text-sm text-slate-500 mt-1">Overall Progress</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-green-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <FaCheckCircle />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-secondary">
            <CountUp end={completedCount} duration={1.2} />
            <span className="text-base text-slate-400 font-medium">/{totalLessonsCount}</span>
          </div>
          <div className="text-sm text-slate-500 mt-1">Lessons Completed</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-amber-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <FaClock />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-secondary">
            <CountUp end={totalHours} duration={1.2} decimals={1} /><span className="text-base text-slate-400 font-medium ml-1">h</span>
          </div>
          <div className="text-sm text-slate-500 mt-1">Study Hours This Week</div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-purple-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <FaTrophy />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-secondary">
            <CountUp end={remainingCount} duration={1.2} />
          </div>
          <div className="text-sm text-slate-500 mt-1">Remaining Lessons</div>
        </div>
      </div>

      {progressPercent < 100 && nextLesson && (
        <div className="bg-gradient-to-r from-primary/10 via-green-50 to-white rounded-2xl p-5 md:p-6 border border-primary/20 mb-8 flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-green-500 text-white flex items-center justify-center shadow-lg shadow-primary/30 flex-shrink-0">
            <FaPlayCircle size={26} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">Next Up</div>
            <div className="text-lg md:text-xl font-bold text-secondary truncate">{nextLesson.title}</div>
            <div className="text-sm text-slate-500">{nextLesson.module} • {nextLesson.duration} min</div>
          </div>
          <button
            onClick={() => toggleLessonComplete(nextLesson.id)}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-accent transition shadow-lg shadow-primary/20 whitespace-nowrap inline-flex items-center gap-2"
          >
            {storedProgress.lastLessonId === nextLesson.id ? 'Mark Complete' : 'Continue Learning'}
            <FaChevronRight size={12} />
          </button>
        </div>
      )}

      {progressPercent === 100 && (
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-6 border border-amber-200 mb-8 text-center md:text-left flex flex-col md:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-xl shadow-amber-500/30 flex-shrink-0">
            <FaCertificate size={36} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-secondary mb-1">🎉 Course Complete! 🎉</h3>
            <p className="text-slate-600">Congratulations on finishing <b>{courseName}</b>. Your certificate is now available.</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            <button
              onClick={() => toast.success('Certificate downloaded!')}
              className="px-5 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-semibold hover:opacity-90 transition inline-flex items-center gap-2 shadow-md shadow-orange-300/40"
            >
              <FaDownload /> Certificate
            </button>
            <button
              onClick={() => toast.success('Course shared!')}
              className="px-5 py-3 bg-white border border-amber-200 text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition inline-flex items-center gap-2"
            >
              <FaShareAlt /> Share
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} className={tabClass(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-secondary mb-5">Weekly Study Activity</h2>
              <div className="flex items-end justify-between gap-2 sm:gap-4 h-52">
                {storedProgress.weeklyHours.map(day => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs text-slate-500 font-semibold">{day.hours}h</div>
                    <div
                      className="w-full bg-gradient-to-t from-primary to-green-400 rounded-t-lg transition-all duration-500 hover:from-accent"
                      style={{ height: `${Math.max((day.hours / maxHours) * 100, 6)}%` }}
                      title={`${day.hours} hours`}
                    />
                    <div className="text-xs text-slate-500 font-medium">{day.day}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <h2 className="text-xl font-semibold text-secondary">Course Progress</h2>
                <span className="text-sm font-semibold text-primary">{progressPercent}% Complete</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 mb-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-green-500 h-4 rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-xs text-slate-500">
                <div><div className="text-lg font-bold text-secondary">{completedCount}</div>Completed</div>
                <div><div className="text-lg font-bold text-secondary">{remainingCount}</div>Remaining</div>
                <div><div className="text-lg font-bold text-secondary">{totalLessonsCount}</div>Total</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-secondary mb-4">Achievements</h2>
              <div className="space-y-3">
                {progressPercent >= 100 && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
                    <div className="w-10 h-10 rounded-lg bg-amber-400 text-white flex items-center justify-center shadow">
                      <FaCertificate size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-secondary text-sm">Course Completion</div>
                      <div className="text-xs text-slate-500">100% Milestone</div>
                    </div>
                  </div>
                )}
                {completedCount >= 5 && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-green-50 border border-primary/20">
                    <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shadow">
                      <FaBook size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-secondary text-sm">{Math.min(completedCount, 50)} Lessons Down</div>
                      <div className="text-xs text-slate-500">Keep the momentum!</div>
                    </div>
                  </div>
                )}
                {totalHours >= 10 && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                    <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow">
                      <FaClock size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-secondary text-sm">{Math.floor(totalHours / 10) * 10}+ Hour Streak</div>
                      <div className="text-xs text-slate-500">Dedication Award</div>
                    </div>
                  </div>
                )}
                {progressPercent >= 50 && progressPercent < 100 && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200">
                    <div className="w-10 h-10 rounded-lg bg-violet-500 text-white flex items-center justify-center shadow">
                      <FaTrophy size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-secondary text-sm">Halfway There!</div>
                      <div className="text-xs text-slate-500">50% Milestone Reached</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-dashed border-gray-200 opacity-80">
                  <div className="w-10 h-10 rounded-lg bg-gray-200 text-gray-400 flex items-center justify-center">
                    <FaTrophy size={16} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-400">Next Milestone</div>
                    <div className="text-xs text-slate-400">
                      {progressPercent < 50 ? 'Reach 50% progress' : progressPercent < 75 ? 'Reach 75% progress' : 'Finish the course!'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-green-600 rounded-xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-1">Need Help?</h3>
              <p className="text-white/80 text-sm mb-4">Reach out to your instructor or check the Q&A section.</p>
              <div className="flex gap-2">
                <button onClick={() => setActiveTab('instructor')} className="flex-1 py-2.5 bg-white/15 hover:bg-white/25 rounded-lg font-semibold text-sm transition border border-white/20">
                  Instructor
                </button>
                <button onClick={() => setActiveTab('reviews')} className="flex-1 py-2.5 bg-white text-primary rounded-lg font-semibold text-sm transition hover:bg-white/90">
                  Q&A / Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'curriculum' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-secondary">{curriculum.length} Modules • {totalLessonsCount} Lessons</h2>
              <p className="text-xs text-slate-500 mt-0.5">Click a lesson title to mark complete</p>
            </div>
            <div className="flex gap-2">
              {[
                { k: 'all', l: 'All' },
                { k: 'locked', l: 'Remaining' },
                { k: 'done', l: 'Completed' }
              ].map(f => (
                <button
                  key={f.k}
                  onClick={() => setFilterLessons(f.k)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    filterLessons === f.k ? 'bg-primary text-white' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                  }`}
                >
                  {f.l}
                </button>
              ))}
            </div>
          </div>

          {curriculum.map((mod, mi) => {
            const doneInMod = mod.lessons.filter(l => storedProgress.completedIds.includes(l.id)).length;
            const visibleLessons = mod.lessons.filter(l => {
              if (filterLessons === 'done') return storedProgress.completedIds.includes(l.id);
              if (filterLessons === 'locked') return !storedProgress.completedIds.includes(l.id);
              return true;
            });
            return (
              <div key={mi} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleModule(mi)}
                  className="w-full p-4 md:p-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {mi + 1}
                      </span>
                      <h3 className="font-semibold text-secondary truncate">{mod.module}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 pl-11">
                      <span>{mod.lessons.length} lessons</span>
                      <span>{doneInMod}/{mod.lessons.length} done</span>
                      <span>{Math.round((doneInMod / Math.max(1, mod.lessons.length)) * 100)}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-100 rounded-full h-2 hidden sm:block">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(doneInMod / Math.max(1, mod.lessons.length)) * 100}%` }}
                      />
                    </div>
                    {openModules.includes(mi)
                      ? <FaAngleUp className="text-slate-400" />
                      : <FaAngleDown className="text-slate-400" />}
                  </div>
                </button>
                {openModules.includes(mi) && (
                  <div className="border-t border-gray-100 divide-y divide-gray-50">
                    {visibleLessons.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 text-sm">No lessons match this filter.</div>
                    ) : (
                      visibleLessons.map((l, li) => {
                        const done = storedProgress.completedIds.includes(l.id);
                        const TypeIcon = l.type === 'quiz' ? FaTrophy
                          : l.type === 'reading' ? FaFileAlt
                          : l.type === 'assignment' ? FaCommentDots
                          : FaPlayCircle;
                        return (
                          <button
                            key={l.id}
                            onClick={() => toggleLessonComplete(l.id)}
                            className={`w-full p-4 md:p-5 flex items-center gap-4 text-left hover:bg-gray-50 transition ${
                              done ? 'bg-green-50/50' : ''
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              done ? 'bg-primary text-white' : 'bg-gray-100 text-slate-500 group-hover:bg-gray-200'
                            }`}>
                              {done ? <FaCheckCircle size={14} /> : <span className="text-xs font-semibold">{li + 1}</span>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm md:text-base truncate ${
                                done ? 'text-slate-400 line-through' : 'text-secondary font-medium'
                              }`}>
                                {l.title}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                <span className="inline-flex items-center gap-1">
                                  <TypeIcon size={10} />
                                  {l.type && typeof l.type === 'string' ? l.type[0].toUpperCase() + l.type.slice(1) : 'Video'}
                                </span>
                                <span>•</span>
                                <span>{l.duration} min</span>
                                {l.resource && (
                                  <>
                                    <span>•</span>
                                    <span className="text-primary inline-flex items-center gap-1">
                                      <FaDownload size={10} /> Resource
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            <FaChevronRight className="text-slate-300 flex-shrink-0" size={12} />
                          </button>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'instructor' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left mb-8">
            <img src={instructorImage} alt="" className="w-28 h-28 rounded-2xl object-cover shadow-md" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-secondary">{instructorName}</h2>
              <p className="text-primary font-medium">{instructorTitle}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 text-sm mt-3 text-slate-500 flex-wrap">
                <span className="flex items-center gap-1"><FaStar className="text-amber-500" /> {displayRatings} Rating</span>
                <span>•</span>
                <span>{instructorCourseCount} Courses</span>
                <span>•</span>
                <span>{instructorTotalStudents.toLocaleString()} Students</span>
              </div>
              <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-2">
                <button className="px-5 py-2.5 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-accent transition inline-flex items-center gap-2">
                  <FaCommentDots /> Message
                </button>
                <button className="px-5 py-2.5 bg-gray-100 text-slate-600 rounded-lg font-semibold text-sm hover:bg-gray-200 transition">
                  View Profile
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-semibold text-secondary mb-3">About {instructorName.split(' ')[0]}</h3>
            <p className="text-slate-600 leading-relaxed">
              {instructorExperience} of real-world industry experience, now passionate about
              teaching the next generation of learners. Specializes in {category} with a focus on practical, project-based
              learning that prepares students for professional success.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-secondary">{instructorCourseCount}</div>
                <div className="text-xs text-slate-500 mt-1">Courses Published</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-secondary">{displayRatings}</div>
                <div className="text-xs text-slate-500 mt-1">Average Rating</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-secondary">98%</div>
                <div className="text-xs text-slate-500 mt-1">Response Rate</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-fit">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-secondary mb-2">{displayRatings}</div>
              <div className="flex justify-center gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <FaStar key={s} size={18} className={s <= Math.round(displayRatings) ? 'text-amber-400' : 'text-gray-200'} />
                ))}
              </div>
              <p className="text-sm text-slate-500">Based on {totalEnrollment.toLocaleString()} reviews</p>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(s => {
                const pct = ratingDist[s];
                return (
                  <div key={s} className="flex items-center gap-2 text-xs">
                    <span className="w-6 font-semibold text-slate-500">{s}★</span>
                    <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-10 text-right text-slate-400 font-semibold">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {displayReviews.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 md:p-6">
                <div className="flex items-start gap-4 mb-3">
                  <img src={r.avatar} alt="" className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="font-semibold text-secondary">{r.name}</h4>
                      <span className="text-xs text-slate-400">{r.days} days ago</span>
                    </div>
                    <div className="flex gap-0.5 my-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <FaStar key={s} size={12} className={s <= r.rating ? 'text-amber-400' : 'text-gray-200'} />
                      ))}
                    </div>
                  </div>
                </div>
                <h5 className="font-semibold text-secondary mb-1.5">{r.title}</h5>
                <p className="text-slate-600 text-sm leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentClassProgress;

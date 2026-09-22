# GoStudent Classroom

> **Forge Your Future with Seamless Learning — Where Skills Meet Success.**

A full-featured online learning platform built with React, offering dedicated dashboards for students, teachers, and admins, Stripe-powered payments, and Firebase authentication.

🌐 **Live Demo:** [rayhaanrakib-gostudent.vercel.app](https://rayhaanrakib-gostudent.vercel.app)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Dashboards](#dashboards)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

---

## Features

- **Authentication** — Email/password and Google sign-in via Firebase, with JWT-secured API calls
- **Role-based Access** — Separate dashboards and protected routes for Students, Teachers, and Admins
- **Course Browsing** — Browse all courses, filter by category, and view detailed course pages
- **Enrollments & Payments** — Secure checkout powered by Stripe
- **Student Dashboard** — Track enrolled classes, view progress, and manage profile
- **Teacher Dashboard** — Add and manage courses, monitor student progress, update course details
- **Admin Dashboard** — Approve/reject teacher applications, manage users, and oversee all classes
- **Demo Dashboards** — Public previews of all three dashboard roles (no login required)
- **Homepage Sections** — Hero banner, featured courses, learning categories, instructors, testimonials, FAQ, newsletter, and more
- **Animations** — AOS scroll animations and React Awesome Reveal effects
- **Responsive Design** — Mobile-first layout using Tailwind CSS and DaisyUI

---

## Tech Stack

| Category | Libraries |
|---|---|
| Framework | React 18, Vite |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS, DaisyUI, AOS |
| Auth | Firebase v10 |
| HTTP | Axios, TanStack Query v5 |
| Payments | Stripe (react-stripe-js) |
| Forms | React Hook Form |
| Notifications | React Hot Toast, SweetAlert2 |
| UI Components | Swiper, React Tabs, React Icons |
| Utilities | jsPDF, React Helmet, React CountUp |

---

## Project Structure

```
src/
├── components/          # Reusable homepage sections
│   ├── Banner/
│   ├── OurCourses/
│   ├── LearningCategories/
│   ├── HowItWorks/
│   ├── FeaturedInstructors/
│   ├── OurFeedback/
│   ├── BecomeInstructor/
│   ├── OurTeam/
│   ├── Faq/
│   ├── Newsletter/
│   ├── OurServices/
│   ├── OurPartnerships/
│   ├── AboutCourses/
│   ├── AboutUs/
│   ├── MainLayout/      # Navbar & Footer
│   └── shared/          # TablePagination, etc.
├── pages/
│   ├── Home/
│   ├── Courses/         # Course listing & cards
│   ├── CourseDetails/
│   ├── Account/         # Login, Register, JoinAsTeacher
│   ├── Payments/        # Stripe checkout
│   ├── AboutUs/
│   ├── Dashboards/      # Protected role dashboards
│   │   ├── AdminDashboard/
│   │   ├── TeacherDashboard/
│   │   └── StudentDashboard/
│   ├── DemoDashboards/  # Public demo dashboards
│   │   ├── Admin/
│   │   ├── Teacher/
│   │   └── Student/
│   └── Error/
├── hooks/               # Custom React hooks
├── providers/           # AuthProvider, Firebase config
├── routes/              # Route guards (Private, Admin, Teacher)
├── data/                # Mock data
└── utils/               # Layout wrapper
```

---

## Pages & Routes

| Path | Description | Access |
|---|---|---|
| `/` | Homepage | Public |
| `/all-courses` | Browse all courses | Public |
| `/course/:id` | Course detail page | Public |
| `/about-us` | About page | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/join-as-instructor` | Apply to teach | Private |
| `/payment/:id` | Stripe checkout | Private |
| `/demo/student` | Student dashboard demo | Public |
| `/demo/teacher` | Teacher dashboard demo | Public |
| `/demo/admin` | Admin dashboard demo | Public |

---

## Dashboards

### Student Dashboard `/user-dashboard`
- Overview with enrollment stats
- My Classes — view enrolled courses
- Class Progress — track individual course progress
- Profile management

### Teacher Dashboard `/teacher-dashboard`
- Add new classes with full details
- Manage added classes (edit / delete)
- View per-course student progress
- Profile management

### Admin Dashboard `/admin-dashboard`
- Manage all registered users
- Review and approve/reject teacher applications
- Oversee and moderate all classes
- Profile management

> All dashboards have a corresponding **demo version** under `/demo/*` that is publicly accessible without authentication.

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A Firebase project with Authentication enabled
- A Stripe account for payment keys
- A running backend API (GoStudent Server)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/GoStudent-Client.git
cd GoStudent-Client

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## Environment Variables

Create a `.env.local` file in the project root and add the following:

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id

VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
VITE_API_URL=your_backend_api_base_url
```

---

## Scripts

```bash
npm run dev       # Start local dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Layout from '../utils/Layout';
import Error from './../pages/Error/Error';
import Home from '../pages/Home/Home';
import Login from './../pages/Account/Login';
import Register from './../pages/Account/Register';
import Courses from './../pages/Courses/Courses';
import JoinAsTeacher from './../pages/Account/JoinAsTeacher';
import AboutUs from '../pages/AboutUs/AboutUs';
import CourseDetails from '../pages/CourseDetails/CourseDetails';
import PrivateRoutes from './PrivateRoutes';
import DashboardLayout from '../pages/Dashboards/DashboardLayout';
import AdminProfile from './../pages/Dashboards/AdminDashboard/AdminProfile';
import StudentProfile from './../pages/Dashboards/StudentDashboard/StudentProfile';
import TeacherProfile from './../pages/Dashboards/TeacherDashboard/TeacherProfile';
import UsersInfo from '../pages/Dashboards/AdminDashboard/UsersInfo';
import AppliedInfo from '../pages/Dashboards/AdminDashboard/AppliedInfo';
import AllClassesInfo from '../pages/Dashboards/AdminDashboard/AllClassesInfo';
import AddClass from '../pages/Dashboards/TeacherDashboard/AddClass';
import AddedClasses from '../pages/Dashboards/TeacherDashboard/AddedClasses';
import StudentClasses from '../pages/Dashboards/StudentDashboard/StudentClasses';
import AdminRoutes from './AdminRoutes';
import TeacherRoutes from './TeacherRoutes';
import Payment from '../pages/Payments/Payment';
import CourseProgress from './../pages/Dashboards/TeacherDashboard/CourseProgress';
import CourseUpdate from '../pages/Dashboards/TeacherDashboard/CourseUpdate';
import StudentClassProgress from '../pages/Dashboards/StudentDashboard/StudentClassProgress';
import DemoLayout from '../pages/DemoDashboards/DemoLayout';
import StudentOverview from '../pages/DemoDashboards/Student/StudentOverview';
import DemoStudentClasses from '../pages/DemoDashboards/Student/StudentClasses';
import StudentProgress from '../pages/DemoDashboards/Student/StudentProgress';
import DemoStudentProfile from '../pages/DemoDashboards/Student/StudentProfile';
import TeacherOverview from '../pages/DemoDashboards/Teacher/TeacherOverview';
import TeacherAddClass from '../pages/DemoDashboards/Teacher/TeacherAddClass';
import TeacherClasses from '../pages/DemoDashboards/Teacher/TeacherClasses';
import TeacherStudents from '../pages/DemoDashboards/Teacher/TeacherStudents';
import DemoTeacherProfile from '../pages/DemoDashboards/Teacher/TeacherProfile';
import AdminOverview from '../pages/DemoDashboards/Admin/AdminOverview';
import AdminClasses from '../pages/DemoDashboards/Admin/AdminClasses';
import AdminUsers from '../pages/DemoDashboards/Admin/AdminUsers';
import AdminRequests from '../pages/DemoDashboards/Admin/AdminRequests';
import DemoAdminProfile from '../pages/DemoDashboards/Admin/AdminProfile';


const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/all-courses",
                element: <Courses></Courses>
            },
            {
                path: "/course/:id",
                element: <PrivateRoutes><CourseDetails></CourseDetails></PrivateRoutes>
            },
            {
                path: "/payment/:id",
                element: <PrivateRoutes><Payment></Payment></PrivateRoutes>
            },
            {
                path: "/about-us",
                element: <AboutUs></AboutUs>
            },
            {
                path: "/join-as-instructor",
                element: <PrivateRoutes><JoinAsTeacher></JoinAsTeacher></PrivateRoutes>
            },

        ]
    },

    // admin routes
    {
        path: "admin-dashboard",
        element: <AdminRoutes><DashboardLayout /></AdminRoutes>,
        children: [
            {
                path: "profile",
                element: <AdminRoutes><AdminProfile></AdminProfile></AdminRoutes>

            },
            {
                path: "users",
                element: <AdminRoutes><UsersInfo></UsersInfo></AdminRoutes>

            },
            {
                path: "classes",
                element: <AdminRoutes><AllClassesInfo></AllClassesInfo></AdminRoutes>

            },
            {
                path: "request",
                element: <AdminRoutes><AppliedInfo></AppliedInfo></AdminRoutes>

            }
        ]
    },


    // normal user & student routes
    {
        path: "user-dashboard",
        element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
        children: [
            {
                path: "profile",
                element: <PrivateRoutes><StudentProfile></StudentProfile></PrivateRoutes>

            },
            {
                path: "class",
                element: <PrivateRoutes><StudentClasses></StudentClasses></PrivateRoutes>

            },
            {
                path: "details/:id",
                element: <PrivateRoutes><StudentClassProgress></StudentClassProgress></PrivateRoutes>

            }
        ]
    },


    // teacher routes
    {
        path: "teacher-dashboard",
        element: <TeacherRoutes><DashboardLayout /></TeacherRoutes>,
        children: [
            {
                path: "profile",
                element: <TeacherRoutes><TeacherProfile></TeacherProfile></TeacherRoutes>

            },
            {
                path: "add",
                element: <TeacherRoutes><AddClass></AddClass></TeacherRoutes>

            },
            {
                path: "classes",
                element: <TeacherRoutes><AddedClasses></AddedClasses></TeacherRoutes>

            },
            {
                path: "details/:id",
                element: <TeacherRoutes><CourseProgress></CourseProgress></TeacherRoutes>
            },
            {
                path: "update/:id",
                element: <TeacherRoutes><CourseUpdate></CourseUpdate></TeacherRoutes>
            }
        ]
    },

    // Demo routes (public)
    {
        path: "demo",
        element: <DemoLayout />,
        children: [
            {
                path: "student",
                element: <StudentOverview />
            },
            {
                path: "student/classes",
                element: <DemoStudentClasses />
            },
            {
                path: "student/progress",
                element: <StudentProgress />
            },
            {
                path: "student/profile",
                element: <DemoStudentProfile />
            },
            {
                path: "teacher",
                element: <TeacherOverview />
            },
            {
                path: "teacher/add",
                element: <TeacherAddClass />
            },
            {
                path: "teacher/classes",
                element: <TeacherClasses />
            },
            {
                path: "teacher/students",
                element: <TeacherStudents />
            },
            {
                path: "teacher/profile",
                element: <DemoTeacherProfile />
            },
            {
                path: "admin",
                element: <AdminOverview />
            },
            {
                path: "admin/classes",
                element: <AdminClasses />
            },
            {
                path: "admin/users",
                element: <AdminUsers />
            },
            {
                path: "admin/requests",
                element: <AdminRequests />
            },
            {
                path: "admin/profile",
                element: <DemoAdminProfile />
            }
        ]
    }
]);

export default Routes;
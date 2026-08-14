import React from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaHome,
  FaSearch,
  FaCommentDots,
  FaBell,
} from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useUserInfo from '../../hooks/useUserInfo';

// Route-to-role detection
function getCurrentRole(pathname) {
  if (pathname.startsWith('/admin-dashboard')) return 'admin';
  if (pathname.startsWith('/teacher-dashboard')) return 'teacher';
  return 'student';
}

const roleConfig = {
  student: {
    name: 'Student Dashboard',
    accentColor: 'from-primary to-green-600',
    sidebarItems: [
      { label: 'Profile', to: '/user-dashboard/profile' },
      { label: 'My Enroll Class', to: '/user-dashboard/class' },
    ],
  },
  teacher: {
    name: 'Instructor Dashboard',
    accentColor: 'from-blue-500 to-cyan-600',
    sidebarItems: [
      { label: 'Profile', to: '/teacher-dashboard/profile' },
      { label: 'Add Class', to: '/teacher-dashboard/add' },
      { label: 'My Classes', to: '/teacher-dashboard/classes' },
    ],
  },
  admin: {
    name: 'Admin Dashboard',
    accentColor: 'from-orange-500 to-red-600',
    sidebarItems: [
      { label: 'Profile', to: '/admin-dashboard/profile' },
      { label: 'All Classes', to: '/admin-dashboard/classes' },
      { label: 'Teacher Request', to: '/admin-dashboard/request' },
      { label: 'Users', to: '/admin-dashboard/users' },
    ],
  },
};

const DashboardLayout = () => {
  const location = useLocation();
  const currentRole = getCurrentRole(location.pathname);
  const config = roleConfig[currentRole];

  const { user } = useAuth();
  const userInfo = useUserInfo();
  const userResult = userInfo?.result;

  const displayName = user?.displayName || 'User';
  const photoURL = user?.photoURL || 'https://i.pravatar.cc/150?img=10';
  const roleLabel = userResult?.role || currentRole;

  const navLinkClass = ({ isActive }) =>
    isActive
      ? `font-medium px-4 py-3 flex items-center space-x-4 rounded-md text-white bg-gradient-to-r ${config.accentColor}`
      : 'px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:bg-gray-50';

  const drawerId = `dashboard-drawer-${currentRole}`;

  return (
    <div>
      <Helmet title={`${config.name} | GS Classroom`} />

      {/* Sidebar */}
      <div className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] overflow-y-auto">
        <div>
          <div className="mt-8 text-center">
            <img
              src={photoURL}
              alt={displayName}
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{displayName}</h5>
            <span className="hidden text-gray-400 lg:block capitalize">{roleLabel}</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {config.sidebarItems.map((item) => (
              <li key={item.label}>
                <NavLink to={item.to} end={item.exact} className={navLinkClass}>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 pt-4 flex justify-between items-center border-t">
          <Link to="/">
            <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
              <FaHome className="h-5 w-5" />
              <span className="group-hover:text-gray-700">Back To Home</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        {/* Top navbar */}
        <div className="sticky z-10 top-0 h-auto min-h-16 border-b bg-white lg:py-2.5">
          <div className="px-6 py-3 flex items-center justify-between space-x-4 2xl:container flex-wrap gap-3">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Mobile drawer toggle */}
              <div className="drawer w-12 h-16 lg:hidden z-40">
                <input id={drawerId} type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex items-center flex-col">
                  <div className="pt-2">
                    <div className="flex-none lg:hidden mr-3">
                      <label htmlFor={drawerId} aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="inline-block w-6 h-6 stroke-current"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="drawer-side">
                  <label htmlFor={drawerId} aria-label="close sidebar" className="drawer-overlay" />
                  <ul className="flex flex-col gap-2 capitalize font-bold text-[#3f4563] p-4 w-80 min-h-full bg-slate-100 pt-10">
                    {config.sidebarItems.map((item) => (
                      <li key={item.label}>
                        <NavLink to={item.to} end={item.exact} className={navLinkClass}>
                          <span>{item.label}</span>
                        </NavLink>
                      </li>
                    ))}
                    <li>
                      <NavLink to="/" className={navLinkClass}>
                        <span>Back To Home</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              <h5 className="text-2xl text-gray-600 font-medium">{config.name}</h5>
            </div>

            {/* Right action buttons */}
            <div className="hidden lg:flex space-x-4 ml-auto">
              <div hidden className="md:block">
                <div className="relative flex items-center text-gray-400 focus-within:text-primary">
                  <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                    <FaSearch className="w-4" />
                  </span>
                  <input
                    type="search"
                    placeholder="Search here"
                    className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-primary transition"
                  />
                </div>
              </div>
              <button aria-label="search" className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
                <FaSearch className="w-4 mx-auto text-gray-600" />
              </button>
              <button aria-label="chat" className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                <FaCommentDots className="h-5 w-5 m-auto text-gray-600" />
              </button>
              <button aria-label="notification" className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 relative">
                <FaBell className="h-5 w-5 m-auto text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="px-4 lg:px-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

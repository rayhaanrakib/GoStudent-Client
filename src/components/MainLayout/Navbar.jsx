import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiUser, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { FaGraduationCap } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import useUserInfo from '../../hooks/useUserInfo';
import toast from 'react-hot-toast';

const Navbar = ({ isHome = false }) => {
    const [scrolled, setScrolled] = useState(!isHome);
    const { user, logOut } = useAuth();
    const userInfo = useUserInfo();
    const current = userInfo?.result;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    useEffect(() => {
        // On non-home pages, always show solid navbar
        if (!isHome) {
            setScrolled(true);
            return;
        }
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    // Close mobile menu on route change
    const closeMobile = () => setMobileOpen(false);

    const handleLogOut = () => {
        logOut().then(() => {
            toast.success('Signed out successfully.', {
                style: {
                    border: '1px solid #7c3aed',
                    padding: '16px',
                    color: '#4c1d95',
                },
                iconTheme: {
                    primary: '#7c3aed',
                    secondary: '#ede9fe',
                },
            });
            setDropdownOpen(false);
        });
    };

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/all-courses", label: "Courses" },
        { to: "/about-us", label: "About Us" },
        { to: "/join-as-instructor", label: "Become an Instructor" },
    ];

    return (
        <>
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-100'
                    : 'bg-transparent'
            }`}>
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <FaGraduationCap className="text-white text-lg" />
                            </div>
                            <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${
                                scrolled ? 'text-slate-900' : 'text-slate-400'
                            }`}>
                                Go<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">Student</span>
                            </span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <ul className="hidden lg:flex items-center gap-1">
                            {navLinks.map(({ to, label }) => (
                                <li key={to}>
                                    <NavLink
                                        to={to}
                                        className={({ isActive }) =>
                                            `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group
                                            ${isActive
                                                ? 'text-violet-600 bg-violet-50'
                                                : scrolled
                                                    ? 'text-slate-600 hover:text-violet-600 hover:bg-violet-50'
                                                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                                            }`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <NavLink to="/all-courses">
                                <button className={`p-2.5 rounded-xl transition-all duration-300 ${
                                    scrolled
                                        ? 'text-slate-500 hover:text-violet-600 hover:bg-violet-50'
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}>
                                    <CiSearch className="text-xl" />
                                </button>
                            </NavLink>

                            {/* Auth */}
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center gap-2.5 group"
                                    >
                                        <div className="relative">
                                            <img
                                                src={user?.photoURL}
                                                alt="Profile"
                                                className="w-9 h-9 rounded-xl object-cover ring-2 ring-violet-200 group-hover:ring-violet-400 transition-all duration-300"
                                            />
                                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                                        </div>
                                        <FiChevronDown className={`text-sm transition-transform duration-300 ${
                                            dropdownOpen ? 'rotate-180' : ''
                                        } ${scrolled ? 'text-slate-500' : 'text-white/70'}`} />
                                    </button>

                                    {/* Dropdown */}
                                    {dropdownOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setDropdownOpen(false)}
                                            />
                                            <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden z-20">
                                                {/* User Info */}
                                                <div className="bg-gradient-to-br from-violet-600 to-blue-600 p-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={user?.photoURL}
                                                            alt="Profile"
                                                            className="w-11 h-11 rounded-xl object-cover border-2 border-white/30"
                                                        />
                                                        <div className="min-w-0">
                                                            <p className="text-white font-semibold truncate">{user?.displayName}</p>
                                                            <p className="text-violet-200 text-xs truncate">{user?.email}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Links */}
                                                <div className="p-2">
                                                    {current?.role === 'admin' && (
                                                        <Link
                                                            to="admin-dashboard/profile"
                                                            onClick={() => setDropdownOpen(false)}
                                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-all duration-200 text-sm font-medium"
                                                        >
                                                            <span className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center text-violet-600 text-base">⚙️</span>
                                                            Admin Dashboard
                                                        </Link>
                                                    )}
                                                    {(current?.role === 'admin' || current?.role === 'user') && (
                                                        <Link
                                                            to="user-dashboard/profile"
                                                            onClick={() => setDropdownOpen(false)}
                                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-all duration-200 text-sm font-medium"
                                                        >
                                                            <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-base">🎓</span>
                                                            Student Dashboard
                                                        </Link>
                                                    )}
                                                    {current?.status === 'approved' && (
                                                        <Link
                                                            to="teacher-dashboard/profile"
                                                            onClick={() => setDropdownOpen(false)}
                                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-all duration-200 text-sm font-medium"
                                                        >
                                                            <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-base">📚</span>
                                                            Teacher Dashboard
                                                        </Link>
                                                    )}

                                                    <div className="border-t border-slate-100 mt-1 pt-1">
                                                        <button
                                                            onClick={handleLogOut}
                                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 transition-all duration-200 text-sm font-medium"
                                                        >
                                                            <span className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600 text-base">🚪</span>
                                                            Sign Out
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <NavLink to="/login">
                                    <button className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5">
                                        <FiUser className="text-base" />
                                        Login / Register
                                    </button>
                                    <button className="sm:hidden p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white">
                                        <FiUser className="text-lg" />
                                    </button>
                                </NavLink>
                            )}

                            {/* Mobile Hamburger */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
                                    scrolled
                                        ? 'text-slate-600 hover:bg-slate-100'
                                        : 'text-white hover:bg-white/10'
                                }`}
                            >
                                {mobileOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
                mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                    onClick={closeMobile}
                />

                {/* Drawer */}
                <div className={`absolute top-0 left-0 bottom-0 w-80 bg-white shadow-2xl transition-transform duration-500 ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    {/* Drawer Header */}
                    <div className="bg-gradient-to-br from-violet-600 to-blue-600 p-8">
                        {user && (
                            <div className="flex items-center gap-3">
                                <img
                                    src={user?.photoURL}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-xl object-cover border-2 border-white/30"
                                />
                                <div className="min-w-0">
                                    <p className="text-white font-semibold truncate">{user?.displayName}</p>
                                    <p className="text-violet-200 text-xs truncate">{user?.email}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Drawer Links */}
                    <div className="p-4 overflow-y-auto h-full pb-20">
                        <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase px-3 mb-3">Navigation</p>
                        <ul className="space-y-1 mb-6">
                            {navLinks.map(({ to, label }) => (
                                <li key={to}>
                                    <NavLink
                                        to={to}
                                        onClick={closeMobile}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-violet-50 text-violet-700'
                                                    : 'text-slate-700 hover:bg-slate-50'
                                            }`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        {user ? (
                            <>
                                <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase px-3 mb-3">Dashboard</p>
                                <div className="space-y-1 mb-6">
                                    {current?.role === 'admin' && (
                                        <Link
                                            to="admin-dashboard/profile"
                                            onClick={closeMobile}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
                                        >
                                            <span className="text-base">⚙️</span> Admin Dashboard
                                        </Link>
                                    )}
                                    {(current?.role === 'admin' || current?.role === 'user') && (
                                        <Link
                                            to="user-dashboard/profile"
                                            onClick={closeMobile}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
                                        >
                                            <span className="text-base">🎓</span> Student Dashboard
                                        </Link>
                                    )}
                                    {current?.status === 'approved' && (
                                        <Link
                                            to="teacher-dashboard/profile"
                                            onClick={closeMobile}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
                                        >
                                            <span className="text-base">📚</span> Teacher Dashboard
                                        </Link>
                                    )}
                                </div>
                                <button
                                    onClick={handleLogOut}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all"
                                >
                                    <span className="text-base">🚪</span> Sign Out
                                </button>
                            </>
                        ) : (
                            <NavLink to="/login" onClick={closeMobile}>
                                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 text-sm">
                                    <FiUser />
                                    Login / Register
                                </button>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
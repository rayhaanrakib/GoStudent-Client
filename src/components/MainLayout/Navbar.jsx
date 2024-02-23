import { Link, NavLink } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import useAuth from '../../hooks/useAuth';
import useUserInfo from '../../hooks/useUserInfo';


const Navbar = () => {
    const { user, logOut } = useAuth();
    const userInfo = useUserInfo();
    const current = userInfo?.result;
    const handleLogOut = e => {
        logOut()
            .then((res) => {
                toast.success('Sign Out Successfully.', {
                    style: {
                        border: '1px solid #FF6C22',
                        padding: '16px',
                        color: '#713200',
                    },
                    iconTheme: {
                        primary: '#FF6C22',
                        secondary: '#FFFAEE',
                    },
                });
            })

    }


    const navlinks = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "font-bold text-accent " : ""
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/all-courses"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "font-bold text-accent " : ""
                }
            >
                Courses
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/about-us"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "font-bold text-accent " : ""
                }
            >
                About Us
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/join-as-instructor"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "font-bold text-accent " : ""
                }
            >
                Become An Instructor
            </NavLink>
        </li>
    </>



    return (
        <div className='container mx-auto mt-3'>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="drawer z-40">
                        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col">
                            <div className="w-full navbar">
                                <div className="flex-none lg:hidden mr-3">
                                    <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                    </label>
                                </div>
                                <a href='/' className=""><img src="/logo.svg" alt="GoStudent" /></a>

                            </div>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu flex gap-5 capitalize font-bold text-[#3f4563] p-4 w-80 min-h-full bg-slate-100 pt-10">
                                {navlinks}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-5 capitalize font-semibold text-[#3f4563] px-2">
                        {navlinks}
                    </ul>
                </div>
                <div className="navbar-end mx-0 md:mx-3">
                    <div className='mx-0 md:mx-3'>
                        <NavLink to="/all-courses"><button className='flex justify-center items-center  font-semibold bg-white text-accent p-3 rounded-md shadow-sm'><CiSearch className='text-2xl' /></button></NavLink>
                    </div>
                    {
                        user ? <div className="dropdown dropdown-end px-5 md:px-0">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Profile" src={user?.photoURL} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-center bg-base-100 rounded-box w-60">
                                <li className="text-lg font-medium mt-2">
                                    {user?.displayName}
                                </li>
                                <li className="text-sm mb-3">
                                    {user?.email}
                                </li>
                                {
                                    current?.role === 'admin' && <li><Link className='py-2 font-semibold' to="admin-dashboard/profile">Admin Dashboard</Link></li>
                                }
                                {
                                    current?.role === 'admin' && <li><Link className='py-2 font-semibold' to="user-dashboard/profile">Student Dashboard</Link></li>
                                }
                                {
                                    current?.role === 'user' && <li><Link className='py-2 font-semibold' to="user-dashboard/profile">Student Dashboard</Link></li>
                                }
                                {
                                    current?.status === 'approved' && <li><Link className='py-2 font-semibold' to="teacher-dashboard/profile">Teacher Dashboard</Link></li>
                                }
                                <li><button onClick={handleLogOut} className='py-2 font-semibold'>Logout</button></li>
                            </ul>
                        </div> : <div className='bg-primary hover:bg-accent shadow-sm p-3 rounded-md mx-5 md:mx-0'>
                            <NavLink className=' flex justify-center items-center gap-3 text-white' to="/login"><FiUser className='text-2xl' /><button className='hidden lg:block  font-semibold text-white'>Login / Register</button></NavLink>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaTwitter, FaLinkedin, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';

const Footer = () => {
    const year = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const footerLinks = {
        Platform: [
            { label: "Browse Courses", to: "/all-courses" },
            { label: "Become an Instructor", to: "/join-as-instructor" },
            { label: "Student Dashboard", to: "/user-dashboard/profile" },
            { label: "About Us", to: "/about-us" },
        ],
        Learning: [
            { label: "Web Development", to: "/all-courses" },
            { label: "UI/UX Design", to: "/all-courses" },
            { label: "Data Science", to: "/all-courses" },
            { label: "Mobile Development", to: "/all-courses" },
        ],
        Company: [
            { label: "Our Mission", to: "/" },
            { label: "Team", to: "/" },
            { label: "Careers", to: "/" },
            { label: "Blog", to: "/" },
        ],
        Support: [
            { label: "Help Center", to: "/" },
            { label: "Privacy Policy", to: "/" },
            { label: "Terms of Service", to: "/" },
            { label: "Contact Us", to: "/" },
        ],
    };

    const socials = [
        { Icon: FaTwitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
        { Icon: FaLinkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-400" },
        { Icon: FaGithub, href: "#", label: "GitHub", color: "hover:text-slate-300" },
        { Icon: FaInstagram, href: "#", label: "Instagram", color: "hover:text-pink-400" },
        { Icon: FaYoutube, href: "#", label: "YouTube", color: "hover:text-rose-400" },
    ];

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) setSubscribed(true);
    };

    return (
        <footer className="bg-slate-950 text-slate-400 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <div className="relative z-10 container mx-auto px-6 lg:px-8">
                {/* Top CTA Banner */}
                <div className="py-12 border-b border-white/5">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                                Ready to start learning?
                            </h3>
                            <p className="text-slate-400">Join 50,000+ learners transforming their careers.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                to="/all-courses"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5 text-sm"
                            >
                                Browse Courses
                                <FiArrowRight />
                            </Link>
                            <Link
                                to="/join-as-instructor"
                                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 text-sm"
                            >
                                Teach on GoStudent
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Footer Grid */}
                <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        {/* Logo */}
                        <Link to="/" className="inline-flex items-center gap-2.5 group mb-5">
                            <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <FaGraduationCap className="text-white text-lg" />
                            </div>
                            <span className="font-bold text-xl text-white tracking-tight">
                                Go<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">Student</span>
                            </span>
                        </Link>

                        <p className="text-slate-400 leading-relaxed mb-6 max-w-sm text-sm">
                            Empowering learners worldwide with expert-led courses, flexible schedules, and industry-recognized certificates.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start gap-3">
                                <HiOutlineLocationMarker className="text-violet-400 text-lg flex-shrink-0 mt-0.5" />
                                <p className="text-slate-400 text-sm">8502 Preston Rd. Inglewood, Maine 98380, USA</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <HiOutlineMail className="text-violet-400 text-lg flex-shrink-0" />
                                <a href="mailto:support@gostudent.com" className="text-slate-400 hover:text-violet-400 text-sm transition-colors">
                                    support@gostudent.com
                                </a>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="flex items-center gap-2">
                            {socials.map(({ Icon, href, label, color }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    aria-label={label}
                                    className={`w-9 h-9 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-slate-400 ${color} transition-all duration-300 hover:-translate-y-0.5`}
                                >
                                    <Icon className="text-sm" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map(({ label, to }) => (
                                    <li key={label}>
                                        <Link
                                            to={to}
                                            className="text-slate-400 hover:text-violet-400 text-sm transition-colors duration-200 hover:translate-x-0.5 inline-block"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter Strip */}
                <div className="py-8 border-t border-white/5">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div>
                            <p className="text-white font-semibold mb-1">Get weekly learning tips 📬</p>
                            <p className="text-slate-500 text-sm">Join 50K+ subscribers. No spam, ever.</p>
                        </div>
                        {!subscribed ? (
                            <form onSubmit={handleSubscribe} className="flex gap-2 w-full lg:w-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    required
                                    className="flex-1 lg:w-64 bg-white/5 border border-white/10 text-white placeholder-slate-600 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-violet-500 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-300 whitespace-nowrap hover:shadow-lg hover:shadow-violet-500/25"
                                >
                                    Subscribe
                                </button>
                            </form>
                        ) : (
                            <div className="text-emerald-400 font-medium text-sm flex items-center gap-2">
                                <span className="text-lg">✅</span> You're subscribed! Welcome aboard.
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {year}{' '}
                        <a
                            href="https://rayhaanrakib.vercel.app/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
                        >
                            GoStudent Classroom
                        </a>
                        . All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Privacy</a>
                        <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Terms</a>
                        <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
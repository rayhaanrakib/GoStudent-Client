import React from 'react';
import { FaStar, FaUsers, FaBook, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const instructors = [
    {
        name: "Dr. Sarah Mitchell",
        specialty: "Data Science & AI",
        rating: 4.9,
        students: "12.4K",
        courses: 8,
        bio: "Former Google AI researcher with 10+ years making complex data concepts accessible.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
        gradient: "from-violet-500 to-purple-600",
        badge: "Top Rated",
    },
    {
        name: "Marcus Chen",
        specialty: "Full-Stack Development",
        rating: 4.8,
        students: "18.2K",
        courses: 12,
        bio: "Senior engineer at Meta sharing battle-tested real-world development patterns.",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop",
        gradient: "from-blue-500 to-cyan-600",
        badge: "Bestseller",
    },
    {
        name: "Amelia Rodriguez",
        specialty: "UI/UX & Product Design",
        rating: 4.9,
        students: "9.7K",
        courses: 6,
        bio: "Award-winning designer from Apple's design team, teaching next-gen creative thinking.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
        gradient: "from-pink-500 to-rose-600",
        badge: "Rising Star",
    },
    {
        name: "James Okafor",
        specialty: "Business & Entrepreneurship",
        rating: 4.7,
        students: "15.1K",
        courses: 9,
        bio: "3x startup founder and angel investor, unlocking entrepreneurial potential worldwide.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
        gradient: "from-emerald-500 to-teal-600",
        badge: "Expert",
    },
];

const FeaturedInstructors = () => {
    return (
        <section className='py-20 lg:py-28 bg-white'>
            <div className="container mx-auto px-6 lg:px-8">
                {/* Header - aligned properly */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
                    <div className="max-w-xl">
                        <span className="inline-block text-violet-600 text-xs font-bold tracking-[0.15em] uppercase mb-3">
                            Expert Instructors
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                            Learn From the{' '}
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600">
                                World's Best
                            </span>
                        </h2>
                    </div>
                    <Link to="/join-as-instructor" className="self-start lg:self-auto">
                        <button className="group inline-flex items-center gap-2 bg-white border-2 border-slate-200 hover:border-violet-600 text-slate-700 hover:text-violet-700 font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 text-sm">
                            Become an Instructor
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </Link>
                </div>

                {/* Grid - equal height cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    {instructors.map((instructor, i) => (
                        <article
                            key={i}
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                            className="group bg-white rounded-3xl border border-slate-100 hover:border-violet-200 shadow-sm hover:shadow-2xl hover:shadow-violet-500/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col"
                        >
                            {/* Gradient Header */}
                            <div className={`relative h-28 bg-gradient-to-br ${instructor.gradient} flex items-start p-6`}>
                                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {instructor.badge}
                                </span>
                            </div>

                            {/* Avatar */}
                            <div className="relative px-6 -mt-12 mb-4">
                                <div className="relative inline-block">
                                    <img
                                        src={instructor.avatar}
                                        alt={instructor.name}
                                        className="w-20 h-20 rounded-2xl object-cover border-[3px] border-white shadow-xl group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-emerald-400 rounded-full border-[3px] border-white shadow-sm" />
                                </div>
                            </div>

                            {/* Body Content - flex grow for alignment */}
                            <div className="px-6 pb-6 flex flex-col flex-1">
                                <h3 className="font-extrabold text-slate-900 text-lg leading-tight mb-1">
                                    {instructor.name}
                                </h3>
                                <p className={`text-xs font-bold uppercase tracking-wide mb-3 bg-gradient-to-r ${instructor.gradient} bg-clip-text text-transparent`}>
                                    {instructor.specialty}
                                </p>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                                    {instructor.bio}
                                </p>

                                {/* Stats Row */}
                                <div className="grid grid-cols-3 gap-1 pt-5 border-t border-slate-100">
                                    {/* Rating */}
                                    <div className="text-center px-1">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <FaStar className="text-amber-400 text-[10px]" />
                                            <span className="text-slate-900 font-extrabold text-sm">{instructor.rating}</span>
                                        </div>
                                        <p className="text-[11px] font-medium text-slate-400">Rating</p>
                                    </div>

                                    {/* Students */}
                                    <div className="text-center px-1 border-x border-slate-100">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <FaUsers className="text-violet-500 text-[10px]" />
                                            <span className="text-slate-900 font-extrabold text-sm">{instructor.students}</span>
                                        </div>
                                        <p className="text-[11px] font-medium text-slate-400">Students</p>
                                    </div>

                                    {/* Courses */}
                                    <div className="text-center px-1">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <FaBook className="text-violet-500 text-[10px]" />
                                            <span className="text-slate-900 font-extrabold text-sm">{instructor.courses}</span>
                                        </div>
                                        <p className="text-[11px] font-medium text-slate-400">Courses</p>
                                    </div>
                                </div>

                                {/* Button - always visible, positioned at bottom */}
                                <a
                                    href="#"
                                    className={`mt-5 w-full block text-center py-3 rounded-xl bg-gradient-to-r ${instructor.gradient} text-white text-sm font-extrabold shadow-md shadow-violet-500/10 hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5 transition-all duration-300`}
                                >
                                    View Profile
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedInstructors;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaArrowRight, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiOutlineAcademicCap, HiOutlineGlobeAlt, HiOutlineUserGroup, HiOutlineSparkles } from 'react-icons/hi';

const values = [
    {
        icon: <HiOutlineAcademicCap className="text-2xl" />,
        title: "Quality First",
        description: "Every course is vetted by experts to ensure world-class learning experiences.",
        gradient: "from-violet-500 to-purple-600",
    },
    {
        icon: <HiOutlineGlobeAlt className="text-2xl" />,
        title: "Accessible to All",
        description: "Breaking barriers so anyone, anywhere can access transformative education.",
        gradient: "from-blue-500 to-cyan-600",
    },
    {
        icon: <HiOutlineUserGroup className="text-2xl" />,
        title: "Community Driven",
        description: "Building a thriving network of learners and educators who grow together.",
        gradient: "from-emerald-500 to-teal-600",
    },
    {
        icon: <HiOutlineSparkles className="text-2xl" />,
        title: "Innovation Led",
        description: "Constantly evolving our platform with cutting-edge tools and technology.",
        gradient: "from-orange-500 to-rose-600",
    },
];

const leadership = [
    {
        name: "David Forren",
        role: "Founder & CEO",
        bio: "Visionary leader with 15+ years in EdTech, driven to democratize education globally.",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
        gradient: "from-violet-500 to-purple-600",
    },
    {
        name: "Amil Evara",
        role: "Head of Design",
        bio: "Award-winning designer crafting intuitive learning experiences that delight users.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
        gradient: "from-pink-500 to-rose-600",
    },
    {
        name: "Maria Powers",
        role: "Director of Sales",
        bio: "Growth strategist connecting organizations with transformative learning solutions.",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
        gradient: "from-blue-500 to-cyan-600",
    },
    {
        name: "Jeff Fisher",
        role: "Engineering Lead",
        bio: "Full-stack architect building the scalable infrastructure behind GoStudent.",
        avatar: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80",
        gradient: "from-emerald-500 to-teal-600",
    },
];

const teamMembers = [
    { name: "Ebele Egbuna", role: "Support Consultant", avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80" },
    { name: "Delia Pawelke", role: "Front-end Developer", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80" },
    { name: "Tom Lowry", role: "UI/UX Designer", avatar: "https://images.unsplash.com/photo-1624224971170-2f84fed5eb5e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80" },
    { name: "Louise Donadieu", role: "Support Consultant", avatar: "https://images.unsplash.com/photo-1579017331263-ef82f0bbc748?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80" },
    { name: "Sophia Harrington", role: "Project Manager", avatar: "https://images.unsplash.com/photo-1602452920335-6a132309c7c8?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80" },
    { name: "Christina Kray", role: "Support Consultant", avatar: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80" },
    { name: "Amy Forren", role: "Product Designer", avatar: "https://images.unsplash.com/photo-1514846226882-28b324ef7f28?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80" },
    { name: "Philip Williams", role: "Support Consultant", avatar: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80" },
    { name: "Brian Lofoten", role: "UI/UX Designer", avatar: "https://images.unsplash.com/photo-1520409364224-63400afe26e5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80" },
    { name: "Jessica Dorsey", role: "Director of Sales", avatar: "https://images.unsplash.com/photo-1558507652-2d9626c4e67a?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80" },
    { name: "Nick Jackson", role: "UI/UX Designer", avatar: "https://images.unsplash.com/photo-1521151716396-b2da27b1a19f?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80" },
];

const stats = [
    { value: "50K+", label: "Active Learners" },
    { value: "200+", label: "Expert Courses" },
    { value: "35+", label: "Countries" },
    { value: "98%", label: "Satisfaction" },
];

const OurTeam = () => {
    return (
        <div className="min-h-screen bg-white">
            <Helmet title="About Us | GS Classroom" />

            {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
            <section className="relative bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 overflow-hidden">
                {/* BG Decoration */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px]" />
                </div>

                <div className="relative z-10 container mx-auto px-6 lg:px-8 py-24 lg:py-36">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-8">
                        <a href="/" className="hover:text-violet-400 transition-colors">Home</a>
                        <span>/</span>
                        <span className="text-violet-400">About Us</span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left */}
                        <div>
                            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
                                <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
                                <span className="text-violet-400 text-xs font-bold tracking-[0.15em] uppercase">
                                    Our Story
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
                                Empowering Futures,
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400">
                                    One Lesson at a Time
                                </span>
                            </h1>

                            <p className="text-slate-300 text-lg leading-relaxed max-w-lg mb-10">
                                At GoStudent Classroom, we're passionate about reshaping the learning landscape. Our platform transcends boundaries, empowering individuals to unlock their full potential through world-class education.
                            </p>

                            {/* Stats Row */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                {stats.map((stat, i) => (
                                    <div key={i}>
                                        <p className="text-3xl lg:text-4xl font-extrabold text-white mb-1">{stat.value}</p>
                                        <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right - Image Mosaic */}
                        <div className="relative hidden lg:grid grid-cols-2 gap-4 h-[480px]">
                            <div className="space-y-4">
                                <div className="rounded-3xl overflow-hidden h-56">
                                    <img
                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=350&fit=crop"
                                        alt="Team collaboration"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="rounded-3xl overflow-hidden h-48">
                                    <img
                                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&h=300&fit=crop"
                                        alt="Teaching"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 mt-10">
                                <div className="rounded-3xl overflow-hidden h-48">
                                    <img
                                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=300&fit=crop"
                                        alt="Students"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="rounded-3xl overflow-hidden h-56">
                                    <img
                                        src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500&h=350&fit=crop"
                                        alt="Learning"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>

                            {/* Floating Card */}
                            <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center text-2xl">🌍</div>
                                    <div>
                                        <p className="text-white font-extrabold text-lg">35+ Countries</p>
                                        <p className="text-slate-300 text-sm">Global Impact</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════ MISSION ═══════════════════════════════ */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Image */}
                        <div data-aos="fade-right" className="relative">
                            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=500&fit=crop"
                                    alt="Our mission"
                                    className="w-full h-[400px] lg:h-[480px] object-cover"
                                />
                            </div>
                            {/* Accent shape */}
                            <div className="absolute -z-10 -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-violet-100 to-blue-100 rounded-3xl" />
                        </div>

                        {/* Right Content */}
                        <div data-aos="fade-left">
                            <span className="inline-block text-violet-600 text-xs font-extrabold tracking-[0.15em] uppercase mb-4">
                                Our Mission
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
                                Education Without
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
                                    Boundaries
                                </span>
                            </h2>
                            <p className="text-slate-500 text-base lg:text-lg leading-relaxed mb-6">
                                We believe that transformative education should be accessible to everyone, everywhere. GoStudent Classroom was born from a simple idea: that the right knowledge, delivered the right way, can change lives.
                            </p>
                            <p className="text-slate-500 text-base leading-relaxed mb-8">
                                Our team is committed to fostering a community of learners and instructors dedicated to continuous growth and knowledge exchange. Together, we're redefining the future of online education.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <NavLink to="/all-courses">
                                    <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-extrabold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5 text-sm">
                                        Explore Courses
                                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>
                                </NavLink>
                                <NavLink to="/join-as-instructor">
                                    <button className="group inline-flex items-center gap-3 bg-white border-2 border-slate-200 hover:border-violet-600 text-slate-700 hover:text-violet-700 font-extrabold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-md text-sm">
                                        Start Teaching
                                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════ VALUES ═══════════════════════════════ */}
            <section className="py-20 lg:py-28 bg-slate-50">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="text-center mb-14 max-w-2xl mx-auto">
                        <span className="inline-block text-violet-600 text-xs font-extrabold tracking-[0.15em] uppercase mb-4">
                            Our Values
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
                            What We
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600"> Stand For</span>
                        </h2>
                        <p className="text-slate-500 text-base lg:text-lg leading-relaxed">
                            The principles that guide everything we build and every decision we make.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, i) => (
                            <div
                                key={i}
                                data-aos="fade-up"
                                data-aos-delay={i * 100}
                                className="group bg-white rounded-3xl border border-slate-100 hover:border-violet-200 p-8 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500 hover:-translate-y-1"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    {value.icon}
                                </div>
                                <h3 className="font-extrabold text-slate-900 text-lg mb-2">{value.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════ LEADERSHIP ═══════════════════════════════ */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="text-center mb-14 max-w-2xl mx-auto">
                        <span className="inline-block text-violet-600 text-xs font-extrabold tracking-[0.15em] uppercase mb-4">
                            Leadership
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
                            The People
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
                                Leading the Way
                            </span>
                        </h2>
                        <p className="text-slate-500 text-base lg:text-lg leading-relaxed">
                            Meet the visionaries shaping the future of learning at GoStudent.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                        {leadership.map((member, i) => (
                            <article
                                key={i}
                                data-aos="fade-up"
                                data-aos-delay={i * 100}
                                className="group bg-white rounded-3xl border border-slate-100 hover:border-violet-200 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col"
                            >
                                {/* Gradient Top */}
                                <div className={`h-24 bg-gradient-to-br ${member.gradient} relative`}>
                                    {/* Decorative circles */}
                                    <div className="absolute top-3 right-3 w-16 h-16 border border-white/20 rounded-full" />
                                    <div className="absolute top-6 right-6 w-8 h-8 border border-white/10 rounded-full" />
                                </div>

                                {/* Avatar */}
                                <div className="px-6 -mt-10 relative z-10">
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="px-6 pt-4 pb-6 flex flex-col flex-1">
                                    <h3 className="font-extrabold text-slate-900 text-lg">{member.name}</h3>
                                    <p className={`text-xs font-bold uppercase tracking-wide mb-3 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                                        {member.role}
                                    </p>
                                    <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">{member.bio}</p>

                                    {/* Social */}
                                    <div className="flex gap-2 pt-4 border-t border-slate-100">
                                        <a href="#" className="w-8 h-8 bg-slate-50 hover:bg-violet-50 rounded-lg flex items-center justify-center text-slate-400 hover:text-violet-600 transition-all duration-300">
                                            <FaLinkedin className="text-sm" />
                                        </a>
                                        <a href="#" className="w-8 h-8 bg-slate-50 hover:bg-violet-50 rounded-lg flex items-center justify-center text-slate-400 hover:text-violet-600 transition-all duration-300">
                                            <FaTwitter className="text-sm" />
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════ FULL TEAM ═══════════════════════════════ */}
            <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden">
                {/* BG */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-14 max-w-2xl mx-auto">
                        <span className="inline-block text-violet-400 text-xs font-extrabold tracking-[0.15em] uppercase mb-4">
                            Our Team
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
                            Meet the Full
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                                GoStudent Team
                            </span>
                        </h2>
                        <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
                            A passionate collective of educators, engineers, designers, and dreamers.
                        </p>
                    </div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8">
                        {teamMembers.map((member, i) => (
                            <div
                                key={i}
                                data-aos="fade-up"
                                data-aos-delay={i * 40}
                                className="group text-center"
                            >
                                <div className="relative inline-block mb-4">
                                    {/* Glow Ring */}
                                    <div className="absolute -inset-1 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-2xl object-cover ring-2 ring-white/10 group-hover:ring-violet-500/50 transition-all duration-500 group-hover:scale-105"
                                    />
                                    {/* Online dot */}
                                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-[3px] border-slate-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <h4 className="font-bold text-white text-sm leading-tight mb-0.5 group-hover:text-violet-300 transition-colors duration-300">
                                    {member.name}
                                </h4>
                                <p className="text-slate-500 text-xs font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════ CTA BANNER ═══════════════════════════════ */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 rounded-3xl overflow-hidden p-10 lg:p-16">
                        {/* BG Pattern */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full" />
                            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        </div>

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="text-center lg:text-left max-w-xl">
                                <h3 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">
                                    Want to Join Our Team?
                                </h3>
                                <p className="text-violet-100 text-lg leading-relaxed">
                                    We're always looking for passionate educators and talented individuals to help shape the future of learning.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <NavLink to="/join-as-instructor">
                                    <button className="group inline-flex items-center gap-3 bg-white hover:bg-violet-50 text-violet-700 font-extrabold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 text-sm whitespace-nowrap">
                                        Apply as Instructor
                                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>
                                </NavLink>
                                <a
                                    href="mailto:careers@gostudent.com"
                                    className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 text-sm whitespace-nowrap"
                                >
                                    View Open Positions
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OurTeam;
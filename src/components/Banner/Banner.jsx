import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { FaArrowRight, FaPlay } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

const Banner = () => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden'>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500" />
                {/* Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <div className='container mx-auto px-6 lg:px-8 relative z-10'>
                <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <Fade cascade damping={0.1}>
                                <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase">
                                    Excellence in Education
                                </span>
                            </Fade>
                        </div>

                        {/* Heading */}
                        <div data-aos="fade-up" data-aos-duration="800">
                            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                                Learn
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400">
                                    Without
                                </span>
                                Limits
                            </h1>
                        </div>

                        <p data-aos="fade-up" data-aos-delay="100" className="text-slate-400 text-lg leading-relaxed max-w-lg">
                            Transform your future with world-class courses. Join thousands of learners who've already taken the leap toward their dreams.
                        </p>

                        {/* Stats Row */}
                        <div data-aos="fade-up" data-aos-delay="200" className="flex items-center gap-8">
                            <div>
                                <p className="text-3xl font-bold text-white">50K+</p>
                                <p className="text-slate-400 text-sm">Active Students</p>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div>
                                <p className="text-3xl font-bold text-white">200+</p>
                                <p className="text-slate-400 text-sm">Expert Courses</p>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div>
                                <p className="text-3xl font-bold text-white">4.9★</p>
                                <p className="text-slate-400 text-sm">Avg. Rating</p>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="/all-courses"
                                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5"
                            >
                                Start Learning Today
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <button className="group inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm">
                                <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <FaPlay className="text-xs ml-0.5" />
                                </span>
                                Watch Demo
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div data-aos="fade-up" data-aos-delay="400" className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[
                                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
                                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
                                ].map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt="student"
                                        className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover"
                                    />
                                ))}
                            </div>
                            <div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="text-amber-400 text-xs" />
                                    ))}
                                </div>
                                <p className="text-slate-400 text-sm">Loved by 50,000+ learners</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div data-aos="fade-left" data-aos-duration="1000" className="relative hidden lg:block">
                        {/* Main Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                                alt="Students learning"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                        </div>

                        {/* Floating Card 1 - Course Progress */}
                        <div className="absolute -left-12 top-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl w-52">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center">
                                    <span className="text-violet-400 text-lg">🎯</span>
                                </div>
                                <div>
                                    <p className="text-white text-xs font-semibold">Course Progress</p>
                                    <p className="text-slate-400 text-xs">UI/UX Design</p>
                                </div>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-1.5">
                                <div className="bg-gradient-to-r from-violet-500 to-blue-500 h-1.5 rounded-full w-3/4" />
                            </div>
                            <p className="text-slate-300 text-xs mt-1.5">75% Complete</p>
                        </div>

                        {/* Floating Card 2 - Achievement */}
                        <div className="absolute -right-8 top-1/3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">🏆</span>
                                <div>
                                    <p className="text-white text-sm font-semibold">Achievement</p>
                                    <p className="text-emerald-400 text-xs">Certificate Earned!</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card 3 - Live Class */}
                        <div className="absolute -left-8 bottom-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop"
                                        alt="instructor"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
                                </div>
                                <div>
                                    <p className="text-white text-xs font-semibold">Live Now</p>
                                    <p className="text-slate-400 text-xs">React Masterclass</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Ring */}
                        <div className="absolute -z-10 -top-8 -right-8 w-72 h-72 border border-violet-500/20 rounded-full" />
                        <div className="absolute -z-10 -top-4 -right-4 w-60 h-60 border border-blue-500/20 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
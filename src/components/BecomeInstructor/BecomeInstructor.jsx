import React from 'react';
import { FaArrowRight, FaCheck } from "react-icons/fa";

const perks = [
    "Reach a global audience of 50,000+ eager learners",
    "Enjoy complete creative freedom over your curriculum",
    "Earn competitive revenue with transparent payouts",
    "Get dedicated support from our instructor success team",
    "Join a community of 1,000+ passionate educators",
];

const BecomeInstructor = () => {
    return (
        <div className='py-24 bg-white overflow-hidden'>
            <div className="container mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Image Grid */}
                    <div data-aos="fade-right" className="relative hidden lg:grid grid-cols-2 gap-4 h-[560px]">
                        <div className="space-y-4">
                            <div className="rounded-2xl overflow-hidden h-64">
                                <img
                                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop"
                                    alt="Teaching"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="rounded-2xl overflow-hidden h-40">
                                <img
                                    src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=200&fit=crop"
                                    alt="Student"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                        <div className="space-y-4 mt-8">
                            <div className="rounded-2xl overflow-hidden h-40">
                                <img
                                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=200&fit=crop"
                                    alt="Team"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="rounded-2xl overflow-hidden h-64">
                                <img
                                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop"
                                    alt="Instructor"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>

                        {/* Floating stat card */}
                        <div className="absolute bottom-4 -right-6 bg-white rounded-2xl shadow-2xl shadow-slate-200 p-5 border border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-2xl">
                                    💰
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900">$4.2K</p>
                                    <p className="text-slate-500 text-sm">Avg. Monthly Earnings</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div data-aos="fade-left">
                        <span className="inline-block text-violet-600 text-sm font-semibold tracking-widest uppercase mb-4">
                            Teach on GoStudent
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                            Share Your Knowledge,
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
                                Inspire Thousands
                            </span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed mb-8">
                            Join our community of expert instructors and make a meaningful impact. Whether you're a seasoned professional or a passionate enthusiast, there's a place for you here.
                        </p>

                        {/* Perks List */}
                        <ul className="space-y-4 mb-10">
                            {perks.map((perk, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <FaCheck className="text-violet-600 text-xs" />
                                    </div>
                                    <p className="text-slate-600">{perk}</p>
                                </li>
                            ))}
                        </ul>

                        <a
                            href="/join-as-instructor"
                            className="group inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5"
                        >
                            Start Teaching Today
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeInstructor;
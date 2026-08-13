import { useState } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import useCourses from '../../hooks/useCourses';
import useUsersData from '../../hooks/useUsersData';

const stats = [
    { suffix: "+", label: "Active Learners", icon: "👨‍🎓", color: "text-violet-500" },
    { suffix: "", label: "Expert Courses", icon: "📚", color: "text-blue-500" },
    { suffix: "+", label: "Total Enrollments", icon: "🎯", color: "text-emerald-500" },
    { value: "98", suffix: "%", label: "Satisfaction Rate", icon: "⭐", color: "text-amber-500" },
];

const OurServices = () => {
    const [courses] = useCourses();
    const [users] = useUsersData();
    const totalEnroll = courses.reduce((acc, c) => acc + c.totalEnrollment, 0);
    const [counterOn, setCounterOn] = useState(false);

    const dynamicValues = [users.length, courses.length, totalEnroll, 98];

    return (
        <div className='py-24 bg-gradient-to-br from-violet-600 via-blue-600 to-blue-700 relative overflow-hidden'>
            {/* Decorative */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className='container mx-auto px-6 lg:px-8 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center gap-16'>
                    {/* Left */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <span className="inline-block text-blue-200 text-sm font-semibold tracking-widest uppercase mb-4">
                            Why Choose Us
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                            Numbers That Tell
                            <span className="block">Our Story</span>
                        </h2>
                        <p className="text-blue-100 leading-relaxed text-lg max-w-md mx-auto lg:mx-0">
                            Join a growing community of learners achieving real outcomes. Our platform's impact speaks through the milestones of thousands of students.
                        </p>
                        <a
                            href="/all-courses"
                            className="inline-flex items-center gap-2 mt-8 bg-white text-violet-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            Start Your Journey
                        </a>
                    </div>

                    {/* Right Stats */}
                    <div className="lg:w-1/2 w-full">
                        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat, i) => (
                                    <div
                                        key={i}
                                        data-aos="fade-up"
                                        data-aos-delay={i * 100}
                                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
                                    >
                                        <span className="text-3xl mb-3 block">{stat.icon}</span>
                                        <p className="text-4xl font-bold text-white mb-1">
                                            {counterOn && (
                                                <CountUp
                                                    start={0}
                                                    end={dynamicValues[i]}
                                                    duration={2.5}
                                                />
                                            )}
                                            {stat.suffix}
                                        </p>
                                        <p className="text-blue-100 font-medium">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollTrigger>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurServices;
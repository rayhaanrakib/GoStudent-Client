import React from 'react';

const features = [
    {
        icon: "📈",
        title: "Progress Tracking",
        description: "Track your learning journey, set goals, and receive personalized feedback to stay on course.",
        gradient: "from-violet-500 to-purple-600",
        bg: "bg-violet-50",
    },
    {
        icon: "🎬",
        title: "Video Tutorials",
        description: "Comprehensive library of HD video tutorials that transform complex concepts into clarity.",
        gradient: "from-blue-500 to-cyan-600",
        bg: "bg-blue-50",
    },
    {
        icon: "👨‍🏫",
        title: "Expert Instructors",
        description: "Learn from industry leaders who bring real-world expertise directly to your screen.",
        gradient: "from-emerald-500 to-teal-600",
        bg: "bg-emerald-50",
    },
    {
        icon: "♾️",
        title: "Lifetime Access",
        description: "Once enrolled, the content is yours forever. Revisit lessons anytime, anywhere.",
        gradient: "from-orange-500 to-rose-600",
        bg: "bg-orange-50",
    },
    {
        icon: "🌍",
        title: "Learn From Anywhere",
        description: "Seamlessly integrate learning into your life with our mobile-first platform.",
        gradient: "from-pink-500 to-rose-600",
        bg: "bg-pink-50",
    },
    {
        icon: "🏅",
        title: "Certificates",
        description: "Earn industry-recognized certificates that validate your new skills to employers.",
        gradient: "from-amber-500 to-orange-600",
        bg: "bg-amber-50",
    },
];

const AboutCourses = () => {
    return (
        <div className='py-24 bg-slate-950 relative overflow-hidden'>
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className='container mx-auto px-6 lg:px-8 relative z-10'>
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4">
                        What We Offer
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
                        Everything You Need to
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                            Succeed
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                        We've built every feature with your learning success in mind — from day one to completion.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1"
                        >
                            {/* Icon */}
                            <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>

                            <h3 className="text-white text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{feature.description}</p>

                            {/* Hover line */}
                            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutCourses;
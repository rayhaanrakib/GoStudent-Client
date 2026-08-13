import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const steps = [
    {
        number: "01",
        icon: "🔍",
        title: "Discover Your Path",
        description: "Browse hundreds of expertly crafted courses across diverse fields. Use smart filters to find exactly what matches your goals and skill level.",
        gradient: "from-violet-500 to-purple-600",
        image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&h=400&fit=crop",
    },
    {
        number: "02",
        icon: "📖",
        title: "Learn at Your Pace",
        description: "Engage with rich video content, interactive assignments, and live sessions. Your schedule, your rules — learn when and where it suits you best.",
        gradient: "from-blue-500 to-cyan-600",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
    },
    {
        number: "03",
        icon: "🏆",
        title: "Earn & Grow",
        description: "Complete milestones, earn verified certificates, and showcase your achievements to unlock new career opportunities worldwide.",
        gradient: "from-emerald-500 to-teal-600",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
    },
];

const HowItWorks = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section className='py-20 lg:py-28 bg-white'>
            <div className="container mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-14 lg:mb-20">
                    <span className="inline-block text-violet-600 text-xs font-extrabold tracking-[0.15em] uppercase mb-4">
                        How It Works
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
                        Your Learning Journey
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
                            in 3 Simple Steps
                        </span>
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto text-base lg:text-lg leading-relaxed">
                        Getting started is easy. Here's exactly how GoStudent takes you from curious beginner to confident expert.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                    {/* Left Steps */}
                    <div className="space-y-3">
                        {steps.map((step, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveStep(i)}
                                data-aos="fade-right"
                                data-aos-delay={i * 80}
                                className={`w-full text-left group relative p-6 lg:p-7 rounded-2xl border-2 transition-all duration-400 overflow-hidden ${
                                    activeStep === i
                                        ? 'bg-slate-900 border-slate-900 shadow-2xl shadow-slate-900/20 scale-[1.01]'
                                        : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg hover:-translate-y-0.5'
                                }`}
                            >
                                <div className="flex items-start gap-5 relative z-10">
                                    {/* Icon */}
                                    <div className={`flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center text-xl lg:text-2xl shadow-lg ${
                                        activeStep === i ? 'bg-gradient-to-br ' + step.gradient : 'bg-slate-50 text-slate-600 group-hover:text-violet-600'
                                    } transition-colors duration-300`}>
                                        <span className="drop-shadow-sm">{step.icon}</span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2 gap-3">
                                            <h3 className={`font-extrabold text-lg lg:text-xl leading-tight transition-colors duration-300 ${
                                                activeStep === i ? 'text-white' : 'text-slate-900'
                                            }`}>
                                                {step.title}
                                            </h3>
                                            <span className={`text-xs font-black tracking-wider transition-colors duration-300 ${
                                                activeStep === i ? 'text-violet-400' : 'text-slate-200'
                                            }`}>
                                                {step.number}
                                            </span>
                                        </div>
                                        <p className={`text-sm lg:text-base leading-relaxed transition-colors duration-300 ${
                                            activeStep === i ? 'text-slate-300' : 'text-slate-500'
                                        }`}>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Active Left Bar */}
                                {activeStep === i && (
                                    <div className={`absolute left-0 top-0 bottom-0 w-[5px] rounded-full bg-gradient-to-b ${step.gradient} shadow-[0_0_15px_rgba(139,92,246,0.5)]`} />
                                )}
                            </button>
                        ))}

                        <div data-aos="fade-up" className="pt-6">
                            <a
                                href="/all-courses"
                                className="group inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-extrabold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20 hover:-translate-y-1 text-sm lg:text-base"
                            >
                                Begin Your Journey
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div data-aos="fade-left" className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 h-[420px] lg:h-[520px]">
                            <img
                                src={steps[activeStep].image}
                                alt={steps[activeStep].title}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

                            {/* Bottom Badge */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-xl">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${steps[activeStep].gradient} flex items-center justify-center text-xl shadow-lg shadow-violet-500/20 flex-shrink-0`}>
                                            <span>{steps[activeStep].icon}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-white font-extrabold text-base lg:text-lg truncate">
                                                {steps[activeStep].title}
                                            </p>
                                            <p className="text-white/70 text-sm font-medium">
                                                Step {activeStep + 1} of 3
                                            </p>
                                        </div>
                                        <div className="ml-auto flex gap-2">
                                            {steps.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setActiveStep(i)}
                                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                                        i === activeStep ? 'w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]' : 'w-1.5 bg-white/30 hover:bg-white/50'
                                                    }`}
                                                    aria-label={`Go to step ${i + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Rings */}
                        <div className="absolute -z-10 -top-8 -right-8 w-56 h-56 border-[3px] border-violet-200/50 rounded-3xl rotate-12" />
                        <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 border-[3px] border-blue-200/50 rounded-3xl -rotate-12" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
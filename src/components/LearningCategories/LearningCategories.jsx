import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const categories = [
    {
        icon: "💻",
        title: "Web Development",
        count: "42 Courses",
        gradient: "from-violet-500 to-purple-600",
        lightBg: "bg-violet-50",
        lightText: "text-violet-700",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    },
    {
        icon: "🎨",
        title: "UI/UX Design",
        count: "28 Courses",
        gradient: "from-pink-500 to-rose-600",
        lightBg: "bg-pink-50",
        lightText: "text-pink-700",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    },
    {
        icon: "📊",
        title: "Data Science",
        count: "35 Courses",
        gradient: "from-blue-500 to-cyan-600",
        lightBg: "bg-blue-50",
        lightText: "text-blue-700",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    },
    {
        icon: "📱",
        title: "Mobile Dev",
        count: "19 Courses",
        gradient: "from-emerald-500 to-teal-600",
        lightBg: "bg-emerald-50",
        lightText: "text-emerald-700",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    },
    {
        icon: "🤖",
        title: "AI & Machine Learning",
        count: "24 Courses",
        gradient: "from-orange-500 to-amber-600",
        lightBg: "bg-orange-50",
        lightText: "text-orange-700",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    },
    {
        icon: "📷",
        title: "Photography",
        count: "16 Courses",
        gradient: "from-rose-500 to-pink-600",
        lightBg: "bg-rose-50",
        lightText: "text-rose-700",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop",
    },
    {
        icon: "💼",
        title: "Business & Finance",
        count: "31 Courses",
        gradient: "from-slate-600 to-slate-800",
        lightBg: "bg-slate-50",
        lightText: "text-slate-700",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    },
    {
        icon: "🎵",
        title: "Music & Audio",
        count: "22 Courses",
        gradient: "from-indigo-500 to-violet-600",
        lightBg: "bg-indigo-50",
        lightText: "text-indigo-700",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop",
    },
];

const LearningCategories = () => {
    const [hovered, setHovered] = React.useState(null);

    return (
        <div className='py-24 bg-slate-50'>
            <div className="container mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
                    <div>
                        <span className="inline-block text-violet-600 text-sm font-semibold tracking-widest uppercase mb-4">
                            Browse Categories
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                            Explore by
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
                                Your Interest
                            </span>
                        </h2>
                    </div>
                    <p className="text-slate-500 max-w-md leading-relaxed lg:text-right">
                        From technology to creative arts — discover your passion and dive deep into curated learning tracks.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((cat, i) => (
                        <Link to="/all-courses" key={i}>
                            <div
                                data-aos="fade-up"
                                data-aos-delay={i * 50}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Background Image */}
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-80 group-hover:opacity-90 transition-opacity`} />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                                    <div className="flex items-start justify-between">
                                        <span className="text-3xl">{cat.icon}</span>
                                        <div className={`w-8 h-8 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0`}>
                                            <FaArrowRight className="text-white text-xs" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-base leading-tight mb-1">{cat.title}</h3>
                                        <p className="text-white/70 text-xs font-medium">{cat.count}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div data-aos="fade-up" className="text-center mt-12">
                    <Link to="/all-courses">
                        <button className="group inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                            Browse All Categories
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LearningCategories;
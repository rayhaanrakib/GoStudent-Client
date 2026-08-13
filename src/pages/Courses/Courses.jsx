import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import useCoursesData from '../../hooks/useCoursesData';
import CourseCard from './CourseCard';
import { CiSearch } from 'react-icons/ci';
import { FiFilter, FiX } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';

const categories = [
    { label: "All", value: "" },
    { label: "Web Development", value: "web" },
    { label: "UI/UX Design", value: "design" },
    { label: "Data Science", value: "data" },
    { label: "Mobile Dev", value: "mobile" },
    { label: "AI & ML", value: "ai" },
    { label: "Business", value: "business" },
];

const sortOptions = [
    { label: "Most Popular", value: "popular" },
    { label: "Newest First", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
];

const Courses = () => {
    const [search, setSearch] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const [sortBy, setSortBy] = useState('popular');
    const [showFilters, setShowFilters] = useState(false);
    const [allCourses, refetch, isLoading] = useCoursesData({ search });

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(inputValue);
        refetch();
    };

    const handleClear = () => {
        setInputValue('');
        setSearch('');
        refetch();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet title="Courses | GS Classroom" />

            {/* Hero Header */}
            <div className="relative bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/3 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
                </div>

                <div className="relative z-10 container mx-auto px-6 lg:px-8 py-20 lg:py-28">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                        <a href="/" className="hover:text-violet-400 transition-colors">Home</a>
                        <span>/</span>
                        <span className="text-violet-400">Courses</span>
                    </div>

                    {/* Heading */}
                    <div className="max-w-2xl mb-10">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-5">
                            <FaGraduationCap className="text-violet-400" />
                            <span className="text-violet-400 text-sm font-semibold tracking-wider uppercase">
                                Course Catalog
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4">
                            Expand Your
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                                Knowledge
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Discover {allCourses?.length || '200'}+ expert-led courses across diverse fields. Find the perfect course to accelerate your growth.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl">
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                                <input
                                    type="text"
                                    name="search"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Search for courses, topics, or instructors..."
                                    className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 pl-12 pr-10 py-4 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white/15 transition-all duration-300 text-sm backdrop-blur-sm"
                                />
                                {inputValue && (
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                    >
                                        <FiX className="text-lg" />
                                    </button>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 text-sm whitespace-nowrap"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-6 mt-8 flex-wrap">
                        {[
                            { value: "200+", label: "Courses" },
                            { value: "50K+", label: "Students" },
                            { value: "100+", label: "Instructors" },
                            { value: "4.8★", label: "Avg. Rating" },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="text-white font-bold">{stat.value}</span>
                                <span className="text-slate-400 text-sm">{stat.label}</span>
                                {i < 3 && <span className="text-slate-700 ml-4">•</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="sticky top-16 lg:top-20 z-30 bg-white border-b border-slate-100 shadow-sm">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4 py-4">
                        {/* Category Tabs - Desktop */}
                        <div className="hidden lg:flex items-center gap-2 overflow-x-auto scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => setActiveCategory(cat.value)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        activeCategory === cat.value
                                            ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-3 ml-auto">
                            {/* Sort */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-xl focus:outline-none focus:border-violet-500 transition-colors cursor-pointer hover:border-slate-300"
                            >
                                {sortOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>

                            {/* Mobile Filter Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-700 text-sm font-medium hover:border-violet-500 hover:text-violet-600 transition-all"
                            >
                                <FiFilter />
                                Filters
                            </button>

                            {/* Result Count */}
                            <span className="hidden sm:block text-slate-400 text-sm whitespace-nowrap">
                                {allCourses?.length || 0} results
                            </span>
                        </div>
                    </div>

                    {/* Mobile Categories */}
                    {showFilters && (
                        <div className="lg:hidden pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => {
                                        setActiveCategory(cat.value);
                                        setShowFilters(false);
                                    }}
                                    className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        activeCategory === cat.value
                                            ? 'bg-violet-600 text-white'
                                            : 'bg-slate-100 text-slate-600'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Active Search Tag */}
            {search && (
                <div className="container mx-auto px-6 lg:px-8 pt-6">
                    <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-sm">Results for:</span>
                        <span className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-sm font-semibold px-3 py-1.5 rounded-full">
                            "{search}"
                            <button
                                onClick={handleClear}
                                className="hover:text-violet-900 transition-colors"
                            >
                                <FiX className="text-base" />
                            </button>
                        </span>
                    </div>
                </div>
            )}

            {/* Courses Grid */}
            <div className="container mx-auto px-6 lg:px-8 py-10 lg:py-14">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-6">
                        {/* Skeleton Loader */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 animate-pulse">
                                    <div className="h-52 bg-slate-200" />
                                    <div className="p-6 space-y-3">
                                        <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
                                        <div className="h-4 bg-slate-200 rounded-lg w-1/2" />
                                        <div className="h-3 bg-slate-100 rounded-lg w-full" />
                                        <div className="h-3 bg-slate-100 rounded-lg w-5/6" />
                                        <div className="flex justify-between items-center pt-3">
                                            <div className="h-8 bg-slate-200 rounded-lg w-20" />
                                            <div className="h-8 bg-slate-200 rounded-lg w-28" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : allCourses?.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-24 h-24 bg-violet-100 rounded-3xl flex items-center justify-center mb-6 text-5xl">
                            🔍
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">No courses found</h3>
                        <p className="text-slate-500 max-w-md mb-8">
                            We couldn't find any courses matching "{search}". Try a different search term or browse all courses.
                        </p>
                        <button
                            onClick={handleClear}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5"
                        >
                            Browse All Courses
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allCourses?.map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
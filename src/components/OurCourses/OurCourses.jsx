import React from 'react';
import useTopCourses from '../../hooks/useTopCourses';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link, NavLink } from 'react-router-dom';
import { FaArrowRight, FaUsers, FaStar } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";

const OurCourses = () => {
    const [topCourses] = useTopCourses();

    return (
        <div className='py-24 bg-white'>
            <div className='container mx-auto px-6 lg:px-8'>
                {/* Header */}
                <div className='flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16'>
                    <div className="max-w-xl">
                        <span className="inline-block text-violet-600 text-sm font-semibold tracking-widest uppercase mb-4">
                            Popular Courses
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                            Explore Our Most
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
                                In-Demand Classes
                            </span>
                        </h2>
                    </div>
                    <NavLink to="/all-courses">
                        <button className="group inline-flex items-center gap-2 text-slate-700 font-semibold border-2 border-slate-200 hover:border-violet-600 hover:text-violet-600 px-6 py-3 rounded-xl transition-all duration-300">
                            View All Courses
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </NavLink>
                </div>

                {/* Swiper */}
                <div data-aos="fade-up">
                    <Swiper
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        spaceBetween={24}
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        className="pb-14"
                    >
                        {topCourses?.map(course => (
                            <SwiperSlide key={course._id}>
                                <div className="group bg-white rounded-2xl border border-slate-100 hover:border-violet-200 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 overflow-hidden transition-all duration-500">
                                    {/* Image */}
                                    <div className="relative overflow-hidden h-52">
                                        <img
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            src={course.courseImage}
                                            alt={course.courseName}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-sm text-violet-700 text-xs font-semibold px-3 py-1 rounded-full">
                                                Bestseller
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h5 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-violet-700 transition-colors">
                                            {course.courseName}
                                        </h5>
                                        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{course.shortDescription}</p>

                                        {/* Meta */}
                                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-5">
                                            <span className="flex items-center gap-1.5">
                                                <FaUsers className="text-violet-500" />
                                                {course.totalEnrollment?.toLocaleString()}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <FaStar className="text-amber-400" />
                                                4.8
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <MdOutlineTimer className="text-violet-500" />
                                                12h
                                            </span>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <span className="text-2xl font-bold text-violet-600">
                                                ${course.price || '49'}
                                            </span>
                                            <Link to={`course/${course._id}`}>
                                                <button className="group/btn inline-flex items-center gap-2 bg-violet-50 hover:bg-violet-600 text-violet-700 hover:text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all duration-300">
                                                    Enroll Now
                                                    <FaArrowRight className="text-xs group-hover/btn:translate-x-0.5 transition-transform" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default OurCourses;
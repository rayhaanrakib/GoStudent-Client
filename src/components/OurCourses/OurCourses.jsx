import React from 'react';
import useTopCourses from '../../hooks/useTopCourses';
import SectionTitle from './../../shared/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link, NavLink } from 'react-router-dom';

const OurCourses = () => {
    const [topCourses] = useTopCourses();

    return (
        <div className='px-5 lg:px-0'>
            <SectionTitle heading="Explore Our Popular Courses" subheading="Discover Trending and Highly Recommended Classes" ></SectionTitle>
            <div className='mt-16'>
                <div className='flex justify-between'>
                    <h1 className='text-xl lg:text-3xl font-semibold text-primary w-full pr-2 lg:pr-0 lg:w-1/3'>Most Popular and In-Demand Classes on Our Platform</h1>
                    <NavLink to="/all-courses"><button className='btn bg-white'>All Courses</button></NavLink>
                </div>
                <p className='text-secondary w-full md:w-3/4 mt-3 lg:mt-5'>Unlock a world of knowledge with our most sought-after courses. Explore trending topics and gain valuable skills from the courses that learners like you find most compelling. Enroll today to join the community of learners shaping their futures with our popular courses.</p>
            </div>

            {/* large screen */}
            <div data-aos="fade-up" className='mt-10 hidden lg:block'>

                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper min-h-[75vh]"
                >
                    {
                        topCourses?.map(course => <SwiperSlide key={course._id}>
                            <div className="max-w-sm rounded-lg shadow-md bg-white mb-16">
                                <div className='h-56 w-full'>
                                    <img className="rounded-t-lg object-cover" src={course.courseImage} alt="" />
                                </div>
                                <div className="p-5">
                                    <a>
                                        <h5 className="mb-2 text-xl font-semibold tracking-tight">{course.courseName}</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-primary">Total Enrollment: {course.totalEnrollment}</p>
                                    <p className="mb-3 h-20 font-normal text-gray-400">{course.shortDescription}</p>
                                    <Link to={`course/${course._id}`}>
                                        <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg focus:ring-4 focus:outline-none bg-primary focus:ring-primary">
                                            Read more
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }

                </Swiper>



            </div>
            {/* medium screen */}
            <div data-aos="fade-up" className='mt-10 hidden md:block lg:hidden'>

                <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper min-h-[90vh]"
                >
                    {
                        topCourses?.map(course => <SwiperSlide key={course._id}>
                            <div className="max-w-sm rounded-lg shadow bg-secondary">
                                <div className='h-56 w-full'>
                                    <img className="rounded-t-lg object-cover" src={course.courseImage} alt="" />
                                </div>
                                <div className="p-5">
                                    <a>
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-white">{course.courseName}</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-primary">Total Enrollment: {course.totalEnrollment}</p>
                                    <p className="mb-3 h-20 font-normal text-gray-400">{course.shortDescription}</p>
                                    <Link to={`course/${course._id}`}>
                                        <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg focus:ring-4 focus:outline-none bg-primary focus:ring-primary">
                                            Read more
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }

                </Swiper>



            </div>
            {/* small screen */}
            <div data-aos="fade-up" className='mt-10 block md:hidden'>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper min-h-[80vh]"
                >
                    {
                        topCourses?.map(course => <SwiperSlide key={course._id}>
                            <div className="max-w-sm rounded-lg shadow bg-secondary">
                                <div className='h-48 w-full'>
                                    <img className="rounded-t-lg object-cover" src={course.courseImage} alt="" />
                                </div>
                                <div className="p-5">
                                    <a>
                                        <h5 className="mb-2 text-lg font-bold tracking-tight text-white">{course.courseName}</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-primary">Total Enrollment: {course.totalEnrollment}</p>
                                    <p className="mb-3 h-20 font-normal text-gray-400">{course.shortDescription}</p>
                                    <Link to={`course/${course._id}`}>
                                        <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg focus:ring-4 focus:outline-none bg-primary focus:ring-primary">
                                            Read more
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </a>
                                    </Link>

                                </div>
                            </div>
                        </SwiperSlide>)
                    }

                </Swiper>



            </div>
        </div>
    );
};

export default OurCourses;
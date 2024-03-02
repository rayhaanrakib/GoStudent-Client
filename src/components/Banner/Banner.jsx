import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { FaArrowRight } from "react-icons/fa6";


const Banner = () => {
    return (
        <div className='container mx-auto my-12'>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
                    <div className="lg:col-span-3 relative col-span-7 text-center lg:text-start my-2">
                        <span className="block font-semibold text-accent text-sm md:text-base my-5"><Fade cascade damping={1e-1}>EXCELLENCE IN EDUCATION</Fade></span>
                        <h1 data-aos="fade-up" className="block font-semibold tracking-tight text-gray-800 text-4xl md:text-5xl lg:text-6xl ">Start Better Learning Future From Here</h1>
                        <p data-aos="fade-up" className="mt-6 px-3 md:px-12 lg:px-0 text-lg text-gray-800">Learning is a life-long journey that in fact we never find the terminate stop. Stop searching, enjoy the process.</p>
                        <img className='hidden lg:block absolute w-1/2 opacity-75 -z-10 top-0 -left-36' src="https://i.ibb.co/C1SRhW8/bg.gif" alt="" />

                        <div data-aos="fade-up" className="mt-16 lg:mt-10 flex flex-col justify-center lg:justify-normal items-center gap-2 sm:flex-row sm:gap-3">
                            <a className="w-full sm:w-auto py-4 px-5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white hover:bg-accent disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600" href="/all-courses">
                                Get Started Today <FaArrowRight></FaArrowRight>
                            </a>
                            <a className="w-full hidden sm:w-auto py-4 px-5 justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white hover:bg-accent disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600" href="/#top">
                                Get Started Today <FaArrowRight></FaArrowRight>
                            </a>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:col-span-4 mt-10 lg:mt-0">
                        <div className='relative'>
                            <img className="h-[30rem] object-cover w-full lg:w-[90%] rounded-xl shadow-md" src="https://i.ibb.co/C8L3g4X/banner1.jpg" alt="Image Description" />
                            <img className="hidden lg:block absolute -top-16 right-0 w-1/3 rounded-xl drop-shadow-sm" src="https://i.ibb.co/vDQTtKz/banner2.png" alt="Image Description" />
                            <img className="hidden lg:block absolute -bottom-16 -left-10 w-1/3 rounded-xl shadow-md" src="https://i.ibb.co/xfyHPxj/banner3.png" alt="Image Description" />

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
import React from 'react';
import SectionTitle from './../../shared/SectionTitle';
import { FaArrowRight } from "react-icons/fa6";
import { FiKey } from "react-icons/fi";
import { GrUserExpert } from "react-icons/gr";
import { MdOutlinePersonalVideo } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const AboutCourses = () => {
    return (
        <div className='container mx-auto py-8 lg:py-16'>
            <SectionTitle heading="WHAT WE OFFER" subheading="Make every step user-centric"></SectionTitle>
            <section>
                <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
                    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                        <div data-aos="fade-up" data-aos-duration="1000" className="grid gap-8 border border-solid border-[#dfdfdf] p-8 md:p-10">
                            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358bd6f8819ea49d9990848_Frame%2047885-7.svg" alt="" className="inline-block h-16" />
                            <p className="text-xl font-semibold">Progress Tracking</p>
                            <p className="text-sm text-[#636262]">Track your learning journey, set goals, and receive personalized feedback</p>
                        </div>
                        <div data-aos="fade-up" data-aos-duration="1000" className="grid gap-8 border border-solid border-[#dfdfdf] p-8 md:p-10">
                            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358bc975b21e904613ae60d_Frame%2047885-2.svg" alt="" className="inline-block h-16" />
                            <p className="text-xl font-semibold">Video Tutorials</p>
                            <p className="text-sm text-[#636262]">Comprehensive library of video tutorials that transform complex concepts</p>
                        </div>
                        <div data-aos="fade-up" data-aos-duration="1000" className="grid gap-8 border border-solid border-[#dfdfdf] p-8 md:p-10">
                            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358bc9157ec9794f99cb7a1_Frame%2047885-3.svg" alt="" className="inline-block h-16" />
                            <p className="text-xl font-semibold">Expert Instruction</p>
                            <p className="text-sm text-[#636262]">Receive the highest quality instruction tailored to your skill development needs.</p>
                        </div>
                        <div data-aos="fade-up" data-aos-duration="1000" className="grid gap-8 border border-solid border-[#dfdfdf] p-8 md:p-10">
                            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358bc900f798334430e6064_Frame%2047885-4.svg" alt="" className="inline-block h-16" />
                            <p className="text-xl font-semibold">Lifetime Access</p>
                            <p className="text-sm text-[#636262]">Continuous growth with lifetime access to all your course materials.</p>
                        </div>
                        <div data-aos="fade-up" data-aos-duration="1000" className="grid gap-8 border border-solid border-[#dfdfdf] p-8 md:p-10">
                            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358bc8843648dc8b08bbea1_Frame%2047885-5.svg" alt="" className="inline-block h-16" />
                            <p className="text-xl font-semibold">Learn From Anywhere</p>
                            <p className="text-sm text-[#636262]">Seamlessly integrate learning into your life – access courses anytime, anywhere</p>
                        </div>
                        <div data-aos="fade-up" data-aos-duration="1000" className="grid gap-8 border border-solid border-[#dfdfdf] p-8 md:p-10">
                            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358bc86b3c62b1933cdce49_Frame%2047885-6.svg" alt="" className="inline-block h-16" />
                            <p className="text-xl font-semibold">Certificates of Completion</p>
                            <p className="text-sm text-[#636262]">Receive a certificate of completion, validating their new skills and knowledge.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutCourses;
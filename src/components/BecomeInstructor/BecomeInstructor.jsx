import React from 'react';
import { FaArrowRight, FaRocket } from "react-icons/fa";
import { FaServicestack } from "react-icons/fa";
import SectionTitle from './../../shared/SectionTitle';

const BecomeInstructor = () => {
    return (
        <div>
            <SectionTitle heading="Become an Instructor" subheading="Inspire learners worldwide" />
            <div className="pt-12 bg-blueGray-50">
                <div className="items-center justify-between flex flex-col lg:flex-row gap-5">
                    <div data-aos="fade-up" className="w-full lg:w-5/12 ml-auto mr-auto px-4">
                        <img alt="..." className="w-full h-80 md:h-96 lg:h-[600px] rounded-lg shadow-2xl object-cover" src="https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg" />
                    </div>
                    <div data-aos="fade-up" className="w-full lg:w-7/12 ml-auto mr-auto px-4">
                        <div className="md:pr-12">
                            <div className='w-16 h-16 rounded-full overflow-hidden flex items-center justify-center mb-8'>
                                <img className='w-36 h-36 object-cover rounded-full shadow-md' src="https://cliply.co/wp-content/uploads/2019/09/371909290_ROCKET_400px.gif" alt="" />
                            </div>

                            <h3 className="text-3xl font-semibold">Instructor At GoStudent</h3>
                            <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                                Inspire and educate by joining our community of instructors. Share your expertise, passion, and knowledge with learners around the world. Become a part of our dynamic platform and help shape the future of online education.
                            </p>
                            <ul className="list-none my-6">
                                <li className="py-2">
                                    <div className="flex items-center">
                                        <span className="text-sm font-semibold inline-block py-2 px-2 uppercase rounded-full text-white bg-primary mr-3"><FaServicestack /> </span>
                                        <h4>
                                            Reach a diverse audience and make a global impact.
                                        </h4>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="flex items-center">
                                        <span className="text-sm font-semibold inline-block py-2 px-2 uppercase rounded-full text-white bg-primary mr-3"><FaServicestack /> </span>
                                        <h4>
                                            Enjoy the freedom to create and teach on your terms.
                                        </h4>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="flex items-center">
                                        <span className="text-sm font-semibold inline-block py-2 px-2 uppercase rounded-full text-white bg-primary mr-3"><FaServicestack /> </span>
                                        <h4>
                                            Connect with a community of learners and educators.
                                        </h4>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="flex items-center">
                                        <span className="text-sm font-semibold inline-block py-2 px-2 uppercase rounded-full text-white bg-primary mr-3"><FaServicestack /> </span>
                                        <h4>
                                            Earn income by sharing your knowledge and skills.
                                        </h4>
                                    </div>
                                </li>
                            </ul>
                            <a className="w-full sm:w-auto py-4 px-5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white hover:bg-accent disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600" href="/join-as-instructor">
                                Become An Instructor <FaArrowRight></FaArrowRight>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default BecomeInstructor;
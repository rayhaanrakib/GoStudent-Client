import React from 'react';
import SectionTitle from './../../shared/SectionTitle';

const AboutUs = () => {
    return (
        <div data-aos="fade-up">
            <SectionTitle heading="Our Team Members" subheading="Meet the Minds Shaping Your Learning Experience"></SectionTitle>
            <section>
                <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10">
                    <ul className="grid md:grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 justify-center">
                        <li data-aos="fade-up" className="mx-auto flex flex-col md:flex-row items-center gap-4 border border-solid border-[#dfdfdf] bg-white p-8 text-center md:items-start md:text-left max-w-sm md:max-w-full">
                            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/635a0f4871ea332919af9f8d_Rectangle%2035.png" alt="" className="inline-block h-64 w-full object-cover" />
                            <div>
                                <p className="font-bold">John</p>
                                <p className="font-semibold text-[#647084] mb-4"> Developer</p>
                                <p className="text-sm text-[#647084]">With a degree in computer science and years of experience in web development, he ensures that our website runs seamlessly, offering users a smooth and hassle-free learning experience.</p>
                            </div>
                        </li>
                        <li data-aos="fade-up" className="mx-auto flex flex-col md:flex-row items-center gap-4 border border-solid border-[#dfdfdf] bg-white p-8 text-center md:items-start md:text-left max-w-sm md:max-w-full">
                            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/635b47d5a5453de17e4e9bd8_Rectangle%2035-4.png" alt="" className="inline-block h-64 w-full object-cover" />
                            <div>
                                <p className="font-bold">Annisyah</p>
                                <p className="font-semibold text-[#647084] mb-4"> Developer</p>
                                <p className="text-sm text-[#647084]">With a background in instructional design and a passion for crafting engaging learning materials, Emily ensures that our courses are not only informative but also highly interactive.</p>
                            </div>
                        </li>
                        <li data-aos="fade-up" className="mx-auto flex flex-col md:flex-row items-center gap-4 border border-solid border-[#dfdfdf] bg-white p-8 text-center md:items-start md:text-left max-w-sm md:max-w-full">
                            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/635a0f4adfb4938a1a06002c_Rectangle%2035-2.png" alt="" className="inline-block h-64 w-full object-cover" />
                            <div>
                                <p className="font-bold">Sarah</p>
                                <p className="font-semibold text-[#647084] mb-4"> Developer</p>
                                <p className="text-sm text-[#647084]">Sarah is dedicated to ensuring that every user has a positive experience on our platform. With her background in customer service and a knack for problem-solving, she goes above and beyond to assist users with any inquiries or issues they may have.</p>
                            </div>
                        </li>
                        <li data-aos="fade-up" className="mx-auto flex flex-col md:flex-row items-center gap-4 border border-solid border-[#dfdfdf] bg-white p-8 text-center md:items-start md:text-left max-w-sm md:max-w-full">
                            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/635b4809622b0572f305f9f2_Rectangle%2035-5.png" alt="" className="inline-block h-64 w-full object-cover" />
                            <div>
                                <p className="font-bold">David</p>
                                <p className="font-semibold text-[#647084] mb-4"> Developer</p>
                                <p className="text-sm text-[#647084]">David is the heartbeat of our vibrant online community. With a background in community management and a passion for fostering connections, he cultivates a supportive and engaging environment where learners can collaborate, share insights, and seek advice. </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>



        </div>
    );
};

export default AboutUs;
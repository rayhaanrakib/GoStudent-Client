import React from 'react';
import SectionTitle from './../../shared/SectionTitle';

const Faq = () => {
    return (
        <div data-aos="fade-up">
            <div className="max-w-[85rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                    <SectionTitle heading="Frequently Asked Questions" />
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">Your questions, answered</h2>
                    <p className="mt-1 text-gray-600 ">Answers to the most frequently asked questions.</p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <section className="w-full divide-y divide-slate-200 rounded bg-white shadow-md shadow-slate-200">
                        <details className="group p-4" open>
                            <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                                How can I enroll in a course on GoStudent Classroom?
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    aria-labelledby="title-ac13 desc-ac13"
                                >
                                    <title id="title-ac13">Open icon</title>
                                    <desc id="desc-ac13">
                                        icon that represents the state of the summary
                                    </desc>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </summary>
                            <p className="mt-4 text-slate-500">
                                Enrolling in a course is simple! Just browse our course catalog, select the course you're interested in, and click the "Enroll" button to get started on your learning journey.
                            </p>
                        </details>
                        <details className="group p-4">
                            <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                                What payment methods are accepted on GoStudent Classroom?
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    aria-labelledby="title-ac14 desc-ac14"
                                >
                                    <title id="title-ac14">Open icon</title>
                                    <desc id="desc-ac14">
                                        icon that represents the state of the summary
                                    </desc>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </summary>
                            <p className="mt-4 text-slate-500">
                                We accept a variety of payment methods, including major credit/debit cards and digital payment platforms, ensuring a convenient and secure transaction process for our users.
                            </p>
                        </details>
                        <details className="group p-4">
                            <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                                Can I access course materials after completing a course?
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    aria-labelledby="title-ac16 desc-ac16"
                                >
                                    <title id="title-ac16">Open icon</title>
                                    <desc id="desc-ac16">
                                        icon that represents the state of the summary
                                    </desc>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </summary>
                            <p className="mt-4 text-slate-500">
                                Yes, you'll have lifetime access to course materials once you've successfully completed a course on GoStudent Classroom. This allows you to revisit the content whenever you need to reinforce your learning or brush up on specific topics.
                            </p>
                        </details>
                        <details className="group p-4">
                            <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                                How do I contact customer support for assistance?
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    aria-labelledby="title-ac14 desc-ac14"
                                >
                                    <title id="title-ac14">Open icon</title>
                                    <desc id="desc-ac14">
                                        icon that represents the state of the summary
                                    </desc>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </summary>
                            <p className="mt-4 text-slate-500">
                                If you have any questions or need assistance, our customer support team is here to help! You can reach out to us through the "Contact Us" page, and we'll respond to your inquiry promptly to ensure a smooth learning experience.
                            </p>
                        </details>
                        <details className="group p-4">
                            <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                                Is my payment information secure?
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    aria-labelledby="title-ac14 desc-ac14"
                                >
                                    <title id="title-ac14">Open icon</title>
                                    <desc id="desc-ac14">
                                        icon that represents the state of the summary
                                    </desc>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </summary>
                            <p className="mt-4 text-slate-500">
                                Yes, protecting your personal and payment information is our top priority. We utilize industry-standard encryption technology to ensure that your payment details are securely transmitted during the checkout process. Your information is never stored on our servers, providing you with peace of mind when making online purchases.
                            </p>
                        </details>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Faq;
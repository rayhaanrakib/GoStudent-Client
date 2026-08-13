import React from 'react';
import Banner from './../../components/Banner/Banner';
import AboutCourses from './../../components/AboutCourses/AboutCourses';
import ScrollToTop from 'react-scroll-to-top';
import { Helmet } from 'react-helmet';
import Partners from './../../components/OurPartnerships/Partners';
import Feedback from '../../components/OurFeedback/Feedback';
import OurCourses from '../../components/OurCourses/OurCourses';
import BecomeInstructor from '../../components/BecomeInstructor/BecomeInstructor';
import OurServices from './../../components/OurServices/OurServices';
import Faq from '../../components/Faq/Faq';
import AboutUs from '../../components/AboutUs/AboutUs';
import Newsletter from '../../components/Newsletter/Newsletter';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import LearningCategories from '../../components/LearningCategories/LearningCategories';
import FeaturedInstructors from '../../components/FeaturedInstructors/FeaturedInstructors';

const Home = () => {
    return (
        <div className="overflow-x-hidden">
            <Helmet title='GoStudent Classroom | Empower Learning, Ignite Futures' />

            {/* Hero - Full viewport, no container needed */}
            <Banner />

            {/* Partners - Subtle, right after hero */}
            <Partners />

            {/* Popular Courses */}
            <OurCourses />

            {/* Browse Categories - NEW */}
            <LearningCategories />

            {/* What We Offer - Dark section for contrast */}
            <AboutCourses />

            {/* How It Works - NEW */}
            <HowItWorks />

            {/* Stats / Why Choose Us */}
            <OurServices />

            {/* Featured Instructors - NEW */}
            <FeaturedInstructors />

            {/* Testimonials */}
            <Feedback />

            {/* Become Instructor CTA */}
            <BecomeInstructor />

            {/* Team */}
            <AboutUs />

            {/* FAQ */}
            <Faq />

            {/* Newsletter */}
            <Newsletter />

            {/* Scroll To Top */}
            <ScrollToTop
                smooth
                className="!flex !items-center !justify-center !bg-gradient-to-r !from-violet-600 !to-blue-600 !border-none !shadow-lg !shadow-violet-500/30 !rounded-xl"
                component={
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                }
            />
        </div>
    );
};

export default Home;
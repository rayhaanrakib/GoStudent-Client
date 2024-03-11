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

const Home = () => {
    return (
        <div>
            <Helmet title='GoStudent Classroom | Empower Learning, Ignite Futures' />
            <div className='py-0 lg:py-5'>
                <Banner></Banner>
            </div>
            <div data-aos="fade-up" className='container mx-auto mt-20'>
                <Partners />
            </div>

            <div data-aos="fade-up" className='container mx-auto mt-20'>
                <Feedback />
            </div>
            <div data-aos="fade-up" className='container mx-auto mt-20'>
                <OurCourses />
            </div>
            <div data-aos="fade-up" className='container mx-auto mt-20'>
                <OurServices />
            </div>
            <div data-aos="fade-up" className='container mx-auto mt-20'>
                <BecomeInstructor />
            </div>
            <div className='mt-20'>
                <AboutCourses></AboutCourses>
            </div>
            <div data-aos="fade-up" className='container mx-auto mt-20'>
                <AboutUs />
            </div>
            <div data-aos="fade-up" className='container mx-auto mt-10'>
                <Faq />
            </div>
            <div data-aos="fade-up" className='container mx-auto mt-10'>
                <Newsletter />
            </div>

            <ScrollToTop className='flex justify-center items-center' smooth />
        </div>


    );
};

export default Home;
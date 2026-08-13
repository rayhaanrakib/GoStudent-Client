import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import useFeedbacks from '../../hooks/useFeedbacks';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';

const Feedback = () => {
    const [feedbacks] = useFeedbacks();
    const progressCircle = useRef(null);
    const progressContent = useRef(null);

    const onAutoplayTimeLeft = (s, time, progress) => {
        if (progressCircle.current) progressCircle.current.style.setProperty('--progress', 1 - progress);
        if (progressContent.current) progressContent.current.textContent = `${Math.ceil(time / 1)}s`;
    };

    return (
        <section className='py-20 lg:py-28 bg-slate-50'>
            <div className='container mx-auto px-6 lg:px-8'>
                {/* Header */}
                <div className="text-center mb-14 lg:mb-16 max-w-2xl mx-auto">
                    <span className="inline-block text-violet-600 text-xs font-extrabold tracking-[0.15em] uppercase mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
                        What Our Students
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
                            Are Saying
                        </span>
                    </h2>
                    <p className="text-slate-500 text-base lg:text-lg leading-relaxed">
                        Real stories from real learners — discover how GoStudent has transformed their careers and lives.
                    </p>
                </div>

                <div data-aos="fade-up" className="relative">
                    <Swiper
                        spaceBetween={24}
                        centeredSlides={false}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        modules={[Autoplay, Pagination]}
                        onAutoplayTimeLeft={onAutoplayTimeLeft}
                        className="pb-14"
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {feedbacks?.map((feedback) => (
                            <SwiperSlide key={feedback._id}>
                                <article className="bg-white rounded-3xl p-7 lg:p-8 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 border border-slate-100 hover:border-violet-200 transition-all duration-500 h-full flex flex-col">
                                    {/* Stars */}
                                    <div className="flex items-center gap-1 mb-5">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className="text-amber-400 text-sm" />
                                        ))}
                                        <span className="ml-2 text-xs font-bold text-slate-300">5.0</span>
                                    </div>

                                    {/* Quote */}
                                    <div className="relative mb-6">
                                        <FaQuoteLeft className="text-violet-100 text-4xl absolute -top-3 -left-1 -z-10" />
                                        <blockquote className="text-slate-600 leading-relaxed text-sm lg:text-base relative z-10">
                                            "{feedback?.feedbackText}"
                                        </blockquote>
                                    </div>

                                    {/* Author */}
                                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100">
                                        <img
                                            src={feedback?.image}
                                            alt={feedback?.name}
                                            className="w-12 h-12 rounded-xl object-cover ring-2 ring-violet-100 ring-offset-2 flex-shrink-0"
                                        />
                                        <div>
                                            <h4 className="font-extrabold text-slate-900 text-sm">{feedback?.name}</h4>
                                            <p className="text-slate-400 text-xs font-medium">{feedback?.title}</p>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Progress indicator */}
                    <div className="autoplay-progress fixed bottom-8 right-8 z-50 hidden md:flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-slate-100">
                        <svg viewBox="0 0 48 48" ref={progressCircle} className="w-8 h-8 -rotate-90">
                                            <circle cx="24" cy="24" r="20" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                                            <circle cx="24" cy="24" r="20" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" strokeDasharray="125.6" strokeDashoffset="125.6" style={{ strokeDashoffset: '125.6', transition: 'stroke-dashoffset 0.3s' }} />
                                        </svg>
                                        <span ref={progressContent} className="text-xs font-bold text-slate-500 tabular-nums">4s</span>
                                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feedback;
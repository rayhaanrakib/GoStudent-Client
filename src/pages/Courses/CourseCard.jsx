import { FaUserFriends, FaStar, FaArrowRight } from "react-icons/fa";
import { MdOutlineTimer, MdOutlinePlayLesson } from "react-icons/md";
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const {
        _id,
        courseName,
        shortDescription,
        instructorName,
        courseImage,
        totalEnrollment,
        price,
    } = course;

    return (
        <div
            data-aos="fade-up"
            className="group bg-white rounded-2xl border border-slate-100 hover:border-violet-200 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 overflow-hidden transition-all duration-500 hover:-translate-y-1 flex flex-col"
        >
            {/* Image */}
            <Link to={`/course/${_id}`} className="block relative overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                    <img
                        src={courseImage}
                        alt={courseName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Hover Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                            <MdOutlinePlayLesson className="text-2xl ml-0.5" />
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-violet-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                            Bestseller
                        </span>
                    </div>
                    <div className="absolute top-3 right-3">
                        <span className="bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <MdOutlineTimer className="text-base" />
                            12h
                        </span>
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                {/* Rating Row */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={`text-xs ${i < 4 ? 'text-amber-400' : 'text-slate-200'}`}
                            />
                        ))}
                        <span className="text-slate-500 text-xs ml-1">(4.8)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <FaUserFriends className="text-violet-400" />
                        <span>{totalEnrollment?.toLocaleString()} enrolled</span>
                    </div>
                </div>

                {/* Title */}
                <Link to={`/course/${_id}`}>
                    <h3 className="text-slate-900 font-bold text-lg leading-snug mb-2 group-hover:text-violet-700 transition-colors duration-300 line-clamp-2">
                        {courseName}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                    {shortDescription}
                </p>

                {/* Instructor */}
                <div className="flex items-center gap-2 mb-5 pb-5 border-b border-slate-100">
                    <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {instructorName?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="text-slate-500 text-sm">
                        by{' '}
                        <span className="font-semibold text-slate-700 hover:text-violet-600 transition-colors cursor-pointer">
                            {instructorName}
                        </span>
                    </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold text-slate-900">${price}</span>
                        <span className="text-slate-400 text-xs ml-1 line-through">
                            ${Math.round(price * 1.4)}
                        </span>
                    </div>
                    <Link to={`/course/${_id}`}>
                        <button className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-violet-500/30">
                            Enroll Now
                            <FaArrowRight className="text-xs group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
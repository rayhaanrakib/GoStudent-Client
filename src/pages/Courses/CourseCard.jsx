import { FaUserFriends } from "react-icons/fa";
import { Link } from 'react-router-dom';
import TruncatedText from './../../shared/TruncatedText';


const CourseCard = ({ course }) => {
    const { _id, courseName, shortDescription, instructorName, courseImage, totalEnrollment, price } = course;
    return (
        <div data-aos="fade-up" className="border-gray-100 border rounded-lg group">
            <div className="bg-white shadow-md hover:shadow-xl rounded-lg px-5 pt-5 lg:w-96 h-[500px] lg:h-[520px]">
                <Link to={`/course/${_id}`}>
                    <div className="rounded-md h-60 w-full overflow-hidden">
                        <img className="rounded-md group-hover:scale-125 object-cover h-60 w-full transition-all duration-700" src={courseImage} alt="Course image" />
                    </div>
                </Link>
                <div className="mt-4 flex flex-col justify-between h-[210px] lg:h-[230px] gap-2 lg:gap-0">
                    <div className="flex flex-col justify-between h-24">
                        <Link to={`/course/${_id}`}>
                            <a>
                                <h3 className="text-secondary font-semibold text-base lg:text-xl tracking-tight my-2">{courseName}</h3>
                            </a>
                        </Link>
                        <div>
                            <TruncatedText text={shortDescription} wordCount={4} />
                        </div>

                        <h3 className="text-secondary font-medium text-sm tracking-tight my-2">Instructor: {instructorName}</h3>
                        <div className="flex items-center my-2">
                            <FaUserFriends className="text-primary text-xl" />
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">{totalEnrollment} Students Enrolled</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between lg:my-2 ">
                        <span className="text-3xl font-semibold text-gray-700 ">${price}</span>
                        <Link to={`/course/${_id}`}>
                            <button className="text-white bg-primary hover:bg-accent font-medium rounded-md text-sm px-5 py-2.5 text-center">Enroll Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
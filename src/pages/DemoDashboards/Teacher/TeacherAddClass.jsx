import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaUpload, FaBook, FaTag, FaFileAlt, FaClock, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useLocalStorage } from '../../../hooks/useStorage';
import { mockTeacherClasses, mockCategories, mockCourses } from '../../../data/mockData';

const defaultClass = {
  courseName: '',
  courseCategory: 'Web Development',
  price: '',
  shortDescription: '',
  detailedDescription: '',
  lectures: '',
  language: 'English',
  certificate: 'Yes'
};

const TeacherAddClass = () => {
  const [teacherClasses, setTeacherClasses] = useLocalStorage('demo_teacher_classes', mockTeacherClasses);
  const [courses, setCourses] = useLocalStorage('demo_courses', mockCourses);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: defaultClass });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const newId = `tc${Date.now()}`;
    const newClass = {
      _id: newId,
      teacherId: 'u2',
      courseId: `c${Date.now()}`,
      courseName: data.courseName,
      courseImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop',
      courseCategory: data.courseCategory,
      price: parseFloat(data.price) || 0,
      courseStatus: 0,
      totalEnrollment: 0,
      lectures: parseInt(data.lectures) || 0,
      createdDate: new Date().toISOString().split('T')[0],
      courseRatings: 0,
      shortDescription: data.shortDescription,
      detailedDescription: data.detailedDescription,
      language: data.language,
      certificate: data.certificate,
      instructorName: 'Jessica Lee',
      instructorTitle: 'Senior Instructor',
      instructorExperience: '5 years',
      instructorEmail: 'jessica.teacher@gostudent.com',
      instructorImage: 'https://i.pravatar.cc/150?img=49'
    };

    setTimeout(() => {
      setTeacherClasses(prev => [...prev, newClass]);
      setCourses(prev => [...prev, newClass]);
      setIsSubmitting(false);
      reset(defaultClass);
      toast.success('Class submitted for admin review! 🎉');
    }, 800);
  };

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="Add New Class | Teacher Demo" />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
          Create New Class
        </h1>
        <p className="text-slate-500 mt-2">
          Fill in the details to add a new course. It will be reviewed by admin before going live.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h4 className="font-semibold text-secondary mb-4 flex items-center gap-2">
              <FaCheckCircle className="text-primary" size={14} /> Class Checklist
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-slate-600">
                <FaCheckCircle className="text-primary mt-1 flex-shrink-0" size={12} />
                <span>Clear, descriptive course title</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <FaCheckCircle className="text-primary mt-1 flex-shrink-0" size={12} />
                <span>Compelling course description</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <FaCheckCircle className="text-primary mt-1 flex-shrink-0" size={12} />
                <span>Appropriate category selection</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <FaCheckCircle className="text-primary mt-1 flex-shrink-0" size={12} />
                <span>High-quality cover image</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600">
                <FaCheckCircle className="text-primary mt-1 flex-shrink-0" size={12} />
                <span>Competitive pricing strategy</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-green-50 border border-primary/20 rounded-xl p-5">
            <h4 className="font-semibold text-secondary mb-2">💡 Pro Tip</h4>
            <p className="text-sm text-slate-600">
              Courses with detailed descriptions and high-quality cover images get <span className="font-bold text-primary">3x more enrollments</span>.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-primary transition cursor-pointer group">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center mx-auto mb-3 transition">
                <FaUpload className="text-slate-400 group-hover:text-primary transition" size={24} />
              </div>
              <h4 className="font-semibold text-secondary">Upload Course Cover Image</h4>
              <p className="text-sm text-slate-500 mt-1">PNG or JPG, recommended 1200x675px (Demo: auto-generated)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaBook size={12} className="text-slate-400" /> Course Name *
                </label>
                <input
                  {...register('courseName', { required: 'Course name is required', minLength: { value: 5, message: 'At least 5 characters' } })}
                  placeholder="e.g., Advanced JavaScript Concepts"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                    errors.courseName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                  }`}
                />
                {errors.courseName && <p className="text-xs text-red-500 mt-1">{errors.courseName.message}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaTag size={12} className="text-slate-400" /> Category *
                </label>
                <select
                  {...register('courseCategory', { required: true })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-primary bg-white"
                >
                  {mockCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  💰 Price (USD) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('price', { required: 'Price is required', min: { value: 0, message: 'Invalid price' } })}
                  placeholder="e.g., 49.99"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                    errors.price ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                  }`}
                />
                {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaClock size={12} className="text-slate-400" /> Number of Lectures *
                </label>
                <input
                  type="number"
                  min="1"
                  {...register('lectures', { required: 'Required', min: { value: 1, message: 'At least 1' } })}
                  placeholder="e.g., 50"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                    errors.lectures ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                  }`}
                />
                {errors.lectures && <p className="text-xs text-red-500 mt-1">{errors.lectures.message}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  🌐 Language
                </label>
                <select
                  {...register('language')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-primary bg-white"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Hindi</option>
                  <option>Bengali</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  🎓 Certificate Included
                </label>
                <select
                  {...register('certificate')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-primary bg-white"
                >
                  <option value="Yes">Yes - Upon completion</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaFileAlt size={12} className="text-slate-400" /> Short Description *
                </label>
                <textarea
                  {...register('shortDescription', { required: 'Required', maxLength: { value: 200, message: 'Max 200 chars' } })}
                  rows={2}
                  placeholder="Brief summary that appears on course cards"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition resize-none ${
                    errors.shortDescription ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                  }`}
                />
                {errors.shortDescription && <p className="text-xs text-red-500 mt-1">{errors.shortDescription.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  📝 Detailed Course Description *
                </label>
                <textarea
                  {...register('detailedDescription', { required: 'Required', minLength: { value: 30, message: 'At least 30 chars' } })}
                  rows={6}
                  placeholder="What will students learn? Who is this course for? What makes this course unique?"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition resize-none ${
                    errors.detailedDescription ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                  }`}
                />
                {errors.detailedDescription && <p className="text-xs text-red-500 mt-1">{errors.detailedDescription.message}</p>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => reset(defaultClass)}
                className="px-6 py-3 rounded-xl bg-gray-100 text-slate-600 font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2"
              >
                <FaTimes size={12} /> Clear Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-primary text-white font-medium hover:bg-accent transition shadow-lg shadow-primary/20 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : (<><FaUpload size={14} /> Submit for Review</>)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherAddClass;

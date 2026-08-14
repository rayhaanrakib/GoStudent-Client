import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import useUserInfo from '../../../hooks/useUserInfo';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUpload, FaBook, FaTag, FaFileAlt, FaClock, FaCheckCircle, FaTimes } from 'react-icons/fa';

const CATEGORIES = [
  'UX Design', 'Web Development', 'Digital Marketing', 'Business',
  'Teaching and Academics', 'Data Science', 'Computer Science',
  'Language Learning', 'Photography and Video', 'Personal Development',
];

const AddClass = () => {
  const userInfo = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const getUser = userInfo?.result;
    const course = {
      courseName: data.courseName,
      courseCategory: data.courseCategory,
      instructorName: getUser?.displayName,
      instructorTitle: getUser?.title,
      instructorExperience: getUser?.experience,
      instructorEmail: getUser?.email,
      instructorImage: getUser?.photoURL,
      courseImage: data.courseImage,
      courseRatings: 4.8,
      price: parseFloat(data.price),
      shortDescription: data.shortDescription,
      detailedDescription: data.detailedDescription,
      totalEnrollment: 0,
      courseStatus: 0,
      language: data.language,
      certificate: data.certificate,
      lectures: parseInt(data.lectures),
    };

    Swal.fire({
      title: 'Submit this course?',
      text: 'It will go to admin review before going live.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0BAC7C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit!',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsSubmitting(true);
        axiosSecure.post('/api/v1/instructor/add', course).then((res) => {
          setIsSubmitting(false);
          if (res.data?.insertedId) {
            Swal.fire({ title: 'Submitted!', text: 'Course sent for review.', icon: 'success' });
            reset();
          }
        }).catch(() => setIsSubmitting(false));
      }
    });
  };

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="Add Course | GS Classroom" />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">Create New Class</h1>
        <p className="text-slate-500 mt-2">
          Fill in the details to add a new course. It will be reviewed by admin before going live.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar tips */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h4 className="font-semibold text-secondary mb-4 flex items-center gap-2">
              <FaCheckCircle className="text-primary" size={14} /> Class Checklist
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                'Clear, descriptive course title',
                'Compelling course description',
                'Appropriate category selection',
                'Valid course image URL',
                'Competitive pricing strategy',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-slate-600">
                  <FaCheckCircle className="text-primary mt-1 flex-shrink-0" size={12} />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-green-50 border border-primary/20 rounded-xl p-5">
            <h4 className="font-semibold text-secondary mb-2">💡 Pro Tip</h4>
            <p className="text-sm text-slate-600">
              Courses with detailed descriptions get{' '}
              <span className="font-bold text-primary">3× more enrollments</span>.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
            {/* Image URL (text input — no file upload on backend) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaBook size={12} className="text-slate-400" /> Course Name *
                </label>
                <input
                  {...register('courseName', { required: 'Course name is required', minLength: { value: 5, message: 'At least 5 characters' } })}
                  placeholder="e.g., Advanced JavaScript Concepts"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition ${errors.courseName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'}`}
                />
                {errors.courseName && <p className="text-xs text-red-500 mt-1">{errors.courseName.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaUpload size={12} className="text-slate-400" /> Course Image URL *
                </label>
                <input
                  type="url"
                  {...register('courseImage', { required: 'Image URL is required' })}
                  placeholder="https://..."
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition ${errors.courseImage ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'}`}
                />
                {errors.courseImage && <p className="text-xs text-red-500 mt-1">{errors.courseImage.message}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaTag size={12} className="text-slate-400" /> Category *
                </label>
                <select
                  {...register('courseCategory', { required: true })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-primary bg-white"
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                {errors.courseCategory && <p className="text-xs text-red-500 mt-1">Category is required</p>}
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
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition ${errors.price ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'}`}
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
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition ${errors.lectures ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'}`}
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
                  <option value="Yes">Yes — Upon completion</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaFileAlt size={12} className="text-slate-400" /> Short Description *
                </label>
                <textarea
                  {...register('shortDescription', { required: 'Required', maxLength: { value: 200, message: 'Max 200 characters' } })}
                  rows={2}
                  placeholder="Brief summary shown on course cards"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition resize-none ${errors.shortDescription ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'}`}
                />
                {errors.shortDescription && <p className="text-xs text-red-500 mt-1">{errors.shortDescription.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  📝 Detailed Course Description *
                </label>
                <textarea
                  {...register('detailedDescription', { required: 'Required', minLength: { value: 30, message: 'At least 30 characters' } })}
                  rows={6}
                  placeholder="What will students learn? Who is this course for? What makes this course unique?"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition resize-none ${errors.detailedDescription ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'}`}
                />
                {errors.detailedDescription && <p className="text-xs text-red-500 mt-1">{errors.detailedDescription.message}</p>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => reset()}
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

export default AddClass;

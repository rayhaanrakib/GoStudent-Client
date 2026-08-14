import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaBriefcase, FaEdit, FaSave, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import { useLocalStorage } from '../../../hooks/useStorage';

const defaultStudentProfile = {
  displayName: 'Alex Thompson',
  email: 'alex.student@gostudent.com',
  photoURL: 'https://i.pravatar.cc/150?img=33',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  title: 'Computer Science Student',
  bio: 'Passionate about web development and data science. Currently learning full-stack development to build impactful applications. Love the journey of continuous learning!',
  education: "Stanford University, B.S. Computer Science",
  interests: ['Web Development', 'Data Science', 'Machine Learning', 'Open Source'],
  linkedin: 'linkedin.com/in/alexthompson',
  twitter: '@alexthompson_codes',
  website: 'alexthompson.dev',
  joinedDate: '2023-10-15'
};

const StudentProfile = () => {
  const [profile, setProfile] = useLocalStorage('demo_student_profile', defaultStudentProfile);
  const [isEditing, setIsEditing] = useLocalStorage('demo_student_profile_editing', false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: profile });

  const onSubmit = (data) => {
    setProfile(data);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    reset(profile);
    setIsEditing(false);
  };

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="My Profile | Student Demo" />

      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
            My Profile
          </h1>
          <p className="text-slate-500 mt-2">
            Manage your account settings and preferences.
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-accent transition shadow-md shadow-primary/20"
          >
            <FaEdit size={14} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-5 py-2.5 bg-gray-100 text-slate-600 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-accent transition shadow-md shadow-primary/20"
              form="profile-form"
              type="submit"
            >
              <FaSave size={14} /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-28 bg-gradient-to-r from-primary to-green-600" />
            <div className="px-6 pb-6 -mt-12">
              <div className="relative inline-block">
                <img
                  src={profile.photoURL}
                  alt={profile.displayName}
                  className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-accent transition">
                    <FaEdit size={12} />
                  </button>
                )}
              </div>
              <h3 className="mt-4 text-xl font-bold text-secondary">{profile.displayName}</h3>
              <p className="text-primary font-medium text-sm">{profile.title}</p>
              <p className="text-xs text-slate-400 mt-1">Member since {profile.joinedDate}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-semibold text-secondary mb-4">Quick Stats</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Courses Enrolled</span>
                <span className="font-bold text-secondary">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Certificates</span>
                <span className="font-bold text-secondary">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Study Hours</span>
                <span className="font-bold text-secondary">17.8h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Current Streak</span>
                <span className="font-bold text-primary flex items-center gap-1">🔥 7 days</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-semibold text-secondary mb-4">Social Links</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-slate-600 hover:text-primary transition group">
                <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-sky-100 flex items-center justify-center transition">
                  <FaLinkedin className="text-sky-500" />
                </div>
                <span className="text-sm truncate">{profile.linkedin}</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-slate-600 hover:text-primary transition group">
                <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-sky-100 flex items-center justify-center transition">
                  <FaTwitter className="text-sky-400" />
                </div>
                <span className="text-sm truncate">{profile.twitter}</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-slate-600 hover:text-primary transition group">
                <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-primary/10 flex items-center justify-center transition">
                  <FaGlobe className="text-primary" />
                </div>
                <span className="text-sm truncate">{profile.website}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">Personal Information</h2>
              <p className="text-sm text-slate-500">Update your personal details.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaUser size={12} className="text-slate-400" /> Full Name
                </label>
                <input
                  {...register('displayName', { required: 'Name is required' })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                    errors.displayName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                  } ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                />
                {errors.displayName && <p className="text-xs text-red-500 mt-1">{errors.displayName.message}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaEnvelope size={12} className="text-slate-400" /> Email
                </label>
                <input
                  {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                    errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                  } ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaPhone size={12} className="text-slate-400" /> Phone
                </label>
                <input
                  {...register('phone')}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-primary ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaMapMarkerAlt size={12} className="text-slate-400" /> Location
                </label>
                <input
                  {...register('location')}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-primary ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaBriefcase size={12} className="text-slate-400" /> Professional Title
                </label>
                <input
                  {...register('title')}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-primary ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  🎓 Education
                </label>
                <input
                  {...register('education')}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-primary ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 mb-1.5 block">About Me</label>
              <textarea
                {...register('bio')}
                disabled={!isEditing}
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-primary resize-none ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
              />
            </div>
          </form>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">Learning Interests</h2>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map(interest => (
                <span
                  key={interest}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary hover:text-white transition cursor-default"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

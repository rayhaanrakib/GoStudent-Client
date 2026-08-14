import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaBriefcase, FaEdit, FaSave, FaLinkedin, FaTwitter, FaGlobe, FaGraduationCap } from 'react-icons/fa';
import { useLocalStorage } from '../../../hooks/useStorage';

const defaultTeacherProfile = {
  displayName: 'Jessica Lee',
  email: 'jessica.teacher@gostudent.com',
  photoURL: 'https://i.pravatar.cc/150?img=49',
  phone: '+1 (555) 987-6543',
  location: 'New York, NY',
  title: 'Senior Full-Stack Development Instructor',
  bio: 'Passionate educator with 5+ years of industry experience building web applications. I specialize in making complex programming concepts accessible to all learners. Love seeing my students succeed!',
  experience: '5 years',
  education: 'M.S. Computer Science, NYU',
  skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'React Hooks'],
  linkedin: 'linkedin.com/in/jessicalee',
  twitter: '@jessicacodes',
  website: 'jessicacodes.dev',
  joinedDate: '2023-06-20'
};

const TeacherProfile = () => {
  const [profile, setProfile] = useLocalStorage('demo_teacher_profile', defaultTeacherProfile);
  const [isEditing, setIsEditing] = useLocalStorage('demo_teacher_profile_editing', false);
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
      <Helmet title="Teacher Profile | Demo" />

      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
            My Profile
          </h1>
          <p className="text-slate-500 mt-2">
            Manage your instructor profile and credentials.
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-700 transition shadow-md shadow-blue-500/20"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-700 transition shadow-md shadow-blue-500/20"
              form="teacher-profile-form"
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
            <div className="h-28 bg-gradient-to-r from-blue-500 to-cyan-600" />
            <div className="px-6 pb-6 -mt-12">
              <div className="relative inline-block">
                <img
                  src={profile.photoURL}
                  alt={profile.displayName}
                  className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white flex items-center justify-center shadow-md hover:from-blue-600 hover:to-cyan-700 transition">
                    <FaEdit size={12} />
                  </button>
                )}
              </div>
              <h3 className="mt-4 text-xl font-bold text-secondary">{profile.displayName}</h3>
              <p className="text-blue-600 font-medium text-sm">{profile.title}</p>
              <p className="text-xs text-slate-400 mt-1">Instructor since {profile.joinedDate}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium">
                <FaGraduationCap size={10} /> Verified Instructor
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-semibold text-secondary mb-4">Teaching Stats</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Active Classes</span>
                <span className="font-bold text-secondary">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Total Students</span>
                <span className="font-bold text-secondary">6</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Avg. Rating</span>
                <span className="font-bold text-amber-500">4.9 ⭐</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Experience</span>
                <span className="font-bold text-secondary">{profile.experience}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-semibold text-secondary mb-4">Social Links</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition group">
                <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-sky-100 flex items-center justify-center transition">
                  <FaLinkedin className="text-sky-500" />
                </div>
                <span className="text-sm truncate">{profile.linkedin}</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition group">
                <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-sky-100 flex items-center justify-center transition">
                  <FaTwitter className="text-sky-400" />
                </div>
                <span className="text-sm truncate">{profile.twitter}</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition group">
                <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition">
                  <FaGlobe className="text-blue-500" />
                </div>
                <span className="text-sm truncate">{profile.website}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <form id="teacher-profile-form" onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
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
                    errors.displayName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
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
                    errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
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
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-blue-500 ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaMapMarkerAlt size={12} className="text-slate-400" /> Location
                </label>
                <input
                  {...register('location')}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-blue-500 ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaBriefcase size={12} className="text-slate-400" /> Professional Title
                </label>
                <input
                  {...register('title')}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-blue-500 ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                🎓 Education
                </label>
                <input
                  {...register('education')}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-blue-500 ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 mb-1.5 block">About Me</label>
              <textarea
                {...register('bio')}
                disabled={!isEditing}
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-blue-500 resize-none ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
              />
            </div>
          </form>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-secondary mb-4">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map(skill => (
                <span
                key={skill}
                className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-500 hover:text-white transition cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;

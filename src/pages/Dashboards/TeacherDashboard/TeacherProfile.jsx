import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaBriefcase,
  FaEdit, FaSave, FaLinkedin, FaTwitter, FaGlobe, FaGraduationCap,
} from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useUserInfo from '../../../hooks/useUserInfo';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const TeacherProfile = () => {
  const { user } = useAuth();
  const userInfo = useUserInfo();
  const teacher = userInfo?.result;
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);

  const { data: myClasses = [] } = useQuery({
    queryKey: ['teacherProfileClasses', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/instructor/classes/${user.email}`);
      return res.data;
    },
  });

  const defaultValues = {
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: teacher?.phone || '',
    location: teacher?.location || '',
    title: teacher?.title || 'Instructor',
    education: teacher?.education || '',
    bio: teacher?.bio || 'Passionate educator sharing real-world knowledge. Join me on your learning journey!',
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues });

  const onSubmit = () => {
    setIsEditing(false);
    toast.success('Profile updated!');
  };

  const handleCancel = () => {
    reset(defaultValues);
    setIsEditing(false);
  };

  const approvedClasses = myClasses.filter(c => c.courseStatus === 1);
  const totalStudents = approvedClasses.reduce((acc, c) => acc + (c.totalEnrollment || 0), 0);
  const skills = teacher?.skills || (teacher?.category ? [teacher.category] : ['Teaching']);
  const joinedDate = teacher?.createdAt ? new Date(teacher.createdAt).toLocaleDateString() : '2024';

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title={`${user?.displayName} Profile | Instructor | GS Classroom`} />

      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">My Profile</h1>
          <p className="text-slate-500 mt-2">Manage your instructor profile and credentials.</p>
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
            <button onClick={handleCancel} className="px-5 py-2.5 bg-gray-100 text-slate-600 rounded-xl font-medium hover:bg-gray-200 transition">
              Cancel
            </button>
            <button
              form="teacher-profile-form"
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-700 transition shadow-md shadow-blue-500/20"
            >
              <FaSave size={14} /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-28 bg-gradient-to-r from-blue-500 to-cyan-600" />
            <div className="px-6 pb-6 -mt-12">
              <div className="relative inline-block">
                <img
                  src={user?.photoURL || 'https://i.pravatar.cc/150?img=10'}
                  alt={user?.displayName}
                  className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white flex items-center justify-center shadow-md hover:from-blue-600 hover:to-cyan-700 transition">
                    <FaEdit size={12} />
                  </button>
                )}
              </div>
              <h3 className="mt-4 text-xl font-bold text-secondary">{user?.displayName}</h3>
              <p className="text-blue-600 font-medium text-sm">{teacher?.title || 'Instructor'}</p>
              <p className="text-xs text-slate-400 mt-1">Instructor since {joinedDate}</p>
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
                <span className="font-bold text-secondary">{approvedClasses.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Total Classes</span>
                <span className="font-bold text-secondary">{myClasses.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Total Students</span>
                <span className="font-bold text-secondary">{totalStudents}</span>
              </div>
              {teacher?.experience && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Experience</span>
                  <span className="font-bold text-secondary">{teacher.experience}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Status</span>
                <span className={`font-bold text-sm capitalize px-2.5 py-0.5 rounded-full text-xs ${
                  teacher?.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {teacher?.status || 'Active'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-semibold text-secondary mb-4">Social Links</h4>
            <div className="space-y-3">
              {[
                { icon: FaLinkedin, label: 'LinkedIn', color: 'text-sky-500', bg: 'group-hover:bg-sky-100' },
                { icon: FaTwitter, label: 'Twitter', color: 'text-sky-400', bg: 'group-hover:bg-sky-100' },
                { icon: FaGlobe, label: 'Website', color: 'text-blue-500', bg: 'group-hover:bg-blue-100' },
              ].map(({ icon: Icon, label, color, bg }) => (
                <a key={label} href="#" className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition group">
                  <div className={`w-9 h-9 rounded-lg bg-slate-100 ${bg} flex items-center justify-center transition`}>
                    <Icon className={color} />
                  </div>
                  <span className="text-sm">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          <form id="teacher-profile-form" onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">Personal Information</h2>
              <p className="text-sm text-slate-500">Update your personal details.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name: 'displayName', label: 'Full Name', icon: FaUser, rules: { required: 'Name is required' } },
                { name: 'email', label: 'Email', icon: FaEnvelope, rules: { required: 'Email is required' } },
                { name: 'phone', label: 'Phone', icon: FaPhone, rules: {} },
                { name: 'location', label: 'Location', icon: FaMapMarkerAlt, rules: {} },
                { name: 'title', label: 'Professional Title', icon: FaBriefcase, rules: {} },
                { name: 'education', label: '🎓 Education', icon: null, rules: {} },
              ].map(({ name, label, icon: Icon, rules }) => (
                <div key={name}>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                    {Icon && <Icon size={12} className="text-slate-400" />} {label}
                  </label>
                  <input
                    {...register(name, rules)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                      errors[name] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    } ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                  />
                  {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name].message}</p>}
                </div>
              ))}
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
            <h2 className="text-xl font-semibold text-secondary mb-4">Skills &amp; Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(skills) ? skills : [skills]).map((skill) => (
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

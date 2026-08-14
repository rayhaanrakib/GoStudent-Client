import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaBriefcase,
  FaEdit, FaSave, FaLinkedin, FaTwitter, FaGlobe,
} from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useUserInfo from '../../../hooks/useUserInfo';
import { useState } from 'react';

const StudentProfile = () => {
  const { user } = useAuth();
  const userInfo = useUserInfo();
  const student = userInfo?.result;

  const [isEditing, setIsEditing] = useState(false);

  const defaultValues = {
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: student?.phone || '',
    location: student?.location || '',
    title: student?.title || 'Student',
    education: student?.education || '',
    bio: student?.bio || 'Passionate about learning new skills. Currently enrolled at GS Classroom to level up my career.',
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

  const interests = student?.interests || ['Web Development', 'Data Science', 'Open Source'];
  const joinedDate = student?.createdAt
    ? new Date(student.createdAt).toLocaleDateString()
    : '2024';

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title={`${user?.displayName} Profile | Student | GS Classroom`} />

      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">My Profile</h1>
          <p className="text-slate-500 mt-2">Manage your account settings and preferences.</p>
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
            <button onClick={handleCancel} className="px-5 py-2.5 bg-gray-100 text-slate-600 rounded-xl font-medium hover:bg-gray-200 transition">
              Cancel
            </button>
            <button
              form="profile-form"
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-accent transition shadow-md shadow-primary/20"
            >
              <FaSave size={14} /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Avatar card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-28 bg-gradient-to-r from-primary to-green-600" />
            <div className="px-6 pb-6 -mt-12">
              <div className="relative inline-block">
                <img
                  src={user?.photoURL || 'https://i.pravatar.cc/150?img=10'}
                  alt={user?.displayName}
                  className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-accent transition">
                    <FaEdit size={12} />
                  </button>
                )}
              </div>
              <h3 className="mt-4 text-xl font-bold text-secondary">{user?.displayName}</h3>
              <p className="text-primary font-medium text-sm capitalize">{student?.title || 'Student'}</p>
              <p className="text-xs text-slate-400 mt-1">Member since {joinedDate}</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-semibold text-secondary mb-4">Quick Stats</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Role</span>
                <span className="font-bold text-secondary capitalize">{student?.role || 'Student'}</span>
              </div>
              {student?.status === 'approved' && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Also</span>
                  <span className="font-bold text-primary">Instructor</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Email</span>
                <span className="font-bold text-secondary text-xs truncate max-w-[140px]">{user?.email}</span>
              </div>
              {student?.experience && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Experience</span>
                  <span className="font-bold text-secondary">{student.experience}</span>
                </div>
              )}
            </div>
          </div>

          {/* Social links */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-semibold text-secondary mb-4">Social Links</h4>
            <div className="space-y-3">
              {[
                { icon: FaLinkedin, label: 'LinkedIn', color: 'text-sky-500', bg: 'group-hover:bg-sky-100' },
                { icon: FaTwitter, label: 'Twitter', color: 'text-sky-400', bg: 'group-hover:bg-sky-100' },
                { icon: FaGlobe, label: 'Website', color: 'text-primary', bg: 'group-hover:bg-primary/10' },
              ].map(({ icon: Icon, label, color, bg }) => (
                <a key={label} href="#" className="flex items-center gap-3 text-slate-600 hover:text-primary transition group">
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
          <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
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
                      errors[name] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'
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
                className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-primary resize-none ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
              />
            </div>
          </form>

          {interests.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-secondary mb-4">Learning Interests</h2>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary hover:text-white transition cursor-default"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaBriefcase, FaEdit, FaSave, FaLinkedin, FaTwitter, FaGlobe, FaShieldAlt, FaUserShield } from 'react-icons/fa';
import { useLocalStorage } from '../../../hooks/useStorage';

const defaultAdminProfile = {
  displayName: 'Chris Martin',
  email: 'chris.admin@gostudent.com',
  photoURL: 'https://i.pravatar.cc/150?img=52',
  phone: '+1 (555) 456-7890',
  location: 'Austin, TX',
  title: 'Platform Administrator',
  bio: 'Operations and platform management for GS Classroom. Ensuring smooth experience for all students and instructors. Always open to feedback!',
  department: 'Platform Operations',
  level: 'Super Admin',
  permissions: ['User Management', 'Class Moderation', 'Teacher Reviews', 'Billing Access', 'System Settings'],
  linkedin: 'linkedin.com/in/chrismartin',
  twitter: '@chrisadmin',
  website: 'gostudent.com/admin',
  joinedDate: '2023-01-10'
};

const AdminProfile = () => {
  const [profile, setProfile] = useLocalStorage('demo_admin_profile', defaultAdminProfile);
  const [isEditing, setIsEditing] = useLocalStorage('demo_admin_profile_editing', false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: profile });

  const onSubmit = (data) => {
    setProfile(data);
    setIsEditing(false);
    toast.success('Admin profile updated successfully!');
  };

  const handleCancel = () => {
    reset(profile);
    setIsEditing(false);
  };

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title="Admin Profile | Demo" />

      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">
            Admin Profile
          </h1>
          <p className="text-slate-500 mt-2">
            Manage platform administrator account settings.
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition shadow-md shadow-orange-500/20"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition shadow-md shadow-orange-500/20"
              form="admin-profile-form"
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
            <div className="h-28 bg-gradient-to-r from-orange-500 to-red-600" />
            <div className="px-6 pb-6 -mt-12">
              <div className="relative inline-block">
                <img
                  src={profile.photoURL}
                  alt={profile.displayName}
                  className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center border-4 border-white shadow-md">
                  <FaUserShield size={11} />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white flex items-center justify-center shadow-md hover:from-orange-600 hover:to-red-700 transition">
                    <FaEdit size={11} />
                  </button>
                )}
              </div>
              <h3 className="mt-4 text-xl font-bold text-secondary">{profile.displayName}</h3>
              <p className="text-orange-600 font-medium text-sm">{profile.title}</p>
              <p className="text-xs text-slate-400 mt-1">Admin since {profile.joinedDate}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full font-medium">
                <FaShieldAlt size={10} /> {profile.level}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-semibold text-secondary mb-4">Admin Stats</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Users Managed</span>
                <span className="font-bold text-secondary">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Classes Moderated</span>
                <span className="font-bold text-secondary">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Requests Reviewed</span>
                <span className="font-bold text-secondary">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Department</span>
                <span className="font-bold text-orange-600 text-xs">{profile.department}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-semibold text-secondary mb-4">Quick Links</h4>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-slate-600 hover:text-orange-600 transition group">
                <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-sky-100 flex items-center justify-center transition">
                  <FaLinkedin className="text-sky-500" />
                </div>
                <span className="text-sm truncate">{profile.linkedin}</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-slate-600 hover:text-orange-600 transition group">
                <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-sky-100 flex items-center justify-center transition">
                  <FaTwitter className="text-sky-400" />
                </div>
                <span className="text-sm truncate">{profile.twitter}</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-slate-600 hover:text-orange-600 transition group">
                <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-orange-100 flex items-center justify-center transition">
                  <FaGlobe className="text-orange-500" />
                </div>
                <span className="text-sm truncate">{profile.website}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <form id="admin-profile-form" onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">Admin Information</h2>
              <p className="text-sm text-slate-500">Update administrator account details.</p>
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
                    errors.displayName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
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
                    errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
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
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-orange-500 ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaMapMarkerAlt size={12} className="text-slate-400" /> Location
                </label>
                <input
                  {...register('location')}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-orange-500 ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  <FaBriefcase size={12} className="text-slate-400" /> Role Title
                </label>
                <input
                  {...register('title')}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-orange-500 ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                  🏢 Department
                </label>
                <input
                  {...register('department')}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-orange-500 ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 mb-1.5 block">About</label>
              <textarea
                {...register('bio')}
                disabled={!isEditing}
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition focus:border-orange-500 resize-none ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
              />
            </div>
          </form>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-secondary mb-2">Admin Permissions</h2>
            <p className="text-sm text-slate-500 mb-4">Granted access levels for this account.</p>
            <div className="flex flex-wrap gap-2">
              {profile.permissions.map(p => (
                <span
                  key={p}
                  className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium flex items-center gap-1.5 hover:bg-orange-200 transition cursor-default"
                >
                  <FaShieldAlt size={10} /> {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

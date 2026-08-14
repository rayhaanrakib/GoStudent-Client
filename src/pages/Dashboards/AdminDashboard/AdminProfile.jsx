import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaBriefcase,
  FaEdit, FaSave, FaLinkedin, FaTwitter, FaGlobe,
  FaShieldAlt, FaUserShield,
} from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useUserInfo from '../../../hooks/useUserInfo';

const AdminProfile = () => {
  const { user } = useAuth();
  const userInfo = useUserInfo();
  const admin = userInfo?.result;
  const [isEditing, setIsEditing] = useState(false);

  const defaultValues = {
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: admin?.phone || '',
    location: admin?.location || '',
    title: admin?.title || 'Platform Administrator',
    department: admin?.department || 'Platform Operations',
    bio: admin?.bio || 'Managing platform operations and ensuring smooth experience for all users.',
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues });

  const onSubmit = () => {
    setIsEditing(false);
    toast.success('Admin profile updated!');
  };

  const handleCancel = () => {
    reset(defaultValues);
    setIsEditing(false);
  };

  const permissions = admin?.permissions || [
    'User Management', 'Class Moderation', 'Teacher Reviews', 'System Settings',
  ];
  const joinedDate = admin?.createdAt ? new Date(admin.createdAt).toLocaleDateString() : '2024';

  return (
    <div className="py-6 px-4 sm:px-6 md:py-10 md:px-8">
      <Helmet title={`${user?.displayName} Profile | Admin | GS Classroom`} />

      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary">Admin Profile</h1>
          <p className="text-slate-500 mt-2">Manage platform administrator account settings.</p>
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
            <button onClick={handleCancel} className="px-5 py-2.5 bg-gray-100 text-slate-600 rounded-xl font-medium hover:bg-gray-200 transition">
              Cancel
            </button>
            <button
              form="admin-profile-form"
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition shadow-md shadow-orange-500/20"
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
            <div className="h-28 bg-gradient-to-r from-orange-500 to-red-600" />
            <div className="px-6 pb-6 -mt-12">
              <div className="relative inline-block">
                <img
                  src={user?.photoURL || 'https://i.pravatar.cc/150?img=10'}
                  alt={user?.displayName}
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
              <h3 className="mt-4 text-xl font-bold text-secondary">{user?.displayName}</h3>
              <p className="text-orange-600 font-medium text-sm">{admin?.title || 'Platform Administrator'}</p>
              <p className="text-xs text-slate-400 mt-1">Admin since {joinedDate}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full font-medium">
                <FaShieldAlt size={10} /> Super Admin
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-semibold text-secondary mb-4">Admin Details</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Role</span>
                <span className="font-bold text-secondary capitalize">{admin?.role || 'Admin'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Status</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Department</span>
                <span className="font-bold text-orange-600 text-xs">{admin?.department || 'Platform Ops'}</span>
              </div>
              {admin?.status === 'approved' && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Also</span>
                  <span className="font-bold text-primary text-xs">Instructor</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-semibold text-secondary mb-4">Quick Links</h4>
            <div className="space-y-3">
              {[
                { icon: FaLinkedin, label: 'LinkedIn', color: 'text-sky-500', bg: 'group-hover:bg-sky-100' },
                { icon: FaTwitter, label: 'Twitter', color: 'text-sky-400', bg: 'group-hover:bg-sky-100' },
                { icon: FaGlobe, label: 'Website', color: 'text-orange-500', bg: 'group-hover:bg-orange-100' },
              ].map(({ icon: Icon, label, color, bg }) => (
                <a key={label} href="#" className="flex items-center gap-3 text-slate-600 hover:text-orange-600 transition group">
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
          <form id="admin-profile-form" onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-secondary mb-2">Admin Information</h2>
              <p className="text-sm text-slate-500">Update administrator account details.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name: 'displayName', label: 'Full Name', icon: FaUser, rules: { required: 'Name is required' } },
                { name: 'email', label: 'Email', icon: FaEnvelope, rules: { required: 'Email is required' } },
                { name: 'phone', label: 'Phone', icon: FaPhone, rules: {} },
                { name: 'location', label: 'Location', icon: FaMapMarkerAlt, rules: {} },
                { name: 'title', label: 'Role Title', icon: FaBriefcase, rules: {} },
                { name: 'department', label: '🏢 Department', icon: null, rules: {} },
              ].map(({ name, label, icon: Icon, rules }) => (
                <div key={name}>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-1.5">
                    {Icon && <Icon size={12} className="text-slate-400" />} {label}
                  </label>
                  <input
                    {...register(name, rules)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                      errors[name] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
                    } ${!isEditing ? 'bg-gray-50 text-slate-500' : 'bg-white'}`}
                  />
                  {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name].message}</p>}
                </div>
              ))}
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
              {(Array.isArray(permissions) ? permissions : [permissions]).map((p) => (
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

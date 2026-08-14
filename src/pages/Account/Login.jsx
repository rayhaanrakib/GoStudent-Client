import React from 'react';
import toast from 'react-hot-toast';
import useAuth from './../../hooks/useAuth';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Login = () => {
    const axiosPublic = useAxiosPublic();
    const { login, continueWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const handleGoogle = e => {
        e.preventDefault();
        const role = "user";
        const category = "";
        const experience = "";
        const title = "";
        continueWithGoogle()
            .then(result => {
                const userInfo = {
                    displayName: result.user?.displayName,
                    photoURL: result.user?.photoURL,
                    email: result.user?.email,
                    role,
                    category,
                    experience,
                    title
                };
                axiosPublic.post('/api/v1/users', userInfo)
                    .then(res => {
                        toast.success("Successfully Registered")
                        navigate(location?.state ? location.state : '/#top')
                        window.location.reload();
                    })
            })
    }
    const onSubmit = data => {
        const email = data.email;
        const password = data.password;
        login(email, password)
            .then((res) => {
                toast.success("Successfully Logged In")
                navigate(location?.state ? location.state : '/#top')
                window.location.reload();
            })
            .catch((err) => {
                toast.error("Invalid Email/Password")
            })
    }


    return (
        <div data-aos="fade-up" className='container mx-auto'>
            <Helmet title={`Sign In | GS Classroom`} />
            <div class="flex overflow-hidden items-center gap-5">
                <div class="w-full md:w-1/2 py-12 px-4 sm:px-6 md:py-20 md:px-8">
                    <div class="mx-auto">
                        <h1 class="text-2xl max-w-md md:max-w-xl text-[#2e355a] font-bold md:text-2xl md:leading-tight lg:text-4xl lg:leading-tight">
                            Reconnect with Learning <span class="text-primary">Excellence</span>
                        </h1>
                        <p class="mt-3 text-sm lg:text-base text-slate-500">
                            Log in to Continue Your Skillful Journey and Explore a World of Knowledge at Your Fingertips.
                        </p>
                        <p class="mt-3 text-sm text-[#50577A]">
                            New to Go Student Classroom? <span className='font-semibold hover:text-primary'><NavLink to="/register">Sign Up Now</NavLink></span>
                        </p>


                        <div class="mt-8 grid">
                            <button onClick={handleGoogle} type="button" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-[#50577A] shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary transition-all text-sm sm:p-4">
                                <svg class="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                                    <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                                    <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                                    <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                                    <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                                </svg>
                                Sign in with Google
                            </button>
                        </div>
                        <div class="py-6 flex items-center text-[#50577A] uppercase before:flex-[1_1_0%] before:border-t before:mr-6 after:flex-[1_1_0%] after:border-t after:ml-6">Or</div>


                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="mb-4">
                                <input {...register("email", { required: true })} type="email" class="py-3 px-4 block w-full border outline-none rounded-md text-sm focus:ring-primary sm:p-4" placeholder="Email address" name='email' />
                                {errors.email && <span className='text-accent text-opacity-80 ml-2 text-sm'>Email address is required</span>}
                            </div>

                            <div class="mb-4">
                                <input {...register("password", { required: true, minLength: 6 })} type="password" class="py-3 px-4 block w-full border outline-none rounded-md text-sm focus:ring-primary sm:p-4" placeholder="Password" name='password' />
                                {errors.password?.type === 'required' && <span className='text-accent text-opacity-80 ml-2 text-sm'>Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className='text-accent text-opacity-80 ml-2 text-sm'>Password must be 6 characters</span>}
                            </div>

                            <div class="grid">
                                <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all text-sm sm:p-4">Sign In</button>
                            </div>
                        </form>

                        <div class="mt-5 grid">
                            <button
                                type="button"
                                onClick={() => {
                                    const adminEmail = 'chris.admin@gostudent.com';
                                    const adminPwd = 'admin123';
                                    toast.loading('Signing in as Admin...', { id: 'admin-login' });
                                    login(adminEmail, adminPwd)
                                        .then(() => {
                                            toast.dismiss('admin-login');
                                            toast.success('Welcome, Admin');
                                            navigate('/admin-dashboard');
                                            window.location.reload();
                                        })
                                        .catch(() => {
                                            toast.dismiss('admin-login');
                                            toast('Real admin not seeded — opening Demo Admin', { icon: '👤' });
                                            navigate('/demo/admin');
                                        });
                                }}
                                class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-dashed border-orange-300 font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-all text-sm sm:p-4"
                            >
                                Continue as Demo Admin
                            </button>
                        </div>

                    </div>
                </div>
                <div class="hidden w-1/2 rounded-xl md:block">
                    <img className='rounded-xl' src="https://i.ibb.co/BNsxgH4/signin.gif" />
                </div>

            </div>

        </div>
    );
};

export default Login;
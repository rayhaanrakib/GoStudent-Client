import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/MainLayout/Navbar';
import Footer from './../components/MainLayout/Footer';

// Page transition wrapper
const PageTransition = ({ children }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(false);
        const timer = setTimeout(() => setVisible(true), 50);
        return () => clearTimeout(timer);
    }, [children]);

    return (
        <div className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {children}
        </div>
    );
};

const Layout = () => {
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);

    // Check if current page is home (for transparent navbar)
    const isHome = location.pathname === '/';

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navbar - Fixed, transparent on home */}
            <Navbar isHome={isHome} />

            {/* Main Content - Add top padding to account for fixed navbar (except on home where banner is full-screen) */}
            <main className={`flex-1 ${isHome ? '' : 'pt-16 lg:pt-20'}`}>
                <PageTransition key={location.pathname}>
                    <Outlet />
                </PageTransition>
            </main>

            <Footer />

            {/* Toast Notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#0f172a',
                        color: '#f8fafc',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '500',
                    },
                    success: {
                        iconTheme: {
                            primary: '#7c3aed',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#e11d48',
                            secondary: '#fff',
                        },
                    },
                }}
            />
        </div>
    );
};

export default Layout;
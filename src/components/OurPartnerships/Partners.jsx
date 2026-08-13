import React from 'react';

const Partners = () => {
    const partners = [
        { name: "Google", logo: "https://i.ibb.co/x6MsHBb/reform-logo-gray-900.png" },
        { name: "Microsoft", logo: "https://i.ibb.co/KmwB9cH/savvycal-logo-gray-900.png" },
        { name: "Statamic", logo: "https://i.ibb.co/q1PtRDQ/statamic-logo-gray-900.png" },
        { name: "Transistor", logo: "https://i.ibb.co/Gcbh9Cx/transistor-logo-gray-900.png" },
        { name: "Tuple", logo: "https://i.ibb.co/wKXZGS0/tuple-logo-gray-900.png" },
    ];

    return (
        <div className='py-16 bg-slate-50'>
            <div className="container mx-auto px-6 lg:px-8">
                <p className="text-center text-sm font-semibold tracking-widest uppercase text-slate-400 mb-10">
                    Trusted by industry-leading companies worldwide
                </p>
                <div className="relative overflow-hidden">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10" />

                    <div className="flex items-center justify-center gap-12 md:gap-20 flex-wrap">
                        {partners.map((partner, i) => (
                            <div
                                key={i}
                                className="group flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500"
                            >
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-8 md:h-10 w-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Partners;
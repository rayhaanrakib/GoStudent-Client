import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const team = [
    {
        name: "John Carter",
        role: "Lead Developer",
        bio: "Full-stack engineer with 8+ years building scalable platforms. Passionate about clean code and great UX.",
        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
        gradient: "from-violet-500 to-purple-600",
    },
    {
        name: "Annisyah Lee",
        role: "Instructional Designer",
        bio: "Expert in crafting engaging course structures that maximize learner retention and satisfaction.",
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        gradient: "from-blue-500 to-cyan-600",
    },
    {
        name: "Sarah Johnson",
        role: "Community Manager",
        bio: "Dedicated to ensuring every learner feels supported and empowered throughout their journey.",
        img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
        gradient: "from-emerald-500 to-teal-600",
    },
    {
        name: "David Park",
        role: "Content Strategist",
        bio: "Shapes the educational narrative of GoStudent, ensuring our courses stay relevant and impactful.",
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        gradient: "from-orange-500 to-rose-600",
    },
];

const AboutUs = () => {
    return (
        <div className='py-24 bg-slate-950 relative overflow-hidden'>
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className='container mx-auto px-6 lg:px-8 relative z-10'>
                <div className="text-center mb-16">
                    <span className="inline-block text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4">
                        Our Team
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
                        Meet the Minds Behind
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                            GoStudent
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-lg mx-auto">
                        A passionate team of educators, developers, and innovators dedicated to transforming online learning.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, i) => (
                        <div
                            key={i}
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Top gradient line */}
                            <div className={`h-1 bg-gradient-to-r ${member.gradient}`} />

                            <div className="p-6">
                                {/* Image */}
                                <div className="relative mb-5">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity`} />
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="relative w-20 h-20 rounded-2xl object-cover"
                                    />
                                </div>

                                <h3 className="text-white font-bold text-lg">{member.name}</h3>
                                <p className={`text-sm font-medium mb-3 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                                    {member.role}
                                </p>
                                <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>

                                {/* Social Links */}
                                <div className="flex gap-3 mt-5 pt-5 border-t border-white/10">
                                    {[FaLinkedin, FaTwitter, FaGithub].map((Icon, j) => (
                                        <button
                                            key={j}
                                            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                                        >
                                            <Icon className="text-sm" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
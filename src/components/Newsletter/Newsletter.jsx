import React, { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) setSubmitted(true);
    };

    return (
        <section className='py-24 bg-slate-50'>
            <div className="container mx-auto px-6 lg:px-8">
                <div className="relative bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 rounded-3xl overflow-hidden p-12 lg:p-20">
                    {/* Background decoration */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto text-center">
                        <span className="inline-block text-violet-400 text-sm font-semibold tracking-widest uppercase mb-4">
                            Newsletter
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                            Stay Ahead of the
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                                Learning Curve
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                            Get curated course recommendations, exclusive discounts, and educational insights delivered straight to your inbox every week.
                        </p>

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder-slate-500 px-5 py-4 rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm"
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 whitespace-nowrap"
                                >
                                    Subscribe Free
                                </button>
                            </form>
                        ) : (
                            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 max-w-md mx-auto backdrop-blur-sm">
                                <span className="text-4xl block mb-3">🎉</span>
                                <p className="text-white font-bold text-xl mb-1">You're in!</p>
                                <p className="text-slate-400">Welcome to the GoStudent community. Check your inbox for a welcome gift!</p>
                            </div>
                        )}

                        <p className="text-slate-500 text-sm mt-4">
                            No spam ever. Unsubscribe anytime. 🔒
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-8 mt-10 pt-10 border-t border-white/10">
                            {[
                                { value: "50K+", label: "Subscribers" },
                                { value: "4.9★", label: "Avg. Rating" },
                                { value: "Weekly", label: "Frequency" },
                            ].map((s, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-white font-bold text-xl">{s.value}</p>
                                    <p className="text-slate-500 text-xs">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
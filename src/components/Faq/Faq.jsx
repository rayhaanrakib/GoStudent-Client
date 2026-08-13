import React, { useState } from 'react';

const faqs = [
    {
        q: "How can I enroll in a course on GoStudent Classroom?",
        a: "Enrolling is simple! Browse our course catalog, select the course you're interested in, and click 'Enroll' to begin your personalized learning journey instantly.",
    },
    {
        q: "What payment methods are accepted?",
        a: "We accept all major credit/debit cards, PayPal, and popular digital wallets, ensuring a convenient and fully secure checkout experience.",
    },
    {
        q: "Can I access course materials after completing a course?",
        a: "Absolutely! Once enrolled, you have lifetime access to all course materials — revisit lessons, download resources, and refresh your knowledge anytime.",
    },
    {
        q: "How do I contact customer support?",
        a: "Our support team is available 24/7. Use the 'Contact Us' page, live chat, or email us directly, and we'll respond promptly to resolve any issue.",
    },
    {
        q: "Is my payment information secure?",
        a: "Yes, we use industry-standard SSL encryption and never store your payment details on our servers. Your security is our highest priority.",
    },
];

const Faq = () => {
    const [open, setOpen] = useState(0);

    return (
        <div className='py-24 bg-white'>
            <div className="container mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left */}
                    <div className="lg:sticky lg:top-24">
                        <span className="inline-block text-violet-600 text-sm font-semibold tracking-widest uppercase mb-4">
                            FAQ
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                            Got Questions?
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
                                We've Got Answers.
                            </span>
                        </h2>
                        <p className="text-slate-500 leading-relaxed text-lg mb-8">
                            Can't find what you're looking for? Our support team is always here to help you.
                        </p>
                        <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl p-6 border border-violet-100">
                            <p className="text-slate-700 font-semibold mb-2">Still have questions?</p>
                            <p className="text-slate-500 text-sm mb-4">Our team responds within 24 hours.</p>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 text-sm"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>

                    {/* Right - Accordion */}
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                                    open === i
                                        ? 'border-violet-200 shadow-lg shadow-violet-500/10'
                                        : 'border-slate-200 hover:border-slate-300'
                                }`}
                            >
                                <button
                                    onClick={() => setOpen(open === i ? -1 : i)}
                                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                                >
                                    <span className={`font-semibold ${open === i ? 'text-violet-700' : 'text-slate-900'}`}>
                                        {faq.q}
                                    </span>
                                    <span className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        open === i ? 'bg-violet-600 text-white rotate-45' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </span>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                                    <p className="px-6 text-slate-500 leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;
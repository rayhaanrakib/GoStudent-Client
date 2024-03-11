import React from 'react';

const Newsletter = () => {
    return (
        <section>
            <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10" >
                <div className="bg-[#f2f2f7] p-8 text-center sm:p-10 md:p-16 rounded-md" >
                    <h2 className="mb-4 text-3xl font-bold md:text-5xl" > Join the GoStudent Community</h2>
                    <p className="mx-auto mb-6 max-w-2xl text-[#647084] md:mb-10">Our community is a vibrant hub where students, educators, and enthusiasts come together to share knowledge, insights, and experiences.</p>
                    <form name="email-form" method="get" className="relative mx-auto mb-4 flex w-full max-w-2xl flex-col items-start justify-center sm:flex-row rounded">
                        <input type="email" className="mb-3 mr-6 block h-9 w-full bg-white px-6 py-7 text-sm text-[#333333] focus:border-white rounded" placeholder="Enter your email" required="" />
                        <input type="submit" value="Subscribe" className="inline-block w-full rounded cursor-pointer bg-primary px-6 py-3 text-center font-semibold text-white transition [box-shadow:rgb(173,239,213)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px] sm:w-28" />
                    </form>
                </div >
            </div >
        </section >
    );
};

export default Newsletter;
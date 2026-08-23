import React from "react";

const About = () => {
    return (
        <section id="about" className="bg-[#F7F5EF] py-20 md:py-28">

            <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Image */}
                    <div className="relative">

                        <div className="absolute -top-5 -left-5 w-24 h-24 bg-[#E7E5DF] rounded-full"></div>

                        <div className="relative z-10 rounded-[35px] overflow-hidden">

                            <img
                                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=85"
                                alt="ZESTRO Restaurant"
                                className="w-full h-[420px] md:h-[500px] object-cover"
                            />

                        </div>

                        {/* Experience Card */}
                        <div className="absolute z-20 -bottom-6 right-5 md:right-8 bg-[#252525] text-white rounded-2xl px-6 py-5 shadow-xl">

                            <p className="text-3xl font-bold text-[#B8A77A]">
                                10+
                            </p>

                            <p className="text-sm text-gray-300 mt-1">
                                Signature Dishes
                            </p>

                        </div>

                    </div>


                    {/* Content */}
                    <div>

                        <p className="text-sm uppercase tracking-[0.3em] text-[#B8A77A] font-semibold">
                            About ZESTRO
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold text-[#252525] leading-tight mt-4">

                            Where Every
                            <br />

                            <span className="text-[#B8A77A]">
                                Bite Matters.
                            </span>

                        </h2>

                        <p className="text-[#6F6B62] leading-8 mt-6">
                            At ZESTRO, we believe that great food is more than
                            just a meal. It's about bringing people together,
                            creating memories, and enjoying flavors that stay
                            with you.
                        </p>

                        <p className="text-[#6F6B62] leading-8 mt-4">
                            From carefully selected ingredients to thoughtfully
                            prepared dishes, our team puts passion into every
                            plate we serve.
                        </p>


                        {/* Features */}
                        <div className="grid sm:grid-cols-2 gap-5 mt-8">

                            <div className="flex gap-3">

                                <div className="w-10 h-10 shrink-0 rounded-full bg-[#E7E5DF] flex items-center justify-center">
                                    🍃
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#252525]">
                                        Fresh Ingredients
                                    </h3>

                                    <p className="text-sm text-[#8C877C] mt-1">
                                        Quality ingredients every day.
                                    </p>
                                </div>

                            </div>


                            <div className="flex gap-3">

                                <div className="w-10 h-10 shrink-0 rounded-full bg-[#E7E5DF] flex items-center justify-center">
                                    ❤️
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#252525]">
                                        Made With Love
                                    </h3>

                                    <p className="text-sm text-[#8C877C] mt-1">
                                        Passion in every dish.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default About;
import React from "react";
import {
    FaLeaf,
    FaUtensils,
    FaHeart,
    FaClock,
    FaShieldAlt,
    FaStar,
} from "react-icons/fa";

const WhyChooseUs = () => {

    const features = [
        {
            icon: <FaLeaf />,
            title: "Fresh Ingredients",
            description:
                "We use carefully selected fresh ingredients to make every dish delicious and memorable.",
        },
        {
            icon: <FaUtensils />,
            title: "Expertly Prepared",
            description:
                "Every meal is prepared with attention to detail and a passion for great food.",
        },
        {
            icon: <FaHeart />,
            title: "Made With Love",
            description:
                "From our kitchen to your table, we put care and passion into everything we serve.",
        },
        {
            icon: <FaClock />,
            title: "Quick Service",
            description:
                "Our efficient ordering system helps you enjoy your favorite food without unnecessary waiting.",
        },
    ];

    return (
        <section className="bg-[#F1EFE8] py-20 md:py-28">

            <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">

                {/* ================= HEADING ================= */}
                <div className="text-center max-w-2xl mx-auto mb-14">

                    <p className="text-sm uppercase tracking-[0.3em] text-[#B8A77A] font-semibold">
                        Why ZESTRO
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#252525] mt-3">
                        Why Choose
                        <span className="text-[#B8A77A]"> Us?</span>
                    </h2>

                    <p className="text-[#6F6B62] mt-5 leading-7">
                        We care about every detail, from the ingredients we
                        choose to the experience we create for our customers.
                    </p>

                </div>


                {/* ================= FEATURES ================= */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    {features.map((feature, index) => (

                        <div
                            key={index}
                            className="group bg-[#F7F5EF] border border-[#DEDAD0] rounded-[28px] p-7 hover:bg-[#252525] hover:border-[#252525] hover:-translate-y-2 hover:shadow-xl transition-all duration-400"
                        >

                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl bg-[#E7E5DF] text-[#252525] flex items-center justify-center text-xl group-hover:bg-[#B8A77A] group-hover:text-white transition-all duration-300">

                                {feature.icon}

                            </div>


                            {/* Title */}
                            <h3 className="text-xl font-bold text-[#252525] mt-6 group-hover:text-white transition-colors duration-300">
                                {feature.title}
                            </h3>


                            {/* Description */}
                            <p className="text-sm text-[#6F6B62] leading-6 mt-3 group-hover:text-[#D8D5CC] transition-colors duration-300">
                                {feature.description}
                            </p>

                        </div>

                    ))}

                </div>


                {/* ================= BOTTOM TRUST AREA ================= */}
                <div className="mt-14 bg-[#252525] rounded-[30px] p-7 md:p-9">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-7">

                        {/* Rating */}
                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-full bg-[#B8A77A] text-white flex items-center justify-center">
                                <FaStar className="text-xl" />
                            </div>

                            <div>

                                <div className="flex items-center gap-1 text-[#B8A77A]">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div>

                                <p className="text-gray-300 text-sm mt-1">
                                    Trusted by our happy customers
                                </p>

                            </div>

                        </div>


                        {/* Trust */}
                        <div className="flex items-center gap-3 text-white">

                            <FaShieldAlt className="text-[#B8A77A] text-xl" />

                            <div>
                                <p className="font-semibold">
                                    Quality You Can Trust
                                </p>

                                <p className="text-sm text-gray-400 mt-1">
                                    Fresh food & friendly service
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default WhyChooseUs;
import React from "react";
import {
    FaHamburger,
    FaPizzaSlice,
    FaCoffee,
    FaIceCream,
    FaDrumstickBite,
    FaGlassMartiniAlt,
} from "react-icons/fa";

const Categories = () => {

    const categories = [
        {
            name: "Burger",
            icon: <FaHamburger />,
            description: "Juicy & delicious",
        },
        {
            name: "Pizza",
            icon: <FaPizzaSlice />,
            description: "Freshly baked",
        },
        {
            name: "Chicken",
            icon: <FaDrumstickBite />,
            description: "Crispy & tender",
        },
        {
            name: "Drinks",
            icon: <FaGlassMartiniAlt />,
            description: "Fresh & refreshing",
        },
        {
            name: "Coffee",
            icon: <FaCoffee />,
            description: "Rich & aromatic",
        },
        {
            name: "Desserts",
            icon: <FaIceCream />,
            description: "Sweet endings",
        },
    ];

    return (
        <section className="bg-[#F1EFE8] py-20 md:py-24">

            <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">

                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-12">

                    <p className="text-sm uppercase tracking-[0.3em] text-[#B8A77A] font-semibold">
                        Explore Our Menu
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-[#252525] mt-3">
                        What Are You
                        <span className="text-[#B8A77A]"> Craving?</span>
                    </h2>

                    <p className="text-[#6F6B62] mt-4 leading-7">
                        From delicious burgers to refreshing drinks,
                        discover something perfect for every craving.
                    </p>

                </div>


                {/* Categories */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">

                    {categories.map((category, index) => (

                        <div
                            key={index}
                            className="group bg-[#F7F5EF] border border-[#DEDAD0] rounded-3xl p-5 md:p-6 text-center cursor-pointer hover:bg-[#252525] hover:border-[#252525] hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                        >

                            {/* Icon */}
                            <div className="w-16 h-16 mx-auto rounded-full bg-[#E7E5DF] text-[#252525] flex items-center justify-center text-2xl group-hover:bg-[#B8A77A] group-hover:text-white transition-all duration-300">

                                {category.icon}

                            </div>


                            {/* Name */}
                            <h3 className="font-bold text-[#252525] text-lg mt-5 group-hover:text-white transition-colors duration-300">
                                {category.name}
                            </h3>


                            {/* Description */}
                            <p className="text-xs text-[#8C877C] mt-2 group-hover:text-[#D8D5CC] transition-colors duration-300">
                                {category.description}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default Categories;
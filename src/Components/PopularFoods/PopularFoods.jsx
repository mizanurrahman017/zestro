import React from "react";
import { Link } from "react-router";
import {
    FaStar,
    FaArrowRight,
    FaShoppingBag,
} from "react-icons/fa";

const PopularFoods = () => {

    const foods = [
        {
            name: "Classic Beef Burger",
            category: "Burger",
            price: "৳250",
            rating: "4.9",
            image:
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
        },
        {
            name: "Cheese Pizza",
            category: "Pizza",
            price: "৳450",
            rating: "4.8",
            image:
                "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
        },
        {
            name: "Creamy Pasta",
            category: "Pasta",
            price: "৳350",
            rating: "4.9",
            image:
                "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
        },
    ];

    return (
        <section className="bg-[#F7F5EF] py-20 md:py-28">

            <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">

                {/* ================= HEADING ================= */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">

                    <div>

                        <p className="text-sm uppercase tracking-[0.3em] text-[#B8A77A] font-semibold">
                            Customer Favorites
                        </p>

                        <h2 className="text-4xl md:text-5xl font-bold text-[#252525] mt-3">
                            Popular
                            <span className="text-[#B8A77A]"> Foods</span>
                        </h2>

                        <p className="text-[#6F6B62] mt-4 max-w-xl leading-7">
                            Discover some of our most loved dishes,
                            prepared fresh and served with care.
                        </p>

                    </div>


                    {/* View Menu */}
                    <Link
                        to="/menu"
                        className="inline-flex items-center gap-3 text-[#252525] font-semibold hover:text-[#B8A77A] transition-all duration-300"
                    >
                        View Full Menu
                        <FaArrowRight className="text-sm" />
                    </Link>

                </div>


                {/* ================= FOOD CARDS ================= */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

                    {foods.map((food, index) => (

                        <div
                            key={index}
                            className="group bg-white rounded-[30px] overflow-hidden border border-[#E0DDD4] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                        >

                            {/* Image */}
                            <div className="relative overflow-hidden">

                                <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Price */}
                                <div className="absolute top-4 right-4 bg-[#F7F5EF]/95 backdrop-blur-md px-4 py-2 rounded-full">
                                    <span className="font-bold text-[#252525]">
                                        {food.price}
                                    </span>
                                </div>

                            </div>


                            {/* Content */}
                            <div className="p-6">

                                {/* Category */}
                                <p className="text-xs uppercase tracking-[0.2em] text-[#B8A77A] font-semibold">
                                    {food.category}
                                </p>


                                {/* Name */}
                                <h3 className="text-xl font-bold text-[#252525] mt-2">
                                    {food.name}
                                </h3>


                                {/* Rating */}
                                <div className="flex items-center justify-between mt-4">

                                    <div className="flex items-center gap-1">

                                        <div className="flex gap-0.5 text-[#B8A77A]">

                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />

                                        </div>

                                        <span className="text-sm text-[#6F6B62] ml-2">
                                            {food.rating}
                                        </span>

                                    </div>


                                    {/* Order Button */}
                                    <Link
                                        to="/menu"
                                        className="w-11 h-11 rounded-full bg-[#252525] text-white flex items-center justify-center hover:bg-[#B8A77A] transition-all duration-300"
                                    >
                                        <FaShoppingBag className="text-sm" />
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>


                {/* Bottom Button */}
                <div className="text-center mt-12">

                    <Link
                        to="/menu"
                        className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#252525] text-white font-semibold hover:bg-[#B8A77A] transition-all duration-300"
                    >
                        Explore All Foods
                        <FaArrowRight className="text-sm" />
                    </Link>

                </div>

            </div>

        </section>
    );
};

export default PopularFoods;
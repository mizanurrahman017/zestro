import React, { useState } from "react";
import { FaSearch, FaStar, FaPlus, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router";

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");

    const categories = [
        "All",
        "Burger",
        "Pizza",
        "Chicken",
        "Pasta",
        "Drinks",
        "Desserts",
    ];

    // Demo Food Data
    // পরে Firebase থেকে আসবে
    const foods = [
        {
            id: 1,
            name: "Classic Beef Burger",
            category: "Burger",
            price: 250,
            rating: 4.9,
            image:
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 2,
            name: "Double Cheese Burger",
            category: "Burger",
            price: 320,
            rating: 4.8,
            image:
                "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 3,
            name: "Classic Cheese Pizza",
            category: "Pizza",
            price: 450,
            rating: 4.9,
            image:
                "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 4,
            name: "Chicken BBQ Pizza",
            category: "Pizza",
            price: 520,
            rating: 4.8,
            image:
                "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 5,
            name: "Crispy Fried Chicken",
            category: "Chicken",
            price: 280,
            rating: 4.9,
            image:
                "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 6,
            name: "Creamy Alfredo Pasta",
            category: "Pasta",
            price: 350,
            rating: 4.9,
            image:
                "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 7,
            name: "Fresh Lemonade",
            category: "Drinks",
            price: 120,
            rating: 4.7,
            image:
                "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=85",
        },
        {
            id: 8,
            name: "Chocolate Dessert",
            category: "Desserts",
            price: 180,
            rating: 4.8,
            image:
                "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85",
        },
    ];

    // Category + Search Filter
    const filteredFoods = foods.filter((food) => {
        const categoryMatch =
            activeCategory === "All" ||
            food.category === activeCategory;

        const searchMatch = food.name
            .toLowerCase()
            .includes(search.toLowerCase());

        return categoryMatch && searchMatch;
    });

    return (
        <div className="min-h-screen bg-[#F7F5EF]">

            {/* ================= HEADER ================= */}
            <section className="bg-[#E8E4D9] text-[#252525] border-b border-[#D8D3C6]">

                <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-20">

                    <div className="text-center">

                        {/* Small Title */}
                        <p className="text-[#9A8654] text-sm uppercase tracking-[0.3em] font-semibold">
                            ZESTRO Restaurant
                        </p>

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight text-[#252525]">
                            Our Menu
                        </h1>

                        {/* Description */}
                        <p className="text-[#6F6B62] max-w-xl mx-auto mt-5 leading-7">
                            Explore our delicious selection of freshly
                            prepared food and discover your next favorite dish.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= MENU CONTENT ================= */}
            <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">


                {/* ================= SEARCH ================= */}
                <div className="max-w-xl mx-auto relative">

                    <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8C877C]" />

                    <input
                        type="text"
                        placeholder="Search your favorite food..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
                            w-full
                            bg-white
                            border
                            border-[#DEDAD0]
                            rounded-full
                            py-4
                            pl-12
                            pr-5
                            outline-none
                            text-[#252525]
                            placeholder:text-[#9A968C]
                            focus:border-[#9A8654]
                            focus:ring-1
                            focus:ring-[#9A8654]
                            transition
                        "
                    />

                </div>


                {/* ================= CATEGORIES ================= */}
                <div className="flex gap-3 overflow-x-auto py-8 scrollbar-hide justify-start md:justify-center">

                    {categories.map((category) => (

                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`
                                whitespace-nowrap
                                px-5
                                py-2.5
                                rounded-full
                                text-sm
                                font-semibold
                                transition-all
                                duration-300
                                ${
                                    activeCategory === category
                                        ? "bg-[#252525] text-white shadow-md"
                                        : "bg-white text-[#5F5B53] border border-[#DEDAD0] hover:bg-[#E8E4D9] hover:border-[#CFC9BA]"
                                }
                            `}
                        >
                            {category}
                        </button>

                    ))}

                </div>


                {/* ================= RESULT INFO ================= */}
                <div className="flex items-center justify-between mb-7">

                    <div>

                        <h2 className="text-2xl font-bold text-[#252525]">
                            {activeCategory === "All"
                                ? "All Foods"
                                : activeCategory}
                        </h2>

                        <p className="text-sm text-[#8C877C] mt-1">
                            {filteredFoods.length} items available
                        </p>

                    </div>


                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="
                            w-11
                            h-11
                            rounded-full
                            bg-[#252525]
                            text-white
                            flex
                            items-center
                            justify-center
                            hover:bg-[#9A8654]
                            transition
                        "
                    >
                        <FaShoppingCart />
                    </Link>

                </div>


                {/* ================= FOOD GRID ================= */}
                {filteredFoods.length > 0 ? (

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                        {filteredFoods.map((food) => (

                            <div
                                key={food.id}
                                className="
                                    group
                                    bg-white
                                    rounded-[28px]
                                    overflow-hidden
                                    border
                                    border-[#E0DDD4]
                                    hover:shadow-xl
                                    hover:-translate-y-1
                                    transition-all
                                    duration-300
                                "
                            >

                                {/* ================= FOOD IMAGE ================= */}
                                <div className="relative overflow-hidden">

                                    <img
                                        src={food.image}
                                        alt={food.name}
                                        className="
                                            w-full
                                            h-56
                                            object-cover
                                            group-hover:scale-105
                                            transition-transform
                                            duration-500
                                        "
                                    />


                                    {/* Price */}
                                    <div
                                        className="
                                            absolute
                                            top-4
                                            right-4
                                            bg-[#F7F5EF]/95
                                            backdrop-blur-sm
                                            px-4
                                            py-2
                                            rounded-full
                                            shadow-sm
                                        "
                                    >

                                        <span className="font-bold text-[#252525]">
                                            ৳{food.price}
                                        </span>

                                    </div>

                                </div>


                                {/* ================= CARD CONTENT ================= */}
                                <div className="p-5">

                                    {/* Category */}
                                    <p className="text-xs uppercase tracking-[0.2em] text-[#9A8654] font-semibold">
                                        {food.category}
                                    </p>


                                    {/* Food Name */}
                                    <h3 className="text-lg font-bold text-[#252525] mt-2 line-clamp-1">
                                        {food.name}
                                    </h3>


                                    {/* ================= RATING ================= */}
                                    <div className="flex items-center gap-1 mt-3">

                                        <div className="flex gap-0.5 text-[#B8A77A]">

                                            <FaStar className="text-xs" />
                                            <FaStar className="text-xs" />
                                            <FaStar className="text-xs" />
                                            <FaStar className="text-xs" />
                                            <FaStar className="text-xs" />

                                        </div>

                                        <span className="text-xs text-[#8C877C] ml-1">
                                            {food.rating}
                                        </span>

                                    </div>


                                    {/* ================= ADD TO CART ================= */}
                                    <button
                                        className="
                                            w-full
                                            mt-5
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            bg-[#252525]
                                            text-white
                                            py-3
                                            rounded-xl
                                            font-semibold
                                            hover:bg-[#9A8654]
                                            transition-all
                                            duration-300
                                        "
                                    >
                                        <FaPlus className="text-xs" />

                                        Add to Cart
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    /* ================= NO RESULT ================= */
                    <div className="text-center py-20">

                        <div className="text-5xl mb-5">
                            🍽️
                        </div>

                        <h3 className="text-2xl font-bold text-[#252525]">
                            No food found
                        </h3>

                        <p className="text-[#8C877C] mt-2">
                            Try another food name or category.
                        </p>

                    </div>

                )}

            </section>

        </div>
    );
};

export default Menu;
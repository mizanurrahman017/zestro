import React, { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import { FaSearch, FaStar, FaPlus, FaShoppingCart } from "react-icons/fa";
import { Link, useParams } from "react-router";

import { db } from "../../../Firebase/Firebase.init";

const Menu = () => {

    const { restaurantId, tableId } = useParams();

    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");

    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const categories = [
        "All",
        "Burger",
        "Pizza",
        "Chicken",
        "Pasta",
        "Drinks",
        "Desserts",
    ];

    // ==========================================
    // LOAD FOODS FROM FIREBASE
    // ==========================================

    useEffect(() => {

        const loadFoods = async () => {

            try {

                setLoading(true);
                setError("");

                if (!restaurantId) {
                    setError("Restaurant ID not found.");
                    return;
                }

                const foodsQuery = query(
                    collection(db, "foods"),
                    where("restaurantId", "==", restaurantId),
                    where("available", "==", true)
                );

                const foodsSnapshot = await getDocs(foodsQuery);

                const foodList = foodsSnapshot.docs.map((food) => ({
                    id: food.id,
                    ...food.data(),
                }));

                setFoods(foodList);

            } catch (error) {

                console.error("Food loading error:", error);

                setError("Failed to load foods.");

            } finally {

                setLoading(false);

            }
        };

        loadFoods();

    }, [restaurantId]);


    // ==========================================
    // CATEGORY + SEARCH FILTER
    // ==========================================

    const filteredFoods = foods.filter((food) => {

        const categoryMatch =
            activeCategory === "All" ||
            food.category === activeCategory;

        const searchMatch =
            food.name
                ?.toLowerCase()
                .includes(search.toLowerCase());

        return categoryMatch && searchMatch;
    });


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center">

                <div className="text-center">

                    <span className="loading loading-spinner loading-lg text-[#9A8654]"></span>

                    <p className="mt-4 text-[#6F6B62]">
                        Loading menu...
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // MAIN UI
    // ==========================================

    return (

        <div className="min-h-screen bg-[#F7F5EF]">


            {/* ==================================
                HEADER
            ================================== */}

            <section className="bg-[#E8E4D9] text-[#252525] border-b border-[#D8D3C6]">

                <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-20">

                    <div className="text-center">

                        <p className="text-[#9A8654] text-sm uppercase tracking-[0.3em] font-semibold">
                            ZESTRO Restaurant
                        </p>

                        <h1 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight text-[#252525]">
                            Our Menu
                        </h1>

                        <p className="text-[#6F6B62] max-w-xl mx-auto mt-5 leading-7">
                            Explore our delicious selection of freshly
                            prepared food and discover your next favorite dish.
                        </p>

                        {/* Table Information */}

                        {tableId && (
                            <p className="mt-5 text-sm text-[#9A8654] font-semibold">
                                Table: {tableId}
                            </p>
                        )}

                    </div>

                </div>

            </section>



            {/* ==================================
                MENU CONTENT
            ================================== */}

            <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">


                {/* ==================================
                    ERROR
                ================================== */}

                {error && (

                    <div className="max-w-xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl text-center">

                        {error}

                    </div>

                )}



                {/* ==================================
                    SEARCH
                ================================== */}

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



                {/* ==================================
                    CATEGORIES
                ================================== */}

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
                                ${activeCategory === category
                                    ? "bg-[#252525] text-white shadow-md"
                                    : "bg-white text-[#5F5B53] border border-[#DEDAD0] hover:bg-[#E8E4D9] hover:border-[#CFC9BA]"
                                }
                            `}
                        >
                            {category}
                        </button>

                    ))}

                </div>



                {/* ==================================
                    RESULT INFO
                ================================== */}

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



                {/* ==================================
                    FOOD GRID
                ================================== */}

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


                                {/* ================= IMAGE ================= */}

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



                                    {/* Description */}

                                    <p className="text-sm text-[#8C877C] mt-2 line-clamp-2">

                                        {food.description}

                                    </p>



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

                                            {food.rating || 5}

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
                            No foods have been added to this restaurant yet.
                        </p>

                    </div>

                )}

            </section>

        </div>
    );
};

export default Menu;
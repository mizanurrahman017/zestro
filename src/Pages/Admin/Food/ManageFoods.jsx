import React, { useEffect, useState } from "react";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    getDoc,
    serverTimestamp,
    query,
    where,
} from "firebase/firestore";

import { FaPlus, FaTrash, FaUtensils } from "react-icons/fa";

import { db, auth } from "../../../Firebase/Firebase.init";

const ManageFoods = () => {
    const [foods, setFoods] = useState([]);
    const [restaurantId, setRestaurantId] = useState("");

    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        category: "Burger",
        price: "",
        image: "",
        description: "",
    });

    const categories = [
        "Burger",
        "Pizza",
        "Chicken",
        "Pasta",
        "Drinks",
        "Desserts",
    ];

    // ==========================================
    // GET RESTAURANT ID + FOODS
    // ==========================================

    useEffect(() => {
        const loadRestaurantData = async () => {
            try {
                setLoading(true);

                const user = auth.currentUser;

                if (!user) {
                    setError("You are not logged in.");
                    return;
                }

                // Get user document
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    setError("User information not found.");
                    return;
                }

                const userData = userSnap.data();

                // Get restaurant ID
                const currentRestaurantId = userData.restaurantId;

                if (!currentRestaurantId) {
                    setError("Restaurant information not found.");
                    return;
                }

                setRestaurantId(currentRestaurantId);

                // Get foods of this restaurant
                const foodsQuery = query(
                    collection(db, "foods"),
                    where("restaurantId", "==", currentRestaurantId)
                );

                const foodsSnap = await getDocs(foodsQuery);

                const foodList = foodsSnap.docs.map((food) => ({
                    id: food.id,
                    ...food.data(),
                }));

                setFoods(foodList);
            } catch (error) {
                console.error(error);
                setError("Failed to load foods.");
            } finally {
                setLoading(false);
            }
        };

        loadRestaurantData();
    }, []);

    // ==========================================
    // INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================
    // ADD FOOD
    // ==========================================

    const handleAddFood = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!restaurantId) {
            setError("Restaurant ID not found.");
            return;
        }

        try {
            setAdding(true);

            const foodData = {
                restaurantId: restaurantId,

                name: formData.name.trim(),

                category: formData.category,

                price: Number(formData.price),

                image: formData.image.trim(),

                description: formData.description.trim(),

                available: true,

                rating: 5,

                createdAt: serverTimestamp(),
            };

            // Add to Firestore
            const foodRef = await addDoc(
                collection(db, "foods"),
                foodData
            );

            // Add immediately to UI
            setFoods((prev) => [
                ...prev,
                {
                    id: foodRef.id,
                    ...foodData,
                },
            ]);

            // Reset form
            setFormData({
                name: "",
                category: "Burger",
                price: "",
                image: "",
                description: "",
            });

            setSuccess("Food added successfully!");
        } catch (error) {
            console.error(error);
            setError("Failed to add food.");
        } finally {
            setAdding(false);
        }
    };

    // ==========================================
    // DELETE FOOD
    // ==========================================

    const handleDeleteFood = async (foodId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this food?"
        );

        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, "foods", foodId));

            setFoods((prev) =>
                prev.filter((food) => food.id !== foodId)
            );

            setSuccess("Food deleted successfully!");
        } catch (error) {
            console.error(error);
            setError("Failed to delete food.");
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-[#252525]"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F5EF] p-5 md:p-8 lg:p-10">

            <div className="max-w-7xl mx-auto">

                {/* ==================================
                    HEADER
                ================================== */}

                <div className="mb-8">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-2xl bg-[#252525] text-white flex items-center justify-center">
                            <FaUtensils />
                        </div>

                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#252525]">
                                Manage Foods
                            </h1>

                            <p className="mt-1 text-[#6F6B62]">
                                Add and manage your restaurant foods.
                            </p>
                        </div>

                    </div>

                </div>


                {/* ==================================
                    SUCCESS
                ================================== */}

                {success && (
                    <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-xl">
                        {success}
                    </div>
                )}


                {/* ==================================
                    ERROR
                ================================== */}

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-xl">
                        {error}
                    </div>
                )}


                {/* ==================================
                    ADD FOOD FORM
                ================================== */}

                <div className="bg-white border border-[#E0DDD4] rounded-3xl shadow-sm p-6 md:p-8 mb-10">

                    <div className="flex items-center gap-3 mb-6">

                        <div className="w-10 h-10 rounded-xl bg-[#E8E4D9] flex items-center justify-center text-[#9A8654]">
                            <FaPlus />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#252525]">
                                Add New Food
                            </h2>

                            <p className="text-sm text-[#8C877C]">
                                Add a new item to your restaurant menu.
                            </p>
                        </div>

                    </div>


                    <form
                        onSubmit={handleAddFood}
                        className="grid md:grid-cols-2 gap-5"
                    >

                        {/* Food Name */}
                        <div>
                            <label className="block text-sm font-semibold text-[#252525] mb-2">
                                Food Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Example: Classic Beef Burger"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[#D8D4CA] bg-[#FAF9F5] outline-none focus:border-[#9A8654]"
                            />
                        </div>


                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-[#252525] mb-2">
                                Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-[#D8D4CA] bg-[#FAF9F5] outline-none focus:border-[#9A8654]"
                            >
                                {categories.map((category) => (
                                    <option
                                        key={category}
                                        value={category}
                                    >
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* Price */}
                        <div>
                            <label className="block text-sm font-semibold text-[#252525] mb-2">
                                Price (৳)
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="250"
                                min="1"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[#D8D4CA] bg-[#FAF9F5] outline-none focus:border-[#9A8654]"
                            />
                        </div>


                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-semibold text-[#252525] mb-2">
                                Food Image URL
                            </label>

                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/food.jpg"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[#D8D4CA] bg-[#FAF9F5] outline-none focus:border-[#9A8654]"
                            />
                        </div>


                        {/* Description */}
                        <div className="md:col-span-2">

                            <label className="block text-sm font-semibold text-[#252525] mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your food..."
                                rows="4"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[#D8D4CA] bg-[#FAF9F5] outline-none focus:border-[#9A8654] resize-none"
                            />

                        </div>


                        {/* Submit */}
                        <div className="md:col-span-2">

                            <button
                                type="submit"
                                disabled={adding}
                                className="
                                    w-full
                                    md:w-auto
                                    px-8
                                    py-3.5
                                    rounded-xl
                                    bg-[#252525]
                                    text-white
                                    font-semibold
                                    hover:bg-[#9A8654]
                                    transition
                                    disabled:opacity-60
                                    disabled:cursor-not-allowed
                                "
                            >
                                {adding ? (
                                    "Adding Food..."
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <FaPlus />
                                        Add Food
                                    </span>
                                )}
                            </button>

                        </div>

                    </form>

                </div>


                {/* ==================================
                    FOOD LIST
                ================================== */}

                <div>

                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <h2 className="text-2xl font-bold text-[#252525]">
                                Your Foods
                            </h2>

                            <p className="text-sm text-[#8C877C] mt-1">
                                {foods.length} food
                                {foods.length !== 1 ? "s" : ""} available
                            </p>
                        </div>

                    </div>


                    {/* No Foods */}
                    {foods.length === 0 ? (

                        <div className="bg-white border border-[#E0DDD4] rounded-3xl p-12 text-center">

                            <div className="text-5xl mb-4">
                                🍽️
                            </div>

                            <h3 className="text-xl font-bold text-[#252525]">
                                No foods added yet
                            </h3>

                            <p className="text-[#8C877C] mt-2">
                                Add your first food using the form above.
                            </p>

                        </div>

                    ) : (

                        /* Food Grid */
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                            {foods.map((food) => (

                                <div
                                    key={food.id}
                                    className="bg-white rounded-3xl overflow-hidden border border-[#E0DDD4] shadow-sm hover:shadow-xl transition-all duration-300"
                                >

                                    {/* Image */}
                                    <div className="relative">

                                        <img
                                            src={food.image}
                                            alt={food.name}
                                            className="w-full h-52 object-cover"
                                        />

                                        <span className="absolute top-4 left-4 bg-[#F7F5EF]/95 px-3 py-1.5 rounded-full text-xs font-semibold text-[#9A8654]">
                                            {food.category}
                                        </span>

                                    </div>


                                    {/* Content */}
                                    <div className="p-5">

                                        <h3 className="text-lg font-bold text-[#252525]">
                                            {food.name}
                                        </h3>

                                        <p className="text-sm text-[#8C877C] mt-2 line-clamp-2">
                                            {food.description}
                                        </p>


                                        <div className="flex items-center justify-between mt-5">

                                            <span className="text-xl font-bold text-[#252525]">
                                                ৳{food.price}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    handleDeleteFood(food.id)
                                                }
                                                className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                                                title="Delete food"
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default ManageFoods;
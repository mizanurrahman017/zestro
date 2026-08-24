import React, { useContext } from "react";
import {
    FaMinus,
    FaPlus,
    FaTrash,
    FaShoppingBag,
    FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router";

import CartContext from "../../../Contexts/CartContext/CartContext";

const Cart = () => {

    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartTotal,
    } = useContext(CartContext);


    // ==========================================
    // EMPTY CART
    // ==========================================

    if (cartItems.length === 0) {

        return (
            <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center px-5">

                <div className="text-center max-w-md">

                    <div className="w-24 h-24 mx-auto rounded-full bg-[#E8E4D9] flex items-center justify-center text-[#9A8654] text-4xl mb-6">
                        <FaShoppingBag />
                    </div>

                    <h1 className="text-3xl font-bold text-[#252525]">
                        Your Cart is Empty
                    </h1>

                    <p className="text-[#6F6B62] mt-3 leading-7">
                        You haven't added any food to your cart yet.
                        Explore our delicious menu and add your favorite food.
                    </p>

                    <Link
                        to="/"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            mt-7
                            px-7
                            py-3.5
                            rounded-xl
                            bg-[#252525]
                            text-white
                            font-semibold
                            hover:bg-[#9A8654]
                            transition
                        "
                    >
                        <FaArrowLeft className="text-sm" />
                        Back to Home
                    </Link>

                </div>

            </div>
        );
    }


    // ==========================================
    // CART PAGE
    // ==========================================

    return (

        <div className="min-h-screen bg-[#F7F5EF] py-10 md:py-14">

            <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="mb-10">

                    <p className="text-[#9A8654] text-sm uppercase tracking-[0.3em] font-semibold">
                        ZESTRO Restaurant
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold text-[#252525] mt-3">
                        Your Cart
                    </h1>

                    <p className="text-[#6F6B62] mt-3">
                        Review your selected food before placing your order.
                    </p>

                </div>



                {/* ==================================
                    CART LAYOUT
                ================================== */}

                <div className="grid lg:grid-cols-3 gap-8">


                    {/* ==================================
                        CART ITEMS
                    ================================== */}

                    <div className="lg:col-span-2 space-y-5">

                        {cartItems.map((item) => (

                            <div
                                key={item.id}
                                className="
                                    bg-white
                                    border
                                    border-[#E0DDD4]
                                    rounded-3xl
                                    p-4
                                    md:p-5
                                    shadow-sm
                                "
                            >

                                <div className="flex gap-4">


                                    {/* ================= IMAGE ================= */}

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="
                                            w-24
                                            h-24
                                            md:w-32
                                            md:h-32
                                            rounded-2xl
                                            object-cover
                                            flex-shrink-0
                                        "
                                    />



                                    {/* ================= FOOD INFO ================= */}

                                    <div className="flex-1 min-w-0">

                                        <div className="flex justify-between gap-3">

                                            <div>

                                                <p className="text-xs uppercase tracking-[0.2em] text-[#9A8654] font-semibold">
                                                    {item.category}
                                                </p>

                                                <h2 className="text-lg md:text-xl font-bold text-[#252525] mt-1">
                                                    {item.name}
                                                </h2>

                                            </div>


                                            {/* DELETE */}

                                            <button
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                                className="
                                                    w-9
                                                    h-9
                                                    rounded-xl
                                                    bg-red-50
                                                    text-red-500
                                                    flex
                                                    items-center
                                                    justify-center
                                                    hover:bg-red-500
                                                    hover:text-white
                                                    transition
                                                "
                                                title="Remove"
                                            >
                                                <FaTrash className="text-sm" />
                                            </button>

                                        </div>



                                        {/* PRICE */}

                                        <p className="text-lg font-bold text-[#252525] mt-3">
                                            ৳{item.price}
                                        </p>



                                        {/* QUANTITY */}

                                        <div className="flex items-center justify-between mt-4">


                                            <div className="flex items-center gap-2">

                                                {/* MINUS */}

                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(item.id)
                                                    }
                                                    className="
                                                        w-9
                                                        h-9
                                                        rounded-xl
                                                        bg-[#E8E4D9]
                                                        text-[#252525]
                                                        flex
                                                        items-center
                                                        justify-center
                                                        hover:bg-[#D8D3C6]
                                                        transition
                                                    "
                                                >
                                                    <FaMinus className="text-xs" />
                                                </button>


                                                {/* QUANTITY */}

                                                <span className="w-10 text-center font-bold text-[#252525]">
                                                    {item.quantity}
                                                </span>


                                                {/* PLUS */}

                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(item.id)
                                                    }
                                                    className="
                                                        w-9
                                                        h-9
                                                        rounded-xl
                                                        bg-[#252525]
                                                        text-white
                                                        flex
                                                        items-center
                                                        justify-center
                                                        hover:bg-[#9A8654]
                                                        transition
                                                    "
                                                >
                                                    <FaPlus className="text-xs" />
                                                </button>

                                            </div>



                                            {/* ITEM TOTAL */}

                                            <p className="font-bold text-[#252525]">

                                                ৳{item.price * item.quantity}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>



                    {/* ==================================
                        ORDER SUMMARY
                    ================================== */}

                    <div>

                        <div
                            className="
                                bg-white
                                border
                                border-[#E0DDD4]
                                rounded-3xl
                                p-6
                                md:p-7
                                shadow-sm
                                lg:sticky
                                lg:top-24
                            "
                        >

                            <h2 className="text-2xl font-bold text-[#252525]">
                                Order Summary
                            </h2>


                            <div className="border-t border-[#E0DDD4] my-6"></div>


                            {/* ITEMS */}

                            <div className="flex justify-between text-[#6F6B62]">

                                <span>
                                    Items
                                </span>

                                <span>
                                    {cartItems.reduce(
                                        (total, item) =>
                                            total + item.quantity,
                                        0
                                    )}
                                </span>

                            </div>


                            {/* SUBTOTAL */}

                            <div className="flex justify-between mt-4 text-[#6F6B62]">

                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    ৳{cartTotal}
                                </span>

                            </div>


                            {/* SERVICE */}

                            <div className="flex justify-between mt-4 text-[#6F6B62]">

                                <span>
                                    Service Charge
                                </span>

                                <span>
                                    ৳0
                                </span>

                            </div>


                            <div className="border-t border-[#E0DDD4] my-6"></div>


                            {/* TOTAL */}

                            <div className="flex justify-between items-center">

                                <span className="text-lg font-bold text-[#252525]">
                                    Total
                                </span>

                                <span className="text-2xl font-bold text-[#9A8654]">
                                    ৳{cartTotal}
                                </span>

                            </div>


                            {/* CHECKOUT */}

                            <button
                                className="
                                    w-full
                                    mt-7
                                    py-4
                                    rounded-xl
                                    bg-[#252525]
                                    text-white
                                    font-semibold
                                    hover:bg-[#9A8654]
                                    transition-all
                                    duration-300
                                "
                            >
                                Place Order
                            </button>


                            {/* CONTINUE SHOPPING */}

                            <Link
                                to="/"
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    mt-4
                                    py-3
                                    rounded-xl
                                    border
                                    border-[#D8D3C6]
                                    text-[#252525]
                                    font-semibold
                                    hover:bg-[#E8E4D9]
                                    transition
                                "
                            >
                                <FaArrowLeft className="text-xs" />
                                Continue Shopping
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Cart;
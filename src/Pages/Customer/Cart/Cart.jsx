import React, { useContext, useEffect, useState } from "react";

import {
    FaMinus,
    FaPlus,
    FaTrash,
    FaShoppingBag,
    FaArrowLeft,
    FaUser,
    FaChair,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router";

import {
    addDoc,
    collection,
    serverTimestamp,
} from "firebase/firestore";

import CartContext from "../../../Contexts/CartContext/CartContext";

import { db } from "../../../Firebase/Firebase.init";

const Cart = () => {

    // ==========================================
    // CART CONTEXT
    // ==========================================

    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartTotal,
    } = useContext(CartContext);


    // ==========================================
    // NAVIGATE
    // ==========================================

    const navigate = useNavigate();


    // ==========================================
    // STATES
    // ==========================================

    const [placingOrder, setPlacingOrder] = useState(false);

    const [orderError, setOrderError] = useState("");

    const [customerName, setCustomerName] = useState("");


    // ==========================================
    // LOAD CUSTOMER NAME
    // ==========================================

    useEffect(() => {

        const savedCustomerName =
            localStorage.getItem(
                "zestro_customer_name"
            );

        if (savedCustomerName) {
            setCustomerName(
                savedCustomerName
            );
        }

    }, []);


    // ==========================================
    // GET GUEST CUSTOMER ID
    // ==========================================

    const getCustomerId = () => {

        let customerId =
            localStorage.getItem(
                "zestro_customer_id"
            );


        if (!customerId) {

            customerId =
                "customer_" +
                Date.now() +
                "_" +
                Math.random()
                    .toString(36)
                    .substring(2, 12);


            localStorage.setItem(
                "zestro_customer_id",
                customerId
            );

        }


        return customerId;

    };


    // ==========================================
    // SAVE ORDER ID TO LOCAL STORAGE
    // ==========================================

    const saveOrderToHistory = (
        orderId
    ) => {

        try {

            const existingOrders =
                JSON.parse(
                    localStorage.getItem(
                        "zestro_order_history"
                    ) || "[]"
                );


            const updatedOrders = [
                orderId,

                ...existingOrders.filter(
                    (id) =>
                        id !== orderId
                ),
            ];


            localStorage.setItem(
                "zestro_order_history",
                JSON.stringify(
                    updatedOrders
                )
            );

        } catch (error) {

            console.error(
                "Failed to save order history:",
                error
            );

        }

    };


    // ==========================================
    // PLACE ORDER
    // ==========================================

    const handlePlaceOrder = async () => {

        if (placingOrder) {
            return;
        }


        try {

            setPlacingOrder(true);

            setOrderError("");


            // ==================================
            // CART CHECK
            // ==================================

            if (
                !cartItems ||
                cartItems.length === 0
            ) {

                setOrderError(
                    "Your cart is empty."
                );

                setPlacingOrder(false);

                return;

            }


            // ==================================
            // CUSTOMER NAME CHECK
            // ==================================

            const trimmedName =
                customerName.trim();


            if (!trimmedName) {

                setOrderError(
                    "Please enter your name before placing the order."
                );

                setPlacingOrder(false);

                return;

            }


            // ==================================
            // CUSTOMER NAME SAVE
            // ==================================

            localStorage.setItem(
                "zestro_customer_name",
                trimmedName
            );


            // ==================================
            // CUSTOMER ID
            // ==================================

            const customerId =
                getCustomerId();


            // ==================================
            // RESTAURANT ID
            // ==================================

            const restaurantId =
                cartItems[0]?.restaurantId ||
                null;


            if (!restaurantId) {

                setOrderError(
                    "Restaurant information is missing."
                );

                setPlacingOrder(false);

                return;

            }


            // ==================================
            // TABLE ID
            // ==================================

            const tableId =
                cartItems[0]?.tableId ||
                null;


            // ==================================
            // TABLE NUMBER
            // ==========================================

            const tableNumber =
                cartItems[0]?.tableNumber ||
                cartItems[0]?.tableId ||
                null;


            // ==================================
            // TABLE CHECK
            // ==========================================

            if (!tableId) {

                setOrderError(
                    "Table information is missing. Please scan the table QR code again."
                );

                setPlacingOrder(false);

                return;

            }


            // ==================================
            // ORDER ITEMS
            // ==================================

            const orderItems =
                cartItems.map(
                    (item) => ({

                        foodId:
                            item.id,

                        name:
                            item.name,

                        category:
                            item.category || "",

                        price:
                            Number(
                                item.price || 0
                            ),

                        quantity:
                            Number(
                                item.quantity || 0
                            ),

                        image:
                            item.image || "",

                        subtotal:
                            Number(
                                item.price || 0
                            ) *
                            Number(
                                item.quantity || 0
                            ),

                    })
                );


            // ==================================
            // ORDER DATA
            // ==================================

            const orderData = {

                // --------------------------------
                // CUSTOMER
                // --------------------------------

                customerId:
                    customerId,

                customerName:
                    trimmedName,

                customerEmail:
                    "",


                // --------------------------------
                // RESTAURANT
                // --------------------------------

                restaurantId:
                    restaurantId,


                // --------------------------------
                // TABLE
                // --------------------------------

                tableId:
                    tableId,

                tableNumber:
                    tableNumber,


                // --------------------------------
                // ITEMS
                // --------------------------------

                items:
                    orderItems,


                // --------------------------------
                // AMOUNT
                // --------------------------------

                totalAmount:
                    Number(
                        cartTotal || 0
                    ),


                // --------------------------------
                // STATUS
                // --------------------------------

                status:
                    "pending",


                // --------------------------------
                // TIME
                // --------------------------------

                createdAt:
                    serverTimestamp(),

            };


            // ==================================
            // DEBUG
            // ==================================

            console.log(
                "Creating order:",
                orderData
            );


            // ==================================
            // SAVE TO FIRESTORE
            // ==================================

            const orderRef =
                await addDoc(
                    collection(
                        db,
                        "orders"
                    ),
                    orderData
                );


            console.log(
                "Order created:",
                orderRef.id
            );


            // ==================================
            // SAVE ORDER ID
            // ==================================

            saveOrderToHistory(
                orderRef.id
            );


            // ==================================
            // CLEAR CART
            // ==================================

            clearCart();


            // ==================================
            // GO TO TRACKING
            // ==================================

            navigate(
                `/order/${orderRef.id}`
            );

        } catch (error) {

            console.error(
                "Place order error:",
                error
            );


            setOrderError(
                error?.message ||
                "Failed to place order. Please try again."
            );

        } finally {

            setPlacingOrder(false);

        }

    };


    // ==========================================
    // EMPTY CART
    // ==========================================

    if (
        !cartItems ||
        cartItems.length === 0
    ) {

        return (

            <div className="
                min-h-screen
                bg-[#F7F5EF]
                flex
                items-center
                justify-center
                px-5
            ">

                <div className="
                    text-center
                    max-w-md
                ">

                    <div className="
                        w-24
                        h-24
                        mx-auto
                        rounded-full
                        bg-[#E8E4D9]
                        flex
                        items-center
                        justify-center
                        text-[#9A8654]
                        text-4xl
                        mb-6
                    ">

                        <FaShoppingBag />

                    </div>


                    <h1 className="
                        text-3xl
                        font-bold
                        text-[#252525]
                    ">

                        Your Cart is Empty

                    </h1>


                    <p className="
                        text-[#6F6B62]
                        mt-3
                        leading-7
                    ">

                        You haven't added any food
                        to your cart yet. Explore
                        our delicious menu and add
                        your favorite food.

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

                        <FaArrowLeft
                            className="text-sm"
                        />

                        Back to Home

                    </Link>

                </div>

            </div>

        );

    }


    // ==========================================
    // GET CURRENT TABLE
    // ==========================================

    const currentTableNumber =
        cartItems[0]?.tableNumber ||
        cartItems[0]?.tableId ||
        "Unknown";


    // ==========================================
    // TOTAL ITEMS
    // ==========================================

    const totalItems =
        cartItems.reduce(
            (total, item) =>
                total +
                Number(
                    item.quantity || 0
                ),
            0
        );


    // ==========================================
    // CART PAGE
    // ==========================================

    return (

        <div className="
            min-h-screen
            bg-[#F7F5EF]
            py-10
            md:py-14
        ">

            <div className="
                max-w-7xl
                mx-auto
                px-5
                md:px-8
                lg:px-12
            ">


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="mb-10">

                    <p className="
                        text-[#9A8654]
                        text-sm
                        uppercase
                        tracking-[0.3em]
                        font-semibold
                    ">

                        ZESTRO Restaurant

                    </p>


                    <h1 className="
                        text-4xl
                        md:text-5xl
                        font-bold
                        text-[#252525]
                        mt-3
                    ">

                        Your Cart

                    </h1>


                    <p className="
                        text-[#6F6B62]
                        mt-3
                    ">

                        Review your selected food
                        before placing your order.

                    </p>

                </div>


                {/* ==================================
                    ERROR
                ================================== */}

                {orderError && (

                    <div className="
                        mb-7
                        bg-red-50
                        border
                        border-red-200
                        text-red-600
                        px-5
                        py-4
                        rounded-xl
                        text-center
                    ">

                        {orderError}

                    </div>

                )}


                {/* ==================================
                    CART
                ================================== */}

                <div className="
                    grid
                    lg:grid-cols-3
                    gap-8
                ">


                    {/* ==================================
                        CART ITEMS
                    ================================== */}

                    <div className="
                        lg:col-span-2
                        space-y-5
                    ">


                        {/* ==================================
                            TABLE INFORMATION
                        ================================== */}

                        <div className="
                            bg-[#252525]
                            text-white
                            rounded-3xl
                            p-5
                            md:p-6
                            flex
                            items-center
                            gap-4
                        ">

                            <div className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-white/10
                                flex
                                items-center
                                justify-center
                                text-[#C8B77F]
                                text-lg
                            ">

                                <FaChair />

                            </div>


                            <div>

                                <p className="
                                    text-white/60
                                    text-xs
                                    uppercase
                                    tracking-wider
                                ">

                                    Ordering From

                                </p>


                                <h2 className="
                                    text-xl
                                    font-bold
                                    mt-1
                                ">

                                    Table {currentTableNumber}

                                </h2>

                            </div>

                        </div>


                        {/* ==================================
                            FOOD ITEMS
                        ================================== */}

                        {cartItems.map(
                            (item) => (

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

                                    <div className="
                                        flex
                                        gap-4
                                    ">


                                        {/* IMAGE */}

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


                                        {/* INFO */}

                                        <div className="
                                            flex-1
                                            min-w-0
                                        ">


                                            <div className="
                                                flex
                                                justify-between
                                                gap-3
                                            ">

                                                <div>

                                                    <p className="
                                                        text-xs
                                                        uppercase
                                                        tracking-[0.2em]
                                                        text-[#9A8654]
                                                        font-semibold
                                                    ">

                                                        {item.category}

                                                    </p>


                                                    <h2 className="
                                                        text-lg
                                                        md:text-xl
                                                        font-bold
                                                        text-[#252525]
                                                        mt-1
                                                    ">

                                                        {item.name}

                                                    </h2>

                                                </div>


                                                <button
                                                    onClick={() =>
                                                        removeFromCart(
                                                            item.id
                                                        )
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
                                                        flex-shrink-0
                                                    "
                                                >

                                                    <FaTrash
                                                        className="text-sm"
                                                    />

                                                </button>

                                            </div>


                                            <p className="
                                                text-lg
                                                font-bold
                                                text-[#252525]
                                                mt-3
                                            ">

                                                ৳
                                                {item.price}

                                            </p>


                                            {/* QUANTITY */}

                                            <div className="
                                                flex
                                                items-center
                                                justify-between
                                                mt-4
                                            ">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                ">

                                                    <button
                                                        onClick={() =>
                                                            decreaseQuantity(
                                                                item.id
                                                            )
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

                                                        <FaMinus
                                                            className="text-xs"
                                                        />

                                                    </button>


                                                    <span className="
                                                        w-10
                                                        text-center
                                                        font-bold
                                                        text-[#252525]
                                                    ">

                                                        {item.quantity}

                                                    </span>


                                                    <button
                                                        onClick={() =>
                                                            increaseQuantity(
                                                                item.id
                                                            )
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

                                                        <FaPlus
                                                            className="text-xs"
                                                        />

                                                    </button>

                                                </div>


                                                <p className="
                                                    font-bold
                                                    text-[#252525]
                                                ">

                                                    ৳
                                                    {
                                                        Number(
                                                            item.price ||
                                                            0
                                                        ) *
                                                        Number(
                                                            item.quantity ||
                                                            0
                                                        )
                                                    }

                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>


                    {/* ==================================
                        SUMMARY
                    ================================== */}

                    <div>

                        <div className="
                            bg-white
                            border
                            border-[#E0DDD4]
                            rounded-3xl
                            p-6
                            md:p-7
                            shadow-sm
                            lg:sticky
                            lg:top-24
                        ">


                            {/* ==================================
                                CUSTOMER NAME
                            ================================== */}

                            <div>

                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                    mb-3
                                ">

                                    <FaUser className="
                                        text-[#9A8654]
                                    " />

                                    <label className="
                                        text-lg
                                        font-bold
                                        text-[#252525]
                                    ">

                                        Your Name

                                    </label>

                                </div>


                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => {

                                        setCustomerName(
                                            e.target.value
                                        );

                                        setOrderError("");

                                    }}
                                    placeholder="Enter your name"
                                    maxLength={50}
                                    className="
                                        w-full
                                        px-4
                                        py-3.5
                                        rounded-xl
                                        border
                                        border-[#D8D3C6]
                                        bg-[#FAF9F5]
                                        text-[#252525]
                                        outline-none
                                        focus:border-[#9A8654]
                                        focus:ring-2
                                        focus:ring-[#9A8654]/20
                                        transition
                                    "
                                />


                                <p className="
                                    text-xs
                                    text-[#8C877C]
                                    mt-2
                                ">

                                    Please enter your name
                                    so the restaurant can
                                    identify your order.

                                </p>

                            </div>


                            <div className="
                                border-t
                                border-[#E0DDD4]
                                my-6
                            "></div>


                            {/* ==================================
                                ORDER SUMMARY
                            ================================== */}

                            <h2 className="
                                text-2xl
                                font-bold
                                text-[#252525]
                            ">

                                Order Summary

                            </h2>


                            <div className="
                                border-t
                                border-[#E0DDD4]
                                my-6
                            "></div>


                            <div className="
                                flex
                                justify-between
                                text-[#6F6B62]
                            ">

                                <span>
                                    Items
                                </span>


                                <span>
                                    {totalItems}
                                </span>

                            </div>


                            <div className="
                                flex
                                justify-between
                                mt-4
                                text-[#6F6B62]
                            ">

                                <span>
                                    Subtotal
                                </span>


                                <span>
                                    ৳{cartTotal}
                                </span>

                            </div>


                            <div className="
                                flex
                                justify-between
                                mt-4
                                text-[#6F6B62]
                            ">

                                <span>
                                    Service Charge
                                </span>


                                <span>
                                    ৳0
                                </span>

                            </div>


                            <div className="
                                border-t
                                border-[#E0DDD4]
                                my-6
                            "></div>


                            <div className="
                                flex
                                justify-between
                                items-center
                            ">

                                <span className="
                                    text-lg
                                    font-bold
                                    text-[#252525]
                                ">

                                    Total

                                </span>


                                <span className="
                                    text-2xl
                                    font-bold
                                    text-[#9A8654]
                                ">

                                    ৳{cartTotal}

                                </span>

                            </div>


                            {/* ==================================
                                PLACE ORDER
                            ================================== */}

                            <button
                                onClick={
                                    handlePlaceOrder
                                }
                                disabled={
                                    placingOrder
                                }
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
                                    disabled:opacity-60
                                    disabled:cursor-not-allowed
                                "
                            >

                                {placingOrder
                                    ? "Placing Order..."
                                    : "Place Order"}

                            </button>


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

                                <FaArrowLeft
                                    className="text-xs"
                                />

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
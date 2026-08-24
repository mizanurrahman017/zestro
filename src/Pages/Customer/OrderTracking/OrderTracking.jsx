import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import {
    FaCheck,
    FaClock,
    FaUtensils,
    FaTruck,
    FaReceipt,
    FaArrowLeft,
} from "react-icons/fa";
import { Link, useParams } from "react-router";

import { db } from "../../../Firebase/Firebase.init";

const OrderTracking = () => {

    const { orderId } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // REAL-TIME ORDER LISTENER
    // ==========================================

    useEffect(() => {

        if (!orderId) {
            setError("Order ID not found.");
            setLoading(false);
            return;
        }

        const orderRef = doc(db, "orders", orderId);

        const unsubscribe = onSnapshot(
            orderRef,
            (snapshot) => {

                if (snapshot.exists()) {

                    setOrder({
                        id: snapshot.id,
                        ...snapshot.data(),
                    });

                    setError("");

                } else {

                    setOrder(null);
                    setError("Order not found.");

                }

                setLoading(false);
            },
            (error) => {

                console.error("Order tracking error:", error);

                setError(
                    "Unable to load order. Please try again."
                );

                setLoading(false);
            }
        );


        return () => unsubscribe();

    }, [orderId]);


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center">

                <div className="text-center">

                    <span className="loading loading-spinner loading-lg text-[#9A8654]"></span>

                    <p className="mt-4 text-[#6F6B62]">
                        Loading your order...
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error || !order) {

        return (
            <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center px-5">

                <div className="text-center max-w-md">

                    <div className="text-6xl mb-5">
                        😕
                    </div>

                    <h1 className="text-3xl font-bold text-[#252525]">
                        Order Not Found
                    </h1>

                    <p className="text-[#6F6B62] mt-3">
                        {error || "We couldn't find this order."}
                    </p>

                    <Link
                        to="/"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            mt-7
                            px-7
                            py-3
                            rounded-xl
                            bg-[#252525]
                            text-white
                            font-semibold
                            hover:bg-[#9A8654]
                            transition
                        "
                    >
                        <FaArrowLeft />
                        Back to Home
                    </Link>

                </div>

            </div>
        );
    }


    // ==========================================
    // ORDER STATUS
    // ==========================================

    const status = order.status || "pending";


    const statuses = [
        {
            key: "pending",
            title: "Order Received",
            description: "Your order has been received.",
            icon: <FaReceipt />,
        },
        {
            key: "preparing",
            title: "Preparing",
            description: "The kitchen is preparing your food.",
            icon: <FaUtensils />,
        },
        {
            key: "ready",
            title: "Ready",
            description: "Your order is ready.",
            icon: <FaTruck />,
        },
        {
            key: "completed",
            title: "Completed",
            description: "Enjoy your meal!",
            icon: <FaCheck />,
        },
    ];


    const statusIndex = statuses.findIndex(
        (item) => item.key === status
    );


    // ==========================================
    // DATE
    // ==========================================

    const orderDate = order.createdAt?.toDate
        ? order.createdAt.toDate()
        : null;


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="min-h-screen bg-[#F7F5EF] py-10 md:py-14">

            <div className="max-w-5xl mx-auto px-5 md:px-8">


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="text-center mb-10">

                    <p className="text-[#9A8654] text-sm uppercase tracking-[0.3em] font-semibold">
                        ZESTRO Restaurant
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold text-[#252525] mt-3">
                        Order Tracking
                    </h1>

                    <p className="text-[#6F6B62] mt-3">
                        Track your order in real time.
                    </p>

                </div>



                {/* ==================================
                    ORDER INFORMATION
                ================================== */}

                <div className="
                    bg-white
                    border
                    border-[#E0DDD4]
                    rounded-3xl
                    p-6
                    md:p-8
                    shadow-sm
                    mb-8
                ">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                        <div>

                            <p className="text-sm text-[#8C877C]">
                                Order ID
                            </p>

                            <p className="font-bold text-[#252525] mt-1 break-all">
                                {order.id}
                            </p>

                        </div>


                        <div className="md:text-right">

                            <p className="text-sm text-[#8C877C]">
                                Table
                            </p>

                            <p className="font-bold text-[#252525] mt-1">
                                {order.tableId || "N/A"}
                            </p>

                        </div>


                        <div className="md:text-right">

                            <p className="text-sm text-[#8C877C]">
                                Total
                            </p>

                            <p className="text-xl font-bold text-[#9A8654] mt-1">
                                ৳{order.totalAmount}
                            </p>

                        </div>

                    </div>


                    {orderDate && (

                        <div className="flex items-center gap-2 text-sm text-[#8C877C] mt-6">

                            <FaClock />

                            {orderDate.toLocaleString()}

                        </div>

                    )}

                </div>



                {/* ==================================
                    STATUS TRACKING
                ================================== */}

                <div className="
                    bg-white
                    border
                    border-[#E0DDD4]
                    rounded-3xl
                    p-6
                    md:p-10
                    shadow-sm
                    mb-8
                ">

                    <h2 className="text-2xl font-bold text-[#252525] mb-10">
                        Order Status
                    </h2>


                    <div className="relative">

                        {/* Desktop Line */}

                        <div className="
                            hidden
                            md:block
                            absolute
                            top-7
                            left-[12%]
                            right-[12%]
                            h-1
                            bg-[#E8E4D9]
                        ">

                            <div
                                className="h-full bg-[#9A8654] transition-all duration-500"
                                style={{
                                    width:
                                        statusIndex <= 0
                                            ? "0%"
                                            : `${(statusIndex / (statuses.length - 1)) * 100}%`,
                                }}
                            />

                        </div>


                        <div className="grid md:grid-cols-4 gap-8">

                            {statuses.map((item, index) => {

                                const completed =
                                    index <= statusIndex;

                                return (

                                    <div
                                        key={item.key}
                                        className="relative text-center"
                                    >

                                        <div
                                            className={`
                                                relative
                                                z-10
                                                w-14
                                                h-14
                                                mx-auto
                                                rounded-full
                                                flex
                                                items-center
                                                justify-center
                                                text-lg
                                                transition-all
                                                duration-500

                                                ${completed
                                                    ? "bg-[#252525] text-white shadow-lg"
                                                    : "bg-[#E8E4D9] text-[#8C877C]"
                                                }
                                            `}
                                        >
                                            {item.icon}
                                        </div>


                                        <h3
                                            className={`
                                                font-bold
                                                mt-4

                                                ${completed
                                                    ? "text-[#252525]"
                                                    : "text-[#8C877C]"
                                                }
                                            `}
                                        >
                                            {item.title}
                                        </h3>


                                        <p className="text-xs text-[#8C877C] mt-2 leading-5">
                                            {item.description}
                                        </p>

                                    </div>

                                );

                            })}

                        </div>

                    </div>

                </div>



                {/* ==================================
                    ORDER ITEMS
                ================================== */}

                <div className="
                    bg-white
                    border
                    border-[#E0DDD4]
                    rounded-3xl
                    p-6
                    md:p-8
                    shadow-sm
                ">

                    <h2 className="text-2xl font-bold text-[#252525] mb-6">
                        Your Items
                    </h2>


                    <div className="space-y-4">

                        {order.items?.map((item) => (

                            <div
                                key={item.foodId}
                                className="
                                    flex
                                    items-center
                                    gap-4
                                    border-b
                                    border-[#E8E4D9]
                                    pb-4
                                    last:border-0
                                    last:pb-0
                                "
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="
                                        w-16
                                        h-16
                                        rounded-xl
                                        object-cover
                                        flex-shrink-0
                                    "
                                />


                                <div className="flex-1">

                                    <h3 className="font-bold text-[#252525]">
                                        {item.name}
                                    </h3>

                                    <p className="text-sm text-[#8C877C] mt-1">
                                        ৳{item.price} × {item.quantity}
                                    </p>

                                </div>


                                <p className="font-bold text-[#252525]">
                                    ৳{item.subtotal}
                                </p>

                            </div>

                        ))}

                    </div>


                    <div className="border-t border-[#E0DDD4] mt-6 pt-6 flex justify-between">

                        <span className="text-lg font-bold text-[#252525]">
                            Total
                        </span>

                        <span className="text-2xl font-bold text-[#9A8654]">
                            ৳{order.totalAmount}
                        </span>

                    </div>

                </div>



                {/* ==================================
                    BACK
                ================================== */}

                <div className="text-center mt-8">

                    <Link
                        to="/menu/vQ5eOlXzEZK0WaruROok"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-6
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

                        Back to Home

                    </Link>

                </div>

            </div>

        </div>
    );
};

export default OrderTracking;

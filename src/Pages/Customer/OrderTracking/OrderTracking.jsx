import React, { useEffect, useState } from "react";

import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

import {
    FaCheck,
    FaClock,
    FaUtensils,
    FaTruck,
    FaReceipt,
    FaArrowLeft,
    FaHistory,
} from "react-icons/fa";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router";

import { db } from "../../../Firebase/Firebase.init";

const OrderTracking = () => {

    const { orderId } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    const [orderHistory, setOrderHistory] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [historyLoading, setHistoryLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // ==========================================
    // CURRENT ORDER REAL-TIME LISTENER
    // ==========================================

    useEffect(() => {

        if (!orderId) {

            setError(
                "Order ID not found."
            );

            setLoading(false);

            return;

        }


        const orderRef = doc(
            db,
            "orders",
            orderId
        );


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

                    setError(
                        "Order not found."
                    );

                }

                setLoading(false);

            },

            (error) => {

                console.error(
                    "Order tracking error:",
                    error
                );

                setError(
                    "Unable to load order. Please try again."
                );

                setLoading(false);

            }
        );


        return () =>
            unsubscribe();

    }, [orderId]);


    // ==========================================
    // LOAD CUSTOMER ORDER HISTORY
    // ==========================================

    useEffect(() => {

        const loadOrderHistory =
            async () => {

                try {

                    setHistoryLoading(true);


                    const customerId =
                        localStorage.getItem(
                            "zestro_customer_id"
                        );


                    if (!customerId) {

                        setHistoryLoading(false);

                        return;

                    }


                    const ordersQuery =
                        query(
                            collection(
                                db,
                                "orders"
                            ),
                            where(
                                "customerId",
                                "==",
                                customerId
                            )
                        );


                    const snapshot =
                        await getDocs(
                            ordersQuery
                        );


                    const orders =
                        snapshot.docs.map(
                            (orderDoc) => ({
                                id:
                                    orderDoc.id,
                                ...orderDoc.data(),
                            })
                        );


                    // Newest first

                    orders.sort(
                        (a, b) => {

                            const dateA =
                                a.createdAt?.toDate
                                    ? a.createdAt.toDate()
                                    : new Date(0);

                            const dateB =
                                b.createdAt?.toDate
                                    ? b.createdAt.toDate()
                                    : new Date(0);

                            return (
                                dateB -
                                dateA
                            );

                        }
                    );


                    setOrderHistory(
                        orders
                    );

                } catch (error) {

                    console.error(
                        "Order history error:",
                        error
                    );

                } finally {

                    setHistoryLoading(
                        false
                    );

                }

            };


        loadOrderHistory();

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
                        {error ||
                            "We couldn't find this order."}
                    </p>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 mt-7 px-7 py-3 rounded-xl bg-[#252525] text-white font-semibold hover:bg-[#9A8654] transition"
                    >
                        <FaArrowLeft />
                        Back to Home
                    </Link>

                </div>

            </div>

        );

    }


    // ==========================================
    // STATUS
    // ==========================================

    const status =
        order.status || "pending";


    const statuses = [

        {
            key: "pending",

            title: "Order Received",

            description:
                "Your order has been received.",

            icon: <FaReceipt />,
        },

        {
            key: "preparing",

            title: "Preparing",

            description:
                "The kitchen is preparing your food.",

            icon: <FaUtensils />,
        },

        {
            key: "ready",

            title: "Ready",

            description:
                "Your order is ready.",

            icon: <FaTruck />,
        },

        {
            key: "completed",

            title: "Completed",

            description:
                "Enjoy your meal!",

            icon: <FaCheck />,
        },

    ];


    const statusIndex =
        statuses.findIndex(
            (item) =>
                item.key === status
        );


    // ==========================================
    // DATE
    // ==========================================

    const orderDate =
        order.createdAt?.toDate
            ? order.createdAt.toDate()
            : null;


    // ==========================================
    // STATUS TEXT
    // ==========================================

    const getStatusLabel = (
        currentStatus
    ) => {

        switch (currentStatus) {

            case "pending":
                return "Order Received";

            case "preparing":
                return "Preparing";

            case "ready":
                return "Ready";

            case "completed":
                return "Completed";

            default:
                return currentStatus;

        }

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="min-h-screen bg-[#F7F5EF] py-10 md:py-14">

            <div className="max-w-6xl mx-auto px-5 md:px-8">


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
                    CURRENT ORDER
                ================================== */}

                <div className="bg-white border border-[#E0DDD4] rounded-3xl p-6 md:p-8 shadow-sm mb-8">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                        <div>

                            <p className="text-sm text-[#8C877C]">
                                Order ID
                            </p>

                            <p className="font-bold text-[#252525] mt-1 break-all">
                                {order.id}
                            </p>

                        </div>


                        <div>

                            <p className="text-sm text-[#8C877C]">
                                Table
                            </p>

                            <p className="font-bold text-[#252525] mt-1">
                                {order.tableId ||
                                    "Online"}
                            </p>

                        </div>


                        <div>

                            <p className="text-sm text-[#8C877C]">
                                Status
                            </p>

                            <p className="font-bold text-[#9A8654] mt-1">
                                {getStatusLabel(
                                    status
                                )}
                            </p>

                        </div>


                        <div>

                            <p className="text-sm text-[#8C877C]">
                                Total
                            </p>

                            <p className="text-xl font-bold text-[#9A8654] mt-1">
                                ৳
                                {
                                    order.totalAmount
                                }
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

                <div className="bg-white border border-[#E0DDD4] rounded-3xl p-6 md:p-10 shadow-sm mb-8">

                    <h2 className="text-2xl font-bold text-[#252525] mb-10">
                        Order Status
                    </h2>


                    <div className="relative">

                        <div className="hidden md:block absolute top-7 left-[12%] right-[12%] h-1 bg-[#E8E4D9]">

                            <div
                                className="h-full bg-[#9A8654] transition-all duration-500"
                                style={{
                                    width:
                                        statusIndex <= 0
                                            ? "0%"
                                            : `${(statusIndex /
                                                  (statuses.length -
                                                      1)) *
                                              100}%`,
                                }}
                            />

                        </div>


                        <div className="grid md:grid-cols-4 gap-8">

                            {statuses.map(
                                (
                                    item,
                                    index
                                ) => {

                                    const completed =
                                        index <=
                                        statusIndex;

                                    return (

                                        <div
                                            key={
                                                item.key
                                            }
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
                                                    ${
                                                        completed
                                                            ? "bg-[#252525] text-white shadow-lg"
                                                            : "bg-[#E8E4D9] text-[#8C877C]"
                                                    }
                                                `}
                                            >

                                                {
                                                    item.icon
                                                }

                                            </div>


                                            <h3
                                                className={`
                                                    font-bold
                                                    mt-4
                                                    ${
                                                        completed
                                                            ? "text-[#252525]"
                                                            : "text-[#8C877C]"
                                                    }
                                                `}
                                            >

                                                {
                                                    item.title
                                                }

                                            </h3>


                                            <p className="text-xs text-[#8C877C] mt-2 leading-5">
                                                {
                                                    item.description
                                                }
                                            </p>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    </div>

                </div>


                {/* ==================================
                    ORDER ITEMS
                ================================== */}

                <div className="bg-white border border-[#E0DDD4] rounded-3xl p-6 md:p-8 shadow-sm mb-8">

                    <h2 className="text-2xl font-bold text-[#252525] mb-6">
                        Your Items
                    </h2>


                    <div className="space-y-4">

                        {order.items?.map(
                            (item, index) => (

                                <div
                                    key={
                                        item.foodId ||
                                        index
                                    }
                                    className="flex items-center gap-4 border-b border-[#E8E4D9] pb-4 last:border-0 last:pb-0"
                                >

                                    <img
                                        src={
                                            item.image
                                        }
                                        alt={
                                            item.name
                                        }
                                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                                    />


                                    <div className="flex-1">

                                        <h3 className="font-bold text-[#252525]">
                                            {
                                                item.name
                                            }
                                        </h3>

                                        <p className="text-sm text-[#8C877C] mt-1">
                                            ৳
                                            {
                                                item.price
                                            }{" "}
                                            ×{" "}
                                            {
                                                item.quantity
                                            }
                                        </p>

                                    </div>


                                    <p className="font-bold text-[#252525]">
                                        ৳
                                        {
                                            item.subtotal
                                        }
                                    </p>

                                </div>

                            )
                        )}

                    </div>


                    <div className="border-t border-[#E0DDD4] mt-6 pt-6 flex justify-between">

                        <span className="text-lg font-bold text-[#252525]">
                            Total
                        </span>

                        <span className="text-2xl font-bold text-[#9A8654]">
                            ৳
                            {
                                order.totalAmount
                            }
                        </span>

                    </div>

                </div>


                {/* ==================================
                    ORDER HISTORY
                ================================== */}

                <div className="bg-white border border-[#E0DDD4] rounded-3xl p-6 md:p-8 shadow-sm">

                    <div className="flex items-center gap-3 mb-6">

                        <div className="w-10 h-10 rounded-xl bg-[#E8E4D9] flex items-center justify-center text-[#9A8654]">
                            <FaHistory />
                        </div>

                        <div>

                            <h2 className="text-2xl font-bold text-[#252525]">
                                My Orders
                            </h2>

                            <p className="text-sm text-[#8C877C] mt-1">
                                Your recent orders
                            </p>

                        </div>

                    </div>


                    {historyLoading ? (

                        <div className="text-center py-8">

                            <span className="loading loading-spinner text-[#9A8654]"></span>

                            <p className="text-sm text-[#8C877C] mt-3">
                                Loading orders...
                            </p>

                        </div>

                    ) : orderHistory.length ===
                      0 ? (

                        <div className="text-center py-8 text-[#8C877C]">

                            No previous orders found.

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {orderHistory.map(
                                (
                                    historyOrder
                                ) => {

                                    const historyDate =
                                        historyOrder
                                            .createdAt
                                            ?.toDate
                                            ? historyOrder.createdAt.toDate()
                                            : null;

                                    const isCurrent =
                                        historyOrder.id ===
                                        orderId;

                                    return (

                                        <button
                                            key={
                                                historyOrder.id
                                            }
                                            onClick={() =>
                                                navigate(
                                                    `/order/${historyOrder.id}`
                                                )
                                            }
                                            className={`
                                                w-full
                                                text-left
                                                p-5
                                                rounded-2xl
                                                border
                                                transition-all
                                                ${
                                                    isCurrent
                                                        ? "border-[#9A8654] bg-[#F7F5EF]"
                                                        : "border-[#E0DDD4] hover:bg-[#F7F5EF]"
                                                }
                                            `}
                                        >

                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                                <div>

                                                    <p className="text-xs uppercase tracking-[0.15em] text-[#9A8654] font-semibold">
                                                        Order
                                                    </p>

                                                    <p className="font-bold text-[#252525] mt-1 break-all">
                                                        {
                                                            historyOrder.id
                                                        }
                                                    </p>

                                                    {historyDate && (

                                                        <p className="text-xs text-[#8C877C] mt-2">
                                                            {
                                                                historyDate.toLocaleString()
                                                            }
                                                        </p>

                                                    )}

                                                </div>


                                                <div className="flex items-center gap-5">

                                                    <div>

                                                        <p className="text-xs text-[#8C877C]">
                                                            Table
                                                        </p>

                                                        <p className="font-semibold text-[#252525]">
                                                            {
                                                                historyOrder.tableId ||
                                                                "Online"
                                                            }
                                                        </p>

                                                    </div>


                                                    <div>

                                                        <p className="text-xs text-[#8C877C]">
                                                            Status
                                                        </p>

                                                        <p className="font-semibold text-[#9A8654]">
                                                            {
                                                                getStatusLabel(
                                                                    historyOrder.status
                                                                )
                                                            }
                                                        </p>

                                                    </div>


                                                    <div>

                                                        <p className="text-xs text-[#8C877C]">
                                                            Total
                                                        </p>

                                                        <p className="font-bold text-[#252525]">
                                                            ৳
                                                            {
                                                                historyOrder.totalAmount
                                                            }
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        </button>

                                    );

                                }
                            )}

                        </div>

                    )}

                </div>


                {/* ==================================
                    BACK
                ================================== */}

                <div className="text-center mt-8">

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#D8D3C6] text-[#252525] font-semibold hover:bg-[#E8E4D9] transition"
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
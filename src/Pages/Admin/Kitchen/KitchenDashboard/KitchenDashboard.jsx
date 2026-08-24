import React, { useEffect, useState } from "react";

import {
    collection,
    onSnapshot,
    query,
    updateDoc,
    doc,
    where,
} from "firebase/firestore";

import {
    FaUtensils,
    FaClock,
    FaCheckCircle,
    FaFire,
    FaBoxOpen,
} from "react-icons/fa";

import { db } from "../../../../Firebase/Firebase.init";

import { useAuth } from "../../../../Hooks/useAuth";


const KitchenDashboard = () => {

    // ==========================================
    // AUTH
    // ==========================================

    const {
        userData,
        loading: authLoading,
    } = useAuth();


    // ==========================================
    // STATES
    // ==========================================

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [updatingOrder, setUpdatingOrder] = useState(null);

    const [error, setError] = useState("");


    // ==========================================
    // LOAD RESTAURANT ORDERS
    // ==========================================

    useEffect(() => {

        // Auth এখনও loading হলে wait
        if (authLoading) {
            return;
        }


        // User data পাওয়া যায়নি
        if (!userData) {

            setError("User information not found.");

            setLoading(false);

            return;
        }


        // Restaurant ID পাওয়া যায়নি
        if (!userData?.restaurantId) {

            setError("Restaurant ID not found.");

            setLoading(false);

            return;
        }


        setLoading(true);

        setError("");


        // ======================================
        // ONLY THIS RESTAURANT'S ORDERS
        // ======================================

        const ordersQuery = query(
            collection(db, "orders"),
            where(
                "restaurantId",
                "==",
                userData.restaurantId
            )
        );


        // ======================================
        // REALTIME ORDERS
        // ======================================

        const unsubscribe = onSnapshot(

            ordersQuery,

            (snapshot) => {

                const orderList = snapshot.docs.map(
                    (order) => ({
                        id: order.id,
                        ...order.data(),
                    })
                );


                // ==================================
                // NEWEST ORDER FIRST
                // ==================================

                orderList.sort((a, b) => {

                    const timeA =
                        a.createdAt?.toMillis?.() || 0;

                    const timeB =
                        b.createdAt?.toMillis?.() || 0;

                    return timeB - timeA;
                });


                setOrders(orderList);

                setLoading(false);
            },


            (error) => {

                console.error(
                    "Orders loading error:",
                    error
                );

                setError(
                    "Failed to load orders. Please check Firestore permissions."
                );

                setLoading(false);
            }
        );


        // Cleanup listener

        return () => unsubscribe();

    }, [
        userData?.restaurantId,
        authLoading,
    ]);


    // ==========================================
    // UPDATE ORDER STATUS
    // ==========================================

    const updateOrderStatus = async (
        orderId,
        newStatus
    ) => {

        try {

            setUpdatingOrder(orderId);

            setError("");


            await updateDoc(
                doc(db, "orders", orderId),
                {
                    status: newStatus,
                }
            );


        } catch (error) {

            console.error(
                "Order status update error:",
                error
            );

            setError(
                "Failed to update order status."
            );


        } finally {

            setUpdatingOrder(null);
        }
    };


    // ==========================================
    // STATUS STYLE
    // ==========================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "pending":

                return "bg-yellow-100 text-yellow-700";


            case "preparing":

                return "bg-orange-100 text-orange-700";


            case "ready":

                return "bg-green-100 text-green-700";


            case "completed":

                return "bg-blue-100 text-blue-700";


            default:

                return "bg-gray-100 text-gray-700";
        }
    };


    // ==========================================
    // FORMAT TIME
    // ==========================================

    const formatTime = (timestamp) => {

        if (!timestamp) {
            return "Just now";
        }


        try {

            const date = timestamp.toDate();

            return date.toLocaleString();

        } catch (error) {

            return "Just now";
        }
    };


    // ==========================================
    // AUTH LOADING
    // ==========================================

    if (authLoading) {

        return (

            <div className="
                min-h-screen
                bg-[#F7F5EF]
                flex
                items-center
                justify-center
            ">

                <div className="text-center">

                    <span className="
                        loading
                        loading-spinner
                        loading-lg
                        text-[#9A8654]
                    "></span>


                    <p className="
                        mt-4
                        text-[#6F6B62]
                    ">
                        Checking account...
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // ORDERS LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="
                min-h-screen
                bg-[#F7F5EF]
                flex
                items-center
                justify-center
            ">

                <div className="text-center">

                    <span className="
                        loading
                        loading-spinner
                        loading-lg
                        text-[#9A8654]
                    "></span>


                    <p className="
                        mt-4
                        text-[#6F6B62]
                    ">
                        Loading orders...
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // DASHBOARD
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
                        Kitchen Dashboard
                    </h1>


                    <p className="
                        text-[#6F6B62]
                        mt-3
                    ">
                        Manage incoming orders and update
                        their status.
                    </p>

                </div>


                {/* ==================================
                    RESTAURANT INFO
                ================================== */}

                <div className="
                    mb-7
                    bg-white
                    border
                    border-[#E0DDD4]
                    rounded-2xl
                    px-5
                    py-4
                ">

                    <p className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-[#8C877C]
                    ">
                        Restaurant ID
                    </p>


                    <p className="
                        font-semibold
                        text-[#252525]
                        mt-1
                        break-all
                    ">
                        {userData?.restaurantId}
                    </p>

                </div>


                {/* ==================================
                    ERROR
                ================================== */}

                {error && (

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

                        {error}

                    </div>
                )}


                {/* ==================================
                    ORDER STATS
                ================================== */}

                <div className="
                    grid
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-5
                    mb-10
                ">


                    {/* PENDING */}

                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-6
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-[#8C877C]
                                ">
                                    Pending
                                </p>


                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-[#252525]
                                    mt-2
                                ">
                                    {
                                        orders.filter(
                                            (order) =>
                                                order.status ===
                                                "pending"
                                        ).length
                                    }
                                </h2>

                            </div>


                            <div className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-yellow-100
                                text-yellow-700
                                flex
                                items-center
                                justify-center
                            ">

                                <FaClock />

                            </div>

                        </div>

                    </div>


                    {/* PREPARING */}

                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-6
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-[#8C877C]
                                ">
                                    Preparing
                                </p>


                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-[#252525]
                                    mt-2
                                ">
                                    {
                                        orders.filter(
                                            (order) =>
                                                order.status ===
                                                "preparing"
                                        ).length
                                    }
                                </h2>

                            </div>


                            <div className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-orange-100
                                text-orange-700
                                flex
                                items-center
                                justify-center
                            ">

                                <FaFire />

                            </div>

                        </div>

                    </div>


                    {/* READY */}

                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-6
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-[#8C877C]
                                ">
                                    Ready
                                </p>


                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-[#252525]
                                    mt-2
                                ">
                                    {
                                        orders.filter(
                                            (order) =>
                                                order.status ===
                                                "ready"
                                        ).length
                                    }
                                </h2>

                            </div>


                            <div className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-green-100
                                text-green-700
                                flex
                                items-center
                                justify-center
                            ">

                                <FaCheckCircle />

                            </div>

                        </div>

                    </div>


                    {/* TOTAL */}

                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-6
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-[#8C877C]
                                ">
                                    Total Orders
                                </p>


                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-[#252525]
                                    mt-2
                                ">
                                    {orders.length}
                                </h2>

                            </div>


                            <div className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-[#E8E4D9]
                                text-[#9A8654]
                                flex
                                items-center
                                justify-center
                            ">

                                <FaBoxOpen />

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================================
                    ORDERS
                ================================== */}

                {orders.length === 0 ? (

                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        py-20
                        text-center
                    ">

                        <FaUtensils className="
                            text-5xl
                            text-[#9A8654]
                            mx-auto
                        " />


                        <h2 className="
                            text-2xl
                            font-bold
                            text-[#252525]
                            mt-5
                        ">
                            No Orders Yet
                        </h2>


                        <p className="
                            text-[#8C877C]
                            mt-2
                        ">
                            New customer orders will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-6">

                        {orders.map((order) => (

                            <div
                                key={order.id}
                                className="
                                    bg-white
                                    border
                                    border-[#E0DDD4]
                                    rounded-3xl
                                    p-5
                                    md:p-7
                                    shadow-sm
                                "
                            >


                                {/* ===============================
                                    ORDER HEADER
                                =============================== */}

                                <div className="
                                    flex
                                    flex-col
                                    md:flex-row
                                    md:items-center
                                    md:justify-between
                                    gap-4
                                ">

                                    <div>

                                        <p className="
                                            text-xs
                                            uppercase
                                            tracking-[0.2em]
                                            text-[#9A8654]
                                            font-semibold
                                        ">
                                            Order
                                        </p>


                                        <h2 className="
                                            text-xl
                                            font-bold
                                            text-[#252525]
                                            mt-1
                                        ">
                                            #{order.id.slice(0, 8)}
                                        </h2>


                                        <p className="
                                            text-sm
                                            text-[#8C877C]
                                            mt-1
                                        ">
                                            {formatTime(
                                                order.createdAt
                                            )}
                                        </p>

                                    </div>


                                    {/* STATUS */}

                                    <div className="
                                        flex
                                        flex-wrap
                                        items-center
                                        gap-3
                                    ">

                                        <span
                                            className={`
                                                px-4
                                                py-2
                                                rounded-full
                                                text-sm
                                                font-semibold
                                                capitalize
                                                ${getStatusStyle(
                                                    order.status
                                                )}
                                            `}
                                        >
                                            {order.status}
                                        </span>


                                        {/* PENDING → PREPARING */}

                                        {order.status ===
                                            "pending" && (

                                            <button
                                                onClick={() =>
                                                    updateOrderStatus(
                                                        order.id,
                                                        "preparing"
                                                    )
                                                }
                                                disabled={
                                                    updatingOrder ===
                                                    order.id
                                                }
                                                className="
                                                    px-4
                                                    py-2
                                                    rounded-xl
                                                    bg-[#252525]
                                                    text-white
                                                    text-sm
                                                    font-semibold
                                                    hover:bg-[#9A8654]
                                                    transition
                                                    disabled:opacity-50
                                                "
                                            >

                                                {updatingOrder ===
                                                order.id
                                                    ? "Updating..."
                                                    : "Start Preparing"}

                                            </button>

                                        )}


                                        {/* PREPARING → READY */}

                                        {order.status ===
                                            "preparing" && (

                                            <button
                                                onClick={() =>
                                                    updateOrderStatus(
                                                        order.id,
                                                        "ready"
                                                    )
                                                }
                                                disabled={
                                                    updatingOrder ===
                                                    order.id
                                                }
                                                className="
                                                    px-4
                                                    py-2
                                                    rounded-xl
                                                    bg-[#252525]
                                                    text-white
                                                    text-sm
                                                    font-semibold
                                                    hover:bg-[#9A8654]
                                                    transition
                                                    disabled:opacity-50
                                                "
                                            >

                                                {updatingOrder ===
                                                order.id
                                                    ? "Updating..."
                                                    : "Mark Ready"}

                                            </button>

                                        )}


                                        {/* READY → COMPLETED */}

                                        {order.status ===
                                            "ready" && (

                                            <button
                                                onClick={() =>
                                                    updateOrderStatus(
                                                        order.id,
                                                        "completed"
                                                    )
                                                }
                                                disabled={
                                                    updatingOrder ===
                                                    order.id
                                                }
                                                className="
                                                    px-4
                                                    py-2
                                                    rounded-xl
                                                    bg-[#252525]
                                                    text-white
                                                    text-sm
                                                    font-semibold
                                                    hover:bg-[#9A8654]
                                                    transition
                                                    disabled:opacity-50
                                                "
                                            >

                                                {updatingOrder ===
                                                order.id
                                                    ? "Updating..."
                                                    : "Complete Order"}

                                            </button>

                                        )}

                                    </div>

                                </div>


                                {/* ===============================
                                    CUSTOMER INFO
                                =============================== */}

                                <div className="
                                    grid
                                    sm:grid-cols-2
                                    lg:grid-cols-4
                                    gap-4
                                    mt-6
                                    p-4
                                    bg-[#F7F5EF]
                                    rounded-2xl
                                ">


                                    {/* CUSTOMER */}

                                    <div>

                                        <p className="
                                            text-xs
                                            text-[#8C877C]
                                        ">
                                            Customer
                                        </p>


                                        <p className="
                                            font-semibold
                                            text-[#252525]
                                            mt-1
                                        ">
                                            {order.customerName ||
                                                "Guest"}
                                        </p>

                                    </div>


                                    {/* EMAIL */}

                                    <div>

                                        <p className="
                                            text-xs
                                            text-[#8C877C]
                                        ">
                                            Email
                                        </p>


                                        <p className="
                                            font-semibold
                                            text-[#252525]
                                            mt-1
                                            break-all
                                        ">
                                            {order.customerEmail ||
                                                "N/A"}
                                        </p>

                                    </div>


                                    {/* TABLE */}

                                    <div>

                                        <p className="
                                            text-xs
                                            text-[#8C877C]
                                        ">
                                            Table
                                        </p>


                                        <p className="
                                            font-semibold
                                            text-[#252525]
                                            mt-1
                                        ">
                                            {order.tableId ||
                                                "N/A"}
                                        </p>

                                    </div>


                                    {/* TOTAL */}

                                    <div>

                                        <p className="
                                            text-xs
                                            text-[#8C877C]
                                        ">
                                            Total
                                        </p>


                                        <p className="
                                            font-bold
                                            text-[#9A8654]
                                            mt-1
                                        ">
                                            ৳{order.totalAmount || 0}
                                        </p>

                                    </div>

                                </div>


                                {/* ===============================
                                    FOOD ITEMS
                                =============================== */}

                                <div className="mt-6">

                                    <h3 className="
                                        text-lg
                                        font-bold
                                        text-[#252525]
                                        mb-4
                                    ">
                                        Order Items
                                    </h3>


                                    <div className="space-y-3">

                                        {order.items?.map(
                                            (item, index) => (

                                                <div
                                                    key={`${order.id}-${index}`}
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-between
                                                        gap-4
                                                        border
                                                        border-[#E8E4D9]
                                                        rounded-2xl
                                                        p-3
                                                    "
                                                >

                                                    {/* FOOD INFO */}

                                                    <div className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        min-w-0
                                                    ">

                                                        <img
                                                            src={
                                                                item.image
                                                            }
                                                            alt={
                                                                item.name
                                                            }
                                                            className="
                                                                w-16
                                                                h-16
                                                                rounded-xl
                                                                object-cover
                                                                flex-shrink-0
                                                            "
                                                        />


                                                        <div className="
                                                            min-w-0
                                                        ">

                                                            <p className="
                                                                font-semibold
                                                                text-[#252525]
                                                            ">
                                                                {
                                                                    item.name
                                                                }
                                                            </p>


                                                            <p className="
                                                                text-sm
                                                                text-[#8C877C]
                                                            ">
                                                                ৳
                                                                {
                                                                    item.price
                                                                }
                                                                {" × "}
                                                                {
                                                                    item.quantity
                                                                }
                                                            </p>

                                                        </div>

                                                    </div>


                                                    {/* SUBTOTAL */}

                                                    <p className="
                                                        font-bold
                                                        text-[#252525]
                                                        whitespace-nowrap
                                                    ">
                                                        ৳
                                                        {
                                                            item.subtotal
                                                        }
                                                    </p>

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};


export default KitchenDashboard;


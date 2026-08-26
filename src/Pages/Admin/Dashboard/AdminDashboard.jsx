import React, { useEffect, useState } from "react";

import {
    collection,
    onSnapshot,
    doc,
    getDoc,
    query,
    where,
} from "firebase/firestore";

import {
    FaUtensils,
    FaClipboardList,
    FaChair,
    FaMoneyBillWave,
    FaClock,
    FaCheckCircle,
    FaPlus,
    FaArrowRight,
    FaFire,
} from "react-icons/fa";

import { Link } from "react-router";

import { db, auth } from "../../../Firebase/Firebase.init";

const AdminDashboard = () => {
    // ==========================================
    // STATES
    // ==========================================

    const [restaurantId, setRestaurantId] = useState("");

    const [totalFoods, setTotalFoods] = useState(0);
    const [totalTables, setTotalTables] = useState(0);

    const [todayOrders, setTodayOrders] = useState(0);
    const [todayRevenue, setTodayRevenue] = useState(0);

    const [pendingOrders, setPendingOrders] = useState(0);
    const [preparingOrders, setPreparingOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);

    const [recentOrders, setRecentOrders] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // DATE HELPER
    // ==========================================

    const getOrderDate = (createdAt) => {
        if (!createdAt) {
            return null;
        }

        try {
            if (
                typeof createdAt.toDate === "function"
            ) {
                return createdAt.toDate();
            }

            if (createdAt instanceof Date) {
                return createdAt;
            }

            const date = new Date(createdAt);

            if (isNaN(date.getTime())) {
                return null;
            }

            return date;
        } catch (error) {
            return null;
        }
    };


    // ==========================================
    // LOAD DASHBOARD
    // ==========================================

    useEffect(() => {
        let unsubscribeFoods = null;
        let unsubscribeTables = null;
        let unsubscribeOrders = null;

        const loadDashboard = async () => {
            try {
                setLoading(true);
                setError("");

                const user = auth.currentUser;

                if (!user) {
                    setError("You are not logged in.");
                    setLoading(false);
                    return;
                }


                // ==========================================
                // GET USER DATA
                // ==========================================

                const userRef = doc(
                    db,
                    "users",
                    user.uid
                );

                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    setError(
                        "User information not found."
                    );

                    setLoading(false);
                    return;
                }

                const userData = userSnap.data();

                const currentRestaurantId =
                    userData.restaurantId;

                if (!currentRestaurantId) {
                    setError(
                        "Restaurant information not found."
                    );

                    setLoading(false);
                    return;
                }

                setRestaurantId(
                    currentRestaurantId
                );


                // ==========================================
                // FOODS REALTIME
                // ==========================================

                const foodsQuery = query(
                    collection(db, "foods"),
                    where(
                        "restaurantId",
                        "==",
                        currentRestaurantId
                    )
                );

                unsubscribeFoods = onSnapshot(
                    foodsQuery,
                    (snapshot) => {
                        setTotalFoods(
                            snapshot.size
                        );
                    },
                    (error) => {
                        console.error(
                            "Foods realtime error:",
                            error
                        );
                    }
                );


                // ==========================================
                // TABLES REALTIME
                // ==========================================

                const tablesQuery = query(
                    collection(db, "tables"),
                    where(
                        "restaurantId",
                        "==",
                        currentRestaurantId
                    )
                );

                unsubscribeTables = onSnapshot(
                    tablesQuery,
                    (snapshot) => {
                        setTotalTables(
                            snapshot.size
                        );
                    },
                    (error) => {
                        console.error(
                            "Tables realtime error:",
                            error
                        );
                    }
                );


                // ==========================================
                // ORDERS REALTIME
                // ==========================================

                const ordersQuery = query(
                    collection(db, "orders"),
                    where(
                        "restaurantId",
                        "==",
                        currentRestaurantId
                    )
                );

                unsubscribeOrders = onSnapshot(
                    ordersQuery,
                    (snapshot) => {

                        // ==================================
                        // TODAY
                        // ==================================

                        const now = new Date();

                        const startOfToday =
                            new Date(
                                now.getFullYear(),
                                now.getMonth(),
                                now.getDate(),
                                0,
                                0,
                                0,
                                0
                            );

                        const endOfToday =
                            new Date(
                                now.getFullYear(),
                                now.getMonth(),
                                now.getDate(),
                                23,
                                59,
                                59,
                                999
                            );


                        // ==================================
                        // ALL ORDERS
                        // ==================================

                        const allOrders =
                            snapshot.docs.map(
                                (orderDoc) => ({
                                    id: orderDoc.id,
                                    ...orderDoc.data(),
                                })
                            );


                        // ==================================
                        // TODAY'S ORDERS
                        // ==================================

                        const todaysOrders =
                            allOrders.filter(
                                (order) => {
                                    const orderDate =
                                        getOrderDate(
                                            order.createdAt
                                        );

                                    if (!orderDate) {
                                        return false;
                                    }

                                    return (
                                        orderDate >=
                                        startOfToday &&
                                        orderDate <=
                                        endOfToday
                                    );
                                }
                            );


                        // ==================================
                        // TODAY'S ORDERS COUNT
                        // ==================================

                        setTodayOrders(
                            todaysOrders.length
                        );


                        // ==================================
                        // STATUS COUNTS
                        // ==================================

                        const pending =
                            todaysOrders.filter(
                                (order) =>
                                    String(
                                        order.status || ""
                                    ).toLowerCase() ===
                                    "pending"
                            ).length;

                        const preparing =
                            todaysOrders.filter(
                                (order) =>
                                    String(
                                        order.status || ""
                                    ).toLowerCase() ===
                                    "preparing"
                            ).length;

                        const completed =
                            todaysOrders.filter(
                                (order) =>
                                    String(
                                        order.status || ""
                                    ).toLowerCase() ===
                                    "completed"
                            ).length;

                        setPendingOrders(
                            pending
                        );

                        setPreparingOrders(
                            preparing
                        );

                        setCompletedOrders(
                            completed
                        );


                        // ==================================
                        // TODAY'S REVENUE
                        // ==================================

                        const revenue =
                            todaysOrders.reduce(
                                (
                                    total,
                                    order
                                ) => {

                                    const status =
                                        String(
                                            order.status ||
                                            ""
                                        ).toLowerCase();

                                    const amount =
                                        Number(
                                            order.totalAmount
                                        ) || 0;

                                    if (
                                        status ===
                                        "completed"
                                    ) {
                                        return (
                                            total +
                                            amount
                                        );
                                    }

                                    return total;
                                },
                                0
                            );

                        setTodayRevenue(
                            revenue
                        );


                        // ==================================
                        // RECENT ORDERS
                        // ==================================

                        const sortedOrders =
                            [...allOrders]
                                .sort(
                                    (
                                        a,
                                        b
                                    ) => {

                                        const dateA =
                                            getOrderDate(
                                                a.createdAt
                                            ) ||
                                            new Date(0);

                                        const dateB =
                                            getOrderDate(
                                                b.createdAt
                                            ) ||
                                            new Date(0);

                                        return (
                                            dateB -
                                            dateA
                                        );
                                    }
                                )
                                .slice(0, 5);

                        setRecentOrders(
                            sortedOrders
                        );

                        setLoading(false);
                    },
                    (error) => {
                        console.error(
                            "Orders realtime error:",
                            error
                        );

                        setError(
                            "Failed to load dashboard orders."
                        );

                        setLoading(false);
                    }
                );

            } catch (error) {
                console.error(
                    "Dashboard loading error:",
                    error
                );

                setError(
                    "Failed to load dashboard."
                );

                setLoading(false);
            }
        };


        loadDashboard();


        // ==========================================
        // CLEANUP
        // ==========================================

        return () => {
            if (unsubscribeFoods) {
                unsubscribeFoods();
            }

            if (unsubscribeTables) {
                unsubscribeTables();
            }

            if (unsubscribeOrders) {
                unsubscribeOrders();
            }
        };

    }, []);


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (timestamp) => {
        const date =
            getOrderDate(timestamp);

        if (!date) {
            return "N/A";
        }

        return date.toLocaleString(
            "en-BD",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };


    // ==========================================
    // GET ITEMS
    // ==========================================

    const getOrderItems = (order) => {
        const items =
            order.items ||
            order.orderItems ||
            order.cartItems ||
            [];

        if (!Array.isArray(items)) {
            return [];
        }

        return items;
    };


    // ==========================================
    // GET ITEM NAME
    // ==========================================

    const getItemName = (item) => {
        return (
            item.name ||
            item.foodName ||
            item.title ||
            item.productName ||
            "Food Item"
        );
    };


    // ==========================================
    // GET ITEM QUANTITY
    // ==========================================

    const getItemQuantity = (item) => {
        return (
            item.quantity ||
            item.qty ||
            1
        );
    };


    // ==========================================
    // STATUS STYLE
    // ==========================================

    const getStatusStyle = (status) => {
        const currentStatus =
            String(
                status || ""
            ).toLowerCase();

        if (
            currentStatus ===
            "pending"
        ) {
            return "bg-yellow-50 text-yellow-700 border-yellow-200";
        }

        if (
            currentStatus ===
            "preparing"
        ) {
            return "bg-blue-50 text-blue-700 border-blue-200";
        }

        if (
            currentStatus ===
            "completed"
        ) {
            return "bg-green-50 text-green-700 border-green-200";
        }

        return "bg-gray-50 text-gray-700 border-gray-200";
    };


    // ==========================================
    // LOADING
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
                        Loading dashboard...
                    </p>

                </div>
            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {
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
                    bg-white
                    border
                    border-red-200
                    rounded-3xl
                    p-8
                    text-center
                    max-w-md
                ">

                    <div className="
                        text-5xl
                        mb-4
                    ">
                        ⚠️
                    </div>

                    <h2 className="
                        text-2xl
                        font-bold
                        text-[#252525]
                    ">
                        Something went wrong
                    </h2>

                    <p className="
                        text-red-500
                        mt-3
                    ">
                        {error}
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
        ">


            {/* ==========================================
                HEADER
            ========================================== */}

            <section className="
                border-b
                border-[#E0DDD4]
                bg-white
            ">

                <div className="
                    max-w-7xl
                    mx-auto
                    px-5
                    md:px-8
                    lg:px-12
                    py-8
                ">

                    <div className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-5
                    ">

                        <div>

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
                                text-3xl
                                md:text-4xl
                                font-bold
                                text-[#252525]
                                mt-2
                            ">
                                Owner Dashboard
                            </h1>

                            <p className="
                                text-[#6F6B62]
                                mt-2
                            ">
                                Manage your restaurant from one place.
                            </p>

                        </div>


                        <div className="
                            flex
                            items-center
                            gap-3
                            bg-[#F7F5EF]
                            border
                            border-[#E0DDD4]
                            px-4
                            py-3
                            rounded-2xl
                        ">

                            <div className="
                                w-10
                                h-10
                                rounded-full
                                bg-[#252525]
                                text-white
                                flex
                                items-center
                                justify-center
                                font-bold
                            ">
                                A
                            </div>

                            <div>

                                <p className="
                                    text-xs
                                    text-[#8C877C]
                                ">
                                    Logged in as
                                </p>

                                <p className="
                                    font-semibold
                                    text-[#252525]
                                ">
                                    Owner
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                MAIN CONTENT
            ========================================== */}

            <main className="
                max-w-7xl
                mx-auto
                px-5
                md:px-8
                lg:px-12
                py-8
                md:py-10
            ">


                {/* LIVE INDICATOR */}

                <div className="
                    mb-6
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-[#6F6B62]
                ">

                    <span className="
                        w-2
                        h-2
                        rounded-full
                        bg-green-500
                        animate-pulse
                    "></span>

                    Live dashboard

                </div>


                {/* ==========================================
                    STATISTICS
                ========================================== */}

                <div className="
                    grid
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                ">


                    {/* TOTAL FOODS */}

                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-6
                        shadow-sm
                        hover:shadow-lg
                        hover:-translate-y-1
                        transition-all
                        duration-300
                    ">

                        <div className="
                            flex
                            items-start
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-[#8C877C]
                                ">
                                    Total Foods
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-[#252525]
                                    mt-2
                                ">
                                    {totalFoods}
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
                                text-lg
                            ">
                                <FaUtensils />
                            </div>

                        </div>

                        <p className="
                            text-xs
                            text-[#8C877C]
                            mt-5
                        ">
                            Food items in your menu
                        </p>

                    </div>


                    {/* TODAY'S ORDERS */}

                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-6
                        shadow-sm
                        hover:shadow-lg
                        hover:-translate-y-1
                        transition-all
                        duration-300
                    ">

                        <div className="
                            flex
                            items-start
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-[#8C877C]
                                ">
                                    Today's Orders
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-[#252525]
                                    mt-2
                                ">
                                    {todayOrders}
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
                                text-lg
                            ">
                                <FaClipboardList />
                            </div>

                        </div>

                        <p className="
                            text-xs
                            text-[#8C877C]
                            mt-5
                        ">
                            Orders received today
                        </p>

                    </div>


                    {/* TOTAL TABLES */}

                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-6
                        shadow-sm
                        hover:shadow-lg
                        hover:-translate-y-1
                        transition-all
                        duration-300
                    ">

                        <div className="
                            flex
                            items-start
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-[#8C877C]
                                ">
                                    Total Tables
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-[#252525]
                                    mt-2
                                ">
                                    {totalTables}
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
                                text-lg
                            ">
                                <FaChair />
                            </div>

                        </div>

                        <p className="
                            text-xs
                            text-[#8C877C]
                            mt-5
                        ">
                            Tables in your restaurant
                        </p>

                    </div>


                    {/* TODAY'S REVENUE */}

                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-6
                        shadow-sm
                        hover:shadow-lg
                        hover:-translate-y-1
                        transition-all
                        duration-300
                    ">

                        <div className="
                            flex
                            items-start
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-[#8C877C]
                                ">
                                    Today's Revenue
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-[#252525]
                                    mt-2
                                ">
                                    ৳{todayRevenue.toFixed(2)}
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
                                text-lg
                            ">
                                <FaMoneyBillWave />
                            </div>

                        </div>

                        <p className="
                            text-xs
                            text-[#8C877C]
                            mt-5
                        ">
                            Completed orders revenue today
                        </p>

                    </div>

                </div>


                {/* ==========================================
                    ORDER OVERVIEW
                ========================================== */}

                <div className="
                    grid
                    lg:grid-cols-2
                    gap-6
                    mt-8
                ">


                    {/* ORDER STATUS */}

                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-6
                        md:p-7
                        shadow-sm
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-[#9A8654]
                                    text-xs
                                    uppercase
                                    tracking-[0.2em]
                                    font-semibold
                                ">
                                    Orders
                                </p>

                                <h2 className="
                                    text-2xl
                                    font-bold
                                    text-[#252525]
                                    mt-2
                                ">
                                    Order Overview
                                </h2>

                            </div>

                            <FaClipboardList className="
                                text-[#9A8654]
                                text-xl
                            " />

                        </div>


                        <div className="
                            grid
                            sm:grid-cols-3
                            gap-4
                            mt-7
                        ">


                            {/* PENDING */}

                            <div className="
                                bg-[#FFF8E8]
                                rounded-2xl
                                p-5
                                border
                                border-[#EFE3C4]
                            ">

                                <FaClock className="
                                    text-[#9A8654]
                                " />

                                <p className="
                                    text-2xl
                                    font-bold
                                    text-[#252525]
                                    mt-3
                                ">
                                    {pendingOrders}
                                </p>

                                <p className="
                                    text-sm
                                    text-[#6F6B62]
                                    mt-1
                                ">
                                    Pending
                                </p>

                            </div>


                            {/* PREPARING */}

                            <div className="
                                bg-[#F3F0E8]
                                rounded-2xl
                                p-5
                                border
                                border-[#DED8C9]
                            ">

                                <FaUtensils className="
                                    text-[#9A8654]
                                " />

                                <p className="
                                    text-2xl
                                    font-bold
                                    text-[#252525]
                                    mt-3
                                ">
                                    {preparingOrders}
                                </p>

                                <p className="
                                    text-sm
                                    text-[#6F6B62]
                                    mt-1
                                ">
                                    Preparing
                                </p>

                            </div>


                            {/* COMPLETED */}

                            <div className="
                                bg-[#EEF5EE]
                                rounded-2xl
                                p-5
                                border
                                border-[#D9E7D9]
                            ">

                                <FaCheckCircle className="
                                    text-[#6E8B6E]
                                " />

                                <p className="
                                    text-2xl
                                    font-bold
                                    text-[#252525]
                                    mt-3
                                ">
                                    {completedOrders}
                                </p>

                                <p className="
                                    text-sm
                                    text-[#6F6B62]
                                    mt-1
                                ">
                                    Completed
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* RESTAURANT OVERVIEW */}

                    <div className="
                        bg-[#252525]
                        text-white
                        rounded-3xl
                        p-6
                        md:p-7
                        shadow-sm
                    ">

                        <p className="
                            text-[#C8B77F]
                            text-xs
                            uppercase
                            tracking-[0.2em]
                            font-semibold
                        ">
                            Restaurant
                        </p>

                        <h2 className="
                            text-2xl
                            font-bold
                            mt-2
                        ">
                            Your Restaurant
                        </h2>

                        <p className="
                            text-white/60
                            text-sm
                            leading-6
                            mt-3
                        ">
                            Manage your food menu, tables, QR codes and
                            restaurant operations from your admin panel.
                        </p>

                        <div className="
                            grid
                            grid-cols-2
                            gap-4
                            mt-7
                        ">

                            <div className="
                                bg-white/10
                                rounded-2xl
                                p-4
                            ">

                                <p className="
                                    text-2xl
                                    font-bold
                                ">
                                    {totalTables}
                                </p>

                                <p className="
                                    text-white/60
                                    text-sm
                                    mt-1
                                ">
                                    Tables
                                </p>

                            </div>


                            <div className="
                                bg-white/10
                                rounded-2xl
                                p-4
                            ">

                                <p className="
                                    text-2xl
                                    font-bold
                                ">
                                    {totalFoods}
                                </p>

                                <p className="
                                    text-white/60
                                    text-sm
                                    mt-1
                                ">
                                    Foods
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    QUICK ACTIONS
                ========================================== */}

                <section className="
                    mt-8
                ">

                    <div className="
                        mb-5
                    ">

                        <p className="
                            text-[#9A8654]
                            text-xs
                            uppercase
                            tracking-[0.2em]
                            font-semibold
                        ">
                            Quick Actions
                        </p>

                        <h2 className="
                            text-2xl
                            font-bold
                            text-[#252525]
                            mt-2
                        ">
                            Manage Restaurant
                        </h2>

                    </div>


                    <div className="
                        grid
                        md:grid-cols-3
                        gap-5
                    ">


                        {/* ADD FOOD */}

                        <Link
                            to="/admin/foods"
                            className="
                                group
                                bg-white
                                border
                                border-[#E0DDD4]
                                rounded-3xl
                                p-6
                                shadow-sm
                                hover:shadow-lg
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            "
                        >

                            <div className="
                                flex
                                items-center
                                justify-between
                            ">

                                <div className="
                                    w-12
                                    h-12
                                    rounded-2xl
                                    bg-[#E8E4D9]
                                    text-[#9A8654]
                                    flex
                                    items-center
                                    justify-center
                                    text-lg
                                ">
                                    <FaPlus />
                                </div>

                                <FaArrowRight className="
                                    text-[#B8B1A1]
                                    group-hover:text-[#9A8654]
                                    group-hover:translate-x-1
                                    transition
                                " />

                            </div>

                            <h3 className="
                                text-lg
                                font-bold
                                text-[#252525]
                                mt-5
                            ">
                                Add New Food
                            </h3>

                            <p className="
                                text-sm
                                text-[#8C877C]
                                mt-2
                                leading-6
                            ">
                                Add a new item to your menu.
                            </p>

                        </Link>


                        {/* MANAGE TABLES */}

                        <Link
                            to="/admin/tables"
                            className="
                                group
                                bg-white
                                border
                                border-[#E0DDD4]
                                rounded-3xl
                                p-6
                                shadow-sm
                                hover:shadow-lg
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            "
                        >

                            <div className="
                                flex
                                items-center
                                justify-between
                            ">

                                <div className="
                                    w-12
                                    h-12
                                    rounded-2xl
                                    bg-[#E8E4D9]
                                    text-[#9A8654]
                                    flex
                                    items-center
                                    justify-center
                                    text-lg
                                ">
                                    <FaChair />
                                </div>

                                <FaArrowRight className="
                                    text-[#B8B1A1]
                                    group-hover:text-[#9A8654]
                                    group-hover:translate-x-1
                                    transition
                                " />

                            </div>

                            <h3 className="
                                text-lg
                                font-bold
                                text-[#252525]
                                mt-5
                            ">
                                Manage Tables
                            </h3>

                            <p className="
                                text-sm
                                text-[#8C877C]
                                mt-2
                                leading-6
                            ">
                                Manage your restaurant tables.
                            </p>

                        </Link>


                        {/* QR CODES */}

                        <Link
                            to="/admin/qr-codes"
                            className="
                                group
                                bg-white
                                border
                                border-[#E0DDD4]
                                rounded-3xl
                                p-6
                                shadow-sm
                                hover:shadow-lg
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            "
                        >

                            <div className="
                                flex
                                items-center
                                justify-between
                            ">

                                <div className="
                                    w-12
                                    h-12
                                    rounded-2xl
                                    bg-[#E8E4D9]
                                    text-[#9A8654]
                                    flex
                                    items-center
                                    justify-center
                                    text-lg
                                ">
                                    <FaClipboardList />
                                </div>

                                <FaArrowRight className="
                                    text-[#B8B1A1]
                                    group-hover:text-[#9A8654]
                                    group-hover:translate-x-1
                                    transition
                                " />

                            </div>

                            <h3 className="
                                text-lg
                                font-bold
                                text-[#252525]
                                mt-5
                            ">
                                Manage QR Codes
                            </h3>

                            <p className="
                                text-sm
                                text-[#8C877C]
                                mt-2
                                leading-6
                            ">
                                Generate QR codes for tables.
                            </p>

                        </Link>

                    </div>

                </section>


               {/* ==========================================
    RECENT ORDERS
========================================== */}

<section className="
    mt-8
">

    <div className="
        bg-white
        border
        border-[#E0DDD4]
        rounded-3xl
        p-6
        md:p-7
        shadow-sm
    ">

        {/* HEADER */}

        <div className="
            flex
            items-center
            justify-between
        ">

            <div>

                <p className="
                    text-[#9A8654]
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    font-semibold
                ">
                    Activity
                </p>

                <h2 className="
                    text-2xl
                    font-bold
                    text-[#252525]
                    mt-2
                ">
                    Recent Orders
                </h2>

            </div>

            <FaClipboardList className="
                text-[#9A8654]
                text-xl
            " />

        </div>


        {recentOrders.length === 0 ? (

            /* ==================================
               NO ORDERS
            ================================== */

            <div className="
                text-center
                py-14
                text-[#8C877C]
            ">

                <div className="
                    w-16
                    h-16
                    mx-auto
                    rounded-full
                    bg-[#F7F5EF]
                    flex
                    items-center
                    justify-center
                    text-[#9A8654]
                    text-xl
                ">
                    <FaClipboardList />
                </div>

                <p className="
                    font-semibold
                    text-[#252525]
                    mt-5
                ">
                    No recent orders
                </p>

                <p className="
                    text-sm
                    mt-2
                ">
                    New customer orders will appear here.
                </p>

            </div>

        ) : (

            /* ==================================
               ORDERS
            ================================== */

            <div className="
                mt-6
                space-y-4
            ">

                {recentOrders.map((order) => {

                    const items = getOrderItems(order);

                    // ==================================
                    // GET CUSTOMER NAME
                    // ==================================

                    const customerName =
                        order.customerName ||
                        order.name ||
                        "Customer";


                    // ==================================
                    // GET TABLE
                    // ==================================

                    const tableNumber =
                        order.tableNumber ||
                        order.tableId ||
                        order.table ||
                        "N/A";


                    return (

                        <div
                            key={order.id}
                            className="
                                border
                                border-[#E8E4D9]
                                rounded-2xl
                                p-5
                                hover:bg-[#FAF9F5]
                                transition
                            "
                        >

                            {/* ==================================
                                TOP
                            ================================== */}

                            <div className="
                                flex
                                flex-col
                                lg:flex-row
                                lg:items-center
                                lg:justify-between
                                gap-4
                            ">

                                {/* ORDER ID + CUSTOMER */}

                                <div className="
                                    flex
                                    items-center
                                    gap-4
                                ">

                                    <div className="
                                        w-12
                                        h-12
                                        rounded-xl
                                        bg-[#F7F5EF]
                                        text-[#9A8654]
                                        flex
                                        items-center
                                        justify-center
                                    ">
                                        <FaClipboardList />
                                    </div>


                                    <div>

                                        <p className="
                                            font-bold
                                            text-[#252525]
                                        ">
                                            Order #{order.id.slice(0, 6)}
                                        </p>


                                        {/* CUSTOMER NAME */}

                                        <p className="
                                            text-sm
                                            font-semibold
                                            text-[#252525]
                                            mt-1
                                        ">
                                            {customerName}
                                        </p>


                                        <div className="
                                            flex
                                            flex-wrap
                                            items-center
                                            gap-2
                                            mt-2
                                        ">

                                            {/* TABLE */}

                                            <span className="
                                                text-xs
                                                font-semibold
                                                text-[#9A8654]
                                                bg-[#F7F5EF]
                                                px-2.5
                                                py-1
                                                rounded-lg
                                            ">
                                                Table {tableNumber}
                                            </span>


                                            {/* ORDER TIME */}

                                            <span className="
                                                text-xs
                                                text-[#8C877C]
                                            ">
                                                {formatDate(
                                                    order.createdAt
                                                )}
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* STATUS + AMOUNT */}

                                <div className="
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-3
                                ">

                                    <span
                                        className={`
                                            px-3
                                            py-1.5
                                            rounded-full
                                            text-xs
                                            font-semibold
                                            border
                                            ${getStatusStyle(
                                                order.status
                                            )}
                                        `}
                                    >
                                        {order.status || "Unknown"}
                                    </span>


                                    <span className="
                                        font-bold
                                        text-lg
                                        text-[#252525]
                                    ">
                                        ৳
                                        {Number(
                                            order.totalAmount || 0
                                        ).toFixed(2)}
                                    </span>

                                </div>

                            </div>


                            {/* ==================================
                                ORDER DETAILS
                            ================================== */}

                            <div className="
                                grid
                                sm:grid-cols-2
                                lg:grid-cols-3
                                gap-4
                                mt-5
                                pt-5
                                border-t
                                border-[#E8E4D9]
                            ">


                                {/* ==================================
                                    TABLE
                                ================================== */}

                                <div className="
                                    bg-[#F7F5EF]
                                    rounded-xl
                                    p-4
                                ">

                                    <p className="
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-[#8C877C]
                                        font-semibold
                                    ">
                                        Table
                                    </p>

                                    <p className="
                                        text-lg
                                        font-bold
                                        text-[#252525]
                                        mt-1
                                    ">
                                        Table {tableNumber}
                                    </p>

                                    {/* TABLE ID */}

                                    {order.tableId && (
                                        <p className="
                                            text-xs
                                            text-[#8C877C]
                                            mt-1
                                        ">
                                            Table ID: {order.tableId}
                                        </p>
                                    )}

                                </div>


                                {/* ==================================
                                    CUSTOMER
                                ================================== */}

                                <div className="
                                    bg-[#F7F5EF]
                                    rounded-xl
                                    p-4
                                ">

                                    <p className="
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-[#8C877C]
                                        font-semibold
                                    ">
                                        Customer
                                    </p>

                                    <p className="
                                        text-lg
                                        font-bold
                                        text-[#252525]
                                        mt-1
                                    ">
                                        {customerName}
                                    </p>

                                    {order.customerEmail && (
                                        <p className="
                                            text-xs
                                            text-[#8C877C]
                                            mt-1
                                            truncate
                                        ">
                                            {order.customerEmail}
                                        </p>
                                    )}

                                </div>


                                {/* ==================================
                                    ITEMS
                                ================================== */}

                                <div className="
                                    bg-[#F7F5EF]
                                    rounded-xl
                                    p-4
                                    sm:col-span-2
                                    lg:col-span-1
                                ">

                                    <p className="
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-[#8C877C]
                                        font-semibold
                                    ">
                                        Items
                                    </p>


                                    {items.length === 0 ? (

                                        <p className="
                                            text-sm
                                            text-[#6F6B62]
                                            mt-2
                                        ">
                                            No item information
                                        </p>

                                    ) : (

                                        <div className="
                                            flex
                                            flex-wrap
                                            gap-2
                                            mt-2
                                        ">

                                            {items.map(
                                                (item, index) => (

                                                    <span
                                                        key={index}
                                                        className="
                                                            inline-flex
                                                            items-center
                                                            gap-1
                                                            px-3
                                                            py-1.5
                                                            rounded-lg
                                                            bg-white
                                                            border
                                                            border-[#E0DDD4]
                                                            text-sm
                                                            text-[#252525]
                                                        "
                                                    >

                                                        <span className="
                                                            font-semibold
                                                        ">
                                                            {getItemName(
                                                                item
                                                            )}
                                                        </span>

                                                        <span className="
                                                            text-[#9A8654]
                                                            font-bold
                                                        ">
                                                            ×
                                                            {getItemQuantity(
                                                                item
                                                            )}
                                                        </span>

                                                    </span>

                                                )
                                            )}

                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* ==================================
                                ORDER STATUS BAR
                            ================================== */}

                            <div className="
                                mt-5
                            ">

                                <p className="
                                    text-xs
                                    uppercase
                                    tracking-wider
                                    text-[#8C877C]
                                    font-semibold
                                    mb-3
                                ">
                                    Order Status
                                </p>


                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                ">


                                    {/* PENDING */}

                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                        flex-1
                                    ">

                                        <div
                                            className={`
                                                w-3
                                                h-3
                                                rounded-full
                                                ${
                                                    ["pending", "preparing", "completed"].includes(
                                                        String(
                                                            order.status || ""
                                                        ).toLowerCase()
                                                    )
                                                        ? "bg-yellow-500"
                                                        : "bg-gray-300"
                                                }
                                            `}
                                        ></div>

                                        <span className="
                                            text-xs
                                            font-semibold
                                            text-[#6F6B62]
                                        ">
                                            Pending
                                        </span>

                                    </div>


                                    <div className="
                                        h-px
                                        bg-[#E0DDD4]
                                        flex-1
                                    "></div>


                                    {/* PREPARING */}

                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                        flex-1
                                    ">

                                        <div
                                            className={`
                                                w-3
                                                h-3
                                                rounded-full
                                                ${
                                                    ["preparing", "completed"].includes(
                                                        String(
                                                            order.status || ""
                                                        ).toLowerCase()
                                                    )
                                                        ? "bg-blue-500"
                                                        : "bg-gray-300"
                                                }
                                            `}
                                        ></div>

                                        <span className="
                                            text-xs
                                            font-semibold
                                            text-[#6F6B62]
                                        ">
                                            Preparing
                                        </span>

                                    </div>


                                    <div className="
                                        h-px
                                        bg-[#E0DDD4]
                                        flex-1
                                    "></div>


                                    {/* COMPLETED */}

                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                        flex-1
                                    ">

                                        <div
                                            className={`
                                                w-3
                                                h-3
                                                rounded-full
                                                ${
                                                    String(
                                                        order.status || ""
                                                    ).toLowerCase() ===
                                                    "completed"
                                                        ? "bg-green-500"
                                                        : "bg-gray-300"
                                                }
                                            `}
                                        ></div>

                                        <span className="
                                            text-xs
                                            font-semibold
                                            text-[#6F6B62]
                                        ">
                                            Completed
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

        )}

    </div>

</section>


                {/* ==========================================
                    LIVE MESSAGE
                ========================================== */}

                <div className="
                    mt-6
                    bg-[#252525]
                    text-white
                    rounded-2xl
                    px-5
                    py-4
                    flex
                    items-center
                    gap-3
                ">

                    <FaFire className="
                        text-[#C8B77F]
                    " />

                    {/* <p className="
                        text-sm
                        text-white/80
                    ">
                        Dashboard is connected to Firestore realtime
                        updates. New orders and status changes will
                        appear automatically.
                    </p> */}

                </div>

            </main>

        </div>
    );
};

export default AdminDashboard;
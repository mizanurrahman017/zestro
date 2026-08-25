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
    // LOAD RESTAURANT ID
    // ==========================================

    useEffect(() => {

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
                // LOAD TOTAL FOODS
                // ==========================================

                const foodsQuery = query(
                    collection(db, "foods"),
                    where(
                        "restaurantId",
                        "==",
                        currentRestaurantId
                    )
                );


                const unsubscribeFoods =
                    onSnapshot(
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
                // LOAD TOTAL TABLES
                // ==========================================

                const tablesQuery = query(
                    collection(db, "tables"),
                    where(
                        "restaurantId",
                        "==",
                        currentRestaurantId
                    )
                );


                const unsubscribeTables =
                    onSnapshot(
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
                // REALTIME ORDERS
                // ==========================================

                const ordersQuery = query(
                    collection(db, "orders"),
                    where(
                        "restaurantId",
                        "==",
                        currentRestaurantId
                    )
                );


                unsubscribeOrders =
                    onSnapshot(
                        ordersQuery,
                        (snapshot) => {

                            // ==================================
                            // CURRENT DATE
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
                                    (orderDoc) => {

                                        const data =
                                            orderDoc.data();

                                        return {
                                            id: orderDoc.id,
                                            ...data,
                                        };

                                    }
                                );


                            // ==================================
                            // TODAY'S ORDERS
                            // ==================================

                            const todaysOrders =
                                allOrders.filter(
                                    (order) => {

                                        if (
                                            !order.createdAt
                                        ) {
                                            return false;
                                        }


                                        let orderDate;


                                        // Firestore Timestamp
                                        if (
                                            typeof order.createdAt.toDate ===
                                            "function"
                                        ) {

                                            orderDate =
                                                order.createdAt.toDate();

                                        }

                                        // JavaScript Date
                                        else if (
                                            order.createdAt instanceof Date
                                        ) {

                                            orderDate =
                                                order.createdAt;

                                        }

                                        // String date
                                        else {

                                            orderDate =
                                                new Date(
                                                    order.createdAt
                                                );

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
                            // TODAY'S ORDER COUNT
                            // ==================================

                            setTodayOrders(
                                todaysOrders.length
                            );


                            // ==================================
                            // PENDING
                            // ==================================

                            const pending =
                                todaysOrders.filter(
                                    (order) =>
                                        String(
                                            order.status
                                        ).toLowerCase() ===
                                        "pending"
                                ).length;


                            setPendingOrders(
                                pending
                            );


                            // ==================================
                            // PREPARING
                            // ==================================

                            const preparing =
                                todaysOrders.filter(
                                    (order) =>
                                        String(
                                            order.status
                                        ).toLowerCase() ===
                                        "preparing"
                                ).length;


                            setPreparingOrders(
                                preparing
                            );


                            // ==================================
                            // COMPLETED
                            // ==================================

                            const completed =
                                todaysOrders.filter(
                                    (order) =>
                                        String(
                                            order.status
                                        ).toLowerCase() ===
                                        "completed"
                                ).length;


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

                                        const amount =
                                            Number(
                                                order.totalAmount
                                            ) || 0;


                                        // Revenue only from
                                        // completed orders
                                        if (
                                            String(
                                                order.status
                                            ).toLowerCase() ===
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
                                                a.createdAt
                                                    ?.toDate
                                                    ? a.createdAt.toDate()
                                                    : new Date(
                                                        a.createdAt ||
                                                        0
                                                    );


                                            const dateB =
                                                b.createdAt
                                                    ?.toDate
                                                    ? b.createdAt.toDate()
                                                    : new Date(
                                                        b.createdAt ||
                                                        0
                                                    );


                                            return (
                                                dateB -
                                                dateA
                                            );

                                        }
                                    )
                                    .slice(
                                        0,
                                        5
                                    );


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


                // ==========================================
                // CLEANUP
                // ==========================================

                return () => {

                    unsubscribeFoods();

                    unsubscribeTables();

                    if (
                        unsubscribeOrders
                    ) {
                        unsubscribeOrders();
                    }

                };

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


        return () => {

            if (
                unsubscribeOrders
            ) {
                unsubscribeOrders();
            }

        };

    }, []);


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (timestamp) => {

        if (!timestamp) {
            return "";
        }


        let date;


        if (
            typeof timestamp.toDate ===
            "function"
        ) {

            date =
                timestamp.toDate();

        } else {

            date =
                new Date(timestamp);

        }


        return date.toLocaleString(
            "en-BD",
            {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
            }
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
                CONTENT
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


                {/* ==========================================
                    REALTIME INDICATOR
                ========================================== */}

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
                                    ৳{todayRevenue}
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

                            <div className="
                                mt-6
                                space-y-3
                            ">

                                {recentOrders.map(
                                    (order) => (

                                        <div
                                            key={order.id}
                                            className="
                                                flex
                                                flex-col
                                                md:flex-row
                                                md:items-center
                                                md:justify-between
                                                gap-4
                                                border
                                                border-[#E8E4D9]
                                                rounded-2xl
                                                p-4
                                                hover:bg-[#FAF9F5]
                                                transition
                                            "
                                        >


                                            <div className="
                                                flex
                                                items-center
                                                gap-4
                                            ">

                                                <div className="
                                                    w-11
                                                    h-11
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
                                                        Order #
                                                        {order.id.slice(
                                                            0,
                                                            6
                                                        )}
                                                    </p>


                                                    <p className="
                                                        text-xs
                                                        text-[#8C877C]
                                                        mt-1
                                                    ">
                                                        {formatDate(
                                                            order.createdAt
                                                        )}
                                                    </p>

                                                </div>

                                            </div>


                                            <div className="
                                                flex
                                                items-center
                                                gap-4
                                            ">

                                                <span className={`
                                                    px-3
                                                    py-1.5
                                                    rounded-full
                                                    text-xs
                                                    font-semibold
                                                    border
                                                    ${getStatusStyle(
                                                        order.status
                                                    )}
                                                `}>
                                                    {order.status ||
                                                        "Unknown"}
                                                </span>


                                                <span className="
                                                    font-bold
                                                    text-[#252525]
                                                ">
                                                    ৳
                                                    {Number(
                                                        order.totalAmount
                                                    ) || 0}
                                                </span>

                                            </div>

                                        </div>

                                    )
                                )}

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

                    <p className="
                        text-sm
                        text-white/80
                    ">
                        Dashboard is connected to Firestore realtime updates.
                        New orders and status changes will appear automatically.
                    </p>

                </div>

            </main>

        </div>

    );

};

export default AdminDashboard;
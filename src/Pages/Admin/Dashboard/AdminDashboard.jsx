
import React from "react";
import {
    FaUtensils,
    FaClipboardList,
    FaChair,
    FaMoneyBillWave,
    FaClock,
    FaCheckCircle,
    FaPlus,
    FaArrowRight,
} from "react-icons/fa";

const AdminDashboard = () => {
    // ==========================================
    // DASHBOARD STATISTICS
    // ==========================================

    const stats = [
        {
            title: "Total Foods",
            value: "0",
            icon: <FaUtensils />,
            description: "Food items in your menu",
        },
        {
            title: "Today's Orders",
            value: "0",
            icon: <FaClipboardList />,
            description: "Orders received today",
        },
        {
            title: "Total Tables",
            value: "10",
            icon: <FaChair />,
            description: "Tables in your restaurant",
        },
        {
            title: "Today's Revenue",
            value: "৳0",
            icon: <FaMoneyBillWave />,
            description: "Revenue generated today",
        },
    ];

    // ==========================================
    // QUICK ACTIONS
    // ==========================================

    const quickActions = [
        {
            title: "Add New Food",
            description: "Add a new item to your menu",
            icon: <FaPlus />,
            path: "/admin/foods",
        },
        {
            title: "Manage Tables",
            description: "Manage your restaurant tables",
            icon: <FaChair />,
            path: "/admin/tables",
        },
        {
            title: "Manage QR Codes",
            description: "Generate QR codes for tables",
            icon: <FaClipboardList />,
            path: "/admin/qr-codes",
        },
    ];

    return (
        <div className="min-h-screen bg-[#F7F5EF]">

            {/* ==========================================
                HEADER
            ========================================== */}

            <section className="border-b border-[#E0DDD4] bg-white">

                <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-8">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                        <div>

                            <p className="text-[#9A8654] text-sm uppercase tracking-[0.3em] font-semibold">
                                ZESTRO Restaurant
                            </p>

                            <h1 className="text-3xl md:text-4xl font-bold text-[#252525] mt-2">
                                Owner Dashboard
                            </h1>

                            <p className="text-[#6F6B62] mt-2">
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

                                <p className="text-xs text-[#8C877C]">
                                    Logged in as
                                </p>

                                <p className="font-semibold text-[#252525]">
                                    Owner
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                DASHBOARD CONTENT
            ========================================== */}

            <main className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-8 md:py-10">


                {/* ==========================================
                    STATISTICS
                ========================================== */}

                <div className="
                    grid
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                ">

                    {stats.map((stat) => (

                        <div
                            key={stat.title}
                            className="
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

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm text-[#8C877C]">
                                        {stat.title}
                                    </p>

                                    <h2 className="
                                        text-3xl
                                        font-bold
                                        text-[#252525]
                                        mt-2
                                    ">
                                        {stat.value}
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
                                    {stat.icon}
                                </div>

                            </div>

                            <p className="text-xs text-[#8C877C] mt-5">
                                {stat.description}
                            </p>

                        </div>

                    ))}

                </div>


                {/* ==========================================
                    ORDER STATUS OVERVIEW
                ========================================== */}

                <div className="grid lg:grid-cols-2 gap-6 mt-8">


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

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-[#9A8654] text-xs uppercase tracking-[0.2em] font-semibold">
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

                            <FaClipboardList className="text-[#9A8654] text-xl" />

                        </div>


                        <div className="grid sm:grid-cols-3 gap-4 mt-7">

                            <div className="
                                bg-[#FFF8E8]
                                rounded-2xl
                                p-5
                                border
                                border-[#EFE3C4]
                            ">

                                <FaClock className="text-[#9A8654]" />

                                <p className="text-2xl font-bold text-[#252525] mt-3">
                                    0
                                </p>

                                <p className="text-sm text-[#6F6B62] mt-1">
                                    Pending
                                </p>

                            </div>


                            <div className="
                                bg-[#F3F0E8]
                                rounded-2xl
                                p-5
                                border
                                border-[#DED8C9]
                            ">

                                <FaUtensils className="text-[#9A8654]" />

                                <p className="text-2xl font-bold text-[#252525] mt-3">
                                    0
                                </p>

                                <p className="text-sm text-[#6F6B62] mt-1">
                                    Preparing
                                </p>

                            </div>


                            <div className="
                                bg-[#EEF5EE]
                                rounded-2xl
                                p-5
                                border
                                border-[#D9E7D9]
                            ">

                                <FaCheckCircle className="text-[#6E8B6E]" />

                                <p className="text-2xl font-bold text-[#252525] mt-3">
                                    0
                                </p>

                                <p className="text-sm text-[#6F6B62] mt-1">
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

                        <p className="text-[#C8B77F] text-xs uppercase tracking-[0.2em] font-semibold">
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


                        <div className="grid grid-cols-2 gap-4 mt-7">

                            <div className="
                                bg-white/10
                                rounded-2xl
                                p-4
                            ">

                                <p className="text-2xl font-bold">
                                    10
                                </p>

                                <p className="text-white/60 text-sm mt-1">
                                    Tables
                                </p>

                            </div>


                            <div className="
                                bg-white/10
                                rounded-2xl
                                p-4
                            ">

                                <p className="text-2xl font-bold">
                                    0
                                </p>

                                <p className="text-white/60 text-sm mt-1">
                                    Foods
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==========================================
                    QUICK ACTIONS
                ========================================== */}

                <section className="mt-8">

                    <div className="mb-5">

                        <p className="text-[#9A8654] text-xs uppercase tracking-[0.2em] font-semibold">
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

                        {quickActions.map((action) => (

                            <a
                                key={action.title}
                                href={action.path}
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

                                <div className="flex items-center justify-between">

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
                                        {action.icon}
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
                                    {action.title}
                                </h3>


                                <p className="
                                    text-sm
                                    text-[#8C877C]
                                    mt-2
                                    leading-6
                                ">
                                    {action.description}
                                </p>

                            </a>

                        ))}

                    </div>

                </section>


                {/* ==========================================
                    RECENT ORDERS
                ========================================== */}

                <section className="mt-8">

                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-6
                        md:p-7
                        shadow-sm
                    ">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-[#9A8654] text-xs uppercase tracking-[0.2em] font-semibold">
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

                            <FaClipboardList className="text-[#9A8654] text-xl" />

                        </div>


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

                            <p className="font-semibold text-[#252525] mt-5">
                                No recent orders
                            </p>

                            <p className="text-sm mt-2">
                                New customer orders will appear here.
                            </p>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
};

export default AdminDashboard;


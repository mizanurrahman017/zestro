import React, { useEffect, useState } from "react";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";

import {
    FaTable,
    FaPlus,
    FaCheckCircle,
    FaQrcode,
} from "react-icons/fa";

import { db, auth } from "../../../Firebase/Firebase.init";


const ManageTables = () => {

    const [tables, setTables] = useState([]);
    const [restaurantId, setRestaurantId] = useState("");

    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ==========================================
    // LOAD RESTAURANT + TABLES
    // ==========================================

    useEffect(() => {

        const loadTables = async () => {

            try {

                setLoading(true);
                setError("");

                const user = auth.currentUser;

                if (!user) {
                    setError("You are not logged in.");
                    return;
                }


                // Get current user document

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

                    return;
                }


                const userData = userSnap.data();

                const currentRestaurantId =
                    userData.restaurantId;


                if (!currentRestaurantId) {

                    setError(
                        "Restaurant information not found."
                    );

                    return;
                }


                setRestaurantId(
                    currentRestaurantId
                );


                // ==================================
                // GET TABLES
                // ==================================

                const tablesQuery = query(
                    collection(db, "tables"),
                    where(
                        "restaurantId",
                        "==",
                        currentRestaurantId
                    )
                );


                const tablesSnap =
                    await getDocs(tablesQuery);


                const tableList =
                    tablesSnap.docs.map(
                        (table) => ({
                            id: table.id,
                            ...table.data(),
                        })
                    );


                // Sort by table number

                tableList.sort(
                    (a, b) =>
                        Number(a.tableNumber) -
                        Number(b.tableNumber)
                );


                setTables(tableList);


            } catch (error) {

                console.error(
                    "Load tables error:",
                    error
                );

                setError(
                    "Failed to load tables."
                );

            } finally {

                setLoading(false);

            }

        };


        loadTables();

    }, []);


    // ==========================================
    // CREATE 10 TABLES
    // ==========================================

    const handleCreateTables = async () => {

        if (!restaurantId) {

            setError(
                "Restaurant ID not found."
            );

            return;
        }


        try {

            setCreating(true);

            setError("");
            setSuccess("");


            const tablePromises = [];


            for (
                let tableNumber = 1;
                tableNumber <= 10;
                tableNumber++
            ) {

                const tableId =
                    `table-${tableNumber}`;


                const tableRef = doc(
                    db,
                    "tables",
                    `${restaurantId}_${tableId}`
                );


                tablePromises.push(

                    setDoc(
                        tableRef,
                        {
                            restaurantId:
                                restaurantId,

                            tableId:
                                tableId,

                            tableNumber:
                                tableNumber,

                            name:
                                `Table ${tableNumber}`,

                            status:
                                "available",

                            createdAt:
                                serverTimestamp(),
                        },
                        {
                            merge: true,
                        }
                    )

                );

            }


            await Promise.all(
                tablePromises
            );


            // Reload tables

            const tablesQuery = query(
                collection(db, "tables"),
                where(
                    "restaurantId",
                    "==",
                    restaurantId
                )
            );


            const tablesSnap =
                await getDocs(tablesQuery);


            const tableList =
                tablesSnap.docs.map(
                    (table) => ({
                        id: table.id,
                        ...table.data(),
                    })
                );


            tableList.sort(
                (a, b) =>
                    Number(a.tableNumber) -
                    Number(b.tableNumber)
            );


            setTables(tableList);


            setSuccess(
                "10 tables created successfully!"
            );


        } catch (error) {

            console.error(
                "Create tables error:",
                error
            );

            setError(
                "Failed to create tables."
            );

        } finally {

            setCreating(false);

        }

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

                <span className="
                    loading
                    loading-spinner
                    loading-lg
                    text-[#252525]
                "></span>

            </div>

        );

    }


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <div className="
            min-h-screen
            bg-[#F7F5EF]
            p-5
            md:p-8
            lg:p-10
        ">

            <div className="
                max-w-7xl
                mx-auto
            ">


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-5
                    mb-8
                ">


                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <div className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-[#252525]
                            text-white
                            flex
                            items-center
                            justify-center
                        ">

                            <FaTable />

                        </div>


                        <div>

                            <h1 className="
                                text-3xl
                                md:text-4xl
                                font-bold
                                text-[#252525]
                            ">

                                Manage Tables

                            </h1>


                            <p className="
                                mt-1
                                text-[#6F6B62]
                            ">

                                Manage your restaurant tables
                                and QR codes.

                            </p>

                        </div>

                    </div>


                    {/* CREATE TABLE BUTTON */}

                    <button
                        onClick={
                            handleCreateTables
                        }
                        disabled={creating}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            px-6
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

                        <FaPlus />

                        {creating
                            ? "Creating Tables..."
                            : tables.length >= 10
                                ? "Reset / Update Tables"
                                : "Create 10 Tables"
                        }

                    </button>

                </div>


                {/* ==================================
                    SUCCESS
                ================================== */}

                {success && (

                    <div className="
                        mb-6
                        bg-green-50
                        border
                        border-green-200
                        text-green-700
                        px-5
                        py-4
                        rounded-xl
                        flex
                        items-center
                        gap-3
                    ">

                        <FaCheckCircle />

                        {success}

                    </div>

                )}


                {/* ==================================
                    ERROR
                ================================== */}

                {error && (

                    <div className="
                        mb-6
                        bg-red-50
                        border
                        border-red-200
                        text-red-600
                        px-5
                        py-4
                        rounded-xl
                    ">

                        {error}

                    </div>

                )}


                {/* ==================================
                    RESTAURANT INFO
                ================================== */}

                <div className="
                    bg-white
                    border
                    border-[#E0DDD4]
                    rounded-3xl
                    p-6
                    mb-8
                    shadow-sm
                ">

                    <p className="
                        text-sm
                        text-[#8C877C]
                    ">

                        Restaurant ID

                    </p>


                    <p className="
                        mt-2
                        font-semibold
                        text-[#252525]
                        break-all
                    ">

                        {restaurantId}

                    </p>

                </div>


                {/* ==================================
                    TABLE COUNT
                ================================== */}

                <div className="
                    grid
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-5
                    mb-8
                ">


                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-6
                        shadow-sm
                    ">

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

                            10

                        </h2>

                    </div>


                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-6
                        shadow-sm
                    ">

                        <p className="
                            text-sm
                            text-[#8C877C]
                        ">

                            Created

                        </p>


                        <h2 className="
                            text-3xl
                            font-bold
                            text-[#252525]
                            mt-2
                        ">

                            {tables.length}

                        </h2>

                    </div>


                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-6
                        shadow-sm
                    ">

                        <p className="
                            text-sm
                            text-[#8C877C]
                        ">

                            Available

                        </p>


                        <h2 className="
                            text-3xl
                            font-bold
                            text-green-600
                            mt-2
                        ">

                            {
                                tables.filter(
                                    (table) =>
                                        table.status ===
                                        "available"
                                ).length
                            }

                        </h2>

                    </div>


                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-6
                        shadow-sm
                    ">

                        <p className="
                            text-sm
                            text-[#8C877C]
                        ">

                            QR Ready

                        </p>


                        <h2 className="
                            text-3xl
                            font-bold
                            text-[#9A8654]
                            mt-2
                        ">

                            {tables.length}

                        </h2>

                    </div>

                </div>


                {/* ==================================
                    TABLE GRID
                ================================== */}

                {tables.length === 0 ? (

                    <div className="
                        bg-white
                        border
                        border-[#E0DDD4]
                        rounded-3xl
                        p-12
                        text-center
                        shadow-sm
                    ">

                        <div className="
                            w-20
                            h-20
                            mx-auto
                            rounded-full
                            bg-[#E8E4D9]
                            text-[#9A8654]
                            flex
                            items-center
                            justify-center
                            text-3xl
                            mb-5
                        ">

                            <FaTable />

                        </div>


                        <h2 className="
                            text-2xl
                            font-bold
                            text-[#252525]
                        ">

                            No Tables Created

                        </h2>


                        <p className="
                            text-[#8C877C]
                            mt-2
                        ">

                            Create 10 tables to start
                            generating QR codes.

                        </p>


                        <button
                            onClick={
                                handleCreateTables
                            }
                            disabled={creating}
                            className="
                                mt-6
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

                            {creating
                                ? "Creating..."
                                : "Create 10 Tables"
                            }

                        </button>

                    </div>

                ) : (

                    <div className="
                        grid
                        sm:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-5
                        gap-6
                    ">

                        {tables.map(
                            (table) => (

                                <div
                                    key={table.id}
                                    className="
                                        bg-white
                                        border
                                        border-[#E0DDD4]
                                        rounded-3xl
                                        p-6
                                        shadow-sm
                                        hover:shadow-xl
                                        transition-all
                                        duration-300
                                    "
                                >


                                    {/* ICON */}

                                    <div className="
                                        w-14
                                        h-14
                                        rounded-2xl
                                        bg-[#E8E4D9]
                                        text-[#9A8654]
                                        flex
                                        items-center
                                        justify-center
                                        text-xl
                                    ">

                                        <FaTable />

                                    </div>


                                    {/* TABLE NAME */}

                                    <h2 className="
                                        text-xl
                                        font-bold
                                        text-[#252525]
                                        mt-5
                                    ">

                                        {table.name ||
                                            `Table ${table.tableNumber}`
                                        }

                                    </h2>


                                    {/* TABLE ID */}

                                    <p className="
                                        text-sm
                                        text-[#8C877C]
                                        mt-1
                                    ">

                                        {table.tableId}

                                    </p>


                                    {/* STATUS */}

                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                        mt-5
                                    ">

                                        <span className="
                                            w-2.5
                                            h-2.5
                                            rounded-full
                                            bg-green-500
                                        "></span>


                                        <span className="
                                            text-sm
                                            font-semibold
                                            text-green-600
                                        ">

                                            {table.status ||
                                                "available"
                                            }

                                        </span>

                                    </div>


                                    {/* QR BUTTON */}

                                    <button
                                        className="
                                            w-full
                                            mt-5
                                            py-3
                                            rounded-xl
                                            border
                                            border-[#D8D3C6]
                                            text-[#252525]
                                            font-semibold
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            hover:bg-[#E8E4D9]
                                            transition
                                        "
                                    >

                                        <FaQrcode />

                                        QR Code

                                    </button>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>

    );

};

export default ManageTables;


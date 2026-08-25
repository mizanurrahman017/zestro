import React, { useEffect, useRef, useState } from "react";
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    getDoc,
} from "firebase/firestore";

import { QRCodeCanvas } from "qrcode.react";

import {
    FaQrcode,
    FaDownload,
    FaTable,
    FaCopy,
    FaCheck,
} from "react-icons/fa";

import { db, auth } from "../../../Firebase/Firebase.init";

const QRCodeManager = () => {
    const [restaurantId, setRestaurantId] = useState("");
    const [tables, setTables] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copiedId, setCopiedId] = useState(null);

    // ==========================================
    // LOAD RESTAURANT + TABLES
    // ==========================================

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError("");

                const user = auth.currentUser;

                if (!user) {
                    setError("You are not logged in.");
                    return;
                }

                // Get logged-in user's data
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    setError("User information not found.");
                    return;
                }

                const userData = userSnap.data();

                const currentRestaurantId = userData.restaurantId;

                if (!currentRestaurantId) {
                    setError("Restaurant information not found.");
                    return;
                }

                setRestaurantId(currentRestaurantId);

                // ==========================================
                // LOAD TABLES
                // ==========================================

                const tablesQuery = query(
                    collection(db, "tables"),
                    where(
                        "restaurantId",
                        "==",
                        currentRestaurantId
                    )
                );

                const tablesSnap = await getDocs(tablesQuery);

                const tableList = tablesSnap.docs
                    .map((tableDoc) => ({
                        id: tableDoc.id,
                        ...tableDoc.data(),
                    }))
                    .sort(
                        (a, b) =>
                            Number(a.tableNumber || 0) -
                            Number(b.tableNumber || 0)
                    );

                setTables(tableList);
            } catch (error) {
                console.error(
                    "Load QR tables error:",
                    error
                );

                setError(
                    "Failed to load tables. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // ==========================================
    // QR URL
    // ==========================================

    const getQRUrl = (table) => {
        const baseUrl = window.location.origin;

        return `${baseUrl}/menu/${restaurantId}?table=${table.tableNumber}`;
    };

    // ==========================================
    // DOWNLOAD QR
    // ==========================================

    const handleDownload = (table) => {
        const canvas = document.getElementById(
            `qr-${table.id}`
        );

        if (!canvas) {
            return;
        }

        const padding = 40;

        const qrSize = canvas.width;

        const downloadCanvas =
            document.createElement("canvas");

        downloadCanvas.width =
            qrSize + padding * 2;

        downloadCanvas.height =
            qrSize + padding * 2 + 90;

        const context =
            downloadCanvas.getContext("2d");

        // Background
        context.fillStyle = "#ffffff";

        context.fillRect(
            0,
            0,
            downloadCanvas.width,
            downloadCanvas.height
        );

        // QR
        context.drawImage(
            canvas,
            padding,
            padding
        );

        // Table text
        context.fillStyle = "#252525";

        context.font =
            "bold 26px Arial";

        context.textAlign = "center";

        context.fillText(
            `Table ${table.tableNumber}`,
            downloadCanvas.width / 2,
            qrSize + padding + 45
        );

        // Download
        const link =
            document.createElement("a");

        link.download =
            `Zestro-Table-${table.tableNumber}-QR.png`;

        link.href =
            downloadCanvas.toDataURL(
                "image/png"
            );

        link.click();
    };

    // ==========================================
    // COPY URL
    // ==========================================

    const handleCopy = async (table) => {
        try {
            await navigator.clipboard.writeText(
                getQRUrl(table)
            );

            setCopiedId(table.id);

            setTimeout(() => {
                setCopiedId(null);
            }, 2000);
        } catch (error) {
            console.error(
                "Copy URL error:",
                error
            );
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-[#252525]"></span>

                    <p className="mt-4 text-[#6F6B62]">
                        Loading QR codes...
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
            <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center px-5">
                <div className="bg-white border border-red-200 rounded-3xl p-8 text-center max-w-md">
                    <div className="text-5xl mb-4">
                        ⚠️
                    </div>

                    <h2 className="text-2xl font-bold text-[#252525]">
                        Something went wrong
                    </h2>

                    <p className="text-red-500 mt-3">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="min-h-screen bg-[#F7F5EF] p-5 md:p-8 lg:p-10">
            <div className="max-w-7xl mx-auto">

                {/* ==================================
                    HEADER
                ================================== */}

                <div className="mb-10">

                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-[#252525] text-white flex items-center justify-center text-xl">
                            <FaQrcode />
                        </div>

                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#252525]">
                                QR Code Manager
                            </h1>

                            <p className="text-[#6F6B62] mt-1">
                                Manage QR codes for your restaurant tables.
                            </p>
                        </div>

                    </div>

                </div>

                {/* ==================================
                    INFO
                ================================== */}

                <div className="bg-white border border-[#E0DDD4] rounded-3xl p-6 md:p-7 mb-8 shadow-sm">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-xl bg-[#E8E4D9] text-[#9A8654] flex items-center justify-center">
                                <FaTable />
                            </div>

                            <div>
                                <h2 className="font-bold text-[#252525]">
                                    Restaurant Tables
                                </h2>

                                <p className="text-sm text-[#8C877C] mt-1">
                                    Each table has its own QR code.
                                </p>
                            </div>

                        </div>

                        <div className="px-5 py-3 rounded-xl bg-[#F7F5EF] text-[#252525] font-bold">
                            {tables.length} Tables
                        </div>

                    </div>

                </div>

                {/* ==================================
                    NO TABLE
                ================================== */}

                {tables.length === 0 ? (

                    <div className="bg-white border border-[#E0DDD4] rounded-3xl p-12 text-center">

                        <div className="text-6xl mb-5">
                            🪑
                        </div>

                        <h2 className="text-2xl font-bold text-[#252525]">
                            No Tables Found
                        </h2>

                        <p className="text-[#6F6B62] mt-2">
                            Please create your restaurant tables first.
                        </p>

                    </div>

                ) : (

                    /* ==================================
                       QR GRID
                    ================================== */

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                        {tables.map((table) => (

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

                                {/* TABLE HEADER */}

                                <div className="flex items-center justify-between mb-5">

                                    <div>

                                        <p className="text-xs uppercase tracking-[0.2em] text-[#9A8654] font-semibold">
                                            ZESTRO
                                        </p>

                                        <h2 className="text-2xl font-bold text-[#252525] mt-1">
                                            Table {table.tableNumber}
                                        </h2>

                                    </div>

                                    <div className="w-10 h-10 rounded-xl bg-[#F7F5EF] text-[#9A8654] flex items-center justify-center">
                                        <FaTable />
                                    </div>

                                </div>

                                {/* QR */}

                                <div className="bg-white border border-[#E8E4D9] rounded-2xl p-4 flex justify-center">

                                    <QRCodeCanvas
                                        id={`qr-${table.id}`}
                                        value={getQRUrl(table)}
                                        size={190}
                                        bgColor="#ffffff"
                                        fgColor="#252525"
                                        level="H"
                                        includeMargin={true}
                                    />

                                </div>

                                {/* SCAN TEXT */}

                                <div className="text-center mt-5">

                                    <p className="font-semibold text-[#252525]">
                                        Scan to View Menu
                                    </p>

                                    <p className="text-xs text-[#8C877C] mt-1 break-all">
                                        {getQRUrl(table)}
                                    </p>

                                </div>

                                {/* ACTIONS */}

                                <div className="grid grid-cols-2 gap-3 mt-5">

                                    <button
                                        onClick={() =>
                                            handleDownload(table)
                                        }
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            py-3
                                            rounded-xl
                                            bg-[#252525]
                                            text-white
                                            font-semibold
                                            hover:bg-[#9A8654]
                                            transition
                                        "
                                    >
                                        <FaDownload />
                                        Download
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleCopy(table)
                                        }
                                        className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
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

                                        {copiedId === table.id ? (
                                            <>
                                                <FaCheck />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <FaCopy />
                                                Copy Link
                                            </>
                                        )}

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>
        </div>
    );
};

export default QRCodeManager;
import React from "react";

import {
    createBrowserRouter,
} from "react-router";

import RootLayout from "../Layout/RootLayout";


// ==========================================
// HOME
// ==========================================

import Home from "../Pages/Home/Home/Home";


// ==========================================
// AUTH
// ==========================================

import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";


// ==========================================
// CUSTOMER
// ==========================================

import Menu from "../Pages/Customer/Menu/Menu";
import Cart from "../Pages/Customer/Cart/Cart";
import OrderTracking from "../Pages/Customer/OrderTracking/OrderTracking";


// ==========================================
// ADMIN
// ==========================================

import AdminDashboard from "../Pages/Admin/Dashboard/AdminDashboard";
import ManageFoods from "../Pages/Admin/Food/ManageFoods";
import ManageTables from "../Pages/Admin/Table/ManageTables";
import QRCodeManager from "../Pages/Admin/QR/QRCodeManager";


// ==========================================
// KITCHEN
// ==========================================

import KitchenDashboard from "../Pages/Admin/Kitchen/KitchenDashboard/KitchenDashboard";


// ==========================================
// PRIVATE ROUTE
// ==========================================

import PrivateRoute from "./PrivateRoute";


// ==========================================
// ROUTER
// ==========================================

export const router = createBrowserRouter([

    {
        path: "/",

        Component: RootLayout,

        children: [

            // ==================================
            // HOME
            // ==================================

            {
                index: true,
                Component: Home,
            },


            // ==================================
            // AUTH
            // ==================================

            {
                path: "login",
                Component: Login,
            },

            {
                path: "register",
                Component: Register,
            },


            // ==================================
            // MENU
            // ==================================

            {
                path: "menu/:restaurantId/:tableId",
                Component: Menu,
            },

            {
                path: "menu/:restaurantId",
                Component: Menu,
            },

            {
                path: "menu",
                Component: Menu,
            },


            // ==================================
            // CART
            // ==================================

            {
                path: "cart",
                Component: Cart,
            },


            // ==================================
            // ORDER TRACKING
            // ==================================

            {
                path: "order/:orderId",
                Component: OrderTracking,
            },


            // ==================================
            // ADMIN DASHBOARD
            // OWNER ONLY
            // ==================================

            {
                path: "admin/dashboard",

                element: (
                    <PrivateRoute
                        allowedRole="owner"
                    >
                        <AdminDashboard />
                    </PrivateRoute>
                ),

            },


            // ==================================
            // MANAGE FOODS
            // ==================================

            {
                path: "admin/foods",

                element: (
                    <PrivateRoute
                        allowedRole="owner"
                    >
                        <ManageFoods />
                    </PrivateRoute>
                ),

            },


            // ==================================
            // MANAGE TABLES
            // ==================================

            {
                path: "admin/tables",

                element: (
                    <PrivateRoute
                        allowedRole="owner"
                    >
                        <ManageTables />
                    </PrivateRoute>
                ),

            },


            // ==================================
            // QR CODES
            // ==================================

            {
                path: "admin/qr-codes",

                element: (
                    <PrivateRoute
                        allowedRole="owner"
                    >
                        <QRCodeManager />
                    </PrivateRoute>
                ),

            },


            // ==================================
            // KITCHEN
            // ==================================

            {
                path: "kitchen",

                element: (
                    <PrivateRoute
                        allowedRole="kitchen"
                    >
                        <KitchenDashboard />
                    </PrivateRoute>
                ),

            },

        ],

    },

]);
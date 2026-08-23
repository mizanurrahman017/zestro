import { createBrowserRouter } from "react-router";

import RootLayout from "../Layout/RootLayout";

// Home
import Home from "../Pages/Home/Home/Home";

// Auth
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";

// Customer
import Menu from "../Pages/Customer/Menu/Menu";
import Cart from "../Pages/Customer/Cart/Cart";
import OrderTracking from "../Pages/Customer/OrderTracking/OrderTracking";

// Admin
import AdminDashboard from "../Pages/Admin/Dashboard/AdminDashboard";
import ManageFoods from "../Pages/Admin/Food/ManageFoods";
import ManageTables from "../Pages/Admin/Table/ManageTables";
import QRCodeManager from "../Pages/Admin/QR/QRCodeManager";

// Kitchen
import KitchenDashboard from "../Pages/Admin/Kitchen/KitchenDashboard/KitchenDashboard";

// Private Route
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,

    children: [

      // =========================
      // Home
      // =========================
      {
        index: true,
        Component: Home,
      },


      // =========================
      // Authentication
      // =========================
      {
        path: "login",
        Component: Login,
      },

      {
        path: "register",
        Component: Register,
      },


      // =========================
      // Customer
      // =========================
      {
        path: "menu/:restaurantId/:tableId",
        Component: Menu,
      },

      {
        path: "cart",
        Component: Cart,
      },

      {
        path: "order/:orderId",
        Component: OrderTracking,
      },


      // =========================
      // Admin
      // Only OWNER can access
      // =========================

      {
        path: "admin/dashboard",
        element: (
          <PrivateRoute allowedRole="owner">
            <AdminDashboard />
          </PrivateRoute>
        ),
      },

      {
        path: "admin/foods",
        element: (
          <PrivateRoute allowedRole="owner">
            <ManageFoods />
          </PrivateRoute>
        ),
      },

      {
        path: "admin/tables",
        element: (
          <PrivateRoute allowedRole="owner">
            <ManageTables />
          </PrivateRoute>
        ),
      },

      {
        path: "admin/qr-codes",
        element: (
          <PrivateRoute allowedRole="owner">
            <QRCodeManager />
          </PrivateRoute>
        ),
      },


      // =========================
      // Kitchen
      // Only KITCHEN can access
      // =========================

      {
        path: "kitchen",
        element: (
          <PrivateRoute allowedRole="kitchen">
            <KitchenDashboard />
          </PrivateRoute>
        ),
      },

    ],
  },
]);
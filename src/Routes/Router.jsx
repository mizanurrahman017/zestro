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


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,

    children: [

      // Home
      {
        index: true,
        Component: Home,
      },

      // Auth
      {
        path: "login",
        Component: Login,
      },

      {
        path: "register",
        Component: Register,
      },

      // Customer
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

      // Admin
      {
        path: "admin/dashboard",
        Component: AdminDashboard,
      },

      {
        path: "admin/foods",
        Component: ManageFoods,
      },

      {
        path: "admin/tables",
        Component: ManageTables,
      },

      {
        path: "admin/qr-codes",
        Component: QRCodeManager,
      },

      // Kitchen
      {
        path: "kitchen",
        Component: KitchenDashboard,
      },
    ],
  },
]);
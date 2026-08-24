import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";

import "./index.css";
import { router } from "./Routes/Router.jsx";

import AuthProvider from "./Contexts/AuthContext/AuthProvider.jsx";
import CartProvider from "./Contexts/CartContext/CartProvider.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <CartProvider>
                <RouterProvider router={router} />
            </CartProvider>
        </AuthProvider>
    </StrictMode>
);
import React, { useEffect, useState } from "react";
import CartContext from "./CartContext";

const CartProvider = ({ children }) => {

    // ==========================================
    // LOAD CART FROM LOCAL STORAGE
    // ==========================================

    const [cartItems, setCartItems] = useState(() => {

        try {

            const savedCart = localStorage.getItem("zestro_cart");

            return savedCart
                ? JSON.parse(savedCart)
                : [];

        } catch (error) {

            console.error(
                "Failed to load cart:",
                error
            );

            return [];

        }

    });


    // ==========================================
    // SAVE CART TO LOCAL STORAGE
    // ==========================================

    useEffect(() => {

        try {

            localStorage.setItem(
                "zestro_cart",
                JSON.stringify(cartItems)
            );

        } catch (error) {

            console.error(
                "Failed to save cart:",
                error
            );

        }

    }, [cartItems]);


    // ==========================================
    // ADD TO CART
    // ==========================================

    const addToCart = (food) => {

        setCartItems((prevItems) => {

            const existingItem = prevItems.find(
                (item) => item.id === food.id
            );


            // ==================================
            // FOOD ALREADY EXISTS
            // ==================================

            if (existingItem) {

                return prevItems.map((item) =>

                    item.id === food.id

                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }

                        : item

                );

            }


            // ==================================
            // NEW FOOD
            // ==================================

            return [

                ...prevItems,

                {
                    ...food,
                    quantity: 1,
                },

            ];

        });

    };


    // ==========================================
    // REMOVE FROM CART
    // ==========================================

    const removeFromCart = (foodId) => {

        setCartItems((prevItems) =>

            prevItems.filter(
                (item) => item.id !== foodId
            )

        );

    };


    // ==========================================
    // INCREASE QUANTITY
    // ==========================================

    const increaseQuantity = (foodId) => {

        setCartItems((prevItems) =>

            prevItems.map((item) =>

                item.id === foodId

                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }

                    : item

            )

        );

    };


    // ==========================================
    // DECREASE QUANTITY
    // ==========================================

    const decreaseQuantity = (foodId) => {

        setCartItems((prevItems) =>

            prevItems

                .map((item) =>

                    item.id === foodId

                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }

                        : item

                )

                .filter(
                    (item) => item.quantity > 0
                )

        );

    };


    // ==========================================
    // CLEAR CART
    // ==========================================

    const clearCart = () => {

        setCartItems([]);

    };


    // ==========================================
    // CART COUNT
    // ==========================================

    const cartCount = cartItems.reduce(

        (total, item) =>
            total + Number(item.quantity || 0),

        0

    );


    // ==========================================
    // CART TOTAL
    // ==========================================

    const cartTotal = cartItems.reduce(

        (total, item) =>

            total +
            Number(item.price || 0) *
            Number(item.quantity || 0),

        0

    );


    // ==========================================
    // CART CONTEXT DATA
    // ==========================================

    const cartInfo = {

        cartItems,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

        cartCount,

        cartTotal,

    };


    // ==========================================
    // PROVIDER
    // ==========================================

    return (

        <CartContext.Provider value={cartInfo}>

            {children}

        </CartContext.Provider>

    );

};

export default CartProvider;

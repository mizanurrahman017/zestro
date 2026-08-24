import React, { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (food) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.id === food.id
            );

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

            return [
                ...prevItems,
                {
                    ...food,
                    quantity: 1,
                },
            ];
        });
    };

    const removeFromCart = (foodId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== foodId)
        );
    };

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
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

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

    return (
        <CartContext.Provider value={cartInfo}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
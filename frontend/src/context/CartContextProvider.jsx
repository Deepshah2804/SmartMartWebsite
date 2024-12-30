import React, { useState, useContext, useEffect } from "react";
import CartContext from "./CartContext";

const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : []; // Load cart from local storage
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Save cart to local storage
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, totalPrice: product.price * product.quantity }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const updateCartItem = (itemId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const resetCart = () => {
        setCartItems([]);
    };


    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem ,resetCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;

export const useCart = () => {
    return useContext(CartContext);
};

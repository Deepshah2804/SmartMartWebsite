// PaymentGateway.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContextProvider';

const PaymentGateway = () => {
    const [paymentProcessing, setPaymentProcessing] = useState(true);
    const navigate = useNavigate();
    const { resetCart } = useCart();

    useEffect(() => {
        // Simulate a delay for payment processing (e.g., 3 seconds)
        const timer = setTimeout(() => {
            setPaymentProcessing(false);
            // Once payment is done, reset the cart and redirect to the home page
            resetCart();
            alert('Payment successful!');
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer); // Clean up timer on unmount
    }, [navigate, resetCart]);

    return (
        <div className="container mx-auto py-8 text-center">
            {paymentProcessing ? (
                <>
                    <h2 className="text-2xl font-bold mb-4">Processing Payment...</h2>
                    <div className="loader"> {/* You can add CSS for a loader/spinner */}</div>
                </>
            ) : (
                <h2 className="text-2xl font-bold mb-4">Payment Completed!</h2>
            )}
        </div>
    );
};

export default PaymentGateway;

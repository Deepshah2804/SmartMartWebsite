import React, { useState } from 'react';
import { useCart } from '../context/CartContextProvider';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, updateCartItem, removeFromCart } = useCart();
    const navigate = useNavigate();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [errors, setErrors] = useState({});
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        nameOnCard: '',
        expiryDate: '',
        cvv: '',
        upiId: '',
        bank: '',
        accountNumber: '',
    });

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity === '') {
            updateCartItem(itemId, '');
        } else {
            const updatedQuantity = Math.max(parseInt(newQuantity) || 1, 1);
            updateCartItem(itemId, updatedQuantity);
        }
    };

    const handleQuantityBlur = (itemId, newQuantity) => {
        const updatedQuantity = newQuantity === '' || newQuantity < 1 ? 1 : newQuantity;
        updateCartItem(itemId, updatedQuantity);
    };

    const handlePlaceOrder = () => {
        setShowPaymentOptions(true);
    };

    const validatePaymentDetails = () => {
        const newErrors = {};

        if (selectedPaymentMethod === 'Credit Card' || selectedPaymentMethod === 'Debit Card') {
            if (!/^\d{16}$/.test(paymentDetails.cardNumber)) {
                newErrors.cardNumber = 'Card number must be 16 digits.';
            }
            if (!/^[A-Za-z\s]+$/.test(paymentDetails.nameOnCard)) {
                newErrors.nameOnCard = 'Name on card must only contain letters.';
            }
            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentDetails.expiryDate)) {
                newErrors.expiryDate = 'Expiry date must be in MM/YY format.';
            }
            if (!/^\d{3}$/.test(paymentDetails.cvv)) {
                newErrors.cvv = 'CVV must be 3 digits.';
            }
        }

        if (selectedPaymentMethod === 'UPI' && !/^[\w.-]+@[\w.-]+$/.test(paymentDetails.upiId)) {
            newErrors.upiId = 'Invalid UPI ID format (e.g., yourname@bank).';
        }

        if (selectedPaymentMethod === 'Net Banking') {
            if (!paymentDetails.bank) {
                newErrors.bank = 'Please select a bank.';
            }
            if (!/^\d+$/.test(paymentDetails.accountNumber)) {
                newErrors.accountNumber = 'Account number must be numeric.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePaymentSubmit = (event) => {
        event.preventDefault();
        if (!selectedPaymentMethod) {
            alert('Please select a payment method');
            return;
        }

        if (validatePaymentDetails()) {
            navigate('/payment');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
            {cartItems.length > 0 ? (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex justify-between items-center border-b py-2">
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p>Price: ₹{item.price}</p>
                                    <div className="flex items-center mt-2">
                                        <label htmlFor={`quantity-${item.id}`} className="mr-2">
                                            Quantity:
                                        </label>
                                        <input
                                            type="number"
                                            id={`quantity-${item.id}`}
                                            value={item.quantity === '' ? '' : item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            onBlur={(e) => handleQuantityBlur(item.id, parseInt(e.target.value))}
                                            className="w-16 p-2 border border-gray-300 rounded"
                                            min="1"
                                        />
                                    </div>
                                    <p>Total Price: ₹{item.price * (item.quantity || 1)}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-500 text-white py-2 px-4 rounded"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3 className="font-bold mt-4">Total Price: ₹{totalPrice}</h3>
                    <button
                        onClick={handlePlaceOrder}
                        className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
                    >
                        Place Order
                    </button>

                    {showPaymentOptions && (
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                {['Credit Card', 'Debit Card', 'UPI', 'Net Banking'].map((method) => (
                                    <button
                                        key={method}
                                        className={`py-3 px-6 rounded shadow-md transition-all duration-200 ease-in-out hover:shadow-lg border 
                                            ${selectedPaymentMethod === method ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                        onClick={() => setSelectedPaymentMethod(method)}
                                    >
                                        {method}
                                    </button>
                                ))}
                            </div>

                            {selectedPaymentMethod && (
                                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                    {(selectedPaymentMethod === 'Credit Card' ||
                                        selectedPaymentMethod === 'Debit Card') && (
                                            <>
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    placeholder="Card Number"
                                                    value={paymentDetails.cardNumber}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                                    required
                                                />
                                                {errors.cardNumber && (
                                                    <p className="text-red-500">{errors.cardNumber}</p>
                                                )}

                                                <input
                                                    type="text"
                                                    name="nameOnCard"
                                                    placeholder="Name on Card"
                                                    value={paymentDetails.nameOnCard}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                                    required
                                                />
                                                {errors.nameOnCard && (
                                                    <p className="text-red-500">{errors.nameOnCard}</p>
                                                )}

                                                <div className="flex space-x-4">
                                                    <input
                                                        type="text"
                                                        name="expiryDate"
                                                        placeholder="Expiry Date (MM/YY)"
                                                        value={paymentDetails.expiryDate}
                                                        onChange={handleInputChange}
                                                        className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                                        required
                                                    />
                                                    {errors.expiryDate && (
                                                        <p className="text-red-500">{errors.expiryDate}</p>
                                                    )}

                                                    <input
                                                        type="text"
                                                        name="cvv"
                                                        placeholder="CVV"
                                                        value={paymentDetails.cvv}
                                                        onChange={handleInputChange}
                                                        className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                                        required
                                                    />
                                                    {errors.cvv && <p className="text-red-500">{errors.cvv}</p>}
                                                </div>
                                            </>
                                        )}

                                    {selectedPaymentMethod === 'UPI' && (
                                        <>
                                            <input
                                                type="text"
                                                name="upiId"
                                                placeholder="UPI ID (e.g., yourname@bank)"
                                                value={paymentDetails.upiId}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                                required
                                            />
                                            {errors.upiId && <p className="text-red-500">{errors.upiId}</p>}
                                        </>
                                    )}

                                    {selectedPaymentMethod === 'Net Banking' && (
                                        <>
                                            <select
                                                name="bank"
                                                value={paymentDetails.bank}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                                required
                                            >
                                                <option value="">Select Bank</option>
                                                <option value="HDFC">HDFC Bank</option>
                                                <option value="ICICI">ICICI Bank</option>
                                                <option value="SBI">State Bank of India</option>
                                                <option value="Axis">Axis Bank</option>
                                            </select>
                                            {errors.bank && <p className="text-red-500">{errors.bank}</p>}

                                            <input
                                                type="text"
                                                name="accountNumber"
                                                placeholder="Account Number"
                                                value={paymentDetails.accountNumber}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                                required
                                            />
                                            {errors.accountNumber && (
                                                <p className="text-red-500">{errors.accountNumber}</p>
                                            )}
                                        </>
                                    )}

                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white py-3 px-4 rounded w-full hover:bg-green-700 transition-all"
                                    >
                                        Confirm Payment
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;

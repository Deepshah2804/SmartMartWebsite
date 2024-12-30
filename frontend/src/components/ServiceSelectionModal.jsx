import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceSelectionModal = ({ onClose = () => { } }) => {
    const navigate = useNavigate();

    const handleSelectService = (service) => {
        onClose(); // Close the modal
        if (service === 'products') {
            navigate('/Customer/Dashboard/buyproducts'); // Redirect to the products page
        } else if (service === 'tiffins') {
            navigate('/Customer/Dashboard/gettiffinservice'); // Redirect to the tiffin services page
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Choose a Service</h2>
                <button
                    onClick={() => handleSelectService('products')}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                    Buy Products
                </button>
                <button
                    onClick={() => handleSelectService('tiffins')}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Get Tiffin Service
                </button>
            </div>
        </div>
    );
};

export default ServiceSelectionModal;

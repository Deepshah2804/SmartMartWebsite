// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CustomerDashboardGetTiffinService = () => {
//     const [tiffinServices, setTiffinServices] = useState([]);
//     const [selectedMeals, setSelectedMeals] = useState([]);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [paymentMethod, setPaymentMethod] = useState('Credit Card');
//     const [showPaymentOptions, setShowPaymentOptions] = useState(false);
//     const [searchTerm, setSearchTerm] = useState(''); // Search term state

//     useEffect(() => {
//         const fetchTiffinServices = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:8000/api/tiffin-services/');
//                 const servicesWithTotal = response.data.map(service => ({
//                     ...service,
//                     totalMenuPrice: service.meals.reduce((acc, meal) => acc + parseFloat(meal.price || 0), 0),
//                 }));
//                 setTiffinServices(servicesWithTotal);
//             } catch (error) {
//                 console.error('Error fetching tiffin services:', error);
//             }
//         };

//         fetchTiffinServices();
//     }, []);

//     const handleOrder = (meal) => {
//         const existingMeal = selectedMeals.find((selectedMeal) => selectedMeal.id === meal.id);
//         if (existingMeal) {
//             // Remove the selected meal
//             setSelectedMeals(selectedMeals.filter((selectedMeal) => selectedMeal.id !== meal.id));
//         } else {
//             // Add the meal as a new selection
//             setSelectedMeals([...selectedMeals, { ...meal, quantity: 1 }]);
//         }
//     };

//     const addAllMeals = (service) => {
//         const mealsToAdd = service.meals.filter(
//             (meal) => !selectedMeals.some((selectedMeal) => selectedMeal.id === meal.id)
//         );
//         setSelectedMeals([...selectedMeals, ...mealsToAdd.map((meal) => ({ ...meal, quantity: 1 }))]);
//     };

//     const handleRemoveAllMeals = (service) => {
//         const mealsToRemove = service.meals.map((meal) => meal.id);
//         setSelectedMeals(selectedMeals.filter((selectedMeal) => !mealsToRemove.includes(selectedMeal.id)));
//     };

//     useEffect(() => {
//         const total = selectedMeals.reduce((acc, meal) => acc + (parseFloat(meal.price || 0) * meal.quantity), 0);
//         setTotalPrice(total);
//     }, [selectedMeals]);

//     const handleQuantityChange = (meal, quantity) => {
//         if (quantity < 1) return;
//         const updatedMeals = selectedMeals.map((selectedMeal) => {
//             if (selectedMeal.id === meal.id) {
//                 return { ...selectedMeal, quantity };
//             }
//             return selectedMeal;
//         });
//         setSelectedMeals(updatedMeals);
//     };

//     const placeOrder = () => {
//         setShowPaymentOptions(true);
//     };

//     const handlePaymentSubmit = (event) => {
//         event.preventDefault();
//         alert(
//             `Order placed for ${selectedMeals.length} meals totaling ₹${totalPrice.toFixed(
//                 2
//             )} with payment via ${paymentMethod}`
//         );
//         setSelectedMeals([]);
//         setTotalPrice(0);
//         setShowPaymentOptions(false);
//     };

//     // Filter meals based on the search term
//     const filteredTiffinServices = tiffinServices.map((service) => ({
//         ...service,
//         meals: service.meals.filter((meal) =>
//             meal.name.toLowerCase().includes(searchTerm.toLowerCase())
//         ),
//     })).filter((service) => service.meals.length > 0);

//     return (
//         <>
//             <div className="container mx-auto px-4 py-8">
//                 <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Tiffin Services</h1>

//                 {/* Search Bar */}
//                 <div className="mb-4">
//                     <input
//                         type="text"
//                         placeholder="🔍 Search for meals..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-1/2 p-2 border border-gray-300 rounded"
//                     />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredTiffinServices.length === 0 ? (
//                         <p className="text-center text-gray-500">No meals found</p>
//                     ) : (
//                         filteredTiffinServices.map((service) => {
//                             const allMealsSelected = service.meals.every((meal) =>
//                                 selectedMeals.some((selectedMeal) => selectedMeal.id === meal.id)
//                             );

//                             return (
//                                 <div
//                                     key={service.id}
//                                     className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 duration-200"
//                                 >
//                                     <h2 className="text-xl font-semibold text-blue-600">{service.menu_name}</h2>
//                                     <p className="text-gray-600">{service.description}</p>
//                                     <h3 className="mt-4 font-bold">Meals:</h3>
//                                     <ul className="list-disc pl-5">
//                                         {service.meals.map((meal) => (
//                                             <li key={meal.id} className="mt-2 flex items-center justify-between">
//                                                 <div>
//                                                     <span className="font-semibold">{meal.name}</span> - ₹
//                                                     {(parseFloat(meal.price) || 0).toFixed(2)} ({meal.category})
//                                                 </div>
//                                                 <button
//                                                     onClick={() => handleOrder(meal)}
//                                                     className={`ml-2 rounded px-3 py-1 ${selectedMeals.some((selectedMeal) => selectedMeal.id === meal.id)
//                                                         ? 'bg-red-600'
//                                                         : 'bg-blue-500'
//                                                         } text-white hover:bg-blue-600 transition duration-200`}
//                                                 >
//                                                     {selectedMeals.some((selectedMeal) => selectedMeal.id === meal.id) ? 'Remove' : 'Add'}
//                                                 </button>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                     <div className="mt-4 font-bold">Total Price: ₹{service.totalMenuPrice.toFixed(2)}</div>
//                                     <button
//                                         onClick={() => addAllMeals(service)}
//                                         className={`mt-2 py-2 px-4 rounded transition duration-200 ${allMealsSelected ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 text-white'
//                                             }`}
//                                         disabled={allMealsSelected}
//                                     >
//                                         Add All Meals
//                                     </button>
//                                     {allMealsSelected && (
//                                         <button
//                                             onClick={() => handleRemoveAllMeals(service)}
//                                             className="mt-2 bg-red-600 text-white py-2 px-4 rounded transition duration-200"
//                                         >
//                                             Remove All Meals
//                                         </button>
//                                     )}
//                                 </div>
//                             );
//                         })
//                     )}
//                 </div>

//                 <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
//                     <h2 className="text-xl font-bold">Selected Meals</h2>
//                     <ul className="list-disc pl-5">
//                         {selectedMeals.map((meal) => (
//                             <li key={meal.id} className="mt-2 flex justify-between items-center">
//                                 <div>
//                                     {meal.name} - ₹{(parseFloat(meal.price) || 0).toFixed(2)} x
//                                     <input
//                                         type="number"
//                                         min="1"
//                                         value={meal.quantity}
//                                         onChange={(e) => handleQuantityChange(meal, parseInt(e.target.value))}
//                                         className="w-16 ml-2 border border-gray-300 rounded px-1"
//                                     />
//                                 </div>
//                                 <span>₹{(parseFloat(meal.price) * meal.quantity).toFixed(2)}</span>
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="mt-4 font-semibold text-lg">Total Price: ₹{totalPrice.toFixed(2)}</div>
//                     <button
//                         onClick={placeOrder}
//                         className={`mt-4 ${selectedMeals.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600'
//                             } text-white py-2 px-4 rounded transition duration-200`}
//                         disabled={selectedMeals.length === 0}
//                     >
//                         Place Order
//                     </button>

//                     {showPaymentOptions && selectedMeals.length > 0 && (
//                         <div className="mt-6 border-t pt-4">
//                             <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
//                             <div className="flex space-x-4 mb-4">
//                                 {['Credit Card', 'Debit Card', 'UPI', 'Net Banking'].map((method) => (
//                                     <button
//                                         key={method}
//                                         className={`py-2 px-4 rounded transition duration-200 ${paymentMethod === method ? 'bg-blue-600 text-white' : 'bg-gray-300 hover:bg-gray-400'
//                                             }`}
//                                         onClick={() => setPaymentMethod(method)}
//                                     >
//                                         {method}
//                                     </button>
//                                 ))}
//                             </div>

//                             <form onSubmit={handlePaymentSubmit} className="space-y-4">
//                                 {paymentMethod === 'Credit Card' && (
//                                     <>
//                                         <input
//                                             type="text"
//                                             placeholder="Card Number"
//                                             className="w-full p-2 border border-gray-300 rounded"
//                                             required
//                                         />
//                                         <input
//                                             type="text"
//                                             placeholder="Name on Card"
//                                             className="w-full p-2 border border-gray-300 rounded"
//                                             required
//                                         />
//                                         <div className="flex space-x-4">
//                                             <input
//                                                 type="text"
//                                                 placeholder="Expiry Date (MM/YY)"
//                                                 className="w-1/2 p-2 border border-gray-300 rounded"
//                                                 required
//                                             />
//                                             <input
//                                                 type="text"
//                                                 placeholder="CVV"
//                                                 className="w-1/2 p-2 border border-gray-300 rounded"
//                                                 required
//                                             />
//                                         </div>
//                                     </>
//                                 )}

//                                 {paymentMethod === 'Debit Card' && (
//                                     <>
//                                         <input
//                                             type="text"
//                                             placeholder="Card Number"
//                                             className="w-full p-2 border border-gray-300 rounded"
//                                             required
//                                         />
//                                         <input
//                                             type="text"
//                                             placeholder="Name on Card"
//                                             className="w-full p-2 border border-gray-300 rounded"
//                                             required
//                                         />
//                                         <div className="flex space-x-4">
//                                             <input
//                                                 type="text"
//                                                 placeholder="Expiry Date (MM/YY)"
//                                                 className="w-1/2 p-2 border border-gray-300 rounded"
//                                                 required
//                                             />
//                                             <input
//                                                 type="text"
//                                                 placeholder="CVV"
//                                                 className="w-1/2 p-2 border border-gray-300 rounded"
//                                                 required
//                                             />
//                                         </div>
//                                     </>
//                                 )}

//                                 {paymentMethod === 'UPI' && (
//                                     <>
//                                         <input
//                                             type="text"
//                                             placeholder="UPI ID"
//                                             className="w-full p-2 border border-gray-300 rounded"
//                                             required
//                                         />
//                                     </>
//                                 )}

//                                 {paymentMethod === 'Net Banking' && (
//                                     <>
//                                         <input
//                                             type="text"
//                                             placeholder="Bank Name"
//                                             className="w-full p-2 border border-gray-300 rounded"
//                                             required
//                                         />
//                                         <input
//                                             type="text"
//                                             placeholder="Account Number"
//                                             className="w-full p-2 border border-gray-300 rounded"
//                                             required
//                                         />
//                                     </>
//                                 )}

//                                 <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
//                                     Confirm Payment
//                                 </button>
//                             </form>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>

//     );
// };

// export default CustomerDashboardGetTiffinService;


import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerDashboardGetTiffinService = () => {
    const [tiffinServices, setTiffinServices] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); 

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTiffinServices = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tiffin-services/');
                const servicesWithTotal = response.data.map(service => ({
                    ...service,
                    totalMenuPrice: service.meals.reduce((acc, meal) => acc + parseFloat(meal.price || 0), 0),
                }));
                setTiffinServices(servicesWithTotal);
            } catch (error) {
                console.error('Error fetching tiffin services:', error);
            }
        };

        fetchTiffinServices();
    }, []);

    const handleOrder = (meal) => {
        const existingMeal = selectedMeals.find((selectedMeal) => selectedMeal.id === meal.id);
        if (existingMeal) {
            // Remove the selected meal
            setSelectedMeals(selectedMeals.filter((selectedMeal) => selectedMeal.id !== meal.id));
        } else {
            // Add the meal as a new selection
            setSelectedMeals([...selectedMeals, { ...meal, quantity: 1 }]);
        }
    };

    const addAllMeals = (service) => {
        const mealsToAdd = service.meals.filter(
            (meal) => !selectedMeals.some((selectedMeal) => selectedMeal.id === meal.id)
        );
        setSelectedMeals([...selectedMeals, ...mealsToAdd.map((meal) => ({ ...meal, quantity: 1 }))]);
    };

    const handleRemoveAllMeals = (service) => {
        const mealsToRemove = service.meals.map((meal) => meal.id);
        setSelectedMeals(selectedMeals.filter((selectedMeal) => !mealsToRemove.includes(selectedMeal.id)));
    };

    useEffect(() => {
        const total = selectedMeals.reduce((acc, meal) => acc + (parseFloat(meal.price || 0) * meal.quantity), 0);
        setTotalPrice(total);
    }, [selectedMeals]);

    const handleQuantityChange = (meal, quantity) => {
        if (quantity < 1) return;
        const updatedMeals = selectedMeals.map((selectedMeal) => {
            if (selectedMeal.id === meal.id) {
                return { ...selectedMeal, quantity };
            }
            return selectedMeal;
        });
        setSelectedMeals(updatedMeals);
    };

    const placeOrder = () => {
        setShowPaymentOptions(true);
    };

    const handlePaymentSubmit = (event) => {
        event.preventDefault();
        setSelectedMeals([]);
        setTotalPrice(0);
        setShowPaymentOptions(false);
        navigate('/payment')

    };

    // Filter meals based on the search term
    const filteredTiffinServices = tiffinServices.map((service) => {
        // Filter the meals within each tiffin service based on the search term
        const filteredMeals = service.meals.filter((meal) =>
            meal.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Calculate the total price of only the filtered meals
        const totalFilteredPrice = filteredMeals.reduce(
            (acc, meal) => acc + parseFloat(meal.price || 0),
            0
        );

        return {
            ...service,
            meals: filteredMeals,
            totalFilteredPrice, // Add the total filtered price for display
        };
    }).filter((service) => service.meals.length > 0);

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Tiffin Services</h1>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="🔍 Search for meals..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-1/2 p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTiffinServices.length === 0 ? (
                        <p className="text-center text-gray-500">No meals found</p>
                    ) : (
                        filteredTiffinServices.map((service) => {
                            const allMealsSelected = service.meals.every((meal) =>
                                selectedMeals.some((selectedMeal) => selectedMeal.id === meal.id)
                            );

                            return (
                                <div
                                    key={service.id}
                                    className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 duration-200"
                                >
                                    <h2 className="text-xl font-semibold text-blue-600">{service.menu_name}</h2>
                                    <p className="text-gray-600">{service.description}</p>
                                    <h3 className="mt-4 font-bold">Meals:</h3>
                                    <ul className="list-disc pl-5">
                                        {service.meals.map((meal) => (
                                            <li key={meal.id} className="mt-2 flex items-center justify-between">
                                                <div>
                                                    <span className="font-semibold">{meal.name}</span> - ₹
                                                    {(parseFloat(meal.price) || 0).toFixed(2)} ({meal.category})
                                                </div>
                                                <button
                                                    onClick={() => handleOrder(meal)}
                                                    className={`ml-2 rounded px-3 py-1 ${selectedMeals.some((selectedMeal) => selectedMeal.id === meal.id)
                                                        ? 'bg-red-600'
                                                        : 'bg-blue-500'
                                                        } text-white hover:bg-blue-600 transition duration-200`}
                                                >
                                                    {selectedMeals.some((selectedMeal) => selectedMeal.id === meal.id) ? 'Remove' : 'Add'}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    {/* Display the total price of the filtered meals */}
                                    <div className="mt-4 font-bold">Total Price: ₹{service.totalFilteredPrice.toFixed(2)}</div>
                                    <button
                                        onClick={() => addAllMeals(service)}
                                        className={`mt-2 py-2 px-4 rounded transition duration-200 ${allMealsSelected ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 text-white'
                                            }`}
                                        disabled={allMealsSelected}
                                    >
                                        Add All Meals
                                    </button>
                                    {allMealsSelected && (
                                        <button
                                            onClick={() => handleRemoveAllMeals(service)}
                                            className="mt-2 bg-red-600 text-white py-2 px-4 rounded transition duration-200"
                                        >
                                            Remove All Meals
                                        </button>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold">Selected Meals</h2>
                    <ul className="list-disc pl-5">
                        {selectedMeals.map((meal) => (
                            <li key={meal.id} className="mt-2 flex justify-between items-center">
                                <div>
                                    {meal.name} - ₹{(parseFloat(meal.price) || 0).toFixed(2)} x
                                    <input
                                        type="number"
                                        min="1"
                                        value={meal.quantity}
                                        onChange={(e) => handleQuantityChange(meal, parseInt(e.target.value))}
                                        className="w-16 ml-2 border border-gray-300 rounded px-1"
                                    />
                                </div>
                                <span>₹{(parseFloat(meal.price) * meal.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 font-semibold text-lg">Total Price: ₹{totalPrice.toFixed(2)}</div>
                    <button
                        onClick={placeOrder}
                        className={`mt-4 ${selectedMeals.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600'
                            } text-white py-2 px-4 rounded transition duration-200`}
                        disabled={selectedMeals.length === 0}
                    >
                        Place Order
                    </button>

                    {showPaymentOptions && selectedMeals.length > 0 && (
                        <div className="mt-6 border-t pt-4">
                            <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
                            <div className="flex space-x-4 mb-4">
                                {['Credit Card', 'Debit Card', 'UPI', 'Net Banking'].map((method) => (
                                    <button
                                        key={method}
                                        className={`py-2 px-4 rounded transition duration-200 ${paymentMethod === method ? 'bg-blue-600 text-white' : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        onClick={() => setPaymentMethod(method)}
                                    >
                                        {method}
                                    </button>
                                ))}
                            </div>

                            <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                {paymentMethod === 'Credit Card' && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Card Number"
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Name on Card"
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                        <div className="flex space-x-4">
                                            <input
                                                type="text"
                                                placeholder="Expiry Date (MM/YY)"
                                                className="w-1/2 p-2 border border-gray-300 rounded"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                className="w-1/2 p-2 border border-gray-300 rounded"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {paymentMethod === 'Debit Card' && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Card Number"
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Name on Card"
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                        <div className="flex space-x-4">
                                            <input
                                                type="text"
                                                placeholder="Expiry Date (MM/YY)"
                                                className="w-1/2 p-2 border border-gray-300 rounded"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                className="w-1/2 p-2 border border-gray-300 rounded"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {paymentMethod === 'UPI' && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="UPI ID"
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                    </>
                                )}

                                {paymentMethod === 'Net Banking' && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Bank Name"
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Account Number"
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                    </>
                                )}

                                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                                    Confirm Payment
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CustomerDashboardGetTiffinService;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContextProvider';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';

const CustomerDashboardBuyProducts = () => {
    const { cartItems, addToCart, removeFromCart } = useCart();
    const [shops, setShops] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [cartVisible, setCartVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/groceryowners/')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setShops(response.data);
                    const products = response.data.flatMap(shop => shop.products || []);
                    setAllProducts(products);
                    setFilteredProducts(products); // Show all products initially
                }
            })
            .catch((error) => {
                console.error('Error fetching shops:', error);
            });
    }, []);

    const handleShopSelect = (shop) => {
        setSelectedShop(shop);
        setSelectedCategory('All');
        setFilteredProducts(shop.products || []);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredProducts(selectedShop ? selectedShop.products : allProducts);
        } else {
            const filtered = (selectedShop ? selectedShop.products : allProducts).filter(product => product.category === category);
            setFilteredProducts(filtered);
        }
    };

    const handleAllShops = () => {
        setSelectedShop(null);
        setSelectedCategory('All');
        setFilteredProducts(allProducts); // Reset to all products when "All Shops" is selected
    };

    // New function to handle search
    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        const filtered = (selectedShop ? selectedShop.products : allProducts).filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        setFilteredProducts(filtered);
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <div className="container mx-auto py-8">
                <div className="flex">
                    <aside className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg">
                        <h4 className="text-xl font-semibold mb-4 text-blue-700">Select Shop</h4>
                        <ul>
                            <li className="mb-2">
                                <button
                                    onClick={handleAllShops}
                                    className={`block w-full text-left p-2 rounded-md ${!selectedShop ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-300'}`}
                                >
                                    All Shops
                                </button>
                            </li>
                            {shops.map((shop) => (
                                <li key={shop.id} className="mb-2">
                                    <button
                                        onClick={() => handleShopSelect(shop)}
                                        className={`block w-full text-left p-2 rounded-md ${selectedShop && selectedShop.id === shop.id ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-300'}`}
                                    >
                                        {shop.shop_name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <h4 className="text-xl font-semibold mt-6 mb-4 text-blue-700">Select Category</h4>
                        <ul>
                            {['All', ...new Set(allProducts.map(product => product.category))].map((category) => (
                                <li key={category} className="mb-2">
                                    <button
                                        onClick={() => handleCategorySelect(category)}
                                        className={`block w-full text-left p-2 rounded-md ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-300'}`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </aside>
                    <main className="w-3/4 pl-8">
                        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Products</h2>

                        {/* Search Bar */}
                        <div className="mb-6 justify-center">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="🔍 Search for products..."
                                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                                        <p className="mb-2 text-gray-600">Price: ₹{product.price}</p>
                                        <p className="mb-4 text-gray-600">Available Quantity: {product.available_quantity}</p>
                                        <input
                                            type="number"
                                            min="1"
                                            max={product.available_quantity} // Limit the quantity to available stock
                                            defaultValue="1"
                                            className="border border-gray-300 rounded p-1 mb-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            id={`quantity-${product.id}`} // Unique ID for each quantity input
                                        />
                                        <button
                                            onClick={() => {
                                                const quantityInput = document.getElementById(`quantity-${product.id}`);
                                                const quantity = parseInt(quantityInput.value) || 1;
                                                if (quantity > product.available_quantity) {
                                                    alert('Quantity exceeds available stock');
                                                    return;
                                                }
                                                const totalPrice = quantity * product.price;
                                                addToCart({ ...product, quantity, totalPrice });
                                            }}
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-600">No products found.</p>
                            )}
                        </div>
                    </main>
                </div>

                {/* Cart button */}
                <button
                    onClick={() => navigate('/cart')}
                    className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-gray-900 transition duration-300 ease-in-out transform hover:scale-110"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60px',
                        height: '60px',
                    }}
                >
                    🛒
                    {cartItems.length > 0 && (
                        <span
                            className="absolute bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
                            style={{ top: '-10px', right: '-10px' }}
                        >
                            {cartItems.length}
                        </span>
                    )}
                </button>

                {cartVisible && (
                    <Cart
                        cartItems={cartItems}
                        closeCart={() => setCartVisible(false)}
                        removeFromCart={removeFromCart}
                        totalPrice={totalPrice}
                    />
                )}
            </div>
        </>
    );
};

export default CustomerDashboardBuyProducts;

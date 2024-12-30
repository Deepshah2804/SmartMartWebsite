import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroceryOwnerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        available_quantity: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const shopName = localStorage.getItem('shopName'); // Assuming shop name is stored in local storage after login

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/products/?shop=${shopName}`) // Fetch products for the specific shop
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error(error));
    }, [shopName]);

    const handleProductChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const addProduct = () => {
        if (isEditing) {
            axios.put(`http://127.0.0.1:8000/api/products/${editProductId}/`, newProduct)
                .then(response => {
                    alert('Product Updated!');
                    const updatedProducts = products.map(product =>
                        product.id === editProductId ? response.data : product
                    );
                    setProducts(updatedProducts);
                    setIsEditing(false);
                    setEditProductId(null);
                    setNewProduct({ name: '', price: '', description: '', category: '', available_quantity: '' });
                })
                .catch(error => console.error(error));
        } else {
            axios.post('http://127.0.0.1:8000/api/products/', { ...newProduct, shop: shopName }) // Include shop name when adding product
                .then(response => {
                    alert('Product Added!');
                    setProducts([...products, response.data]);
                    setNewProduct({ name: '', price: '', description: '', category: '', available_quantity: '' });
                })
                .catch(error => console.error(error));
        }
    };

    const deleteProduct = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/products/${id}/`)
            .then(() => {
                alert('Product Deleted!');
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(error => console.error(error));
    };

    const editProduct = (product) => {
        setNewProduct({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            available_quantity: product.available_quantity,
        });
        setIsEditing(true);
        setEditProductId(product.id);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold text-center mb-8">Your Products</h1>
            {products.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Product Name</th>
                            <th className="border border-gray-300 px-4 py-2">Price</th>
                            <th className="border border-gray-300 px-4 py-2">Category</th>
                            <th className="border border-gray-300 px-4 py-2">Available Quantity</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                                <td className="border border-gray-300 px-4 py-2">₹{product.price}</td>
                                <td className="border border-gray-300 px-4 py-2">{product.category}</td>
                                <td className="border border-gray-300 px-4 py-2">{product.available_quantity}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => editProduct(product)}
                                        className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="bg-red-500 text-white px-4 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products available.</p>
            )}
            <h3 className="text-2xl font-semibold mt-8">
                {isEditing ? 'Edit Product' : 'Add New Product'}
            </h3>
            <div className="mt-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={handleProductChange}
                    className="border rounded p-2 mr-2 mb-2 w-full md:w-1/3"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleProductChange}
                    className="border rounded p-2 mr-2 mb-2 w-full md:w-1/3"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={newProduct.category}
                    onChange={handleProductChange}
                    className="border rounded p-2 mr-2 mb-2 w-full md:w-1/3"
                />
                <input
                    type="number"
                    name="available_quantity"
                    placeholder="Quantity"
                    value={newProduct.available_quantity}
                    onChange={handleProductChange}
                    className="border rounded p-2 mr-2 mb-2 w-full md:w-1/3"
                />
                <button
                    onClick={addProduct}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {isEditing ? 'Save Changes' : 'Add Product'}
                </button>
            </div>
        </div>
    );
};

export default GroceryOwnerDashboard;

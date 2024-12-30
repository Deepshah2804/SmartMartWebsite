import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TiffinServiceOwnerDashboard = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMeal, setNewMeal] = useState({
    name: '',
    price: '',
    category: 'Breakfast',
    ingredients: ''
  });

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/meals/');
        setMeals(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const handleNewMealChange = (e) => {
    const { name, value } = e.target;
    setNewMeal({ ...newMeal, [name]: value });
  };

  const addMeal = async () => {
    try {
      if (!newMeal.name || !newMeal.price) {
        alert("Name and Price are required!");
        return;
      }
      const response = await axios.post('http://127.0.0.1:8000/api/meals/', newMeal);
      setMeals([...meals, response.data]);
      setNewMeal({ name: '', price: '', category: 'Breakfast', ingredients: '' });
      alert('Meal added successfully');
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  const deleteMeal = async (id) => {
    if (window.confirm("Are you sure you want to delete this meal?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/meals/${id}/`);
        setMeals(meals.filter(meal => meal.id !== id));
        alert('Meal deleted successfully');
      } catch (error) {
        console.error('Error deleting meal:', error);
      }
    }
  };

  const handlePriceChange = (e, id) => {
    const updatedMeals = meals.map(meal =>
      meal.id === id ? { ...meal, price: e.target.value } : meal
    );
    setMeals(updatedMeals);
  };

  const saveChanges = async (meal) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/meals/${meal.id}/`, meal);
      alert('Changes saved successfully');
    } catch (error) {
      console.error('Error updating meal:', error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Meals</h1>

      {/* Add Meal Form */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Meal</h2>
        <input
          type="text"
          name="name"
          value={newMeal.name}
          onChange={handleNewMealChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Enter meal name"
        />
        <input
          type="number"
          name="price"
          value={newMeal.price}
          onChange={handleNewMealChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Enter price"
        />
        <select
          name="category"
          value={newMeal.category}
          onChange={handleNewMealChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
        <input
          type="text"
          name="ingredients"
          value={newMeal.ingredients}
          onChange={handleNewMealChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Enter ingredients (comma-separated)"
        />
        <button
          onClick={addMeal}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add Meal
        </button>
      </div>

      {/* Display Meals */}
      {meals.length === 0 ? (
        <div>No meals available</div>
      ) : (
        meals.map((meal) => (
          <div key={meal.id} className="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold">{meal.name}</h2>
            <input
              type="number"
              value={meal.price}
              onChange={(e) => handlePriceChange(e, meal.id)}
              className="w-full p-2 border border-gray-300 rounded-md mt-4 mb-2"
            />
            <button onClick={() => saveChanges(meal)} className="bg-blue-500 text-white py-1 px-3 rounded">
              Save
            </button>
            <button onClick={() => deleteMeal(meal.id)} className="bg-red-500 text-white py-1 px-3 rounded ml-2">
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TiffinServiceOwnerDashboard;

import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';

const FAQs = [
  {
    question: "How do I register as a customer?",
    answer: "To register as a customer, click on 'Get Started as Customer' and fill in the required details."
  },
  {
    question: "How do I register as an owner?",
    answer: "To register as an owner, click on 'Get Started as Owner' and provide your shop details."
  },
  {
    question: "How do I order a tiffin?",
    answer: "As a customer, simply browse the available tiffin services, select your meal plan, and place your order."
  },
  {
    question: "How do I register as a tiffin service owner?",
    answer: "To register as a tiffin service owner, click on 'Get Started as Tiffin Service Owner' and fill in the required details."
  },
];

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold leading-tight">Welcome to Our Marketplace</h1>
          <p className="mt-4 text-xl">Shop from local vendors, manage your shop effortlessly, or enjoy delicious meals from our tiffin services!</p>
          <div className="mt-6 space-x-4">
            <Link to="/customer/register" className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105">Get Started as Customer</Link>
            <Link to="/groceryowner/register" className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105">Get Started as Grocery Owner</Link>
            <Link to="/tiffinserviceowner/register" className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105">Get Started as Tiffin Service Owner</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Why Choose Us?</h2>
          <div className="flex flex-wrap justify-center">
            {[
              {
                title: "For Customers",
                description: "Browse shops, view products, order tiffin meals, and make purchases easily."
              },
              {
                title: "For Owners",
                description: "Manage your products, tiffin services, and orders with a few clicks."
              },
              {
                title: "Easy Registration",
                description: "Sign up easily to start using our platform."
              }
            ].map((feature, index) => (
              <div key={index} className="w-full md:w-1/3 p-4">
                <div className="bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-2xl">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="mb-6 text-gray-700">Whether you are a customer or an owner, we have something for you!</p>
          <div className="space-x-4">
            <Link to="/customer/register" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 transform hover:scale-105">Sign Up as Customer</Link>
            <Link to="/groceryowner/register" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 transform hover:scale-105">Sign Up as Grocery Owner</Link>
            <Link to="/tiffinserviceowner/register" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 transform hover:scale-105">Sign Up as Tiffin Service Owner</Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white shadow-lg rounded-lg p-6 cursor-pointer transition duration-300 ${openIndex === index ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-xl font-semibold flex justify-between items-center">
                  {faq.question}
                  <span className="ml-2 text-lg">{openIndex === index ? '-' : '+'}</span>
                </h3>
                {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Your Marketplace. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

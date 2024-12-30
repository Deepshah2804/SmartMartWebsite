// import React, { useContext } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import LoginContext from '../context/LoginContext';

// function Navbar() {
//     const { loggedin, setLoggedin, setEmail } = useContext(LoginContext);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         // Clear login state
//         setLoggedin(false);
//         setEmail('');
//         // Redirect to home page
//         navigate('/');
//     };

//     return (
//         <nav className="bg-blue-600 p-4">
//             <div className="container mx-auto flex justify-between items-center">
//                 <div className="text-white font-bold text-lg">
//                     <NavLink to="/">SmartMart</NavLink>
//                 </div>

//                 {/* Navigation Links */}
//                 <div className="space-x-4">
//                     <NavLink to="/" className="text-gray-300 hover:text-white">
//                         Home
//                     </NavLink>

//                     {/* Show these links only if logged in as a customer */}
//                     {loggedin && (
//                         <>
//                             <NavLink
//                                 to="/Customer/Dashboard/gettiffinservice"
//                                 className="text-gray-300 hover:text-white"
//                             >
//                                 Get Tiffin Service
//                             </NavLink>
//                             <NavLink
//                                 to="/Customer/Dashboard/buyproducts"
//                                 className="text-gray-300 hover:text-white"
//                             >
//                                 Buy Products
//                             </NavLink>
//                         </>
//                     )}

//                     {/* Show login options if not logged in */}
//                     {!loggedin ? (
//                         <>
//                             <NavLink
//                                 to="/customer/login"
//                                 className="text-gray-300 hover:text-white"
//                             >
//                                 Login As Customer
//                             </NavLink>
//                             <NavLink
//                                 to="/groceryowner/login"
//                                 className="text-gray-300 hover:text-white"
//                             >
//                                 Login As Grocery Store Owner
//                             </NavLink>
//                             <NavLink
//                                 to="/tiffinserviceowner/login"
//                                 className="text-gray-300 hover:text-white"
//                             >
//                                 Login As Tiffin Service Owner
//                             </NavLink>
//                         </>
//                     ) : (
//                         // Show logout button only when logged in
//                         <button
//                             onClick={handleLogout}
//                             className="text-gray-300 hover:text-white focus:outline-none"
//                         >
//                             Logout
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// }

// export default Navbar;


import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

function Navbar() {
    const { loggedin, setLoggedin, setEmail, userType } = useContext(LoginContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear login state
        setLoggedin(false);
        setEmail('');
        // Redirect to home page
        navigate('/');
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-lg">
                    <NavLink to="/">SmartMart</NavLink>
                </div>

                {/* Navigation Links */}
                <div className="space-x-4">
                    <NavLink to="/" className="text-gray-300 hover:text-white">
                        Home
                    </NavLink>

                    {/* Show specific links based on user type */}
                    {loggedin && userType === 'customer' && (
                        <>
                            <NavLink
                                to="/Customer/Dashboard/gettiffinservice"
                                className="text-gray-300 hover:text-white"
                            >
                                Get Tiffin Service
                            </NavLink>
                            <NavLink
                                to="/Customer/Dashboard/buyproducts"
                                className="text-gray-300 hover:text-white"
                            >
                                Buy Products
                            </NavLink>
                        </>
                    )}

                    {loggedin && userType === 'groceryOwner' && (
                        <>
                        </>
                    )}

                    {loggedin && userType === 'tiffinOwner' && (
                        <>
                        </>
                    )}

                    {/* Show login options if not logged in */}
                    {!loggedin ? (
                        <>
                            <NavLink
                                to="/customer/login"
                                className="text-gray-300 hover:text-white"
                            >
                                Login As Customer
                            </NavLink>
                            <NavLink
                                to="/groceryowner/login"
                                className="text-gray-300 hover:text-white"
                            >
                                Login As Grocery Store Owner
                            </NavLink>
                            <NavLink
                                to="/tiffinserviceowner/login"
                                className="text-gray-300 hover:text-white"
                            >
                                Login As Tiffin Service Owner
                            </NavLink>
                        </>
                    ) : (
                        // Show logout button only when logged in
                        <button
                            onClick={handleLogout}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

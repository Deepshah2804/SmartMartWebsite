import React, { useState } from "react";
import LoginContext from "./LoginContext";

const LoginContextProvider = ({ children }) => {
    const [loggedin, setLoggedin] = useState(false);
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');


    return (
        <LoginContext.Provider value={{ loggedin, setLoggedin, email, setEmail,userType ,setUserType }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;
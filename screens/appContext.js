import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

// Create a Context
export const AppContext = createContext();

// Create a Provider component
export const AppProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Example 
    const [role, setRole] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState();

    const updateLoggedIn = () => {
        setIsLoggedIn(!isLoggedIn);
    }
    const updateRole = (role) => {
        setRole(role);

    }
    const updateLoggedInUser = (value) => {
        setLoggedInUser(value);

    }
    useEffect(() => {
        if (role) {
            Alert.alert('Role Updated', `Your role is now ${role}`);
        }
    }, [role]);
    return (
        <AppContext.Provider value={{ isLoggedIn, updateLoggedIn, role, updateRole, loggedInUser, setLoggedInUser }}>
            {children}
        </AppContext.Provider>
    );
};

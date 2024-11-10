// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Assume you fetch user data from local storage or an API after login
        const loggedInUser = localStorage.getItem('token'); // Example way to store user data
        
        if (loggedInUser) {
            setUser(loggedInUser);
            
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

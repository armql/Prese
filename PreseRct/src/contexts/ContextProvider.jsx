import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => { },
    setUserToken: () => { },
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, setUserToken] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch("/api/user", {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            const data = await response.json();
            console.log("Data from server:", data);
            setCurrentUser({
                ...data,
            });
        };
    
        if (userToken) {
            fetchUser();
        }
    }, [userToken]);    

    return (
        <StateContext.Provider
            value={{ currentUser, setCurrentUser, userToken, setUserToken }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

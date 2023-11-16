import { createContext, useContext, useState, useEffect, useRef } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  setCurrentUser: () => {},
  setUserToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
  const lastActivityTimeRef = useRef(new Date().getTime());

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('TOKEN', token);
      const expirationTime = new Date().getTime() + 6 * 60 * 60 * 1000; 
      localStorage.setItem('TOKEN_EXPIRATION', expirationTime);
    } else {
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('TOKEN_EXPIRATION');
    }
    _setUserToken(token);
    lastActivityTimeRef.current = new Date().getTime();
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const expirationTime = localStorage.getItem('TOKEN_EXPIRATION');
      const lastActivityTime = lastActivityTimeRef.current;
      const currentTime = new Date().getTime();
      const inactiveTime = currentTime - lastActivityTime;
      if (expirationTime && currentTime > expirationTime) {
        setUserToken(null);
      } else if (expirationTime && inactiveTime > 6 * 60 * 60 * 1000) {
        setUserToken(null);
      }
    };

    checkTokenExpiration();

    const interval = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleUserActivity = () => {
    lastActivityTimeRef.current = new Date().getTime();
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, []);

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
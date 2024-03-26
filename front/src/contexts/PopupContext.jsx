import React, { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export function usePopup() {
  return useContext(PopupContext);
}

export function PopupProvider({ children }) {
  const [showPopup, setShowPopup] = useState(false);

  const showAlert = () => {
    setShowPopup(true);

    setTimeout(() => {
      hideAlert();
    }, 3000);
  };

  const hideAlert = () => {
    setShowPopup(false);
  };

  return (
    <PopupContext.Provider value={{ showPopup, showAlert, hideAlert }}>
      {children}
    </PopupContext.Provider>
  );
}

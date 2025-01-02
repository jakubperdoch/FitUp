import { createContext, useContext } from "react";
import { useState } from "react";

const LayoutContext = createContext(null);

export const LayoutProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [navbarTitle, setNavbarTitle] = useState("");
  const [showBackButton, setShowBackButton] = useState(false);
  const [showDetailsButton, setShowDetailsButton] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const [navbarColor, setNavbarColor] = useState("text-black");

  return (
    <LayoutContext.Provider
      value={{
        navbarTitle,
        setNavbarTitle,
        showBackButton,
        setShowBackButton,
        showDetailsButton,
        setShowDetailsButton,
        isVisible,
        setIsVisible,
        showFooter,
        setShowFooter,
        navbarColor,
        setNavbarColor,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);

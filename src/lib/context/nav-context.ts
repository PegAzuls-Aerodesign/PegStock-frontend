import React from "react";

interface NavContentType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

export const NavContext = React.createContext<NavContentType>({
  isOpen: false,
  setIsOpen: () => {},
  isMobile: false,
  setIsMobile: () => {},
});

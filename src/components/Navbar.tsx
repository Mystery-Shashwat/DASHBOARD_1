import React, { useState, useEffect, useRef } from "react";
import { AlignJustify, CircleUserRound } from "lucide-react";
import logo from "../assets/images/Logo1.png";
import SignOutCard from "./SignOutCard";

// Define props type
interface NavbarProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setIsOpen }) => {
  const [showCard, setShowCard] = useState<boolean>(false);
  const userIconRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  // Hide the card when clicking outside the user profile icon
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userIconRef.current && !userIconRef.current.contains(e.target as Node)) {
        setShowCard(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex w- justify-between items-center p-4 bg-white drop-shadow-xl">
        <div className="flex items-center space-x-4">
          <AlignJustify className="cursor-pointer text-black" onClick={handleClick} />
          <img src={logo} className="w-auto h-15" alt="Logo" />
        </div>
        <div ref={userIconRef} className="relative">
          <CircleUserRound
            className="cursor-pointer text-black"
            onClick={() => setShowCard(!showCard)}
            onMouseEnter={() => setShowCard(true)}
          />
          {showCard && <SignOutCard />}
        </div>
      </div>
    </>
  );
};

export default Navbar;

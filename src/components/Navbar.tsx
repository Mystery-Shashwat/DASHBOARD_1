"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { AlignJustify, CircleUserRound } from "lucide-react"
import SignOutCard from "./SignOutCard"
import ThemeDropdown from "@/ThemeDropdown"
interface NavbarProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC<NavbarProps> = ({ setIsOpen }) => {
  const [showCard, setShowCard] = useState<boolean>(false)
  const userIconRef = useRef<HTMLDivElement>(null)

  // Hide the card when clicking outside the user profile icon
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userIconRef.current && !userIconRef.current.contains(e.target as Node)) {
        setShowCard(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <nav className="flex justify-between items-center p-4 bg-white drop-shadow-xl">
      <div className="flex items-center space-x-4">
        <AlignJustify className="cursor-pointer text-black" onClick={() => setIsOpen((prev) => !prev)} />
        <div
          className="w-32 h-10 bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: "var(--logo-url)" }}
        ></div>
      </div>
     
      <div ref={userIconRef} className="relative">
        <CircleUserRound
          className="cursor-pointer text-black"
          onClick={() => setShowCard(!showCard)}
          onMouseEnter={() => setShowCard(true)}
        />
        {showCard && <SignOutCard />}
      </div>
    </nav>
  )
}

export default Navbar


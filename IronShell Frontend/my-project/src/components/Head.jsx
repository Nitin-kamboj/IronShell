import { useState } from "react";
import ironshell from "../assets/logo.png";
import profilePhoto from "../assets/Profile.png";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["HOME", "PLANS", "ABOUT", "CONTACT"];

  return (
    <header className="w-full bg-black border-b-4 border-zinc-900 sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">

        {/* 1. LOGO SECTION */}
        <div className="z-50 pt-5 flex">
          <img
            className="w-24 md:w-32 object-contain scale-120"
            src={ironshell}
            alt="Ironshell Gym"
          />
        </div>

        {/* 2. DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase()}`}
              className="group relative px-8 py-3 overflow-hidden"
            >
              {/* Skewed Background Layer */}
              <div className="absolute inset-0 bg-zinc-900 border-r border-black skew-x-[-20deg] group-hover:bg-green-300 transition-colors duration-300 pointer-events-none"></div>

              {/* Text */}
              <span className="relative block text-xs font-black tracking-widest text-white group-hover:text-black transition-colors duration-300">
                {link}
              </span>
            </a>
          ))}
        </nav>

        {/* 3. PROFILE & HAMBURGER */}
        <div className="flex items-center gap-4 z-50">

          {/* Status Pill */}
          <div className="hidden lg:flex items-center gap-2 bg-green-300 px-4 py-1 rounded-sm skew-x-[-10deg]">
            <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase text-black skew-x-[10deg]">
              Live Status
            </span>
          </div>

          {/* Profile Image */}
          <img
            className="w-10 h-10 rounded-full border-2 border-green-300 object-cover"
            src={profilePhoto}
            alt="User"
          />

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
          >
            <div
              className={`h-1 w-7 bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2.5 bg-green-300" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-7 bg-white transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-7 bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2.5 bg-green-300" : ""
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* 4. MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/95 transition-all duration-500 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href={`/${link.toLowerCase()}`}
            onClick={() => setIsOpen(false)}
            className="text-5xl font-black italic text-white hover:text-green-300 tracking-tight uppercase transition-colors"
          >
            {link}
          </a>
        ))}

        <button className="mt-8 px-10 py-4 bg-green-300 text-black font-black uppercase italic text-xl">
          Start Training
        </button>
      </div>
    </header>
  );
}
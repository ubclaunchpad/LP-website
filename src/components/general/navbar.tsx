"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import BurgerMenu from "../../../public/icons/burger-menu.svg";
import CancelMenu from "../../../public/icons/cancel.svg";

const logo = "/icons/logoVariants/logoPrimaryWithText.svg";

export type NavBarItem = {
  name: string;
  url: string;
};

type NavbarProps = {
  navItems: NavBarItem[];
};

export default function Navbar({ navItems }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  let lastScrollTop = 0;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`flex justify-between items-center w-full p-6 fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ${isScrollingUp || isMenuOpen ? 'opacity-100' : 'opacity-0'} ${isMenuOpen ? 'bg-[#27232E]' : ''}`}>
      <Image src={logo} alt="Logo" width={141} height={49} unoptimized />
      <button
        className="lg:hidden block"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <CancelMenu className="w-8 h-8 text-white hover:text-purple-400 opacity-100" />
        ) : (
          <BurgerMenu className="w-8 h-8 text-white hover:text-purple-400" />
        )}
      </button>
      <ul className={`hidden lg:flex justify-between gap-12 items-center ${isMenuOpen ? 'transform -translate-x-10' : 'transform translate-x-0'}`}>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.url} className="text-white hover:text-purple-400">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className={`lg:hidden flex flex-col gap-4 items-left p-6 absolute top-24 left-0 w-full ${isMenuOpen ? 'transform translate-x-0' : 'transform -translate-x-full'} ${isMenuOpen ? 'bg-[#27232E]' : ''}`}>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.url} className="text-white hover:text-purple-400">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
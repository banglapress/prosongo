"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Prosongo
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li className="relative group">
            <span className="cursor-pointer">Research ▾</span>
            <ul className="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded-md">
              <li><Link href="/research/village-db" className="block px-4 py-2 hover:bg-gray-100">Village Database</Link></li>
              <li><Link href="/research/voter-pulse" className="block px-4 py-2 hover:bg-gray-100">Voter Pulse</Link></li>
            </ul>
          </li>
          <li><Link href="/publications">Publications</Link></li>
          <li><Link href="/media">Media</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/other">Other</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-4 px-4 pb-4 text-gray-700 font-medium">
          <li><Link href="/about" onClick={() => setIsOpen(false)}>About Us</Link></li>
          <li><Link href="/projects" onClick={() => setIsOpen(false)}>Projects</Link></li>
          <li className="border-t pt-2">
            <span className="block font-semibold">Research</span>
            <ul className="ml-4 mt-2 space-y-2">
              <li><Link href="/research/village-db" onClick={() => setIsOpen(false)}>Village Database</Link></li>
              <li><Link href="/research/voter-pulse" onClick={() => setIsOpen(false)}>Voter Pulse</Link></li>
            </ul>
          </li>
          <li><Link href="/publications" onClick={() => setIsOpen(false)}>Publications</Link></li>
          <li><Link href="/media" onClick={() => setIsOpen(false)}>Media</Link></li>
          <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li><Link href="/other" onClick={() => setIsOpen(false)}>Other</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

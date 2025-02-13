import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import filter from "lodash/filter";
import { attributes } from "@contents/home.md";
import { HomeAttributes } from "@commons/interfaces/home";

const Header = () => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  const [isOpen, setIsOpen] = useState(false);

  const { navigations } = attributes as HomeAttributes;
  const filteredNavItems = filter(navigations, { is_show: true });

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {!isHomePage ? (
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Tabitha Krauss
          </Link>
        ) : (
          <div />
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {filteredNavItems.map((nav, index) => {
            const isActive = router.pathname === nav.link;
            return (
              <Link
                key={index}
                href={nav.link}
                className={`hover:text-blue-500 ${
                  isActive ? "text-blue-500 font-semibold" : "text-gray-900"
                }`}
              >
                {nav.page}
              </Link>
            );
          })}
        </nav>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Top Line */}
          <div
            className={`w-6 h-0.5 bg-black transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          ></div>
          {/* Middle Line */}
          <div
            className={`w-6 h-0.5 bg-black transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          {/* Bottom Line */}
          <div
            className={`w-6 h-0.5 bg-black transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          ></div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center transition-transform duration-300 ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        {/* Mobile Navigation */}
        <nav className="flex flex-col gap-6 text-xl">
          {filteredNavItems.map((nav, index) => {
            const isActive = router.pathname === nav.link;
            return (
              <Link
                key={index}
                href={nav.link}
                className={`hover:text-blue-500 text-center ${
                  isActive ? "text-blue-500 font-semibold" : "text-gray-900"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {nav.page}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;

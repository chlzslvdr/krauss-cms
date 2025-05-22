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
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50 transition-all">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {!isHomePage ? (
          <Link
            href="/"
            className="text-2xl font-bold text-green-primary hover:text-green-secondary transition-colors"
          >
            Tabitha Krauss
          </Link>
        ) : (
          <div />
        )}

        <nav className="hidden md:flex gap-8">
          {filteredNavItems.map((nav) => {
            const isActive =
              router.pathname === nav.link ||
              (nav.link === "/blog" && router.pathname.startsWith("/blogs")) ||
              (nav.link === "/blogs" && router.pathname.startsWith("/blog"));

            return (
              <Link
                key={nav.page}
                href={nav.link}
                className={`hover:text-green-secondary font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-green-primary font-semibold"
                    : "text-gray-900"
                }`}
              >
                {nav.page}
              </Link>
            );
          })}
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`w-7 h-0.5 bg-green-primary transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          ></div>
          <div
            className={`w-7 h-0.5 bg-green-primary transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`w-7 h-0.5 bg-green-primary transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          ></div>
        </button>
      </div>

      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-8 text-xl">
          {filteredNavItems.map((nav) => {
            const isActive =
              router.pathname === nav.link ||
              (nav.link === "/blog" && router.pathname.startsWith("/blogs")) ||
              (nav.link === "/blogs" && router.pathname.startsWith("/blog"));

            return (
              <Link
                key={nav.page}
                href={nav.link}
                aria-label={nav.page}
                className={`hover:text-green-secondary text-center transition-colors ${
                  isActive
                    ? "text-green-primary font-semibold"
                    : "text-gray-900"
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

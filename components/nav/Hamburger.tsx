"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOutAction } from "@/utils/signOutAction";
import { Button } from "@/components/ui/button";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Add icon library
import { sideNavLinks, SideNavProps } from "./SideNav";
import { usePathname } from "next/navigation";


const Hamburger: React.FC<SideNavProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false); // State to track whether the menu is open
  const sideNavLinksFiltered = sideNavLinks.filter((link) => link.show);
  
  const shouldShowStockMarketLink = () => {
    const now = new Date();
    const targetDate = new Date(2024, 8, 2, 16, 20, 0); // Modify with the exact time and date
    return now >= targetDate;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();
  const pathHref =
    "/" +
    (pathname.split("/")[pathname.split("/").length - 1] !== "dashboard"
      ? pathname.split("/")[pathname.split("/").length - 1]
      : "");

  const [selectedNav, setSelectedNav] = useState<string>(pathHref);

  const selectNavHandler = (pathHref: string) => {
    setSelectedNav(pathHref);
    toggleMenu();
  }

  return (
    <div className="lg:hidden">
      {/* Hamburger Button for Mobile View */}
      <div className="lg:hidden fixed top-8 right-4 z-50">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </button>
      </div>

      {/* Side Navigation */}
      <nav
        className={`bg-gray-950 bg-opacity-95 h-screen w-screen xl:w-96 overflow-y-auto fixed z-40 top-0 transition-transform transform pb-8 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:block ${className}`}
      >
        <div className="flex flex-col items-center justify-center px-20 xl:px-32 py-2 h-full space-y-4 w-full">
          {/* Nav Logo */}
          <div className="flex items-center space-x-3 h-1/5">
            <Image
              src="/static/icons/geesehacks.png"
              height={38}
              width={38}
              alt="Geese Logo"
            />
            <div className="text-3xl font-semibold">GeeseHacks</div>
          </div>

          {/* Nav Content */}
          <div className="flex flex-col grow w-full text-xl font-light space-y-6 ml-auto">
          {sideNavLinks.map((link) =>
            link.show ? (
              <Link
                className={`relative flex items-center hover:opacity-75 px-4 py-2 rounded-lg ${
                  selectedNav === link.href ? "text-purple-500 font-semibold" : ""
                }`}
                key={link.name}
                href={link.href.startsWith("https")
                  ? link.href
                  : `/dashboard${link.href}`}
                target={link.href.startsWith("https") ? "_blank" : "_self"}
                onClick={() => selectNavHandler(link.href)}
              >
                {/* Left Colored Bar */}
                {selectedNav === link.href && (
                  <span className="absolute left-0 h-full w-1 bg-purple-500 rounded-r-md"></span>
                )}

                <div className="flex items-center space-x-4">
                  <Image
                    src={link.icon}
                    height={24}
                    width={24}
                    alt={link.name}
                    style={{
                      filter:
                        selectedNav === link.href
                          ? "invert(36%) sepia(67%) saturate(2915%) hue-rotate(230deg) brightness(105%) contrast(105%)"
                          : "none",
                    }}
                  />
                  <h2>{link.name}</h2>
                </div>
              </Link>
            ) : (
              <div
                key={link.name}
                className="relative flex items-center px-4 py-2 text-gray-400 cursor-not-allowed"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={link.icon}
                    height={24}
                    width={24}
                    alt={link.name}
                    style={{
                      filter: "grayscale(100%)",
                    }}
                  />
                  <h2>{link.name}</h2>
                </div>
              </div>
            )
          )}
        </div>

        {/* Log Out Button */}
        <div className="h-1/6 flex-shrink-0">
          <form action={signOutAction}>
            <Button className="flex w-36 items-center justify-center gap-2 rounded-full bg-gradient-to-r p-3 text-sm font-medium text-white shadow-lg transition duration-200 ease-in-out hover:bg-slate-700">
              Sign Out
            </Button>
          </form>
        </div>
        </div>
      </nav>

      {/* Overlay for when menu is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default Hamburger;

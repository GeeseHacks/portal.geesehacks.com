"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signOutAction } from "@/utils/signOutAction";
import { Button } from "@/components/ui/button";
import { FaAngleLeft } from "react-icons/fa";
import path from "path";

const shouldShowStockMarketLink = () => {
  const now = new Date();
  const targetDate = new Date(2024, 8, 2, 16, 20, 0); // modify this with exact time and date

  return now >= targetDate;
};

export const sideNavLinks = [
  {
    name: "Home",
    href: "/",
    icon: "/static/icons/home.svg",
    show: true,
  },
  {
    name: "Schedule",
    href: "/schedule",
    icon: "/static/icons/calendar.svg",
    show: true,
  },
  {
    name: "QR Code",
    href: "/qrcode",
    icon: "/static/icons/qrcode.svg",
    show: true,
  },
  {
    name: "Passport",
    href: "/passport",
    icon: "/static/icons/passport.svg",
    show: true,
  },
  {
    name: "FAQ",
    href: "/faq",
    icon: "/static/icons/game.svg",
    show: true,
  },
  {
    name: "Stock Market",
    href: "/dashboard/stock-market",
    icon: "/static/icons/stock-market.png",
    show: shouldShowStockMarketLink(),
  }
];

export interface SideNavProps {
  className?: string;
}

const SideNav: React.FC<SideNavProps> = ({ className }) => {
  const pathname = usePathname();
  const pathHref = "/" + (pathname.split("/")[pathname.split("/").length - 1] !== "dashboard" ? pathname.split("/")[pathname.split("/").length - 1] : "")
  const [selectedNav, setSelectedNav] = useState<string>(pathHref);
  const sideNavLinksFiltered = sideNavLinks.filter((link) => link.show);

  return (
    <nav className={`bg-gray-950 bg-opacity-25 min-h-screen w-80 xl:w-96 hidden lg:block overflow-y-auto ${className}`}>
      
      <div className="flex flex-col items-center justify-center px-6 xl:px-12 py-2 h-full space-y-4 w-full">
        {/* Nav Logo */}
        <div className="flex items-center space-x-3 h-1/5">
          <Image src="/static/icons/geesehacks.png" height={38} width={38} alt="Geese Logo" />
          <div className="text-3xl font-semibold drop-shadow-[0_0px_5px_rgba(255,255,255,0.5)]">GeeseHacks</div>
        </div>

        {/* Nav Content */}
        <div className="flex flex-col grow w-full text-xl font-light space-y-10">
          {sideNavLinksFiltered.map((link) => (
            <Link
              className={`relative flex space-x-0 items-center hover:opacity-75 ${selectedNav === link.href ? "text-purple-500 font-semibold" : ""
                }`}
              key={link.name}
              href={`/dashboard${link.href}`}
              onClick={() => setSelectedNav(link.href)}
            >
              {/* Left Colored Bar */}
              {selectedNav === link.href && (
                <span className="absolute left-0 h-full w-1 bg-purple-500 rounded-r-md"></span>
              )}

              <div className="flex items-center space-x-4 pl-8">
                <Image
                  src={link.icon}
                  height={0}
                  width={0}
                  sizes="100vw"
                  alt={link.name}
                  style={{
                    filter: selectedNav === link.href
                      ? 'invert(36%) sepia(67%) saturate(2915%) hue-rotate(230deg) brightness(105%) contrast(105%)'
                      : 'none',
                    height: 24,
                    width: 'auto',
                  }}
                />
                <h2>{link.name}</h2>
              </div>
            </Link>
          ))}

          {/* Conditionally render the Stock Market link
          {shouldShowStockMarketLink() && (
            <Link className="flex space-x-8 hover:opacity-35" key="Stock Market" href="/dashboard/stock-market">
              <Image src="/static/icons/stock-market.png" height={0} width={0} sizes="100vw" alt="Stock Market" style={{ height: 24, width: 'auto' }} />
              <h2>Stock Market</h2>
            </Link>
          )} */}

        </div>

        {/* Log Out Button (Switch the style a bit—maybe use shadcn buttons?) */}
        <div className="h-1/6 flex-shrink-0">
          {/* signOutAction needs to be in a form */}
          <form action={signOutAction}>
            <Button className="flex w-36 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-300 via-pink-500 to-red-400 p-3 text-sm font-medium text-white shadow-lg transition duration-200 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-600 hover:to-red-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Sign Out
            </Button>
          </form>
        </div>


      </div>
    </nav>
  );
};

export default SideNav;

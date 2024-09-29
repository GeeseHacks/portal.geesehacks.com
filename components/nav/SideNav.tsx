"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOutAction } from "@/utils/signOutAction";
import { Button } from "@/components/ui/button";

const sideNavLinks = [
  {
    name: "Home",
    href: "/dashboard",
    icon: "/static/icons/home.svg",
  },
  {
    name: "Schedule",
    href: "/dashboard/schedule",
    icon: "/static/icons/calendar.svg",
  },
  {
    name: "QR Code",
    href: "/dashboard/qrcode",
    icon: "/static/icons/qrcode.svg",
  },
  {
    name: "Passport",
    href: "/dashboard/passport",
    icon: "/static/icons/passport.svg",
  },
  {
    name: "FAQ",
    href: "/dashboard/faq",
    icon: "/static/icons/game.svg",
  },
  {
    name: "Stock Market",
    href: "/dashboard/stock-market",
    icon: "/static/icons/stock-market.png",
    condition: () => {
      const now = new Date();
      const targetDate = new Date(2024, 8, 2, 16, 20, 0); // modify this with exact time and date
      return now >= targetDate;
    },
  },
];

const SideNav: React.FC = () => {
  const [selectedNav, setSelectedNav] = useState<string>("Home");

  return (
    <nav className="bg-gray-950 h-screen min-h-96 w-80 xl:w-96 hidden lg:block overflow-y-auto">
      <div className="flex flex-col items-center justify-center px-6 xl:px-12 py-2 h-full space-y-4 w-full">
        {/* Nav Logo */}
        <div className="flex items-center space-x-3 h-1/5">
          <Image src="/static/icons/geesehacks.png" height={38} width={38} alt="Geese Logo" />
          <div className="text-3xl font-semibold drop-shadow-[0_0px_5px_rgba(255,255,255,0.5)]">GeeseHacks</div>
        </div>

        <div className="flex flex-col grow w-full text-xl font-light space-y-10">
          {sideNavLinks.map((link) => {
            if (link.condition && !link.condition()) {
              return null;
            }
            return (
              <Link
                className={`relative flex space-x-0 items-center hover:opacity-75 ${
                  selectedNav === link.name ? "text-purple-500 font-semibold" : ""
                }`}
                key={link.name}
                href={link.href}
                onClick={() => setSelectedNav(link.name)}
              >
                {/* Left Colored Bar */}
                {selectedNav === link.name && (
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
                      filter: selectedNav === link.name
                        ? 'invert(36%) sepia(67%) saturate(2915%) hue-rotate(230deg) brightness(105%) contrast(105%)'
                        : 'none',
                      height: 24,
                      width: 'auto',
                    }}
                  />
                  <h2>{link.name}</h2>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Log Out Button */}
        <div className="h-1/6 flex-shrink-0">
          <form action={signOutAction}>
            <Button className="flex w-36 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-300 via-pink-500 to-red-400 p-3 text-sm font-medium text-white shadow-lg transition duration-200 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-600 hover:to-red-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              <img src="/static/icons/arrow-right.svg" alt="Right Arrow" className="transform rotate-180 w-7 h-7 mr-1" />
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
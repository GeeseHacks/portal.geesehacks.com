"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signOutAction } from "@/utils/signOutAction";
import { Button } from "@/components/ui/button";

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
    name: "Passport",
    href: "/passport",
    icon: "/static/icons/passport.svg",
    show: true,
  },
  {
    name: "Stock Market",
    href: "/stock-market",
    icon: "/static/icons/stock-market.svg",
    show: false,
  },
  {
    name: "Qr Code",
    href: "/qrcode",
    icon: "/static/icons/qrcode.svg",
    show: true,
  },
  {
    name: "FAQ",
    href: "https://geesehacks.com/#faq",
    icon: "/static/icons/game.svg",
    show: true,
  },
];

export interface SideNavProps {
  className?: string;
}

const SideNav: React.FC<SideNavProps> = ({ className }) => {
  const pathname = usePathname();
  const pathHref =
    "/" +
    (pathname.split("/")[pathname.split("/").length - 1] !== "dashboard"
      ? pathname.split("/")[pathname.split("/").length - 1]
      : "");
  const [selectedNav, setSelectedNav] = useState<string>(pathHref);

  return (
    <nav
      className={`bg-gray-950 bg-opacity-25 min-h-screen w-80 xl:w-96 hidden lg:block overflow-y-auto ${className}`}
    >
      <div className="flex flex-col items-center justify-center px-6 xl:px-12 py-2 h-full space-y-4 w-full">
        {/* Nav Logo */}
        <div className="flex items-center space-x-3 h-1/5">
          <Image
            src="/static/icons/geesehacks.png"
            height={38}
            width={38}
            alt="Geese Logo"
          />
          <div className="text-3xl font-semibold drop-shadow-[0_0px_5px_rgba(255,255,255,0.5)]">
            GeeseHacks
          </div>
        </div>

        {/* Nav Content */}
        <div className="flex flex-col grow w-full text-xl font-light space-y-6">
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
                onClick={() => setSelectedNav(link.href)}
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
  );
};

export default SideNav;
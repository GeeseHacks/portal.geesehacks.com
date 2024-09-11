import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";


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
        {sideNavLinks.map((link) => (
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
        ))}
        </div>


        {/* Log Out Button */}
        <div className="h-1/6 flex-shrink-0 flex items-center justify-start w-full">
          <button className="flex items-center space-x-3 text-lg font-medium text-white hover:opacity-75">
            <img src="/static/icons/arrow-right.svg" alt="Right Arrow" className="transform rotate-180 w-7 h-7 mr-1" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default SideNav;
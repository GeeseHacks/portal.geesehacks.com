import Image from "next/image";
import Link from "next/link";


const sideNavLinks = [
  {
    name: "Home",
    href: "/dashboard",
    icon: "/static/icons/home.png",
  },
  {
    name: "Schedule",
    href: "/dashboard/schedule",
    icon: "/static/icons/calendar.png",
  },
  {
    name: "QR Code",
    href: "/dashboard/qrcode",
    icon: "/static/icons/qrcode.png",
  },
  {
    name: "Passport",
    href: "/dashboard/passport",
    icon: "/static/icons/passport.png",
  },
  {
    name: "FAQ",
    href: "/dashboard/faq",
    icon: "/static/icons/game.png",
  },
];

const SideNav: React.FC = () => {
  // TODO: On mobile screens, show a hamburger menu
  return (
    <nav className="bg-gray-950 h-screen min-h-96 w-80 xl:w-96 hidden lg:block overflow-y-auto">
      <div className="flex flex-col items-center justify-center px-12 xl:px-20 py-2 h-full space-y-4 w-full">
        {/* Nav Logo */}
        <div className="flex items-center space-x-3 h-1/5">
          <Image src="/static/icons/geesehacks.png" height={38} width={38} alt="Geese Logo" />
          <div className="text-3xl font-semibold drop-shadow-[0_0px_5px_rgba(255,255,255,0.5)]">GeeseHacks</div>
        </div>

        {/* Nav Content */}
        <div className="flex flex-col grow w-full text-xl font-light space-y-10">
          {sideNavLinks.map((link) =>
            <Link className="flex space-x-8 hover:opacity-35" key={link.name} href={link.href}>
              <Image src={link.icon} height={0} width={0} sizes="100vw" alt={link.name} style={{ height: 24, width: 'auto' }} />
              <h2>{link.name}</h2>
            </Link>
          )}
        </div>

        {/* Log Out Button (Switch the style a bit—maybe use shadcn buttons?) */}
        <div className="h-1/6 flex-shrink-0">
          <button className="flex w-44 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-300 via-pink-500 to-red-400 p-3 text-lg font-medium text-white shadow-lg transition duration-200 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-600 hover:to-red-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            Sign Out
          </button>
        </div>


      </div>
    </nav>
  );
}
export default SideNav;
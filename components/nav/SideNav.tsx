import Image from "next/image";
import Link from "next/link";
import { signOutAction } from "@/utils/signOutAction";
import { Button } from "@/components/ui/button"


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

interface SideNavProps {
  className?: string;
}

const SideNav: React.FC<SideNavProps> = ({ className }) => {
  const shouldShowStockMarketLink = () => {
    const now = new Date();
    const targetDate = new Date(2024, 8, 2, 16, 20, 0); // modify this with exact time and date

    return now >= targetDate;
  };

  // TODO: On mobile screens, show a hamburger menu
  return (
    <nav className={`bg-gray-950 bg-opacity-25 h-screen min-h-96 w-80 xl:w-96 hidden lg:block overflow-y-auto ${className}`}>
      <div className="flex flex-col items-center justify-center px-12 xl:px-20 py-2 h-full space-y-4 w-full">
        {/* Nav Logo */}
        <div className="flex items-center space-x-3 h-1/5">
          <Image src="/static/icons/geesehacks.png" height={38} width={38} alt="Geese Logo" />
          <div className="text-3xl font-semibold">GeeseHacks</div>
        </div>

        {/* Nav Content */}
        <div className="flex flex-col grow w-full text-xl font-light space-y-10">
          {sideNavLinks.map((link) =>
            <Link className="flex space-x-8 hover:opacity-35" key={link.name} href={link.href}>
              <Image src={link.icon} height={0} width={0} sizes="100vw" alt={link.name} style={{ height: 24, width: 'auto' }} />
              <h2>{link.name}</h2>
            </Link>
          )}

          {/* Conditionally render the Stock Market link */}
          {shouldShowStockMarketLink() && (
            <Link className="flex space-x-8 hover:opacity-35" key="Stock Market" href="/dashboard/stock-market">
              <Image src="/static/icons/stock-market.png" height={0} width={0} sizes="100vw" alt="Stock Market" style={{ height: 24, width: 'auto' }} />
              <h2>Stock Market</h2>
            </Link>
          )}

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
}
export default SideNav;
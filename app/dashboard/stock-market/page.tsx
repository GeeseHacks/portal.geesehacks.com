import SideNav from "@/components/nav/SideNav";
import StockMarket from "./StockMarket";
import LeaderBoard from "./LeaderBoard";

const Page: React.FC = () => {
  return (
    <>
      <StockMarket />
    </>
  );
};

export default Page;

export const metadata = {
  title: "Stock Market | GeeseHacks",
};

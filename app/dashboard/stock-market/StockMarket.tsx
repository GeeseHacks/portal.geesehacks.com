"use client";

import React, { useState } from "react";
import SideNav from "../../../components/nav/SideNav";
import Image from "next/image";

import LeaderBoard from "./LeaderBoard";
import StockGraph from "./StockGraph";

const StockMarket: React.FC = () => {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="absolute top-24 left-36 w-[700px] h-[700px] rounded-full bg-purple-500 opacity-20 blur-3xl z-[-1]"></div>
      <div className="absolute bottom-36 right-10 w-[700px] h-[700px] rounded-full bg-green-300 opacity-20 blur-3xl z-[-1]"></div>
      <SideNav />
      <div className="px-16 py-12 lg:px-24 lg:py-16 flex-1 flex flex-col">
        <div className="flex items-center space-x-4">
          <Image
            src="/static/icons/stock-market-title.png"
            alt="Stock Market Title Image"
            width={35}
            height={35}
          />
          <h1 className="text-3xl md:text-4xl font-semibold">Stock Market</h1>
        </div>
        <p className="pb-16 text-md md:text-lg pt-3 text-gray-500">
          Some description here
        </p>
        <div className="flex space-x-4 pb-8">
          <button
            onClick={() => setActiveTab("General")}
            className={`${
              activeTab === "General"
                ? "text-[#D175FA] bg-[#3E2B65]"
                : "text-white"
            } px-4 py-2 rounded-lg`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab("My Project")}
            className={`${
              activeTab === "My Project"
                ? "text-[#D175FA] bg-[#3E2B65]"
                : "text-white"
            } px-4 py-2 rounded-lg`}
          >
            My Project
          </button>
        </div>
        <div>
          {activeTab === "General" && (
            <>
              <LeaderBoard />
            </>
          )}
          {activeTab === "My Project" && (
            <>
              <StockGraph />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockMarket;

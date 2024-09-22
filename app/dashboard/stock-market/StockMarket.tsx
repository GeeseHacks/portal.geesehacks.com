"use client";

import React, { useState } from "react";
import SideNav from "../../../components/nav/SideNav";
import Image from "next/image";

import LeaderBoard from "./LeaderBoard";
import StockGraph from "./StockGraph";

const StockMarket: React.FC = () => {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      <div className="absolute top-24 left-80 w-[500px] h-[500px] rounded-full bg-[#7D14D0] opacity-15 blur-3xl z-[-10]"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#119FCC] opacity-15 blur-3xl z-[-10]"></div>
      <SideNav className="z-10"/>
      <div className="px-16 py-12 lg:px-32 lg:py-16 flex-1 flex flex-col">
        <div className="flex items-center space-x-4">
          <Image
            src="/static/icons/stock-market-title.png"
            alt="Stock Market Title Image"
            width={35}
            height={35}
          />
          <h1 className="text-3xl md:text-4xl font-semibold">Stock Market</h1>
        </div>
        <p className="pb-7 text-md md:text-lg pt-3 text-gray-500">
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

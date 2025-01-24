"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import LeaderBoard from "./LeaderBoard";
import StockGraph from "./StockGraph";
import EditProject from "./EditProject";
import { useSession } from "next-auth/react";
import StockGraphTeams from "./StockGraphTeams";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Assuming this is where your ShadCN Tabs component is located

interface ProjResponse {
  project_id: string;
}

interface Team {
  id: number;
  name: string;
  value: string;
  change: string;
  projectId: string;
  color: string; // Add color for the graph
  dataKey: string; // Add dataKey for the graph (e.g., "team1", "team2")
}

const StockMarket: React.FC = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [currentView, setCurrentView] = useState("leaderboard");
  const [projId, setProjId] = useState("");
  const [teamsData, setTeamsData] = useState<Team[]>([]);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchProjectId = async () => {
      try {
        const response = await fetch(
          `/api/projects/project-id?user_id=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch project ID");
        }
        const data: ProjResponse = await response.json();
        setProjId(data.project_id);
      } catch (err) {
        console.log("Error with fetching correct projectID");
      }
    };

    fetchProjectId();
  }, [userId]);

  // Fetch teams data
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`/api/teamData/${activeTab}`);
        if (!response.ok) throw new Error("Failed to fetch teams");
        const data = await response.json();

        // Enhance the team data with colors and dataKeys
        const enhancedData = data.map((team: Team, index: number) => ({
          ...team,
          color: getTeamColor(index), // Function to return consistent colors
          dataKey: `team${index + 1}`,
        }));

        setTeamsData(enhancedData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [activeTab]);

  const getTeamColor = (index: number): string => {
    const colors = ["#e23670", "#2662d9", "#2eb88a", "#af57db", "#e88c31"];
    return colors[index % colors.length];
  };

  const categories = [
    {
      name: "General",
      component: <LeaderBoard category={"General"} teamsData={teamsData} />,
    },
    {
      name: "Sun Life",
      component: <LeaderBoard category={"Sun Life"} teamsData={teamsData} />,
    },
    {
      name: "TeejLab",
      component: <LeaderBoard category={"TeejLab"} teamsData={teamsData} />,
    },
    {
      name: "CS-CAN",
      component: <LeaderBoard category={"CS-CAN"} teamsData={teamsData} />,
    },
    { name: "My Project", component: <StockGraph projId={projId} /> },
    { name: "Add Project", component: <EditProject /> },
  ];

  return (
    <div className="relative flex flex-col h-full">
      <div className="absolute -top-24 -left-36 w-[500px] h-[500px] rounded-full bg-[#7D14D0] opacity-10 blur-3xl z-[-10]"></div>
      <div className="absolute -bottom-20 -right-10 w-[500px] h-[500px] rounded-full bg-[#119FCC] opacity-10 blur-3xl z-[-10]"></div>
      <div className="px-7 lg:px-2 flex-1 flex flex-col">
        {/* Header */}
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
          Manage your team's project and track performance!
        </p>

        {/* Category Selectors (Always Visible) */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pb-8">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveTab(category.name)}
              className={`${
                activeTab === category.name
                  ? "text-[#D175FA] bg-[#3E2B65]"
                  : "text-white"
              } px-4 py-2 rounded-lg`}
            >
              <span className="text-md md:text-lg font-semibold">
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Tabs (Below Category Selectors) */}
        <div className="flex-1">
          <Tabs
            defaultValue="leaderboard"
            className="pb-8"
            onValueChange={(value) => setCurrentView(value)}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <TabsList className="h-10 bg-[#3E2B65]/50 p-1 rounded-xl">
                  <TabsTrigger
                    value="leaderboard"
                    className="rounded-lg data-[state=active]:bg-[#3E2B65] data-[state=active]:text-[#D175FA] transition-all"
                  >
                    Leaderboard
                  </TabsTrigger>
                  <TabsTrigger
                    value="stockGraphTeams"
                    className="rounded-lg data-[state=active]:bg-[#3E2B65] data-[state=active]:text-[#D175FA] transition-all"
                  >
                    Graph
                  </TabsTrigger>
                </TabsList>

                {/* Legend */}
                {currentView === "stockGraphTeams" && (
                  <div className="flex items-center gap-4 text-sm">
                    {teamsData.map((team) => (
                      <div key={team.id} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: team.color }}
                        />
                        <span>{team.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <TabsContent value="leaderboard">
                <LeaderBoard category={activeTab} teamsData={teamsData} />
              </TabsContent>
              <TabsContent value="stockGraphTeams">
                <StockGraphTeams teamsData={teamsData} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StockMarket;
